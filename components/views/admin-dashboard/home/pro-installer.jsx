import React, { useState, useContext } from "react";

import {__, data_pointer} from 'crewhrm-materials/helpers.jsx';
import {request} from 'crewhrm-materials/request.jsx';
import {LoadingIcon} from 'crewhrm-materials/loading-icon/loading-icon.jsx';
import {ContextToast} from 'crewhrm-materials/toast/toast.jsx';

const {readonly_mode} = window[data_pointer];

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

		<strong className={'d-block font-size-16 font-weight-500 margin-bottom-10 color-text'.classNames()}>
			{__('Solidie Pro')}
		</strong>

		{
			is_pro_installed ? <div className={'padding-vertical-40 padding-horizontal-15 border-1 b-color-text-20 color-text-70 text-align-center font-size-14 font-weight-400 border-radius-8 bg-color-white'.classNames()}>
				<div>
					{__('It looks like you have Solidie Pro installed.')} 
					<br/>
					{__('Activate it to make your website full fledged multimedia stock website.')}
				</div>
				<br/>
				<br/>
				<button 
					className={'button button-primary'.classNames()}
					disabled={readonly_mode || state.in_progress}
					onClick={activatePro}
				>
					{__('Activate Now')} <LoadingIcon show={state.in_progress}/>
				</button>
			</div>
			:
			 <div className={'padding-vertical-40 padding-horizontal-20 border-1 b-color-text-40 font-size-14 font-weight-400 border-radius-8 bg-color-white color-text'.classNames()}>
				<div className={'text-align-center'.classNames()}>
					<strong className={'font-size-16 font-weight-600'.classNames()}>
						{__('Solidie Pro: A game changer')}
					</strong>
					<br/>
				</div>

				<br/>
				<div className={'color-text-80'.classNames()}>
					{__('It provies extensive features to make your website a full fledged multimedia stock platform.')}
				</div>

				<br/>
				<div>
					<strong className={'d-block margin-bottom-10 font-size-14 font-weight-700'.classNames()}>
						{__('Missing features in Free version:')}
					</strong>
					
					<table className={'table no-responsive'.classNames()}>
						<thead>
							<tr>
								<th>Feature</th>
								<th>Pro</th>
								<th>Free</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td>Supports Audio, Video, Image, Apps, Documents, 3D Contents, Fonts and Tutorials</td>
								<td>√</td>
								<td>√</td>
							</tr>
							<tr>
								<td>Content Management Dashboard</td>
								<td>√</td>
								<td>√</td>
							</tr>
							<tr>
								<td>Gallery and Single Content Page</td>
								<td>√</td>
								<td>√</td>
							</tr>
							<tr>
								<td>Publish Free Contents</td>
								<td>√</td>
								<td>√</td>
							</tr>
							<tr>
								<td>Like, comment, share, rating, wishlist</td>
								<td>√</td>
								<td>√</td>
							</tr>
							<tr>
								<td>Content Monetization</td>
								<td>√</td>
								<td></td>
							</tr>
							<tr>
								<td>Third party contributions</td>
								<td>√</td>
								<td></td>
							</tr>
							<tr>
								<td>Custom dashboard for contributors and customers</td>
								<td>√</td>
								<td></td>
							</tr>
							<tr>
								<td>Contributors revenue share</td>
								<td>√</td>
								<td></td>
							</tr>
							<tr>
								<td>Single Sale</td>
								<td>√</td>
								<td></td>
							</tr>
							<tr>
								<td>Bundle and Subscription Sale</td>
								<td>√</td>
								<td></td>
							</tr>
							<tr>
								<td>App release management and update distribution</td>
								<td>√</td>
								<td></td>
							</tr>
							<tr>
								<td>License key system for apps</td>
								<td>√</td>
								<td></td>
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
					<a 
						className={'button button-primary'.classNames()}
						href={'https://demo.solidie.com'}
						style={{marginRight: '20px'}}
						target="_blank"
					>
						{__('Live Demo')} <LoadingIcon show={state.in_progress}/>
					</a>
					
					<a 
						className={'button button-primary'.classNames()}
						href='https://solidie.com'
						target="_blank"
					>
						{__('Upgrade Now')}
					</a>
				</div>
			</div>
		}
	</div>
}
