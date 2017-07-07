import PropTypes from 'prop-types';
import React from 'react';
import ReactDOM from 'react-dom';

import { isScrolledIntoView, getNodeHeight, canUseDOM, getRelativePosition, setStyleProp } from '../util/Util';

export default class Parallax extends React.Component {

	/**
	 * @param {String} bgImage - path to the background image that makes parallax effect visible
	 * @param {String} bgStyle - additional style object for the bg image/children
	 * @param {String} bgWidth - set bgImage width manually
	 * @param {String} bgHeight - set bgImage height manually
	 * @param {Number} strength - parallax effect strength (in pixel), default 100
	 * @param {Number} blur - pixel value for background image blur, default: 0
	 */
	static propTypes = {
		bgClassName: PropTypes.string,
		bgHeight: PropTypes.string,
		bgImage: PropTypes.string,
		bgImageAlt: PropTypes.string,
		bgStyle: PropTypes.object,
		bgWidth: PropTypes.string,
		blur: PropTypes.oneOfType([PropTypes.number, PropTypes.object]),
		className: PropTypes.string,
		parent: PropTypes.any,
		strength: PropTypes.number,
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
			childStyle: {
				position: 'relative'
			},
		};

		this.canUseDOM = canUseDOM();

		// make dom functionality depend on the installed react version
		this.ReactDOM = ReactDOM.findDOMNode ? ReactDOM : React;

		this.node = null;
		this.content = null;
		this.splitChildren = this.getSplitChildren(props);

		this.bgImageLoaded = false;

