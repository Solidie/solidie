import React, { useState } from 'react';
import { request } from '../../utilities/request.jsx';

export function SettingPage(props) {
	const {pages={}, savedSettings={}} = props;
	const [state, setState] = useState({changedSettings:{}});

	const saveOptions=()=>{
		request('save_admin_settings', state.changedSettings);
	}

	const onChange=(el)=>{
		let {name, value} = el.currentTarget;
		setState({...state, changedSettings:{...state.changedSettings, [name]: value}});
	}

	return <>
		<table className='form-table'>
			<tbody>
				<tr>
					<th scope='row'>
						<label>Dashboard</label>
					</th>
					<td>
						<select defaultValue={savedSettings.dashboard_page_id} name="dashboard_page_id" onChange={onChange}>
							<option>- Select -</option>
							{Object.keys(pages).map(id=>{
								return <option key={id} value={id}>
									{pages[id]}
								</option>
							})}
						</select>
					</td>
				</tr>
			</tbody>
		</table>	
		<button className='button button-primary' onClick={saveOptions}>Save</button>
	</>
}