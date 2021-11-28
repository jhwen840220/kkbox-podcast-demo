const webpack = require('webpack')
const path = require('path')
const { merge } = require('webpack-merge')
const CommonConfig = require('./webpack.common.js')
const { npm_lifecycle_event } = process.env

let Config = merge(CommonConfig, {
    mode: 'development',
    devtool: 'eval-cheap-module-source-map',
    devServer: {
        port: 8080
    }
})

module.exports = Config
