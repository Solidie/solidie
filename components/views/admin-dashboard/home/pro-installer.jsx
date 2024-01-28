import React, { useState, useContext } from "react";

import {__, data_pointer} from 'crewhrm-materials/helpers.jsx';
import {request} from 'crewhrm-materials/request.jsx';
import {LoadingIcon} from 'crewhrm-materials/loading-icon/loading-icon.jsx';
import {ContextToast} from 'crewhrm-materials/toast/toast.jsx';

import tbl_style from 'solidie-materials/styles/table.module.scss';

function isLocalHost() {
	var hostname = window.location.hostname;
	var port     = window.location.port;

	var localhostDomains = ["localhost", "127.0.0.1", ".test", ".local"];

	return localhostDomains.some(domain => hostname.includes(domain)) && !!port;
}

const is_local = isLocalHost();

export function ProInstaller() {

	const {ajaxToast} = useContext(ContextToast);

	const {
		is_pro_installed, 
		is_pro_active
	} = window[data_pointer];

	const [state, setState] = useState({
		in_progress: false
	});

	const activatePro=()=>{

		if ( ! window.confirm(__('Sure to activate?')) ) {
			return;
		}

		setState({
			...state,
			in_progress: true
		});

		request('proVersionAction', {action_name: 'activate'}, resp=>{
			
			ajaxToast(resp);

			if ( resp?.success ) {
				window.location.reload();
				return;
			}

			setState({
				...state,
				in_progress: false
			});
		});
	}

	return is_pro_active ? null : <div> 

		<strong className={'d-block font-size-16 font-weight-500 margin-bottom-10'.classNames()}>
			{__('Solidie Pro')}
		</strong>

		{
			is_pro_installed ? <div className={'padding-vertical-40 padding-horizontal-15 border-1 b-color-tertiary text-align-center font-size-14 font-weight-400 border-radius-8 bg-color-white color-text'.classNames()}>
				<div>
					{__('It looks like you have Solidie Pro installed.')} 
					<br/>
					{__('Activate it to make your website full fledged multimedia stock website.')}
				</div>
				<br/>
				<br/>
				<button 
					className={'button button-primary'.classNames()}
					disabled={state.in_progress}
					onClick={activatePro}
				>
					{__('Activate Now')} <LoadingIcon show={state.in_progress}/>
				</button>
			</div>
			:
			 <div className={'padding-vertical-40 padding-horizontal-20 border-1 b-color-tertiary font-size-14 font-weight-400 border-radius-8 bg-color-white color-text'.classNames()}>
				<div className={'text-align-center'.classNames()}>
					<strong className={'font-size-16 font-weight-500'.classNames()}>
						{__('Try Solidie Pro for Free')}
					</strong>
					<br/>
				</div>

				<br/>
				<div>
					{__('It provies extensive features to make your website a full fledged commerceial digital content stock platform in a second.')}
				</div>

				<br/>
				<div>
					<strong className={'d-block margin-bottom-10 font-size-14 font-weight-700'.classNames()}>
						{__('What you\'re missing in Free:')}
					</strong>

					<table className={'table no-responsive'.classNames(tbl_style)}>
						<thead>
							<tr>
								<th>{__('Feature')}</th>
								<th>{__('Free')}</th>
								<th>{__('Pro')}</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td>{__('Inventory Management')}</td>
								<td>√</td>
								<td>√</td>
							</tr>
							<tr>
								<td>{__('Content Monetization')}</td>
								<td></td>
								<td>√</td>
							</tr>
							<tr>
								<td>{__('Subscription Monetization')}</td>
								<td></td>
								<td>√</td>
							</tr>
							<tr>
								<td>{__('Third Party Contributor')}</td>
								<td></td>
								<td>√</td>
							</tr>
							<tr>
								<td>{__('Release management and update distribution (For apps)')}</td>
								<td></td>
								<td>√</td>
							</tr>
						</tbody>
					</table>
					<div className={'text-align-right margin-top-10'.classNames()}>
						<i>{__('To be continued..')}</i>
					</div>
				</div>
				<br/>
				<br/>
				<br/>
				<div className={'text-align-center'.classNames()}>
					<strong className={'d-block margin-bottom-20 font-size-14 font-weight-500'.classNames()}>
						{__('You are eligible to try Pro version without buying for a limited time.')}
					</strong>
					<div>
						<a 
							className={'button button-primary'.classNames()}
							href={'https://demo.solidie.com'}
							style={{marginRight: '20px'}}
						>
							{__('Live Demo')} <LoadingIcon show={state.in_progress}/>
						</a>
						
						<a 
							className={'button button-primary'.classNames()}
							href='https://solidie.com'
						>
							{__('Learn More and Download')}
						</a>
					</div>
				</div>
			</div>
		}
	</div>
}
