// webpack.config.js
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { VueLoaderPlugin } = require("vue-loader/dist/index");

const isProd = process.env.NODE_ENV === "production";

const commonConfig = {
    entry: {
        Main: path.resolve(__dirname, "./src/index.js"),
    },
    output: {
        path: path.resolve(__dirname, "dist"),
        publicPath: "",
        filename: "[name].js?v=[contenthash]",
        chunkFilename: '[name].js?v=[contenthash]',
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel-loader",
            },
            {
                test: /\.vue$/,
                loader: "vue-loader",
                options: {
                    extractCSS: isProd, // extract css in production
                },
            },
            {
                test: /\.s?css$/,
                use: [
                    isProd ? MiniCssExtractPlugin.loader : "vue-style-loader",
                    {
                        loader: "css-loader",
                        options: {
                            sourceMap: true,
                            modules: {
                                mode: 'local',
                                localIdentName: '[name]_[local]-[hash:base64:5]'
                            }
                        }
                    },
                    {
                        loader: "sass-loader",
                        options: {
                            sourceMap: true,
                            additionalData: "", // if you need any sass mixins can be put here
                        },
                    },
                ],
            },
            {
                test: /\.(png|svg|jpg|gif|ttf|eot|ico|woff)$/,
                exclude: [path.join(__dirname, "src/svg")],
                use: [
                    {
                        loader: "url-loader",
                        options: {
                            limit: 8000,
                            name: "/images/[name]-[hash:8].[ext]",
                            publicPath: isProd ? "./" : "",
                        },
                    },
                    {
                        loader: "image-webpack-loader",
                        options: {
                            disable: !isProd,
                        },
                    },
                ],
            },
            {
                test: /svg\\.*\.svg$/,
                use: [
                    {
                        loader: "svg-sprite-loader",
                        options: {
                            spriteFilename: () =>
                                `svg-sprite.svg${
                                    isProd ? "?v=[contenthash]" : ""
                                }`,
                        },
                    },
                ],
            },
            {
                test: /svg\\.*-svgo\.svg$/,
                use: [
                    {
                        loader: "svgo-loader",
                        options: {
                            configFile: path.join(__dirname, "svgo.config.js"),
                        },
                    },
                ],
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, "./index.html"),
            filename: "index.html",
            favicon: path.resolve(__dirname, './src/images/favicon.ico'),
        }),
        new VueLoaderPlugin(),
        new CleanWebpackPlugin(),
    ],
    optimization: {
        splitChunks: {
            minSize: 30000,
            maxAsyncRequests: 1,
            automaticNameDelimiter: '-',
            cacheGroups: {
                vendor: {
                    name: 'Vendor',
                    test: /(node_modules).*(?<!\.css)$/,
                    chunks: 'all',
                    priority: 4
                }
            }
        },
        minimizer: [],
    },
    resolve: {
        modules: [path.join(__dirname, "node_modules")],
        alias: {
            "~src": path.join(__dirname, "src"),
            "~api": path.join(__dirname, "src/api"),
            "~layouts": path.join(__dirname, "src/layouts"),
            "~components": path.join(__dirname, "src/components"),
            "~containers": path.join(__dirname, "src/containers"),
            "~images": path.join(__dirname, "src/images"),
            "~svg": path.join(__dirname, "src/svg"),
            "~styles": path.join(__dirname, "src/styles"),
            "~utils": path.join(__dirname, "src/utils"),
            "~router": path.join(__dirname, "src/router"),
            "~vue": path.join(__dirname, "src/vue"),
            "~vuex": path.join(__dirname, "src/vuex"),
        },
        extensions: [".vue", ".js", ".scss", ".sass", ".css"],
    },
};

module.exports = commonConfig;
