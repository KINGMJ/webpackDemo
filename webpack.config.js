const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

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
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader', 'postcss-loader', 'less-loader']
                })
            },
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    use: ['css-loader', 'postcss-loader', 'sass-loader']
                })
            }
        ]
    },
    plugins: [
        new CopyWebpackPlugin([
            {from: './src/index.html', to: '.'}
        ]),
        new ExtractTextPlugin("styles.css")
    ]
};

module.exports = config;