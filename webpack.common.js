const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpack = require('webpack');
const isProduction = process.env.NODE_ENV === 'PRODUCTION';
console.log(isProduction)
module.exports = {
    entry : './src/index.js',
    output : {
        path : path.resolve(__dirname, 'dist'),
        filename : '[name].[chunkhash].js',
        // publicPath: ""
    },
    module : {
        rules :[
            // {
            //     test : /\.css$/i,
            //     use : [
            //         // {
            //         //     loader: "style-loader",
            //         //     options : {
            //         //         injectType : 'singletonStyleTag'
            //         //     }
            //         // },
            //         {
            //             loader : MiniCssExtractPlugin.loader
            //         },
            //         {
            //             loader : 'css-loader',
            //             options : {
            //                 modules : true
            //             }
            //         }
            //     ]
            // },
            {
                test : /\.s?css$/i,
                oneOf : [
                    {
                        test : /\.module\.s?css$/i,
                        use : [
                            {
                                loader: MiniCssExtractPlugin.loader
                            },
                            {
                                loader : 'css-loader',
                                options : {
                                    modules : true
                                }
                            },
                            'sass-loader'
                        ]
                    },{
                        use : [
                            MiniCssExtractPlugin.loader,
                            'css-loader',
                            'sass-loader'
                        ]
                    }
                ]
            },
            {
                test : /.hbs$/i,
                use : [
                    'handlebars-loader'
                ]
            },
            {
                test : /\.(png|jpe?g|gif)$/i,
                use : [
                    {
                        loader : 'file-loader',
                        options : {
                            name(){
                                if(!isProduction){
                                    return '[path][name].[ext]'
                                }else{
                                    return '[contentHash].[ext]'
                                }
                            },
                            publicPath : 'assets/',
                            outputPath : 'assets/'
                        },
                    }
                ]
            },
            {
                test : /\.svg$/i,
                use : [
                    {
                        loader : 'url-loader',
                        options : {
                            //byte단위크기 제한
                            limit : 8192
                        }
                    }
                ]
            },
            {
                test : /.js/,
                exclude : /node_modules/,
                loader : 'babel-loader',
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename : '[contenthash].css'
        }),
        new HtmlWebpackPlugin({
            title : 'Webpack',
            template: "./template.hbs",
            meta : {
                viewport : 'width=device-width, initial-scale=1.0'
            },
            minify: isProduction ? {
                collapseWhitespace : true,
                useShortDoctype : true,
                removeScriptTypeAttributes : true
            } : false
        }),
        new CleanWebpackPlugin(),
        new webpack.DefinePlugin({
            IS_PRODUCTION : isProduction
        })
    ],
    // target : 'node'
}