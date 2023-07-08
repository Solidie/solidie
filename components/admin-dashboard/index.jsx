import React from 'react';
import ReactDOM from 'react-dom/client';
import { getElementDataSet } from '../utilities/helpers.jsx';
import { SettingPage } from './settings/settings.jsx';
import { MountPoint } from '../utilities/mountpoint.jsx';


window.addEventListener('DOMContentLoaded', ()=>{
	let dashboard = document.getElementById('Solidie_AdminSettings');
	if ( dashboard ) {
		ReactDOM.createRoot( dashboard ).render( 
			<MountPoint element={dashboard}>
				<SettingPage {...getElementDataSet(dashboard)}/>
			</MountPoint>
		);
	}
});
