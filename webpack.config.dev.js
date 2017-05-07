var merge = require('webpack-merge');
var path = require('path');
var webpack = require('webpack');

var common = require('./webpack.config.js');

var ROOT_PATH = path.resolve(__dirname);

module.exports = merge(common, {
	devtool: 'eval',
	devServer: {
		host: '0.0.0.0',
		historyApiFallback: true,
		hot: true,
		inline: true,
		contentBase: 'www'
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin(),
		new webpack.DefinePlugin({
			'process.env': {
				'NODE_ENV': JSON.stringify('development')
			}
		})
	]
});
