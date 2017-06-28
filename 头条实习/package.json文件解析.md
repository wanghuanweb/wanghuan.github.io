#### 1.package.json的生成

package.json文件可以手工编写，也可以使用npm init命令自动生成。

$ npm init   ---这个命令采用互动方式，要求用户回答一些问题，然后在当前目录生成一个基本的package.json文件。
$ npm install---有了package.json文件，直接使用npm install命令，就会在当前目录中安装所需要的模块。

#### 2.scripts字段

scripts指定了运行脚本命令的npm命令行缩写
下面的设置指定了npm run preinstall、npm run postinstall、npm run start、npm run test时，所要执行的命令。
```
"scripts": {
    "preinstall": "echo here it comes!",
    "postinstall": "echo there it goes!",
    "start": "node index.js",  -------------比如start指定了运行npm run start时，所要执行的命令。
    "test": "tap test/*.js"
}
```

其他字段
http://javascript.ruanyifeng.com/nodejs/packagejson.html
