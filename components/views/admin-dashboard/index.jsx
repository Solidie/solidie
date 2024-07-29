import React from 'react';
import {createRoot} from 'react-dom/client';

import { MountPoint } from 'solidie-materials/mountpoint.jsx';
import { getElementDataSet } from 'solidie-materials/helpers.jsx';
import {WpDashboardFullPage} from 'solidie-materials/backend-dashboard-container/full-page-container.jsx';

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
