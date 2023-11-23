import React from 'react';
import {createRoot} from 'react-dom/client';

import { MountPoint } from 'crewhrm-materials/mountpoint.jsx';
import { getElementDataSet } from 'crewhrm-materials/helpers.jsx';
import { Catalog } from './catalog/index.jsx';
import { SingleContent } from './single/index.jsx';

// Render single product/content page
const single = document.getElementById('Solidie_Single_Content');
if(single) {
	createRoot(single).render(
		<MountPoint element={single}>
			<SingleContent {...getElementDataSet(single)} />
		</MountPoint>
	);
}

// Render content catalog
const catalog = document.getElementById('Solidie_Catalog');
if(catalog){
	createRoot(catalog).render(
		<MountPoint element={catalog}>
			<Catalog {...getElementDataSet(Catalog)} />
		</MountPoint>
	);
}
