import React from 'react';

export class Background extends React.Component {
	render() {
		return (
			<div ref="reactParallaxBackground" className="react-parallax-background">{this.props.children}</div>
		);
	}
}

Background.propTypes = {
	children: React.PropTypes.oneOfType([
		React.PropTypes.element,
		React.PropTypes.array
	])
};
