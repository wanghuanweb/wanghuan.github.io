##### 1.Doctype作用？

1.1 DOCTYPE位于HTML标签前，用于告诉浏览器用什么文档标准解析这个文档的标记

标准就是W3C发布的一个文档类型定义DTD中包含的规则（包含一系列的标记attributes和properties，它们用于标记Web文档的内容；此外还包括一些规则，它们规定了哪些标记能出现在其他哪些标记中。）

1.2 文档中的标记不遵循DOCTYPE声明指定的DTD，则无法正确显示网页

1.3 不声明DOCTYPE的话，浏览器会使用内建的默认DTD

##### 2.严格模式与混杂模式如何区分？它们有何意义?

2.1严格模式是浏览器根据规范显示页面

2.2混杂模式是以一种向后兼容的方式显示

2.3意义：决定了浏览器用哪种规范去解析网页，也就是浏览器如何渲染网站
触发：浏览器根据doctype是否存在和使用的是那种dtd来决定。


##### 10.HTML5的本地缓存，离线储存怎么使用，工作原理能不能解释一下？
##### 11.浏览器是怎么对HTML5的离线储存资源进行管理和加载的呢？
##### 3.简述一下你对HTML语义化的理解？HTML5的新元素？新属性？

**语义化**

HTML语义化其实就是根据内容的结构化选择合适的标签，便于开发者阅读维护和写出优雅的代码。

1.文章结构标签 (HTML5新的特殊内容元素，比如 article、header、nav、footer、section)

<article> :定义外部的内容，外部内容可以是来自外部的新闻提供者的一篇新的文章或者是来自blog的文本
<header>:定义文档的页眉；对应<footer>定义文章的页脚
<nav>:导航栏
<article> 标签定义 article 以外的内容。aside 的内容应该与 article 的内容相关。
<aside> 的内容可用作文章的侧栏。
<footer>

```
<header>
	<h1></h1>
	......
	<h6></h6>
</header>

<nav>
	<ul>
		<li></li>
		<li></li>
		<li></li>
	</ul>
</nav>

<aside>
</aside>

<article>
	<p></p>
</article>

<footer>
</footer>
```

2.table标签

table-caption/thead/tbody/tfoot-th/td

```
<table>
    <caption>
    </caption>
    <thead>
        <tr>
            <th></th>
            ......
        </tr>
    </thead>
    <tbody>
        <tr>
            <td></td>
            ......
        </tr>
        ......
    </tbody>
    <tfoot>
        <tr>
            <td></td>
            ......
        </tr>
    </tfoot>
```

3.图片排序标签

  <figure>:用作文档中插图的图像
  <figcaption>:定义figure元素的标题caption

```
<figure>
	<figcaption>标题</figcaption>
	<img src=""/>
	......
	<figcaption>标题</figcaption>
	<img src=""/>
</figure>
```

4.HTML5新元素用于绘画的 canvas 元素，用于媒介回放的视频 video 和音频 audio 元素

```
<canvas id="myCanvas" width="200" height="100"></canvas>
<video src="movie.ogg" controls="controls">
</video>
<audio src="song.ogg" controls="controls">
</audio>
```

5.HTML5新表单元素datalist/keygen/output

**datalist元素**

datalist 元素规定输入域的选项列表。
列表是通过 datalist 内的 option 元素创建的。
如需把 datalist 绑定到输入域，请用输入域的 list 属性引用 datalist 的 id：

```
<input type="url" list="url_list" name="link" />
<datalist id="url_list">
<option label="W3School" value="http://www.W3School.com.cn" />
<option label="Google" value="http://www.google.com" />
<option label="Microsoft" value="http://www.microsoft.com" />
</datalist>
```

**keygen元素**

keygen 元素的作用是提供一种验证用户的可靠方法。
keygen 元素是密钥对生成器（key-pair generator）。当提交表单时，会生成两个键，一个是私钥，一个公钥。
私钥（private key）存储于客户端，公钥（public key）则被发送到服务器。公钥可用于之后验证用户的客户端证书（client certificate）。


**output元素**

output 元素用于不同类型的输出，比如计算或脚本输出
```
<output id="result" onforminput="resCalc()"></output>
```

