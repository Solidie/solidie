import React, { useEffect, useState } from 'react';
import { request } from '../../../utilities/request.jsx';

export function AppList() {
	const [state, setState] = useState({apps: [], loading: true});

	const getApps=()=>{
		request('get_my_app_list', function(apps){
			
		});
	}

	useEffect(()=>{
		getApps();
	}, []);

	return <div>
		{!state.apps.length && <p>No App Yet</p>}
		{state.apps.map(app=>{
			let {app_name, app_id} = app;
			return <div key={app_id}>
				{app_name}
			</div>
		})}
	</div>
}