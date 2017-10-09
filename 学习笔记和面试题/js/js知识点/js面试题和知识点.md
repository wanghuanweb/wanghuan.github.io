
HTML5新特性及离线存储。


CSS3新特性、HTML5新特性。


接下来是基础问题了。问的比较新，我就跪在这。具体问题记下了：

1、CSS3动画用过吗？
animation有那几个属性？
Transition呢？
（自己用的都是jQuery里的animate，和他讲错了），那时候心里已经开始慌了，CSS3和Html5新特性只是了解一些，稍微一深入，就有点吃不消，我和他讲，平时公式用的CSS都是公共的，有专门的负责样式的自己只是拿过来用就是，对css掌握的不是很好。果然下面到了html5.

2、Html5里的离线存储平时用过么？有哪些。Cookie与WebStorage的区别。

3、Html5里的多线程知道吗，如何创建一个线程？线程嵌套了，他们之间是怎么通信的？

浮动框组件如何实现
底部固定，有软键盘出来怎么办

蘑菇街1面（2016.3.21 晚上8.20）26分钟

1、JS事件模型与事件流介绍一下，事件代理用过吗？but自定义事件【答得不好】

2、浏览器原理，和他讲了一通。Js是怎么解析的？什么时候执行的？but定时器的执行原理【答的不好】

3、怎么设计一个JS组件。【这个真没搞过，乱说了一下复用性，提供接口，】

4、jQuery与angular有什么特点。源码里哪里比较有特色。【jQ源码当时没看完，跟他说了一些比较浅的东西，然后他恩恩，还有呢？还有呢？这里直接被还有呢问死了。


腾讯2面（2016.3.24 下午4：00）28分钟



第一坑：


问题：怎么减少http的请求次数？答了前端的东西，他要求从协议去解释，没有想出来。


网易游戏1面（2016.3.25 晚上7：00）36分钟

1、css兼容性处理。

2、纯css3实现360度旋转，不能用js。

3、Css动画用过吗？过渡函数有哪些？

4、Css盒子，怎么设置？


8、怎么区分不同的浏览器（火狐，IE，google）,多种方法。

9、Js声明函数的方式有哪些？分别有什么不同？

10、闭包与匿名函数的区别，分别怎么用？举例子说明

11、BOM的常用属性

12、节点的增删改查分别怎么操作？

13、Javascript的继承机制，有什么好处与不足。

14、Js事件流的处理兼容性处理，一共有哪些，【答全比较难。】

15、ES6的let与const有什么区别？

16、用过sea.js与reqire.js吗？【表示没用过】

20、怎么设置响应式布局？

21、Bootstrap响应式布局是怎么实现的？

22、为什么频繁操作dom节点的代价比较大？

23、Html5有哪些新特性，你用过哪些？

24、http1.0与http1.1有什么区别？http2有什么新特性？

【一面】
其实还比较简单，大致就介绍了一下自己学了撒。以下几个问题
1、移动端和pc差别
2、html5的特性
3、node.js
4、jq源码读过之后有什么提升
5、js创建对象的几种方式

【二面】

1、在地址栏输入url中间会经历什么
2、你所了解的前端技术栈有哪些

这个可能我要多说一下。本来吧这两个问题看似简单其实暗藏杀机。
首先第一个问题。你的回答中将会包括http协议 服务器的知识,浏览器渲染的知识。打个比方，dns是什么 作用。如果你能把每一块说的很清楚的话，那真的没撒问题了。

第二个问题就是考察的是你在前端方面的可扩展性，如果你了解的越多证明你知道的越多。可塑性可发展性更强。


【三面】
是在一个下午,我和哥们去开会了，结果手机没带。回来一看，哎，内心是奔溃的啊。恰好是周六，心想，死定了。不过还好，就在我发这篇面经的前一个小时。三面的大哥终于打来了。问题如下
1、ajax在jquery的底层是怎么实现的
2、Promise编程
3、页面优化 url问题，同上
4、css3动画优化
5、重排重绘
6、项目开发(你现在做的这个项目你觉得你写的东西最大的优点和缺点)
7、git自动化部署测试服务器(这个是我最近搭的测试服务器，也问了一下。不多)

和为m的数组题。

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
https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/create
继承性地创建一个对象。
（3）声明某个变量类型的变量

2、    html4、xhtml、html5的区别
3、    css hack的用法，如何区别浏览器
7、    如何区别浏览器和版本
8、    ermaCripts的严格模式和非严格模式的区别，至少三种
9、    你所知道的js框架，以及选择原因
10、    你所知道的字符串化为数值以及求整的方法
14、    扩展Date方法，求出当前日期内月份的天数
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
其它：﻿
Node.js﻿
