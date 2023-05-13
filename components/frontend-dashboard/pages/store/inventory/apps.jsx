import React, { useEffect, useState } from 'react';
import { request } from '../../../../utilities/request.jsx';
import { AppEditor } from './editor.jsx';
import { AppList } from './app-list.jsx';

function Release(props) {
	const {release_id, app_id} = props;
	const [state, setState] = useState({app_id});

	const release=()=>{
		console.log(state);

		request( 'push_version_release', state );
	}
	
	return <div>
		<input type='text' onChange={e=>setState({...state, version: e.currentTarget.value})}/> <br/>
		<textarea onChange={e=>setState({...state, changelog: e.currentTarget.value})}></textarea> <br/>
		<input type='file' onChange={e=>setState({...state, file: e.currentTarget.files[0]})}/> <br/>

		<button onClick={release}>Save</button>
	</div>
}

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
		{/* <AppEditor store_id={store_id} onComplete={getApps}/>
		<AppList apps={state.apps}/> */}
		<Release app_id={7}/>
	</div>
}