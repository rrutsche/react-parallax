import React, { Component } from 'react';

export class KitchenSink extends Component {
	render() {
		return (
			<div>
				{this.props.children}
			</div>
		);
	}
}
