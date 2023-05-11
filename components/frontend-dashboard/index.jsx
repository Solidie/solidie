import React from 'react';
import ReactDOM from 'react-dom/client';
import { getElementDataSet } from '../utilities/helpers.jsx';
import './style.scss';

// Fahad: Use React for all the dashboard pages
		
function D(props) {
	return <div>
		This is dashboard root component. Mount all of top bar, sidebar, sub pages here. 
	</div>
}

let dashboard = document.getElementById('AppStore_Dashboard');
if ( dashboard ) {
	ReactDOM.createRoot( dashboard ).render( <D {...getElementDataSet(dashboard)}/> );
}