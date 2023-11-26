import React, { useMemo, useState } from "react";
import { Link, useLocation } from "react-router-dom";

import { getDashboardPath } from "../../index.jsx";

import layout from '../../style.module.scss';
import style from './sidebar.module.scss';

export function Sidebar({ sidebarOpen }) {
	const current_url = window.location.href.split('?')[0];
	const [state, setState] = useState({});

	const location = useLocation();
	const groupedNavigation = useMemo(
		() => [
			{
				href: getDashboardPath('purchased-apps'),
				text: "Purchased Apps",
				icon: '',
			},
			{
				href: getDashboardPath('subscriptions'),
				text: "Subscriptions",
				icon: '',
			},
			{
				href: getDashboardPath('my-account'),
				text: "My Account",
				icon: '',
			},
			{
				href: getDashboardPath(`inventory`),
				text: "Inventory",
				icon: 'ch-icon ch-icon-color-swatch'.classNames(),
			},
			{
				href: getDashboardPath(`sales`),
				text: "Sales",
				icon: '',
			},
			{
				href: getDashboardPath(`reports`),
				text: "Reports",
				icon: '',
			}
		],
		[]
	);

	return <ul className={"navList".classNames(layout) + 'sidebar'.classNames(style)}>
		{groupedNavigation.map(menu=>{
			let {children=[], text: label, href: url, href: slug, icon} = menu;
			let is_active = state.expanded_menu==slug || location.pathname.includes(slug);

			return <li key={slug}>
				<div className={("navList__subheading row-appstore row--align-v-center"+(!children.length ? ' singular' : '')+(is_active ? ' navList__subheading--open' : '')).classNames(layout)} onClick={()=>setState({...state, expanded_menu: state.expanded_menu==slug ? null : slug})}>
					<Link to={children.length ? '#' : url} onClick={e=>children.length ? e.preventDefault() : 0}>
						<span className={"navList__subheading-icon".classNames(layout)}>
							<i className={icon + 'color-white font-size-20'.classNames()}></i>
						</span>
						<span className={"navList__subheading-title".classNames(layout)}>
							{label}
						</span>
					</Link>
				</div>
				{
					children.length && 
					<ul className={("subList"+(!is_active ? ' subList--hidden' : '')).classNames(layout)}>
						{children.map(child_menu=>{
							let {href: slug, text: label, href: url} = child_menu;
							let is_active = url==current_url;
							return <li key={slug} className={("subList__item"+(is_active ? ' subList__item--active' : '')).classNames(layout)}>
								<Link to={url}>{label}</Link>
							</li>
						})}
					</ul> || null
				}
			</li>
		})}
	</ul>
};
