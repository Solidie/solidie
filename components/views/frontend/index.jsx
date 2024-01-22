import React from 'react';
import {createRoot} from 'react-dom/client';

import { MountPoint } from 'crewhrm-materials/mountpoint.jsx';
import { getElementDataSet } from 'crewhrm-materials/helpers.jsx';
import { Gallery } from './gallery/index.jsx';

// Render content gallery
const gallery = document.getElementById('Solidie_Gallery');
if(gallery){
	createRoot(gallery).render(
		<MountPoint element={gallery}>
			<Gallery {...getElementDataSet(gallery)} />
		</MountPoint>
	);
}
