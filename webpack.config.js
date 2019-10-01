const path = require('path');

const APP_DIR = path.resolve(__dirname, './src');

const TSRules = {
    test: /\.(js|jsx|tsx|ts)$/,
    exclude: /node_modules/,
    loaders: ['babel-loader', 'ts-loader'],
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
        extensions: ['*', '.js', '.jsx', '.tsx', '.ts'],
    },
    entry: ['@babel/polyfill', APP_DIR],
    module: {
        rules: [TSRules, JSRules, ImageRules],
    },
};
