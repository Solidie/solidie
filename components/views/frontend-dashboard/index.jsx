import React, { useEffect, useState, createContext } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import '../../utilities/prototypes.jsx';
import { getElementDataSet, getDashboardPath } from "../../utilities/helpers.jsx";
import Topbar from "./navigation/Topbar.jsx";
import Sidebar from "./navigation/sidebar/Sidebar.jsx";
import { VersionReleaseForm } from "./pages/inventory/segments/ApplicationVersionForm.jsx";
import { InventoryReleaseManagment } from "./pages/inventory/segments/Releases.jsx";
import { PurchasedApps } from "./pages/purchases/Purchases.jsx";
import { Sales } from "./pages/sales/Sales.jsx";
import { Subscriptions } from "./pages/subscriptions/Subscriptions.jsx";
import { MountPoint } from "../../materials/mountpoint.jsx";
import { MyAccount } from "./pages/my-account/MyAccount.jsx";

import layout from './style.module.scss';
import { Inventory } from "./pages/inventory/index.jsx";
import { EditApplication } from "./pages/inventory/EditApplication.jsx";
import { AddApplication } from "./pages/inventory/AddApplication.jsx";
import {Reports} from "./pages/reports/Reports.jsx";

export const ContextFrontendDashboard = createContext();

/* Dashboard Layout Adopted from https://codepen.io/trooperandz/pen/EOgJvg */

function D(props) {
	const [state, setState] = useState({
		active_slug: null,
		expanded_menu: null,
		sidebar_open: false,
		is_mobile_view: window.innerWidth <= 767,
		sidebar_open: window.location.href.endsWith('#navigation')
	});

	const $ = window.jQuery;
	let {avatar_url} = props.frontendDashboardData || {};

	const setTemplate=()=>{
		/* Scripts for css grid dashboard */

		setSidenavListeners();

		function toggleClass(el, className) {
			if (el.hasClass(className)) {
				el.removeClass(className);
			} else {
				el.addClass(className);
			}
		}
		
		// Sidenav list sliding functionality
		function setSidenavListeners() {
			const subHeadings = $('.'+'navList__subheading'.classNames(layout));
			const SUBHEADING_OPEN_CLASS = 'navList__subheading--open'.classNames(layout);
			const SUBLIST_HIDDEN_CLASS = 'subList--hidden'.classNames(layout);

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
	}

	const openSidebar=()=>{
		setState({
			...state,
			sidebar_open: true
		});
		window.history.pushState({}, '', '#navigation');
	}

	const sidebarListeners=()=>{
		setState({
			...state,
			sidebar_open: window.location.href.endsWith('#navigation')
		});
	}

	useEffect(()=>{
		setTemplate();
		window.addEventListener('popstate', sidebarListeners);
		window.addEventListener('resize', ()=>{
			setState({
				...state,
				sidebar_open: false,
				is_mobile_view: window.innerWidth <= 767
			})
		})
	}, []);

	let should_open = !state.is_mobile_view || state.sidebar_open;
	let sidebar_class = ('sidenav' + (should_open ? ' sidenav--active' : '')).classNames(layout);
	let grid_class = ('grid' + (should_open ? ' grid--noscroll' : '')).classNames(layout);

	return <div className={grid_class}>
		<header className={"header".classNames(layout)}>
			<Topbar>
				{state.is_mobile_view && <i className="fas fa-bars header__menu" onClick={openSidebar}></i> || null}
			</Topbar>
		</header>

		<aside className={sidebar_class}>
			{/* <div className={"sidenav__brand".classNames(layout)}>
				<i className="fas fa-feather-alt sidenav__brand-icon"></i>
				<a className={"sidenav__brand-link".classNames(layout)} href="#">App<span className={"text-light".classNames(layout)}>Pro</span></a>
				<i className="fas fa-times sidenav__brand-close"></i>
			</div> */}
			<div className={"sidenav__profile".classNames(layout)}>
				<div className={"sidenav__profile-avatar".classNames(layout)} style={{backgroundImage: 'url('+avatar_url+')'}}></div>
				<div className={"sidenav__profile-title text-light".classNames(layout)}>John Doe</div>
			</div>
			<div className={"row-appstore row--align-v-center row--align-h-center".classNames(layout)}>
				<Sidebar/>
			</div>
		</aside>

		<main className={"main".classNames(layout)}>
			{props.children}
		</main>

		<footer className={"footer".classNames(layout)}>
			<p><span className={"footer__copyright".classNames(layout)}>&copy;</span> 2018 MTH</p>
			<p>Crafted with <i className="fas fa-heart footer__icon"></i> by <a href="https://www.linkedin.com/in/matt-holland/" target="_blank" className="footer__signature">Matt H</a></p>
		</footer>
		
		{should_open && state.is_mobile_view && <div className={"sidebar-underlay".classNames(layout)} onClick={()=>window.history.back()}></div> || null}
	</div>
}


function Dashboard(props) {
  return <BrowserRouter>
		<ContextFrontendDashboard.Provider value={props.frontendDashboardData}>
			<D>
				<Routes>
					<Route path={getDashboardPath('purchased-apps')} element={<PurchasedApps/>} />
					<Route path={getDashboardPath('subscriptions')} element={<Subscriptions/>} />
					<Route path={getDashboardPath('my-account')} element={<MyAccount/>} />

					<Route path={getDashboardPath("store/:store_slug/inventory")} element={<Inventory/>} />
					<Route path={getDashboardPath("store/:store_slug/inventory/:content_id/release-management")} element={<InventoryReleaseManagment />} />
					<Route path={getDashboardPath("store/:store_slug/inventory/:content_id/release-management/new")} element={<VersionReleaseForm />} />
					<Route path={getDashboardPath("store/:store_slug/inventory/:content_id/edit/:release_id")} element={<EditApplication/>} />
					<Route path={getDashboardPath("store/:store_slug/inventory/add")} element={<AddApplication/>} />
					<Route path={getDashboardPath("store/:store_slug/sales")} element={<Sales/>} />
					<Route path={getDashboardPath("store/:store_slug/reports")} element={<Reports/>} />

					{/* Redirects */}
					<Route path={getDashboardPath("*")} element={<Navigate to="purchased-apps" replace />} />
					<Route path={getDashboardPath("", false)} element={<Navigate to="purchased-apps" replace />} />
				</Routes>
			</D>
		</ContextFrontendDashboard.Provider>
	</BrowserRouter>
}

let dashboard = document.getElementById("Solidie_Dashboard");
if (dashboard) {
	ReactDOM.createRoot(dashboard).render(
		<MountPoint element={dashboard}>
			<Dashboard {...getElementDataSet(dashboard)} />
		</MountPoint>
	);
}
