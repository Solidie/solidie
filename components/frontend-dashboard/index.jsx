import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";

import { BrowserRouter } from "react-router-dom";
import { getElementDataSet } from "../utilities/helpers.jsx";

import { ElementProps, UserProfileUrl } from "./contexts/index.js";
import Layout from "./layout/index.jsx";
import AppRoutes from "./routes/index.jsx";

import "./styles/index.css";

// Fahad: Use React for all the dashboard pages

function Dashboard(props) {
  const [elementProps, setElementProps] = useState({});
  const [userProfileUrl, setUserProfileUrl] = useState("");

  useEffect(() => {
    setElementProps(props);
    if (props?.frontendDashboardData?.avatar_url) {
      setUserProfileUrl(props?.frontendDashboardData?.avatar_url);
    }
  }, []);
  return (
    <BrowserRouter>
      <ElementProps.Provider value={[elementProps, setElementProps]}>
        <UserProfileUrl.Provider value={[userProfileUrl, setUserProfileUrl]}>
          <Layout>
            <AppRoutes />
          </Layout>
        </UserProfileUrl.Provider>
      </ElementProps.Provider>
    </BrowserRouter>
  );
}

let dashboard = document.getElementById("AppStore_Dashboard");
if (dashboard) {
  ReactDOM.createRoot(dashboard).render(
    <Dashboard {...getElementDataSet(dashboard)} />
  );
}
