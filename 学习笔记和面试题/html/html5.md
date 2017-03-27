**HTML5 为什么只需要写 <!DOCTYPE HTML>？**

HTML5 不基于 SGML，因此不需要对DTD进行引用，但是需要doctype来规范浏览器的行为（让浏览器按照它们应该的方式来运行）；
而HTML4.01基于SGML,所以需要对DTD进行引用，才能告知浏览器文档所使用的文档类型。
SGML (Standard Generalized Markup Language) 标准通用标记语言

**html5语义化**

语义化的好处：

1.用户体验：例如title、alt用于解释名词或解释图片信息、label标签的活用；
2.有利于SEO(搜索引擎优化)：和搜索引擎建立良好沟通，有助于爬虫抓取更多的有效信息：爬虫依赖于标签来确定上下文和各个关键字的权重
3.方便其他设备解析（如屏幕阅读器、盲人阅读器、移动设备）以意义的方式来渲染网页；
4.便于团队开发和维护，语义化更具可读性，是下一步吧网页的重要动向，遵循W3C标准的团队都遵循这个标准，可以减少差异化。

比如文章结构标签 (HTML5新的特殊内容元素，比如 article、header、nav、footer、section)

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

 <section>
 	<article>
 		<p></p>
 	</article>
 </section>

 <footer>
 </footer>
 ```
**如果把 HTML5 看作做一个开放平台，那它的构建模块有哪些**

1.新增结构化元素，表单的新元素和表单自动完成功能，input的type增多，视频和音频
2.canvas画布绘图
3.拖放(drag和drop)
4.web存储特性(localStorage,sessionStorage)
5.离线检测(navigator.onLine属性,online,offline事件)
6.应用程序缓存（Application Cache）
7.获取地理位置(navigator.geolocation)
8.HTML5规范里增加了一个自定义data属性.

**html5新增标签**

 1.新增的结构标签header,nav,section,article，aside,footer和figure，figcaption

 2.表单标签input的type可以为email，url，number，range，date，search
 		 datalist(为input定义一个下拉列表，input 元素的 list属性来绑定 datalist)
 		 keygen(定义表单里一个生产的键值，加密信息传送。)
 		 output

 3.媒体标签video,audio,embed

 4.其他功能标签canvas，mark，command，progress等

 ```
 <canvas id="myCanvas" width="200" height="100"></canvas>
 <video src="movie.ogg" controls="controls">
 </video>
 <audio src="song.ogg" controls="controls">
 </audio>
 ```

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

 keygen 元素的作用是提供一种验证用户的可靠方法。
 keygen 元素是密钥对生成器（key-pair generator）。当提交表单时，会生成两个键，一个是私钥，一个公钥。
 私钥（private key）存储于客户端，公钥（public key）则被发送到服务器。公钥可用于之后验证用户的客户端证书（client certificate）。

 output 元素用于不同类型的输出，比如计算或脚本输出
 ```
 <output id="result" onforminput="resCalc()"></output>
 ```

 **html5删除元素(标签)**

1.可以使用css代替的标签：<big>，<center>，<font>，<tt>，<strike>
2.html5中不在使用frame，noframe，frameset
3.只有个别浏览器支持的标签，bgsound背景音乐，blink文字闪烁
 <acronym>，<applet>


**处理HTML5新标签的浏览器兼容问题**

1.IE8/IE7/IE6支持通过document.createElement方法产生的标签，可以利用这一特性让这些浏览器支持HTML5新标签

```
var e = "abbr, article, aside, audio, canvas, datalist, details, dialog, eventsource, figure, footer, header, hgroup, mark, menu, meter, nav, output, progress, section, time, video".split(', ');
var i = e.length;
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

**html5新增特性**

1.语义特性(新增元素)，表单的新元素和表单自动完成功能，input的type增多，视频和音频

2.canvas画布绘图

3.拖放(drag和drop)

4.web存储特性(localStorage,sessionStorage)

5.离线检测(navigator.onLine属性,online,offline事件)

6.应用程序缓存（Application Cache）

7.获取地理位置(navigator.geolocation)

8.HTML5规范里增加了一个自定义data属性.

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

**拖放**

拖动元素dragElement    
    事件:dragstart,drag,dragend    
    事件拖动对象dataTransfer，属性有getData(),setData()

放置元素dropElement    
    事件:dragenter,dragover,dragleave(drop)

拖放元素的写法：
    1.拖放元素中draggable=true表示可拖拽
    2.添加dragstart事件且设置event.target.dataTransfer.setData()
    3.可以在datastart事件处理程序中设置effectAllowed属性,表示允许那种dropEffect
放置元素的写法：
    1.重写dragenter，dragover写法，drop取消默认行为，因为默认是不发生drop事件
    2.在drop事件中，getData且append
    3.dropenter事件处理程序中用dropeffect属性，表示执行那种放置行为none/move/copy/link

```
window.onload = function(){
    var dragEle = document.getElementsByClassName("dragElement")[0],
        dropEle = document.getElementsByClassName("dropElements")[0],
        dropEle2 = document.getElementsByClassName("dropElements")[1];


    dragEle.addEventListener("dragstart",function(event){
        console.log(event.target.id);
        event.dataTransfer.setData("text",event.target.id);
    },false);

    dropEle.addEventListener("dragenter",function(event){
        event.preventDefault();
    },false);
    dropEle2.addEventListener("dragenter",function(event){
        event.preventDefault();
    },false);
    dropEle.addEventListener("dragover",function(event){
        event.preventDefault();
    },false);
    dropEle2.addEventListener("dragover",function(event){
        event.preventDefault();
    },false);

    dropEle.addEventListener("drop",function(event){
        event.preventDefault();
        var data = event.dataTransfer.getData("text");
        event.target.appendChild(document.getElementById(data));
    },false);
    dropEle2.addEventListener("drop",function(event){
        event.preventDefault();
        var data = event.dataTransfer.getData("text");
        event.target.appendChild(document.getElementById(data));
    },false);

};
```

