const path = require('path');
const merge = require('webpack-merge');
const webpack = require('webpack');
const TerserPlugin = require('terser-webpack-plugin');
const common = require('./webpack.config.js');

const ROOT_PATH = path.resolve(__dirname);

process.env.NODE_ENV = 'production';

module.exports = merge(common, {
    entry: {
        index: path.resolve(ROOT_PATH, 'src/modules/index.tsx'),
    },
    output: {
        path: path.resolve(ROOT_PATH, 'dist'),
        filename: '[name].js',
        library: 'react-parallax',
        libraryTarget: 'umd',
        umdNamedDefine: true,
        globalObject: `(typeof self !== 'undefined' ? self : this)`,
    },
    externals: [
        {
            react: {
                root: 'React',
                commonjs2: 'react',
                commonjs: 'react',
                amd: 'react',
            },
            'react-dom': {
                root: 'ReactDOM',
                commonjs2: 'react-dom',
                commonjs: 'react-dom',
                amd: 'react-dom',
            },
        },
    ],
    optimization: {
        minimizer: [
            new TerserPlugin({
                parallel: true,
                sourceMap: true,
            }),
        ],
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('production'),
            },
        }),
    ],
});
