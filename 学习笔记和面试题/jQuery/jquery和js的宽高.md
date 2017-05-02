1.window对象的宽高

window.innerHeight,window.innerWidth,window.outerHeight,window.outerWidth
window.screen.height,window.screen.width,window.screen.availWidth,window.screen.availHeight

2.document对象的宽高

client(四种)，offset(四种)，scroll(四种)
clientWidth,clientHeight,clientTop,clientLeft
offsetWidth,offsetHeight,offsetTop,offsetLeft
scrollWidth,scrollHeight,scrollTop,scrollLeft

3.event事件的坐标
(clientX,clientY,screenX,scrennY,offsetX,offextY,pageX,pageY,layerX,layerY)：
    1.客户区坐标位置(clientX,clientY)---是触发点相对浏览器可视区域左上角距离，不随页面滚动而改变
    2.屏幕坐标位置(screenX,screenY)---鼠标相对于整个设备屏幕的位置
    3.偏移坐标位置(offsetX,offsetY)---触发点相对被触发dom的左上角距离
    4.页面坐标位置(pageX,pageY)---获取到的是触发点相对文档区域左上角距离，会随着页面滚动而改变
    5.偏移坐标位置(layerX,layerY)---这个变量就是firefox用来替代offsetX/Y的但是有个条件就是，被触发的dom需要设置为position:relative或者position:absolute，否则会返回相对html文档区域左上角的距离
    6.X和Y(本来是IE属性，相对于用CSS动态定位的最内层包容元素)

#### 1.window和document的区别

**window对象** Window 对象表示浏览器中打开的窗口(窗口位置，窗口大小,open,alert(),confirm(),prompt())

BOM就是浏览器窗口对象模型，顶级对象就是window

window对象表示浏览器中一个打开的窗口，也就是窗体

所有的全局对象和函数都属于window对象的属性和方法。

但是定义全局变量与window对象上直接定义属性有差别：全局变量不能通过delete操作符删除，但是window对象上定义的属性可以被delete删除。

```
var age = 29;
window.color = "red";

delete window.age;

delete window.color;
alert(window.age);//29
alert(window.color);//undefined
```

**document对象**

document对象是window对象的一个属性，因此可以将他当成全局对象来访问。

document对象代表整个html文档，可用来访问页面中的所有元素，也就是页面。

Document类型表示文档。document对象是Document的一个实例，表示整个HTML页面。document对象是window对象的一个属性，可以作为全局对象来访问。

window(BOM对象)和document(DOM对象)都可以访问窗口大小：

窗口大小window.innerWidth,window.innerHeight,window.outerWidth,window.outerHeight
窗口大小document.documentElement.clientWidth,document.body.clientWidth
```
var pageWidth = window.innerWidth,
    pageHeight = window.innerHeight;
//IE8更早版本中没提供取得当前浏览器窗口尺寸的属性，但可以通过DOM提供了页面可见区域的相关信息
if (typeof pageWidth != "number") {
    //判断是否是标准模式，标准模式则用document.documentElement
    if(document.compatMode == "CSS1Compat") {
        pageWidth = document.documentElement.clientWidth;
        pageHeight = document.documentElement.clientHeight;
    } else {
        pageWidth = document.body.clientWidth;
        pageHeight = document.body.clientHeight;
    }
}
```

#### 2.window.location和document.location区别

通常来说，二者是相等的。

#### 3.与window相关的宽高介绍

window.innerWidth浏览器窗口的内部宽度
window.innerHeight浏览器窗口的内部高度
window.outerWidth浏览器窗口的外部宽度
window.outerHeight浏览器窗口的外部高度
---上边几个值浏览器缩放肯定是会改变的

window.screen对象包含有关用户屏幕的信息。
window.screen.height
window.screen.width
window.screen.availWidth
window.screen.availHeight
---上边几个值不会根据浏览器的改变而改变
window.screenTop浏览器距屏幕顶部的高度
window.screenLeft浏览器距屏幕左边的宽度
--上边两个值肯定根据窗口位置改变而改变

#### 4.document相关的宽高

1.client相关的宽高--可视区域的宽高
    document.body.clientWidth=无滚动条(padding+style.width)，有滚动条(padding+style.width-滚动条宽度)
    document.body.clientHeight
    document.body.clientTop=border-top的border-width
    document.body.clientLeft=border-left的border-width
2.offset相关的宽高
    document.body.offsetWidth= border+padding+style.width
    document.body.offsetHeight= border+padding+style.width

    offsetParent：
    1.如果当前元素的父级元素没有进行css定位(position为absolute或者relative)，offsetParent为body
    2.如果当前元素的父级元素有css定位(position为absolute或relative)，offsetParent取最近的那个父级元素

    document.body.offsetLeft
    1.IE6/7 中
    offsetLeft = (offsetParent的padding-left)+(当前元素的margin-left)
    2.IE8/9/10以及chrome中
    offsetLeft = (offsetParent的margin-left+border+padding-left)+(当前元素的margin-left)
    3.firefox中
    offsetLeft = (offsetParent的margin-left+padding-left)+(当前元素的margin-left)
    document.body.offsetTop

