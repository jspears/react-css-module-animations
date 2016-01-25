"use strict";
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var path = require('path'), join = path.join.bind(path, __dirname);
var lifecycle = process.env['npm_lifecycle_event'];
var isPrepublish = lifecycle === 'prepublish';
var isKarma = process.env['NODE_ENV'] === 'test';
var isTestDist = lifecycle === 'test-dist';
var cssxOpts = {};
//var cssmodule = require('postcss-modules');

var config = {
    devtool: (isPrepublish ? '#source-map' : "#inline-source-map"),
    devServer: {
        noInfo: true,
        hot: true,
        inline: true,
        contentBase: join('public'),
        publicPath: '/',
        port: 8082
    },
    resolve: {
        extensions: ['', '.jsx', '.js'],
        alias: {
            'fbjs': join('node_modules/fbjs'),
            'react': join('node_modules/react')
        }
    },
    stats: {
        colors: true,
        reasons: true
    },
    module: {
        loaders: [
           {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                //do this to prevent babel from translating everything.
                loader: 'babel',
                include: [
                    join('src'),
                    join('public'),
                    isKarma ? join('test') : join('no_such_dir')
                ]
            },
            {test: /\.(png|jpe?g|mpe?g[34]?|gif)$/, loader: 'url-loader?limit=100000'},
            {test: /\.woff(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=application/font-woff"},
            {test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=application/octet-stream"},
            {test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: "file"},
            {test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=image/svg+xml"},
            {
                test: /\.json$/,
                loader: 'json'
            },
            {
                test: /\.css$/,
                include: [join('src'), join('public')],
                loader: ExtractTextPlugin.extract('style-loader', join('css-transition-loader')+'!css?modules&importLoaders=1&localIdentName=[hash:base64:5]_[name]__[local]')
            },
            {
                test: /\.less$/,
                include: [join('src'), join('public')],
                loader: ExtractTextPlugin.extract('style-loader', join('css-transition-loader')+'!css?modules&importLoaders=1&localIdentName=[hash:base64:5]_[name]__[local]!less')
             //   loader: ExtractTextPlugin.extract('style-loader', join('what-loader')+'!postcss!less')
            }]

    },
    externals: (isPrepublish ? [{
        'react': true,
    }] : null),
    plugins: [new ExtractTextPlugin('style.css', {allChunks: true})]
};

module.exports = config;