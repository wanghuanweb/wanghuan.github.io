1.算法，一个数组找出n个数和是m
2.前端性能优化：一百个div要放大，怎么写(把div取出来操作完再加回去)
3.requirejs懒加载是如何实现的。

##### 40.知道什么是webkit么? 知道怎么用浏览器的各种工具来调试和debug代码么?你使用哪些工具和技术来调试 JavaScript 代码？

浏览器引擎和浏览器：opera--webkit(chrome和safari)--khtml--gecko(firefox)--ie

webkit是一个引擎，此引擎的主要的使用者有Safari，Chrome。
##### 28.页面编码和被请求的资源编码如果不一致如何处理？
##### 23. [].forEach.call($$("*"),function(a){ a.style.outline="1px solid #"+(~~(Math.random()*(1<<24))).toString(16) })  能解释一下这段代码的意思吗？
##### 62.如何判断当前脚本运行在浏览器还是node环境中？（阿里）

十三、iframe有那些缺点？
iframe会阻塞主页面的Onload事件；
搜索引擎的检索程序无法解读这种页面，不利于SEO;
iframe和主页面共享连接池，而浏览器对相同域的连接有限制，所以会影响页面的并行加载。
使用iframe之前需要考虑这两个缺点。如果需要使用iframe，最好是通过javascript动态给iframe添加src属性值，这样可以绕开以上两个问题。
##### 63.移动端最小触控区域是多大？
##### 66.移动端的点击事件的有延迟，时间是多久，为什么会有？ 怎么解决这个延时？（click 有 300ms 延迟,为了实现safari的双击事件的设计，浏览器要知道你是不是要双击操作。）
##### 67.知道各种JS框架(Angular, Backbone, Ember, React, Meteor, Knockout...)么? 能讲出他们各自的优点和缺点么?
##### 68.Underscore 对哪些 JS 原生对象进行了扩展以及提供了哪些好用的函数方法？
##### 71.Node.js的适用场景？
##### 72.(如果会用node)知道route, middleware, cluster, nodemon, pm2, server-side rendering么?
##### 73.解释一下 Backbone 的 MVC 实现方式？
##### 76.如何测试前端代码么? 知道BDD, TDD, Unit Test么? 知道怎么测试你的前端工程么(mocha, sinon, jasmin, qUnit..)?
请举出一个匿名函数的典型用例？
##### 82.What is a Polyfill?
What is the extent of your experience with Promises and/or their polyfills?
##### 83.做的项目中，有没有用过或自己实现一些 polyfill 方案（兼容性处理方案）？
请指出浏览器特性检测，特性推断和浏览器 UA 字符串嗅探的区别？
为何通常会认为保留网站现有的全局作用域 (global scope) 不去改变它，是较好的选择？
使用一种可以编译成 JavaScript 的语言来写 JavaScript 代码有哪些优缺点？
请解释可变 (mutable) 和不变 (immutable) 对象的区别。
请举出 JavaScript 中一个不变性对象 (immutable object) 的例子？
不变性 (immutability) 有哪些优缺点？
如何用你自己的代码来实现不变性 (immutability)？
请问调用栈 (call stack) 和任务队列 (task queue) 的区别是什么？

你在昨天/本周学到了什么？
编写代码的哪些方面能够使你兴奋或感兴趣？
你最近遇到过什么技术挑战？你是如何解决的？
在制作一个网页应用或网站的过程中，你是如何考虑其 UI、安全性、高性能、SEO、可维护性以及技术因素的？
请谈谈你喜欢的开发环境。。(例如操作系统，编辑器，浏览器，工具等等。)
    OSX, sublime Text3, Chrome, SourceTree...
你能描述当你制作一个网页的工作流程吗？
你如何对网站的文件和资源进行优化？
    期待的解决方案包括：
    文件合并
    文件最小化/文件压缩
    使用 CDN 托管
    缓存的使用
    其他
浏览器同一时间可以从一个域名下载多少资源？
请说出三种减少页面加载时间的方法。(加载时间指感知的时间或者实际加载时间)

