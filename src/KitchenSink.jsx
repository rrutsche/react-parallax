import React from 'react';
import { Parallax, Background } from './jsx/index.jsx';

export default class KitchenSink extends React.Component {

	constructor(props) {
		super(props);
		let fontStyle = {
			fontFamily: 'Helvetica Neue, Arial, sans-serif',
			textAlign: 'center',
			fontWeight: 100
		};
		this.state = {
			image: require('./assets/1.jpg'),
			children: <h1 style={fontStyle}>children no1</h1>
		};
	}

	changeImage() {
		this.setState({
			image: require('./assets/2.jpg')
		});
	}

	changeChildren() {
		let fontStyle = {
			fontFamily: 'Helvetica Neue, Arial, sans-serif',
			textAlign: 'center',
			fontWeight: 100
		};
		this.setState({
			children: <h1 style={fontStyle}>children no2!!!!</h1>
		});
	}

	render() {
		let style = {
			backgroundColor: '#efefef',
			color: 'white',
			textAlign: 'center'
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
					<h1 style={fontStyle2}>One morning, when Gregor Samsa woke from troubled dreams, he found himself transformed in his bed into a horrible vermin. He lay on his armour-like back, and if he lifted his head a little he could see his brown belly, slightly domed and divided by arches into stiff sections.</h1>
				</div>
				<Parallax strength={300} log>
					<Background className="custom-bg">
						<img src="http://www.fillmurray.com/400/300" alt="fill murray"/>
					</Background>
					<h1 style={fontStyle2}>A collection of textile samples lay spread out on the table - Samsa was a travelling salesman - and above it there hung a picture that he had recently cut out of an illustrated magazine and housed in a nice, gilded frame. It showed a lady fitted out with a fur hat and fur boa who sat upright, raising a heavy fur muff that covered the whole of her lower arm towards the viewer. Gregor then turned to look out the window at the dull weather. Drops</h1>
				</Parallax>
				<div>
					<br/>
					<h1 style={fontStyle2}>One morning, when Gregor Samsa woke from troubled dreams, he found himself transformed in his bed into a horrible vermin. He lay on his armour-like back, and if he lifted his head a little he could see his brown belly, slightly domed and divided by arches into stiff sections.</h1>
					<h1 style={fontStyle2}>One morning, when Gregor Samsa woke from troubled dreams, he found himself transformed in his bed into a horrible vermin. He lay on his armour-like back, and if he lifted his head a little he could see his brown belly, slightly domed and divided by arches into stiff sections.</h1>
					<br/>
					<h1 style={fontStyle2} onClick={() => this.changeImage()}>change image</h1>
					<h1 style={fontStyle2} onClick={() => this.changeChildren()}>change children</h1>
				</div>
				<Parallax
					bgImage={this.state.image}
					strength={200}
					contentStyles={[
						{property: 'blur', min: 0, max: 2}
					]}>
					<br/>
					{this.state.children}
					<h1 style={fontStyle2}>A collection of textile samples lay spread out on the table - Samsa was a travelling salesman - and above it there hung a picture that he had recently cut out of an illustrated magazine and housed in a nice, gilded frame. It showed a lady fitted out with a fur hat and fur boa who sat upright, raising a heavy fur muff that covered the whole of her lower arm towards the viewer. Gregor then turned to look out the window at the dull weather. Drops</h1>
					<br/>
				</Parallax>
				<div style={{width: '500px', margin: '20px auto'}}>
					<Parallax
						bgImage={require('./assets/3.jpg')}
						strength={200}
						contentStyles={[
							{property: 'blur', min: 0, max: 2}
						]}>
						<br/>
						{this.state.children}
						<h1 style={fontStyle2}>A collection of textile samples lay spread out on the table - Samsa was a travelling salesman - and above it there hung a picture that he had recently cut out of an illustrated magazine and housed in a nice, gilded frame. It showed a lady fitted out with a fur hat and fur boa who sat upright, raising a heavy fur muff that covered the whole of her lower arm towards the viewer. Gregor then turned to look out the window at the dull weather. Drops</h1>
						<br/>
					</Parallax>
				</div>
				<Parallax strength={300}>
					<Background>
						<img src="http://www.fillmurray.com/400/300" alt="fill murray"/>
						<div style={{width: 800, height: 300, backgroundColor: '#450093'}}></div>
						<img src="http://www.fillmurray.com/500/300" alt="fill murray"/>
					</Background>
					<h1 style={fontStyle2}>A collection of textile samples lay spread out on the table - Samsa was a travelling salesman - and above it there hung a picture that he had recently cut out of an illustrated magazine and housed in a nice, gilded frame. It showed a lady fitted out with a fur hat and fur boa who sat upright, raising a heavy fur muff that covered the whole of her lower arm towards the viewer. Gregor then turned to look out the window at the dull weather. Drops</h1>
				</Parallax>

				<div>
					<br/>
					<h1 style={fontStyle2}>A collection of textile samples lay spread out on the table - Samsa was a travelling salesman - and above it there hung a picture that he had recently cut out of an illustrated magazine and housed in a nice, gilded frame. It showed a lady fitted out with a fur hat and fur boa who sat upright, raising a heavy fur muff that covered the whole of her lower arm towards the viewer. Gregor then turned to look out the window at the dull weather. Drops</h1>
					<h1 style={fontStyle2}>A collection of textile samples lay spread out on the table - Samsa was a travelling salesman - and above it there hung a picture that he had recently cut out of an illustrated magazine and housed in a nice, gilded frame. It showed a lady fitted out with a fur hat and fur boa who sat upright, raising a heavy fur muff that covered the whole of her lower arm towards the viewer. Gregor then turned to look out the window at the dull weather. Drops</h1>
					<h1 style={fontStyle2}>A collection of textile samples lay spread out on the table - Samsa was a travelling salesman - and above it there hung a picture that he had recently cut out of an illustrated magazine and housed in a nice, gilded frame. It showed a lady fitted out with a fur hat and fur boa who sat upright, raising a heavy fur muff that covered the whole of her lower arm towards the viewer. Gregor then turned to look out the window at the dull weather. Drops</h1>
					<h1 style={fontStyle2}>A collection of textile samples lay spread out on the table - Samsa was a travelling salesman - and above it there hung a picture that he had recently cut out of an illustrated magazine and housed in a nice, gilded frame. It showed a lady fitted out with a fur hat and fur boa who sat upright, raising a heavy fur muff that covered the whole of her lower arm towards the viewer. Gregor then turned to look out the window at the dull weather. Drops</h1>
					<br/>
				</div>
			</div>
		);
	}


}
