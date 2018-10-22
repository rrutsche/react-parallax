import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

class ParallaxChildren extends PureComponent {
    static propTypes = {
        children: PropTypes.node,
        className: PropTypes.string,
        onMount: PropTypes.func,
    };
    render() {
        const { children, onMount, className } = this.props;
        return (
            <div
                ref={node => onMount(node)}
                className={className || 'react-parallax-content'}
                style={{ position: 'relative' }}
            >
                {children}
            </div>
        );
    }
}

ParallaxChildren.propTypes = {};

export default ParallaxChildren;
