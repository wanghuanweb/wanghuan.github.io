##### 1.JavaScript介绍
1. 是一种跨平台、面向对象的轻量级的脚本语言，可用于web和HTML，可以运用于服务器、PC端、移动端。

2. 完整的 JavaScript 实现是由以下 3 个不同部分组成的：ECMAScript（是核心）、文档对象模型、浏览器对象模型

 ECMAScript 描述了该语言的语法和基本对象；(包含语法，类型，语句，关键字，保留字，操作符，对象)

 DOM 描述了处理网页内容的方法和接口，把整个页面映射为一个多层节点结构

 BOM 描述了与浏览器进行交互的方法和接口。

##### 2.script标签位置和属性

1. script标签放在head标签中，意味着js文件被下载执行完成后，且按照先后顺序依次解析，才显示页面的内容。

2. 放在body结束标签前，脚本在页面解析完才执行--最佳选择，因为defer可能不被支持

3. 在head中但是使用defer和asycn属性，这两个属性只适用于外部脚本文件。

    **延迟脚本defer** 属性是告诉浏览器立即下载，但是延迟执行，在文档完全显示之后在执行

    **异步脚本async** 属性也是立即下载，但不保证他们的先后顺序执行，故一定要确保js文件不相互依赖。

##### 3.介绍JavaScript的数据类型。

  5种基本数据类型: Undefined Null Boolean Number String--基本类型占用固定大小的空间，保存在栈内存中

 引用类型: Object

**Number**

 ###### 1.number类型的数值范围

Number.MIN_VALUE--Number.MAX_VALUE,超出这个范围的被转化-Infinity和Infinity

同时可以使用isFinite()函数来判断此数是否有穷

 ######  2.NaN(非数值)--一个特殊的数值

  1.任何涉及到非数值的操作返回都是NaN

  2.NaN和任何值都不相等，包含本身(NaN == NaN)是false

  3.isNaN()函数是确定参数是否"不是数值"，接收值后，先 **尝试把这个值转换成数值** ，然后在进行判断。

  ```
  alert(isNaN("10"));//false--被转换了
  alert(isNaN(10));//false
  alert(isNaN(NaN));//true
  alert(isNaN("blue"));//true--不能转换成数值
  alert(isNaN(true));//false--被转换成数值1
  ```
######  3.数值转换

Number()--转换规则比较复杂且不够合理，一般都用parseInt()

    Number(" ");//0

parseInt()--此函数在转换字符串时,更多的是看是否符合数值模式

它忽略了字符串前边的空格，直到找到第一个非空格字符，若第一个字符不是数字字符或者负号，则返回NaN

    parseInt("1234blue");//1234
    parseInt(" ");//NaN
    parseInt("w");//NaN
    parseInt("0xA");//10
    parseInt("22.5");//22

此函数还有第二个参数，转换时使用的基数

    parseInt("10",2);//2
    parseInt("10",8);//8
    parseInt("10",10);//10
    parseInt("10",16);//16

parseFloat()--字符串第一个小数点有效，和parseInt()区别是会忽略前导0

    parseFloat("1234blue");//1234
    parseFloat("0xA");//0(此处就是区别)
    parseFloat("1234.23.4");//1234.23

**String**

数值、布尔值、对象和字符串值都可以使用toString()方法，但是null和undefined没有toString()方法

在不知道转换的是是不是null和undefined的时候，使用转型函数String(),规则

 1. 若值有toString()方法，则调用此方法并返回相应的结果
 2. 若值是null，则返回"null"
 3. 若值是undefined,则返回"undefined"

##### 4.JavaScript的类型转换

 http://www.cnblogs.com/mizzle/archive/2011/08/12/2135885.html

**注意：**

 关系操作符（<, >, <=, >=）中第二条(如果两个操作值都是字符串，则比较字符串对应的字符编码值),大写字母的字符编码全部小于小写字母的字符编码值

```
    var result = "Brick" < "alphabet";//true
    var result = "Brick".toLowerCase() < "alphabet".toLowerCase();//false
```

相等操作符（==），进行类型转换之后比较~ === 则是直接比较

ps:null和undefined是相等的

   null和undefined在比较之前不能转换成任何一个值，所以null != 0且undefined != 0且null == undefined

```
    NaN == NaN//FALSE,NaN和谁都不相等
    NaN != NaN//TRUE
    undefined == 0//false
    null == 0//false
    null == undefined//true
```

##### 5.检测JavaScript的数据类型。

  **typeof操作符来检测基本数据类型**

  返回值是undefined、boolean、number、string、object、function

  ps:

  1.若值是对象或者null返回Object,返回值中无null

  2.对未声明和未初始化的变量执行typeof操作符都返回undefined

  ```
  typeof null --返回object

  ```

  **instanceof操作符来检测引用数据类型**

  语法：variable instanceof constructor

  返回值:true和false；

  基本包装类型Boolean、Number、Sring，对这些事例调用typeof会返回object

  ```
  var obj = new Number(23);
  alert(typeof obj);//object

  ```
  基本包装类型Boolean、Number、Sring，这些对象都被转换成布尔值ture

  ```
  var falseObject = new Boolean(false);
  var res = falseObject && true;
  alert(res); //true

  var falseValue = false;
  var res = falseValue && true;
  alert(res); //false

  ```

