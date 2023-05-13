import React from "react";
import ReactDOM from "react-dom/client";
import { Router } from "@reach/router";
import { getElementDataSet } from "../utilities/helpers.jsx";
import "./style.css";
import Layout from "./layout.jsx";
import { PurchasedApps, NotFound, Subscriptions, MyAccount, Inventory, Sales, Customers, Reports } from "./pages";
import { Redirect } from "@reach/router";

// Fahad: Use React for all the dashboard pages

function Dashboard(props) {
  return (
    <Router>
      <Redirect from="dashboard" to="purchased-apps" />
      <Layout path="dashboard" {...{ props }}>
        <PurchasedApps path="purchased-apps" />
        <Subscriptions path="subscriptions" />
        <MyAccount path="my-account" />
        <Inventory path="inventory" />
        <Sales path="sales" />
        <Customers path="customers" />
        <Reports path="reports" />
        <NotFound default />
      </Layout>
      <NotFound default />
    </Router>
  );
}

let dashboard = document.getElementById("AppStore_Dashboard");
if (dashboard) {
  ReactDOM.createRoot(dashboard).render(
    <Dashboard {...getElementDataSet(dashboard)} />
  );
}
