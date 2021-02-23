const path = require('path');
//const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CompressionPlugin = require("compression-webpack-plugin");

module.exports = {
    entry: {
        app: "./src/app.tsx",
    },
    plugins: [
        new CleanWebpackPlugin(),// for < v2 versions of CleanWebpackPlugin
        //new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            title: 'Production',
        }),

        //uglify
        new CompressionPlugin(),
    ],
    resolve: {
        extensions: ['.Webpack.js', '.web.js', '.ts', '.js', '.jsx', '.tsx']

    },
    module: {
        rules: [
            {
                test: /\.tsx$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'ts-loader'
                }
            },
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.(gif|png|jpe?g|svg)$/i,
                use: ['file-loader']
            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                    // Creates `style` nodes from JS strings
                    'style-loader',
                    // Translates CSS into CommonJS
                    'css-loader',
                    // Compiles Sass to CSS
                    'sass-loader',
                ],
            },

        ]
    },
    output: {
        filename: './app-bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },
};