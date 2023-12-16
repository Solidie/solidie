import React from 'react';
import {createRoot} from 'react-dom/client';

import { MountPoint } from 'crewhrm-materials/mountpoint.jsx';
import { getElementDataSet } from 'crewhrm-materials/helpers.jsx';
import {WpDashboardFullPage} from 'crewhrm-materials/backend-dashboard-container/full-page-container.jsx';

import { CatSettings } from './settings/categories.jsx';
import { InventoryBackend } from './inventory/inventory-backend.jsx';

// Render inventory
const inventory = document.getElementById('Solidie_Backend_Dashboard');
if (inventory) {
	createRoot( inventory ).render(
		<MountPoint>
			<WpDashboardFullPage>
				<InventoryBackend {...getElementDataSet(inventory)}/>
			</WpDashboardFullPage>
		</MountPoint>
	);
}

// Render settings
const settings = document.getElementById('Solidie_ContentTypeSettings');
if ( settings ) {
	createRoot( settings ).render( 
		<MountPoint>
			<WpDashboardFullPage>
				<CatSettings {...getElementDataSet(settings)}/>
			</WpDashboardFullPage>
		</MountPoint>
	);
}