##### 6.JavaScript的作用域。

js **无块级作用域**,只是把变量声明添加到 **最近的执行环境** 当中(函数执行环境或者全局执行环境)

也就是所谓的var hoisting变量声明提升，但是变量初始化不提升

```
if (true) {
    var color = "blue";
}

alert(color); //blue

无块级作用域，变量声明提升，相当于
var color;
if (true) {
    color = "blue";
}

alert(color); //blue
```

```
for (var i = 0;i < 10;i++) {
    doSomething(i);
}

alert(i); //10

无块级作用域，变量声明提升，相当于
var i;
for (i = 0;i < 10;i++) {
    doSomething(i);
}

alert(i); //10
```

```
题目：
What is the result of this expression? (or multiple ones)


var name = 'World!';
(function () {
    if (typeof name === 'undefined') {
        var name = 'Jack';
        console.log('Goodbye ' + name);
    } else {
        console.log('Hello ' + name);
    }
})();

```
答案：
```
Goodbye Jack
```
解析：
注意js的var hoisting变量声明提升，虽然声明提升，但是初始化并不提升
则上述代码相当于

##### 6.介绍js有哪些内置对象？

引用类型：

**Array对象**

栈方法:push(),pop()

队列方法：push(),shift()/unshift(),pop()

重排序：sort(),reverse()

操作：concat(),slice(),splice()

位置：indexOf(),lastIndexOf()

迭代：every(),some(),forEach(),filter(),map()

归并：reduce(),reduceRight()

http://blog.csdn.net/github_34514750/article/details/51049935


**Date对象**



**RegExp对象**

http://blog.csdn.net/github_34514750/article/details/51043277


**Global对象**

**Math对象**

基本包装类型：

Boolean、Number、String

引用类型new操作符创建的引用类型的实例，执行流离开当前作用域之前一直保存在内存中。但是自动创建的基本包装类型则只是存在于一行代码的一瞬间。p118-119

基本包装类型Boolean、Number、Sring，这些对象都被转换成布尔值ture

```
var falseObject = new Boolean(false);
var res = falseObject && true;
alert(res); //true

var falseValue = false;
var res = falseValue && true;
alert(res); //false

```

##### 7.js数组合并的方法？

http://blog.csdn.net/github_34514750/article/details/51320982

##### 8.说说写JavaScript的基本规范？


##### 9.JavaScript原型，原型链 ? 有什么特点？

##### 10.Javascript如何实现继承？


##### 11.Javascript创建对象的几种方式？


##### 12.Javascript作用链域?


##### 13.谈谈this对象的理解。


##### 14.eval是做什么的？


##### 15.什么是window对象? 什么是document对象?


##### 16.null，undefined的区别？


##### 17.写一个通用的事件侦听器函数(机试题)。


##### 18.["1", "2", "3"].map(parseInt) 答案是多少？

答案：

```
[1, NaN, NaN]
```
解析：
考察map函数，map的第一个参数是回调函数，并且自动给回调函数传递item,index,array三个参数，这里parseInt是回调函数，但是parseInt只接受两个参数(element,radix)，其实就是
```
parseInt("1", 0)--1--radix为0时，比较特殊，其实当成10进制处理。
parseInt("2", 1)--NaN--数值都超过了进制2>1不合理，无法解析
parseInt("3", 2)--NaN--数值都超过了进制3>2不合理，无法解析
```

##### 15.关于事件，IE与火狐的事件机制有什么区别？ 如何阻止冒泡？


##### 16.什么是闭包（closure），为什么要用它？


##### 17.javascript 代码中的"use strict";是什么意思 ? 使用它区别是什么？


##### 18.如何判断一个对象是否属于某个类？


##### 19.new操作符具体干了什么呢?


##### 20.用原生JavaScript的实现过什么功能吗？


##### 21.Javascript中，有一个函数，执行时对象查找时，永远不会去查找原型，这个函数是？


##### 22.对JSON的了解？


##### 23. [].forEach.call($$("*"),function(a){ a.style.outline="1px solid #"+(~~(Math.random()*(1<<24))).toString(16) })  能解释一下这段代码的意思吗？


##### 24.js延迟加载的方式有哪些？


##### 25.Ajax 是什么? 如何创建一个Ajax？


##### 26.同步和异步的区别?


##### 27.如何解决跨域问题?


##### 28.页面编码和被请求的资源编码如果不一致如何处理？


##### 29.模块化开发怎么做？


