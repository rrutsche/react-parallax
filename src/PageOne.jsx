import React from 'react';
import { Parallax, Background } from './jsx/index.jsx';
import { Router, Route, Link, browserHistory } from 'react-router'

export default class PageOne extends React.Component {

	constructor(props) {
		super(props);
		let fontStyle = {
			fontFamily: 'Helvetica Neue, Arial, sans-serif',
			textAlign: 'center',
			fontWeight: 100
		};
		this.backgrounds = {
			1: require('./assets/4.jpg'),
			2: require('./assets/sw.jpg'),
		};
		this.state = {
			BG: 1,
			children: <h1 style={fontStyle}>children no1</h1>,
		};
	}

	toggleBackground() {
		this.setState({
			BG: this.state.BG === 1 ? 2 : 1
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
				<div style={{
						cursor: 'pointer',
						position: 'fixed',
						left: 10,
						top: 10,
						color: 'black',
						backgroundColor: 'white',
						zIndex: 10,
					}}
					onClick={() => this.toggleBackground()}
				>
					toogle background image 1
				</div>
				<Parallax
					log
					blur={{min: -15, max: 15}}
					bgImage={this.backgrounds[this.state.BG]}
					bgImageAlt={'the dog'}
					strength={200}
					contentStyles={[
						{property: 'blur', min: 0, max: 2}
					]}>
					<div style={{height: '600px'}}></div>
				</Parallax>
				<br/>
				<Parallax
					bgImage={require('./assets/4.jpg')}
					strength={-200}
					contentStyles={[
						{property: 'blur', min: 0, max: 2}
					]}>
					<br/>
					<h1 style={fontStyle2}>
						<p>"It's certain," thought he, "though rascal as he is, he is a polite one!"</p>
						<p>The sails and the English flag were hoisted at ten minutes past three. Mr. Fogg and Aouda, who were seated on deck, cast a last glance at the quay, in the hope of espying Passepartout.  Fix was not without his fears lest chance should direct the steps of the unfortunate servant, whom he had so badly treated, in this direction; in which case an explanation the reverse of satisfactory to the detective must have ensued.  But the Frenchman did not appear, and, without doubt, was still lying under the stupefying influence of the opium.</p>
					</h1>
				</Parallax>
				<br/>
				<Parallax
					bgImage={require('./assets/air.jpg')}
					strength={200}
					contentStyles={[
						{property: 'blur', min: 0, max: 2}
					]}>
					<br/>
					<h1 style={fontStyle2}>
						<p>"It's certain," thought he, "though rascal as he is, he is a polite one!"</p>
						<p>The sails and the English flag were hoisted at ten minutes past three. Mr. Fogg and Aouda, who were seated on deck, cast a last glance at the quay, in the hope of espying Passepartout.  Fix was not without his fears lest chance should direct the steps of the unfortunate servant, whom he had so badly treated, in this direction; in which case an explanation the reverse of satisfactory to the detective must have ensued.  But the Frenchman did not appear, and, without doubt, was still lying under the stupefying influence of the opium.</p>
					</h1>
				</Parallax>
				<div style={{height: '800px'}}></div>
				<Link to="pagetwo">Page Two</Link>
			</div>
		);
	}


}
