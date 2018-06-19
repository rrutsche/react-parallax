import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

class ParallaxChildren extends PureComponent {
    static propTypes = {
        children: PropTypes.node,
        onMount: PropTypes.func,
    };
    render() {
        console.log('children render');
        const { children, onMount } = this.props;
        return (
            <div
                ref={node => onMount(node)}
                className="react-parallax-content"
                style={{ position: 'relative' }}
            >
                {children}
            </div>
        );
    }
}

ParallaxChildren.propTypes = {};

export default ParallaxChildren;
