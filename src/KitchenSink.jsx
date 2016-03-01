import React from 'react';
import { Background } from './jsx/index.jsx';

export default class KitchenSink extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
		};
	}

	render() {
		let style = {
			backgroundColor: '#efefef',
			color: 'white',
			textAlign: 'center'
		};
		let fontStyle = {
			fontFamily: 'Helvetica Neue, Arial, sans-serif',
			textAlign: 'center',
			fontWeight: 100
		};
		let fontStyle2 = {
			fontFamily: 'Helvetica Neue, Arial, sans-serif',
			textAlign: 'center',
			fontWeight: 100,
			color: 'darkgrey'
		};
		return (
			<div style={style}>
				
			</div>
		);
	}

	
}
