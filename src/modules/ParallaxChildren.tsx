import React from 'react';

export interface ParallaxChildrenProps {
    className?: string;
    children?: React.ReactNode;
    onMount(node: HTMLDivElement): undefined;
}

const ParallaxChildren: React.SFC<ParallaxChildrenProps> = ({ children, onMount, className }) => (
    <div
        ref={node => onMount(node)}
        className={className || 'react-parallax-content'}
        style={{ position: 'relative' }}
    >
        {children}
    </div>
);

export default ParallaxChildren;
