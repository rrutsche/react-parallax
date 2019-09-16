import PropTypes from 'prop-types';
import React, { Component } from 'react';

import {
    getNodeHeight,
    canUseDOM,
    getRelativePosition,
    getSplitChildren,
    isScrolledIntoView,
} from '../util/Util';
import ParallaxChildren from './ParallaxChildren';

const initialStyle = {
    position: 'absolute',
    left: '50%',
    WebkitTransform: 'translate3d(-50%, 0, 0)',
    transform: 'translate3d(-50%, 0, 0)',
    WebkitTransformStyle: 'preserve-3d',
    WebkitBackfaceVisibility: 'hidden',
    MozBackfaceVisibility: 'hidden',
    MsBackfaceVisibility: 'hidden',
};

class Parallax extends Component {
    constructor(props) {
        super(props);

        this.state = {
            bgImage: props.bgImage,
            bgImageSrcSet: props.bgImageSrcSet,
            bgImageSizes: props.bgImageSizes,
            imgStyle: initialStyle,
            bgStyle: {
                ...initialStyle,
                ...props.bgStyle,
            },
            percentage: 0,
        };

        this.canUseDOM = canUseDOM();

        this.node = null;
        this.content = null;
        this.splitChildren = getSplitChildren(props);

        this.bgImageLoaded = false;
        this.bgImageRef = undefined;

        this.parent = props.parent;
        this.parentHeight = getNodeHeight(this.canUseDOM, this.parent);
        this.timestamp = Date.now();
        this.dynamicBlur = !!(
            props.blur &&
            props.blur.min !== undefined &&
            props.blur.max !== undefined
        );
    }

    /**
     * bind some eventlisteners for page load, scroll and resize
     * save component ref after rendering, update all values and set static style values
     */
    componentDidMount() {
        const { parent } = this.props;
        const { bgImage, bgImageSrcSet, bgImageSizes } = this.state;

        this.parent = parent || document;
        this.addListeners();
        // ref to component itself

        if (bgImage) {
            this.loadImage(bgImage, bgImageSrcSet, bgImageSizes);
        } else {
            this.updatePosition();
        }
    }

    componentDidUpdate(prevProps) {
        const { parent, bgImage, bgImageSrcSet, bgImageSizes } = this.props;
        const { bgImage: stateBgImage } = this.state;
        this.splitChildren = getSplitChildren(this.props);

        if (prevProps.parent !== parent) {
            this.removeListeners(prevProps.parent);
            this.parent = parent;
            if (parent) {
                this.addListeners();
            }
        }

        this.parentHeight = getNodeHeight(this.canUseDOM, this.parent);

        if (stateBgImage !== bgImage) {
            this.loadImage(bgImage, bgImageSrcSet, bgImageSizes);
        }
    }

    /**
     * remove all eventlisteners before component is destroyed
     */
    componentWillUnmount() {
        this.removeListeners(this.parent);
        this.releaseImage();
    }

    /**
     * update window height and positions on window resize
     */
    onWindowResize = () => {
        this.parentHeight = getNodeHeight(this.canUseDOM, this.parent);
        this.updatePosition();
    };

    onWindowLoad = () => {
        this.updatePosition();
    };

    onScroll = () => {
        if (!this.canUseDOM) {
            return;
        }
        const stamp = Date.now();
        if (stamp - this.timestamp >= 10 && isScrolledIntoView(this.node, 100, this.canUseDOM)) {
            window.requestAnimationFrame(this.updatePosition);
            this.timestamp = stamp;
        }
    };

    onContentMount = content => {
        this.content = content;
    };

    setBackgroundPosition(percentage) {
        const { disabled, strength } = this.props;
        // don't do unneccessary style processing if parallax is disabled
        if (disabled === true) {
            return;
        }

        const { bgStyle } = this.state;
        const inverse = strength < 0;
        const pos = (inverse ? strength : 0) - strength * percentage;
        const transform = `translate3d(-50%, ${pos}px, 0)`;

        this.setState({
            bgStyle: {
                ...bgStyle,
                WebkitTransform: transform,
                transform,
            },
            percentage,
        });
    }

    /**
     * sets position for the background image
     */
    setImagePosition(percentage, autoHeight = false) {
        const { disabled, strength, blur } = this.props;
        const height = autoHeight ? 'auto' : `${this.getImageHeight()}px`;
        const width = !autoHeight ? 'auto' : `${this.contentWidth}px`;

        // don't do unneccessary style processing if parallax is disabled
        if (disabled === true) {
            return;
        }

        const { imgStyle } = this.state;
        const inverse = strength < 0;
        const pos = (inverse ? strength : 0) - strength * percentage;

        const transform = `translate3d(-50%, ${pos}px, 0)`;
        let filter = 'none';
        if (blur) {
            const blurValue = this.dynamicBlur ? blur.min + (1 - percentage) * blur.max : blur;
            filter = `blur(${blurValue}px)`;
        }

        this.setState({
            imgStyle: {
                ...imgStyle,
                height,
                width,
                WebkitTransform: transform,
                transform,
                WebkitFilter: filter,
                filter,
            },
            percentage,
        });
    }

    /**
     * The image height depends on parallax direction. If strength value is negative we have to give it more height
     * so there is no white space at start/end of container visiblility.
     */
    getImageHeight() {
        const { strength } = this.props;
        const inverse = strength < 0;
        const factor = inverse ? 2.5 : 1;
        const strengthWithFactor = factor * Math.abs(strength);
        return Math.floor(this.contentHeight + strengthWithFactor);
    }

