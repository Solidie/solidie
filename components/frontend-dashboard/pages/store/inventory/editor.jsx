import React, { useEffect, useState } from "react";
import { request } from "../../../../utilities/request.jsx";

export function AppEditor(props) {
	let {item_id, store_id, onComplete} = props;

	const [state, setState] = useState({item_data:{}});

	const onChange=(el)=>{
		let {name, value} = el.currentTarget;
		setState({
			...state, 
			item_data: {
				...state.item_data, 
				[name]: value
			}
		});
	}

	const submitApp=()=>{
		let {item_data} = state;
		console.log(item_data);

		request('create_or_update_item', {item_data, store_id}, response=>{
			let {success} = response;
			onComplete();
		});
	}

	useEffect(()=>{
		// To Do: Get item data if id is provided
	}, []);

	return <div className="container">
		<div className="row">
			<div className="col">
				<label>App Name</label>
				<input name="item_name" className="regular-text" onChange={onChange} defaultValue={state.item_data.item_name}/>
			</div>
			<div className="col">
				<button onClick={submitApp}>{item_id ? 'Update' : 'Create'}</button>
			</div>
		</div>
	</div>
}