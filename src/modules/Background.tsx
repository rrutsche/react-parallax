import React from 'react';

import { Background as BackgroundClass } from '../../@types';

class Background extends BackgroundClass {
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
