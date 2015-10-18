import React from 'react';
import ReactDOM from 'react-dom';
import KitchenSink from './KitchenSink.jsx';
import fastClick from 'fastclick';


(function() {

	// add fastclick and touch handling to app
	fastClick(document.body);


	// listen to device ready and disable android back button
	document.addEventListener('deviceready', onDeviceReady, false);
	function onDeviceReady() {
		document.addEventListener('backbutton', backKeyDown, true);
		navigator.app.overrideBackbutton(true);
	}
	function backKeyDown() {}
})();

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