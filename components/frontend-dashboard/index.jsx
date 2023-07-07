import React from "react";
import ReactDOM from "react-dom/client";

import { BrowserRouter } from "react-router-dom";
import { getElementDataSet } from "../utilities/helpers.jsx";

import Layout from "./layout/index.jsx";
import AppRoutes from "./routes/index.jsx";

import "./styles/index.css";
import { ContextFrontendDashboard } from "../utilities/contexts.jsx";
import { MountPoint } from "../utilities/mountpoint.jsx";

function Dashboard(props) {
  return <BrowserRouter>
		<ContextFrontendDashboard.Provider value={props.frontendDashboardData}>
			<Layout>
				<AppRoutes />
			</Layout>
		</ContextFrontendDashboard.Provider>
	</BrowserRouter>
}

let dashboard = document.getElementById("Solidie_Dashboard");
if (dashboard) {
	ReactDOM.createRoot(dashboard).render(
		<MountPoint>
			<Dashboard {...getElementDataSet(dashboard)} />
		</MountPoint>
	);
}
