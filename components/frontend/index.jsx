import React from 'react';
import ReactDOM from 'react-dom/client';
import { getElementDataSet } from '../utilities/helpers.jsx';
import { SignleApp } from './single-app/index.jsx';
import { Catalog } from './catalog/index.jsx';

// import './style.css';
import '../libraries/tailwind.scss';
import style from './s.module.scss';

console.log(style);

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
		<Catalog {...getElementDataSet(Catalog)} />
	);
}