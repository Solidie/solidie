import React from 'react';
import {createRoot} from 'react-dom/client';

import { MountPoint } from 'crewhrm-materials/mountpoint.jsx';
import { getElementDataSet } from 'crewhrm-materials/helpers.jsx';
import {WpDashboardFullPage} from 'crewhrm-materials/backend-dashboard-container/full-page-container.jsx';

import { InventoryBackend } from './inventory/inventory-backend.jsx';
import { GeneralSettings } from './settings/general/general-settings.jsx';

// Render hrm settings
const settings = document.getElementById('Solidie_Settings');
if (settings) {
    createRoot(settings).render(
        <MountPoint>
            <GeneralSettings {...getElementDataSet(settings)} />
        </MountPoint>
    );
}

// Render inventory
const inventory = document.getElementById('Solidie_Backend_Inventory');
if (inventory) {
	createRoot( inventory ).render(
		<MountPoint>
			<WpDashboardFullPage>
				<InventoryBackend {...getElementDataSet(inventory)}/>
			</WpDashboardFullPage>
		</MountPoint>
	);
}
