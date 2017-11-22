const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');   //copy文件到输出目录

const config = {
    //入口文件
    entry: './src/app/index.js',
    //入口文件输出配置
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    //loaders配置
    module: {
        rules: [
            {test: /\.css$/, use: ['style-loader', 'css-loader']},
            {test: /\.(png|svg|jpg|gif)$/, use: ['file-loader']},
            {test: /\.(woff|woff2|eot|ttf|otf)$/, use: ['file-loader']},
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['env']
                    }
                }
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