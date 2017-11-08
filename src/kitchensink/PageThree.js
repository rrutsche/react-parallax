import React from 'react';
import { Parallax } from '../modules/index';

import image3 from '../assets/3.jpg';

export default class PageThree extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            theParentRef: null
        };
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
        const style = {
            backgroundColor: '#efefef',
            color: 'white',
            textAlign: 'center',
            position: 'absolute',
            top: 0,
            height: '300px',
            overflow: 'scroll'
        };
        const fontStyle2 = {
            fontFamily: 'Helvetica Neue, Arial, sans-serif',
            textAlign: 'center',
            fontWeight: 100,
            color: 'darkgrey'
        };
        return (
            <div style={style} ref={ref => this.onParentRefMounted(ref)}>
                <h1 style={fontStyle2}>
                    We need rest. The spirit is willing, but the flesh is spongy and bruised. Um, is
                    this the boring, peaceful kind of taking to the streets? Bender, this is
                    Fry&rsquo;s decision… and he made it wrong. So it is time for us to interfere in
                    his life. I am just glad my fat, ugly mama is not alive to see this day. Enough
                    about your promiscuous mother, Hermes! We have bigger problems. I didn&rsquo;t
                    ask for a completely reasonable excuse! I asked you to get busy! Aww, it&rsquo;s
                    true. I&rsquo;ve been hiding it for so long. Yes, I saw. You were doing well,
                    until everyone died. Maybe I love you so much I love you no matter who you are
                    pretending to be. Ow, my spirit! You&rsquo;re going back for the Countess,
                    aren&rsquo;t you? No! Don&rsquo;t jump! Oh, I think we should just stay friends.
                    Take me to your leader! We&rsquo;ll need to have a look inside you with this
                    camera. Bender, we&rsquo;re trying our best. Eeeee! Now say &rdquo;nuclear
                    wessels&rdquo;! Son, as your lawyer, I declare y&rsquo;all are in a 12-piece
                    bucket o&rsquo; trouble. But I done struck you a deal: Five hours of community
                    service cleanin&rsquo; up that ol&rsquo; mess you caused. I love this planet!
                    I&rsquo;ve got wealth, fame, and access to the depths of sleaze that those
                    things bring. I&rsquo;ll get my kit! Tell them I hate them. So, how &rsquo;bout
                    them Knicks? Oh, how I wish I could believe or understand that! There&rsquo;s
                    only one reasonable course of action now: kill Flexo! Large bet on myself in
                    round one. Now what? Five hours? Aw, man! Couldn&rsquo;t you just get me the
                    death penalty? Ooh, name it after me! Really?!
                </h1>
                <Parallax
                    parent={this.state.theParentRef}
                    log
                    bgImage={image3}
                    strength={-200}
                    contentStyles={[{ property: 'blur', min: 0, max: 2 }]}
                >
                    <h1 style={fontStyle2}>
                        And I&rsquo;d do it again! And perhaps a third time! But that would be it.
                        Tell her she looks thin. What are their names? Tell her she looks thin.
                        Anyhoo, your net-suits will allow you to experience Fry&rsquo;s worm
                        infested bowels as if you were actually wriggling through them. No, of
                        course not. It was… uh… porno. Yeah, that&rsquo;s it. I love this planet!
                        I&rsquo;ve got wealth, fame, and access to the depths of sleaze that those
                        things bring. Shinier than yours, meatbag. We&rsquo;re also Santa Claus!
                        Bender, being God isn&rsquo;t easy. If you do too much, people get dependent
                        on you, and if you do nothing, they lose hope. You have to use a light
                        touch. Like a safecracker, or a pickpocket. Bender, being God isn&rsquo;t
                        easy. If you do too much, people get dependent on you, and if you do
                        nothing, they lose hope. You have to use a light touch. Like a safecracker,
                        or a pickpocket. You&rsquo;ve killed me! Oh, you&rsquo;ve killed me! Yes,
                        except the Dave Matthews Band doesn&rsquo;t rock. Oh sure! Blame the
                        wizards! And why did &rsquo;I&rsquo; have to take a cab? Oh sure! Blame the
                        wizards! I don&rsquo;t &rsquo;need&rsquo; to drink. I can quit anytime I
                        want! Shut up and get to the point! I was all of history&rsquo;s great robot
                        actors - Acting Unit 0.8; Thespomat; David Duchovny! Ah, the
                        &rsquo;Breakfast Club&rsquo; soundtrack! I can&rsquo;t wait til I&rsquo;m
                        old enough to feel ways about stuff! I suppose I could part with
                        &rsquo;one&rsquo; and still be feared… Fry, you can&rsquo;t just sit here in
                        the dark listening to classical music. I barely knew Philip, but as a
                        clergyman I have no problem telling his most intimate friends all about him.
                        Check it out, y&rsquo;all. Everyone who was invited is here. Fry! Stay back!
                        He&rsquo;s too powerful! Why would a robot need to drink? Soothe us with
                        sweet lies. But I know you in the future. I cleaned your poop.
                    </h1>
                </Parallax>
                <hr />

                <div>
                    <h1 style={fontStyle2}>
                        Too much work. Let&rsquo;s burn it and say we dumped it in the sewer.
                        You&rsquo;ll have all the Slurm you can drink when you&rsquo;re partying
                        with Slurms McKenzie! It may comfort you to know that Fry&rsquo;s death took
                        only fifteen seconds, yet the pain was so intense, that it felt to him like
                        fifteen years. And it goes without saying, it caused him to empty his
                        bowels. Tell her you just want to talk. It has nothing to do with mating. I
                        had more, but you go ahead. Ok, we&rsquo;ll go deliver this crate like
                        professionals, and then we&rsquo;ll go ride the bumper cars. With gusto.
                        There, now he&rsquo;s trapped in a book I wrote: a crummy world of plot
                        holes and spelling errors! Say it in Russian! Son, as your lawyer, I declare
                        y&rsquo;all are in a 12-piece bucket o&rsquo; trouble. But I done struck you
                        a deal: Five hours of community service cleanin&rsquo; up that ol&rsquo;
                        mess you caused. I just told you! You&rsquo;ve killed me! You&rsquo;re going
                        to do his laundry? Kif, I have mated with a woman. Inform the men. The alien
                        mothership is in orbit here. If we can hit that bullseye, the rest of the
                        dominoes will fall like a house of cards. Checkmate. I&rsquo;m a thing. Of
                        all the friends I&rsquo;ve had… you&rsquo;re the first. Tell her you just
                        want to talk. It has nothing to do with mating. Too much work. Let&rsquo;s
                        burn it and say we dumped it in the sewer. Yeah, I do that with my
                        stupidness.
                    </h1>
                </div>
            </div>
        );
    }
}
