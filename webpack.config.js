const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');   //copy文件到输出目录
const HtmlWebpackPlugin = require('html-webpack-plugin');   //自动生成HTML文件
const CleanWebpackPlugin = require('clean-webpack-plugin'); //清空文件

const config = {
    //入口文件
    entry: {
        app: './src/app/index.js',
        print: './src/app/print.js'
    },
    //入口文件输出配置
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    //loaders配置
    module: {
        rules: [
            {test: /\.css$/, use: ['style-loader', 'css-loader']},
            {test: /\.(png|svg|jpg|gif)$/, use: ['file-loader']},
            {test: /\.(woff|woff2|eot|ttf|otf)$/, use: ['file-loader']},
            {test: /\.(csv|tsv)$/, use: ['csv-loader']},
            {test: /\.xml$/, use: ['xml-loader']},
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {loader: 'babel-loader', options: {presets: ['env']}}
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(['dist']),
        new HtmlWebpackPlugin({
            template: __dirname + '/src/index.html',
            inject: 'body',
            hash: true,
            minify: {
                "removeAttributeQuotes": true,
                "removeComments": true,
                "removeEmptyAttributes": true
            }
        })
    ]
};

module.exports = config;