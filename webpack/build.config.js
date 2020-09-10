const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');
const { merge } = require('webpack-merge');

const common = require('./base.config.js');

module.exports = merge(common, {
    entry: path.resolve(__dirname, '../src'),
    output: {
        path: path.resolve(__dirname, '../lib/'),
        filename: 'index.js',
        library: 'react-parallax',
        libraryTarget: 'umd',
        umdNamedDefine: true,
        globalObject: `(typeof self !== 'undefined' ? self : this)`,
    },
    optimization: {
        minimize: true,
        minimizer: [
            new TerserPlugin({
                cache: true,
                parallel: true,
                sourceMap: false,
                terserOptions: { keep_fnames: true },
            }),
        ],
    },
    externals: {
        react: 'react',
    },
});
