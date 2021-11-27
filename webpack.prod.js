const webpack = require('webpack')
const path = require('path')
const { merge } = require('webpack-merge')
const CommonConfig = require('./webpack.common.js')
const TerserPlugin = require('terser-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const SpriteLoaderPlugin = require('svg-sprite-loader/plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const { npm_lifecycle_event } = process.env

if (npm_lifecycle_event === 'build:analyzer') {
    CommonConfig.plugins.push(new BundleAnalyzerPlugin())
}
module.exports = merge(CommonConfig, {
    mode: 'production',
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'css/[name].[contenthash].css',
            chunkFilename: 'css/[name].[contenthash].css'
        }),
        new SpriteLoaderPlugin()
    ],
    optimization: {
        minimizer: [
            new TerserPlugin()
        ]
    }
})
