var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');

var ROOT_PATH = path.resolve(__dirname);
var nodeModulesDir = path.join(ROOT_PATH, 'node_modules');

//Common configuration settings
module.exports = {
	eslint: {
		configFile: '.eslintrc'
	},
	entry: './src/index.jsx',
	resolve: {
		extensions: ['', '.js', '.jsx'],
		modulesDirectories: ['node_modules']
	},
	output: {
		path: path.resolve(ROOT_PATH, 'www'),
		filename: 'bundle.js'
	},
	module: {
		preLoaders: [{
			test: /\.js$/,
			loader: 'eslint-loader',
			exclued: /node_modules/
		}],
		loaders: [{
			test: /\.(js|jsx)$/,
			loader: 'babel-loader',
			include: path.resolve(ROOT_PATH, 'src')
		}, {
			test: /\.json/,
			loader: 'json-loader'
		}, {
			test: /\.png$/,
			loaders: ['url-loader?limit=100000&mimetype=image/png'],
			exclude: /node_modules/
		}, {
			test: /\.scss$/,
			loaders: ['style', 'css', 'sass']
		}, {
			test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
			loader: 'url?limit=100000&mimetype=image/svg+xml'
		}, {
			test: /\.(jpe|jpg|gif|woff|woff2|eot|ttf)(\?.*$|$)/,
			loader: 'file'
		}]
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: './index.html',
			inject: 'body'
		})
	]
};