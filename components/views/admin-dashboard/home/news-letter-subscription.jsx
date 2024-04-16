import React, { useState, useContext } from "react";

import {TextField} from 'crewhrm-materials/text-field/text-field.jsx';
import { __, data_pointer, isEmpty } from "crewhrm-materials/helpers.jsx";
import { patterns } from "crewhrm-materials/data.jsx";
import { LoadingIcon } from "crewhrm-materials/loading-icon/loading-icon.jsx";
import { ContextToast } from "crewhrm-materials/toast/toast.jsx";
import { request } from "crewhrm-materials/request.jsx";

export function NewsletterSubscription() {

	const {user: {first_name, last_name, email, newsletter_subscribed}} = window[data_pointer];
	const {ajaxToast} = useContext(ContextToast);

	const [state, setState] = useState({
		subscribing: false,
		subscription: {
			name: newsletter_subscribed ? '' : `${first_name} ${last_name}`,
			email: newsletter_subscribed ? '' : email
		}
	});

	const onChange=(name, value)=>{
		setState({
			...state,
			subscription: {
				...state.subscription,
				[name]: value
			}
		});
	}

	const subscribeNow = () => {
		setState({
			...state,
			subscribing: true
		});

		request('subscribeToNewsLetter', state.subscription, resp=>{
			setState({
				...state,
				subscribing: false,
				subscription: resp.success ? {} : state.subscription
			});

			ajaxToast(resp);
		});
	}
	
	return <div 
		style={{maxWidth: '500px', borderTop: '3px solid lightgray'}} 
		className={'bg-color-white border-radius-5 margin-auto padding-25 box-shadow-thin'.classNames()}
	>
		<strong className={'d-block font-size-20 font-weight-500 margin-bottom-10'.classNames()}>
			{__('Subscribe to Newsletter')}
		</strong>
		<span className={'d-block margin-bottom-20 font-size-14 color-text-light'.classNames()}>
			{__('Never miss important updates')}
		</span>

		<div className={'margin-bottom-15'.classNames()}>
			<label className={'d-block font-weight-400 margin-bottom-10'.classNames()}>
				{__('Your name')}
			</label>
			<TextField
				value={state.subscription.name || ''}
				onChange={v=>onChange('name', v)}
				disabled={state.subscribing}
			/>
		</div>

		<div className={'margin-bottom-15'.classNames()}>
			<label className={'d-block font-weight-400 margin-bottom-10'.classNames()}>
				{__('Email address')}
			</label>
			<TextField
				value={state.subscription.email || ''}
				onChange={v=>onChange('email', v)}
				disabled={state.subscribing}
			/>
		</div>

		<div className={'text-align-right'.classNames()}>
			<button 
				className={'button button-primary'.classNames()}
				disabled={state.subscribing || isEmpty( (state.subscription.name || '').trim() ) || !patterns.email.test(state.subscription.email || '')}
				onClick={subscribeNow}
			>
				{__('Subscribe')} <LoadingIcon show={state.subscribing}/>
			</button>
		</div>
	</div>
}