**html5的web存储新方法**

HTML5提供了两种在客户端存储数据的新方法：

1.localStorage--没有时间限制的存储
2.sessionStorage--针对一个session的数据存储。当用户关闭浏览器窗口后，数据会被删除。

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

**离线检测**

```
if(navigator.onLine){

}else{
    //执行离线状态时的任务
}
```

```
EventUtil.addHandler(window,"online",function(){

});//离线变成在线时触发
EventUtil.addHandler(window,"offline",function(){

});
```

**应用程序缓存--离线缓存**

HTML5 引入了应用程序缓存，这意味着 web 应用可进行缓存，并可在没有因特网连接时进行访问。
应用程序缓存为应用带来三个优势：
    离线浏览 - 用户可在应用离线时使用它们
    速度 - 已缓存资源加载得更快
    减少服务器负载 - 浏览器将只从服务器下载更新过或更改过的资源。

离线缓存(application cache)的原理：
    appcache是从浏览器的缓存中分离出了一块缓存区，要想在缓存区中保存数据，
    可以使用一个描述文件(manifest file)。
    要将描述文件与页面关联起来，可以在<html>中的mainfest属性中指定这个文件的路径。
    通过描述文件上的解析清单离线存储资源，这些资源就会像cookie一样被存储了下来。
    之后当网络在处于离线状态下时，浏览器会通过被离线存储的数据进行页面展示。
离线缓存的方法：
1.在index.html里加上<html manifest="test.manifest">
2.描述文件实例

**获取地理位置(接口：navigator.geolocation)**

检测浏览器是否支持navigator.geolocation
```
if (navigator.geolocation) {
   //console.log("浏览器支持!");
}
else {
   // console.log("浏览器不支持!");
}
```

navigator.geolocation用于获取基于浏览器的当前用户地理位置
```
void getCurrentPosition(onSuccess,onError,options);
//获取用户当前位置

int watchCurrentPosition(onSuccess,onError,options);
//持续获取当前用户位置

void clearWatch(watchId);
//watchId 为watchCurrentPosition返回的值
//取消监控

options = {
     enableHighAccuracy,　　　//boolean 是否要求高精度的地理信息
     timeout,　　　　　　　　　//表示等待响应的最大时间，默认是0毫秒，表示无穷时间
     maximumAge　　　　　　　　/应用程序的缓存时间
}
```

获取地理位置的实例：
```
<!DOCTYPE html>  
<html>  
<head>  
    <meta charset="utf-8"/>  
    <title>基于浏览器的HTML5查找地理位置</title>
    <!-- 百度API -->
 <script src="http://api.map.baidu.com/api?v=1.2" type="text/javascript"></script>  
  <script>
       function getLocation(){
           var options={
               enableHighAccuracy:true,
               maximumAge:1000
           }
           if(navigator.geolocation){
               //浏览器支持geolocation
               navigator.geolocation.getCurrentPosition(onSuccess,onError,options);

           }else{
               //浏览器不支持geolocation
           }
       }

       //成功时
       function onSuccess(position){
           //返回用户位置-经纬度
           var longitude =position.coords.longitude;
           var latitude = position.coords.latitude;

           //使用百度地图API，创建地图实例
           var map =new BMap.Map("container");
           //创建一个坐标
           var point =new BMap.Point(longitude,latitude);
           //地图初始化，设置中心点坐标和地图级别  
           map.centerAndZoom(point,15);
       }

       //失败时
       function onError(error){
           switch(error.code){
               case 1:
               alert("位置服务被拒绝");
               break;

               case 2:
               alert("暂时获取不到位置信息");
               break;

               case 3:
               alert("获取信息超时");
               break;

               case 4:
                alert("未知错误");
               break;
           }

       }
       window.onload = getLocation;
   </script>
</head>
<body>
   <div id="container" style="width:600px;height:600px"></div>
</body>
</html>
```

**web Workers**

当在 HTML 页面中执行脚本时，页面的状态是不可响应的，直到脚本已完成。web worker 是运行在后台的 JavaScript，独立于其他脚本，不会影响页面的性能。您可以继续做任何愿意做的事情：点击、选取内容等等，而此时 web worker 在后台运行。

**使用 data- 属性的好处**

自定义存储的数据能够被页面的JavaScript中利用，以创建更好的用户体验（不进行 Ajax 调用或服务器端数据库查询）。

为前端开发者提供自定义的属性，这些属性集可以通过对象的dataset属性获取，不支持该属性的浏览器可以通过 getAttribute方法获取

```
<div data-author="david" data-time="2011-06-20" data-comment-num="10" id="content">...</div>
var content = document.getElementById('content');      
content.dataset.commentNum; // 10--需要注意的是，data-之后的以连字符分割的多个单词组成的属性，获取的时候使用驼峰风格
console.log(content.getAttribute('data-comment-num')); //不支持该属性的浏览器可以通过 getAttribute方法获取
```

**区分 HTML 和 HTML5**

1.在文档类型声明上
HTML5声明：<!doctype html>

2.在结构语义上

HTML:没有体现结构语义化的标签，通常都是这样来命名的<div id="header"></div>，这样表示网站的头部。
HTML5:在语义上却有很大的优势，提供了一些新的HTML5标签比如: article、footer、header、nav、section，这些通俗易懂。

3.强大的HTML5的新功能
强大的绘图功能canvas  新增视频标签video
