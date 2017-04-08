##### 1.Doctype作用？

1.1 DOCTYPE位于HTML标签前，用于告诉浏览器用什么文档标准解析这个文档的标记

标准就是W3C发布的一个文档类型定义(DTD)中包含的规则（包含一系列的标记attributes和properties，它们用于标记Web文档的内容；
此外还包括一些规则，它们规定了哪些标记能出现在其他哪些标记中。）

1.2 文档中的标记不遵循DOCTYPE声明指定的DTD，则无法正确显示网页

1.3 不声明DOCTYPE的话，浏览器会使用内建的默认DTD(文档类型定义)

##### 2.标准模式与怪异模式如何区分？它们有何意义?如何判断模式？

标准模式：浏览器遵循w3c标准的页面解析模式
怪异模式：使用浏览器自己的方式解析执行代码，因为不同浏览器解析执行的方式不一样，

通过DTD申明指定页面解析模式。
HTML5都通过!doctype html采用标准模式解析，不基于SGML，因此不需要对DTD进行引用
没有使用DTD声明或者使用HTML4以下(不包括HTML4)的DTD声明的适合，基本都是怪异模式呈现

**区别**

标准模式中: IE6不认识!important声明，IE7、IE8、Firefox、Chrome等浏览器认识；

怪异模式中: IE6/7/8都不认识!important声明，这只是区别的一种，还有很多其它区别。

**如何判定现在是标准模式还是怪异模式**

方法一：执行以下代码
```
alert(window.top.document.compatMode) ;
//BackCompat  表示怪异模式
//CSS1Compat  表示标准模式
```

方法二：jquery为我们提供的方法，如下：
```
// 必须是 1.8 之前(不含1.8)的 jQuery 版本
document.writeln( $.boxModel );

// 1.3 ~ 1.7.x 请使用 $.support.boxModel 替代
document.writeln( $.support.boxModel );
```
如果浏览器使用标准盒模型渲染当前页面，则返回true，否则返回false。

##### 3.<head>头标签和<meta>标签

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

meta是html语言head区的一个辅助性标签，它提供用户不可见的信息。合适的meta标签可以大大提升网站页面的可用性。

meta标签的作用有：

1.定义页面使用语言(charset)

2.控制页面缓存(http-equiv--Pragma,cookie,cache-control)

3.自动刷新并指向新的页面(http-equiv--refresh)

4.控制网页显示的窗口(http-equiv--Window-target)

5.搜索引擎优化(name)

**meta标签的属性**--charset，http-equiv，name

charset:声明文档使用的字符编码

http-equiv：相当于http的文件头作用，它可以向浏览器传回一些有用的信息，以帮助浏览器正确地显示网页内容。与之对应的属性值为content，content中的内容其实就是各个参数的变量值。

name属性：主要用于描述网页，与之对应的属性值为content，content中的内容主要是便于搜索引擎机器人查找信息和分类信息用的。

**meta之http-equiv**

http-equiv属性值：expires/cache-control/pragma/refresh/Set-Cookie/Window-target

1.expires--可以用于设定网页的到期时间。一旦网页过期，必须到服务器上重新传输。

```
<meta http-equiv="expires"content="Fri,12Jan200118:18:18GMT">
```

2.Pragma(cache模式)--禁止浏览器从本地计算机的缓存中访问页面内容。这样设定，访问者将无法脱机浏览。

```
<meta http-equiv="Pragma"content="no-cache">
```

3.Refresh(刷新)--自动刷新并指向新页面。

```
<meta http-equiv="Refresh"content="2;URL=http://www.haorooms.com"> //(注意后面的引号，分别在秒数的前面和网址的后面)
```

4.Set-Cookie--如果网页过期，那么存盘的cookie将被删除。

```
<meta http-equiv="Set-Cookie"content="cookie value=xxx;expires=Friday,12-Jan-200118:18:18GMT；path=/">
```

5.Window-target(显示窗口的设定) --强制页面在当前窗口以独立页面显示。

