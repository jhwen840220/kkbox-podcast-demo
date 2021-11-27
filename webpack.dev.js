const webpack = require('webpack')
const path = require('path')
const { merge } = require('webpack-merge')
const CommonConfig = require('./webpack.common.js')
const { npm_lifecycle_event } = process.env
// if (npm_lifecycle_event === 'lint') {
//     CommonConfig.module.rules.push({
//         test: /\.(js|jsx)$/,
//         loader: 'eslint-loader',
//         enforce: 'pre',
//         exclude: [/node_modules/, path.join(__dirname, 'Scripts/lib')],
//         options: {
//             // fix: true,
//         }
//     })
// }

let Config = merge(CommonConfig, {
    mode: 'development',
    devtool: 'eval-cheap-module-source-map',
    devServer: {
        port: 8080
    }
})

module.exports = Config
