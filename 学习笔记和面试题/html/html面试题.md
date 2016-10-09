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
##### 4.行内元素有哪些？块级元素有哪些？ 空(void)元素有那些？

|   | 块级元素  | 行内元素 |空元素 |
| :------------ |:---------------:| -----:|-----:|
| 常见元素     | div、h1-h6、p、form、ul、ol、li 、table、thead、th、tbody、tr、td、tfoot、| span、strong、em、b、input、select、textarea| link、meta、br、input、img|
| 特性      |独占一行，默认情况下宽度自动填满其父元素的宽度 | 不会独占一行，宽度随内容变化，相邻行内元素会排列在同一行，知道排不下才换行 |没有内容的 HTML 内容被称为空元素|
| width、height属性 | 可以设置   |无效，可以通过line-height来设置     |无|
| margin、padding属性 | 可以设置        |  水平方向的padding-left、padding-right、margin-left、margin-right都产生边距效果，但竖直方向的padding-top、padding-bottom、margin-top、margin-bottom却不会产生边距效果。|无|
| 对应的相关display属性 | block       |   inline |无|
| 切换 | display:inline变成行内元素        |    display:block变成块级元素 |无 |

##### 5.实现div的跳转
```
<div onclick="window.open('http://www.mygaytrip.com');>跳转页面，在新建窗口打开网页</div>  
<div onclick="window.location.href='http://www.mygaytrip.com';">跳转页面，在当前窗口打开网页</div>  
<div onclick="window.open('enterpriseSocial.html','_self')" >跳转页面，在当前窗口打开网页</div>
```
##### 5.页面导入样式时，使用link和@import有什么区别？

##### 6.介绍一下你对浏览器内核的理解？

##### 7.常见的浏览器内核有哪些？

##### 8.html5有哪些新特性、移除了那些元素？如何处理HTML5新标签的浏览器兼容问题？如何区分 HTML 和 HTML5？

##### 9.简述一下你对HTML语义化的理解？

##### 10.HTML5的离线储存怎么使用，工作原理能不能解释一下？


##### 11.浏览器是怎么对HTML5的离线储存资源进行管理和加载的呢？


##### 12.请描述一下 cookies，sessionStorage 和 localStorage 的区别？


##### 13.iframe有那些缺点？


##### 14.Label的作用是什么？是怎么用的？（加 for 或 包裹）


##### 15.HTML5的form如何关闭自动完成功能？


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
如果把 HTML5 看作做一个开放平台，那它的构建模块有哪些？
请描述 cookies、sessionStorage 和 localStorage 的区别。
请解释 <script>、<script async> 和 <script defer> 的区别。
为什么通常推荐将 CSS <link> 放置在 <head></head> 之间，而将 JS <script> 放置在 </body> 之前？你知道有哪些例外吗？
什么是渐进式渲染 (progressive rendering)？
你用过哪些不同的 HTML 模板语言？
