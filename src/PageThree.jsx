import React from 'react';
import { Parallax, Background } from './jsx/index.jsx';
import { Router, Route, Link, browserHistory } from 'react-router'

export default class PageThree extends React.Component {

	constructor(props) {
		super(props);
		let fontStyle = {
			fontFamily: 'Helvetica Neue, Arial, sans-serif',
			textAlign: 'center',
			fontWeight: 100
		};
		this.state = {
			image: 'https://cdn-images-1.medium.com/max/800/1*sEDRxEgz1JlnkAZFVZr6xA.jpeg',
			children: <h1 style={fontStyle}>children no1</h1>
		};
	}

	componentDidMount() {

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

	onParentRefMounted(ref) {
		if (!this.state.theParentRef) {
			this.setState({
				theParentRef: ref
			});
		}
	}

	getParentRef() {
		return this.state.theParentRef;
	}

	render() {
		let style = {
			backgroundColor: '#efefef',
			color: 'white',
			textAlign: 'center',
			position: 'absolute',
			top: 0,
			height: '300px',
			overflow: 'scroll',
		};
		let fontStyle2 = {
			fontFamily: 'Helvetica Neue, Arial, sans-serif',
			textAlign: 'center',
			fontWeight: 100,
			color: 'darkgrey'
		};
		return (
			<div style={style} ref={ref => this.onParentRefMounted(ref)}>
				<h1 style={fontStyle2}>
					We need rest. The spirit is willing, but the flesh is spongy and bruised. Um, is this the boring, peaceful kind of taking to the streets? Bender, this is Fry's decision… and he made it wrong. So it's time for us to interfere in his life.

					I'm just glad my fat, ugly mama isn't alive to see this day. Enough about your promiscuous mother, Hermes! We have bigger problems. I didn't ask for a completely reasonable excuse! I asked you to get busy!

					Aww, it's true. I've been hiding it for so long. Yes, I saw. You were doing well, until everyone died. Maybe I love you so much I love you no matter who you are pretending to be. Ow, my spirit! You're going back for the Countess, aren't you?

					No! Don't jump! Oh, I think we should just stay friends. Take me to your leader! We'll need to have a look inside you with this camera. Bender, we're trying our best.

					Eeeee! Now say "nuclear wessels"! Son, as your lawyer, I declare y'all are in a 12-piece bucket o' trouble. But I done struck you a deal: Five hours of community service cleanin' up that ol' mess you caused.

					I love this planet! I've got wealth, fame, and access to the depths of sleaze that those things bring. I'll get my kit! Tell them I hate them. So, how 'bout them Knicks? Oh, how I wish I could believe or understand that! There's only one reasonable course of action now: kill Flexo!

					Large bet on myself in round one. Now what? Five hours? Aw, man! Couldn't you just get me the death penalty? Ooh, name it after me! Really?!
				</h1>
				<Parallax
						parent={this.state.theParentRef}
						log
						bgImage={require('./assets/3.jpg')}
						strength={-200}
						contentStyles={[
							{property: 'blur', min: 0, max: 2}
						]}>
						<h1 style={fontStyle2}>
							And I'd do it again! And perhaps a third time! But that would be it. Tell her she looks thin. What are their names? Tell her she looks thin.

							Anyhoo, your net-suits will allow you to experience Fry's worm infested bowels as if you were actually wriggling through them. No, of course not. It was… uh… porno. Yeah, that's it. I love this planet! I've got wealth, fame, and access to the depths of sleaze that those things bring.

							Shinier than yours, meatbag. We're also Santa Claus! Bender, being God isn't easy. If you do too much, people get dependent on you, and if you do nothing, they lose hope. You have to use a light touch. Like a safecracker, or a pickpocket.

							Bender, being God isn't easy. If you do too much, people get dependent on you, and if you do nothing, they lose hope. You have to use a light touch. Like a safecracker, or a pickpocket. You've killed me! Oh, you've killed me!

							Yes, except the Dave Matthews Band doesn't rock. Oh sure! Blame the wizards! And why did 'I' have to take a cab? Oh sure! Blame the wizards! I don't 'need' to drink. I can quit anytime I want!

							Shut up and get to the point! I was all of history's great robot actors - Acting Unit 0.8; Thespomat; David Duchovny! Ah, the 'Breakfast Club' soundtrack! I can't wait til I'm old enough to feel ways about stuff!

							I suppose I could part with 'one' and still be feared… Fry, you can't just sit here in the dark listening to classical music. I barely knew Philip, but as a clergyman I have no problem telling his most intimate friends all about him.

							Check it out, y'all. Everyone who was invited is here. Fry! Stay back! He's too powerful! Why would a robot need to drink? Soothe us with sweet lies. But I know you in the future. I cleaned your poop.
						</h1>
					</Parallax>
				<hr/>

				<div>
					<h1 style={fontStyle2}>
						Too much work. Let's burn it and say we dumped it in the sewer. You'll have all the Slurm you can drink when you're partying with Slurms McKenzie! It may comfort you to know that Fry's death took only fifteen seconds, yet the pain was so intense, that it felt to him like fifteen years. And it goes without saying, it caused him to empty his bowels.

						Tell her you just want to talk. It has nothing to do with mating. I had more, but you go ahead. Ok, we'll go deliver this crate like professionals, and then we'll go ride the bumper cars. With gusto.

						There, now he's trapped in a book I wrote: a crummy world of plot holes and spelling errors! Say it in Russian! Son, as your lawyer, I declare y'all are in a 12-piece bucket o' trouble. But I done struck you a deal: Five hours of community service cleanin' up that ol' mess you caused.

						I just told you! You've killed me! You're going to do his laundry? Kif, I have mated with a woman. Inform the men. The alien mothership is in orbit here. If we can hit that bullseye, the rest of the dominoes will fall like a house of cards. Checkmate.

						I'm a thing. Of all the friends I've had… you're the first. Tell her you just want to talk. It has nothing to do with mating. Too much work. Let's burn it and say we dumped it in the sewer. Yeah, I do that with my stupidness.
					</h1>
				</div>
			</div>
		);
	}


}
