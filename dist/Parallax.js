"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var Parallax = (function (_React$Component) {
	_inherits(Parallax, _React$Component);

	function Parallax(props) {
		_classCallCheck(this, Parallax);

		_get(Object.getPrototypeOf(Parallax.prototype), "constructor", this).call(this, props);

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
  * @param {String} bgImage - path to the background image that makes parallax effect visible
  * @param {String} bgColor - css value for a background color (visible only if bgImage is NOT set), eg.: #ddd, yellow, rgb(34,21,125)
  * @param {Number} strength - parallax effect strength (in pixel), default 100
  * @param {Number} blur - pixel value for background image blur, default: 0
  */

	/**
  * bind scope to all functions that will be called via eventlistener
  */

	_createClass(Parallax, [{
		key: "autobind",
		value: function autobind() {
			this.onScroll = this.onScroll.bind(this);
			this.onWindowResize = this.onWindowResize.bind(this);
			this.updatePosition = this.updatePosition.bind(this);
			this.onWindowLoad = this.onWindowLoad.bind(this);
		}
	}, {
		key: "render",
		value: function render() {
			return _react2["default"].createElement(
				"div",
				{ className: "react-parallax" },
				this.props.bgImage ? _react2["default"].createElement("img", { className: "react-parallax-bgimage", src: this.props.bgImage, style: this.getImagePosition(), ref: "bgImage", alt: "" }) : '',
				_react2["default"].createElement(
					"div",
					{ className: "react-parallax-content", style: this.childStyle, ref: "content" },
					this.props.children
				)
			);
		}

		/**
   * bind some eventlisteners for page load, scroll and resize
   */
	}, {
		key: "componentWillMount",
		value: function componentWillMount() {
			document.addEventListener('scroll', this.onScroll, false);
			window.addEventListener("resize", this.onWindowResize, false);
			window.addEventListener("load", this.onWindowLoad, false);
		}

		/**
   * remove all eventlisteners before component is destroyed
   */
	}, {
		key: "componentWillUnmount",
		value: function componentWillUnmount() {
			document.removeEventListener('scroll', this.onScroll, false);
			window.removeEventListener("resize", this.onWindowResize, false);
			window.removeEventListener("load", this.onWindowLoad, false);
		}

		/**
   * save component ref after rendering, update all values and set static style values
   */
	}, {
		key: "componentDidMount",
		value: function componentDidMount() {
			this.node = _react2["default"].findDOMNode(this);
			this.img = this.refs.bgImage ? _react2["default"].findDOMNode(this.refs.bgImage) : null;
			this.updatePosition();
			this.setParallaxStyle();
			this.setInitialBackgroundStyles();
		}
	}, {
		key: "onScroll",
		value: function onScroll(event) {
			var stamp = Date.now();
			if (stamp - this.timestamp >= 10 && this.isScrolledIntoView(this.node)) {
				window.requestAnimationFrame(this.updatePosition);
				this.timestamp = stamp;
			}
		}
	}, {
		key: "onWindowLoad",
		value: function onWindowLoad() {
			this.updatePosition();
		}

		/**
   * updates scroll position of this component and also its width and height.
   * defines, if the background image should have autoHeight or autoWidth to
   * fit the component space optimally
   */
	}, {
		key: "updatePosition",
		value: function updatePosition() {
			var autoHeight = false;
			var content = _react2["default"].findDOMNode(this.refs.content);
			this.contentHeight = content.getBoundingClientRect().height;
			this.contentWidth = this.node.getBoundingClientRect().width;

			// set autoHeight or autoWidth
			if (this.img && this.img.naturalWidth / (this.img.naturalHeight - this.props.strength) * this.contentHeight < this.contentWidth) {
				autoHeight = true;
			}

			// save scroll position
			var rect = this.node.getBoundingClientRect();
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
	}, {
		key: "setInitialBackgroundStyles",
		value: function setInitialBackgroundStyles() {
			if (this.img) {
				this.img.style.position = 'absolute';
				this.img.style.left = '50%';
				this.img.style.WebkitTransformStyle = 'preserve-3d';
				this.img.style.WebkitBackfaceVisibility = 'hidden';
				this.img.style.MozBackfaceVisibility = 'hidden';
				this.img.style.MsBackfaceVisibility = 'hidden';
			}
		}

		/**
   * update window height and positions on window resize
   */
	}, {
		key: "onWindowResize",
		value: function onWindowResize() {
			this.windowHeight = this.getWindowHeight();
			this.updatePosition();
		}

		/**
   * returns position for the background image
   */
	}, {
		key: "getImagePosition",
		value: function getImagePosition() {
			var backPos = 0;
			if (this.props.disabled !== true) {
				backPos = Math.floor((this.state.top + this.contentHeight) / this.windowHeight * this.props.strength);
			}
			var height = this.state.autoHeight ? 'auto' : Math.floor(this.contentHeight + this.props.strength);
			var width = !this.state.autoHeight ? 'auto' : this.contentWidth;
			var style = {
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
	}, {
		key: "setParallaxStyle",
		value: function setParallaxStyle() {
			if (this.node) {
				this.node.style.position = 'relative';
				this.node.style.overflow = 'hidden';
				this.node.style.background = this.props.bgColor;
			}
		}

		/**
   * returns styles for the component content.
   */
	}, {
		key: "getChildStyle",
		value: function getChildStyle() {
			return {
				position: 'relative'
			};
		}
	}, {
		key: "getWindowHeight",
		value: function getWindowHeight() {
			var w = window,
			    d = document,
			    e = d.documentElement,
			    g = d.getElementsByTagName('body')[0];

			return w.innerHeight || e.clientHeight || g.clientHeight;
		}
	}, {
		key: "isScrolledIntoView",
		value: function isScrolledIntoView(element) {
			var elementTop = element.getBoundingClientRect().top,
			    elementBottom = element.getBoundingClientRect().bottom;
			return elementTop <= 0 && elementBottom >= 0 || elementTop >= 0 && elementBottom <= window.innerHeight || elementTop <= window.innerHeight && elementBottom >= window.innerHeight;
		}
	}, {
		key: "log",
		value: function log() {
			if (this.props.log) {
				console.log(arguments);
			}
		}
	}]);

	return Parallax;
})(_react2["default"].Component);

exports["default"] = Parallax;
Parallax.propTypes = {
	bgImage: _react2["default"].PropTypes.string,
	bgColor: _react2["default"].PropTypes.string,
	strength: _react2["default"].PropTypes.number,
	blur: _react2["default"].PropTypes.number
};
Parallax.defaultProps = {
	bgColor: '#fff',
	strength: 100,
	blur: 0,
	log: false,
	disabled: false
};
module.exports = exports["default"];
