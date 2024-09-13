import React from "react";
import {Link} from 'react-router-dom';

import currency_symbols from 'currency-symbol-map/map';
import {timeAgoOrAfter, isEmpty} from 'solidie-materials/helpers';

import style from './classified.module.scss';

export function Classifieds({contents=[]}) {

	return contents.map((content, index)=>{

		const {
			content_id, 
			content_permalink, 
			media={}, 
			content_title,
			created_at,
			meta:{
				currency_code,
				content_state_name,
				content_country_name,
				content_classified_price
			},
		} = content;

		const is_last = index === ( contents.length - 1 );
		const area = [content_state_name, content_country_name].filter(m=>!isEmpty(m)).join(', ');
		const price = content_classified_price;
		const {file_url: thumb_url} = media?.thumbnail || {};

		return <Link 
			key={content_id} 
			to={content_permalink}
			className={
				`d-flex align-items-center column-gap-15 padding-15 cursor-pointer ${!is_last ? 'border-bottom-1 b-color-text-6' : ''}`.classNames()
				+ `list-single`.classNames(style)
			}
		>

			<div style={{width: '150px'}}>
				<img 
					src={media?.thumbnail?.file_url}
					style={{
						display: 'block',
						margin: 'auto',
						width: '100%',
						height: 'auto'
					}}
				/>
			</div>
			
			<div className={'flex-1'.classNames()}>

				<span className={'d-block margin-bottom-10 font-size-18 font-weight-700 color-text-80'.classNames()}>
					{content_title}
				</span>

				<div className={'d-flex align-items-center justify-content-space-between'.classNames()}>
					<span className={'d-block margin-bottom-5 font-size-14 font-weight-400 color-text-60'.classNames()}>
						{area}
					</span>
					{
						price ? null :
						<span className={'font-size-13 color-text-50'.classNames()}>
							{timeAgoOrAfter(created_at)}
						</span>
					}
				</div>
				
				<div className={'d-flex align-items-center justify-content-space-between'.classNames()}>
					<span className={'font-size-14 color-material-80'.classNames()}>
						{!price ? null : <>{currency_symbols[currency_code]} {price}</>}
					</span>
					{
						!price ? null :
						<span className={'font-size-13 color-text-50'.classNames()}>
							{timeAgoOrAfter(created_at)}
						</span>
					}
				</div>
			</div>
		</Link>
	}) 
}
