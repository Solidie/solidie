import React, { createContext, useContext, useState } from 'react';
import { HashRouter, Navigate, Route, Routes, useParams } from 'react-router-dom';

import { WpDashboardFullPage } from 'crewhrm-materials/backend-dashboard-container/full-page-container.jsx';
import { __, data_pointer } from 'crewhrm-materials/helpers.jsx';
import { request } from 'crewhrm-materials/request.jsx';
import { ContextToast } from 'crewhrm-materials/toast/toast.jsx';
import { LoadingIcon } from 'crewhrm-materials/loading-icon/loading-icon.jsx';

import { Options } from './options/options.jsx';
import { Segments } from './segments/segments.jsx';
import { settings_fields } from './field-structure.jsx';
import { ContentTypeEditor } from './content-type/content-type-editor.jsx';

const {readonly_mode} = window[data_pointer];
export const ContextSettings = createContext();

export function GeneralSettings({settings={}, content_list={}, categories={}, resources={}}) {

    const { ajaxToast } = useContext(ContextToast);

	const [state, setState] = useState({
		has_change: false,
		saving: false,
		settings: {
			general: settings.general || {},
			contents: settings.contents || {}
		}
	});

	const onChange = (store, name, value) => {

		const obj_value = typeof name === 'object' ? name : { [name]: value };

		// Finally update state
		setState({
			...state,
			has_change: true,
			settings: {
				...state.settings,
				[store] : {
					...state.settings[store],
					...obj_value
				}
			}
		});
	};

	const updateWholeSetting=(settings={})=>{
		setState({
			...state,
			has_change: true,
			settings
		});
	}

    const saveSettings = () => {
		setState({
			...state,
			saving: true
		});

        request('saveGeneralSettings', { settings: state.settings }, (resp) => {
            
			ajaxToast(resp);

			setState({
				...state,
				saving: false,
				has_change: false,
			});
        });
    };

	const onToggle=(store, name, enable)=>{
		setState({
			...state,
			has_change: true,
			settings: {
				...state.settings,
				[store]: {
					...state.settings[store],
					[name]: {
						...state.settings[store][name],
						enable
					}
				}
			}
		})
	}

	const payload = {
		settings: state.settings,
		onChange,
		settings_fields: settings_fields,
		updateWholeSetting,
		categories,
		resources
	}

	// Add content types in setting field
	Object.keys(content_list).forEach(content_type=>{
		payload.settings_fields.contents.segments[content_type] = {
			label       : content_list[content_type].label,
			description : content_list[content_type].description,
			component   : ContentTypeEditor,
			onToggle    : onToggle,
			is_enabled  : state.settings.contents[content_type].enable
		}
	});

    return <WpDashboardFullPage>
		<div 
			style={{maxWidth: '582px', margin: '80px auto'}} 
			className={'padding-horizontal-15'.classNames()}
		>
			<div className={'overflow-auto'.classNames()}>
				<ContextSettings.Provider value={payload}>
					<HashRouter>
						<Routes>
							<Route
								path="/settings/"
								element={<Segments/>}
							/>

							<Route
								path="/settings/:segment/:sub_segment/"
								element={<Options/>}
							/>

							<Route path={'*'} element={<Navigate to="/settings/" replace />} />
						</Routes>
					</HashRouter>
				</ContextSettings.Provider>
			</div>
			
			<div className={'text-align-right'.classNames()}>
				<button
					data-cylector="save-settings"
					className={'button button-primary'.classNames()}
					onClick={saveSettings}
					disabled={readonly_mode || !state.has_change || state.saving}
				>
					{__('Save Changes')} <LoadingIcon show={state.saving}/>
				</button>
			</div>
		</div>
	</WpDashboardFullPage>
}