**html5删除元素**

<big>，<center>，<font>，<tt>，<strike>
<acronym>，<applet>

**html5新增特性**

1.语义特性(新增元素)

2.表单的新元素和表单自动完成功能，input的type增多

2.三维、图形及特效特性
基于SVG、Canvas、WebGL及CSS3的3D功能，用户会惊叹于在浏览器中，所呈现的惊人视觉效果

3.web存储特性(localStorage,sessionStorage)

4.应用缓存（Application Cache）

5.HTML5规范里增加了一个自定义data属性.

**使用 data- 属性的好处**

赋予我们在所有 HTML 元素上嵌入自定义 data 属性的能力。
存储的（自定义）数据能够被页面的 JavaScript 中利用，以创建更好的用户体验（不进行 Ajax 调用或服务器端数据库查询）。

为前端开发者提供自定义的属性，这些属性集可以通过对象的dataset属性获取，不支持该属性的浏览器可以通过 getAttribute方法获取
```
<div data-author="david" data-time="2011-06-20" data-comment-num="10" id="content">...</div>
var content = document.getElementById('content');      
content.dataset.commentNum; // 10--需要注意的是，data-之后的以连字符分割的多个单词组成的属性，获取的时候使用驼峰风格
console.log(content.getAttribute('data-comment-num')); //不支持该属性的浏览器可以通过 getAttribute方法获取
```

**html5的web存储新方法**

HTML5提供了两种在客户端存储数据的新方法：

1.localStorage--没有时间限制的存储
2.sessionStorage--针对一个session的数据存储

存储数据的操作方法：

localStorage和sessionStorage都具有相同的操作方法，例如setItem、getItem和removeItem等

1.sessionStorage.setItem("键名","键值");
2.sessionStorage.getItem("key");
3.sessionStorage.removeItem("key");
3.sessionStorage.clear();-----清除所有的key和value

web Storage不但可以用自身的setItem,getItem等方便存取，也可以像普通对象一样用点(.)操作符，及[]的方式进行数据存储，像如下的代码：

```
var storage = window.localStorage;
storage.key1 = "hello";
storage["key2"] = "world";
console.log(storage.key1);
console.log(storage["key2"]);
```

sessionStorage和localStorage提供的key()和length可以方便的实现存储的数据遍历

```
var storage = window.localStorage;
for (var i=0, len = storage.length; i < len; i++)
{
var key = storage.key(i);
var value = storage.getItem(key);
console.log(key + "=" + value);
}
```

多亏了本地存储(非正式的HTML5，本着方便归纳的目的)，我们可以让高级浏览器记住我们的编辑后的内容，即使浏览器被关掉或是页面刷新
(就算改了html之后，刷新之后也是自己编辑之后的)

```
//HTML代码：
<ul id="edit" contenteditable="true">
    <li>修改我吧，然后刷新页面看看，^_^</li>
</ul>
//JS代码：
var edit = document.getElementById("edit");
edit.onblur = function(){
    localStorage.setItem("tododata", this.innerHTML);
};
if(localStorage.getItem("tododata")){
    edit.innerHTML = localStorage.getItem("tododata");
}
```

**HTML5的form自动完成功能**

on--------默认，启动自动完成
off-------禁用自动完成

autocomplete属性规范表单是否启用自动完成功能

```
<form>
<input type="text" id="autoOne" name="autoOne" autocomplete="on" />
<input type="submit" value="提交记忆" />
</form>
```

**HTML5应用程序缓存**

HTML5 引入了应用程序缓存，这意味着 web 应用可进行缓存，并可在没有因特网连接时进行访问。

应用程序缓存为应用带来三个优势：
离线浏览 - 用户可在应用离线时使用它们
速度 - 已缓存资源加载得更快
减少服务器负载 - 浏览器将只从服务器下载更新过或更改过的资源。

**cookie，localStorage，sessionStorage**

cookie：因为http协议是无状态的协议，一旦数据交换完毕后，客户端和服务器端的连接就会关闭，再次交换数据会再次建立新的连接。也就意味着 **无法从连接上跟踪会话** 。cookie就是为了弥补http的不足而跟踪会话。

