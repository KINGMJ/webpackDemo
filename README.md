# 【webpack快速上手】2. 使用less、sass进行css预处理

> 本系列教程只作为基本的入门使用，不涉及到一些概念及原理。
基于版本：![][1]

在前端工程项目里，怎样编写和维护高质量的 css 文件是必须的，所以自然少不了 less 或 sass 这类 css 扩展语言，所以这篇文章主要介绍一下怎样通过 webpack 来配置 less 或 sass

## less

webpack 中使用 less 须用到 [less-loader][2] ， 它的配置十分简单

### 安装

```
npm install --save-dev less-loader less
```

### 配置

**`webpack.config.js`**
```
module: {
    rules: [
        {
            test: /\.less$/,
            use: [{
                loader: "style-loader" // creates style nodes from JS strings
            }, {
                loader: "css-loader" // translates CSS into CommonJS
            }, {
                loader: "less-loader" // compiles Less to CSS
            }]
        }
    ]
}
```
loader 必须按照 `style-loader`、`css-loader`、`less-loader`这样的顺序。别忘了安装 style-loader 和 css-loader

## sass

webpack 中使用 sass 须用到 [sass-loader][3] ， 它的配置跟 less 是一样的，只是文件名和 使用的 loader 不一样

### 安装

```
npm install sass-loader node-sass --save-dev
```

### 配置

**`webpack.config.js`**
```
module: {
    rules: [
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
                    loader: 'sass-loader'
                }]
        }
    ]
}
```

## 配置 autoprefixer

[autoprefixer][4] 自动添加浏览器前缀，对开发这来说是一款不可或缺的工具。在 webpack2 之后像这种 css 后处理都是由 [postcss][5] 来处理的。 postcss 有点像一个插件平台，autoprefixer 只是其中的一个插件。

我们在 webpack 中须借助 [postcss-loader][6] 来使用，它的配置有两种方式：你可以直接在 webpack 中配置它的 options 参数；或者新建一个 postcss.config.js 文件

首先我们需要安装它：`npm i -D postcss-loader`

### 在 webpack 中使用 options 参数

**`webpack.config.js`**
```
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
                    loader: 'postcss-loader',
                    options: {
                        ident: 'postcss',
                        plugins: (loader) => [
                            require('autoprefixer')({browsers: 'last 2 versions'})
                        ]
                    }
                },
                {
                    loader: 'less-loader' // compiles Less to CSS
                }]
        }
    ]
}
```
**注意：**

- postcss-loader 的位置必须在 style-loader 和 css-loader 的后面，在 less 、sass  这些预处理器 loaders 的前面
- 当使用`{Function}/require`时，options 里面必须加上一个标识符 ident 

### 新增一个 postcss.config.js 配置文件

**`webpack.config.js`**
```
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
        }
    ]
}
```
**`postcss.config.js`**
```
module.exports = {
    plugins: {
        'autoprefixer': {browsers: 'last 2 versions'}
    }
};
```

sass 配置 postcss 也是一样的，这里就不做介绍了，demo 里两种都实现了，可以自己去参考一下

## 使用 extract-text-webpack-plugin 将 css 打包成独立文件

之前讲过 css 样式都会通过入口 js 写到页面的 `<style></style>`标签里，我们需用到 [extract-text-webpack-plugin][7] 将它从 js 中抽离成真实的 css 文件

### 安装

```
npm install --save-dev extract-text-webpack-plugin
```

### 配置

**`webpack.config.js`**
```
const ExtractTextPlugin = require("extract-text-webpack-plugin");
...
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
}
...
plugins: [
    new ExtractTextPlugin("styles.css")
]
```
最终会在 dist 文件夹生成一个 styles.css 文件，我们可以在 index.html 中直接去引用这个文件就可以了

  [1]: https://img.shields.io/npm/v/webpack.svg?label=webpack&style=flat-square&maxAge=3600.png
  [2]: https://github.com/webpack-contrib/less-loader
  [3]: https://github.com/webpack-contrib/sass-loader
  [4]: https://github.com/postcss/autoprefixer
  [5]: https://github.com/postcss/postcss
  [6]: https://github.com/postcss/postcss-loader
  [7]: https://github.com/webpack-contrib/extract-text-webpack-plugin