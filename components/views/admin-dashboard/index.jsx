import React from 'react';
import {createRoot} from 'react-dom/client';

import { MountPoint } from 'crewhrm-materials/mountpoint.jsx';
import { getElementDataSet } from 'crewhrm-materials/helpers.jsx';

import { SettingPage } from './settings/settings.jsx';

window.addEventListener('DOMContentLoaded', ()=>{
	let dashboard = document.getElementById('Solidie_AdminSettings');
	if ( dashboard ) {
		createRoot( dashboard ).render( 
			<MountPoint element={dashboard}>
				<SettingPage {...getElementDataSet(dashboard)}/>
			</MountPoint>
		);
	}
});
