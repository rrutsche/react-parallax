import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class KitchenSink extends Component {
    static propTypes = {
        children: PropTypes.node
    };
    render() {
        return <div>{this.props.children}</div>;
    }
}
