##### 1.Doctype作用？

1.1 DOCTYPE位于HTML标签前，用于告诉浏览器用什么文档标准解析这个文档的标记

标准就是W3C发布的一个文档类型定义(DTD)中包含的规则（包含一系列的标记attributes和properties，它们用于标记Web文档的内容；
此外还包括一些规则，它们规定了哪些标记能出现在其他哪些标记中。）

1.2 文档中的标记不遵循DOCTYPE声明指定的DTD，则无法正确显示网页

1.3 不声明DOCTYPE的话，浏览器会使用内建的默认DTD(文档类型定义)

##### 2.严格模式与混杂模式如何区分？它们有何意义?如何判断模式？

1.严格模式是浏览器按照规范渲染页面

2.混杂模式是以宽松的一种向后兼容的方式显示。混杂模式的浏览器兼容老版本浏览器，使用一个比较怪异的方式渲染网页，确保老网页可以显示。

3.DOCTYPE不存在或格式不正确会导致文档以混杂模式呈现。

**如何判定现在是标准模式还是怪异模式**

方法一：执行以下代码
```
alert(window.top.document.compatMode) ;
//BackCompat  表示怪异模式
//CSS1Compat  表示标准模式
```

方法二：jquery为我们提供的方法，如下：
```
alert($.boxModel)
alert($.support.boxModel)
```

##### 3.<head>头标签

head头标签的格式

```
<head>
	<meta charset="utf-8">
	<meta http-equiv="x-ua-compatible" content="ie=edge">---E=edge告诉IE使用最新的引擎渲染网页
	<meta name="viewport" content="width=device-width,initial-scale=1">

	<title>页面标题</title>
</head>
```

**meta**

meta标签是head头中的辅助性标签，位于html文档的head和title中间，它提供用户不可见的信息。合适的meta标签可以大大提升网站页面的可用性。

3个meta标签必须放在 head 的最前面；其他任何的 head 内容必须在这些标签的后面

charset:声明文档使用的字符编码
http-equiv：相当于http的文件头作用，它可以向浏览器传回一些有用的信息，以帮助浏览器正确地显示网页内容。
name属性：主要用于描述网页，与之对应的属性值为content，content中的内容主要是便于浏览器，搜索引擎等机器人识别，等等。

为移动设备添加viewport：
content 参数：
width viewport 宽度(数值/device-width)
height viewport 高度(数值/device-height)
initial-scale 初始缩放比例
maximum-scale 最大缩放比例
minimum-scale 最小缩放比例
user-scalable 是否允许用户缩放(yes/no)
```
//而如果你的网站不是响应式的，请不要使用 initial-scale 或者禁用缩放。
<meta name="viewport" content="width=device-width, height=device-height, initial-scale=1, maximum-scale=1, user-scalable=no">
```

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




**HTML5应用程序缓存**
##### 10.HTML5的本地缓存，离线储存怎么使用，工作原理能不能解释一下？
##### 11.浏览器是怎么对HTML5的离线储存资源进行管理和加载的呢？
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

```
文本框/单选框/复选框/按钮/隐藏域/文件选择框/多行文本框/选择框/label元素/fieldset和legend为控件分组
input(type=text/password/radio/checkbox/submit/reset/button/file)textarea/select-option/fieldset-legend/details-summary
<form name="form1" action="" method="" target="">
	<p>用户姓名：<input type="text"></p>
	<p>用户密码：<input type="password"></p>
	<p>性别：
		<input type="radio" name="sex" value="男">男
		<input type="radio" name="sex" value="女">女
	</p>
	<p>兴趣爱好：
		<input type="checkbox" name="habits" value="吃">吃
		<input type="checkbox" name="habits" value="喝">喝
		<input type="checkbox" name="habits" value="玩">玩
		<input type="checkbox" name="habits" value="乐">乐
	</p>
	<p>按钮：
		<input type="submit" name="btnsbt" value="提交">
		<input type="reset" name="btnrst"  value="重置">
		<input type="button" name="btnbtn" value="普通按钮">
	</p>
	<p>请上传文件：
		<input type="file" name="txtFile">
	</p>
	<p>自我介绍：
		<textarea name="txt" rows="8" cols="80"></textarea>
	</p>
	<p>意向选择城市：
		<select name="cities">
			<option value="北京">北京</option>
			<option value="上海">上海</option>
			<option value="广州">广州</option>
		</select>
	</p>
	<!--  label-->
	<p>用户性别：
		<input type="radio" name="sex" value="男" id="man"> <label for="man">男</label>
		<input type="radio" name="sex" value="女" id="woman"> <label for="woman">女</label>
	</p>
	<!--  fieldset-legend ps:legend 元素为 fieldset 元素定义标题（caption）-->
	<fieldset>
		<legend>请输入个人信息</legend>
		用户名：<input type="text">
		<br/>
		密码：<input type="password">
	</fieldset>
	<!--  <details> 标签用于描述文档或文档某个部分的细节。<summary> 标签包含 details 元素的标题--HTML5标签-->
	<details>
		<summary>用户基本信息</summary>
		<p>姓名：王欢<p>
		<p>性别：女</p>
	</details>
	<!-- 度量衡(进度条)-->
	<div>
		<meter min="0" max="100" value="50" tile="50%">该浏览器户不支持meter标签</meter>
	</div>
	<!--时间元素-->
	<div>
		明年<time datetime="2017-02-14T0:0:0">情人节</time>约吗？
	</div>
	<!--高亮文本显示-->
	<div>
		这是一段<mark>高亮</mark>显示的文本
	</div>  
</form>
```

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

