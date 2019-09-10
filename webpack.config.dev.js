const path = require('path');
const merge = require('webpack-merge');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const ROOT_PATH = path.resolve(__dirname);

const common = require('./webpack.config.js');

const htmlWebpackPlugin = new HtmlWebpackPlugin({
    template: './src/kitchensink/index.html',
    inject: 'body',
});

module.exports = merge(common, {
    entry: './src/kitchensink/index.js',
    output: {
        path: path.resolve(ROOT_PATH, 'www'),
        filename: 'bundle.js',
    },
    devtool: 'eval',
    devServer: {
        host: '0.0.0.0',
        port: 3000,
        historyApiFallback: true,
        hot: true,
        inline: true,
        contentBase: 'www',
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('development'),
            },
        }),
        htmlWebpackPlugin,
    ],
    watchOptions: {
        ignored: ['test/**/*.*', 'dist/**/*.*', 'coverage/**/*.*', 'node_modules/**/*.*'],
    },
    stats: 'minimal',
});