为什么利用多个域名来提供网站资源会更有效？
    浏览器同一时间可以从一个域名下载多少资源？
    有什么例外吗？
    加分项： 指出在手机端可能有负面影响 (http://www.mobify.com/blog/domain-sharding-bad-news-mobile-performance/)
    加分项： HTTP2 / SPDY

请写一个简单的幻灯效果页面。
    如果不使用JS来完成，可以加分。
你都使用哪些工具来测试代码的性能？
    Profiler, JSPerf, Dromaeo
如果今年你打算熟练掌握一项新技术，那会是什么？
请谈谈你对网页标准和标准制定机构重要性的理解。
请解释什么是 ARIA 和屏幕阅读器 (screenreaders)，以及如何使网站实现无障碍访问 (accessible)。

===================================================================
搜狗面试题
js框架有哪些，有什么有特点
doc.getelementbyclassname有兼容性问题吗
=======================================================
百度金融：
input的disable和readonly的区别
cookie和session区别
XSS注入防范
https为什么更安全
jQuery动态添加子节点
jQuery动态删除子节点
瀑布流
======================================================
腾讯上海OMG，TST校招
session cookie
css等静态文件放在其他域名下的好处与坏处
=======================================================
百度，笔试题
a标签hover飘红
promise
模块化js是什么意思 有什么好处
=====================================================
百度搜索
面向对象的特点：封装继承多态
window.onload=function(){} 和$(document),ready(function{})的区别
setInterval和setTimeout的区别？怎么让setTimeout像setInverval一样执行？
doc.getelementbyclassname的兼容性问题
=====================================================================
项目介绍一下...
CSS设置父元素透明子元素怎么取消这个透明...
阿里面试
（1）    Object.crease(obj,{params})的具体用处？
http://www.cnblogs.com/yupeng/p/3478069.html
继承性地创建一个对象。

（2）javascript的几种作用域：
http://www.cnblogs.com/silentjesse/p/4024536.html
1、    函数作用域 2、变量作用域 3、作用域链 4、with语句

（3）声明某个变量类型的变量

腾讯汽车面试题
2、    html4、xhtml、html5的区别
3、    css hack的用法，如何区别浏览器
7、    如何区别浏览器和版本
8、    ermaCripts的严格模式和非严格模式的区别，至少三种
9、    你所知道的js框架，以及选择原因
10、    你所知道的字符串化为数值以及求整的方法
14、    扩展Date方法，求出当前日期内月份的天数
17、    javascript语法优化
蘑菇街
一个字符串取出 2 到 7 的字串

曾经总结的一些前端技术要点：https://bbs.byr.cn/#!article/WWWTechnology/38004

本人北邮毕业，目前供职阿里前端岗位，欢迎转发和贡献

Github: https://github.com/shangfeiSF，每个repo的Readme会逐步完善

目前最完善的readme应该是https://github.com/shangfeiSF/redux-grope，喜欢或者正在使用React/Redux/React-router的童鞋可以看一看，和官网上的examples有不少优化

Promise实现bluebird主要API示例：https://github.com/shangfeiSF/bluebird-grope

React学习教程:https://github.com/shangfeiSF/react-grope

React-router学习教程：https://github.com/shangfeiSF/react-router-grope

Redux & Facebook/Flow & Facebook/Jest学习教程：https://github.com/shangfeiSF/redux-grope

chrome插件框架(ali全球眼项目演化而来)：https://github.com/shangfeiSF/chross2

Grunt经典插件教程：https://github.com/shangfeiSF/grunt-grope

图片上传前后端实现：https://github.com/shangfeiSF/upload-image-grope

socket.io应用：https://github.com/shangfeiSF/socketio-grope

老虎机jQuery & Zepto实现：https://github.com/shangfeiSF/slotmachine-grope

z-index点点滴滴：https://github.com/shangfeiSF/z-index-grope

less语法实例：https://github.com/shangfeiSF/less-grope

图片处理：https://github.com/shangfeiSF/graphics-magick-grope

nodejs核心模块 & nopt & mocha：https://github.com/shangfeiSF/nodejs-grope

写这些repo的初衷大部分源于对这些技术的好奇心，也算是为自己积累经验

前端算法：最起码用js写数据结构没问题，stack  queue  map  set  hashmap  tree(先中后序)  gragh  （bfs  dfs）等能实现了就好，排序查找也得会些，还有个链表

为什么传统上利用多个域名来提供网站资源会更有效？
请尽可能完整得描述从输入 URL 到整个网页加载完毕及显示在屏幕上的整个流程。
Long-Polling、Websockets 和 Server-Sent Event 之间有什么区别？
请描述以下 request 和 response headers：
Diff. between Expires, Date, Age and If-Modified-...
Do Not Track
Transfer-Encoding
X-Frame-Options

如果你去面试你最怕被问到什么？﻿
下面这些？﻿﻿
链式调用﻿
框架设计﻿
前端架构﻿
下面的工具框架你是听说过？熟悉？还是在项目中反复实践过？﻿
工具、框架及前端视野﻿
工具类：﻿
代码管理： git svn﻿
代码编译： Less Sass CoffeeScript﻿
模块加载： SeaJS RequireJS Browserify﻿
项目构建： grunt gulp webpack﻿
框架类：﻿
React   AngularJs  Knockout  Vue  (MVVM)﻿
BackBone (MVC)﻿
BootStrap (UI)﻿
其它：﻿
Node.js﻿
