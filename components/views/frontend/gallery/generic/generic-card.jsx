import React from "react";
import {Link} from 'react-router-dom';

import {timeAgoOrAfter, isEmpty} from 'solidie-materials/helpers';
import {Ratio} from 'solidie-materials/responsive-layout.jsx';

import { ContentTags, DownloadOrPrice } from "../generic-data";
import { MetaData } from "../../single/meta-data/meta-data";

import style from './generic.module.scss';

export function GenericCard({contents=[], content_type, is_mobile}) {

	return contents.map((content, index)=>{

		const {
			content_id, 
			content_permalink, 
			media={}, 
			content_title,
			created_at,
			meta:{
				content_state_name,
				content_country_name,
				content_tags
			},
		} = content;

		const is_last = index === ( contents.length - 1 );
		const area = [content_state_name, content_country_name].filter(m=>!isEmpty(m)).join(', ');
		const is_classified = content_type === 'classified';

		return <Link 
			key={content_id} 
			to={content_permalink}
			className={
				`d-flex ${is_mobile ? 'flex-direction-column' : 'align-items-center'} column-gap-15 row-gap-15 padding-15 cursor-pointer ${!is_last ? 'border-bottom-1 b-color-text-6' : ''}`.classNames()
				+ `list-single`.classNames(style)
			}
			data-cylector="content-single"
		>
			<div style={{width: is_mobile ? '100%' : (!is_classified ? '180px' : '150px')}}>
				{
					!is_classified ? 
						<Ratio x={16} y={9}>
							<img 
								alt={`Content Thumbnail - ${content_title}`}
								src={media?.thumbnail?.file_url}
								style={{
									display: 'block',
									width: '100%',
									height: '100%',
									objectFit: 'cover',
									objectPosition: 'center',
									borderRadius: '5px'
								}}
							/>
						</Ratio>
						:
						<img 
							alt={`Content Thumbnail - ${content_title}`}
							src={media?.thumbnail?.file_url}
							style={{
								display: 'block',
								margin: 'auto',
								width: '100%',
								height: 'auto',
								borderRadius: '5px'
							}}
						/>
				}
			</div>
			
			<div className={'flex-1 d-flex flex-direction-column row-gap-8'.classNames()}>

				<div className={'margin-bottom-5 font-size-18 font-weight-500 color-text-80'.classNames()}>
					{content_title}
				</div>

				<ContentTags tags={content_tags} className={'margin-bottom-10'.classNames()}/>
				
				<div>
					<MetaData content={content} show={['reaction']}/>
				</div>
				
				{
					(!is_classified || !area) ? null :
					<span className={'d-block margin-bottom-5 font-size-14 font-weight-400 color-text-60'.classNames()}>
						{area}
					</span>
				}

				{
					!is_classified ? null :
					<span className={'font-size-13 color-text-50'.classNames()}>
						{timeAgoOrAfter(created_at)}
					</span>
				}
			</div>

			<div>
				<DownloadOrPrice content={content}/>
			</div>
		</Link>
	}) 
}
