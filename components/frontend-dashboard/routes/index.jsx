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

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/dashboard/purchased-apps" element={<PurchasedApps />} />
      <Route path="/dashboard/subscriptions" element={<Subscriptions />} />
      <Route path="/dashboard/my-account" element={<MyAccount />} />

      <Route path="/dashboard/store/:store_slug/inventory" element={<Inventory />} />
      <Route path="/dashboard/store/:store_slug/inventory/:id/release-management" element={<InventoryReleaseManagment />} />
      <Route path="/dashboard/store/:store_slug/inventory/:id/edit" element={<InventoryEditApplication />} />
      <Route path="/dashboard/store/:store_slug/inventory/add" element={<InventoryAddApplication />} />
      <Route path="/dashboard/store/:store_slug/sales" element={<Sales />} />
      <Route path="/dashboard/store/:store_slug/customers" element={<Customers />} />
      <Route path="/dashboard/store/:store_slug/reports" element={<Reports />} />

      {/* Redirects */}
      <Route path="dashboard/*" element={<Navigate to="purchased-apps" replace />} />
      <Route path="dashboard" element={<Navigate to="purchased-apps" replace />} />
    </Routes>
  );
};

export default AppRoutes;
