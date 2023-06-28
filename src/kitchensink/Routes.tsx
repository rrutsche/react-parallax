import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { hot } from 'react-hot-loader';
import Page1 from './p1';
import Page2 from './p2';
import Page3 from './p3';
import Page4 from './p4';
import { Page5 } from './p5';

const Routes = () => (
    <BrowserRouter>
        <Route path="/" element={<Page1 />} />
        <Route path="/p2" element={<Page2 />} />
        <Route path="/p3" element={<Page3 />} />
        <Route path="/p4" element={<Page4 />} />
        <Route path="/p5" element={<Page5 />} />
    </BrowserRouter>
);

export default hot(Routes);
