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
		return (
			<div style={style}>
				<Parallax bgImage="assets/1.jpg" strength={300} log={true}>
					<br/><br/><br/><br/>
					<br/>
					<h1 style={fontStyle}>One morning, when Gregor Samsa woke from troubled dreams, he found himself transformed in his bed into a horrible vermin. He lay on his armour-like back, and if he lifted his head a little he could see his brown belly, slightly domed and divided by arches into stiff sections. The bedding was hardly able to cover it and seemed ready to slide off any moment. His many legs, pitifully thin compared with the size of the rest of him, waved about helplessly as he looked. "What's happened to me?" he thought. It wasn't a dream. His room, a proper human room although a little too small, lay peacefully between its four familiar walls. A collection of textile samples lay spread out on the table - Samsa was a travelling salesman - and above it there hung a picture that he had recently cut out of an illustrated magazine and housed in a nice, gilded frame. It showed a lady fitted out with a fur hat and fur boa who sat upright, raising a heavy fur muff that covered the whole of her lower arm towards the viewer. Gregor then turned to look out the window at the dull weather. Drops</h1>
					<br/>
					<h1 style={fontStyle}>...</h1>
					<h1 style={fontStyle}>some content</h1>
					<br/>
					<img src="http://www.fillmurray.com/100/300" alt="fill murray"/>
					<img src="http://www.fillmurray.com/400/300" alt="fill murray"/>
					<h1 style={fontStyle}>more and more content</h1>
					<h1 style={fontStyle}>...</h1>
					<br/>
					<br/>
				</Parallax>
				<Parallax bgImage="assets/2.jpg" strength={300}>
					<br/><br/><br/><br/>
					<br/>
					<h1 style={fontStyle}>One morning, when Gregor Samsa woke from troubled dreams, he found himself transformed in his bed into a horrible vermin. He lay on his armour-like back, and if he lifted his head a little he could see his brown belly, slightly domed and divided by arches into stiff sections. The bedding was hardly able to cover it and seemed ready to slide off any moment. His many legs, pitifully thin compared with the size of the rest of him, waved about helplessly as he looked. "What's happened to me?" he thought. It wasn't a dream. His room, a proper human room although a little too small, lay peacefully between its four familiar walls. A collection of textile samples lay spread out on the table - Samsa was a travelling salesman - and above it there hung a picture that he had recently cut out of an illustrated magazine and housed in a nice, gilded frame. It showed a lady fitted out with a fur hat and fur boa who sat upright, raising a heavy fur muff that covered the whole of her lower arm towards the viewer. Gregor then turned to look out the window at the dull weather. Drops</h1>
					<h1 style={fontStyle}>...</h1>
					<br/>
					<img src="http://www.fillmurray.com/200/300" alt="fill murray"/>
					<img src="http://www.fillmurray.com/100/300" alt="fill murray"/>
					<h1 style={fontStyle}>...</h1>
					<h1 style={fontStyle}>...</h1>
					<h1 style={fontStyle}>...</h1>
					<h1 style={fontStyle}>...</h1>
					<h1 style={fontStyle}>...</h1>
					<h1 style={fontStyle}>...</h1>
					<img src="http://www.fillmurray.com/300/300" alt="fill murray"/>
					<img src="http://www.fillmurray.com/200/300" alt="fill murray"/>
					<br/>
					<br/>
				</Parallax>
			</div>
		);
	}

	
}
