#### 1.响应式元素及媒介
涵盖元素创建，用于移动设备或台式机的优化。

##### 1.1.客户端依赖浏览器窗口的大小来呈现图像

准备代码：
```
<p class="text">erer sdg hgfgj</p>
<div class="img-wrap">
    <img src="robots.jpg" alt="" class="responsive">
    <p>erer sdg hgfgj</p>
</div>

<style>
/*但此时图片还是静态的，一直宽度不变,宽度都是图像本身的300px*/
    p.text{
        float: left;
        width: 60%;
    }
    div.img-wrap{
        float: right;
        width: 40%;
    }
</style>
```

实现方法：

```
/*可以适应浏览器的窗口的大小了*/
img.responsive{
    max-width: 100%;
    height: auto;
}
```

实现原理：

max-width是给元素设置了最大宽度.则表示不能超出父元素的宽度，当浏览器窗口变化时，图像会根据父元素相应改变填充的值。而height为auto则是保证图像自身的宽高比例缩放图像。

##### 1.2.基于cookie及JavaScript的响应式图像

上述办法是基于宽度百分比的方法依赖于客户端来实现对于大图像文本的缩放。笨方法是在服务器端依据客户的请求，返回恰当大小的图像文件。

22readytodo
准备代码：
实现方法：
实现原理：

##### 1.3.基于媒介查询的图像缩放max-width和min-width

```
<img src="robots.jpg" alt="" class="responsive">

<style>
@media screen and (max-width: 1024px) {
    img.responsive {width:200px;}
}
@media screen and (min-width: 1025px) and (max-width: 1280px) {
    img.responsive {width:300px;}
}
@media screen and (min-width: 1280px) {
    img.responsive {width:400px;}
}
img.responsive{height: auto;}
</style>
```

##### 1.4.基于媒介查询的动态导航栏(使用媒介查询基于不同屏幕尺寸的响应式菜单)

小于800px，导航栏是select框
800px-1024px，导航栏是水平ul列表，宽度是100%，内容和导航栏是上下排，内容是100%
大于1024px，导航栏是纵向ul列表，宽度是20%，放在左边，内容是80%，放在右边

```
<div class="small-menu">
    <form>
        <select name="list" onchange = "window.location.href = this.form.list.options[this.form.list.selectedIndex].value">
            <option value = "http://www.baidu.com">百度</option>
            <option value = "http://v.qq.com/">腾讯</option>
            <option value = "https://www.aliyun.com/?utm_medium=text&utm_source=baidu&utm_campaign=yzj&utm_content=se_76074">阿里</option>
        </select>
    </form>
</div>

<div class="big-menu">
    <ul>
        <li>
            <a href="http://www.baidu.com">百度</a>
        </li>
        <li>
            <a href="http://v.qq.com">腾讯</a>
        </li>
        <li>
            <a href="https://www.aliyun.com/?utm_medium=text&utm_source=baidu&utm_campaign=yzj&utm_content=se_76074">阿里</a>
        </li>
    </ul>
</div>

<div class="content">
    <p>wersdgsdfgbxdfgsftergdfzvas大法师提供任何风格和是分厂V型才刚毕业儿童二塔问题儿童而已差不多发给是否儿童水电费三个人图一uyiuyioo</p>
</div>

<style>
    @media screen and (max-width: 800px) {
        .small-menu {
            display: inline;
        }
        .big-menu {
            display: none;
        }
    }
    @media screen and (min-width: 801px) and (max-width:1024px){
        .small-menu {
            display: none;
        }
        .big-menu {
            display: inline;
            width: 100%;
        }
        .big-menu ul {
            list-style-type: none;
        }
        .big-menu ul li {
            display: inline;
        }
        .content{
            width: 100%;
        }
    }
    @media screen and (min-width: 1025px) {
        .small-menu {
            display: none;
        }
        .big-menu {
            display: inline;
            width: 20%;
            float: left;
        }
        .content{
            float: right;
            width: 80%;
        }
    }
</style>
```

##### 1.5.基于CSS3按钮的进度条

当按钮被触发时，添加盒阴影、边框和jQuery使按钮有趣的效果；让按钮效果改变之后，用户也知道点击可能不会重复提交了~


#### 2.响应式字体
使用流式字体，创建很棒的字体效果，以及使用HTML5画布和CSS3实现字体的立体特效。

字体的单位：
em     相对于父节点的font-size
rem    root rem相对于根节点（或者是html节点），也就是说你可以在html节点定义一个单独的字体大小，然后所有其他元素使用rem相对于这个字体的百分比进行设置
px     像素值
percent 注意100%是16px，也就是1em

##### 2.1.创建自适应的响应式字体

使用新的尺寸单位REM，REM的意思就是根EM，若使用EM单位，意味着字体尺寸与根元素尺寸有关，而不是父元素字体。

