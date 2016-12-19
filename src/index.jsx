import React from 'react';
import { render } from 'react-dom';
import { Router, Route, Link, browserHistory } from 'react-router'
import KitchenSink from './KitchenSink.jsx';
import PageOne from './PageOne.jsx';
import PageTwo from './PageTwo.jsx';

render(
	<Router history={browserHistory}>
		<Route path="/" component={KitchenSink}>
			<Route path="pageone" component={PageOne}/>
			<Route path="pagetwo" component={PageTwo}/>
		</Route>
  	</Router>,
	document.getElementById('app')
);
