##### 9.说说写JavaScript的基本规范？或者说如何编写高质量的可维护的js代码？

**1.注意编程规范**

注意常量，函数灯命名的大小写，注释，空格，缩进等

**2.注意变量的声明**

一方面是避免创建隐藏的全局变量，另一方面尽量使用单个var的声明。

1.注意使用var声明变量，避免创建隐藏的全局变量

2.避免用任务链进行部分var声明，从而避免创建隐藏的全局变量

```
//a是本地变量，b是全局变量
function foo() {
   var a = b = 0;
   // ...
}
```

3.使用单var形式声明变量(代码少，且变量放一起增加可读性,且反正变量会hoisting)

```
function func() {
   var a = 1,
       b = 2,
       sum = a + b,
       myobject = {},
       i,
       j;
   // function body...
}
```

**3.注意for循环和for-in循环**

for循环一方面是缓存数组的长度，另一方面是避免使用i++

1.缓存数组的长度

```
// 若myarray是HTMLCOLLECTION对象的话，需要每次查询HTML页面，也就是实时操作DOM，则效率很低
for (var i = 0; i < myarray.length; i++) {
   // 使用myarray[i]做点什么
}
//因此使用缓存数组长度
for (var i = 0, max = myarray.length; i < max; i++) {
   // 使用myarray[i]做点什么
}
```
2.避免使用i++

对象使用for-in循环(属性列表顺序不被保证，所以虽然可以遍历数组但是不推荐)，数组使用for循环

```
var man = {
    hands:2,
    legs:2,
    heads,1
};

if(typeof Object.prototype.clone === "undefined") {
    Object.prototype.clone = function() {

    };
}
//需要应用hasOwnProperty()方法过滤原型属性
for(var i in man) {
    if(man.hasOwnPrototype(i)) {
        console.log(i, ":", man[i]);
    }
}
//或者这样使用hasOwnPrototype来过滤属性
for(var i in man) {
    if(Object.prototype.hasOwnPrototype.call(man,i)) {
        console.log(i,":",man[i]);
    }
}
```

**4.避免隐式类型的转换**

在比较值和表达式类型的时候始终使用===和!==操作符

**5.避免使用eval**

1.动态访问属性，可以用[]来代替

```
//避免使用eval访问动态属性，用[]方法访问动态属性
var property = "name";
alert(eval("obj." + property));

// 更好的
var property = "name";
alert(obj[property]);
```

2.若必须使用eval(),可以考虑使用new Function()来代替

因为在新Function()中作代码评估是在局部函数作用域中运行，所以代码中任何被评估的通过var 定义的变量都不会自动变成全局变量

```
console.log(typeof un);    // "undefined"
console.log(typeof deux); // "undefined"
console.log(typeof trois); // "undefined"

var jsstring = "var un = 1; console.log(un);";
eval(jsstring); // logs "1"

jsstring = "var deux = 2; console.log(deux);";
new Function(jsstring)(); // logs "2"

jsstring = "var trois = 3; console.log(trois);";
(function () {
   eval(jsstring);
}()); // logs "3"

console.log(typeof un); // number
console.log(typeof deux); // "undefined"
console.log(typeof trois); // "undefined"
```

##### 13.eval是做什么的？

**语法**

eval(string)

**参数说明**

该方法只接受原始字符串作为参数，若string参数不是原始字符串，则不做任何改变地返回。因此，不要为此函数传递String对象来作为参数

**使用场景**

eval其实就是让字符串当成js代码执行(把一段字符串传递给JS解释器，由JS解释器将这段字符串解释成JS代码并执行)
若代码是事先知道，不是在运行时才确定的，不用使用eval()

**例子**

```
<script type="text/javascript">
    eval("alert(1+1)"); //2,字符串被解释成js代码执行的，但是这样用着没什么意义
<script>

```

