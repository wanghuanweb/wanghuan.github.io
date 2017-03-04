# 2016年百度IFE春季班
## Demo 
task50 任务要求地址：<https://github.com/pkjy/ife-task/tree/gh-pages/2016_spring/part4/task50><br>
task50 在线预览地址：<http://pkjy.github.io/ife-task/2016_spring/part4/task50/index.html>

task51 任务要求地址：<https://github.com/pkjy/ife-task/tree/gh-pages/2016_spring/part4/task51><br>
task51 在线预览地址：<http://pkjy.github.io/ife-task/2016_spring/part4/task51/index.html>

task52 任务要求地址：<https://github.com/pkjy/ife-task/tree/gh-pages/2016_spring/part4/task52><br>
task52 在线预览地址：<http://pkjy.github.io/ife-task/2016_spring/part4/task52/build/>

## IFE春季班第四阶段任务 

　　 第四阶段的主要目标是帮助大家在第三阶段的基础上结合模块化、过程管理工具，综合运用HTML，CSS，JavaScript实现一个小型的网站或者应用。第四阶段任务从 `4月18日` 开始，持续到 ` 5月22日`。大家可以第三阶段和第四阶段一起考虑来实现。

　　第四阶段任务一共有 3 个系列 3 个题目，如下：
* **系列任务一：RIA 问卷管理平台**

* **系列任务二：高级相册**

* **系列任务三：王牌特工游戏**



    同前两个阶段一样，并非所有人都要去完成所有任务，每个团队可以在这3个系列中任选一个进行实践。

    2016春季班所有任务均发布完成，预祝大家学习顺利！希望最终能够坚持下来的同学能够超出我们所有人预期。加油！！

## notes

#### task50 RIA 问卷管理平台
原生JS写的时候，在编辑页面，主要用到的是node的知识，有些坑没注意到的。
1. 如果用getElement等方法来获取的时候，或者说用element.childNodes、previousSibling等等有关node的方法，得到的是NodeList，这里面包含了所有的节点，也就是说nodeType为3的text节点也在里面，但是我们大多情况下是只需要nodeType为1的元素节点。我们只要element的话可以改用element.children或者firstElementChild或者previousElementSibling等等。
2. node原生就有很多方法，包括了新建，删除，替换，克隆等等，完全足够在编辑页面的功能。
```javascript
//查找节点  
document.getElementById("id");//通过id查找，返回唯一的节点，如果有多个将会返回第一个，在IE6、7中有个bug，会返回name值相同的元素，所有要做一个兼容  
document.getElementsByClassName("class");//通过class查找，返回节点数组  
document.getElementsByTagName("div");  
  
//创建节点  
document.createDocumentFragment();//创建内存文档碎片  
document.createElement();//创建元素  
document.createTextNode();//创建文本节点  
  
//添加节  
var ele = document.getElementById("my_div");  
var oldEle = document.createElement("p");  
var newEle=document.createElement("div");  
ele.appendChild(oldEle);  
//移除  
ele.removeChild(oldEle);  
//替换  
ele.replaceChild(newEle,oldEle);  
;插入  
ele.insertBefore(oldEle,newEle);//在newEle之前插入 oldEle节点  
  
//复制节点  
var cEle = oldEle.cloneNode(true);//深度复制，复制节点下面所有的子节点  
cEle = oldEle.cloneNode(false);//只复制当前节点，不复制子节点  
  
//移动节点  
var cloneEle = oldEle.cloneNode(true);//被移动的节点  
document.removeChild(oldEle);//删除原节点  
document.insertBefore(cloneEle,newEle);//插入到目标节点之前 

by hua @http://blog.csdn.net/hxfdarling/article/details/40347207
```
indexeddb怎么触发onupgradeneeded？
IDBOpenDBRequest还有一个类似回调函数句柄——onupgradeneeded。
**该句柄在我们请求打开的数据库的版本号和已经存在的数据库版本号不一致的时候调用。**
indexedDB.open方法还有第二个可选参数，数据库版本号，数据库创建的时候默认版本号为1，当我们传入的版本号和数据库当前版本号不一致的时候onupgradeneeded就会被调用，当然我们不能试图打开比当前数据库版本低的version.
代码中定义了一个myDB对象，在创建indexedDB request的成功毁掉函数中，把request获取的DB对象赋值给了myDB的db属性，这样就可以使用myDB.db来访问创建的indexedDB了。

用indexedBD的时候要善用onerror来获取错误的信息，这样就知道哪里出错了。

还是indexedBD的坑，在更新数据的时候，只能用store的put()方法来更新，并且对象是顶层(第一层)的数据，没有办法直接找到要更新的那一条然后定点更新。一直想着怎么准确找到要更新的地方准确更新数据，然而并没有办法，后来想到了解决的方法。就是先找到要更新的顶层，对这一层全部进行克隆，克隆的是个对象的存在，所以就可以随意改了，改好了之后再把这个修改完的用put()方法更新。

