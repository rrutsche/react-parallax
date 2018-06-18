import PropTypes from 'prop-types';
import React from 'react';
import ReactDOM from 'react-dom';

import {
    getNodeHeight,
    canUseDOM,
    getRelativePosition,
    getSplitChildren,
    setBlur,
    isScrolledIntoView,
} from '../util/util';

export default class Parallax extends React.Component {
    static propTypes = {
        bgClassName: PropTypes.string,
        bgHeight: PropTypes.string,
        bgImage: PropTypes.string,
        bgImageAlt: PropTypes.string,
        bgImageSizes: PropTypes.string,
        bgImageSrcSet: PropTypes.string,
        bgStyle: PropTypes.object,
        bgWidth: PropTypes.string,
        blur: PropTypes.oneOfType([PropTypes.number, PropTypes.object]),
        className: PropTypes.string,
        disabled: PropTypes.bool,
        log: PropTypes.bool,
        parent: PropTypes.any,
        strength: PropTypes.number,
        style: PropTypes.object,
    };

    static defaultProps = {
        bgClassName: 'react-parallax-bgimage',
        bgImageAlt: '',
        className: '',
        disabled: false,
        log: false,
        strength: 100,
    };

    constructor(props) {
        super(props);

        this.state = {
            bgImage: props.bgImage,
            bgImageSrcSet: props.bgImageSrcSet,
            bgImageSizes: props.bgImageSizes,
            childStyle: {
                position: 'relative',
            },
        };

        this.canUseDOM = canUseDOM();

        // make dom functionality depend on the installed react version
        this.ReactDOM = ReactDOM.findDOMNode ? ReactDOM : React;

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
        this.addListeners(this.props);
        // ref to component itself
        this.node = this.ReactDOM.findDOMNode(this);

        if (bgImage) {
            this.loadImage(bgImage, bgImageSrcSet, bgImageSizes);
        } else {
            this.updatePosition();
        }
        this.setParallaxStyle();
        this.setInitialBackgroundStyles(this.img);
        this.setInitialBackgroundStyles(this.bg);
    }

