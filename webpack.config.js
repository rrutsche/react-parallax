const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const ROOT_PATH = path.resolve(__dirname);

//Common configuration settings
module.exports = {
    resolve: {
        extensions: ['.js', '.jsx'],
        modules: ['node_modules']
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'eslint-loader',
                enforce: 'pre',
                exclude: /node_modules/
            },
            {
                test: /\.(js|jsx)$/,
                loader: 'babel-loader',
                include: path.resolve(ROOT_PATH, 'src')
            },
            {
                test: /\.json/,
                loader: 'json-loader'
            },
            {
                test: /\.png$/,
                loaders: ['url-loader?limit=100000&mimetype=image/png'],
                exclude: /node_modules/
            },
            {
                test: /\.scss$/,
                loaders: ['style', 'css', 'sass']
            },
            {
                test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'url?limit=100000&mimetype=image/svg+xml'
            },
            {
                test: /\.(jpe|jpg|gif|woff|woff2|eot|ttf)(\?.*$|$)/,
                loader: 'file-loader'
            }
        ]
    },
    plugins: [
        new webpack.LoaderOptionsPlugin({
            options: {
                eslint: {
                    configFile: '.eslintrc'
                }
            }
        }),
        new HtmlWebpackPlugin({
            template: './src/kitchensink/index.html',
            inject: 'body'
        })
    ]
};
