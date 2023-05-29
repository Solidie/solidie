import React, { useEffect, useState } from "react";
import { ReleaseManager } from "./release-manager/release.jsx";

export function AppList(props) {
	const [state, setState] = useState({opened_item_id: null});
	const {items=[]} = props;
	
	return <div>
		{
			state.opened_item_id && 
			<ReleaseManager item_id={state.opened_item_id} onBack={()=>setState({opened_item_id: null})}/> || 
			<table className="table">
				<thead>
					<tr>
						<th>Name</th>
						<th>Status</th>
					</tr>
				</thead>
				<tbody>
					{items.map(item=>{
						let {item_name, item_status, item_id} = item;
						return <tr key={item_id} onClick={()=>setState({opened_item_id: item_id})}>
							<td>{item_name}</td>
							<td>{item_status}</td>
						</tr>
					})}
				</tbody>
			</table>
		}
	</div> 
}