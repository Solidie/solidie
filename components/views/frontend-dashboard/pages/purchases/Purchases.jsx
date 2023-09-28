import React, { useEffect, useState } from 'react'

import { request } from '../../../../utilities/request.jsx';

export function PurchasedApps(){

	const [state, setState] = useState({contents:[]});

	const getContents=()=>{
		request('get_purchased_contents', {content_type: 'app'}, resp=>{
			let {contents=[]} = resp?.data || {};

			setState({...state, contents});
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

		<div>
			{state.contents.map(content => {
				let {content_id, content_name, plans=[], content_url, logo_url, releases} = content;
				let latest_release = releases[0];
				let prev_text = 'Previous Versions';
				let plan_name = plans.map(plan=>plan.variation?.period_label).filter(l=>l).join(', ');

				return <div key={content_id}>
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
								<div className={"italic".classNames()}>
									{plan_name || <span>&nbsp;</span>}
								</div>
							</div>
							<div className={"flex flex-col items-center gap-y-5 px-10 ".classNames()}>
								<button className={"Button flex items-center gap-x-2".classNames()} onClick={()=>downloadVersion(releases, latest_release.version)}>
									Download Latest <i className={'s-icon s-icon-download'}></i>
								</button>
								Select Version Drop Down
							</div>
						</div>
					</div>
				</div>
			})}
		</div>
	</div>
}
