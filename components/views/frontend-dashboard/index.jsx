import React, { useEffect, useState, createContext } from "react";
import {createRoot} from "react-dom/client";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import { MountPoint } from "crewhrm-materials/mountpoint.jsx";
import { data_pointer, getElementDataSet } from "crewhrm-materials/helpers.jsx";

import {Topbar} from "./navigation/Topbar.jsx";
import {Sidebar} from "./navigation/sidebar/Sidebar.jsx";
import { VersionReleaseForm } from "./pages/inventory/segments/ApplicationVersionForm.jsx";
import { InventoryReleaseManagment } from "./pages/inventory/segments/Releases.jsx";
import { PurchasedApps } from "./pages/purchases/Purchases.jsx";
import { Sales } from "./pages/sales/Sales.jsx";
import { Subscriptions } from "./pages/subscriptions/Subscriptions.jsx";
import { MyAccount } from "./pages/my-account/MyAccount.jsx";

import { Inventory } from "./pages/inventory/index.jsx";
import { EditApplication } from "./pages/inventory/EditApplication.jsx";
import { ContentEditor } from "./pages/inventory/ContentEditor.jsx";
import {Reports} from "./pages/reports/Reports.jsx";
import { getPath } from "../frontend/catalog/index.jsx";

import layout from './style.module.scss';

export const getDashboardPath=(rel_path, append_slash=true)=>{
	const { settings: {dashboard: {slug: dashboard_slug}} } = window[data_pointer];
	const slash = append_slash ? (rel_path.indexOf( '/' ) === 0 ? '' : '/') : '';
	return getPath( dashboard_slug + slash + rel_path );
}

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
			<div className={"sidenav__profile".classNames(layout)}>
				<div className={"sidenav__profile-avatar".classNames(layout)} style={{backgroundImage: 'url('+avatar_url+')'}}></div>
				<div className={"sidenav__profile-title text-light".classNames(layout)}>John Doe</div>
			</div>
			<div className={"row-appstore row--align-v-center row--align-h-center".classNames(layout)}>
				<Sidebar/>
			</div>
		</aside>

		<main className={"main".classNames(layout) + 'overflow-auto'.classNames()}>
			{props.children}
		</main>

		{should_open && state.is_mobile_view && <div className={"sidebar-underlay".classNames(layout)} onClick={()=>window.history.back()}></div> || null}
	</div>
}


function Dashboard(props) {
  return <BrowserRouter>
		<D>
			<Routes>
				<Route path={getDashboardPath('purchased-apps')} element={<PurchasedApps/>} />
				<Route path={getDashboardPath('subscriptions')} element={<Subscriptions/>} />
				<Route path={getDashboardPath('my-account')} element={<MyAccount/>} />

				<Route path={getDashboardPath("inventory/:content_type?/")} element={<Inventory/>} />
				<Route path={getDashboardPath("inventory/:content_type/editor/:content_id")} element={<ContentEditor/>} />

				{/* <Route path={getDashboardPath("inventory/:content_type/:content_id/release-management")} element={<InventoryReleaseManagment />} />
				<Route path={getDashboardPath("inventory/:content_type/:content_id/release-management/new")} element={<VersionReleaseForm />} />
				<Route path={getDashboardPath("inventory/:content_type/:content_id/edit/:release_id")} element={<EditApplication/>} /> */}
				<Route path={getDashboardPath("sales")} element={<Sales/>} />
				<Route path={getDashboardPath("reports")} element={<Reports/>} />

				{/* Redirects */}
				<Route path={getDashboardPath("*")} element={<Navigate to="purchased-apps" replace />} />
				<Route path={getDashboardPath("", false)} element={<Navigate to="purchased-apps" replace />} />
			</Routes>
		</D>
	</BrowserRouter>
}

let dashboard = document.getElementById("Solidie_Dashboard");
if (dashboard) {
	createRoot(dashboard).render(
		<MountPoint element={dashboard}>
			<Dashboard {...getElementDataSet(dashboard)} />
		</MountPoint>
	);
}
