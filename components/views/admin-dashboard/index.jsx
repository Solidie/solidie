import React from 'react';
import ReactDOM from 'react-dom/client';

import 'crewhrm-materials/prototypes.jsx';
import { getElementDataSet } from 'crewhrm-materials/helpers.jsx';
import { MountPoint } from 'crewhrm-materials/mountpoint.jsx';

import { SettingPage } from './settings/settings.jsx';

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