如下：html根元素是10px，横屏的时候a是10px，竖屏的时候a是30px
```
<p class="a">大法师提供任何风格和是分厂V型才刚毕业儿童二塔问题儿童而已差不多发给是否儿童水电费三个人图一</p>
<p class="b">我的问让我儿童儿童而问题</b>

<style>
    html{
        font-size: 62.5%;
    }
    p.b{
        font-size: 1rem;
    }
    @media screen and (orientation:landscape) {
        p.a{
            font-size: 1rem;
        }
    }
    @media screen and (orientation:portrait) {
        p.a{
            font-size: 3rem;
        }
    }

</style>
```
##### 2.2使用画布实现文本阴影

先是写阴影相关的画布代码--在写文本相关的画布代码(若先写文本，在写阴影代码会导致文本无阴影)--用fillStyle或者strokeStyle填充

```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>test</title>
</head>
<body>
    <canvas id="drawing"></canvas>
    <script src="test.js"></script>
</body>
</html>

(function() {
    var drawing = document.getElementById("drawing");

    if (drawing.getContext) {
        var context = drawing.getContext("2d");

        //注意这部分代码必须在font和fillText之前，不然文本会无阴影
        context.shadowOffsetX = 2;
        context.shadowOffsetY = 2;
        context.shadowBlur = 2;
        context.shadowColor = "rgba(0,0,0,0.5)";

        context.font = "20px Times New Roman";
        context.fillStyle = "#666";
        context.fillText("This is the Canvas",5,30);

        context.fillStyle = "#ffffff";
        console.log("w");
    }
})();
```
##### 2.3使用画布实现内侧阴影和外侧阴影

结合context.fillText和context.strokeStyle方法来创建一个足够逼真的内测阴影特效。

先是写阴影相关的画布代码(shadowOffsetX,shadowOffsetY,shadowBlur,shadowColor)
再写文本相关的画布代码(font,fillStyle,fillText)
想实现内外侧阴影(strokeStyle,strokeText)
```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>test</title>
</head>
<body>
    <canvas id="drawing"></canvas>
    <script src="test.js"></script>
</body>
</html>

(function() {
    var drawing = document.getElementById("drawing");

    if (drawing.getContext) {
        var context = drawing.getContext("2d");

        context.shadowOffsetX = -1;
        context.shadowOffsetY = -1;
        context.shadowBlur = 2;
        context.shadowColor = "#888888";

        context.font = "33px Times New Roman";
        context.fillStyle = "#666";
        context.fillText("This is the Canvas",0,50);

        context.strokeStyle = "#555";
        context.strokeText("This is the Canvas",2,50);

        context.lineWidth = 2;
    }
})();
```
##### 2.4基于相对字体大小的按钮

通过@media查询的方式为桌面设备及移动设备构建响应式的按钮，通过@media查询defer按时则能在不同设备和不同方向下给出实现相对字体大小的解决方案。

1.为1024px和1280px的桌面设备建立@media查询
2.为移动设备设置两个@media查询，均为max-device-width:480px,分为横竖屏

在桌面设备上，若浏览器窗口在1024px-1280px之间缩放的时候，同样会发现按钮的字体有所变化。
在移动设备上，可能会出现字体太小而且很难辨识，同时按钮又太小不易使用的时刻。将你的移动设备从竖屏转换成横屏，马上就能发现按钮以及字体大小发生了变化。
```
<div>
    <p>wertdfvndfguiwaerowernwejfhsvbzdl;g</p>
    <input type="submit">
</div>

<style>
    html {
        font-size: 62.5%;
    }
    p {
        font-size: 1.4rem;
    }
    @media screen and (min-width:1024px) {
        input {
            font-size: 1rem;
            width: 84px;
            padding: 2%;
        }
    }

    @media screen and (min-width:1280px) {
        input {
            font-size: 2rem;
            width: 84px;
            padding: 2%;
        }
    }
    @media screen and (max-device-width: 480px) and (orientation:landscape) {
        input {
            font-size: 2rem;
            width: 25%;
            padding: 2%;
        }
    }
    @media screen and (max-device-width: 480px) and (orientation:portrait) {
        input {
            font-size: 2.4rem;
            width: 30%;
            padding: 2%;
        }
    }
</style>
```

#### 3.响应式布局

创建可实际应用到项目中的响应式布局。如何使用视窗和媒介查询，是的Web站点在不同视区大小和类型下变成响应式。

##### 3.1基于min-width和max-width属性的响应式布局

**准备工作**

在极小的视窗限制下，把浮动元素的多个列合并显示成一个列。

**实现方式**

浏览器打开HTML页面，接下来页面布局平滑的从三列变成两列，最终变成只有单列的布局方式。

