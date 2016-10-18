import React from 'react';

class Background extends React.Component {

	isParallaxBackground() {
		return true
	}

	render() {
		return (
			<div className={'react-parallax-background ' + this.props.className}>{this.props.children}</div>
		);
	}
}

Background.propTypes = {
	children: React.PropTypes.node,
	className: React.PropTypes.string
};
Background.defaultProps = {
	className: ''
};
export default Background;
