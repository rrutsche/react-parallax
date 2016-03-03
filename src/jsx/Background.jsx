import React from 'react';

class Background extends React.Component {

	isParallaxBackground() {
		return true
	}

	render() {
		return (
			<div className="react-parallax-background">{this.props.children}</div>
		);
	}
}

export default Background;

// Background.propTypes = {
// 	children: React.PropTypes.oneOfType([
// 		React.PropTypes.element,
// 		React.PropTypes.array
// 	])
// };
