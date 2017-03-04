# 2016年百度IFE春季班
## Demo 
task37 任务要求地址：<https://github.com/pkjy/ife-task/tree/gh-pages/2016_spring/part3/task37><br>
task37 在线预览地址：<http://pkjy.github.io/ife-task/2016_spring/part3/task37/>

task38 任务要求地址：<https://github.com/pkjy/ife-task/tree/gh-pages/2016_spring/part3/task38><br>
task38 在线预览地址：<http://pkjy.github.io/ife-task/2016_spring/part3/task38/>

task39 任务要求地址：<https://github.com/pkjy/ife-task/tree/gh-pages/2016_spring/part3/task39><br>
task39 在线预览地址：<http://pkjy.github.io/ife-task/2016_spring/part3/task39/>

task40 任务要求地址：<https://github.com/pkjy/ife-task/tree/gh-pages/2016_spring/part3/task40><br>
task40 在线预览地址：<http://pkjy.github.io/ife-task/2016_spring/part3/task40/>

task41 任务要求地址：<https://github.com/pkjy/ife-task/tree/gh-pages/2016_spring/part3/task41><br>
task41 在线预览地址：<http://pkjy.github.io/ife-task/2016_spring/part3/task41/>

task43 任务要求地址：<https://github.com/pkjy/ife-task/tree/gh-pages/2016_spring/part3/task43><br>
task43 在线预览地址：<http://pkjy.github.io/ife-task/2016_spring/part3/task43/>

task44 任务要求地址：<https://github.com/pkjy/ife-task/tree/gh-pages/2016_spring/part3/task44><br>
task44 在线预览地址：<http://pkjy.github.io/ife-task/2016_spring/part3/task44/>

task45 任务要求地址：<https://github.com/pkjy/ife-task/tree/gh-pages/2016_spring/part3/task45><br>
task45 在线预览地址：<http://pkjy.github.io/ife-task/2016_spring/part3/task45/>
## IFE春季班第三阶段任务

　　 第三阶段的主要目标是帮助大家 综合练习HTML，CSS，JavaScript。第三阶段任务从 `4月11日` 开始，持续到 `5月4日`。当然，您也可以在这个时间以后继续自行实践练习。第三阶段的任务主要是为第四阶段的大任务进行准备，会有比较大的连贯性。

　　第三阶段任务一共有 3 个系列 13 个题目，如下：
* 系列任务一：RIA 问卷管理平台准备工作

> **任务三十七**：浮出层组件实现

> **任务三十八**：支持表头排序功能的表格组件实现

> **任务三十九**：首行冻结表格组件实现

> **任务四十**：简单日历组件实现

> **任务四十一**：日历组件升级

> **任务四十二**：支持日期段选择的日历组件实现
　
* 系列任务二：高级相册准备工作

> **任务四十三**：拼图布局

> **任务四十四**：瀑布布局

> **任务四十五**：木桶布局

* 系列任务三：王牌特工游戏准备工作

> **任务四十六**：游戏界面元素的简单实现

> **任务四十七**：与游戏中元素的互动实现

> **任务四十八**：游戏地图的实现

> **任务四十九**：更炫酷的游戏实现


　　同前两个阶段一样，并非所有人都要去完成所有任务，每个团队可以在这3个系列中任选一个进行实践。

## notes

