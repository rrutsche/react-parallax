import React from 'react';
import ReactDOM from 'react-dom';
import KitchenSink from './KitchenSink.jsx';
import fastClick from 'fastclick';

let app = document.getElementById('app');
if (ReactDOM.render) {
	ReactDOM.render(
		<KitchenSink />,
		app
	);
} else {
	React.render(
		<KitchenSink />,
		app
	);
}