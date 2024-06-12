import React from "react";
import { Link } from "react-router-dom";

import {__} from 'crewhrm-materials/helpers.jsx';
import {ResponsiveLayout} from 'crewhrm-materials/responsive-layout.jsx';
import {Ratio} from 'crewhrm-materials/responsive-layout.jsx';
import { currency_symbol } from "crewhrm-materials/helpers";

import { MetaData } from "../../single/meta-data/meta-data";

import vid_style from '../video/video.module.scss';
import style from './generic.module.scss';

export const getPriceRange=(plans, exclude_pack=false)=>{
	
	let sale_price;
	let regular_price;

	let sale_price_max;
	let regular_price_max;

	let packs = [];

	plans.forEach(plan=>{

		const {sales_model} = plan.plan || {};

		if ( ! plan.enable ) {
			return;
		}
		
		if ( sales_model != 'single' ) {

			packs.push(plan);

			if (exclude_pack) {
				return;
			}
		}

		if ( sale_price === undefined || sale_price>plan.sale_price ) {
			sale_price    = plan.sale_price;
			regular_price = plan.regular_price;
		}

		if ( sale_price_max === undefined || sale_price<plan.sale_price ) {
			sale_price_max = plan.sale_price;
			regular_price_max = plan.regular_price;
		}
	});

	return {
		min: {
			sale_price,
			regular_price
		},
		max: {
			sale_price: sale_price_max,
			regular_price: regular_price_max
		},
		packs
	}
}

export function DownloadOrPrice({content, is_overlayer}) {

	const {
		product:{monetization, plans=[]}={},
		content_type,
		content_permalink,
		release={}
	} = content;

	const is_free     = monetization != 'paid';
	const is_tutorial = content_type === 'tutorial';
	const color_class = `${is_overlayer ? 'color-white' : 'color-text-90'}`;
	const access_url  = is_tutorial ? content_permalink+'0/' : (release?.download_url || '#');
	
	const {
		min:{
			sale_price, 
			regular_price
		}
	} = getPriceRange(plans);
	
	return is_free ? 
		<span 
			className={`ch-icon ${is_tutorial ? 'ch-icon-book-open' : 'ch-icon-download'} font-size-16 ${color_class} interactive cursor-pointer`.classNames()}
			onClick={()=>window.location.assign(access_url)}
			title={is_tutorial ? __('Start Learning') : __('Download')}
		></span>
	:
	<div className={`font-size-16 font-weight-500 white-space-nowrap ${color_class}`.classNames()}>
		{currency_symbol}
		<span>{sale_price}</span>
		{
			(!regular_price || regular_price==sale_price) ? null :
			<sup>
				<strike>
					{regular_price}
				</strike>
			</sup>
		}
	</div>
}

export function GenericCard({contents=[]}) {
	return <div className={'generic-card'.classNames(style)}>
		<ResponsiveLayout columnWidth={300}>
			{contents.map(content=>{

				const {
					content_id, 
					content_permalink, 
					media={}, 
					content_title,
				} = content;

				return <div 
					key={content_id} 
					className={'border-radius-5'.classNames() + 'single'.classNames(style)}
				>
					<Ratio x={16} y={9}>
						<div className={'d-block width-p-100 height-p-100 position-relative'.classNames()}>
							<Link 
								to={content_permalink}
								className={'d-block width-p-100 height-p-100 cursor-pointer position-relative'.classNames() + 'thumbnail'.classNames(style)} 
								style={{backgroundImage: 'url('+media?.thumbnail?.file_url+')'}}/>

							<div 
								style={{
									right: 0, 
									top: 0, 
									left: 0
								}}
								className={
									'position-absolute padding-bottom-30 d-flex justify-content-flex-end'.classNames() 
									+ 'meta'.classNames(style) 
									+ 'gradient-top'.classNames(vid_style)
								} 
							>
								<MetaData 
									content={content} 
									is_overlayer={true} 
								/>
							</div>
						</div>
					</Ratio>

					<div className={'d-flex align-items-center justify-content-space-between column-gap-15 padding-vertical-15 padding-horizontal-20'.classNames()}>
						<div>
							<Link 
								to={content_permalink} 
								className={'d-block font-size-16 font-weight-500 color-text-90 interactive cursor-pointer'.classNames()}
								data-cylector="content-single"
							>
								{content_title}
							</Link>
						</div>
						<div>
							<DownloadOrPrice content={content}/>
						</div>
					</div>
				</div>
			})}
		</ResponsiveLayout>
	</div> 
}