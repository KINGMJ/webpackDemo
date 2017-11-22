const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const config = {
    //入口文件
    entry: './src/app/index.js',
    //入口文件输出配置
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [
            {
                test: /\.less$/,
                use: [
                    {
                        loader: 'style-loader' // creates style nodes from JS strings
                    },
                    {
                        loader: 'css-loader' // translates CSS into CommonJS
                    },
                    {
                        loader: 'postcss-loader'
                    },
                    {
                        loader: 'less-loader' // compiles Less to CSS
                    }]
            },
            {
                test: /\.scss$/,
                use: [
                    {
                        loader: 'style-loader'
                    },
                    {
                        loader: 'css-loader'
                    },
                    {
                        loader: 'postcss-loader'
                    },
                    {
                        loader: 'sass-loader'
                    }]
            }
        ]
    },

    plugins: [
        new CopyWebpackPlugin([
            {from: './src/index.html', to: '.'}
        ])
    ]
};

module.exports = config;