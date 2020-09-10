const path = require('path');
const { merge } = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const common = require('./base.config.js');

module.exports = merge(common, {
    entry: ['react-hot-loader/patch', path.resolve(__dirname, '../src/kitchensink/index.tsx')],
    output: {
        path: path.resolve(__dirname, 'www'),
        filename: 'bundle.js',
    },
    devtool: 'eval-source-map',
    devServer: {
        host: process.env.HOST || 'localhost',
        port: 3000,
        disableHostCheck: true,
        historyApiFallback: true,
        hot: true,
        inline: true,
    },
    stats: 'minimal',
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/kitchensink/index.html',
            inject: 'body',
        }),
    ],
});
