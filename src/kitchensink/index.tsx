import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import PageOne from './PageOne';
import PageTwo from './PageTwo';
import PageThree from './PageThree';

render(
    <BrowserRouter>
        <Switch>
            <Route exact path="/" component={PageOne} />
            <Route exact path="/pagetwo" component={PageTwo} />
            <Route exact path="/pagethree" component={PageThree} />
        </Switch>
    </BrowserRouter>,
    document.getElementById('app'),
);
