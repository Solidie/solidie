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

function hexToRgba(hex, opacity) {
    // Remove the leading '#' if present
    hex = hex.replace(/^#/, '');
    
    // Parse the r, g, b values
    let bigint = parseInt(hex, 16);
    let r, g, b;
    
    if (hex.length === 6) {
        r = (bigint >> 16) & 255;
        g = (bigint >> 8) & 255;
        b = bigint & 255;
    } else if (hex.length === 3) {
        // Handle shorthand form (e.g., #03F)
        r = ((bigint >> 8) & 15) * 17;
        g = ((bigint >> 4) & 15) * 17;
        b = (bigint & 15) * 17;
    } else {
        throw new Error("Invalid hex color format");
    }
    
    // Ensure opacity is between 0 and 1
    if (opacity < 0) opacity = 0;
    if (opacity > 1) opacity = 1;

    return `rgba(${r}, ${g}, ${b}, ${opacity})`;
}

function increaseContrast(hex, factor = null) {

	factor = factor || window[data_pointer].contrast || 88;

    // Ensure the input is a valid hex color code
    hex = hex.replace(/^#/, '');
    if (hex.length === 3) {
        hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
    }

    if (hex.length !== 6) {
        throw new Error("Invalid hex color code.");
    }

    // Convert hex to RGB
    let r = parseInt(hex.substring(0, 2), 16);
    let g = parseInt(hex.substring(2, 4), 16);
    let b = parseInt(hex.substring(4, 6), 16);

    // Adjust contrast for each color component
    r = adjustContrast(r, factor);
    g = adjustContrast(g, factor);
    b = adjustContrast(b, factor);

    // Convert back to hex
    let newHex = "#" + toHex(r) + toHex(g) + toHex(b);
    return newHex;
}

function adjustContrast(color, factor) {
    factor = (259 * (factor + 255)) / (255 * (259 - factor));
    let newColor = factor * (color - 128) + 128;

    // Ensure the value is within 0-255 range
    return Math.max(0, Math.min(255, Math.round(newColor)));
}

function toHex(n) {
    let hex = n.toString(16);
    return hex.length === 1 ? '0' + hex : hex;
}

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

		// Apply color change instantly to show real demo
		if ( typeof name === 'string' && name.indexOf('color_scheme_') === 0 ) {
			
			const {opacities=[]} = window[data_pointer];
			
			const var_name = name.replace('color_scheme_', '').replace('s', '');
			
			opacities.forEach(opacity=>{
				const intensity = (opacity / 1) * 100;
				const shade     = intensity === 100 ? ''  : `-${intensity}`;

				document.querySelector(':root').style.setProperty(`--solidie-color-${var_name}${shade}`, hexToRgba(value, opacity));
			});

			// Contrasted color for hover effect
			document.querySelector(':root').style.setProperty(`--solidie-color-${var_name}-150`, increaseContrast(value));
		}
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
			style={{maxWidth: '650px', margin: '80px auto'}} 
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
