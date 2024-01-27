import React, { useState, useContext } from "react";

import {__, data_pointer} from 'crewhrm-materials/helpers.jsx';
import {request} from 'crewhrm-materials/request.jsx';
import {LoadingIcon} from 'crewhrm-materials/loading-icon/loading-icon.jsx';
import {ContextToast} from 'crewhrm-materials/toast/toast.jsx';

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

	const take_action=(action_name)=>{

		setState({
			...state,
			in_progress: true
		});

		request('proVersionAction', {action_name}, resp=>{
			
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
		{
			is_pro_installed ? <div>
				<div>
					<strong>
						{__('It looks like you have Solidie Pro installed.')} 
					</strong>
					<strong>
						{__('Activate it to make your website full fledged multimedia stock content platform.')}
					</strong>
				</div>
				
				<button 
					className={'button button-primary'.classNames()}
					disabled={state.in_progress}
					onClick={()=>take_action('activate')}
				>
					{__('Activate Now')} <LoadingIcon show={state.in_progress}/>
				</button>
			</div>
			:
			<div>
				<strong>
					{__('Solidie has a pro version with all the extensive features like content monetization, third party contributors and so on.')}
				</strong>
				<a 
					className={'button button-primary'.classNames()}
					href={'https://demo.solidie.com'}
				>
					{__('Live Demo')} <LoadingIcon show={state.in_progress}/>
				</a>
				
				<a 
					className={'button button-primary'.classNames()}
					href='https://demo.solidie.com'
					target="_blank"
				>
					{__('Buy Now')}
				</a>
			</div>
		}
	</div>
}
