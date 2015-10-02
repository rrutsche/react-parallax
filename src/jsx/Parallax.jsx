import React from 'react';

export default class Parallax extends React.Component {

	constructor(props) {
		super(props);

		this.node = null;
		this.windowHeight = this.getWindowHeight();
		this.childStyle = this.getChildStyle();
		this.timestamp = Date.now();
		this.state = {
			top: 0,
			autoHeight: false
		};
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
					<img className="react-parallax-bgimage" src={this.props.bgImage} style={this.getBackgroundPosition()} ref="bgImage" alt=""/>
				) : ''}
				<div className="react-parallax-content" style={this.childStyle} ref="content">
					{this.props.children}
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
		this.node = React.findDOMNode(this);
		this.updatePosition();
		this.setParallaxStyle();
		this.setInitialBackgroundStyles();
	}

	onScroll(event) {
		if (this.isScrolledIntoView(this.node)) {
			window.requestAnimationFrame(this.updatePosition);
		}
	}

	onWindowLoad() {
		this.updatePosition();
	}

	/**
	 * updates scroll position of this component and also its width and height.
	 * defines, if the background image should have autoHeight or autoWidth to
	 * fit the component space optimally
	 */
	updatePosition() {
		let stamp = Date.now();
		if (stamp - this.timestamp < 10) {
			return;
		}
		this.timestamp = stamp;
		let img = React.findDOMNode(this.refs.bgImage);
		let autoHeight = false;
		let content = React.findDOMNode(this.refs.content);
		this.contentHeight = content.getBoundingClientRect().height;
		this.contentWidth = this.node.getBoundingClientRect().width;

		// set autoHeight or autoWidth
		if (img && (img.naturalWidth / (img.naturalHeight - this.props.strength) * this.contentHeight < this.contentWidth)) {
			autoHeight = true;
		}

		// save scroll position
		let rect = this.node.getBoundingClientRect();
		if (rect) {
			this.setState({
				top: this.node.getBoundingClientRect().top,
				autoHeight: autoHeight
			});
		}
	}

	/**
	 * defines all static values for the background image
	 */
	setInitialBackgroundStyles() {
		let img = this.refs.bgImage ? React.findDOMNode(this.refs.bgImage) : null;
		if (img) {
			img.style.position = 'absolute';
			img.style.left = '50%';
			img.style.WebkitTransformStyle = 'preserve-3d';
			img.style.WebkitBackfaceVisibility = 'hidden';
			img.style.MozBackfaceVisibility = 'hidden';
			img.style.MsBackfaceVisibility = 'hidden';
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
	 * returns position for the background image
	 */
	getBackgroundPosition() {
		let backPos = 0;
		if (this.props.disabled !== true) {
			backPos = Math.floor(((this.state.top + this.contentHeight) / this.windowHeight) * this.props.strength);
		}
		let height = this.state.autoHeight ? 'auto' : Math.floor(this.contentHeight + this.props.strength);
		let width = !this.state.autoHeight ? 'auto' : this.contentWidth;
		let style = {
			WebkitTransform: 'translate3d(-50%, -' + backPos + 'px, 0)',
			transform: 'translate3d(-50%, -' + backPos + 'px, 0)',
			height: height,
			width: width
		};
		if (this.props.blur) {
			style.WebkitFilter = 'blur(' + this.props.blur + 'px)';
			style.filter = 'blur(' + this.props.blur + 'px)';
		}
		return style;
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
