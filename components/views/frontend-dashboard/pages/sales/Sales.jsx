import React, { useEffect, useState } from 'react'

import { request } from 'crewhrm-materials/request.jsx';

import { TableStat } from '../../../../materials/table-stat.jsx';

export function Sales() {
	const [state, setState] = useState({sales:[], fetching: false});

	const getSales=()=>{
		setState({...state, fetching: true});

		request('getSalesData', {}, resp=>{
			let {sales=[]} = resp?.data || {};
			setState({...state, sales, fetching: false});
		})
	}

	useEffect(()=>{
		getSales();
	}, []);

  	return <div className={"flex flex-col gap-4 width-p-100 height-p-100".classNames()}>
		<div className={"flex justify-between items-center width-p-100".classNames()}>
			<h1 className={"text-3xl font-bold".classNames()}>Sales</h1>
		</div>

		<table className={'solidie-ui-table solidie-ui-table-responsive'.classNames()}>
			<thead>
				<tr>
					<th>Order ID</th>
					<th>Purchased Content</th>
					<th>Price</th>
					<th>Customer Email</th>
					<th>Sold Date</th>
				</tr>
			</thead>
			<tbody>
				{state.sales.map(sale=>{
					let {sale_id, order_id, customer_email, content_title, sale_price, sold_time } = sale;
					return <tr key={sale_id}>
						<td data-th="Order ID">{order_id}</td>
						<td data-th="Purchased Content">{content_title}</td>
						<td data-th="Price">${sale_price}</td> {/* To Do: Make symbol dynamic */}
						<td data-th="Customer Email">{customer_email}</td>
						<td data-th="Sold Date">{sold_time}</td>
					</tr>
				})}
				<TableStat fetching={state.fetching} length={state.sales.length} colSpan={5}/>
			</tbody>
		</table>
    </div>
}
