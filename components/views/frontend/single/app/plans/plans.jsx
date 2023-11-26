import React, { useContext } from "react";

import { request } from "crewhrm-materials/request.jsx";
import { ContextSingleData } from "../../index.jsx";

export function PlanCards(props) {
	const content = useContext(ContextSingleData);

	const addToCart = (variation_id) => {
		let {product_id} = content;
		
		request('addToCart', {product_id, variation_id}, response=>{
			let {success, data} = response;
			let {message, cart_url} = data;

			if( ! success ) {
				alert(message || 'Something went wrong!');
				return;
			}

			window.location.assign(cart_url);
		});
	}

	return <div className={"flex flex-col justify-center items-center gap-5".classNames()}>
		<div className={"shadow-lg flex rounded-lg w-max bg-brand-tertiary p-1".classNames()}>
			<div
				className={"active:outline outline-tertiary shadow-lg shadow-tertiary/20 font-medium select-none text-sm rounded-lg px-6 py-2.5 bg-tertiary text-brand-tertiary".classNames()}>
				Monthly billing
			</div>
			<div className={"font-medium select-none text-sm rounded-lg px-6 py-2.5".classNames()}>
				Annual billing
			</div>
		</div>
		{content.variations.map(variation=>{
			let {variation_id, label, period_label, price, key_features=[]} = variation;
			return <div key={variation_id} className={"height-p-100 flex flex-col justify-between items-center bg-brand-tertiary shadow-lg rounded-3xl px-14 py-8".classNames()}>
				<div className={"width-p-100".classNames()}>
					<h3 className={"text-tertiary text-sm font-semibold uppercase tracking-wide".classNames()}>
						{label}
					</h3>
					<div className={"flex flex-col items-start".classNames()}>
						<div className={"mt-3 flex items-center".classNames()}>
							<p className={"text-tertiary text-4xl font-extrabold tracking-tight".classNames()}>
								${price} {/* To Do: Show dynamic symbol */}
							</p>
							<div className={"ml-4".classNames()}>
								<p className={"text-tertiary text-sm".classNames()}>
									{period_label}
								</p>
							</div>
						</div>
					</div>
				</div>

				<ul role="list" className={"mt-7 ".classNames()}>
					{key_features.map((feature, index)=>{
						return <li key={index} className={"py-3 flex items-center".classNames()}>
							<svg className={"text-tertiary w-5 h-5 flex-shrink-0".classNames()} xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
								<path fillRule="evenodd"
									d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
									clipRule="evenodd" />
							</svg>
							<span className={"text-tertiary ml-3 text-sm font-medium".classNames()}>
								{feature.text}
							</span>
						</li>
					})}
				</ul>
				<button onClick={()=>addToCart(variation_id)} href="#" className={"bg-tertiary text-brand-tertiary hover:text-tertiary hover:bg-tertiary/5 mt-6 inline-block py-2 px-8 border border-transparent rounded-full shadow-sm text-center text-sm font-medium sm:mt-0 sm:w-auto lg:mt-6 width-p-100 hover:underline hover:decoration-dashed".classNames()}>Get
					Add to Cart
				</button>
			</div>
		})}
	</div>
}