3.scroll相关的宽高(不同之处在body和其他元素中是有区别的)
    scrollWidth
    scrollHeight
    无滚动轴的时候：
    scrollWidth = clientWidth = style.width + padding;
    有滚动轴的时候：
    scrollWidth = 实际内容的宽度+padding

    scrollLeft
    scrollTop(重点就是这两个属性实可以读写的)
    这对属性实可读写的，指的是当元素其中的内容超出其宽高的时候，这些元素被卷起的宽度和高度。

鼠标事件涉及的一些坐标方法
(clientX,clientY,pageX,pageY,offsetX,offextY,layerX,layerY,screenX,scrennY)：

1.客户区坐标位置(clientX,clientY)---是触发点相对浏览器可视区域左上角距离，不随页面滚动而改变
2.页面坐标位置(pageX,pageY)---获取到的是触发点相对文档区域左上角距离，会随着页面滚动而改变
3.偏移坐标位置(offsetX,offsetY)---触发点相对被触发dom的左上角距离
4.偏移坐标位置(layerX,layerY)---这个变量就是firefox用来替代offsetX/Y的但是有个条件就是，被触发的dom需要设置为position:relative或者position:absolute，否则会返回相对html文档区域左上角的距离
5.屏幕坐标位置(screenX,screenY)---鼠标相对于整个电脑屏幕的位置

#### 5.宽高的几个应用

**可视区域加载**

div头部到浏览器顶部的距离是否小于浏览器可视区域的Height
可视区域的高度：
window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight

div头部到浏览器顶部的距离：
element.getBoundingClientRect.top();或者是
```
function getPosition(e){
    var x = e.offsetLeft,
        y = e.offsetTop;

    while(e = e.offsetParent){
        x += e.offsetLeft;
        y += e.offsetTop;
    }
    return {'x': x, 'y': y};
}
```

```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
    <style>
        #showDiv{
            width: 500px;
            height:350px;
            background-color: red;
            margin: 1000px auto 0 auto;
        }
        keyframes fadeInLeft{
            0%{
                opacity:0;
                transform:translate3d(-100%,0,0);
            }
            100%{
                opacity:1;
                transform:none;
            }
        }
        @-webkit-keyframes fadeInLeft{
            0%{
                opacity:0;
                -webkit-transform:translate3d(-100%,0,0);
            }
            100%{
                opacity:1;
                -webkit-transform:none;
            }
        }
        .fadeInLeft{
            animation-name:fadeInLeft;
            -webkit-animation-name:fadeInLeft;
            animation-duration:2s;
            -webkit-animation-duration:2s;
        }
    </style>
</head>
<body>
    <div id="showDiv" class="fadeInLeft"></div>
    <script type="text/javascript">
        function showDiv(){
            var showId = document.getElementById("showDiv");
            var client = window.innerHeight || document.documentElement.clientHeight ||     document.body.clientHeight;
            var divTop = showId.getBoundingClientRect().top;

            if(divTop <= client){
                showId.classList.add("fadeInLeft");
            }
            window.onscroll = showDiv;
        }
    </script>
</body>
</html>
```

**网页滚动到底部加载**--滚动到底部，则加载下一页

滚动到底部方法：可视区域(innerHeight,clientHeight) + 滚动的部分(scrollTop) == 网页的高度(scrollHeight)
滚动到头部方法：滚动部分(scrollTop) = 0
```
function scrollBottomOrTop(){
    //可视区域
    var client = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
    //滚动的部分
    var scroll = document.body.scrollTop;
    //总页面高度
    var wholeHeight = document.body.scrollHeight;

    if(client + scroll >= wholeHeight){
        alert("滚动到底部");
    }
    if(scrollTop == 0){
        alert("滚动到顶部");
    }
}
element.onscroll = divScroll;
```

**div滚动到底部加载**--页面内部的某个div滚动到底部，则加载下一页

```
function divScroll(element){
    var wholeHeight = element.scrollHeight,
        scrollTop = element.scrollTop,
        //不用style.height,因为没有padding还应该用clientHeight
        divHeight = element.clientHeight;

    if(scrollTop + divHeight >= wholeHeight){
        alert("底部");
    }
    if(scrollTop == 0){
        alert("头部");
    }
}
```

#### 6.jquery的宽高
比如
```
element{height:300px;padding:5px;border:5px;margin:10px;}
element{height:300px;padding:5px;border:5px;margin:10px;box-sizing:border-box;}
```
.width() .height()--300,280
.css("width")--返回值有单位，和width()返回的值大小相同
.innerWidth() .innerHeight()--content+padding--310,290
.outerWidth() .outerHeight()--content+padding+border--320,300
.outerWidth(true) .outerHeight(true)--content+paddingg+border+margin--340,320
.offset():相对于document的当前坐标值(相对于body左上角的left和top的值)
.position()：相对于offset parent的当前坐标值(相当于offset parent元素左上角的left，top的值)
