import React from 'react';
import ReactDOM from 'react-dom/client';
import { getElementDataSet } from '../utilities/helpers.jsx';
import { Catalog } from './catalog/index.jsx';
import { FAList, MountPoint } from '../utilities/templates.jsx';
import { SingleContent } from './single/index.jsx';

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

// Render fa icon list to use in development. It will be rendered in shortcode. 
const fa = document.getElementById('solidie_fa_icon_list');
if(fa){
	ReactDOM.createRoot(fa).render(
		<MountPoint element={fa}>
			<FAList/>
		</MountPoint>
	);
}