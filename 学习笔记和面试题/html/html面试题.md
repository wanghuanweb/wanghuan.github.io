##### 1.Doctype作用？

1.1DOCTYPE位于HTML标签前，用于告诉浏览器用什么文档标准解析这个文档的标记
###### ps：
标准就是W3C发布的一个文档类型定义DTD中包含的规则（包含一系列的标记attributes和properties，它们用于标记Web文档的内容；此外还包括一些规则，它们规定了哪些标记能出现在其他哪些标记中。）
1.2文档中的标记不遵循DOCTYPE声明指定的DTD，则无法正确显示网页

1.3不声明DOCTYPE的话，浏览器会使用内建的默认DTD

##### 2.严格模式与混杂模式如何区分？它们有何意义?

2.1严格模式是浏览器根据规范显示页面

2.2混杂模式是以一种向后兼容的方式显示

2.3意义：决定了浏览器用哪种规范去解析网页，也就是浏览器如何渲染网站
触发：浏览器根据doctype是否存在和使用的是那种dtd来决定。






##### 3.HTML5 为什么只需要写 <!DOCTYPE HTML>？
3.1 HTML5 不基于 SGML，因此不需要对DTD进行引用，但是需要doctype来规范浏览器的行为（让浏览器按照它们应该的方式来运行）；
3.2 而HTML4.01基于SGML,所以需要对DTD进行引用，才能告知浏览器文档所使用的文档类型。
###### ps：
 SGML (Standard Generalized Markup Language) 标准通用标记语言
##### 10.HTML5的离线储存怎么使用，工作原理能不能解释一下？
##### 11.浏览器是怎么对HTML5的离线储存资源进行管理和加载的呢？
如果把 HTML5 看作做一个开放平台，那它的构建模块有哪些？
##### 15.HTML5的form如何关闭自动完成功能？



##### 3.简述一下你对HTML语义化的理解？HTML5的新元素？新属性？

**html5新增元素**

文章结构中的标签：header/nav/aside/articlefooter/section/details/summary
图像：<figcaption>，<figure>
绘画标签：canvas
视频和音频标签：video和audio元素
表单中的标签：datalist/keygen/output

**html5删除元素**

<big>，<center>，<font>，<tt>，<strike>
<acronym>，<applet>

**html5新增特性**

1.

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

##### 5.实现div的跳转

```
<div onclick="window.open('http://www.mygaytrip.com');>跳转页面，在新建窗口打开网页</div>  
<div onclick="window.location.href='http://www.mygaytrip.com';">跳转页面，在当前窗口打开网页</div>  
<div onclick="window.open('enterpriseSocial.html','_self')" >跳转页面，在当前窗口打开网页</div>
```

##### 6.介绍一下你对浏览器内核的理解？常见的浏览器内核有哪些？

##### 12.请描述一下 cookies，sessionStorage 和 localStorage 的区别？

在HTML5中，sessionStorage保存数据的方法正确的是（      ）
：sessionStorage.setItem("键名","键值");

http://www.cnblogs.com/yuzhongwusan/archive/2011/12/19/2293347.html

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
使用 data- 属性的好处是什么？
请描述 cookies、sessionStorage 和 localStorage 的区别。
请解释 <script>、<script async> 和 <script defer> 的区别。
为什么通常推荐将 CSS <link> 放置在 <head></head> 之间，而将 JS <script> 放置在 </body> 之前？你知道有哪些例外吗？
什么是渐进式渲染 (progressive rendering)？
你用过哪些不同的 HTML 模板语言？
img标签中alt和title的区别
如果src=' '会怎样
form表单的属性
##### 5.页面导入样式时，使用link和@import有什么区别？
