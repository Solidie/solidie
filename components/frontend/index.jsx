import React from 'react';
import ReactDOM from 'react-dom/client';
import { getElementDataSet } from '../utilities/helpers.jsx';
import { SignleApp } from './single-app/index.jsx';
import { Catalog } from './catalog/index.jsx';
import { MountPoint } from '../utilities/templates.jsx';

function Singular() {
	return <SignleApp/>
}

const single = document.getElementById('Solidie_Single_Content');
if(single) {
	ReactDOM.createRoot(single).render(
		<MountPoint element={single}>
			<Singular {...getElementDataSet(single)} />
		</MountPoint>
	);
}

const catalog = document.getElementById('Solidie_Catalog');
if(catalog){
	ReactDOM.createRoot(catalog).render(
		<MountPoint element={catalog}>
			<Catalog {...getElementDataSet(Catalog)} />
		</MountPoint>
	);
}