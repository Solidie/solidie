import React from 'react';

import style from './style.module.scss';

export function AppCatalog({contents=[]}) {
	
	return <div className={'catalog'.classNames(style)}>
		{contents.map(content=>{
			let {content_id, content_name, logo_url} = content;
			return 	<div key={content_id} className={"product-card".classNames(style)}>
				<div className={"product-tumb".classNames(style)} style={{backgroundImage: 'url('+logo_url+')'}}>

				</div>
				<div className={"product-details".classNames(style)}>
					<span className={"product-catagory".classNames(style)}>{content_name}</span>
					<h4><a href="">{content_name}</a></h4>
					<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vero, possimus nostrum!</p>
					<div className={"product-bottom-details".classNames(style)}>
						<div className={"product-price".classNames(style)}>
							<small>$96.00</small> $230.99
						</div>
						<div className={"product-links".classNames(style)}>
							<a href=""><i className={"ch-icon ch-icon-heart-o".classNames()}></i></a>
							<a href=""><i className={"ch-icon ch-icon-cart".classNames()}></i></a>
						</div>
					</div>
				</div>
			</div>
		})}
	</div>
}