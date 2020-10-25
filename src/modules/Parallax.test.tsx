import React from 'react';
import { generateImage } from 'jsdom-screenshot';
import { render } from '@testing-library/react';
import Parallax from './Parallax';

import image from '../assets/test-pattern.jpg';

it('renders with minimal config', async () => {
    render(
        <Parallax bgImage={image}>
            <div style={{ height: 200 }}>content</div>
        </Parallax>,
    );

    const screenshot = await generateImage();
    expect(screenshot).toMatchImageSnapshot();
});