##### 30.AMD（Modules/Asynchronous-Definition）、CMD（Common Module Definition）规范区别？


##### 31.requireJS的核心原理是什么？（如何动态加载的？如何避免多次加载的？如何 缓存的？）


##### 32.谈一谈你对ECMAScript6的了解？


##### 33.ECMAScript6 怎么写class，为什么会出现class这种东西?


##### 34.异步加载的方式有哪些？


##### 35.documen.write和 innerHTML的区别?


##### 36.DOM操作——怎样添加、移除、移动、复制、创建和查找节点?


##### 37. .call() 和 .apply() 的作用和区别？


##### 38.数组和对象有哪些原生方法，列举一下？


##### 39.JS 怎么实现一个类。怎么实例化这个类


##### 40.JavaScript中的作用域与变量声明提升？


##### 41.如何编写高性能的Javascript？


##### 42.那些操作会造成内存泄漏？


##### 43.JQuery的源码看过吗？能不能简单概况一下它的实现原理？


##### 44.jQuery.fn的init方法返回的this指的是什么对象？为什么要返回this？


##### 45.jquery中如何将数组转化为json字符串，然后再转化回来？


##### 46.jQuery 的属性拷贝(extend)的实现原理是什么，如何实现深拷贝？


##### 47.jquery.extend 与 jquery.fn.extend的区别？


##### 48.jQuery 的队列是如何实现的？队列可以用在哪些地方？


##### 49.谈一下Jquery中的bind(),live(),delegate(),on()的区别？


##### 50.JQuery一个对象可以同时绑定多个事件，这是如何实现的？


##### 51.是否知道自定义事件。jQuery里的fire函数是什么意思，什么时候用？


##### 52.jQuery 是通过哪个方法和 Sizzle 选择器结合的？（jQuery.fn.find()进入Sizzle）


##### 53.针对 jQuery性能的优化方法？


##### 54.Jquery与jQuery UI有啥区别？


##### 55.JQuery的源码看过吗？能不能简单说一下它的实现原理？


##### 56.jquery 中如何将数组转化为json字符串，然后再转化回来？


##### 57.jQuery和Zepto的区别？各自的使用场景？


##### 58.针对 jQuery 的优化方法？


##### 59.Zepto的点透问题如何解决？


##### 60.jQueryUI如何自定义组件?


##### 61.需求：实现一个页面操作不会整页刷新的网站，并且能在浏览器前进、后退时正确响应。给出你的技术实现方案？


##### 62.如何判断当前脚本运行在浏览器还是node环境中？（阿里）


##### 63.移动端最小触控区域是多大？


##### 64.jQuery 的 slideUp动画 ，如果目标元素是被外部事件驱动, 当鼠标快速地连续触发外部元素事件, 动画会滞后的反复执行，该如何处理呢?


##### 65.把 Script 标签 放在页面的最底部的body封闭之前 和封闭之后有什么区别？浏览器会如何解析它们？


##### 66.移动端的点击事件的有延迟，时间是多久，为什么会有？ 怎么解决这个延时？（click 有 300ms 延迟,为了实现safari的双击事件的设计，浏览器要知道你是不是要双击操作。）


##### 67.知道各种JS框架(Angular, Backbone, Ember, React, Meteor, Knockout...)么? 能讲出他们各自的优点和缺点么?


##### 68.Underscore 对哪些 JS 原生对象进行了扩展以及提供了哪些好用的函数方法？


##### 69.解释JavaScript中的作用域与变量声明提升？


##### 70.那些操作会造成内存泄漏？


##### 71.JQuery一个对象可以同时绑定多个事件，这是如何实现的？


##### 71.Node.js的适用场景？


##### 72.(如果会用node)知道route, middleware, cluster, nodemon, pm2, server-side rendering么?


##### 73.解释一下 Backbone 的 MVC 实现方式？


##### 74.什么是“前端路由”?什么时候适合使用“前端路由”? “前端路由”有哪些优点和缺点?


##### 75.知道什么是webkit么? 知道怎么用浏览器的各种工具来调试和debug代码么?


##### 76.如何测试前端代码么? 知道BDD, TDD, Unit Test么? 知道怎么测试你的前端工程么(mocha, sinon, jasmin, qUnit..)?


##### 77.前端templating(Mustache, underscore, handlebars)是干嘛的, 怎么用?


##### 78.简述一下 Handlebars 的基本用法？


##### 79.简述一下 Handlerbars 的对模板的基本处理流程， 如何编译的？如何缓存的？


##### 80.用js实现千位分隔符?(来源：前端农民工，提示：正则+replace)


##### 81.检测浏览器版本版本有哪些方式？


##### 82.What is a Polyfill?


##### 83.做的项目中，有没有用过或自己实现一些 polyfill 方案（兼容性处理方案）？


##### 84.我们给一个dom同时绑定两个点击事件，一个用捕获，一个用冒泡。会执行几次事件，会先执行冒泡还是捕获？
