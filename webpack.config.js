const path = require('path');

const config = {
    //入口文件
    entry: {
        page_one: './src/app/page_one.js',
        page_two: './src/app/page_two.js',
        page_three: './src/app/page_three.js'
    },
    //入口文件输出配置
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist')
    }
};

module.exports = config;