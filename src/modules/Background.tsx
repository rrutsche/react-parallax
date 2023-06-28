import React from 'react';

import { BackgroundProps } from '../types';

class Background extends React.Component<BackgroundProps> {
    static defaultProps = {
        className: '',
    };

    static isParallaxBackground = true;

    render(): JSX.Element {
        const { className, children } = this.props;
        return <div className={`react-parallax-background ${className}`}>{children}</div>;
    }
}

export default Background;
