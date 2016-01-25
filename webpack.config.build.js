var merge = require('webpack-merge');
var path = require('path');
var webpack = require('webpack');
var pkg = require('./package.json');

var common = require('./webpack.config.js');

var ROOT_PATH = path.resolve(__dirname);

module.exports = merge(common, {
  entry: {
    index: path.resolve(ROOT_PATH, 'src/jsx/index.jsx')
  },
  output: {
    path: path.resolve(ROOT_PATH, 'dist'),
    filename: 'index.js'
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loaders: ['babel?stage=1'],
        include: path.resolve(ROOT_PATH, 'src/jsx')
      },
      {
        test: /\.(js|jsx)$/, 
        loader: 'eslint-loader', 
        exclude: /node_modules/}
    ]
  },
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