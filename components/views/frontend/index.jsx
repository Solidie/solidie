import React from 'react';
import ReactDOM from 'react-dom/client';

import 'crewhrm-materials/prototypes.jsx';
import { getElementDataSet } from 'crewhrm-materials/helpers.jsx';
import { Catalog } from './catalog/index.jsx';
import { SingleContent } from './single/index.jsx';
import { MountPoint } from 'crewhrm-materials/mountpoint.jsx';

// Render single product/content page
const single = document.getElementById('Solidie_Single_Content');
if(single) {
	ReactDOM.createRoot(single).render(
		<MountPoint element={single}>
			<SingleContent {...getElementDataSet(single)} />
		</MountPoint>
	);
}

// Render content catalog
const catalog = document.getElementById('Solidie_Catalog');
if(catalog){
	ReactDOM.createRoot(catalog).render(
		<MountPoint element={catalog}>
			<Catalog {...getElementDataSet(Catalog)} />
		</MountPoint>
	);
}
