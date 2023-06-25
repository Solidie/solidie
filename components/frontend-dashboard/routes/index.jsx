import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
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
} from "../pages";
import { getDashboardPath } from "../../utilities/helpers.jsx";

const AppRoutes = () => {

  	return <Routes>
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
};

export default AppRoutes;