    /**
     * updates scroll position of this component and also its width and height.
     * defines, if the background image should have autoHeight or autoWidth to
     * fit the component space optimally
     */
    updatePosition = () => {
        if (!this.content) {
            return;
        }
        let autoHeight = false;
        this.contentHeight = this.content.getBoundingClientRect().height;
        this.contentWidth = this.node.getBoundingClientRect().width;

        // set autoHeight or autoWidth
        if (
            this.img &&
            this.img.naturalWidth / this.img.naturalHeight <
                this.contentWidth / this.getImageHeight()
        ) {
            autoHeight = true;
        }

        // get relative scroll-y position of parallax component in percentage
        const percentage = getRelativePosition(this.node, this.canUseDOM, this.parent);

        // update bg image position if set
        if (this.img) {
            this.setImagePosition(percentage, autoHeight);
        }
        // update position of Background children if exist
        if (this.bg && this.splitChildren.bgChildren.length > 0) {
            this.setBackgroundPosition(percentage);
        }
    };

    /**
     * Makes sure that the image was loaded before render
     * @param  {String} bgImage image source
     * @param  {String} bgImageSrcSet image srcset attribute
     * @param  {String} bgImageSizes image size attribute
     */
    loadImage(bgImage, bgImageSrcSet, bgImageSizes) {
        this.releaseImage();
        this.bgImageRef = new Image();
        this.bgImageRef.onload = () => {
            this.setState(
                {
                    bgImage,
                    bgImageSrcSet,
                    bgImageSizes,
                },
                () => this.updatePosition(),
            );
        };
        this.bgImageRef.onerror = this.bgImageRef.onload;
        this.bgImageRef.src = bgImage;
        this.bgImageRef.srcset = bgImageSrcSet || '';
        this.bgImageRef.sizes = bgImageSizes || '';
    }

    /**
     * Unbind eventlistener of bg image and delete it
     * @param  {String} id Image ID
     */
    releaseImage() {
        if (this.bgImageRef) {
            this.bgImageRef.onload = null;
            this.bgImageRef.onerror = null;
            delete this.bgImageRef;
        }
    }

    addListeners() {
        if (this.canUseDOM && this.parent) {
            this.parent.addEventListener('scroll', this.onScroll, false);
            window.addEventListener('resize', this.onWindowResize, false);
            window.addEventListener('load', this.onWindowLoad, false);
        }
    }

    removeListeners(parent) {
        if (this.canUseDOM) {
            if (parent) {
                parent.removeEventListener('scroll', this.onScroll, false);
            }
            window.removeEventListener('resize', this.onWindowResize, false);
            window.removeEventListener('load', this.onWindowLoad, false);
        }
    }

    log(...args) {
        const { log } = this.props;
        if (log) {
            console.log(args);
        }
    }

    render() {
        const {
            className,
            style,
            bgClassName,
            contentClassName,
            bgImageAlt,
            renderLayer,
            bgImageStyle,
        } = this.props;
        const { bgImage, bgImageSrcSet, bgImageSizes, percentage, imgStyle, bgStyle } = this.state;
        return (
            <div
                className={`react-parallax ${className}`}
                style={{ position: 'relative', overflow: 'hidden', ...style }}
                ref={node => {
                    this.node = node;
                }}
            >
                {bgImage ? (
                    <img
                        className={bgClassName}
                        src={bgImage}
                        srcSet={bgImageSrcSet}
                        sizes={bgImageSizes}
                        ref={bg => {
                            this.img = bg;
                        }}
                        alt={bgImageAlt}
                        style={{ ...imgStyle, ...bgImageStyle }}
                    />
                ) : null}
                {renderLayer ? renderLayer(Math.min(-(percentage - 1), 1)) : null}
                {this.splitChildren.bgChildren.length > 0 ? (
                    <div
                        className="react-parallax-background-children"
                        ref={bg => {
                            this.bg = bg;
                        }}
                        style={bgStyle}
                    >
                        {this.splitChildren.bgChildren}
                    </div>
                ) : null}
                <ParallaxChildren onMount={this.onContentMount} className={contentClassName}>
                    {this.splitChildren.children}
                </ParallaxChildren>
            </div>
        );
    }
}

Parallax.propTypes = {
    bgClassName: PropTypes.string,
    bgImage: PropTypes.string,
    bgImageAlt: PropTypes.string,
    bgImageSizes: PropTypes.string,
    bgImageSrcSet: PropTypes.string,
    bgImageStyle: PropTypes.shape({}),
    bgStyle: PropTypes.shape({}),
    blur: PropTypes.oneOfType([PropTypes.number, PropTypes.object]),
    className: PropTypes.string,
    contentClassName: PropTypes.string,
    disabled: PropTypes.bool,
    log: PropTypes.bool,
    // eslint-disable-next-line react/forbid-prop-types
    parent: PropTypes.any,
    renderLayer: PropTypes.func,
    strength: PropTypes.number,
    style: PropTypes.shape({}),
};

Parallax.defaultProps = {
    bgClassName: 'react-parallax-bgimage',
    bgImage: undefined,
    bgImageAlt: '',
    bgImageSizes: undefined,
    bgImageSrcSet: undefined,
    bgImageStyle: undefined,
    bgStyle: undefined,
    blur: undefined,
    className: '',
    contentClassName: '',
    disabled: false,
    log: false,
    parent: undefined,
    renderLayer: undefined,
    strength: 100,
    style: undefined,
};

export default Parallax;
