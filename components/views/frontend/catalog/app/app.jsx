import React, { useEffect, useState } from 'react';

import { useParams } from 'react-router-dom';
import { request } from '../../../../utilities/request.jsx';

import style from './style.module.scss';

export function AppCatalog() {
	const {content_type} = useParams();
	
	const [state, setState] = useState({
		contents:[], 
		fetching: false,
		filters:{
			page: 1,
			sort: 'popular',
			content_type
		}
	});

	const getContents=()=>{
		setState({...state, fetching: true});
		request('get_content_list', state.filters, resp=>{
			let {contents=[]} = resp?.data || {};
			setState({...state, fetching: false, contents});
		});
	}

	useEffect(()=>{
		getContents();
	}, []);

	return <div className={'wrapper'.classNames(style)}>
		<div className={'sidebar'.classNames(style)}>
			Here Fiters
		</div>
		<div className={'catalog'.classNames(style)}>
			{state.contents.map(content=>{
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
								<a href=""><i className={"fa fa-heart".fontAwesome()}></i></a>
								<a href=""><i className={"fa fa-shopping-cart".fontAwesome()}></i></a>
							</div>
						</div>
					</div>
				</div>
			})}
			{state.contents.map(content=>{
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
								<a href=""><i className={"fa fa-heart".fontAwesome()}></i></a>
								<a href=""><i className={"fa fa-shopping-cart".fontAwesome()}></i></a>
							</div>
						</div>
					</div>
				</div>
			})}
			{state.contents.map(content=>{
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
								<a href=""><i className={"fa fa-heart".fontAwesome()}></i></a>
								<a href=""><i className={"fa fa-shopping-cart".fontAwesome()}></i></a>
							</div>
						</div>
					</div>
				</div>
			})}
		</div>
	</div>
}