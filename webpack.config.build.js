var merge = require('webpack-merge');
var path = require('path');
var webpack = require('webpack');
var pkg = require('./package.json');

var common = require('./webpack.config.js');

var ROOT_PATH = path.resolve(__dirname);

process.env.NODE_ENV = 'production';
console.log(process.env.NODE_ENV);

module.exports = merge(common, {
	entry: {
		'index': path.resolve(ROOT_PATH, 'src/jsx/index.jsx'),
	},
	output: {
		path: path.resolve(ROOT_PATH, 'dist'),
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