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
				<div>
					<br/>
					<h1 style={fontStyle2}>One morning, when Gregor Samsa woke from troubled dreams, he found himself transformed in his bed into a horrible vermin. He lay on his armour-like back, and if he lifted his head a little he could see his brown belly, slightly domed and divided by arches into stiff sections.</h1>
					<br/>
				</div>
				<Parallax bgImage="assets/1.jpg" strength={-300} log={true}>
					<h1 style={fontStyle}>...</h1>
					<h1 style={fontStyle}>some content</h1>
					<br/>
					<img src="http://www.fillmurray.com/400/300" alt="fill murray"/>
					<h1 style={fontStyle}>...</h1>
					<br/>
				</Parallax>
				<div>
					<br/>
					<h1 style={fontStyle2}>A collection of textile samples lay spread out on the table - Samsa was a travelling salesman - and above it there hung a picture that he had recently cut out of an illustrated magazine and housed in a nice, gilded frame. It showed a lady fitted out with a fur hat and fur boa who sat upright, raising a heavy fur muff that covered the whole of her lower arm towards the viewer. Gregor then turned to look out the window at the dull weather. Drops</h1>
					<br/>
				</div>
				<Parallax bgImage="assets/2.jpg" strength={300}>
					<br/>
					<img src="http://www.fillmurray.com/200/300" alt="fill murray"/>
					<img src="http://www.fillmurray.com/100/300" alt="fill murray"/>
					<h1 style={fontStyle}>...</h1>
					<h1 style={fontStyle}>...</h1>
					<br/>
					<br/>
				</Parallax>
			</div>
		);
	}

	
}
