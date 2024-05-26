import React from "react";
import { HashRouter, Route, Navigate, Routes, useNavigate, useParams } from 'react-router-dom';

import {RenderExternal} from 'crewhrm-materials/render-external.jsx';
import {getDashboardPath} from 'crewhrm-materials/helpers.jsx';

import { Inventory } from "../../modules/inventory";
import { ContentEditor } from "../../modules/inventory/editor/ContentEditor";

function DashboardNavLayer({component, payload}) {
	const navigate = useNavigate();
	const params = useParams();
	return <RenderExternal component={component} payload={{...payload, navigate, params}}/>
}

export function InventoryBackend(props) {
	return <div className={'padding-15 bg-color-white height-p-100'.classNames()}>
		<HashRouter>
			<Routes>
				<Route path={getDashboardPath("inventory/:content_type?/")} element={<DashboardNavLayer component={Inventory} payload={props}/>} />
				<Route path={getDashboardPath("inventory/:content_type/editor/:content_id/:segment?/:segment_id?/")} element={<DashboardNavLayer component={ContentEditor} payload={props}/>} />
				<Route path={getDashboardPath("*")} element={<Navigate to="inventory" replace />} />
				<Route path={getDashboardPath("").replace(/\/+$/, '')} element={<Navigate to="inventory" replace />} />
			</Routes>
		</HashRouter>
	</div>
}
