import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import { getElementDataSet } from "../utilities/helpers.jsx";
import "./style.css";
import { BrowserRouter } from "react-router-dom";
import { ElementProps } from "./contexts/index.js";
import Layout from "./layout/index.jsx";
import AppRoutes from "./routes/index.jsx";

// Fahad: Use React for all the dashboard pages

function Dashboard(props) {
  const [elementProps, setElementProps] = useState({});

  useEffect(() => {
    setElementProps(props);
  }, []);
  return (
    <BrowserRouter>
      <ElementProps.Provider value={[elementProps, setElementProps]}>
        <Layout>
          <AppRoutes />
        </Layout>
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