#### task37 浮出层组件实现
关于各种边距可参考[链接](http://www.jb51.net/article/44519.htm),关于可拖动参考这个[链接](http://js.alixixi.com/a/2010091564667.shtml)
>---
(需要提一下：CSS中的margin属性，与clientWidth、offsetWidth、clientHeight、offsetHeight均无关) 
* 网页可见区域宽：document.body.clientWidth 
* 网页可见区域高：document.body.clientHeight 
* 网页可见区域宽：document.body.offsetWidth (包括边线的宽) 
* 网页可见区域高：document.body.offsetHeight (包括边线的宽) 
* 网页正文全文宽：document.body.scrollWidth 
* 网页正文全文高：document.body.scrollHeight 
* 网页被卷去的高：document.body.scrollTop 
* 网页被卷去的左：document.body.scrollLeft 
* 网页正文部分上：window.screenTop 
* 网页正文部分左：window.screenLeft 
* 屏幕分辨率的高：window.screen.height 
* 屏幕分辨率的宽：window.screen.width 
* 屏幕可用工作区高度：window.screen.availHeight 
* 屏幕可用工作区宽度：window.screen.availWidth 
>
* HTML精确定位:scrollLeft,scrollWidth,clientWidth,offsetWidth 
* scrollHeight: 获取对象的滚动高度。 
* scrollLeft:设置或获取位于对象左边界和窗口中目前可见内容的最左端之间的距离 
* scrollTop:设置或获取位于对象最顶端和窗口中可见内容的最顶端之间的距离 
* scrollWidth:获取对象的滚动宽度 
* offsetHeight:获取对象相对于版面或由父坐标 offsetParent 属性指定的父坐标的高度 
* offsetLeft:获取对象相对于版面或由 offsetParent 属性指定的父坐标的计算左侧位置 
* offsetTop:获取对象相对于版面或由 offsetTop 属性指定的父坐标的计算顶端位置 
* event.clientX 相对文档的水平座标 
* event.clientY 相对文档的垂直座标 
* event.offsetX 相对容器的水平坐标 
* event.offsetY 相对容器的垂直坐标 
* document.documentElement.scrollTop 垂直方向滚动的值 
* event.clientX+document.documentElement.scrollTop 相对文档的水平座标+垂直方向滚动的量
* IE，FireFox 差异如下：
* IE6.0、FF1.06+： 
* clientWidth = width + padding 
* clientHeight = height + padding 
* offsetWidth = width + padding + border 
* offsetHeight = height + padding + border
* IE5.0/5.5： 
* clientWidth = width - border 
* clientHeight = height - border 
* offsetWidth = width 
* offsetHeight = height

---

通过review发现一个厉害的东西，cursor的`resize`属性。日后完善相关介绍。
#### task38 UI组件之排序表格
`sort`方法要灵活的使用，带对象的数组用了sort后，对象会一起更改顺序！知道了这点就成功了大半了。

接着就是要理解`sort`接受的函数意义。传入a,b两个参数，然后该函数如果返回的是大于0的数，那么就会**交换**a,b的位置。

排序的时候把tbody组成的对象先遍历放入新数组，然后把新数组排序，接着把排序完的数组放入新对象，最后把新对象赋值给旧对象。
#### task39 UI组件之冻结行列表格
scrollTop需要兼容。
```javascript
window.onscroll = function(e) {
        /**
         * [兼容浏览器]
         */
        var e = e || window.event;
        var scrolltop = document.documentElement.scrollTop || document.body.scrollTop;

        //coding 
    }
```
一个比较快速的方法。`getBoundingClientRect()`方法。
它返回一个对象，其中包含了left、right、top、bottom四个属性，分别对应了该元素的左上角和右下角相对于浏览器窗口（viewport）左上角的距离。
所以，网页元素的相对位置就是
```
var X= this.getBoundingClientRect().left;

var Y =this.getBoundingClientRect().top;
```
再加上滚动距离，就可以得到绝对位置.
```
var X= fixed_table.getBoundingClientRect().left+document.documentElement.scrollLeft;

var Y =fixed_table.getBoundingClientRect().top+document.documentElement.scrollTop;


```
#### task43 多功能相册之拼图布局
学习使用`clip-path`，有两种方法，一种的svg内置的方法，还有一种是`CSS`属性的`clip-path`（需要添加`-webkit-`前缀）。CSS不兼容FF和IE。

`svg`中使用`clip-path`的时候，如果是外部文件记得引用的时候要用添加上文件名，而且`polygon`属性的参数要把CSS里面的参数换成小数。可以兼容FF。

#### task44 多功能相册之瀑布布局
瀑布流的原理是分栏装载图片，一开始误以为横排横排的加载，就去想着怎么才能实现参差不齐的效果。用分栏的瀑布去解决就很简单了，根本不需要什么样式。

整体参考了这篇讲解瀑布流的文章[折腾:瀑布流布局（基于多栏列表流体布局实现）](http://www.zhangxinxu.com/wordpress/?p=2308)，十分感谢。

数组中取最大值，先把数组中第一个数当作最大值取出来放到变量`max`里面，再遍历去和数组中其他数比较，如果小于其他数，就把其他数赋值给`max`。

```
var new_arr = [20,30,16];
var max = new_arr[0];
for(var i =1;i<new_arr.length;i++){
    if(max<new_arr[i]){max=new_arr[i]}
}
console.log(max)//30
```

想获得img的宽高，如果没有写样式的话直接去获得是空的，
> 网页加载的过程是这样的，首先加载的是document文档。也就是HTML，以及包含的js文件、css文件。加载完毕之后，才会继续加载各个图片，每个图片相当于一个单独的请求。所以当document的ready的时候，也就是加载完成的时候，图片可是还没有加载完成，是刚刚准备加载。此时你当然得不到图片的尺寸了。当image的load或者onreadystatechange事件，可以处理判断，得到image的尺寸。

所以把获取的方式加载img.onload函数里面去就能获得宽高了，或者设置一个timeout。可以参考这个链接：[JS快速获取图片宽高的方法](http://www.css88.com/archives/5224/comment-page-1)

其他参考：
* [瀑布流布局浅析](http://www.68design.net/Web-Guide/HTMLCSS/58734-1.html)
* [原生JS实现的简单“瀑布流”布局](http://www.oschina.net/code/snippet_114440_10309)
* [css的div垂直居中的方法，百分比div垂直居中](http://www.haorooms.com/post/css_div_juzhong)
* [垂直居中的几种实现方法](http://www.360doc.com/content/11/1011/10/1609343_155094382.shtml)
* [CSS实现垂直居中的5种方法](http://blog.163.com/hongshaoguoguo@126/blog/static/1804698120135156225265/)

#### task45 多功能相册之木桶布局
`obj.naturalWidth(naturalHeight)`方法，这是HTML5里新添加的一个获取元素高宽的方法，但只适用于Firefox/IE9/Safari/Chrome/Opera浏览器。[参考链接](http://www.cnblogs.com/koukouyifan/p/4066564.html)

`querySelector()`和`querySelectorAll()`两个DOM选择器，像CSS选择器一样选择需要的节点！[参考链接](http://www.nowamagic.net/librarys/veda/detail/388)，跟jQuery的语法类似，很好记，加上浏览器支持的也好，除了IE8部分支持，其他浏览器均支持。

完成的不是很完美，暂时只支持自定义160张图片以内的排列。因为图片来源只有160张。

主要的思路是：先获取照片并且把原宽高，宽高比，链接都存到图片数组里，按照预设的高和原宽高比先算出缩放后的宽，然后遍历图片把相加，和大于整行的宽时就创建一个新的div来储存照片，随后把储存照片的div的高按比例设置就能等宽了。

每张照片宽改成：预设的行高*(原宽/原高)

根据改完后的宽来计算一行最少要多宽，假设第一行为1400。

这时就需要设置高度来如果宽变成浏览器界面的宽，例如1333。则所需行高 = 预设行高*(1333/1400) 

感觉这个算法是最重要的，目前的代码还有很大的改善空间。