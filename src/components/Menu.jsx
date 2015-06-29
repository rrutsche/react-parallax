import React from 'react';

export default class Menu extends React.Component {

	render() {
		return (
			<div className="menu container-fluid">
				<h4 className="text-center">{this.props.title}</h4>
				{this.getMenu()}
			</div>
		);
	}

	/**
	 * Returns a list of REACTELEMENTs for the menu items
	 * @return {REACTELEMENT} menu items
	 */
	getMenu() {
		let menuItems = [];
		this.props.items.forEach(function(item, index) {
			menuItems.push(<div className="menu-item col-xs-6 text-center" key={'menuItem'+index}>
									<a href={item.link} className="menu-link">
										<img className="img-responsive center-block" src={item.img} alt={item.label}/>
										<h6>{item.label}</h6>
									</a>
							</div>);
		});
		return menuItems;
	}
}

/**
 * @param {String} title - THE menu title
 * @param {Array} items - items must have the following structure to match this component:
 *                      		{
 *                      			label: 'my menu item',
 *                      			img: 'path/to/my/icon.png',
 *                      			link: 'href'
 *                      		}
 */
Menu.propTypes = {
	title: React.PropTypes.string,
	items: React.PropTypes.array.isRequired
};
Menu.defaultProps = {
	title: 'Menu'
};
