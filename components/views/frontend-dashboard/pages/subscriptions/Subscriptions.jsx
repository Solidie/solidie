import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import { request } from 'crewhrm-materials/request.jsx';

import { TableStat } from '../../../../materials/table-stat.jsx';

export function Subscriptions () {
	const [state, setState] = useState({subscriptions: [], fetching: false});

	const getSubscriptions=()=>{
		setState({...state, fetching: true});

		request('get_subscriptions_data', {}, resp=>{
			let {subscriptions=[]} = resp?.data || {};
			setState({...state, subscriptions, fetching: false});
		});
	}

	useEffect(()=>{
		getSubscriptions();
	}, []);

  	return <div className={"flex flex-col gap-4 width-p-100 height-p-100".classNames()}>
		<div className={"flex justify-between items-center width-p-100".classNames()}>
			<h1 className={"text-3xl font-bold".classNames()}>Subscriptions</h1>
			<Link to="add" >
				<div className='Button flex'>
					Add New <i className={'s-icon s-icon-plus'.classNames()}></i>
				</div>
			</Link>
		</div>

		<table className={'solidie-ui-table solidie-ui-table-responsive'.classNames()}>
			<thead>
				<tr>
					<th>Order ID</th>
					<th>Content</th>
					<th>Plan</th>
					<th>Expire Date</th>
					<th>Action</th>
				</tr>
			</thead>
			<tbody>
				{state.subscriptions.map(subscription=>{
					return null;
				})}

				<TableStat fetching={state.fetching} length={state.subscriptions.length} colSpan={5}/>
			</tbody>
		</table>
    </div>
}
