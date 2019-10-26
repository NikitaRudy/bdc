const path = require('path');
const CompressionPlugin = require('compression-webpack-plugin');
// const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

module.exports = {
    entry: ['babel-polyfill', './src/client/index.js'],

    output: {
        filename: 'bundle.js',
        sourceMapFilename: 'bundle.js.map',
        path: path.join(__dirname, './public'),
    },

    plugins: [
        new CompressionPlugin({
            asset: '[path].gz[query]',
            algorithm: 'gzip',
            test: /\.js$|\.css$|\.html$/,
            threshold: 10240,
            minRatio: 0.8,
        }),
        // new BundleAnalyzerPlugin(),
    ],

    devtool: 'source-map',

    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: ['babel-loader'],
            },
            {
                test: /\.(ttf|woff|woff2|eot|svg|png|jpg)$/,
                loader: 'file-loader',
            },
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader',
                exclude: [/public/],
            },
        ],
    },
};
