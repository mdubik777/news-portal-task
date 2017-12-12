const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const autoprefixer = require('autoprefixer');

module.exports = {
    entry: './js/lazy-loading.js',

    output: {
        path: path.resolve(__dirname, './dist/'),
        filename: '[name].bundle.js',
        publicPath: '/dist/',
        chunkFilename: "[id].js"
    },

    resolve: {
        extensions: ['.js', '.jsx']
    },

    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel-loader?cacheDirectory=true",
                include: [
                    path.resolve(__dirname, "js"),
                ],
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        {   loader: 'css-loader',
                            options: {
                                minimize: true
                            }
                        },
                        {
                            loader: 'postcss-loader',
                            options: {
                                plugins: [
                                    autoprefixer({
                                        browsers:['ie >= 8', 'last 4 version']
                                    })
                                ],
                                sourceMap: true
                            }
                        },
                    ]
                })
            },
            {
                test: /\.less$/,
                use: [{
                    loader: "style-loader"
                }, {
                    loader: "css-loader"
                },

                {
                    loader: 'postcss-loader',
                    options: {
                        plugins: [
                            autoprefixer({
                                browsers:['ie >= 8', 'last 4 version']
                            })
                        ],
                        sourceMap: true
                    }
                },

                {
                    loader: "less-loader"
                }]
            },
            {
                test: /\.(png|jpg|gif)$/,
                use: [
                    {
                        loader: 'url-loader'
                    }
                ]

            },
        ],
    },

    plugins: [
        new ExtractTextPlugin('bundle.css'),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false,
            },
            output: {
                comments: false,
            },
        })
    ]

};