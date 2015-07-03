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
					<br/><br/><br/><br/>
					<h1>first parallax</h1>
					<br/>
					<br/>
					<br/><br/><br/><br/>
					<img src="http://www.fillmurray.com/400/400" alt="fill murray"/>
					<br/>
					<br/>
					<h2>filled with murray</h2>
					<br/>
				</Parallax>
				<div>
					<br/><br/><br/><br/>
					<h1>none-parallax content</h1>
					<br/>
					<h2>-------------</h2>
					<h2>because we can</h2>
					<br/><br/><br/><br/>
				</div>
				<Parallax bgImage="assets/2.jpg" blur={3}>
					<br/><br/><br/><br/>
					<h1>its the third</h1>
					<h2>text just has to fill the container to make the image visible</h2>
					<br/>
					<br/>
					<h2>it's just there</h2>
					<br/><br/><br/><br/>
					
				</Parallax>
				<Parallax bgColor="darkgrey">
					<br/><br/><br/><br/>
					<h1>guess</h1>
					<h1>what?</h1>
					<br/><br/><br/><br/>
				</Parallax>
				<Parallax bgImage="assets/3.jpg">
					<br/><br/><br/><br/>
					<h1>last one...</h1>
					<h2>one more placeholder</h2>
					<br/>
					<br/>
					<h2>empty</h2>
					<br/><br/><br/><br/>
					
				</Parallax>
			</div>
		);
	}

	
}