```
<body>
    <article>
        <h1>picture and article</h1>
        <div class="one float">
            <img src="robots.jpg">
        </div>
        <div class="two float">
            <p>ewrwearqerwerty rtys et waR423 RTWERTERT EWR WERT</p>
        </div>
        <div class="three float">
            <p>ewrwearXCVBHRGUY UJER QWE tuyui tuirtsy wea fdzfgWER YU FJFCH</p>
        </div>
    </article>

    <style>
        article {
            width: 100%;
            max-width: 1280px;
            margin: 0 auto;
        }
        h1{
            text-align: center;
        }
        .one{
            min-width: 500px;
        }
        img{
            width: 100%;
            height: auto;
        }
        .float{
            max-width: 350px;
            float: left;
            border: 1px solid black;
        }
    </style>
</body>
```
**工作原理**

1.施加于列元素上的max-width属性使得列的宽度不是固定的，但是同时限定了最大值。相对于设置静态的宽度，该方法赋予布局更好的灵活性。
2.图片所在列利用min-wdith属性，能够响应父元素宽度的变化，比如增加或收缩宽度。
3.最终， 通过float属性，整个页面能够从三列的布局方式平滑的过渡到单列布局方式，一旦没有足够的空间并列容纳float，最后一个列元素将会从列布局中移除，并放置在新的一行中。

##### 3.2基于相对内边距的布局控制

**准备工作**

比如为博客页面设计的一个简单布局，需要有评论和回复评论的功能。采用相对内边距的方法就能实现该边距。

**实现方式**

```
<div class="content">
    <h1>Control your layout with relative padding</h1>
    <p>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
        Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
    </p>

    <div class="comments">
        <h2>Comments</h2>

        <div class="comment">
            <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
            </p>

            <div class="comment">
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                    Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                </p>

                <div class="comment">
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                        Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    </p>
                </div>
            </div>
        </div>

        <div class="comment">
            <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
            </p>
        </div>

        <div class="comment">
            <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
            </p>
        </div>
    </div>
</div>

<style>
    .content {
        padding: 0 5% 0 5%;
        border: 1px solid black;
    }
    .comments {
        padding: 0 10% 0 20%;
        border: 1px solid black;
    }
    .comment {
        padding: 0 0 0 10%;
        border: 1px solid black;
    }
</style>
```
**工作原理**

随着页面宽度的变化，相对内边距属性自适应的调整自身宽度值。

```
.content {
    padding: 0 5% 0 5%;
}
.comments {
    padding: 0 10% 0 20%;
}
.comment {
    padding: 0 0 0 10%;
}
```
##### 3.3为CSS添加媒介查询

**准备工作**

渲染的页面能够自适应于所有的设备和所有的可能场景。这样可以创建简单的web页面，页面可适用于不同窗口大小的浏览器、不同的设备以及其他可能呈现的方式。

**实现方式**

这条配置信息作用域多有的竖屏(横屏)显示设备,可以使得移动设备在横竖屏切换的时候显示出不同的效果。该设置对于桌面设备同样适用。
```
@media (orientation: portrait){ }
```

基于height以width的媒介查询允许设置针对特定大小屏幕的样式
```
@media (height: 500px){ }
```

给所有页面施加同样的样式，无论浏览器窗口大小是多少，以指定的大小在设备上渲染页面。
```
@media (device-width: 500px){ }
```

对此媒介查询用于对16/9比率的设备窗口(非print类型)进行样式设置。
```
@media screen and (device-aspect-ratio:16/9){ }
```

设定选项适用于采用电视作为视频输出的设备。
```
@media tv{ }
```

媒介查询中，min-width和max-width是最有用的两个。基于该媒介查询能为任何窗口大小的设备设置响应式杨思，其中包含哪些屏幕很小的移动设备。首先设置最小(即移动)设备的相关样式，接下来设置那些最常用大小屏幕的相关样式，最后通过min-wdith来适配最大尺寸的屏幕。
```
@media screen and (max-width:960px) { }
@media screen and (min-width:961px) and (max-width:1280px) { }
@media screen and (min-width:1281px) and (max-width:1336px) { }
@media screen and (min-width:1336px) { }
```

