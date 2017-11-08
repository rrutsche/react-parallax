import React from 'react';
import { Link } from 'react-router';
import { Parallax } from '../modules/index';

import image1 from '../assets/4.jpg';
import image2 from '../assets/sw.jpg';
import image3 from '../assets/air.jpg';
import image4 from '../assets/4.jpg';

const style = {
    backgroundColor: '#efefef',
    color: 'white',
    textAlign: 'center'
};
const fontStyle2 = {
    fontFamily: 'Helvetica Neue, Arial, sans-serif',
    textAlign: 'center',
    fontWeight: 100,
    color: 'darkgrey'
};

export default class PageOne extends React.Component {
    constructor(props) {
        super(props);
        this.backgrounds = {
            1: image1,
            2: image2
        };
        this.state = {
            BG: 1
        };
    }

    toggleBackground() {
        this.setState({
            BG: this.state.BG === 1 ? 2 : 1
        });
    }

    render() {
        return (
            <div style={style}>
                <button
                    style={{
                        cursor: 'pointer',
                        position: 'fixed',
                        left: 10,
                        top: 10,
                        color: 'black',
                        backgroundColor: 'white',
                        zIndex: 10
                    }}
                    onClick={() => this.toggleBackground()}
                >
                    toogle background image 1
                </button>
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
