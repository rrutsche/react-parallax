import PropTypes from 'prop-types';
import React from 'react';

class Background extends React.Component {
    static isParallaxBackground() {
        return true;
    }

    render() {
        return (
            <div className={`react-parallax-background ${this.props.className}`}>
                {this.props.children}
            </div>
        );
    }
}

Background.propTypes = {
    children: PropTypes.node,
    className: PropTypes.string
};
Background.defaultProps = {
    className: ''
};
export default Background;
