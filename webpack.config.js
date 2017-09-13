const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
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
    module: {
        rules: [
            {test: /\.css$/, use: ['style-loader', 'css-loader']},
            {test: /\.(png|svg|jpg|gif)$/, use: ['file-loader']},
            {test: /\.(woff|woff2|eot|ttf|otf)$/, use: ['file-loader']}
        ]
    },
    plugins: [
        new CopyWebpackPlugin([
            {from: './src/index.html', to: '.'}
        ])
    ]
};

module.exports = config;