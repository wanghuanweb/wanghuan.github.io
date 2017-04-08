##### 43.JQuery的源码看过吗？能不能简单概况一下它的实现原理？
##### 45.jquery中如何将数组转化为json字符串，然后再转化回来？
##### 48.jQuery 的队列是如何实现的？队列可以用在哪些地方？
##### 52.jQuery 是通过哪个方法和 Sizzle 选择器结合的？（jQuery.fn.find()进入Sizzle）
##### 54.Jquery与jQuery UI有啥区别？
##### 56.jquery 中如何将数组转化为json字符串，然后再转化回来？
##### 57.jQuery和Zepto的区别？各自的使用场景？
##### 59.Zepto的点透问题如何解决？
##### 60.jQueryUI如何自定义组件?

基本知识点主要有：选择器，改变结果集，DOM操作，事件，ajax，动画

**选择器**--css选择器，jquery特有的表达式

1.css选择器

```
$(document) //选择整个文档对象

$('#myId') //选择ID为myId的网页元素

$('div.myClass') // 选择class为myClass的div元素

$('input[name=first]') // 选择name属性等于first的input元素
```

2.jquery特有表达式

```
$('a:first') //选择网页中第一个a元素

　　$('tr:odd') //选择表格的奇数行

　　$('#myForm :input') // 选择表单中的input元素

　　$('div:visible') //选择可见的div元素

　　$('div:gt(2)') // 选择所有的div元素，除了前三个

　　$('div:animated') // 选择当前处于动画状态的div元素
```

**改变结果集--筛选**

改变结果集

1.过滤器
```
$('div').has('p'); // 选择包含p元素的div元素
　　$('div').not('.myClass'); //选择class不等于myClass的div元素
　　$('div').filter('.myClass'); //选择class等于myClass的div元素
　　$('div').first(); //选择第1个div元素
　　$('div').eq(5); //选择第6个div元素
```

2.遍历的一些方法

children()查找子元素,find()查找所有后代元素
parent()找出父元素,parents()查找所有父辈元素，parentsUntil()查找当前元素的所有的父辈元素，直到遇到匹配的那个元素为止。closest()会首先检查当前元素是否匹配，如果匹配则直接返回元素本身。如果不匹配则向上查找父元素，一层一层往上，直到找到匹配选择器的元素。
next(),nextAll(),nextUntil(),prev(),prevAll(),prevUntil(),siblings()

**DOM操作**

是实例方法：
操作元素的方法，是定义在构造函数的prototype对象上的方法，即jQuery.prototype.method()，所以必须生成实例（即选中元素）后使用。

插入：html(),text(),父子(append(),appendTo(),prepend(),prependTo()),兄弟(before(),after(),insertBefore(),insertAfter())
删除：empty()移除指定元素的子节点,remove()带节点一起删除,detach()删除但保留事件等数据
替换：replaceWith(),replaceAll()
拷贝：clone(),true为深拷贝，可以拷贝事件等

**工具方法**

是静态方法：
除了对选中的元素进行操作以外，还提供一些与元素无关的工具方法（utility）。
它是定义在jQuery构造函数上的方法，即jQuery.method()，所以可以直接使用。

**事件**

鼠标事件：

mousedown/mouseup/click/dblclick/mousemove/mouseover/mouseout/mouseenter/mouseleave
mouseover/mouseout支持事件冒泡，离开子元素触发 mouseenter/mouseleave不支持事件冒泡，离开子元素不触发
hover(handlerIn,handlerOut)--其实就是mouseenter和mouseleave的结合

表单事件：

focusin/focusout支持事件冒泡  focus/blur不支持事件冒泡
change--input/textarea/select改变时触发
select--textarea或input文本类型被选触发
submit事件

键盘事件：

keydown/keyup所有键，按下键盘（长时间按键，只返回一个事件）
keypress数字和字母键，按下键盘（长时间按键，将返回多个事件）

加载事件：

.load() 元素加载完毕
.ready() DOM加载完成
.unload() 用户离开页面

其他事件：

.resize() 浏览器窗口的大小发生改变
.scroll() 滚动条的位置发生变化
.toggle() 根据鼠标点击的次数，依次运行多个函数

绑定事件：

bind(),live(),delegate(),on(),off()

事件对象：

event.pageX 事件发生时，鼠标距离网页左上角的水平距离
event.pageY 事件发生时，鼠标距离网页左上角的垂直距离　　
event.which 鼠标按下了哪一个键
event.data 在事件对象上绑定数据，然后传入事件处理函数
event.target 事件针对的网页元素，在过程中target不变
this和event.currentTarget是变化的，冒泡当前触发事件DOM对象
event.type 事件的类型（比如click）
event.preventDefault() 阻止事件的默认行为（比如点击链接，会自动打开新页面）
event.stopPropagation() 停止事件向上层元素冒泡

**动画**

显示隐藏：([speed],[easing],[fn])--修改display
hide(),show(),toggle()

上卷下拉：([speed],[easing],[fn])--修改display
slideDown(),slideUp(),slideToggle()

淡入淡出：([speed],[easing],[fn])--修改opacity
faseIn(),faseOut(),fadeToggle(),fadeTo()

```
("p").fadeIn("fast",function(){
   alert("Animation Done.");
 });
```

动画(params,[speed],[easing],[fn])

```
$("p").animate({
   opacity: 'show'
 }, "slow", "easein");
 $('div').animate(
　　　　{
　　　　　　left : "+=50", //不断右移
　　　　　　opacity : 0.25 //指定透明度
　　　　},
　　　　300, // 持续时间
　　　　function() { alert('done!'); } //回调函数
　　);
```
