import React from "react";

import {__, data_pointer} from 'crewhrm-materials/helpers.jsx';

import { ProInstaller } from "./pro-installer.jsx";
import { NewsletterSubscription } from "./news-letter-subscription.jsx";
import logo_svg from '../../../images/logo.svg';

const {permalinks, is_apache, is_pro_active} = window[data_pointer];

const quick_links = [
	{
		label: __('Inventory'),
		link: permalinks.inventory_backend
	},
	{
		label: __('Content Types'),
		link: permalinks.settings
	},
	{
		label: __('Settings'),
		link: permalinks.settings
	}
];

export function HomeBackend() {
	
	return <div className={'padding-15 margin-auto padding-vertical-40'.classNames()} style={{maxWidth: '900px'}}>

		<div className={'text-align-center'.classNames()}>
			<img src={logo_svg} style={{width: '70px'}}/>
			<br/>
			<br/>
			<br/>
			<strong className={'d-block font-size-28 color-text margin-bottom-10'.classNames()}>
				{__('Welcome to Solidie!')}
			</strong>
			<span className={'d-block font-size-16 color-text-light'.classNames()}>
				{__('Your own Stock Empire')}
			</span>
		</div>

		<br/>
		<br/>
		<div>
			<strong className={'d-block font-size-16 font-weight-500 margin-bottom-10'.classNames()}>
				{__('Quick Links')}
			</strong>

			<div className={'d-flex column-gap-15'.classNames()}>
				{
					quick_links.map((link, index)=>{
						return <a 
							key={index} 
							href={link.link}
							className={'flex-1 d-block padding-vertical-40 border-1 b-color-tertiary cursor-pointer text-align-center font-size-14 font-weight-400 border-radius-8 bg-color-white color-text'.classNames()}
						>
							{link.label}
						</a>
					})
				}
			</div>
		</div>

		{
			is_pro_active ? null : <>
				<br/>
				<br/>
				<ProInstaller/>
			</>
		}

		{
			(!is_pro_active || is_apache) ? null : <>
				<br/>
				<br/>
				<div>
					<strong className={'d-block font-size-16 font-weight-500 margin-bottom-10'.classNames()}>
						{__('Attention:')}
					</strong>
					<span className={'font-size-14'.classNames()}>
						It seems that the server you're using is not running Apache. To safeguard your monetized content, you'll need to configure it to ensure that the directory <code>~/wp-content/uploads/solidie-content-files/</code> is not accessible via absolute URLs.
					</span>
				</div>
			</>
		}

		<br/>
		<br/>
		<div>
			<strong className={'d-block font-size-16 font-weight-500 margin-bottom-10'.classNames()}>
				{__('Enjoying Solidie?')} &#128512;
			</strong>
			<span className={'font-size-14'.classNames()}>Please <a href="https://wordpress.org/plugins/solidie/#reviews" target="_blank"><strong>provide your feedback</strong></a> to help us improve.</span>
		</div>

		<br/>
		<br/>
		<br/>
		<br/>
		<NewsletterSubscription/>
		<br/>
	</div>
}