相同点：都存储在客户端

不同点：

1.存储大小

cookie数据大小不能超过4k。
sessionStorage和localStorage 虽然也有存储大小的限制，但比cookie大得多，可以达到5M或更大。

2.有效时间

localStorage 存储持久数据，浏览器关闭后数据不丢失除非主动删除数据；
sessionStorage 数据在当前浏览器窗口关闭后自动删除。
cookie 设置的cookie过期时间之前一直有效，即使窗口或浏览器关闭

3.数据与服务器之间的交互方式

cookie的数据会自动的传递到服务器，服务器端也可以写cookie到客户端
sessionStorage和localStorage不会自动把数据发给服务器，仅在本地保存。

**html5新增元素**

文章结构中的标签：header/nav/aside/article/footer/section/details/summary
图像：<figcaption>，<figure>
绘画标签：canvas
视频和音频标签：video和audio元素
表单中的标签：datalist/keygen/output

**处理HTML5新标签的浏览器兼容问题**

1.IE8/IE7/IE6支持通过document.createElement方法产生的标签，可以利用这一特性让这些浏览器支持HTML5新标签

```
var e = "abbr, article, aside, audio, canvas, datalist, details, dialog, eventsource, figure, footer, header, hgroup, mark, menu, meter, nav, output, progress, section, time, video".split(', ');
var i= e.length;
while (i--){
    document.createElement(e[i])
}
```

2.使用是html5shim框架,在页面的head部分添加框架的引用即可：

```
<!--[if lt IE 9]>
<script> src="http://html5shim.googlecode.com/svn/trunk/html5.js"</script>
<![endif]-->
```

**区分 HTML 和 HTML5**

1.在文档类型声明上
HTML5声明：<!doctype html>

2.在结构语义上

HTML:没有体现结构语义化的标签，通常都是这样来命名的<div id="header"></div>，这样表示网站的头部。
HTML5:在语义上却有很大的优势，提供了一些新的HTML5标签比如: article、footer、header、nav、section，这些通俗易懂。

3.强大的HTML5的新功能
强大的绘图功能canvas  新增视频标签video

**HTML5 为什么只需要写 <!DOCTYPE HTML>？**

HTML5 不基于 SGML，因此不需要对DTD进行引用，但是需要doctype来规范浏览器的行为（让浏览器按照它们应该的方式来运行）；
而HTML4.01基于SGML,所以需要对DTD进行引用，才能告知浏览器文档所使用的文档类型。
 SGML (Standard Generalized Markup Language) 标准通用标记语言

##### 4.行内元素有哪些？块级元素有哪些？ 空(void)元素有那些？

|   | 块级元素  | 行内元素 |空元素 |
| :------------ |:---------------:| -----:|-----:|
| 常见元素     | div、h1-h6、p、form、ul、ol、li 、table、thead、th、tbody、tr、td、tfoot、| span、strong、em、b、input、select、textarea| link、meta、br、input、img|
| 特性      |独占一行，默认情况下宽度自动填满其父元素的宽度 | 不会独占一行，宽度随内容变化，相邻行内元素会排列在同一行，知道排不下才换行 |没有内容的 HTML 内容被称为空元素|
| width、height属性 | 可以设置   |无效，可以通过line-height来设置     |无|
| margin、padding属性 | 可以设置        |  水平方向的padding-left、padding-right、margin-left、margin-right都产生边距效果，但竖直方向的padding-top、padding-bottom、margin-top、margin-bottom却不会产生边距效果。|无|
| 对应的相关display属性 | block       |   inline |无|
| 切换 | display:inline变成行内元素        |    display:block变成块级元素 |无 |

##### 4.置换元素和非置换元素

img是内联元素，但可以设置宽高，这是为什么呢？

置换元素：
1.一个 内容 不受CSS视觉格式化模型控制，CSS渲染模型并不考虑对此内容的渲染，
2.且元素本身一般拥有固有尺寸（宽度，高度，宽高比）的元素，被称之为置换元素。
3.浏览器根据元素的标签和属性，来决定元素的具体显示内容。

<img>、<input>、<textarea>、<select>、<object>都是置换元素

