const path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const config = {
    //入口文件
    entry: {
        page_one: './src/app/page-one/index.js',
        page_two: './src/app/page-two/index.js'
    },
    //入口文件输出配置
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['env']
                    }
                }
            },
            {
                test: /\.less$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader', 'less-loader']
                })
            },
        ]
    },
    plugins: [
        new ExtractTextPlugin({
            filename: 'css/[name].css',
            allChunks: true
        })
    ]
};

module.exports = config;