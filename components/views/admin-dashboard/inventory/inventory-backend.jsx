import React from "react";
import { HashRouter, Route, Navigate, Routes } from 'react-router-dom';

import {data_pointer} from 'crewhrm-materials/helpers.jsx';

import { Inventory } from "../../modules/inventory";
import { ContentEditor } from "../../modules/inventory/ContentEditor";
import { getPath } from "../../frontend/catalog";

export const getDashboardPath=(rel_path)=>{
	const { settings: {dashboard: {slug: dashboard_slug}}, is_admin } = window[data_pointer];
	return getPath( (is_admin ? '' : dashboard_slug) + '/' + rel_path );
}

export function InventoryBackend(props) {
	return <div className={'padding-15 bg-color-white'.classNames()}>
		<HashRouter>
			<Routes>
				<Route path={getDashboardPath("inventory/:content_type?/")} element={<Inventory {...props}/>} />
				<Route path={getDashboardPath("inventory/:content_type/editor/:content_id")} element={<ContentEditor {...props}/>} />
				<Route path={getDashboardPath("*")} element={<Navigate to="inventory" replace />} />
				<Route path={getDashboardPath("").replace(/\/+$/, '')} element={<Navigate to="inventory" replace />} />
			</Routes>
		</HashRouter>
	</div>
}
