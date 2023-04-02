import React, { useEffect, useState } from "react";
import { request } from "../../../../../utilities/request.jsx";

export function ReleaseManager(props) {
	const {app_id, onBack} = props;
	const [state, setState] = useState({releases:[], release_form:{}});

	const getReleases=()=>{
		request('get_app_release_history', {app_id}, response=>{
			let {success, data:{releases=[]}} = response;

			setState({releases});
		})
	}

	const onChange=(el, is_file)=>{
		let {name, value, files, type} = el.currentTarget;

		if (type=='file') {
			value = (files && files[0]) ? files[0] : null;
		}

		setState({
			...state, 
			release_form: {
				...state.release_form, 
				[name]:value
			}
		});
	}

	const pushRelease=()=>{
		let {version, changelog, file} = state.release_form;
		
		let payload = new FormData();
		payload.append('version', version);
		payload.append('changelog', changelog);
		payload.append('app_file', file, file.name);

		request('push_version_release', payload, response=>{
			let {success, data} = response;
			console.log(data);

		}, uplaod_percent=>{
			console.log('Upload: '+uplaod_percent);
		});
	}

	useEffect(()=>{
		getReleases();
	}, []);

	return <div>
		<br/>
		<button onClick={onBack}>Back</button>
		<br/>
		<div>
			<div>
				<p>Version</p>
				<input type="text" className="text-control" name="version" onChange={onChange}/>
			</div>
			<div>
				<p>Changelog (Separated by new line with leading hyphen)</p>
				<textarea className="text-control" name="changelog" onChange={onChange}></textarea>
			</div>
			<div>
				<p>File</p>
				<input name="file" type="file" onChange={onChange}/>
			</div>
			<button onClick={pushRelease}>Push Release</button>
		</div>
		<table>
			<thead>
				<tr>
					<th>Version</th>
					<th>Changelog</th>
					<th>Action</th>
				</tr>
			</thead>
			<tbody>
				{state.releases.map(release=>{
					let {version, download_url, changelog} = release;

					return <tr>
						<td>{version}</td>
						<td>{changelog}</td>
						<td>{download_url}</td>
					</tr>
				})}
			</tbody>
		</table>
	</div>
}