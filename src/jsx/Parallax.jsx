import React from 'react';
import ReactDOM from 'react-dom';

import { isScrolledIntoView, getWindowHeight, canUseDOM, getPosition } from '../util/Util';

class Parallax extends React.Component {

	constructor(props) {
		super(props);

		this.canUseDOM = canUseDOM();

		// make dom functionality depend on the installed react version
		this.ReactDOM = ReactDOM.findDOMNode ? ReactDOM : React;

		this.node = null;
		this.splitChildren = this.getSplitChildren(props);

		this.windowHeight = getWindowHeight(this.canUseDOM);
		this.childStyle = this.getChildStyle();
		this.timestamp = Date.now();
		this.autobind();
	}

	componentWillReceiveProps(nextProps) {
		this.splitChildren = this.getSplitChildren(nextProps);
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

	render() {
		return (
			<div className={'react-parallax ' + (this.props.className ? this.props.className : '')}>
				{this.props.bgImage && <img className="react-parallax-bgimage" src={this.props.bgImage} ref="bgImage" alt=""/>}
				{this.splitChildren.bgChildren.length > 0 ? (
					<div className="react-parallax-background-children" ref={(bg) => this.bgMounted(bg)}>
						{this.splitChildren.bgChildren}
					</div>
				) : ''}
				<div className="react-parallax-content" style={this.childStyle} ref="content">
					{this.splitChildren.children}
				</div>
			</div>
		);
	}


	/**
	 * remove all eventlisteners before component is destroyed
	 */
	componentWillUnmount() {
		if (this.canUseDOM) {
			document.removeEventListener('scroll', this.onScroll, false);
			window.removeEventListener("resize", this.onWindowResize, false);
			window.removeEventListener("load", this.onWindowLoad, false);
		}
	}

	/**
	 * bind some eventlisteners for page load, scroll and resize
	 * save component ref after rendering, update all values and set static style values
	 */
	componentDidMount() {
		if (this.canUseDOM) {
			document.addEventListener('scroll', this.onScroll, false);
			window.addEventListener("resize", this.onWindowResize, false);
			window.addEventListener("load", this.onWindowLoad, false);
		}
		// ref to component itself
		this.node = this.ReactDOM.findDOMNode(this);
		// bg image ref
		this.img = this.refs.bgImage ? this.ReactDOM.findDOMNode(this.refs.bgImage) : null;

		this.updatePosition();
		this.setParallaxStyle();
		this.setInitialBackgroundStyles(this.img);
		this.setInitialBackgroundStyles(this.bg);
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
		if (stamp - this.timestamp >= 10 && isScrolledIntoView(this.node, this.canUseDOM)) {
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
		let content = this.ReactDOM.findDOMNode(this.refs.content);
		this.contentHeight = content.getBoundingClientRect().height;
		this.contentWidth = this.node.getBoundingClientRect().width;

		// set autoHeight or autoWidth
		if (this.img && (this.img.naturalWidth / this.img.naturalHeight < this.contentWidth / (this.contentHeight + this.props.strength))) {
			autoHeight = true;
		}

		// update scroll position
		let rect = this.node.getBoundingClientRect();
		// update bg image position if set
		if (rect && this.img) {
			this.setImagePosition(rect.top, autoHeight);
		}
		// update position of Background children if exist
		if (rect && this.bg && this.splitChildren.bgChildren.length > 0) {
			this.setBackgroundPosition(rect.top);
		}
		// getPosition(this.node, this.canUseDOM);
	}

	/**
	 * sets position for the background image
	 */
	setImagePosition(top, autoHeight=false) {
		let height = this.props.bgHeight || (autoHeight ? 'auto' : Math.floor(this.contentHeight + Math.abs(this.props.strength)) + 'px');
		let width = this.props.bgWidth || (!autoHeight ? 'auto' : this.contentWidth + 'px');

		// don't do unneccessary style processing if parallax is disabled
		if (this.props.disabled === true) {
			return;
		}

		// @TODO: change position calculation to avoid position lag on small screens with large parallax content
		// calculate content position relative to window height with centered anchor
		// let yPercentage = 100 * (top + this.contentHeight * 0.5) / (this.windowHeight);

		let backPos = backPos = Math.floor(((top + this.contentHeight - 0.25*this.props.strength) / this.windowHeight) * this.props.strength) * -1;
		this.img.style.WebkitTransform = 'translate3d(-50%, ' + backPos + 'px, 0)';
		this.img.style.transform = 'translate3d(-50%, ' + backPos + 'px, 0)';
		this.img.style.height = height;
		this.img.style.width = width;

		if (this.props.blur) {
			this.img.style.WebkitFilter = 'blur(' + this.props.blur + 'px)';
			this.img.style.filter = 'blur(' + this.props.blur + 'px)';
		}
	}

	setBackgroundPosition(top) {
		let backPos = backPos = Math.floor(((top + this.contentHeight - 0.25*this.props.strength) / this.windowHeight) * this.props.strength) * -1;
		this.bg.style.WebkitTransform = 'translate3d(-50%, ' + backPos + 'px, 0)';
		this.bg.style.transform = 'translate3d(-50%, ' + backPos + 'px, 0)';
	}

	/**
	 * defines all static values for the background image
	 */
	setInitialBackgroundStyles(node) {
		if (node) {
			node.style.position = 'absolute';
			node.style.left = this.props.disabled ? 0 : '50%';
			node.style.WebkitTransformStyle = 'preserve-3d';
			node.style.WebkitBackfaceVisibility = 'hidden';
			node.style.MozBackfaceVisibility = 'hidden';
			node.style.MsBackfaceVisibility = 'hidden';
		}
	}

	/**
	 * update window height and positions on window resize
	 */
	onWindowResize() {
		this.windowHeight = getWindowHeight(this.canUseDOM);
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

	/**
	 * returns styles for the component content.
	 */
	getChildStyle() {
		return {
			position: 'relative'
		};
	}

	log() {
		if (this.props.log) {
			console.log(arguments);
		}
	}
}
/**
 * @param {String} bgImage - path to the background image that makes parallax effect visible
 * @param {String} bgWidth - set bgImage width manually
 * @param {String} bgHeight - set bgImage height manually
 * @param {Number} strength - parallax effect strength (in pixel), default 100
 * @param {Number} blur - pixel value for background image blur, default: 0
 */
Parallax.propTypes = {
	bgImage: React.PropTypes.string,
	bgWidth: React.PropTypes.string,
	bgHeight: React.PropTypes.string,
	strength: React.PropTypes.number,
	blur: React.PropTypes.number
};
Parallax.defaultProps = {
	strength: 100,
	blur: 0,
	log: false,
	disabled: false
};

export default Parallax;
