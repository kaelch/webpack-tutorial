// ./node_modules/.bin/webpack-dev-server --config webpack.dev.js
const { merge } = require('webpack-merge');
const common = require('./webpack.common');

const config = {
    mode : 'development',
    devServer : {
        open : true,
        overlay : true,
        historyApiFallback: {
            rewrites : [
                { from : /^\/subpage$/, to: './subpage.html' },
                { from : /./, to: '404.html'}
            ]
        },
        port : 3333
    }
};

module.exports = merge(common, config);