import React from 'react';
import { Parallax, Background } from './jsx/index.jsx';
import { Router, Route, Link, browserHistory } from 'react-router'

export default class PageTwo extends React.Component {

	constructor(props) {
		super(props);
		let fontStyle = {
			fontFamily: 'Helvetica Neue, Arial, sans-serif',
			textAlign: 'center',
			fontWeight: 100
		};
		this.state = {
			image: 'https://totallycoolpix.com/images/tcp_images_before/1013/itp_shamma_esoof_012__tcp_gallery_image.jpg',
			children: <h1 style={fontStyle}>children no1</h1>
		};
	}

	changeImage() {
		this.setState({
			image: 'http://combiboilersleeds.com/images/rocket/rocket-6.jpg'
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
				<Link to="pageone">Page One</Link>
				<Parallax
					log
					bgImage={this.state.image}
					strength={200}
					contentStyles={[
						{property: 'blur', min: 0, max: 2}
					]}>
					<br/>
					{this.state.children}
					<h1 style={fontStyle2}>
						<p>"Queequeg," said I, when they had dragged me, the last man, to the deck, and I was still shaking myself in my jacket to fling off the water; "Queequeg, my fine friend, does this sort of thing often happen?" Without much emotion, though soaked through just like me, he gave me to understand that such things did often happen.</p>
						<p>"Mr. Stubb," said I, turning to that worthy, who, buttoned up in his oil-jacket, was now calmly smoking his pipe in the rain; "Mr. Stubb, I think I have heard you say that of all whalemen you ever met, our chief mate, Mr. Starbuck, is by far the most careful and prudent. I suppose then, that going plump on a flying whale with your sail set in a foggy squall is the height of a whaleman's discretion?"</p>
					</h1>
					<br/>
				</Parallax>
				<h1 style={fontStyle2}>
					<p>Quieting him with a word of command and a caress, I looked hurriedly through the approaching gloom for a sign of Dejah Thoris, and then, not seeing her, I called her name.  There was an answering murmur from the far corner of the apartment, and with a couple of quick strides I was standing beside her where she crouched among the furs and silks upon an ancient carved wooden seat.  As I waited she rose to her full height and looking me straight in the eye said:</p>
				</h1>
				<Parallax strength={300}>
					<Background className="custom-bg">
						<img src="http://www.fillmurray.com/500/320" alt="fill murray"/>
					</Background>
					<h1 style={fontStyle2}>
						<p>"Plague victims," he announced. "That's the way they died everywhere  in the last days. This must have been a family, running away from the  contagion and perishing here on the Cliff House beach. They&mdash;what are  you doing, Edwin?"</p>
					</h1>
				</Parallax>
				<div style={fontStyle2}>
					<p>"It's certain," thought he, "though rascal as he is, he is a polite one!"</p>
					<p>The sails and the English flag were hoisted at ten minutes past three. Mr. Fogg and Aouda, who were seated on deck, cast a last glance at the quay, in the hope of espying Passepartout.  Fix was not without his fears lest chance should direct the steps of the unfortunate servant, whom he had so badly treated, in this direction; in which case an explanation the reverse of satisfactory to the detective must have ensued.  But the Frenchman did not appear, and, without doubt, was still lying under the stupefying influence of the opium.</p>
					<h1 style={fontStyle2} onClick={() => this.changeImage()}>change image</h1>
					<h1 style={fontStyle2} onClick={() => this.changeChildren()}>change children</h1>
				</div>
				<div style={{width: '500px', margin: '20px auto'}}>
					<Parallax
						bgImage={require('./assets/3.jpg')}
						strength={200}
						contentStyles={[
							{property: 'blur', min: 0, max: 2}
						]}>
						<br/>
						{this.state.children}
						<h1 style={fontStyle2}>
							<p>"It's certain," thought he, "though rascal as he is, he is a polite one!"</p>
							<p>The sails and the English flag were hoisted at ten minutes past three. Mr. Fogg and Aouda, who were seated on deck, cast a last glance at the quay, in the hope of espying Passepartout.  Fix was not without his fears lest chance should direct the steps of the unfortunate servant, whom he had so badly treated, in this direction; in which case an explanation the reverse of satisfactory to the detective must have ensued.  But the Frenchman did not appear, and, without doubt, was still lying under the stupefying influence of the opium.</p>
						</h1>
					</Parallax>
				</div>
				<Parallax strength={300}>
					<Background>
						<img src="http://www.fillmurray.com/480/300" alt="fill murray"/>
						<div style={{width: 800, height: 300, backgroundColor: '#450093'}}></div>
						<img src="http://www.fillmurray.com/500/400" alt="fill murray"/>
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
