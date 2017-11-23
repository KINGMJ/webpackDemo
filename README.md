# 【webpack快速上手】3. 多Entry配置多页面应用

> 本系列教程只作为基本的入门使用，不涉及到一些概念及原理。
基于版本：![][1]

前面介绍通过配置 Entry 和 Output 可以指定一个入口 js 来管理项目的依赖，最终打包成 bundle.js 。 这种对于单页面应用是可行的，但对于多页面应用通常不同的页面需要引入不同的 js 。对于这种场景，我们就要配置多入口了。

## js 多入口配置

![image_1bv477m3e5e913701jht1eb410139.png-6.7kB][2]

可以看到，entry 是支持对象的写法的，我们指定 key 和 name 就可以了

**`webpack.config.js`**
```
entry: {
    page_one: './src/app/page_one.js',
    page_two: './src/app/page_two.js',
    page_three: './src/app/page_three.js'
}
```

同样的 Output 也要做出一些改变，我们需要为每个入口打包成一个单独的 js ，所以他们得有一个唯一的名字

**`webpack.config.js`**
```
output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist')
}
```

这里的`[name]`指代的就是 entry 里的 key 的名字，最终打包的 js 如下：

![image_1bv47uag6if61nkj1qbu1av128fm.png-8.2kB][3]

## css 多入口配置

同样的不同页面引入的 css 文件也有可能是不一样的，这里我们用 extract-text-webpack-plugin 指定 filename 就可以了

**`webpack.config.js`**
```
plugins: [
    new ExtractTextPlugin({
        filename: 'css/[name].css',
        allChunks: true
    })
]
```

这里的 filename 不仅可以指定文件名，还可以指定文件夹名。最终在 dist 文件夹里生成一个 css 文件夹，里面有 `page_one.css`和`page_two.css`

  [1]: https://img.shields.io/npm/v/webpack.svg?label=webpack&style=flat-square&maxAge=3600.png
  [2]: http://static.zybuluo.com/Jerry-MEI/9nf6ha103jbjsvgippxqgzfn/image_1bv477m3e5e913701jht1eb410139.png
  [3]: http://static.zybuluo.com/Jerry-MEI/rytrku4ja0h1vy5q9iwcu60t/image_1bv47uag6if61nkj1qbu1av128fm.png