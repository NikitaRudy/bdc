const path = require('path');
const webpack = require('webpack');
const CompressionPlugin = require('compression-webpack-plugin');

const nodeEnv = process.env.NODE_ENV || 'development';

const plugins = [
    new webpack.DefinePlugin({
        'process.env': {
            NODE_ENV: JSON.stringify('production'),
        },
    }),
    new webpack.optimize.UglifyJsPlugin({
        compress: {
            warnings: false,
            screw_ie8: true,
            conditionals: true,
            unused: true,
            comparisons: true,
            sequences: true,
            dead_code: true,
            evaluate: true,
            if_return: true,
            join_vars: true,
        },
        output: {
            comments: false,
        },
    }),
    new CompressionPlugin({
        asset: '[path].gz[query]',
        algorithm: 'gzip',
        test: /\.js$|\.css$|\.html$/,
        threshold: 10240,
        minRatio: 0.8,
    }),
];

const base = {
    entry: ['babel-polyfill', './src/client/index.js'],

    output: {
        filename: 'bundle.min.js',
        sourceMapFilename: 'bundle.min.js.map',
        path: path.join(__dirname, './public'),
    },

    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: [
                    'babel-loader',
                ],
            },
            {
                test: /\.(ttf|woff|woff2|eot|svg|png)$/,
                loader: 'file-loader',
            },
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader',
                exclude: [/public/],
            },
        ],
    },
    resolve: {
        alias: {
            react: 'preact-compat',
            'react-dom': 'preact-compat',
        },
    },
};

if (nodeEnv === 'production') {
    base.plugins = plugins;
} else {
    base.devtool = 'source-map';
    base.devServer = {
        contentBase: path.join(__dirname, 'public'),
        hot: true,
        port: 3000,
    };
}

module.exports = base;
