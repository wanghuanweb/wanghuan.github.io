基本知识点主要有：选择器，改变结果集，DOM操作，事件，ajax，动画
从这几个方面进行性能优化

1.选择器
--最快的选择器是id选择器和元素标签选择器
--class选择器比较慢
--最慢的选择器：伪类选择器和属性选择器

--尽量使用id选择器
单个元素：使用id选择器寻找元素
多个元素：使用最近的父ID去寻找
var traffic_lights = $('#traffic_light input');

--第二快的是tag选择器


--不要叠加多个ID
请勿如下书写：$('#something#children');
这样就够了：$('#children');

2.理解父元素和子元素之间的关系

几个选择器，都是从父元素中获取子元素

$parent.find('.child');--最快的方法，因为直接调用js的原生方法getElementById，getElementByName，getElementByTagName等
$('.child',$parent);--自动把这条语句转成$.parent.find('child')，这会导致一定的性能损失。它比最快的形式慢了5%-10%
$parent.children('.child')--在jQuery内部，会使用$.sibling()和javascript的nextSibling()方法，一个个遍历节点。它比最快的形式大约慢50%。
$('#parent > .child')--jQuery内部使用Sizzle引擎，处理各种选择器。Sizzle引擎的选择顺序是从右到左，所以这条语句是先选.child，然后再一个个过滤出父元素#parent，这导致它比最快的形式大约慢70%
$('#parent .child')--这条语句与上一条是同样的情况。但是，上一条只选择直接的子元素，这一条可以于选择多级子元素，所以它的速度更慢，大概比最快的形式慢了77%。

3.缓存jquery对象

```
$('#traffic_light input.on).bind('click', function(){...});
$('#traffic_light input.on).css('border', '3px dashed yellow');
$('#traffic_light input.on).css('background-color', 'orange');
$('#traffic_light input.on).fadeIn('slow');
```
变成
```
var $active_light = $('#traffic_light input.on');
$active_light.bind('click', function(){...});
$active_light.css('border', '3px dashed yellow');
$active_light.css('background-color', 'orange');
$active_light.fadeIn('slow');
```

4.少改动DOM结构

改动DOM结构开销很大，因此不要频繁使用.append()、.insertBefore()和.insetAfter()这样的方法。
如果要插入多个元素，就先把它们合并，然后再一次性插入

如果你要在DOM元素上储存数据，不要写成下面这样：
```
var elem = $('#elem');
　　elem.data(key,value);
```
而要写成
```
var elem = $('#elem');
　　$.data(elem[0],key,value);
```
后一种写法要比前一种写法，快了将近10倍。因为elem.data()方法是定义在jQuery函数的prototype对象上面的，而$.data()方法是定义jQuery函数上面的，调用的时候不从复杂的jQuery对象上调用，所以速度快得多。


5.使用链式操作

```
$('div').find('h3').eq(2).html('Hello');
```
采用链式写法时，jQuery自动缓存每一步的结果，因此比非链式写法要快。根据测试，链式写法比（不使用缓存的）非链式写法，大约快了25%。

6.使用事件委托

```
$("td").on("click", function(){
　　$(this).toggleClass("click");
});
```
写成
```
$("table").on("click", "td", function(){
　　$(this).toggleClass("click");
});
```
