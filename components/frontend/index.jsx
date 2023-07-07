import React from 'react';
import ReactDOM from 'react-dom/client';
import { getElementDataSet } from '../utilities/helpers.jsx';
import { SignleApp } from './single-app/index.jsx';
import { Catalog } from './catalog/index.jsx';
import { MountPoint } from '../utilities/mountpoint.jsx';

function Singular() {
	return <SignleApp/>
}

const single = document.getElementById('Solidie_Single_Content');
if(single) {
	ReactDOM.createRoot(single).render(
		<Singular {...getElementDataSet(single)} />
	);
}

const catalog = document.getElementById('Solidie_Catalog');
if(catalog){
	ReactDOM.createRoot(catalog).render(
		<MountPoint>
			<Catalog {...getElementDataSet(Catalog)} />
		</MountPoint>
	);
}