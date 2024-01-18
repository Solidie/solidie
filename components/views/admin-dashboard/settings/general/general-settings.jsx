import React, { createContext, useContext, useState } from 'react';
import { HashRouter, Navigate, Route, Routes, useParams } from 'react-router-dom';

import { WpDashboardFullPage } from 'crewhrm-materials/backend-dashboard-container/full-page-container.jsx';
import { __ } from 'crewhrm-materials/helpers.jsx';
import { request } from 'crewhrm-materials/request.jsx';
import { ContextHistoryFields, HistoryFields } from 'crewhrm-materials/undo-redo.jsx';
import { ContextToast } from 'crewhrm-materials/toast/toast.jsx';
import { LoadingIcon } from 'crewhrm-materials/loading-icon/loading-icon.jsx';

import { Options } from './options/options.jsx';
import { Segments } from './segments/segments.jsx';
import { settings_fields } from './field-structure.jsx';

import segment_style from './segments/segments.module.scss';

export const ContextSettings = createContext();

function Wrapper({ children }) {
    const { can_go_next, values = {}, onChange } = useContext(ContextHistoryFields);
    const { ajaxToast } = useContext(ContextToast);
	const [savingState, setSavingState] = useState(false);

    const saveSettings = () => {
		setSavingState(true);
        request('saveGeneralSettings', { general_settings: values }, (resp) => {
            ajaxToast(resp);
			setSavingState(false);
        });
    };

    const { 
		segment, 
		sub_segment 
	} = useParams();

    const {
		label: sub_title, 
		description: segment_description
	} = settings_fields[segment]?.segments[sub_segment] || {};

    const title = __('Solidie Settings') + (sub_title ? ' > ' + sub_title : '');

    return (
        <ContextSettings.Provider value={{ values, onChange }}>

			<br/>
			<br/>
			<br/>
			<br/>
			<br/>
			<div className={'container'.classNames(segment_style)}>
				<span
					className={'d-flex align-items-center column-gap-10 font-size-17 font-weight-600 color-text margin-bottom-10'.classNames()}
				>
					{sub_title ? <i className={'ch-icon ch-icon-arrow-left cursor-pointer'.classNames()} onClick={()=>window.history.back()}></i> : null} {title}
				</span>
				<span
					className={'d-block font-size-14 font-weight-400 line-height-22 letter-spacing--14 color-text-light'.classNames()}
				>
					{segment_description || __('Configure all the content management, sales and contributor related settings in one place')}
				</span>
			</div>

            <div className={'padding-horizontal-15 overflow-auto'.classNames()}>
				{children}
			</div>

			<div className={'text-align-right'.classNames() + 'container'.classNames(segment_style)}>
				<button
					className={'button button-primary'.classNames()}
					onClick={saveSettings}
					disabled={!can_go_next}
				>
					{__('Save All Changes')} <LoadingIcon show={savingState}/>
				</button>
			</div>

			<br/>
			<br/>
			<br/>
			<br/>
			<br/>
        </ContextSettings.Provider>
    );
}

export function GeneralSettings({ resources, settings }) {
    return (
		<WpDashboardFullPage>
			<HistoryFields defaultValues={settings || {}}>
				<HashRouter>
					<Routes>
						<Route
							path="/settings/"
							element={
								<Wrapper>
									<Segments />
								</Wrapper>
							}
						/>

						<Route
							path="/settings/:segment/:sub_segment/"
							element={
								<Wrapper>
									<Options />
								</Wrapper>
							}
						/>

						<Route path={'*'} element={<Navigate to="/settings/" replace />} />
					</Routes>
				</HashRouter>
			</HistoryFields>
		</WpDashboardFullPage>
    );
}
