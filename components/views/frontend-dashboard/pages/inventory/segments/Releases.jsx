import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { request } from "crewhrm-materials/request.jsx";

export function InventoryReleaseManagment() {

	const {content_id} = useParams();
	const [state, setState] = useState({releases:[]});

	const fetchRelease=()=>{
		request('fetch_releases', {content_id}, resp=>{
			let {releases=[]} = resp?.data || {};
			setState({...state, releases});
		});
	}

	useEffect(()=>{
		fetchRelease();
	}, []);

	return <div className={"text-tertiary flex flex-col gap-8 w-full h-max min-h-full".classNames()}>
		<div className={"flex flex-col justify-center w-full gap-4".classNames()}>
			<button onClick={window.history.back} className={"flex gap-2 justify-around items-center w-max bg-primary hover:bg-primary/70 focus:text-green-900 focus:outline-green-900 text-tertiary font-bold text-sm px-6 py-2 rounded-full shadow-xl active:animate-bounce shadow-primary border border-tertiary/5 cursor-pointer".classNames()}>
				<i className={'s-icon s-icon-arrow-left'.classNames()}></i> Back
			</button>
			
			<div className={"flex justify-between items-center w-full".classNames()}>
				<h1 className={"text-3xl font-bold".classNames()}>Releases</h1>
				<Link to="new">
					<div className='Button flex'>
						New Release <i className={'s-icon s-icon-plus'.classNames()}></i>
					</div>
				</Link>
			</div>
		</div>

		<div className={'solidie-ui-table-wrapper'.classNames()}>
			<table className={'solidie-ui-table solidie-ui-table-responsive'.classNames()}>
				<thead>
					<tr>
						<th>Version</th>
						<th>Date</th>
						<th>Download</th>
					</tr>
				</thead>
				<tbody>
					{state.releases.map(release=>{
						let {version, release_date, download_url='#', release_id} = release;
						return <tr key={release_id}>
							<td data-th="Version">{version}</td>
							<td data-th="Release Date">{release_date}</td>
							<td data-th="Download"><a href={download_url}>Download</a></td>
						</tr>
					})}
				</tbody>
			</table>
		</div>
    </div>
};