##### 8.Label的作用是什么？是怎么用的？

1.for属性是表示label要绑定的HTML元素，点击这个label标签之后，所绑定的元素获得焦点。

<Label FOR="InputBox">姓名</Label><input ID="InputBox" type="text">

2.表示访问Label标签所绑定的元素的热键，当您按下热键，所绑定的元素将获取焦点。

<Label FOR="InputBox" ACCESSKEY＝"N">姓名</Label><input ID="InputBox" type="text">


##### 9.介绍一下你对浏览器内核的理解？常见的浏览器内核有哪些？

通常所谓的浏览器内核也就是浏览器所采用的渲染引擎，渲染引擎决定了浏览器如何显示网页的内容以及页面的格式信息。

主要分成两部分：渲染引擎(layout engineer或Rendering Engine)和JS引擎。

渲染引擎：负责取得网页的内容(HTML、XML、图像等等)、整理讯息(例如加入CSS等)，以及计算网页的显示方式，后会输出至显示器或打印机。浏览器的内核的不同对于网页的语法解释会有不同，所以渲染的效果也不相同。所有网页浏览器、电子邮件客户端以及其它需要编辑、显示网络内容的应用程序都需要内核。

JS引擎则：解析和执行javascript来实现网页的动态效果。
1）Trident: IE 以Trident 作为内核引擎；
2) Gecko: Firefox 是基于 Gecko 开发；
3）WebKit: Safari, Google Chrome,傲游3,猎豹浏览器,百度浏览器 opera浏览器；
4）Presto: Opera的内核

##### 10.title与h1的区别、b与strong的区别、i与em的区别？

**b和strong的区别**

盲人朋友使用阅读设备阅读网络时：<strong>会重读，<b>不会
<b>这个标签对应 bold，即文本加粗，其目的仅仅是为了加粗显示文本，是一种样式／风格需求；
<strong>这个标签意思是加强字符的语气，表示该文本比较重要，提醒读者／终端注意。为了达到这个目的，浏览器等终端将其加粗显示；

总结：<b>为了加粗而加粗，<strong>为了标明重点而加粗，也可以用其它方式来强调，比如下划线，比如字体加大，比如红色，等等，可以通过css来改变strong的具体表现

**i和em的区别**

I是Italic(斜体)，而em是emphasize(强调)。

**title与h1**

h1突出文章主题，面对用户，更突出其视觉效果，突出网站标题或关键字用title。

##### 5.实现div的跳转

```
<div onclick="window.open('http://www.mygaytrip.com');>跳转页面，在新建窗口打开网页</div>  
<div onclick="window.location.href='http://www.mygaytrip.com';">跳转页面，在当前窗口打开网页</div>  
<div onclick="window.open('enterpriseSocial.html','_self')" >跳转页面，在当前窗口打开网页</div>
```


##### 13.iframe有那些缺点？
##### 16.如何实现浏览器内多个标签页之间的通信? (阿里)
##### 17.webSocket如何兼容低浏览器？(阿里)
##### 18.页面可见性（Page Visibility API） 可以有哪些用途？
##### 19.如何在页面上实现一个圆形的可点击区域？
##### 21.网页验证码是干嘛的，是为了解决什么安全问题？
如果网页内容需要支持多语言，你会怎么做？
在设计和开发多语言网站时，有哪些问题你必须要考虑？
你用过哪些不同的 HTML 模板语言？
##### 5.页面导入样式时，使用link和@import有什么区别？
