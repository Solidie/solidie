import React, { useContext, useState } from 'react';
import { request } from 'crewhrm-materials/request.jsx';
import { __ } from 'crewhrm-materials/helpers.jsx';
import { ToggleSwitch } from 'crewhrm-materials/toggle-switch/ToggleSwitch.jsx';
import { TextField } from 'crewhrm-materials/text-field/text-field.jsx';
import { ContextToast } from 'crewhrm-materials/toast/toast.jsx';
import { LoadingIcon } from 'crewhrm-materials/loading-icon/loading-icon.jsx';

import table_style from '../../../materials/styles/table.module.scss';

export function SettingPage(props) {
	const {savedSettings={}, manifest} = props;
	const {ajaxToast} = useContext(ContextToast);

	const [state, setState] = useState({
		saving: false,
		settings: savedSettings
	});

	const saveOptions=()=>{
		setState({...state, saving: true});
		request('saveAdminSettings', {'solidie_settings': state.settings}, resp=>{
			setState({...state, saving: false});
			ajaxToast(resp);
		});
	}

	const onChange=(module, key, value)=>{
		const {settings={}} = state;

		setState({
			...state, 
			settings:{
				...settings, 
				[module]: {
					...settings.module,
					[key]: value
				}
			}
		});
	}

	const onChangeContents=(content_key, name, value)=>{
		const {settings={}} = state;
		const {contents={}} = settings;

		setState({
			...state,
			settings:{
				...settings,
				contents:{
					...contents,
					[content_key]: {
						...contents[content_key],
						[name]: value
					}
				}
			}
		});
	}

	return <div className={'padding-15 bg-color-white'.classNames()}>
		<div style={{maxWidth: '600px', margin: 'auto'}}>
			<br/>
			<strong className={'d-block font-size-24 font-weight-600'.classNames()}>
				{__('Manage content types')}
			</strong>
			<br/>
			<br/>

			<table className={'table'.classNames(table_style)}>
				<thead>
					<tr>
						<th>{__('Content')}</th>
						<th>{__('Base Slug')}</th>
					</tr>
				</thead>
				<tbody>
					{
						Object.keys(manifest.contents).map(key=>{
							let {label, description} = manifest.contents[key];
							return <tr key={key}>
								<td style={{paddingTop: '20px', paddingBottom: '20px'}}>
									<div className={'d-flex align-items-center column-gap-15'.classNames()}>
										<div>
											<ToggleSwitch 
												disabled={state.saving}
												checked ={state.settings?.contents?.[key]?.enable || false}
												onChange={checked=>onChangeContents(key, 'enable', checked)} />
										</div>
										<div className={'flex-1'.classNames()}>
											{label} <br/>
											<small>{description}</small>
										</div>
									</div>
								</td>
								<td style={{verticalAlign: 'middle'}}>
									<TextField
										disabled={state.saving}
										value={state.settings?.contents?.[key]?.slug || key}
										onChange={v=>onChangeContents(key, 'slug', v)}/>
								</td>
							</tr>
						})
					}
					<tr>
						<td colSpan="100%"></td>
					</tr>
				</tbody>
			</table>

			<div className={'text-align-right'.classNames()}>
				<button 
					className={'button button-primary'.classNames()}
					onClick={saveOptions} 
					disabled={state.saving}
				>
					{__('Save Changes')} <LoadingIcon show={state.saving}/>
				</button>
			</div>
		</div>
	</div>
}
