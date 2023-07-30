import React, { useState } from 'react';
import { request } from '../../utilities/request.jsx';

export function SettingPage(props) {
	const {savedSettings={}, manifest} = props;
	const [state, setState] = useState({});

	const saveOptions=()=>{
		request('save_admin_settings', {'solidie_settings': state.changedSettings});
	}

	const onChange=(module, key, value)=>{
		const {changedSettings={}} = state;

		setState({
			...state, 
			changedSettings:{
				...changedSettings, 
				[module]: {
					...changedSettings.module,
					[key]: value
				}
			}
		});
	}

	const onchangeContents=(content_id, key, value)=>{
		const {changedSettings={}} = state;
		const {contents={}} = changedSettings;

		setState({
			...state,
			changedSettings:{
				...changedSettings,
				contents:{
					...contents,
					[content_id]: {
						[key]: value
					}
				}
			}
		});
	}

	return <>
		<table className='form-table'>
			<tbody>
				<tr>
					<th scope='row'>
						<label>What you'd sell</label>
					</th>
					<td>
						<table>
							<tbody>
								<tr>
									<td><b>Content</b></td>
									<td><b>Product Base Slug</b></td>
									<td><b>Enable</b></td>
								</tr>
								{
									Object.keys(manifest.contents).map(key=>{
										let {label, description} = manifest.contents[key];
										return <tr key={key}>
											<td style={{width: '190px'}}>
												{label} <br/>
												<small>{description}</small>
											</td>
											<td>
												<input type='text' name={'content['+key+'][slug]'} defaultValue={savedSettings?.contents?.[key]?.slug || key} className='regular-text' onChange={e=>onchangeContents(key, 'slug', e.currentTarget.value)}/>
											</td>
											<td>
												<input type='checkbox' name={'content['+key+'][enable]'} defaultChecked={savedSettings?.contents?.[key]?.enable || false} onChange={e=>onchangeContents(key, 'enable', e.currentTarget.checked)}/>
											</td>
										</tr>
									})
								}
							</tbody>
						</table>
					</td>
				</tr>
				<tr>
					<th scope='row'>
						<label>{savedSettings.dashboard.label} Base Slug</label>
					</th>
					<td>
						<input type="text" defaultValue={savedSettings?.dashboard?.slug} onChange={e=>onChange('dashboard', 'slug', e.currentTarget.value)} className='regular-text'/>
					</td>
				</tr>
			</tbody>
		</table>	
		<button className='button button-primary' onClick={saveOptions} disabled={!state.changedSettings}>Save</button>
	</>
}