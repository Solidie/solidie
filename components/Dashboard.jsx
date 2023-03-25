import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import { AppList } from './dashboard/apps/apps.jsx';
import './style.scss';
import { request } from './utilities/request.jsx';

const menu_map = [
	{
		label: 'My Profile',
		icon: 'far fa-file-alt',
		menus: [
			{
				label: 'Orders',
				slug: 'orders',
				icon: 'fas fa-pen'
			},
			{
				label: 'Apps',
				slug: 'apps',
				icon: 'fas fa-cog'
			},
			{
				label: 'Account',
				slug: 'account',
				icon: 'fas fa-user'
			},
		]
	},
	{
		label: 'Store 1',
		menus: [
			{
				label: 'Store 1',
				icon: 'fas fa-cog',
				children: [
					{
						label: 'Inventory',
						slug: 'store/store-1/inventory',
						component: AppList
					},
					{
						label: 'Sales',
						slug: 'store/store-1/sales'
					},
					{
						label: 'Customers',
						slug: 'store/store-1/customers'
					}
				]
			},
		]
	}
]

/* Dashboard Adopted from https://codepen.io/trooperandz/pen/EOgJvg */

function D() {
	const [state, setState] = useState({
		active_slug: null,
		stores: []
	});
	const $ = window.jQuery;

	const setTemplate=()=>{
		/* Scripts for css grid dashboard */

		addResizeListeners();
		setSidenavListeners();
		setUserDropdownListener();
		setMenuClickListener();
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

		// Menu open sidenav icon, shown only on mobile
		function setMenuClickListener() {
		$('.header__menu').on('click', function(e) { console.log('clicked menu icon');
			toggleClass(sidenavEl, SIDENAV_ACTIVE_CLASS);
			toggleClass(gridEl, GRID_NO_SCROLL_CLASS);
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
		for(let i=0; i<menu_map.length; i++) {
			for(let n=0; n<menu_map[i].menus.length; n++) {
				let {children=[], slug, component} = menu_map[i].menus[n];

				if(slug==state.active_slug) {
					return component;
				} 
				
				for(let num=0; num<children.length; num++) {
					if(children[num].slug==state.active_slug) {
						return children[num].component;
					}
				}
			}
		}
	}

	const getDashboardData=()=>{
		/* request('get_dashboard_data', ()=>{
			
		}); */
	}

	useEffect(()=>{
		setTemplate();
	}, []);

	const Comp = state.active_slug ? (getComp() || <p>Page Component Not Found</p>) : null;

	return <div className="grid">
		<header className="header">
			<i className="fas fa-bars header__menu"></i>
			<div className="header__search">
				<input className="header__input" placeholder="Search..." />
			</div>
			<div className="header__avatar">
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
				<div className="sidenav__profile-avatar"></div>
				<div className="sidenav__profile-title text-light">John Doe</div>
			</div>
			<div className="row-appstore row--align-v-center row--align-h-center">
				<ul className="navList">
					{menu_map.map(segment=>{
						return <>
							{/* segment.label && <li className="navList__heading">{segment.label}<i className={segment.icon}></i></li> || null */}
							{segment.menus.map(menu=>{
								let {children=[], slug} = menu;
								let is_active = state.active_slug==slug || children.filter(c=>c.slug==state.active_slug).length;

								return <li key={slug}>
									<div className={"navList__subheading row-appstore row--align-v-center"+(!children.length ? ' singular' : '')+(is_active ? ' navList__subheading--open' : '')}>
										<span className="navList__subheading-icon"><i className={menu.icon}></i></span>
										<span className="navList__subheading-title">{menu.label}</span>
									</div>
									{
										children.length && 
										<ul className={"subList"+(!is_active ? ' subList--hidden' : '')}>
											{children.map(child_menu=>{
												let {slug, label} = child_menu;
												let is_active = slug==state.active_slug;
												return <li className={"subList__item"+(is_active ? ' subList__item--active' : '')}>{label}</li>
											})}
										</ul> || null
									}
								</li>
							})}
						</>
					})}
				</ul>
			</div>
		</aside>

		<main className="main">
			<Comp/>
		</main>

		<footer className="footer">
			<p><span className="footer__copyright">&copy;</span> 2018 MTH</p>
			<p>Crafted with <i className="fas fa-heart footer__icon"></i> by <a href="https://www.linkedin.com/in/matt-holland/" target="_blank" className="footer__signature">Matt H</a></p>
		</footer>
	</div>
}

let dashboard = document.getElementById('AppDashboard');
if ( dashboard ) {
	ReactDOM.createRoot( dashboard ).render( <D/> );
}