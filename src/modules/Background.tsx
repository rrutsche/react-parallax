import React, { Component } from 'react';

export interface BackgroundProps {
    className?: string;
}

class Background extends Component<BackgroundProps, {}> {
    static defaultProps = {
        className: '',
    };
    static isParallaxBackground() {
        return true;
    }

    render() {
        const { className, children } = this.props;
        return <div className={`react-parallax-background ${className}`}>{children}</div>;
    }
}

export default Background;
