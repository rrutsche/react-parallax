const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const APP_DIR = path.resolve(__dirname, './src');

const htmlWebpackPlugin = new HtmlWebpackPlugin({
    template: './src/kitchensink/index.html',
    inject: 'body',
});

const TSRules = {
    test: /\.ts(x?)$/,
    exclude: /node_modules/,
    use: {
        loader: 'ts-loader',
    },
};

const JSRules = {
    enforce: 'pre',
    test: /\.js$/,
    loader: 'source-map-loader',
};

const ImageRules = {
    test: /\.(jpe?g|png)(\?[a-z0-9=&.]+)?$/,
    exclude: /inline/,
    use: [
        {
            loader: 'file-loader',
            options: {
                name: 'img/[name]_[hash].[ext]',
            },
        },
    ],
};

module.exports = {
    resolve: {
        extensions: ['.ts', '.tsx'],
    },
    entry: ['@babel/polyfill', APP_DIR],
    module: {
        rules: [TSRules, JSRules, ImageRules],
    },
    plugins: [htmlWebpackPlugin],
};
