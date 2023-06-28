import React, { FC } from 'react';

import { ParallaxChildrenProps } from '../types';

const ParallaxChildren: FC<ParallaxChildrenProps> = ({ children, onMount, className }) => (
    <div
        ref={(node) => onMount(node)}
        className={className || 'react-parallax-content'}
        style={{ position: 'relative' }}
    >
        {children}
    </div>
);

export default ParallaxChildren;
