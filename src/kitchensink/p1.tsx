import React from 'react';
import { Link } from 'react-router-dom';
import { Parallax } from '../index';

// import image2 from '../assets/sw.jpg';
// import image3 from '../assets/air.jpg';
// import image4 from '../assets/4.jpg';
// import image5 from '../assets/3.jpg';

const image1 =
    'https://images.fineartamerica.com/images/artworkimages/mediumlarge/1/empire-state-building-black-and-white-square-format-john-farnan.jpg';

const style = {
    backgroundColor: '#efefef',
    color: 'white',
    textAlign: 'center' as const,
};
const fontStyle2 = {
    fontFamily: 'Helvetica Neue, Arial, sans-serif',
    textAlign: 'center' as const,
    fontWeight: 100,
    color: 'darkgrey',
};

type PageOneProps = Record<string, unknown>;
type PageOneState = {
    BG: number;
    srcSet?: number;
};

export default class PageOne extends React.Component<PageOneProps, PageOneState> {
    srcSets: { [key: string]: string };

    backgrounds: { [key: string]: string };

    constructor(props: PageOneProps) {
        super(props);
        this.backgrounds = {
            '1': image1,
            '2': image1,
            '3': image1,
        };
        this.srcSets = {
            1: `${image1} 1x, ${image1} 2x`,
            2: `${image1} 1x, ${image1} 2x`,
        };
        this.state = {
            BG: 1,
        };
    }

    toggleBackground = (): void => {
        const { BG } = this.state;
        this.setState({
            BG: BG === 1 ? 2 : 1,
        });
    };

    toggleSrcSet = (): void => {
        const { srcSet } = this.state;
        this.setState({
            srcSet: srcSet === 1 ? 2 : 1,
        });
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    render(): any {
        const { BG, srcSet } = this.state;
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
                        type="button"
                        style={{
                            backgroundColor: 'white',
                        }}
                        onClick={this.toggleBackground}
                    >
                        toggle background image 1
                    </button>
                    <button
                        type="button"
                        style={{
                            backgroundColor: 'white',
                        }}
                        onClick={this.toggleSrcSet}
                    >
                        toggle srcSet image 2
                    </button>
                </div>
                <div style={{ height: '700px' }} />
                <br />
                <Parallax
                    bgImage={this.backgrounds[BG]}
                    bgImageSrcSet={this.srcSets[srcSet || '']}
                    strength={200}
                    renderLayer={(percentage) => (
                        <div>
                            <div
                                style={{
                                    position: 'absolute',
                                    background: `rgba(255, 125, 0, ${percentage * 1})`,
                                    left: '50%',
                                    top: '50%',
                                    borderRadius: '50%',
                                    transform: 'translate(-50%,-50%)',
                                    width: percentage * 500,
                                    height: percentage * 500,
                                }}
                            />

                            <div
                                style={{
                                    zIndex: 100,
                                    position: 'absolute',
                                    top: percentage * 0,
                                    left: percentage * 0,
                                }}
                            >
                                Top {percentage}
                            </div>
                            <div
                                style={{
                                    zIndex: 100,
                                    position: 'absolute',
                                    bottom: percentage * 0,
                                    left: percentage * 0,
                                }}
                            >
                                Bottom {percentage}
                            </div>
                        </div>
                    )}
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
                <div style={{ height: '1200px' }} />
                <Link to="/p2">Page Two</Link>
            </div>
        );
    }
}
