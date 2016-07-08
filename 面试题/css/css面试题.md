##### 1.介绍一下标准的CSS的盒子模型？低版本IE的盒子模型有什么不同的？

1.1分类：IE盒子模型和标准W3C盒子模型

1.2盒子模型：content、padding、border、margin

1.3区别（IE的content部分把 border 和 padding计算了进去）
###### W3C的标准Box Model:

###### 外盒尺寸计算：

Element空间高度 = content height + padding + border + margin   

Element 空间宽度 = content width + padding + border + margin   

###### 内盒尺寸计算：

 Element Height = content height + padding + border

 Element Width = content width + padding + border

###### 传统下Box Model

###### 外盒尺寸计算：

Element空间高度 = content Height + margin

Element空间宽度 = content Width + margin

###### 内盒尺寸计算：

 Element Height = content Height(Height包含了元素内容宽度，边框宽度，内距宽度)   

 Element Width = content Width(Width包含了元素内容宽度、边框宽度、内距宽度)
##### 2.CSS选择符有哪些？

###### 2.1 通配符选择器

*

###### 2.2 id选择器

(# idName)

###### 2.3 类选择器

(.className)类名中**包含**className即应用样式--多类选择器

###### 2.4 属性选择器

(a[attribute = attributeName])

**简单属性值选择**

有calss属性(值不限)的所有h1元素：**h1[class]**；

包含title属性的所有元素：**\*[title]**

同时包含href和title属性的HTML超链接元素：**a[href][title]**

**具体属性值选择**

class属性值是（**完全匹配，不是包含**）urgent warning的planet元素：**planet[class = "urgent warning"]**
**注意和类选择器的区别**

**部分属性值选择**

--其实就是词之间用空格分隔，可以根据其中任意一个词来进行选择，就和类选择器的用法类似

**p[class~="warning"]** 和p.warning是一致的，但是~可以用于所有所有属性，不止class属性

**css3新增--子串匹配属性选择器(3个)**

**[attribute^="value"]**

eg:a[src^="https"] 选择其 src 属性值以 "https" 开头的每个 a 元素。

**[attribute$="value"]**

eg:a[src$=".pdf"] 选择其 src 属性以 ".pdf" 结尾的所有a元素

**[attribute*="value"]**

eg:a[src*="abc"] 选择其 src 属性中包含 "abc" 子串的每个 a 元素。

[class*="col-"]类名中包含col-子串的元素

**特定属性选择类型**

**[attribute|="value"]**

eg：| 只匹配连字符分割的属性，比如*[lang|=en] 匹配 lang属性等于en或者以en-开头的所有元素

###### 2.5 标签选择器

div, h1, p等

###### 2.6 后代选择器

li a

###### 2.7 子选择器

ul > li

不想选择一个任意的后代元素，希望缩小范围，只选择另一个元素的子元素

###### 2.8 相邻选择器

h1 + p

选择紧接在一个h1元素后出现的所有段落，h1要和p元素有共同的父元素

###### 2.9 伪类选择器

a:link,a:visited,a:hover,a:active

p:first-letter,p:first-line,p:first-child

p:before,p:after

**css3新增的伪类选择器**

http://blog.csdn.net/github_34514750/article/details/51122212

eg:p:only-child 选择属于其父元素的唯一子元素的每个 <p> 元素。
##### 3.css哪些属性可以继承？哪些不可继承？


**css属性分类**

**字体属性：**

font-family,font-size,font-style,font-variant,font-weight,font可继承

**ps：** font-size继承的是计算后的实际值

**文本属性：**

word-spacing letter-spacing text-align text-transform text-indent line-height可以继承

text-decoration vertical-align不可继承

**颜色背景属性：**

color可以继承

background(background-color background-image background-repeat background-attachment background-position)不可继承

**边框属性：**

border(border-top border-right border-bottom border-left)(border-width border-style border-color)不可以继承

**定位和布局属性：**

margin padding width height float clear position left top overflow z-index display不可以继承

**列表属性：**

list-style-image, list-style-position,list-style-type, list-style可以继承

##### 4.伪类和伪元素的差别？
1. 伪类是通过给子元素添加一个类，然后定义这个类的样式来实现效果

    eg:  :link :visited :hover :active :focus :first-child

   伪元素是通过添加一个实际的元素，在给元素添加样式来实现效果的。

   eg:  :first-letter :first-line :before :after

       <style>
            p>i:first-child {color: red}
       </style>
       <p>
        <i>first</i>
        <i>second</i>
       </p>
       伪类实现其实是
       <style>
       .first-child {color: red}
       </style>
       <p>
            <i class="first-child">first</i>
            <i>second</i>
       </p>
       http://segmentfault.com/img/bVcccn

        <style>
            p:first-letter {color: red}
       </style>
       <p>I am stephen lee.</p>

       伪元素实现其实是

       <style>
            .first-letter {color: red}
        </style>
        <p><span class='first-letter'>I</span> am stephen lee.</p>


 2.css3中为了区分二者：伪类用: 但是伪元素用::

 但因为兼容性的问题，所以现在大部分还是统一的单冒号，但是抛开兼容性的问题，我们在书写时应该尽可能养成好习惯，区分两者。

##### 5.CSS优先级算法如何计算？

**1.css优先级**

是由四个级别和各个级别出现的次数决定的，值从左到右，左面的最大，一级大于一级

**2.优先级算法**

每个规则对应一个初始四位数：0,0,0,0

若是行内样式优先级，则是1,0,0,0，高于外部定义

    <div style=”color: red”>sjweb</div>

若是ID选择符，则分别加0,1,0,0

若是类选择符，属性选择符，伪类选择符，则分别加0,0,1,0

若是元素选择器，伪类选择器，则分别加0,0,0,1

**3.需要注意**

!important的优先级是最高的，但出现冲突时则需比较”四位数“

优先级相同时，则采用就近原则

继承得来的属性，其优先级最低

**4.实例**

body div p{color: green;}--Specificity值为0,0,0,3

Div # sjweb { font-size:12px;}--Specificity值为 0,1,0,1

html > body div [id=”totals”] ul li > p {color:red;}--Specificity值为 0,0,1,6

##### 6.CSS3新增伪类有那些？

http://blog.csdn.net/github_34514750/article/details/51122212

##### 7.如何居中div？如何居中一个浮动元素？如何让绝对定位的div居中？


##### 8.display有哪些值？说明他们的作用。

**block**

像块类型元素一样显示

**inline**

默认。此元素会被显示为内联元素，元素前后没有换行符。

**inline-block**

像行内元素一样显示，但其内容象块类型元素一样显示

**table**

此元素会作为块级表格来显示（类似 <table>），表格前后带有换行符。

**none**

缺省值。象行内元素类型一样显示。

**inherit**

规定应该从父元素继承 display 属性的值

##### 9.position的值relative和absolute定位原点是？
**static**

1.默认值，没有定位

2.元素出现在正常的流中

**relative**

1.生成相对定位的元素

2.元素在文档流中

3.相对于本来位置的顶部和左部进行定位

**absolute**

1.生成绝对定位的元素

2.元素脱离了文档流

3.位置是相对于position值不为static的第一个父元素进行定位，若没有这样一个祖先，则相对于原始的容器

**fixed**

1.生成绝对定位的元素

2.元素脱离了文档流

3.相对于浏览器窗口进行定位

**inherit**

规定从父元素继承position属性的值

##### 10.CSS3有哪些新特性？

##### 11.请解释一下CSS3的Flexbox（弹性盒布局模型）,以及适用场景？

##### 10.用纯CSS创建一个三角形的原理是什么？

##### 11.一个满屏 品 字布局 如何设计?

##### 12.经常遇到的浏览器的兼容性有哪些？原因，解决方法是什么，常用hack的技巧 ？

##### 13.li与li之间有看不见的空白间隔是什么原因引起的？有什么解决办法？

##### 14.为什么要初始化CSS样式?

##### 15.absolute的containing block计算方式跟正常流有什么不同？

##### 16.CSS里的visibility属性有个collapse属性值是干嘛用的？在不同浏览器下以后什么区别？

##### 17.position跟display、margin collapse、overflow、float这些特性相互叠加后会怎么样？

##### 18.对BFC规范(块级格式化上下文：block formatting context)的理解？

##### 19.CSS权重优先级是如何计算的？

##### 20.请解释一下为什么会出现浮动和什么时候需要清除浮动？清除浮动的方式

##### 21.移动端的布局用过媒体查询吗？

##### 22.使用 CSS 预处理器吗？喜欢那个？

##### 23.CSS优化、提高性能的方法有哪些？

##### 24.浏览器是怎样解析CSS选择器的？

##### 25.在网页中的应该使用奇数还是偶数的字体？为什么呢？

##### 26.margin和padding分别适合什么场景使用？

##### 27.抽离样式模块怎么写，说出思路，有无实践经验？[阿里航旅的面试题]

##### 28.元素竖向的百分比设定是相对于容器的高度吗？

##### 29.全屏滚动的原理是什么？用到了CSS的那些属性？

##### 30.什么是响应式设计？响应式设计的基本原理是什么？如何兼容低版本的IE？

##### 31.视差滚动效果，如何给每页做不同的动画？（回到顶部，向下滑动要再次出现，和只出现一次分别怎么做？）

##### 32.::before 和 :after中双冒号和单冒号 有什么区别？解释一下这2个伪元素的作用。

##### 33.如何修改chrome记住密码后自动填充表单的黄色背景 ？

##### 34.你对line-height是如何理解的？

##### 35.设置元素浮动后，该元素的display值是多少？（自动变成display:block）

##### 36.怎么让Chrome支持小于12px 的文字？

##### 37.让页面里的字体变清晰，变细用CSS怎么做？（-webkit-font-smoothing: antialiased;）

##### 38.font-style属性可以让它赋值为“oblique” oblique是什么意思？

##### 39.position:fixed;在android下无效怎么处理？

##### 40.如果需要手动写动画，你认为最小时间间隔是多久，为什么？（阿里）

##### 41.display:inline-block 什么时候会显示间隙？(携程)

##### 42.overflow: scroll时不能平滑滚动的问题怎么处理？

##### 43.有一个高度自适应的div，里面有两个div，一个高度100px，希望另一个填满剩下的高度。

##### 44.png、jpg、gif 这些图片格式解释一下，分别什么时候用。有没有了解过webp？

##### 45.什么是Cookie 隔离？（或者说：请求资源的时候不要让它带cookie怎么做）

##### 46.style标签写在body后与body前有什么区别？

##### 47.什么是CSS 预处理器 / 后处理器？
