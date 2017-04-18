##### 40.知道什么是webkit么? 知道怎么用浏览器的各种工具来调试和debug代码么?你使用哪些工具和技术来调试 JavaScript 代码？

浏览器引擎和浏览器：opera--webkit(chrome和safari)--khtml--gecko(firefox)--ie

webkit是一个引擎，此引擎的主要的使用者有Safari，Chrome。


##### 51.请大概描述下页面访问cookie的限制条件

1.跨域问题
2.设置了HttpOnly
##### 28.页面编码和被请求的资源编码如果不一致如何处理？
##### 23. [].forEach.call($$("*"),function(a){ a.style.outline="1px solid #"+(~~(Math.random()*(1<<24))).toString(16) })  能解释一下这段代码的意思吗？
##### 61.需求：实现一个页面操作不会整页刷新的网站，并且能在浏览器前进、后退时正确响应。给出你的技术实现方案？
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


##### 74.什么是“前端路由”?什么时候适合使用“前端路由”? “前端路由”有哪些优点和缺点?
1，什么是前端路由？
路由是根据不同的 url 地址展示不同的内容或页面
前端路由就是把不同路由对应不同的内容或页面的任务交给前端来做，之前是通过服务端根据 url 的不同返回不同的页面实现的。

2，什么时候使用前端路由？
在单页面应用，大部分页面结构不变，只改变部分内容的使用

3，前端路由有什么优点和缺点？
优点：
用户体验好，不需要每次都从服务器全部获取，快速展现给用户
缺点：
使用浏览器的前进，后退键的时候会重新发送请求，没有合理地利用缓存
单页面无法记住之前滚动的位置，无法在前进，后退的时候记住滚动的位置

##### 76.如何测试前端代码么? 知道BDD, TDD, Unit Test么? 知道怎么测试你的前端工程么(mocha, sinon, jasmin, qUnit..)?

##### 80.用js实现千位分隔符?(来源：前端农民工，提示：正则+replace)
请举出一个匿名函数的典型用例？

##### 82.What is a Polyfill?
What is the extent of your experience with Promises and/or their polyfills?

##### 83.做的项目中，有没有用过或自己实现一些 polyfill 方案（兼容性处理方案）？

请指出浏览器特性检测，特性推断和浏览器 UA 字符串嗅探的区别？
请解释 JavaScript 的同源策略 (same-origin policy)。
为何通常会认为保留网站现有的全局作用域 (global scope) 不去改变它，是较好的选择？
请解释什么是单页应用 (single page app), 以及如何使其对搜索引擎友好 (SEO-friendly)
使用一种可以编译成 JavaScript 的语言来写 JavaScript 代码有哪些优缺点？
请解释可变 (mutable) 和不变 (immutable) 对象的区别。
请举出 JavaScript 中一个不变性对象 (immutable object) 的例子？
不变性 (immutability) 有哪些优缺点？
如何用你自己的代码来实现不变性 (immutability)？
请问调用栈 (call stack) 和任务队列 (task queue) 的区别是什么？
#### 6.画圆的方法
可以用html、css、js不同的方法画出圆

css：
```
{
  width:100px;
  height:100px;
  border-radius:50px;
}
```

html5 canvas和js：
```
<canvas id="drawing" width="200px" height="200px">A drawing of something</canvas>
if(drawing1.getContext){
    var context1 = drawing1.getContext("2d");
    //开始路径
    context1.beginPath();
    //绘制外圆
    context1.arc(100,100,99,0,2*Math.PI,false);
    //描边路径
    context1.strokeStyle = "#ff0000";
    context1.stroke();
}
```

#### 8.对前端工程化的理解

开发规范
模块化开发
组件化开发
组件仓库
性能优化
项目部署
开发流程
开发工具

#### 9.vue生命周期钩子

1.beforcreate
2.created
3.beformount
4.mounted
5.beforeUpdate
6.updated
7.actived
8.deatived
9.beforeDestroy
10.destroyed