		this.parent = props.parent;
		this.parentHeight = getNodeHeight(this.canUseDOM, this.parent);
		this.timestamp = Date.now();
		this.dynamicBlur = !!(props.blur && props.blur.min !== undefined && props.blur.max !== undefined);
		this.autobind();
	}

	/**
	 * bind some eventlisteners for page load, scroll and resize
	 * save component ref after rendering, update all values and set static style values
	 */
	componentDidMount() {
		const { parent } = this.props;

		this.parent = parent || document;
		this.addListeners(this.props);
		// ref to component itself
		this.node = this.ReactDOM.findDOMNode(this);
		// bg image ref
		this.img = this.refs.bgImage ? this.ReactDOM.findDOMNode(this.refs.bgImage) : null;

		if (this.state.bgImage) {
			this.loadImage(this.state.bgImage);
		} else {
			this.updatePosition();
		}
		this.setParallaxStyle();
		this.setInitialBackgroundStyles(this.img);
		this.setInitialBackgroundStyles(this.bg);
	}

	componentWillReceiveProps(nextProps) {
		this.splitChildren = this.getSplitChildren(nextProps);
		if (nextProps.parent && this.parent !== nextProps.parent) {
			this.parent = nextProps.parent;
			this.removeListeners();
			this.addListeners();
		}
		this.parentHeight = getNodeHeight(this.canUseDOM, this.parent);

		if (this.state.bgImage !== nextProps.bgImage) {
			this.loadImage(nextProps.bgImage);
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
	}

	/**
	 * bind scope to all functions that will be called via eventlistener
	 */
	autobind() {
		this.onScroll = this.onScroll.bind(this);
		this.onWindowResize = this.onWindowResize.bind(this);
		this.updatePosition = this.updatePosition.bind(this);
		this.onWindowLoad = this.onWindowLoad.bind(this);
	}

	addListeners() {
		if (this.canUseDOM && this.parent) {
			this.parent.addEventListener('scroll', this.onScroll, false);
			window.addEventListener("resize", this.onWindowResize, false);
			window.addEventListener("load", this.onWindowLoad, false);
		}
	}

	removeListeners() {
		if (this.canUseDOM && this.parent) {
			this.parent.removeEventListener('scroll', this.onScroll, false);
			window.removeEventListener("resize", this.onWindowResize, false);
			window.removeEventListener("load", this.onWindowLoad, false);
		}
	}

	/**
	 * Makes sure that the image was loaded before render
	 * @param  {String} bgImage image source
	 */
	loadImage(bgImage) {
		const image = new Image();
		image.onload = image.onerror = (img) => {
			this.setState({bgImage: bgImage}, () => this.updatePosition());
		}
		image.src = bgImage;
	}

	bgMounted(bg) {
		// ref to wrapp with Background children
		this.bg = this.ReactDOM.findDOMNode(bg);
	}

	onScroll(event) {
		if (!this.canUseDOM) {
			return;
		}
		let stamp = Date.now();
		if (stamp - this.timestamp >= 10 /*&& isScrolledIntoView(this.node, this.canUseDOM)*/) {
			window.requestAnimationFrame(this.updatePosition);
			this.timestamp = stamp;
		}
	}

	onWindowLoad() {
		this.updatePosition();
	}

	/**
	 * Extracts children with type Background from others and returns an object with both arrays:
	 * 	 {
	 * 		bgChildren: bgChildren, // typeof child === 'Background'
	 * 	 	children: children // rest of this.props.children
	 *   }
	 * @return {Object} splitchildren object
	 */
	getSplitChildren(props) {
		let bgChildren = [];
		let children = React.Children.toArray(props.children);
		children.forEach(function(child, index) {
			if (child.type && child.type.prototype && child.type.prototype.isParallaxBackground) {
				bgChildren = bgChildren.concat(children.splice(index, 1));
			}
		});
		return {
			bgChildren: bgChildren,
			children: children
		};
	}

	/**
	 * updates scroll position of this component and also its width and height.
	 * defines, if the background image should have autoHeight or autoWidth to
	 * fit the component space optimally
	 */
	updatePosition() {
		let autoHeight = false;
		this.content = this.ReactDOM.findDOMNode(this.refs.content);
		this.contentHeight = this.content.getBoundingClientRect().height;
		this.contentWidth = this.node.getBoundingClientRect().width;

		// set autoHeight or autoWidth
		if (this.img && (this.img.naturalWidth / this.img.naturalHeight < this.contentWidth / this.getImageHeight() )) {
			autoHeight = true;
		}

		// get relative scroll-y position of parallax component in percentage
		let percentage = getRelativePosition(this.node, this.canUseDOM, this.parent);

		// update bg image position if set
		if (this.img) {
			this.setImagePosition(percentage, autoHeight);
		}
		// update position of Background children if exist
		if (this.bg && this.splitChildren.bgChildren.length > 0) {
			this.setBackgroundPosition(percentage);
		}
	}

	/**
	 * The image height depends on parallax direction. If strength value is negative we have to give it more height
	 * so there is no white space at start/end of container visiblility.
	 */
	getImageHeight() {
		const inverse = this.props.strength < 0;
		return Math.floor(this.contentHeight + ((inverse ? 2.5 : 1) * Math.abs(this.props.strength)));
	}

	/**
	 * sets position for the background image
	 */
	setImagePosition(percentage, autoHeight=false) {

		const { bgHeight, bgWidth, disabled, strength, blur } = this.props;
		const height = bgHeight || (autoHeight ? 'auto' : this.getImageHeight() + 'px');
		const width = bgWidth || (!autoHeight ? 'auto' : this.contentWidth + 'px');
		this.img.style.height = height;
		this.img.style.width = width;

		// don't do unneccessary style processing if parallax is disabled
		if (disabled === true) {
			return;
		}

		const inverse = strength < 0;
		const pos = (inverse ? strength : 0) - (strength * percentage);

		this.img.style.WebkitTransform = 'translate3d(-50%, ' + pos + 'px, 0)';
		this.img.style.transform = 'translate3d(-50%, ' + pos + 'px, 0)';
		if (blur) {
			let blurValue = this.dynamicBlur ? blur.min + ((1 - percentage) * blur.max) : blur;
			this.setBlur(this.img, blurValue);
		}
	}

	setBlur(node, blur) {
		node.style.WebkitFilter = 'blur(' + blur + 'px)';
		node.style.filter = 'blur(' + blur + 'px)';
	}

	setBackgroundPosition(percentage) {
		const { disabled, strength } = this.props;
		// don't do unneccessary style processing if parallax is disabled
		if (disabled === true) {
			return;
		}

		const inverse = strength < 0;
		const pos = (inverse ? strength : 0) - (strength * percentage);

		this.bg.style.WebkitTransform = 'translate3d(-50%, ' + pos + 'px, 0)';
		this.bg.style.transform = 'translate3d(-50%, ' + pos + 'px, 0)';
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
				Object.keys(this.props.bgStyle).forEach((styleKey) => {
					node.style[styleKey] = this.props.bgStyle[styleKey];
				});
			}
		}
	}

	/**
	 * update window height and positions on window resize
	 */
	onWindowResize() {
		this.parentHeight = getNodeHeight(this.canUseDOM, this.parent);
		this.updatePosition();
	}


	/**
	 * defines styles for the parallax node that do not change during use
	 */
	setParallaxStyle() {
		if (this.node) {
			this.node.style.position = 'relative';
			this.node.style.overflow = 'hidden';
		}
	}

	log() {
		if (this.props.log) {
			console.log(...arguments);
		}
	}

	render() {
		return (
			<div className={'react-parallax ' + this.props.className}>
				{this.state.bgImage ? (
					<img className={this.props.bgClassName} src={this.state.bgImage} ref="bgImage" alt={this.props.bgImageAlt}/>
				) : null}
				{this.splitChildren.bgChildren.length > 0 ? (
					<div className="react-parallax-background-children" ref={(bg) => this.bgMounted(bg)}>
						{this.splitChildren.bgChildren}
					</div>
				) : null}
				<div className="react-parallax-content" style={this.state.childStyle} ref="content">
					{this.splitChildren.children}
				</div>
			</div>
		);
	}
}
