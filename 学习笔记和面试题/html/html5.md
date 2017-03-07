**HTML5 为什么只需要写 <!DOCTYPE HTML>？**

HTML5 不基于 SGML，因此不需要对DTD进行引用，但是需要doctype来规范浏览器的行为（让浏览器按照它们应该的方式来运行）；
而HTML4.01基于SGML,所以需要对DTD进行引用，才能告知浏览器文档所使用的文档类型。
 SGML (Standard Generalized Markup Language) 标准通用标记语言s

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


**区分 HTML 和 HTML5**

1.在文档类型声明上
HTML5声明：<!doctype html>

2.在结构语义上

HTML:没有体现结构语义化的标签，通常都是这样来命名的<div id="header"></div>，这样表示网站的头部。
HTML5:在语义上却有很大的优势，提供了一些新的HTML5标签比如: article、footer、header、nav、section，这些通俗易懂。

3.强大的HTML5的新功能
强大的绘图功能canvas  新增视频标签video
