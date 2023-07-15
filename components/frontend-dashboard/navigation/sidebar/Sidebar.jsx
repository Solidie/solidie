import React, { useContext, useMemo, useState } from "react";
import { MdSwitchAccount, MdInventory } from "react-icons/md";
import { Link, useLocation } from "react-router-dom";
import {
  CustomersIcon,
  ReportIcon,
  SalesIcon,
  SubscriptionIcon,
  PurchasedProductsIcon,
} from "../icons";
import { ContextFrontendDashboard } from "../../../utilities/contexts.jsx";
import { getDashboardPath } from "../../../utilities/helpers.jsx";

import layout from '../../layout.module.scss';

const Sidebar = ({ sidebarOpen }) => {
	const current_url = window.location.href.split('?')[0];

	const [state, setState] = useState({});
		
	const {stores=[]} = useContext(ContextFrontendDashboard);
	const location = useLocation();
	const groupedNavigation = useMemo(
		() => [
			{
				href: getDashboardPath('purchased-apps'),
				text: "Purchased Apps",
				icon: <PurchasedProductsIcon />,
			},
			{
				href: getDashboardPath('subscriptions'),
				text: "Subscriptions",
				icon: <SubscriptionIcon />,
			},
			{
				href: getDashboardPath('my-account'),
				text: "My Account",
				icon: <MdSwitchAccount className={"text-2xl".classNames()} />,
			},
			...stores.map(store=>{
				let {store_slug, store_name} = store;
				return {
					href: '#',
					text: store_name,
					children: [
						{
							href: getDashboardPath(`store/${store_slug}/inventory`),
							text: "Inventory",
							icon: <MdInventory className={"text-2xl".classNames()} />,
						},
						{
							href: getDashboardPath(`store/${store_slug}/sales`),
							text: "Sales",
							icon: <SalesIcon />,
						},
						{
							href: getDashboardPath(`store/${store_slug}/customers`),
							text: "Customers",
							icon: <CustomersIcon />,
						},
						{
							href: getDashboardPath(`store/${store_slug}/reports`),
							text: "Reports",
							icon: <ReportIcon />,
						},
					],
				}
			})
		],
		[]
	);


	return <ul className={"navList".classNames(layout)}>
		{groupedNavigation.map(menu=>{
			let {children=[], text: label, href: url, href: slug} = menu;
			let is_active = state.expanded_menu==slug || location.pathname.includes(slug);

			return <li key={slug}>
				<div className={("navList__subheading row-appstore row--align-v-center"+(!children.length ? ' singular' : '')+(is_active ? ' navList__subheading--open' : '')).classNames(layout)} onClick={()=>setState({...state, expanded_menu: state.expanded_menu==slug ? null : slug})}>
					<Link to={children.length ? '#' : url} onClick={e=>children.length ? e.preventDefault() : 0}>
						<span className={"navList__subheading-icon".classNames(layout)}><i className={null}></i></span>
						<span className={"navList__subheading-title".classNames(layout)}>{label}</span>
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

export default Sidebar;
