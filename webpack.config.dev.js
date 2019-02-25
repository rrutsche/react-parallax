const path = require('path');
const merge = require('webpack-merge');
const webpack = require('webpack');

const ROOT_PATH = path.resolve(__dirname);

const common = require('./webpack.config.js');

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
    ],
    watchOptions: {
        ignored: ['test/**/*.*', 'dist/**/*.*', 'coverage/**/*.*', 'node_modules/**/*.*'],
    },
    stats: 'minimal',
});
