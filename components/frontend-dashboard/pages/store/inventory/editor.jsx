import React, { useEffect, useState } from "react";
import { request } from "../../../../utilities/request.jsx";

export function AppEditor(props) {
	let {app_id, store_id, onComplete} = props;

	const [state, setState] = useState({app_data:{}});

	const onChange=(el)=>{
		let {name, value} = el.currentTarget;
		setState({
			...state, 
			app_data: {
				...state.app_data, 
				[name]: value
			}
		});
	}

	const submitApp=()=>{
		let {app_data} = state;
		console.log(app_data);

		request('create_or_update_app', {app_data, store_id}, response=>{
			let {success} = response;
			onComplete();
		});
	}

	useEffect(()=>{
		// To Do: Get app data if id is provided
	}, []);

	return <div className="container">
		<div className="row">
			<div className="col">
				<label>App Name</label>
				<input name="app_name" className="regular-text" onChange={onChange} defaultValue={state.app_data.app_name}/>
			</div>
			<div className="col">
				<button onClick={submitApp}>{app_id ? 'Update' : 'Create'}</button>
			</div>
		</div>
	</div>
}