```
<meta http-equiv="Window-target" content="_top">
```

6.Cache-Control指定请求和响应遵循的缓存机制。

请求时的缓存指令包括no-cache、no-store、max-age、max-stale、min-fresh、on
ly-if-cached，响应消息中的指令包括public、private、no-cache、no-store、no-transform、must-revalidate、proxy-revalidate、max-age。(可以参考浏览器缓存)

```
//比如
<meta http-equiv="cache-control" content="no-cache">  
```

7.页面跳转，只用于IE

http://www.haorooms.com/post/liulanq_think_ie

**meta之name**

name属性值：--keywords/description/robots/author/generator/copyright/revisit-after

```
<meta name="参数"content="具体的参数值">。
```

1.Keywords--告诉搜索引擎网页的关键字是什么

```
<meta name="keywords" content="meta总结,html,meta属性">
```

2.description--告诉搜索引擎网站主要内容

```
<meta name="description" content="meta总结,html,meta属性">
```

3.robots--用来告诉搜索机器人哪些页面需要索引，哪些页面不需要索引。

```
<meta name="robots"content="none">
```
信息参数为all：文件将被检索，且页面上的链接可以被查询；

信息参数为none：文件将不被检索，且页面上的链接不可以被查询；

信息参数为index：文件将被检索；

信息参数为follow：页面上的链接可以被查询；

信息参数为noindex：文件将不被检索，但页面上的链接可以被查询；

信息参数为nofollow：文件将被检索，但页面上的链接不可以被查询；

4.author--标注网页的作者

```
<meta name="author"content="root,root@xxxx.com">
```

5.generator--编辑器,说明网站的采用的什么软件制作。

```
<meta name="generator"content="信息参数"/>
```

6.Copyright--版权

```
<meta name="copyright" content="xxx">
```

7.revisit-after(重访)--通知搜索引擎多少天访问一次

```
<meta name="revisit-after" content="7days">
```


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

```
<img>、<input>、<textarea>、<select>、<object>都是置换元素
```

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

##### 11.实现div的跳转

```
<div onclick="window.open('http://www.mygaytrip.com');>跳转页面，在新建窗口打开网页</div>  
<div onclick="window.location.href='http://www.mygaytrip.com';">跳转页面，在当前窗口打开网页</div>  
<div onclick="window.open('enterpriseSocial.html','_self')" >跳转页面，在当前窗口打开网页</div>
```

##### 12.从前端角度出发谈谈做好seo需要考虑什么?

1.meta标签name属性的设置

2.语义化html标签

3.重要的html代码放前面

4.少用iframe, 搜索引擎不会抓取iframe中的内容

5.图片加上alt

##### 13.src与href的区别

src:嵌入当前资源到当前文档元素定义的位置。也就是用于替换当前元素。比如script和img。
在浏览器下载，编译，执行这个文件之前页面的加载和处理会被暂停。这个过程与把js文件放到<script>标签里类似。这也是建议把JS文件放到底部加载的原因。当然，img标签页与此类似。浏览器暂停加载直到提取和加载图像。

href:指向网络资源所在的位置, 用于在当前文档和引用资源间确定联系。比如link和a
浏览器明白当前资源是一个样式表，页面解析不会暂停（由于浏览器需要样式规则去画或者渲染页面，渲染过程可能会被被暂停）。这与把css文件内容写在<style>标签里不相同，因此建议使用link标签而不是@import来吧样式表导入到html文档里。

##### 13.iframe有那些缺点？
##### 16.如何实现浏览器内多个标签页之间的通信? (阿里)
##### 17.webSocket如何兼容低浏览器？(阿里)
##### 18.页面可见性（Page Visibility API） 可以有哪些用途？
##### 21.网页验证码是干嘛的，是为了解决什么安全问题？
如果网页内容需要支持多语言，你会怎么做？
在设计和开发多语言网站时，有哪些问题你必须要考虑？
你用过哪些不同的 HTML 模板语言？
##### 5.页面导入样式时，使用link和@import有什么区别？
