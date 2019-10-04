const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');
const merge = require('webpack-merge');

const common = require('./base.config.js');

module.exports = merge(common, {
    entry: path.resolve(__dirname, '../src'),
    output: {
        path: path.resolve(__dirname, 'dist/'),
        filename: 'index.js',
        library: 'react-parallax',
        libraryTarget: 'umd',
        umdNamedDefine: true,
    },
    optimization: {
        minimize: true,
        minimizer: [new TerserPlugin({ cache: true, parallel: true })],
    },
    externals: {
        react: 'react',
    },
});
