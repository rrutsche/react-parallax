import React from 'react';
import { render } from 'react-dom';
import { Router, Route, browserHistory } from 'react-router';
import KitchenSink from './KitchenSink';
import PageOne from './PageOne';
import PageTwo from './PageTwo';
import PageThree from './PageThree';

render(
    <Router history={browserHistory}>
        <Route component={KitchenSink}>
            <Route path="/" component={PageOne} />
            <Route path="pagetwo" component={PageTwo} />
            <Route path="pagethree" component={PageThree} />
        </Route>
    </Router>,
    document.getElementById('app'),
);
