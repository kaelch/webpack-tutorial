const { merge } = require('webpack-merge');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');
const common = require('./webpack.common');

const config = {
    mode : 'production',
    plugins: [
        new OptimizeCssAssetsPlugin({
            assetNameRegExp: /\.css$/g,
            cssProcessor: require('cssnano'),
            cssProcessorPluginOptions: {
                preset: ['default', { discardComments: { removeAll: true } }],
            },
            canPrint: true
        }),
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
};

module.exports = merge(common, config);