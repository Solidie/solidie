import React, { useEffect, useState } from 'react'
import InventoryTable from './segments/InventoryTable.jsx';
import { Link, useParams } from 'react-router-dom'
import { PlusIcon } from "@heroicons/react/24/solid";
import { request } from '../../../utilities/request.jsx';


const Inventory = (props) => {
	const {store_slug} = useParams();

	const [state, setState] = useState({
		loading: false,
		contents: [],
		filters: {
			store_slug,
			content_type: 'app',
			page: 1,
			limit: 15,
			search: null
		}
	});

	const fetchContents=()=>{
		setState({
			...state,
			loading: true
		});

		request( 'get_content_list', state.filters, response=>{
			let {contents=[]} = response?.data || {};

			setState({
				...state,
				contents,
				loading: false
			});
		} );
	}

	useEffect(()=>{
		fetchContents();
	}, []);

	return <div className={"flex flex-col gap-4 w-full h-full".classNames()}>
		<div className={"flex justify-between items-center w-full".classNames()}>
			<h1 className={"text-3xl font-bold".classNames()}>Inventory</h1>
			<Link to="add" ><div className='Button flex'>Add New <PlusIcon className={"h-4 w-4".classNames()} /></div></Link>
		</div>

		<InventoryTable contents={state.contents}/>
	</div>
}

export default Inventory