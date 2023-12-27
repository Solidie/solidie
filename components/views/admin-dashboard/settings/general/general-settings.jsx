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
        request('saveSettings', { settings: values }, (resp) => {
            ajaxToast(resp);
			setSavingState(false);
        });
    };

    const { segment, sub_segment } = useParams();
    const sub_title = settings_fields[segment]?.segments[sub_segment]?.label;
    const title = __('Settings') + (sub_title ? ' > ' + sub_title : '');

    return (
        <ContextSettings.Provider value={{ values, onChange }}>

			<br/>
			<div className={'container'.classNames(segment_style) + 'border-bottom-1 b-color-tertiary padding-vertical-15'.classNames()}>
				<strong className={'font-size-18'.classNames()}>
					{title}
				</strong>
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
