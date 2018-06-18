import React from 'react';
import { Link } from 'react-router';
import { Parallax } from '../modules/index';

import image1 from '../assets/4.jpg';
import image2 from '../assets/sw.jpg';
import image3 from '../assets/air.jpg';
import image4 from '../assets/4.jpg';
import image5 from '../assets/3.jpg';

const style = {
    backgroundColor: '#efefef',
    color: 'white',
    textAlign: 'center',
};
const fontStyle2 = {
    fontFamily: 'Helvetica Neue, Arial, sans-serif',
    textAlign: 'center',
    fontWeight: 100,
    color: 'darkgrey',
};

export default class PageOne extends React.Component {
    constructor(props) {
        super(props);
        this.backgrounds = {
            1: image1,
            2: image2,
            3: image5,
        };
        this.srcSets = {
            1: `${image4} 1x, ${image2} 2x`,
            2: `${image3} 1x, ${image1} 2x`,
        };
        this.state = {
            BG: 3,
        };
    }

    toggleBackground = () => {
        this.setState({
            BG: this.state.BG === 3 ? 2 : 3,
        });
    };

    toggleSrcSet = () => {
        this.setState({
            srcSet: this.state.srcSet === 1 ? 2 : 1,
        });
    };

    render() {
        return (
            <div style={style}>
                <div
                    style={{
                        cursor: 'pointer',
                        position: 'fixed',
                        left: 10,
                        top: 10,
                        color: 'black',
                        backgroundColor: 'white',
                        zIndex: 10,
                    }}
                >
                    <button
                        style={{
                            backgroundColor: 'white',
                        }}
                        onClick={this.toggleBackground}
                    >
                        toogle background image 1
                    </button>
                    <button
                        style={{
                            backgroundColor: 'white',
                        }}
                        onClick={this.toggleSrcSet}
                    >
                        toogle srcSet image 2
                    </button>
                </div>
                <Parallax
                    log
                    blur={{ min: -15, max: 15 }}
                    bgImage={this.backgrounds[this.state.BG]}
                    bgImageAlt="the dog"
                    strength={200}
                    contentStyles={[{ property: 'blur', min: 0, max: 2 }]}
                >
                    <div style={{ height: '600px' }} />
                </Parallax>
                <br />
                <Parallax
                    bgImage={image4}
                    bgImageSrcSet={this.srcSets[this.state.srcSet]}
                    strength={-200}
                    contentStyles={[{ property: 'blur', min: 0, max: 2 }]}
                >
                    <br />
                    <h1 style={fontStyle2}>
                        <p>
                            The sails and the English flag were hoisted at ten minutes past three.
                            Mr. Fogg and Aouda, who were seated on deck, cast a last glance at the
                            quay, in the hope of espying Passepartout. Fix was not without his fears
                            lest chance should direct the steps of the unfortunate servant, whom he
                            had so badly treated, in this direction; in which case an explanation
                            the reverse of satisfactory to the detective must have ensued. But the
                            Frenchman did not appear, and, without doubt, was still lying under the
                            stupefying influence of the opium.
                        </p>
                    </h1>
                </Parallax>
                <br />
                <Parallax
                    bgImage={image3}
                    strength={200}
                    contentStyles={[{ property: 'blur', min: 0, max: 2 }]}
                >
                    <br />
                    <h1 style={fontStyle2}>
                        <p>
                            &rdquo;It&rsquo;s certain,&rdquo; thought he, &rdquo;though rascal as he
                            is, he is a polite one!&rdquo;
                        </p>
                        <p>
                            The sails and the English flag were hoisted at ten minutes past three.
                            Mr. Fogg and Aouda, who were seated on deck, cast a last glance at the
                            quay, in the hope of espying Passepartout. Fix was not without his fears
                            lest chance should direct the steps of the unfortunate servant, whom he
                            had so badly treated, in this direction; in which case an explanation
                            the reverse of satisfactory to the detective must have ensued. But the
                            Frenchman did not appear, and, without doubt, was still lying under the
                            stupefying influence of the opium.
                        </p>
                    </h1>
                </Parallax>
                <div style={{ height: '800px' }} />
                <Link to="/pagetwo">Page Two</Link>
            </div>
        );
    }
}
