import React, { useEffect, useState } from 'react'
import { DownloadIcon } from "@radix-ui/react-icons";
import { Select } from "../../ui";

import { request } from '../../../utilities/request.jsx';
import bs from '../../../sass/bootstrap.module.scss';

const PurchasedApps = () => {

	const [state, setState] = useState({contents:[]});

	const getContents=()=>{
		request('get_purchased_contents', {content_type: 'app'}, resp=>{
			let {contents=[]} = resp?.data || {};

			setState({contents});
		})
	}

	const downloadVersion=(releases, version)=>{
		console.log(version);
		for( let i=0; i<releases.length; i++) {
			if( releases[i].version == version ) {
				window.location.assign( releases[i].download_url );
				break;
			}
		}
	}

	useEffect(()=>{
		getContents();
	}, []);
		
	return <div className={"flex flex-col space-y-6 w-full h-full".classNames()}>
		<div className={"flex justify-between items-center w-full".classNames()}>
			<h1 className={"text-3xl font-bold".classNames()}>Purchased Applications</h1>
		</div>

		<div className={'row'.classNames(bs)}>
			{state.contents.map(content => {
				let {content_id, content_name, plan_name='Test Plan', content_url, logo_url, releases} = content;
				let latest_release = releases[0];
				let prev_text = 'Previous Versions';

				return <div key={content_id} className={'col-xs-12 col-sm-12 col-md-6 col-lg-4'.classNames(bs)}>
					<div className={"bg-tertiary/20 text-tertiary p-6 w-full h-max rounded-2xl shadow-lg hover:shadow-tertiary/60 border-4 border-tertiary/20".classNames()} style={{marginBottom: '30px'}}>
						<div className={"self-start bg-primary px-2 py-1 uppercase rounded-md text-xs font-bold".classNames()} style={{display: 'inline-block'}}>
							{latest_release.version}
						</div>
						<div className={"flex flex-col items-center gap-y-5".classNames()}>
							<div style={{width: '60px', height: '60px', backgroundImage: 'url('+logo_url+')', backgroundSize: 'cover', boxShadow: '1px 1px 16px rgba(0, 0, 0, .2)', borderRadius: '6px'}}></div>
							<div className={"flex flex-col items-center".classNames()}>
								<div className={"font-black text-xl".classNames()}>
									<a href={content_url} target='_blank'>{content_name}</a>
								</div>
								<div className={"italic".classNames()}>{plan_name}</div>
							</div>
							<div className={"flex flex-col items-center gap-y-5 px-10 ".classNames()}>
								<button className={"Button flex items-center gap-x-2".classNames()} onClick={()=>downloadVersion(releases, latest_release.version)}>
									Download Latest <DownloadIcon />
								</button>
								<Select
									className={"shadow-lg".classNames()}
									value={prev_text}
									onChange={v=>downloadVersion(releases, v)}
									placeholder="Previous Versions"
									disableItemsList={[prev_text]}
									itemsList={[prev_text, ...releases.map(r=>r.version)]}
								/>
							</div>
						</div>
					</div>
				</div>
			})}
		</div>
	</div>
}

export default PurchasedApps