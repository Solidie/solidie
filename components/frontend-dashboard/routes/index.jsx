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
} from "../pages";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="dashboard/purchased-apps" element={<PurchasedApps />} />
      <Route path="dashboard/subscriptions" element={<Subscriptions />} />
      <Route path="dashboard/my-account" element={<MyAccount />} />
      <Route path="dashboard/inventory" element={<Inventory />} />
      <Route path="dashboard/sales" element={<Sales />} />
      <Route path="dashboard/customers" element={<Customers />} />
      <Route path="dashboard/reports" element={<Reports />} />
      {/* Redirects */}
      <Route path="dashboard/*" element={<Navigate to="purchased-apps" replace />} />
      <Route path="dashboard" element={<Navigate to="purchased-apps" replace />} />
    </Routes>
  );
};

export default AppRoutes;
