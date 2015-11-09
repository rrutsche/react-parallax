import React from 'react';
import ReactDOM from 'react-dom';

export default class Parallax extends React.Component {

	constructor(props) {
		super(props);

		// make dom functionality depend on the installed react version
		this.ReactDOM = ReactDOM.findDOMNode ? ReactDOM : React;

		this.node = null;
		this.splitChildren = this.splitChildren();
		this.windowHeight = this.getWindowHeight();
		this.childStyle = this.getChildStyle();
		this.timestamp = Date.now();
		this.autobind();		
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
			<div className="react-parallax">
				{this.props.bgImage ? (
					<img className="react-parallax-bgimage" src={this.props.bgImage} ref="bgImage" alt=""/>
				) : ''}
				this.splitChildren.bgChildren.length > 0 ? (
					<div ref="background">
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
	 * bind some eventlisteners for page load, scroll and resize
	 */
	componentWillMount() {
		document.addEventListener('scroll', this.onScroll, false);
		window.addEventListener("resize", this.onWindowResize, false);
		window.addEventListener("load", this.onWindowLoad, false);
	}


	/**
	 * remove all eventlisteners before component is destroyed
	 */
	componentWillUnmount() {
		document.removeEventListener('scroll', this.onScroll, false);
		window.removeEventListener("resize", this.onWindowResize, false);
		window.removeEventListener("load", this.onWindowLoad, false);
	}

	/**
	 * save component ref after rendering, update all values and set static style values
	 */
	componentDidMount() {
		// ref to component itself
		this.node = this.ReactDOM.findDOMNode(this);
		// ref to wrapp with Background children
		this.bg = this.ReactDOM.findDOMNode(this.refs.background);
		// bg image ref
		this.img = this.refs.bgImage ? this.ReactDOM.findDOMNode(this.refs.bgImage) : null;

		this.updatePosition();
		this.setParallaxStyle();
		this.setInitialBackgroundStyles(this.img);
		this.setInitialBackgroundStyles(this.bg);
	}

	onScroll(event) {
		let stamp = Date.now();
		if (stamp - this.timestamp >= 10 && this.isScrolledIntoView(this.node)) {
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
	splitChildren() {
		let bgChildren = [];
		let children = React.Children.toArray(this.props.children);
		children.forEach(function(child, index) {
			if (child.type && typeof child.type === 'function' && child.type.name === 'Background') {
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
		if (this.img && (this.img.naturalWidth / this.img.naturalHeight > this.contentWidth / (this.contentHeight + 2*this.props.strength))) {
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

	}

	/**
	 * sets position for the background image
	 */
	setImagePosition(top, autoHeight=false) {
		let height = autoHeight ? 'auto' : Math.floor(this.contentHeight + Math.abs(this.props.strength));
		let width = !autoHeight ? 'auto' : this.contentWidth;
		
		// don't do unneccessary style processing if parallax is disabled
		if (this.props.disabled === true) {
			return;
		}

		let backPos = backPos = Math.floor(((top + this.contentHeight) / this.windowHeight) * this.props.strength) * -1;
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
		let backPos = backPos = Math.floor(((top + this.contentHeight) / this.windowHeight) * this.props.strength) * -1;
		this.bg.style.WebkitTransform = 'translate3d(-50%, ' + backPos + 'px, 0)';
		this.bg.style.transform = 'translate3d(-50%, ' + backPos + 'px, 0)';
	}

	/**
	 * defines all static values for the background image
	 */
	setInitialBackgroundStyles(node) {
		if (node) {
			node.style.position = 'absolute';
			node.style.left = '50%';
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
		this.windowHeight = this.getWindowHeight();
		this.updatePosition();
	}


	/**
	 * defines styles for the parallax node that do not change during use
	 */
	setParallaxStyle() {
		if (this.node) {
			this.node.style.position = 'relative';
			this.node.style.overflow = 'hidden';
			this.node.style.background = this.props.bgColor;
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

	getWindowHeight() {
		let w = window,
			d = document,
			e = d.documentElement,
			g = d.getElementsByTagName('body')[0];
		
		return w.innerHeight || e.clientHeight || g.clientHeight;
	}

	isScrolledIntoView(element) {
		let elementTop = element.getBoundingClientRect().top,
			elementBottom = element.getBoundingClientRect().bottom;
		return elementTop <= 0 && elementBottom >= 0 ||
				elementTop >= 0 && elementBottom <= window.innerHeight ||
				elementTop <= window.innerHeight && elementBottom >= window.innerHeight;
	}

	log() {
		if (this.props.log) {
			console.log(arguments);
		}
	}
}
/**
 * @param {String} bgImage - path to the background image that makes parallax effect visible
 * @param {String} bgColor - css value for a background color (visible only if bgImage is NOT set), eg.: #ddd, yellow, rgb(34,21,125)
 * @param {Number} strength - parallax effect strength (in pixel), default 100
 * @param {Number} blur - pixel value for background image blur, default: 0
 */
Parallax.propTypes = {
	bgImage: React.PropTypes.string,
	bgColor: React.PropTypes.string,
	strength: React.PropTypes.number,
	blur: React.PropTypes.number
};
Parallax.defaultProps = {
	bgColor: '#fff',
	strength: 100,
	blur: 0,
	log: false,
	disabled: false
};
