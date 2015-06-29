import React from 'react';
import Parallax from '../dist/Parallax';

export default class KitchenSink extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
		};
	}

	render() {
		let style = {
			backgroundColor: '#efefef'
		};
		let divs = [];
		for (var i = 0; i < 200; i++) {
			divs.push(<div>hello {i}</div>);
		}
		return (
			<div style={style}>
				<Parallax bgColor="white">
					my first parallax
				</Parallax>
				<Parallax bgColor="blue">
					my second parallax
				</Parallax>
				<Parallax bgColor="purple">
					its the third
				</Parallax>
				<Parallax bgColor="darkgrey">
					guess what?
				</Parallax>
				{divs}
			</div>
		);
	}

	
}
