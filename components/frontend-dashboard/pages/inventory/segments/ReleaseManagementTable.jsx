import React, { useEffect, useState } from 'react';
import { request } from '../../../../utilities/request.jsx';
import { useParams } from 'react-router-dom';

export function ReleaseManagementTable() {
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

  return <div>
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
