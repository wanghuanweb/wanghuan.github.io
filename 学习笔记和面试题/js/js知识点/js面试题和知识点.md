##### 40.知道什么是webkit么? 知道怎么用浏览器的各种工具来调试和debug代码么?你使用哪些工具和技术来调试 JavaScript 代码？

浏览器引擎和浏览器：opera--webkit(chrome和safari)--khtml--gecko(firefox)--ie

webkit是一个引擎，此引擎的主要的使用者有Safari，Chrome。
##### 51.请大概描述下页面访问cookie的限制条件

1.跨域问题
2.设置了HttpOnly
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
