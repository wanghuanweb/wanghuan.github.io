资源管理和前端组件化是目前每个前端工程项目都需要直接面对的两大问题，前者主要解决的是资源管理的问题，后者解决前段代码复用的问题

npm init生成package.json文件

commonjs，amd，cmd模块加载指的是js文件

#### 1.webpack是什么（模块加载器）--资源管理

其实就是模块加载器，在 Webpack 当中, 所有的资源js, css, 图片等都被当作是模块来使用和处理
因此, Webpack 当中 js 可以引用 css, css 中可以嵌入图片 dataUrl

#### 2.webpack的优点

1.资源管理功能强大，兼容AMD,CMD,commonJS等多种标准
2.任何用到的资源都可作为模块被require(js/css/图片/字体/html...)，不止是js文件
3.可以基于配置或者智能分析打包成多个文件，实现公共模块或者按需加载;
4.串联式模块加载器以及插件机制，预编译(sass/less/coffeescript/图片转base64)

#### 3.webpack的工作方式

把你的项目当做一个整体，通过一个给定的主文件（如：index.js），Webpack将从这个文件开始找到你的项目的所有依赖文件，使用loaders处理它们，最后打包为一个浏览器可识别的JavaScript文件。

#### 4.webpack常用命令

webpack – for building once for development
webpack -p – for building once for production (minification)压缩混淆脚本，这个非常非常重要！
webpack --watch – for continuous incremental build监听变动并自动打包
webpack -d – to include source maps 生成map映射文件，告知哪些模块被最终打包到哪里了
webpack --colors – for making things pretty

#### 5.webpack文件配置

https://github.com/ruanyf/webpack-demos#demo01-entry-file-source
http://www.jianshu.com/p/42e11515c10f

主要概念：

entry：入口文件 让webpack用哪个文件作为项目的入口

output：出口 让webpack把处理完成的文件放在哪里

module：
模块的作用：
1.确定什么类型文件应该通过什么类型加载器转换
2.转换文件以至于能添加到依赖图中
Loaders需要单独安装并且需要在webpack.config.js下的modules关键字下进行配置，Loaders的配置选项包括以下几方面：
test：一个匹配loaders所处理的文件的拓展名的正则表达式（必须）
loader：loader的名称（必须）
include/exclude:手动添加必须处理的文件（文件夹）或屏蔽不需要处理的文件（文件夹）（可选）；
query：为loaders提供额外的设置选项（可选）

在使用之前先install
npm install --save-dev css-loader
npm install --save-dev ts-loader

意味着所有css文件使用css-loader打包，ts文件使用ts-loader打包

其实还可以用其他两种方法：
1，inline方法加载--import Styles from 'style-loader!css-loader?modules!./styles.css';

2.cli方法（command line）加载--webpack --module-bind jade-loader --module-bind 'css=style-loader!css-loader'

例子：
```
module.exports = {
  module: {
    rules: [
      { test: /\.css$/, use: 'css-loader' },
      { test: /\.ts$/, use: 'ts-loader' }
    ]
  }
};
```



require之前要通过此加载器进行转换

```
module.exports = {
    entry:{
        boudle1:'.main1/js',
        boudle2:'.main2/js'
    },
    output:{
        filename:'[name].js'
    }
}
// main1.js
document.write('<h1>Hello World</h1>');

// main2.js
document.write('<h2>Hello Webpack</h2>');

//index.html
<html>
  <body>
    <script src="bundle1.js"></script>
    <script src="bundle2.js"></script>
  </body>
</html>
```

在js文件中requirecss文件，需要css-loader
```
//main.js
require('./app.css');
//app.css
body {
  background-color: blue;
}
//index.html
<html>
  <head>
    <script type="text/javascript" src="bundle.js"></script>
  </head>
  <body>
    <h1>Hello World</h1>
  </body>
</html>
//webpack.config.js
module.exports = {
  entry: './main.js',
  output: {
    filename: 'bundle.js'
  },
  module: {
    loaders:[
      { test: /\.css$/, loader: 'style-loader!css-loader' },
    ]
  }
};

//webpack之后index.html
<head>
  <script type="text/javascript" src="bundle.js"></script>
  <style type="text/css">
    body {
      background-color: blue;
    }
  </style>
</head>
```

chunk:被entry所依赖的额外的代码块，同样可以包含一个或者多个文件
