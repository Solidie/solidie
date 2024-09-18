import React from "react";
import currency_symbols from 'currency-symbol-map/map';

import {__} from 'solidie-materials/helpers.jsx';
import { currency_symbol } from "solidie-materials/helpers";
import { TagField } from "solidie-materials/tag-field/tag-field";

export function ContentTags({tags}) {

	const _tags = tags?.split?.(',') || [];
	const tags_array = [...new Set(_tags.map(t=>t.trim()).filter(t=>t))];

	return <TagField
		variant='small'
		value={[]}
		options={tags_array.map(t=>{
			return {
				id: t,
				label: t
			}
		})}
	/>
}

// Determine price range from an array of plans
export const getPriceRange=(plans, exclude_pack=false)=>{
	
	let sale_price;
	let regular_price;

	let sale_price_max;
	let regular_price_max;

	let packs = [];

	// Loop through individual plans 
	plans.forEach(plan=>{

		const {sales_model} = plan.plan || {};

		// Skip disabled plans from calculations
		if ( ! plan.enable ) {
			return;
		}
		
		// If not single, means bundle, add to pack array. Range is not applicable here.
		if ( sales_model != 'single' ) {

			packs.push(plan);

			if ( exclude_pack ) {
				return;
			}
		}

		// Determine sale price and regular price
		if ( sale_price === undefined || sale_price>plan.sale_price ) {
			sale_price    = plan.sale_price;
			regular_price = plan.regular_price;
		}

		// Determine sale price max and regular price max
		if ( sale_price_max === undefined || sale_price<plan.sale_price ) {
			sale_price_max = plan.sale_price;
			regular_price_max = plan.regular_price;
		}
	});

	// Return price ranges
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
		meta: {
			currency_code,
			content_classified_price,
		}={}
	} = content;

	const is_free     = monetization != 'paid';
	const color_class = `${is_overlayer ? 'color-white' : 'color-text-70'}`;
	
	const {
		min:{
			sale_price, 
			regular_price
		}
	} = getPriceRange(plans);
	
	return is_free ? 
		<div className={`font-size-14 font-weight-400 white-space-nowrap ${color_class}`.classNames()}>
			{
				content_type === 'classified' ?
					(
						!content_classified_price ? null : <>
							{currency_symbols[currency_code] || null} {content_classified_price}
						</>
					) :
					__('Free')
				
			}
		</div>
	:
	(
		sale_price===undefined ? null :
		<div className={`font-size-14 font-weight-400 white-space-nowrap ${color_class}`.classNames()}>
			{currency_symbol}
			<span>{sale_price}</span>
		</div>
	)
}
