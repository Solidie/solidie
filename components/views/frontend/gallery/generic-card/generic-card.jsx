import React from "react";

import {ResponsiveLayout} from 'crewhrm-materials/responsive-layout.jsx';
import {Ratio} from 'crewhrm-materials/responsive-layout.jsx';

import style from './generic.module.scss';
import { Link } from "react-router-dom";
import { MetaData } from "../../single/meta-data/meta-data";
import { currency_symbol } from "crewhrm-materials/helpers";

const getMinPrice=plans=>{
	let regular_price;
	let sale_price;

	plans.forEach(plan=>{
		if ( sale_price === undefined || sale_price<plan.sale_price ) {
			sale_price    = plan.sale_price;
			regular_price = plan.regular_price;
		}
	});

	return {
		sale_price,
		regular_price
	}
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
					product:{monetization, plans=[]},
					release={}
				} = content;

				const is_free = monetization != 'paid';
				const {sale_price, regular_price} = getMinPrice(plans);

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
								className={'position-absolute'.classNames()} 
								style={{right: '10px', top: '10px'}}
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
							<Link to={content_permalink} className={'d-block font-size-17 font-weight-400 color-text cursor-pointer'.classNames()}>
								{content_title}
							</Link>
						</div>
						<div>
							{
								is_free ? 
									<a 
										href={release?.download_url || '#'}
										className={'ch-icon ch-icon-download font-size-16'.classNames()}
									></a>
								:
								<div className={'font-size-16 color-primary font-weight-500 white-space-nowrap'.classNames()}>
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
						</div>
					</div>
				</div>
			})}
		</ResponsiveLayout>
	</div> 
}