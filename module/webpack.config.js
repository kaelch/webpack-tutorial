const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
// const TerserWebpackPlugin = require('terser-webpack-plugin');

module.exports = {
    entry : './src/index.js',
    output : {
        path : path.resolve(__dirname, 'dist'),
        filename : '[name].[chunkhash].js'
    },
    module : {
        rules :[
            {
                test : /\.css$/i,
                use : [
                    // {
                    //     loader: "style-loader",
                    //     options : {
                    //         injectType : 'singletonStyleTag'
                    //     }
                    // },
                    {
                        loader : MiniCssExtractPlugin.loader
                    },
                    {
                        loader : 'css-loader',
                        options : {
                            modules : true
                        }
                    }
                ]
            },
            {
                test : /.hbs$/i,
                use : [
                    'handlebars-loader'
                ]
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename : '[contenthash].css'
        }),
        new OptimizeCssAssetsPlugin({
            assetNameRegExp: /\.css$/g,
            cssProcessor: require('cssnano'),
            cssProcessorPluginOptions: {
                preset: ['default', { discardComments: { removeAll: true } }],
            },
            canPrint: true
        }),
        new HtmlWebpackPlugin({
            title : 'Webpack',
            template: "./template.hbs",
            meta : {
                viewport : 'width=device-width, initial-scale=1.0'
            },
            // minify: {
            //     collapseWhitespace : true,
            //     useShortDoctype : true
            // }
        }),
        new CleanWebpackPlugin()

    ],
    optimization: {
        runtimeChunk: {
            name : 'runtime'
        },
        splitChunks: {
            cacheGroups: {
                commons : {
                    test : /[\\/]node_modules[\\/]/,
                    name : 'vendors',
                    chunks: "all"
                }
            }
        },
        // minimize: true,
        // minimizer: [new TerserWebpackPlugin({
        //     cache : true
        // })]
    },
    target : 'node'
}