```
//eval函数的使用经常在DOM中，例如我们有div1,div2,div3，那么在document.getElementByID时我们的ID没有办法去得到

<script type="text/javascript">
    for (var loop = 1; loop < 10; loop++)  
    {

        eval('document.getElementById("div"+loop).innerHTML="123"');
    }
<script>
```

##### 27."attribute" 和 "property" 的区别是什么？

Property：属性，property是DOM中的属性，是JavaScript里的对象  比如：element.id;

Attribute：特性，attribute是HTML标签上的特性，它的值只能够是字符串，通过类数组attributes可以罗列所有的attribute。 比如：element.getAttribute("id");或者element.attributes.

property能够从attribute中得到同步；attribute不会同步property上的值；attribute和property之间的数据绑定是单向的，attribute->property；更改property和attribute上的任意值，都会将更新反映到HTML页面中；

```
html代码
<input id="in_1" value="1" sth="whatever">
js代码
var in1 = document.getElementById('in_1');
in1.value = 'new value of prop';
console.log(in1.value);				// 'new value of prop'
console.log(in1.attributes.value);	// 'value="1"'-----attribute不会同步property上的值

in1.attributes.value.value = 'new value of attr';
console.log(in1.value);				// 'new value of attr'
console.log(in1.attributes.value);	// 'new value of attr'-----property能够从attribute中得到同步
```

http://www.codeceo.com/article/javascript-property-attribute.html



##### 40.知道什么是webkit么? 知道怎么用浏览器的各种工具来调试和debug代码么?你使用哪些工具和技术来调试 JavaScript 代码？

浏览器引擎和浏览器：opera--webkit(chrome和safari)--khtml--gecko(firefox)--ie

webkit是一个引擎，此引擎的主要的使用者有Safari，Chrome。

##### 41.javascript 代码中的"use strict";是什么意思 ? 使用它区别是什么？

**use strict**：严格模式

除了正常运行模式，ECMAScript5添加了第二种运行模式：严格模式，这种模式让js在更严格的条件下运行。

**使用严格模式的区别**

1.消除js语法的一些不合理，不严谨之处，比如不能用with(因为增加了访问作用域链的成本)，也不能在意外的情况下给全局变量赋值

2.消除代码中的一些不安全之处，保证代码的安全

比如：禁止this关键字指向全局对象

```
function f(){
　　　　return !this;
　　}
　　// 返回false，因为"this"指向全局对象，"!this"就是false
　　function f(){
　　　　"use strict";
　　　　return !this;
　　}
　　// 返回true，因为严格模式下，this的值为undefined，所以"!this"为true。
```

因此，使用构造函数时，如果忘了加new，this不再指向全局对象，而是报错。

```
function f(){
　　　　"use strict";
　　　　this.a = 1;
　　};
　　f();// 报错，this未定义
```

3.提高编译器效率，增加运行速度

4.为未来新版本的Javascript做好铺垫


##### 46.在JS方法中返回多个值的三种方法

1.使用数组的方式

```
<html>
<head>
    <title>JS函数返回多个值--oec2003</title>
</head>
<body>
    <input type="button" onclick="getNames()" value="test" />
    <script type="text/javascript">
function getData()
{
    var names=new Array("oec2003","oec2004");
    return names;
}
function getNames()
{
    var names=getData();
    alert(getData()[0]); //返回oec2003
}
</script>
</body>
</html>
```

2.将数据封装到Json中返回

```
<html>
<head>
<title>JS函数返回多个值--oec2003</title>
</head>
<body>
<input type="button" onclick="getInfo()" value="test"/>
<script type="text/javascript">
function getData()
{
    var info={"name":"oec2003","age":"25"};
    return info;
}
function getInfo()
{
    var info=getData();
    var name=info["name"];
    var age=info["age"];
    alert("姓名："+name+" 年龄："+age);
}
</script>
</body>
</html>
```

3.这是最简单的一种方法，看下面代码

