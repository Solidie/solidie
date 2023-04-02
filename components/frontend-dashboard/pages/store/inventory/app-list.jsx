import React, { useEffect, useState } from "react";
import { ReleaseManager } from "./release-manager/release.jsx";

export function AppList(props) {
	const [state, setState] = useState({opened_app_id: null});
	const {apps=[]} = props;
	
	return <div>
		{
			state.opened_app_id && 
			<ReleaseManager app_id={state.opened_app_id} onBack={()=>setState({opened_app_id: null})}/> || 
			<table className="table">
				<thead>
					<tr>
						<th>Name</th>
						<th>Status</th>
					</tr>
				</thead>
				<tbody>
					{apps.map(app=>{
						let {app_name, app_status, app_id} = app;
						return <tr key={app_id} onClick={()=>setState({opened_app_id: app_id})}>
							<td>{app_name}</td>
							<td>{app_status}</td>
						</tr>
					})}
				</tbody>
			</table>
		}
	</div> 
}