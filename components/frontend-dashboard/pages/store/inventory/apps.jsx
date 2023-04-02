import React, { useEffect, useState } from 'react';
import { request } from '../../../../utilities/request.jsx';
import { AppEditor } from './editor.jsx';
import { AppList } from './app-list.jsx';

export function Inventory(props) {
	let {store_id} = props;
	const [state, setState] = useState({
		apps: [], 
		loading: true, 
	});

	const getApps=()=>{
		setState({loading: true});
		
		request('get_store_app_list', {store_id}, function(response){
			let {success, data:{apps=[]}} = response;

			console.log(apps);

			setState({loading: true, apps});
		});
	}

	useEffect(()=>{
		getApps();
	}, []);

	return <div>
		<AppEditor store_id={store_id} onComplete={getApps}/>
		<AppList apps={state.apps}/>
	</div>
}