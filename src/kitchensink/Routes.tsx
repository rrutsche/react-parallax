import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { hot } from 'react-hot-loader/root';
import Page1 from './p1';
import Page2 from './p2';
import Page3 from './p3';
import Page4 from './p4';

const Routes = () => (
    <BrowserRouter>
        <Switch>
            <Route exact path="/" component={Page1} />
            <Route exact path="/p2" component={Page2} />
            <Route exact path="/p3" component={Page3} />
            <Route exact path="/p4" component={Page4} />
        </Switch>
    </BrowserRouter>
);

export default hot(Routes);
