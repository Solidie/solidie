import React from "react";
import Swal from "sweetalert2";
import { request } from "../../../../utilities/request.jsx";

export function CreateStoreModal() {
	const createStore = async () => {
		const { value: store_name } = await Swal.fire({
			input: 'text',
			inputLabel: 'Store Name',
			inputPlaceholder: 'Type your store name here...',
			inputAttributes: {
				'aria-label': 'Store Name'
			},
			showCancelButton: true
		});

		if (!store_name) {
			return;
		}

		request('create_store', {store_name}, response=>{
			let {success, data={}} = response;
			let {store_url} = data;

			if (success && store_url) {
				window.location.assign(store_url);
			}
		});
	}

	return <div>
		<button onClick={createStore}>Create Store</button>
	</div>
}