##### 5.标签中alt和title的区别

alt属性是在你的图片因为某种原因不能加载时在页面显示的提示信息，它会直接输出在原本加载图片的地方;
title属性是在你鼠标悬停在该图片上时显示一个小提示，鼠标离开就没有了，有点类似jQuery的hover，你可以自己试试，另外，HTML的绝大多数标签都支持title属性，title属性就是专门做提示信息的;

##### 6.form表单的属性和使用和表单控件

**form属性**

1.name:表单的名字(通过为表单命名可以控制表单与后台程序之间的关系)
2.method:定义表单提交数据时的方式,一般是get或者post
    --get:向服务器要数据时使用特点：1、明文提交,所提交的数据时可以显示在地址栏上的-安全性较低 2、提交数据有大小限制-最大为2KB
    --post:将数据提交给服务器处理时使用特点：1、隐式提交-所提交的内容是不会显示在地址栏上的，安全性较高2、无大小限制
3.action:定义表单被提交时发生的动作
4.enctype:编码类型，即表单数据进行编码的方式,允许表单将什么样的数据提交给服务器
    --application/x-www-form-urlencoded	在发送前编码所有字符（默认）
    --multipart/form-data	不对字符编码。在使用包含文件上传控件的表单时，必须使用该值。
    --text/plain	空格转换为 "+" 加号，但不对特殊字符编码。
4.target:设置返回信息的显示方式，设置或获取目标内容要显示于哪个窗口或框架
    -- _ blank:将返回信息显示在新开的浏览器窗口中
    -- _ parent:将返回信息显示在父级浏览器窗口中
    -- _ self:将返回信息显示在当前浏览器窗口中
    -- _ top:将返回信息显示在顶级浏览器窗口中

**form控件**

文本框/单选框/复选框/按钮/隐藏域/文件选择框/多行文本框/选择框/label元素/fieldset和legend为控件分组



##### 7.列表

定义列表
```
<dl>
    <dt></dt>
    <dd></dd>
</dl>
```

有序列表
```
<ol>
    <li></li>
</ol>
```

无序列表
```
<ul>
    <li></li>
</ul>
```


##### 5.实现div的跳转

```
<div onclick="window.open('http://www.mygaytrip.com');>跳转页面，在新建窗口打开网页</div>  
<div onclick="window.location.href='http://www.mygaytrip.com';">跳转页面，在当前窗口打开网页</div>  
<div onclick="window.open('enterpriseSocial.html','_self')" >跳转页面，在当前窗口打开网页</div>
```

##### 6.介绍一下你对浏览器内核的理解？常见的浏览器内核有哪些？

##### 13.iframe有那些缺点？


##### 14.Label的作用是什么？是怎么用的？（加 for 或 包裹）


##### 16.如何实现浏览器内多个标签页之间的通信? (阿里)


##### 17.webSocket如何兼容低浏览器？(阿里)


##### 18.页面可见性（Page Visibility API） 可以有哪些用途？


##### 19.如何在页面上实现一个圆形的可点击区域？


##### 20.实现不使用 border 画出1px高的线，在不同浏览器的Quirksmode和CSSCompat模式下都能保持同一效果。


##### 21.网页验证码是干嘛的，是为了解决什么安全问题？


##### 22.title与h1的区别、b与strong的区别、i与em的区别？

doctype(文档类型) 的作用是什么？
浏览器标准模式 (standards mode) 、几乎标准模式（almost standards mode）和怪异模式 (quirks mode) 之间的区别是什么？
HTML 和 XHTML 有什么区别？
如果页面使用 'application/xhtml+xml' 会有什么问题吗？
如果网页内容需要支持多语言，你会怎么做？
在设计和开发多语言网站时，有哪些问题你必须要考虑？
请解释 <script>、<script async> 和 <script defer> 的区别。
为什么通常推荐将 CSS <link> 放置在 <head></head> 之间，而将 JS <script> 放置在 </body> 之前？你知道有哪些例外吗？
什么是渐进式渲染 (progressive rendering)？
你用过哪些不同的 HTML 模板语言？
如果src=' '会怎样
##### 5.页面导入样式时，使用link和@import有什么区别？
