import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";

import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { getElementDataSet } from "../utilities/helpers.jsx";

import "./styles/index.css";
import { ContextFrontendDashboard } from "../utilities/contexts.jsx";
import { MountPoint } from "../utilities/mountpoint.jsx";

import {
  Customers,
  Inventory,
  MyAccount,
  PurchasedApps,
  Reports,
  Sales,
  Subscriptions,
  InventoryReleaseManagment,
  InventoryEditApplication,
  InventoryAddApplication,
} from "./pages";
import { getDashboardPath } from "../utilities/helpers.jsx";

import Topbar from "./navigation/Topbar.jsx";
import Sidebar from "./navigation/Sidebar.jsx";
import { Scrollbar } from "../utilities/commons";
import { cn } from "../utilities/helpers.jsx";

function DashboardLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  
  useEffect(() => {
    if(window.innerWidth < 1040) {
      setSidebarOpen(false)
    }
  },[window.innerWidth])

  return (
    <div className={"theme-light bg-content-bg text-tertiary w-full !min-h-max !h-full flex flex-col overflow-y-clip".classNames()}>
      <Topbar {...{ sidebarOpen, setSidebarOpen }} />
      <div className={" relative flex flex-grow w-full min-h-max h-full overflow-clip".classNames()}>
        <Scrollbar scrollAreaRootClassName={cn(
                    sidebarOpen
                    ? " !sticky lg:!sticky sm:!absolute sm:inset-0 left-0 "
                    : " hidden lg:flex ",
          "bg-brand-white z-50 w-max !min-w-max h-full md:shadow-xl ")} scrollAreaViewportclassName={"bg-brand-white w-max [_div]:!w-max [_div]:!min-w-max".classNames()}>
          <Sidebar {...{ sidebarOpen, setSidebarOpen }} />
        </Scrollbar>
        <Scrollbar scrollAreaViewportClassName={" w-full"}>
          <div className={"p-7 pb-10 pt-4 max-w-screen-xl  min-h-max h-max w-full " + (sidebarOpen ? " hidden sm:block " : "  ")}>
            {children}
          </div>
        </Scrollbar>
      </div>
    </div>
  );
}


function Dashboard(props) {
  return <BrowserRouter>
		<ContextFrontendDashboard.Provider value={props.frontendDashboardData}>
			<DashboardLayout>
				<Routes>
					<Route path={getDashboardPath('purchased-apps')} element={<PurchasedApps />} />
					<Route path={getDashboardPath('subscriptions')} element={<Subscriptions />} />
					<Route path={getDashboardPath('my-account')} element={<MyAccount />} />

					<Route path={getDashboardPath("store/:store_slug/inventory")} element={<Inventory />} />
					<Route path={getDashboardPath("store/:store_slug/inventory/:id/release-management")} element={<InventoryReleaseManagment />} />
					<Route path={getDashboardPath("store/:store_slug/inventory/:id/edit")} element={<InventoryEditApplication />} />
					<Route path={getDashboardPath("store/:store_slug/inventory/add")} element={<InventoryAddApplication />} />
					<Route path={getDashboardPath("store/:store_slug/sales")} element={<Sales />} />
					<Route path={getDashboardPath("store/:store_slug/customers")} element={<Customers />} />
					<Route path={getDashboardPath("store/:store_slug/reports")} element={<Reports />} />

					{/* Redirects */}
					<Route path={getDashboardPath("*")} element={<Navigate to="purchased-apps" replace />} />
					<Route path={getDashboardPath("", false)} element={<Navigate to="purchased-apps" replace />} />
				</Routes>
			</DashboardLayout>
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