创建了与项目显示设备相关的媒介查询后，通过给媒介查询设定不同的属性值进行样式的配置
```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>test</title>
</head>
<body>
    <h1>Add Media Query to your CSS</h1>
    <div>
        <img src="robots.jpg"/>
        <p>
            easgtseryugykcvhnzdfysrtuydtiguhkzystrujnbvsdfgcvbzdftejyjk5f4yhrdtyJtjhshteasgtseryugykcvhnzdfys
            rtuydtiguhkzystrujnbvsdfgcvbzdftejyjk5f4yhrdtyJtjhshteasgtseryugykcvhnzdfysrtuydtiguhkzystrujnbvsd
            fgcvbzdftejyjk5f4yhrdtyJtjhsht
        </p>
    </div>
    <style>
        @media tv {
            body {color: blue;}
            h1 {
                font-weight: bold;
                font-size: 140%;
            }
            img {
                border:  2px solid #ccc;

                float: left;
                width: 20%;
                padding: 2%;
                margin: 2%;
            }
            p {
                width: 62%;
                float: right;
                font-size: 110%;
                padding: 2%;
            }
        }
        @media screen and (max-width:960px) {
            body {color: #000;}
            h1 {
                font-weight: bold;
                font-size: 120%;
            }
            img {
                border:  2px solid #ccc;

                float: right;
                width: 20%;
                padding: 1%;
                margin: 1%;
            }
            p {
                width: 80%;
                float: left;
                font-size: 60%;
            }
        }
        @media screen and (min-width:961px) and (max-width:1280px) {
            body {color: #000;}
            h1 {
                font-weight: bold;
                font-size: 120%;
            }
            img {
                border:  2px solid #ccc;

                float: right;
                width: 20%;
                padding: 1%;
                margin: 1%;
            }
            p {
                width: 76%;
                float: left;
                font-size: 60%;
            }
        }
        @media screen and (min-width:1281px) {
            body {color: #000;}
            h1 {
                font-weight: bold;
                font-size: 120%;
            }
            img {
                border:  2px solid #ccc;

                float: right;
                width: 20%;
                padding: 1%;
                margin: 1%;
            }
            p {
                width: 70%;
                float: left;
                font-size: 100%;
            }
        }
    </style>
</body>
</html>

```
**工作原理**

通过这些不同的设置后，就能够发现在不同的设备中，页面呈现出了不同的样式效果。当然，在你的站点中可以通过组合不同的设备来实现更多样化的响应式特效。

##### 3.4基于媒介查询创建响应式宽度布局

**准备工作**

尝试让一个简单的响应式宽度布局自适应于不同宽度的屏幕。

**实现方式**

媒介查询包含以下这些标准视图断电的屏幕尺寸：960/1024/1280

第一条媒介查询对于所有屏幕宽度小于960px的设备生效
第二条媒介查询作用于所有屏幕宽度为961--1024px的设备
第三条媒介查询作用于所有屏幕宽度为1025--1280px的设备
第二条媒介查询作用于所有屏幕宽度大于1281px的设备
对于每一条媒介查询，都需要编写响应的CSS以期得到不同的页面布局
```
@media screen and (max-width: 960px) {}
@media screen and (min-width: 961px) and (max-width: 1024px){}
@media screen and (min-width: 1025px) and (max-width:1280px){}
@media screen and (min-width: 1281px) {}
```

实现一个布局
http://img.blog.csdn.net/20161127170129232
1.有nav(无序菜单列表)，content，aside(除了content的其他内容，比如评论)的HTML页面布局
2.宽度在960px以下，nav转换成垂直菜单，页面从上往下顺序是nav、content、aside(评论)
  宽度在961px--1280px间，菜单水平布局方式显示在最上方，nav水平显示在上方，content在左，aside在右
  宽度大于1281px时，nav在左侧并且垂直方式显示给用户，content在中间，aside在右边，实现三列布局
3.为了确保菜单能够呈现在大尺寸屏幕的左侧，首先通过定位创建一个三列布局，在min-width：1281px媒介查询时候，设置.nav绝对定位和宽度样式
```
.nav{
    position:absolute;
    top:20px;
    left:0px;
    width:144px;
}
```
4.为了使响应式效果更好，再给布局添加一些内边距填充。


**工作原理**

1.媒介查询提供了虽有限但实用的技术，来实现针对不同浏览器窗口大小的布局效果。
2.那些流式及浮动的元素根据各自的内边距比率自适应于变化中的新布局。
3.采用百分比的流式内边距使得在屏幕大小变化造成布局改变的情况下，始终保持一致的内边距比率。

##### 3.5基于媒介查询改变图片大小

**准备工作**

**实现方式**

**工作原理**

##### 3.6基于媒介查询隐藏元素

**准备工作**

**实现方式**

**工作原理**

##### 3.7创建平滑过渡的响应式布局

**准备工作**

**实现方式**

**工作原理**

#### 4.使用响应式框架
使用新型框架，通过最新的响应式方法和交互方式，既快速又可靠地完成响应式站点的设计和交付，以及如何将旧的静态框架转换为响应式类型的框架。
#### 5.设计移动设备优先的web应用
实现web应用程序的移动版本。该章通过jQueryMobile优先针对移动设备优化，并针对桌面视窗进行了优化。
#### 6.优化响应式内容
#### 7.非侵入式javascript
