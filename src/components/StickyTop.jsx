import React from 'react';

/**
 * This component listens to the scroll event and sets its children to fixed top if they scroll out of view.
 */
export default class StickyTop extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			sticky: false
		};

		this.onScroll = this.onScroll.bind(this);
	}

	render() {
		let spaceStyle = this.getSpaceStyle();
		let stickyStyle = this.getStickStyle();
		return (
			<div className="sticky-top">
				<div className="sticky-space" style={spaceStyle}></div>
				<div className={this.state.sticky ? 'sticked' : ''} style={stickyStyle}>{this.props.children}</div>
			</div>
		);
	}

	componentWillMount() {
		document.addEventListener('scroll', this.onScroll, false);
	}

	componentWillUnmount() {
		document.removeEventListener('scroll', this.onScroll, false);
	}

	componentDidMount() {
		this.updateTopInfo();
	}

	componentDidUpdate(prevProps, prevState) {
		this.updateTopInfo();
	}

	getSpaceStyle() {
		return {
			height: (this.state.sticky ? this.stickyHeight : '0') + 'px'
		};
	}

	getStickStyle() {
		let stickyStyle = {
			position: 'fixed',
			zIndex: '100',
			top: this.props.offset,
			left: '0',
			right: '0'
		};
		let nonStickyStyle = {
			position: 'relative',
			zIndex: '100'
		};
		return this.state.sticky ? stickyStyle : nonStickyStyle;
	}


	/**
	 * Saves the height of this component, needed for the sticky-space div when component is sticked
	 */
	updateTopInfo() {
		let sticky = React.findDOMNode(this);
		if (sticky) {
			let rect = sticky.getBoundingClientRect();
			this.stickyHeight = rect.height || 0;
		}
	}

	/**
	 * Checks scroll position and sets state to sticky = true/false
	 * @param  {Event} event - scroll event
	 */
	onScroll(event) {
		let comp = React.findDOMNode(this);
		if (comp) {
			let rect = comp.getBoundingClientRect();
			let sticky = rect.top <= this.props.offset;
			if (this.state.sticky !== sticky) {
				this.setState({
					sticky: sticky
				});
			}
		}
	}
}

StickyTop.propTypes = {
	offset: React.PropTypes.number
};

StickyTop.defaultProps = {
	offset: 0
};
