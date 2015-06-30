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
			backgroundColor: '#efefef',
			color: 'white'
		};
		let fontStyle = {
			fontFamily: 'Helvetica Neue, Arial, sans-serif',
			textAlign: 'center',
			fontWeight: 100

		};
		return (
			<div style={style}>
				<Parallax bgColor="white" bgImage="assets/1.jpg" strength={300} log={true}>
					<br/>
					<h1 style={fontStyle}>first parallax</h1>
					<h2 style={fontStyle}>with some crazy text that describes: nothing!</h2>
					<br/>
					<h2 style={fontStyle}>it's just there</h2>
					<br/>

				</Parallax>
				<Parallax bgColor="white">
					<br/>
					<h1 style={fontStyle}>second parallax</h1>
					<br/>
				</Parallax>
				<Parallax bgColor="purple" bgImage="assets/2.jpg">
					<br/>
					<h1 style={fontStyle}>its the third</h1>
					<h2 style={fontStyle}>text just has to fill the container to make the image visible</h2>
					<br/>
					<br/>
					<h2 style={fontStyle}>it's just there</h2>
					<br/>
					
				</Parallax>
				<Parallax bgColor="darkgrey">
					<h1 style={fontStyle}>guess</h1>
					<h1 style={fontStyle}>what?</h1>
				</Parallax>
				<Parallax bgColor="darkgrey" bgImage="assets/3.jpg">
					<br/>
					<h1 style={fontStyle}>last one...</h1>
					<h2 style={fontStyle}>one more placeholder</h2>
					<br/>
					<br/>
					<h2 style={fontStyle}>empty</h2>
					<br/>
					
				</Parallax>
			</div>
		);
	}

	
}
