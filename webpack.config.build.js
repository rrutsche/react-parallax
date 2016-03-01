var merge = require('webpack-merge');
var path = require('path');
var webpack = require('webpack');

var common = require('./webpack.config.js');

process.env.NODE_ENV = 'production';

module.exports = merge(common, {
	entry: {
		'index': './src/jsx/index.jsx',
	},
	output: {
		path: './dist',
		filename: '[name].js',
		library: 'react-parallax',
		libraryTarget: 'umd'
	},
	externals: [{
		'react': {
			root: 'React',
			commonjs2: 'react',
			commonjs: 'react',
			amd: 'react'
		}
	}, {
		'react-dom': {
			root: 'ReactDOM',
			commonjs2: 'react-dom',
			commonjs: 'react-dom',
			amd: 'react-dom'
		}
	}],
	plugins: [
		new webpack.DefinePlugin({
			'process.env': {
				'NODE_ENV': JSON.stringify('production')
			}
		}),
		new webpack.optimize.UglifyJsPlugin({
			compress: {
				warnings: false
			}
		}),
		new webpack.optimize.DedupePlugin()
	]
});