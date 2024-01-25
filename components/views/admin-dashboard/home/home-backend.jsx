import React from "react";

import {__, data_pointer} from 'crewhrm-materials/helpers.jsx';

import { ProInstaller } from "./pro-installer.jsx";

import logo_svg from '../../../images/logo.svg';

import style from './home.module.scss';

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

		{
			is_pro_active ? null : <>
				<br/>
				<br/>
				<ProInstaller/>
			</>
		}
	</div>
}
