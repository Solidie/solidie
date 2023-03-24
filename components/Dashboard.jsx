import React from 'react';
import ReactDOM from 'react-dom/client';

function D() {
	return <div>
		Hi, D
	</div>
}

let dashboard = document.getElementById('AppDashboard');
if ( dashboard ) {
	ReactDOM.createRoot( dashboard ).render( <D/> );
}