    componentWillReceiveProps(nextProps) {
        const { parent, bgImage, bgImageSrcSet, bgImageSizes } = nextProps;
        this.splitChildren = getSplitChildren(nextProps);
        if (parent && this.parent !== parent) {
            this.parent = parent;
            this.removeListeners();
            this.addListeners();
        }
        this.parentHeight = getNodeHeight(this.canUseDOM, this.parent);

        if (this.state.bgImage !== bgImage) {
            this.loadImage(bgImage, bgImageSrcSet, bgImageSizes);
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (nextProps.bgImage !== this.props.bgImage && nextState.bgImage === this.state.bgImage) {
            return false;
        }
        return true;
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

    onScroll = event => {
        if (!this.canUseDOM) {
            return;
        }
        const stamp = Date.now();
        if (stamp - this.timestamp >= 10 && isScrolledIntoView(this.node, 100, this.canUseDOM)) {
            window.requestAnimationFrame(this.updatePosition);
            this.timestamp = stamp;
        }
    };

    /**
     * defines styles for the parallax node that do not change during use
     */
    setParallaxStyle() {
        if (this.node) {
            this.node.style.position = 'relative';
            this.node.style.overflow = 'hidden';
        }
    }

    /**
     * defines all static values for the background image
     */
    setInitialBackgroundStyles(node) {
        if (node) {
            node.style.position = 'absolute';
            node.style.left = '50%';
            node.style.WebkitTransform = 'translate3d(-50%, 0, 0)';
            node.style.transform = 'translate3d(-50%, 0, 0)';
            node.style.WebkitTransformStyle = 'preserve-3d';
            node.style.WebkitBackfaceVisibility = 'hidden';
            node.style.MozBackfaceVisibility = 'hidden';
            node.style.MsBackfaceVisibility = 'hidden';

            if (this.props.bgStyle) {
                Object.keys(this.props.bgStyle).forEach(styleKey => {
                    node.style[styleKey] = this.props.bgStyle[styleKey];
                });
            }
        }
    }

    setBackgroundPosition(percentage) {
        const { disabled, strength } = this.props;
        // don't do unneccessary style processing if parallax is disabled
        if (disabled === true) {
            return;
        }

        const inverse = strength < 0;
        const pos = (inverse ? strength : 0) - strength * percentage;

        this.bg.style.WebkitTransform = `translate3d(-50%, ${pos}px, 0)`;
        this.bg.style.transform = `translate3d(-50%, ${pos}px, 0)`;
    }

    /**
     * sets position for the background image
     */
    setImagePosition(percentage, autoHeight = false) {
        const { bgHeight, bgWidth, disabled, strength, blur } = this.props;
        const height = bgHeight || (autoHeight ? 'auto' : `${this.getImageHeight()}px`);
        const width = bgWidth || (!autoHeight ? 'auto' : `${this.contentWidth}px`);
        this.img.style.height = height;
        this.img.style.width = width;

        // don't do unneccessary style processing if parallax is disabled
        if (disabled === true) {
            return;
        }

        const inverse = strength < 0;
        const pos = (inverse ? strength : 0) - strength * percentage;

        this.img.style.WebkitTransform = `translate3d(-50%, ${pos}px, 0)`;
        this.img.style.transform = `translate3d(-50%, ${pos}px, 0)`;
        if (blur) {
            const blurValue = this.dynamicBlur ? blur.min + (1 - percentage) * blur.max : blur;
            setBlur(this.img, blurValue);
        }
    }

    /**
     * The image height depends on parallax direction. If strength value is negative we have to give it more height
     * so there is no white space at start/end of container visiblility.
     */
    getImageHeight() {
        const inverse = this.props.strength < 0;
        const factor = inverse ? 2.5 : 1;
        const strength = factor * Math.abs(this.props.strength);
        return Math.floor(this.contentHeight + strength);
    }

    addListeners() {
        if (this.canUseDOM && this.parent) {
            this.parent.addEventListener('scroll', this.onScroll, false);
            window.addEventListener('resize', this.onWindowResize, false);
            window.addEventListener('load', this.onWindowLoad, false);
        }
    }

    removeListeners() {
        if (this.canUseDOM && this.parent) {
            this.parent.removeEventListener('scroll', this.onScroll, false);
            window.removeEventListener('resize', this.onWindowResize, false);
            window.removeEventListener('load', this.onWindowLoad, false);
        }
    }

    /**
     * Makes sure that the image was loaded before render
     * @param  {String} bgImage image source
     * @param  {String} bgImageSrcSet image srcset attribute
     * @param  {String} bgImageSizes image size attribute
     */
    loadImage(bgImage, bgImageSrcSet, bgImageSizes) {
        this.releaseImage();
        this.bgImageRef = new Image();
        this.bgImageRef.onload = img => {
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

    bgMounted(bg) {
        // ref to wrapp with Background children
        this.bg = this.ReactDOM.findDOMNode(bg);
    }

    /**
     * updates scroll position of this component and also its width and height.
     * defines, if the background image should have autoHeight or autoWidth to
     * fit the component space optimally
     */
    updatePosition = () => {
        let autoHeight = false;
        this.content = this.ReactDOM.findDOMNode(this.refs.content);
        this.contentHeight = this.content.getBoundingClientRect().height;
        this.contentWidth = this.node.getBoundingClientRect().width;

        if (!this.content) {
            return;
        }

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

    log(...args) {
        if (this.props.log) {
            console.log(args);
        }
    }

    render() {
        const { className, style, bgClassName, bgImageAlt } = this.props;
        const { bgImage, bgImageSrcSet, bgImageSizes, childStyle } = this.state;
        return (
            <div className={`react-parallax ${className}`} style={style}>
                {bgImage ? (
                    <img
                        className={bgClassName}
                        src={bgImage}
                        srcSet={bgImageSrcSet}
                        sizes={bgImageSizes}
                        ref={bg => (this.img = bg)}
                        alt={bgImageAlt}
                    />
                ) : null}
                {this.splitChildren.bgChildren.length > 0 ? (
                    <div
                        className="react-parallax-background-children"
                        ref={bg => this.bgMounted(bg)}
                    >
                        {this.splitChildren.bgChildren}
                    </div>
                ) : null}
                <div className="react-parallax-content" style={childStyle} ref="content">
                    {this.splitChildren.children}
                </div>
            </div>
        );
    }
}
