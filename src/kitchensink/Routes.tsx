import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { hot } from 'react-hot-loader/root';
import PageOne from './PageOne';
import PageTwo from './PageTwo';
import PageThree from './PageThree';

const Routes = () => (
    <BrowserRouter>
        <Switch>
            <Route exact path="/" component={PageOne} />
            <Route exact path="/pagetwo" component={PageTwo} />
            <Route exact path="/pagethree" component={PageThree} />
        </Switch>
    </BrowserRouter>
);

export default hot(Routes);
