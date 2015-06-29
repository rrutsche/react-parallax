import React from 'react';
import KitchenSink from './KitchenSink.jsx';
import fastClick from 'fastclick';


(function() {

	// add fastclick and touch handling to app
	fastClick(document.body);
	React.initializeTouchEvents(true);


	// listen to device ready and disable android back button
	document.addEventListener('deviceready', onDeviceReady, false);
	function onDeviceReady() {
		document.addEventListener('backbutton', backKeyDown, true);
		navigator.app.overrideBackbutton(true);
	}
	function backKeyDown() {}
})();


React.render(
    <KitchenSink />,
    document.body
);