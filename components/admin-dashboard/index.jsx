import React from 'react';
import ReactDOM from 'react-dom/client';
import { getElementDataSet } from '../utilities/helpers.jsx';
import { SettingPage } from './settings/settings.jsx';


window.addEventListener('DOMContentLoaded', ()=>{
	let dashboard = document.getElementById('AppStore_AdminSettings');
	if ( dashboard ) {
		ReactDOM.createRoot( dashboard ).render( <SettingPage {...getElementDataSet(dashboard)}/> );
	}
});
