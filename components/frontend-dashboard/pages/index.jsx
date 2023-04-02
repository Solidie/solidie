import React from 'react';
import { CreateStoreModal } from '../modules/create-store/create-store.jsx';

export function DashboardIndex(props) {
	let {stores=[]} = props;

	return <div>
		<h3>App Stores</h3>
		{
			!stores.length && <p>You have no stores. Create one to sell apps.</p> || 
			<div>
				{stores.map(store=>{
					let {name, slug} = store;
					return <div key={slug}>
						<a href={"/dashboard/store/"+slug+"/inventory/"}>{name}</a>
					</div>
				})}
			</div>
		}
		
		<CreateStoreModal/>
	</div>
}