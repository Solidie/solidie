import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import { DashboardIndex } from './pages/index.jsx';
import { getElementDataSet } from '../utilities/helpers.jsx';
import { Inventory } from './pages/store/inventory/apps.jsx';
import './style.scss';

const menu_map_blueprint = [
	{
		label: 'Purchased Apps',
		slug: 'apps',
		icon: 'fas fa-cog',
	},
	{
		label: 'Purchase History',
		slug: 'orders',
		icon: 'fas fa-pen'
	},
	{
		label: 'My Account',
		slug: 'account',
		icon: 'fas fa-user'
	}
];

const store_menu_blueprint = [
	{
		label: 'Inventory',
		slug: 'inventory',
		component: Inventory
	},
	{
		label: 'Sales',
		slug: 'sales'
	},
	{
		label: 'Customers',
		slug: 'customers'
	},
	{
		label: 'Reports',
		slug: 'reports'
	},
];

/* Dashboard Adopted from https://codepen.io/trooperandz/pen/EOgJvg */

function D(props) {
	const [state, setState] = useState({
		active_slug: null,
		expanded_menu: null,
		menu_map: [],
	});

	const $ = window.jQuery;
	const current_url = window.location.href.split('?')[0];
	let {stores=[], dashbaord_url, avatar_url} = props.frontendDashboardData || {};

	const setTemplate=()=>{
		/* Scripts for css grid dashboard */

		addResizeListeners();
		setSidenavListeners();
		setUserDropdownListener();
		setSidenavCloseListener();

		// Set constants and grab needed elements
		const sidenavEl = $('.sidenav');
		const gridEl = $('.grid');
		const SIDENAV_ACTIVE_CLASS = 'sidenav--active';
		const GRID_NO_SCROLL_CLASS = 'grid--noscroll';

		function toggleClass(el, className) {
		if (el.hasClass(className)) {
			el.removeClass(className);
		} else {
			el.addClass(className);
		}
		}

		// User avatar dropdown functionality
		function setUserDropdownListener() {
		const userAvatar = $('.header__avatar');

		userAvatar.on('click', function(e) {
			const dropdown = $(this).children('.dropdown');
			toggleClass(dropdown, 'dropdown--active');
		});
		}

		// Sidenav list sliding functionality
		function setSidenavListeners() {
		const subHeadings = $('.navList__subheading'); console.log('subHeadings: ', subHeadings);
		const SUBHEADING_OPEN_CLASS = 'navList__subheading--open';
		const SUBLIST_HIDDEN_CLASS = 'subList--hidden';

		subHeadings.each((i, subHeadingEl) => {
			$(subHeadingEl).on('click', (e) => {
			const subListEl = $(subHeadingEl).siblings();

			// Add/remove selected styles to list category heading
			if (subHeadingEl) {
				toggleClass($(subHeadingEl), SUBHEADING_OPEN_CLASS);
			}

			// Reveal/hide the sublist
			if (subListEl && subListEl.length === 1) {
				toggleClass($(subListEl), SUBLIST_HIDDEN_CLASS);
			}
			});
		});
		}

		
		function toggleClass(el, className) {
		if (el.hasClass(className)) {
			el.removeClass(className);
		} else {
			el.addClass(className);
		}
		}

		// If user opens the menu and then expands the viewport from mobile size without closing the menu,
		// make sure scrolling is enabled again and that sidenav active class is removed
		function addResizeListeners() {
		$(window).resize(function(e) {
			const width = window.innerWidth; console.log('width: ', width);

			if (width > 750) {
			sidenavEl.removeClass(SIDENAV_ACTIVE_CLASS);
			gridEl.removeClass(GRID_NO_SCROLL_CLASS);
			}
		});
		}

		// Sidenav close icon
		function setSidenavCloseListener() {
		$('.sidenav__brand-close').on('click', function(e) {
			toggleClass(sidenavEl, SIDENAV_ACTIVE_CLASS);
			toggleClass(gridEl, GRID_NO_SCROLL_CLASS);
		});
		}
	}

	const getComp=()=>{
		let {menu_map} = state;

		if (current_url==dashbaord_url) {
			return <DashboardIndex/>
		}

		for(let n=0; n<menu_map.length; n++) {
			let {children=[], url, component: Comp, props={}} = menu_map[n];

			if(url==current_url && Comp) {
				return <Comp {...props}/>
			} 
			
			for(let num=0; num<children.length; num++) {
				let {component: Comp, url, props} = children[num];
				if(url==current_url) {
					return Comp ? <Comp {...props}/> : null;
				}
			}
		}
	}

	useEffect(()=>{
		// Prepare menus
		let menu_map = menu_map_blueprint.map(menu=>{
			return {
				...menu,
				url: dashbaord_url+menu.slug+'/'
			}
		});

		for( let i=0; i<stores.length; i++ ) {
			let {store_name, store_slug, store_url} = stores[i];
			menu_map.push({
				label: store_name,
				icon: 'fas fa-cog',
				slug: 'store/'+store_slug,
				url: store_url,
				children: store_menu_blueprint.map(m=>{
					return {
						...m, 
						props: stores[i],
						url: store_url+m.slug+'/'
					};
				})
			})
		}
		setState({...state, menu_map});
		
		setTemplate();
	}, []);

	const page_content = getComp() || <>Component Not Found</>

	return <div className="grid">
		<header className="header">
			<i className="fas fa-bars header__menu"></i>
			<div className="header__search">
				<input className="header__input" placeholder="Search..." />
			</div>
			<div className="header__avatar" style={{backgroundImage: 'url('+avatar_url+')'}}>
				<div className="dropdown">
					<ul className="dropdown__list">
						<li className="dropdown__list-item">
							<span className="dropdown__icon"><i className="far fa-user"></i></span>
							<span className="dropdown__title">my profile</span>
						</li>
						<li className="dropdown__list-item">
							<span className="dropdown__icon"><i className="fas fa-clipboard-list"></i></span>
							<span className="dropdown__title">my account</span>
						</li>
						<li className="dropdown__list-item">
							<span className="dropdown__icon"><i className="fas fa-sign-out-alt"></i></span>
							<span className="dropdown__title">log out</span>
						</li>
					</ul>
				</div>
			</div>
		</header>

		<aside className="sidenav">
			<div className="sidenav__brand">
				<i className="fas fa-feather-alt sidenav__brand-icon"></i>
				<a className="sidenav__brand-link" href="#">App<span className="text-light">Pro</span></a>
				<i className="fas fa-times sidenav__brand-close"></i>
			</div>
			<div className="sidenav__profile">
				<div className="sidenav__profile-avatar" style={{backgroundImage: 'url('+avatar_url+')'}}></div>
				<div className="sidenav__profile-title text-light">John Doe</div>
			</div>
			<div className="row-appstore row--align-v-center row--align-h-center">
				<ul className="navList">
					{state.menu_map.map(menu=>{
						let {children=[], url, slug} = menu;
						let is_active = state.expanded_menu==slug || current_url==url || current_url.indexOf(url)===0;

						return <li key={slug}>
							<div className={"navList__subheading row-appstore row--align-v-center"+(!children.length ? ' singular' : '')+(is_active ? ' navList__subheading--open' : '')} onClick={()=>setState({...state, expanded_menu: state.expanded_menu==slug ? null : slug})}>
								<a href={children.length ? '#' : url} onClick={e=>children.length ? e.preventDefault() : 0}>
									<span className="navList__subheading-icon"><i className={menu.icon}></i></span>
									<span className="navList__subheading-title">{menu.label}</span>
								</a>
							</div>
							{
								children.length && 
								<ul className={"subList"+(!is_active ? ' subList--hidden' : '')}>
									{children.map(child_menu=>{
										let {slug, label, url} = child_menu;
										let is_active = url==current_url;
										return <li key={slug} className={"subList__item"+(is_active ? ' subList__item--active' : '')}>
											<a href={url}>{label}</a>
										</li>
									})}
								</ul> || null
							}
						</li>
					})}
				</ul>
			</div>
		</aside>

		<main className="main">
			{page_content}
		</main>

		<footer className="footer">
			<p><span className="footer__copyright">&copy;</span> 2018 MTH</p>
			<p>Crafted with <i className="fas fa-heart footer__icon"></i> by <a href="https://www.linkedin.com/in/matt-holland/" target="_blank" className="footer__signature">Matt H</a></p>
		</footer>
	</div>
}

let dashboard = document.getElementById('AppStore_Dashboard');
if ( dashboard ) {
	ReactDOM.createRoot( dashboard ).render( <D {...getElementDataSet(dashboard)}/> );
}