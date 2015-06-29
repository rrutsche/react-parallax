import React from 'react';

export default class Parallax extends React.Component {

	constructor(props) {
		super(props);

		this.node = null;
		this.autobind();
	}

	autobind() {
		this.onScroll = this.onScroll.bind(this);
	}

	render() {
		return (
			<div className="react-parallax">hello parallax</div>
		);
	}

	componentWillMount() {
		document.addEventListener('scroll', this.onScroll, false);
	}

	componentDidMount() {
		this.node = React.findDOMNode(this);
	}

	componentWillUnmount() {
		document.removeEventListener('scroll', this.onScroll, false);
	}

	onScroll(event) {
		let rect = this.node.getBoundingClientRect();
	}
}
Parallax.propTypes = {
	backgroundImage: React.PropTypes.string,
	backgroundColor: React.PropTypes.string
};
Parallax.defaultProps = {
	backgroundColor: '#fff'
};