我想如果用Local storage来储存应该更方便些吧，并且兼容性会更好些。

基于首页对不同的数据进行查看或者编辑就需要在打开另一个页面的时候传递相应参数过去，location.href或者a链接里面的href等都跨域达到这个效果。接着在接收页面可以用location.search快速找到?及后面的地址，然后取出来，解码就能用了。解码编码是JavaScript 全局对象。[JavaScript 全局对象-W3C](http://www.w3school.com.cn/jsref/jsref_obj_global.asp)

在对象里面，this指的是这个对象，不能向更上层传递了。比如：
```javascript 
function Foo(){
	this.init();
}
var foo = new Foo();
Foo.prototype={
	init:function(){
		console.log(this)//Foo {_prototype_:Object}
	},
	obj1:{
		test1:function(){
			console.log(this);//test1:function(){}
		},
	},
	obj2:{
		test2:function(){
			console.log(this);//test2:function(){}
		},
	}
}
```

更改数据的时候，换个思路，不要在IDB里面用游标遍历再储存，突然想到要更改数据的时候，先提取要修改的数据，修改之后调用IDB的PUT更新。这样更容易把不同功能分配到不同函数。以前调用游标遍历的时候非常麻烦，每次都要调用游标遍历然后再遍历里面再多次循环渲染HTML内容。
但是操作起来发现IDB的又一个麻烦事，由于IDB是异步的，所以在把IDB的数据操作的时候，传不出它执行时候的域。类似问题[IDB的异步问题](http://stackoverflow.com/questions/38973744/uncaught-invalidstateerror-failed-to-read-the-result-property-from-idbreques)。

>You need to learn about how to write asynchronous Javascript. Your db variable isn't defined at the time you access it.

>Don't do this:

> 
```javascript
var r = indexedDB.open();
var db = null;
r.onsuccess = function(event) { db = event.target.result); }
```
>Do this:

```javascript 
var r = indexedDB.open();
r.onsuccess = function(event) {
  var db = event.target.result;
};
```
>And yes, that means db isn't available outside the scope of the onsuccess function. Stop trying to use it outside its scope or you will just run into the problem you are experiencing.

差点要放弃了，还是搞出来了。如果要搞IDB里面的数据，必须在每一次的回执(request)的onsuccess函数里面操作，就可以访问到数据了!!!之前一直是简单的把一个操作当作Obj那样用`.`去访问然后左边直接赋值。比如说
```javascript
var transaction = db.transaction('myQuestionaire','readwrite');
var store = transaction.objectStore('myQuestionaire');
var IDB = store.get(that.requestInfo);
```
上面的代码就是不行的，如果你通过F12会看到其实IDB是可以看到的，并且是IDB的数据结构，也看的到IDB的result里面的东西，但是如果你试图访问IDB.result，那么浏览器会报错。但是下面这么写就完全没问题了，这个地方的难点就在于要深刻理解IDB里面的操作都是会返回一个回执(request)的。
```javascript
var transaction = db.transaction('myQuestionaire','readwrite');
var store = transaction.objectStore('myQuestionaire');
var request = store.get(that.requestInfo);
request.onsuccess = function(){
	console.log(request.result)//完全可以访问，还能操作
}
```

哎，checked属性，想把勾选状态改成不勾选状态，貌似只有删除checked属性。把checked设置成什么东西，都会勾上。

储存字符串时，最好trim一下，突然发现动态获取的时候空格会出错。

>IDB的储存方面，put失败并且提示 `failed to execute 'put' on 'idbobjectstore' evaluating the object store's key path did not yield a value`的时候，可以尝试下
>If your object store has a key path, the object being stored must contain a value pointed at by that key path or must use a key generator ({autoIncrement: true}).

>For example:

```javascript
var store = db.createObjectStore('my_store', {keyPath: 'key'});
store.put({key: 11, value: 33}); // OK
store.put({value: 66}); // throws, since 'key' is not present

var store = db.createObjectStore('my_store', {keyPath: 'key', autoIncrement: true});
store.put({key: 11, value: 33}); // OK, key generator set to 11
store.put({value: 66}); // OK, will have auto-generated key 12
```

编辑页面保存数据然后跳转，Chrome里这么操作没问题，但是Edge浏览器里测试的时候，跳转的太快，导致Edge浏览器没能储存成功，所以为了兼容Edge加个跳转页面的延迟。

在处理兼容问题的时候，IE浏览器不能本地测试IndexedDB,在网络访问的时候，跳转一直出错，经实验发现，只有IE浏览器在跳转的时候不能接收链接里带中文的URL，但是其它的浏览器均可以。所以还是针对IE做一下兼容，更改以下传递参数的形式。