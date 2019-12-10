module.exports = {
    resolve: {
        extensions: ['*', '.js', '.jsx', '.tsx', '.ts'],
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx|tsx|ts)$/,
                exclude: /node_modules/,
                use: ['babel-loader', 'ts-loader'],
            },
            {
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
            },
        ],
    },
};
