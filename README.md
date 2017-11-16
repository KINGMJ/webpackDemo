# 【webpack快速上手】1.配置一个最基本的webpack项目

> 本系列教程只作为基本的入门使用，不涉及到一些概念及原理。
基于版本：![][1]

## Concepts（概念）

webpack的四个核心概念为`Entry`、`Output`、`Loaders`和`Plugins`。下面通过使用它们来构建一个基本的应用  

![image.png-4kB][2]

## Getting Started

### 初始化项目

好了，让我们开始用 webpack 来构建一个项目吧，首先创建一个目录，初始化npm ， 安装 webpack
```
mkdir webpackDemo && cd webpackDemo
npm init -y
npm install --save-dev webpack
```

然后我们构建好项目的目录，类似像下面这样： 

![image.png-26.6kB][3]

webpack.config.js 为 webpack 的配置文件

### NPM Scripts

我们先配置好打包的脚本吧，之后的各种操作只需要运行该脚本就可以了：`npm run build` 

**`package.json`**
```
"scripts": {
    "build": "webpack -p --colors"
},
```

### Entry和Output配置

webpack 为模块打包工具，所以得指定一个入口来处理各种模块之间的依赖。
像单页面应用一般有一个`index.js`作为应用的入口。

既然有入口，同样的也有出口。Output 主要配置最终打包的资源的路径，及命名

**`webpack.config.js`**
```
const path = require('path');
const config = {
    //入口文件
    entry: './src/app/index.js',
    //入口文件输出配置
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    }
};
module.exports = config;
```
执行后可以发现项目根目录下生成一个 dist 文件夹，里面有个 bundle.js 文件

### Loaders配置

Loaders（加载器）是 webpack 的一个核心功能，它能把所有的资源都当成 js 来进行处理，你可以在 js 里面 import 样式、html、图片等等。

官网提供了很多 [loaders][4] ， 你可以根据自己的项目选择合适的 ，也可以在社区里找到一些比较常用的，甚至可以自己造一个

我们根据这个项目的情况来选择需要哪些 loaders 

首先，现在的项目都推荐 ES6 来编码，所以我们得有一个 [babel-loader][5] 来将 ES6 代码转换为浏览器可识别的 JS 代码。然后，处理一些图片、字体等资源，我们需用到 [file-loader][6] ；处理css需用到 [css-loader][7] 和 [style-loader][8]

loaders 需要独立安装，我们先安装好这些loaders
```
npm install --save-dev file-loader css-loader style-loader babel-loader babel-core babel-preset-env
```
**`webpack.config.js`**
```
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
}
```

### Plugin配置

webpack的插件系统非常强大，可以通过各种插件来实现特定的任务，这也是它可以取代 gulp 的原因

这里，我们先介绍一个简单的插件 [copy-webpack-plugin][9] ，这是复制文件的插件

- 安装插件，`npm install --save-dev copy-webpack-plugin`
- 通过 require() 引入：`const CopyWebpackPlugin = require('copy-webpack-plugin');`
- 使用插件，可以参考插件的文档说明，这里只做一个最简单的处理：将 src 里面的 index.html 复制到根目录下
 ```
plugins: [
   new CopyWebpackPlugin([
        {from: './src/index.html', to: '.'}
    ])
]

 ```
 
## 开始编码

一个最基本的 webpack 项目已经配置好了，现在我们编码来享受它带给我们的好处

**`index.html`**
```
<div id="container">
	<p class="hello">
		<i class="icon ion-share"></i>
		Hello World!
	</p>
</div>
<script src="bundle.js"></script>
```

因为index.html最终会被 copy-webpack-plugin 插件复制到 dist 文件夹中，所以这里直接引入打包后的 bundle.js

**`index.js`**
```
import './assets/css/main.css';
import './assets/css/ionicons-font.css';
import Test from './test';

window.onload = function () {
    Test.init();
};
```

这是入口 js ， 通过 import 其他的资源，来管理项目的依赖

**`test.js`**
```
import User from './user.json';
import Coffee from './assets/images/coffee.jpg';

const element = document.getElementById('container');

export default {
    init() {
        showImage();
        readJson();
    }
}

function showImage() {
    const myImage = new Image();
    myImage.src = Coffee;
    element.appendChild(myImage);
}

function readJson() {
    for (let user of User) {
        console.log(`姓名：${user.name}，年龄：${user.age}`);
    }
}
```

这个js实现了两个方法，显示图片和读取json文件的内容。可以看到，这里将json文件和图片都当成js来进行处理，这都是 loaders 的功劳

**`user.json`**
```
[
  {
    "name": "bill",
    "age": 18
  },
  {
    "name": "may",
    "age": 21
  }
]
```

**`main.css`**
```
.hello {
    color: red;
}
```

运行脚本之后，可以看到 index.js 里面引入的资源都被打包到 dist 文件夹中 ， js 最终生成为 Output 里面配置的 bundle.js  

![image.png-19.5kB][10]

访问 index.html 可以看到最终的效果，样式、图片、字体都正常加载，控制台正常打印语句  

![image.png-354.5kB][11]  
![image.png-4.4kB][12]  

有一个问题不知道大家发现没，最终生成的文件里是没有 css 文件的，那么样式是怎么出来的呢

去查网页源代码，发现是在 `<style></style>` 标签里的  

![image.png-45.6kB][13]  

那么问题来了，生产环境我们是希望 css 作为一个独立的文件来进行管理，不然 bundle.js 会非常臃肿，那么我们需要将它抽离成真实的 css 文件。

这个就留着下次再介绍吧！到这里，一个最基本的 webpack 项目就结束了

  [1]: https://img.shields.io/npm/v/webpack.svg?label=webpack&style=flat-square&maxAge=3600.png
  [2]: http://static.zybuluo.com/Jerry-MEI/34jztj9h3o74v0wrsubsjxlx/image.png
  [3]: http://static.zybuluo.com/Jerry-MEI/7e1dfvrsu9lvamrkuv0qpvec/image.png
  [4]: https://webpack.js.org/loaders/
  [5]: https://github.com/babel/babel-loader
  [6]: https://github.com/webpack-contrib/file-loader
  [7]: https://github.com/webpack-contrib/css-loader
  [8]: https://github.com/webpack-contrib/style-loader
  [9]: https://github.com/webpack-contrib/copy-webpack-plugin
  [10]: http://static.zybuluo.com/Jerry-MEI/l72ngh333uu8p7hlif8kymc8/image.png
  [11]: http://static.zybuluo.com/Jerry-MEI/94inu7lm3chd8dxj319goej8/image.png
  [12]: http://static.zybuluo.com/Jerry-MEI/mbbpce6nkc9mq09dr6oy0v5e/image.png
  [13]: http://static.zybuluo.com/Jerry-MEI/ai9ja97wa04qtar25g7ac911/image.png