```
<html>
<head>
<title>JS函数返回多个值--oec2003</title>
</head>
<body>
<input type="button" onclick="getInfo()" value="test"/>
<script type="text/javascript">
    function getData()
    {
        return ["oec2003", 25]
    }
    function getInfo()
    {
        var info = getData();
        alert("姓名：" + info[0] + "年龄：" + info[1]);
    }
</script>
</body>
</html>
```



##### 48. .和[ ]的区别

访问对象属性的方法

**1.语法差别**

```
object.property
object['property']
```

**2.举例**

```
function Person() {
  this.name=" 王欢 ";
  this.sex=" 女 ";
  this.age=22;
}
var wanghuan=new Person();
wanghuan.name;
wanghuan["name"];
```

**3.灵活性差别**

使用”.“运算符来存取一个对象的属性时，属性名是用标识符表示的。而在JavaScript程序中，标识符必须被逐字地输入，它们不是一种数据类型，因此程序不能对其操作。
而使用数组[]表示法来存取一个对象的属性时，属性名是用字符串表示的。字符串是JavaScript的一种数据类型，因此可以在程序运行中操作并创建它们。

这种情况使用[]才可，因为city是个字符串

```
var city = document.getElementById('aqi-city-input').value,
    num = document.getElementById('aqi-value-input').value;
//这里就不能用.看随后属性访问的比较
aqiData[city] = num;
//随后的遍历操作
for(var city in aqiData) {
	alert(city+":"+aqiData[city]);//北京：90，上海：40等
}
```

**4.执行效率差别**
数组[]表示法在存取属性值时会进行表达式运行。
而点表示法是直接存取属性值，理论上执行效率会比数组表示法高。



##### 51.请大概描述下页面访问cookie的限制条件

1.跨域问题
2.设置了HttpOnly

##### 52.图片预览

```
<input type="file" name="file" onchange="showPreview(this)" />
<img id="portrait" src="" width="70" height="75">

function showPreview(source) {
  var file = source.files[0];
  if(window.FileReader) {
      var fr = new FileReader();
      fr.onloadend = function(e) {
        document.getElementById("portrait").src = e.target.result;
      };
      fr.readAsDataURL(file);
  }
}
```










##### 44.那些操作会造成内存泄漏？

内存泄露：应用程序不再需要占用内存的时候，由于某些原因，内存没有被操作系统或可用内存池回收。

1.不规范的js代码

比如意外的全局变量，不使用var来定义，js中如果不用 var 声明变量,该变量将被视为 window 对象(全局对象)的属性,也就是全局变量.


##### 28.页面编码和被请求的资源编码如果不一致如何处理？




##### 20.用原生JavaScript的实现过什么功能吗？


##### 21.Javascript中，有一个函数，执行时对象查找时，永远不会去查找原型，这个函数是？

hasOwnProperty

javaScript中hasOwnProperty函数方法是返回一个布尔值，指出一个对象是否具有指定名称的属性。此方法无法检查该对象的原型链中是否具有该属性；该属性必须是对象本身的一个成员。

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
##### 77.前端templating(Mustache, underscore, handlebars)是干嘛的, 怎么用?
##### 78.简述一下 Handlebars 的基本用法？
##### 79.简述一下 Handlerbars 的对模板的基本处理流程， 如何编译的？如何缓存的？
##### 80.用js实现千位分隔符?(来源：前端农民工，提示：正则+replace)
请举出一个匿名函数的典型用例？

##### 82.What is a Polyfill?
What is the extent of your experience with Promises and/or their polyfills?

##### 83.做的项目中，有没有用过或自己实现一些 polyfill 方案（兼容性处理方案）？

请指出浏览器特性检测，特性推断和浏览器 UA 字符串嗅探的区别？
你使用过 JavaScript 模板系统吗？
请解释 JavaScript 的同源策略 (same-origin policy)。
为何通常会认为保留网站现有的全局作用域 (global scope) 不去改变它，是较好的选择？
请解释什么是单页应用 (single page app), 以及如何使其对搜索引擎友好 (SEO-friendly)。
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
