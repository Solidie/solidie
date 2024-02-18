import React from "react";

import {__, data_pointer, sprintf} from 'crewhrm-materials/helpers.jsx';

import { ProInstaller } from "./pro-installer.jsx";

import logo_svg from '../../../images/logo.svg';

const {permalinks} = window[data_pointer];

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
	
	const {
		is_pro_installed, 
		is_pro_active
	} = window[data_pointer];

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

		<br/>
		<br/>
		<div className={'d-flex'.classNames()}>
			<div className={'flex-1'.classNames()}>
				<strong className={'d-block font-size-16 font-weight-500 margin-bottom-10'.classNames()}>
					Enjoying Solidie? &#128512;
				</strong>
				<span className={'font-size-14'.classNames()}>Please <a href="https://wordpress.org/plugins/solidie/#reviews" target="_blank"><strong>provide your feedback</strong></a> to help us improve.</span>
			</div>
		</div>
	</div>
}
