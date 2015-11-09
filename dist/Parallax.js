'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x2, _x3, _x4) { var _again = true; _function: while (_again) { var object = _x2, property = _x3, receiver = _x4; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x2 = parent; _x3 = property; _x4 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var Parallax = (function (_React$Component) {
	_inherits(Parallax, _React$Component);

	function Parallax(props) {
		_classCallCheck(this, Parallax);

		_get(Object.getPrototypeOf(Parallax.prototype), 'constructor', this).call(this, props);

		// make dom functionality depend on the installed react version
		this.ReactDOM = _reactDom2['default'].findDOMNode ? _reactDom2['default'] : _react2['default'];

		this.node = null;
		this.splitChildren = this.splitChildren();
		this.windowHeight = this.getWindowHeight();
		this.childStyle = this.getChildStyle();
		this.timestamp = Date.now();
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
		key: 'autobind',
		value: function autobind() {
			this.onScroll = this.onScroll.bind(this);
			this.onWindowResize = this.onWindowResize.bind(this);
			this.updatePosition = this.updatePosition.bind(this);
			this.onWindowLoad = this.onWindowLoad.bind(this);
		}
	}, {
		key: 'render',
		value: function render() {
			return _react2['default'].createElement(
				'div',
				{ className: 'react-parallax' },
				this.props.bgImage ? _react2['default'].createElement('img', { className: 'react-parallax-bgimage', src: this.props.bgImage, ref: 'bgImage', alt: '' }) : '',
				'this.splitChildren.bgChildren.length > 0 ? (',
				_react2['default'].createElement(
					'div',
					{ ref: 'background' },
					this.splitChildren.bgChildren
				),
				') : \'\'}',
				_react2['default'].createElement(
					'div',
					{ className: 'react-parallax-content', style: this.childStyle, ref: 'content' },
					this.splitChildren.children
				)
			);
		}

		/**
   * bind some eventlisteners for page load, scroll and resize
   */
	}, {
		key: 'componentWillMount',
		value: function componentWillMount() {
			document.addEventListener('scroll', this.onScroll, false);
			window.addEventListener("resize", this.onWindowResize, false);
			window.addEventListener("load", this.onWindowLoad, false);
		}

		/**
   * remove all eventlisteners before component is destroyed
   */
	}, {
		key: 'componentWillUnmount',
		value: function componentWillUnmount() {
			document.removeEventListener('scroll', this.onScroll, false);
			window.removeEventListener("resize", this.onWindowResize, false);
			window.removeEventListener("load", this.onWindowLoad, false);
		}

		/**
   * save component ref after rendering, update all values and set static style values
   */
	}, {
		key: 'componentDidMount',
		value: function componentDidMount() {
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
	}, {
		key: 'onScroll',
		value: function onScroll(event) {
			var stamp = Date.now();
			if (stamp - this.timestamp >= 10 && this.isScrolledIntoView(this.node)) {
				window.requestAnimationFrame(this.updatePosition);
				this.timestamp = stamp;
			}
		}
	}, {
		key: 'onWindowLoad',
		value: function onWindowLoad() {
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
	}, {
		key: 'splitChildren',
		value: function splitChildren() {
			var bgChildren = [];
			var children = _react2['default'].Children.toArray(this.props.children);
			children.forEach(function (child, index) {
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
	}, {
		key: 'updatePosition',
		value: function updatePosition() {
			var autoHeight = false;
			var content = this.ReactDOM.findDOMNode(this.refs.content);
			this.contentHeight = content.getBoundingClientRect().height;
			this.contentWidth = this.node.getBoundingClientRect().width;

			// set autoHeight or autoWidth
			if (this.img && this.img.naturalWidth / this.img.naturalHeight > this.contentWidth / (this.contentHeight + 2 * this.props.strength)) {
				autoHeight = true;
			}
			console.log('update autoHeight', autoHeight);

			// update scroll position
			var rect = this.node.getBoundingClientRect();
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
	}, {
		key: 'setImagePosition',
		value: function setImagePosition(top) {
			var autoHeight = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];

			var height = autoHeight ? 'auto' : Math.floor(this.contentHeight + Math.abs(this.props.strength));
			var width = !autoHeight ? 'auto' : this.contentWidth;

			// don't do unneccessary style processing if parallax is disabled
			if (this.props.disabled === true) {
				return;
			}

			var backPos = backPos = Math.floor((top + this.contentHeight) / this.windowHeight * this.props.strength) * -1;
			this.img.style.WebkitTransform = 'translate3d(-50%, ' + backPos + 'px, 0)';
			this.img.style.transform = 'translate3d(-50%, ' + backPos + 'px, 0)';
			this.img.style.height = height;
			this.img.style.width = width;

			if (this.props.blur) {
				this.img.style.WebkitFilter = 'blur(' + this.props.blur + 'px)';
				this.img.style.filter = 'blur(' + this.props.blur + 'px)';
			}
		}
	}, {
		key: 'setBackgroundPosition',
		value: function setBackgroundPosition(top) {
			var backPos = backPos = Math.floor((top + this.contentHeight) / this.windowHeight * this.props.strength) * -1;
			this.bg.style.WebkitTransform = 'translate3d(-50%, ' + backPos + 'px, 0)';
			this.bg.style.transform = 'translate3d(-50%, ' + backPos + 'px, 0)';
		}

		/**
   * defines all static values for the background image
   */
	}, {
		key: 'setInitialBackgroundStyles',
		value: function setInitialBackgroundStyles(node) {
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
	}, {
		key: 'onWindowResize',
		value: function onWindowResize() {
			this.windowHeight = this.getWindowHeight();
			this.updatePosition();
		}

		/**
   * defines styles for the parallax node that do not change during use
   */
	}, {
		key: 'setParallaxStyle',
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
		key: 'getChildStyle',
		value: function getChildStyle() {
			return {
				position: 'relative'
			};
		}
	}, {
		key: 'getWindowHeight',
		value: function getWindowHeight() {
			var w = window,
			    d = document,
			    e = d.documentElement,
			    g = d.getElementsByTagName('body')[0];

			return w.innerHeight || e.clientHeight || g.clientHeight;
		}
	}, {
		key: 'isScrolledIntoView',
		value: function isScrolledIntoView(element) {
			var elementTop = element.getBoundingClientRect().top,
			    elementBottom = element.getBoundingClientRect().bottom;
			return elementTop <= 0 && elementBottom >= 0 || elementTop >= 0 && elementBottom <= window.innerHeight || elementTop <= window.innerHeight && elementBottom >= window.innerHeight;
		}
	}, {
		key: 'log',
		value: function log() {
			if (this.props.log) {
				console.log(arguments);
			}
		}
	}]);

	return Parallax;
})(_react2['default'].Component);

exports['default'] = Parallax;
Parallax.propTypes = {
	bgImage: _react2['default'].PropTypes.string,
	bgColor: _react2['default'].PropTypes.string,
	strength: _react2['default'].PropTypes.number,
	blur: _react2['default'].PropTypes.number
};
Parallax.defaultProps = {
	bgColor: '#fff',
	strength: 100,
	blur: 0,
	log: false,
	disabled: false
};
module.exports = exports['default'];
