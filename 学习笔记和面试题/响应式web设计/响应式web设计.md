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

通过CSS媒介查询调整图片的大小，尤其是当我们下载了一个图片，又想在不同尺寸的响应式布局种使用它时。
客户端调整图片尺寸使然是好方法，但是当客户端下载的图片尺寸较大时，会导致调整图片大小变成浏览器的负担。

**实现方式**
http://img.blog.csdn.net/20161127204329604

HTML页面，页面包含一个h1标题，一个wrap元素，wrap元素中包含一张图片和一段文本
```
<h1>erer sdg hgfgj</h1>
<div class="wrap">
    <img src="robots.jpg" alt="" class="responsive">
    <p>erer sdg hgfgj</p>
</div>
```

接下来，为常见的浏览器窗口的尺寸断点创建媒介查询：960px/1024/1280/1366/1440/1680
这个势力则是针对960px和1280px的媒介查询：

```
@media screen and (max-width: 960px) {
    .wrap {
        padding: 0 5%;
        width:90%;
    }
    .wrap img {
        width:90%;
        height:auto;
        padding:5%;
    }
    .wrap p {
        width:90%;
        padding:5%;
        text-align:justify;
    }
}
@media screen and (min-width:961px) and (max-width: 1280px) {
    .wrap {
        padding: 0 5%;
        width:90%;
    }
    .wrap img {
        width:50%;
        height:auto;
        max-width:600px;
        float:right;
    }
    .wrap p {
        width:50%;
        text-align:justify;
        float:left;
    }
}
@media screen and (min-width:1281px) {
    .wrap {
        padding: 0 5%;
        width:90%;
    }
    .wrap img {
        width:40%;
        height:auto;
        max-width:500px;
        float:left;
    }
    .wrap p {
        width:60%;
        text-align:justify;
        float:right;
    }
}
```
**工作原理**

1.浏览器根据自身窗口大小应用对应的媒介查询中的相关设置，使元素能够呈现出不同的width和height属性。
2.这样，在不同尺寸的设备窗口中得到合适大小的图片。
3.如果原始图片非常大， 在服务器端改变图片尺寸会是一个好的备选方案。

##### 3.6基于媒介查询隐藏元素

**准备工作**

这个方法可以应用于很多场景。一个常用的用例就是当页面在较小屏幕的设备上渲染时，菜单会被及时地隐藏，可以利用这点来改变关注的内容以及相关区域的显示方式。

**实现方式**

针对不同屏幕视图断点添加媒介查询。本例添加的是针对960px的媒介查询。

效果： http://img.blog.csdn.net/20161127210501631

移除元素的方法
1.position:absolute;left:5000px;
2.float:left;margin-left:-5000px;
3.display:none;
```
.foo {
    background-color:#ccc;
    width:300px;
}
.bar{
    background-color:blue;
    width:600px;
    color:white;
}
@media screen and (max-width: 960px) {
    img {
        position:absolute;
        left:5000px;
    }
    .bar{
        display:none;
    }
}
@media screen and (min-width: 960px) {
    .foo{
        float:left;
        margin-left:-5000px;
    }
}
```

**工作原理**

1.无论是绝对定位还是浮动都没有高度属性，其实就是脱离了文档流，因此一旦应用于某个元素，均不会占用任何垂直的空间区域。利用这个有用的小窍门可以很好的从页面上移除相应元素。
2.浮动元素布局会导致一些问题，这些问题可以为元素添加clear:both属性来解决

##### 3.7创建平滑过渡的响应式布局

**准备工作**

大家创建一个涉及多区域的响应式前端页面。页面中包括许多元素，而这些元素的响应方式又各不相同，最终生成给人印象深刻的页面布局，并能够提供出色的用户体验。

**实现方式**

效果： ![这里写图片描述](http://img.blog.csdn.net/20161127212406238)

1.创建一个基础页面， 该页面含有一个顶层包装元素、一个中层包装元素、一个页脚(header,content,footer)
2.header:
    header和content需要配合，1280以下，width都是100%，否则header是60%左浮动，content是40%右浮动
    header中有nav--菜单menu，通过媒介查询来隐藏和显示两个不同的菜单big-menu和small-menu。最小尺寸版本会是一个多选的下拉框式的菜单，较大尺寸版本的菜单则包含两个内联的列表。
```
<header>
    <nav>
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
    </nav>
</header>

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

3.content:

    content会把所有包装内容浮动到布局的右侧
    content是两个列式的布局，所占宽度比例是60/40，当宽度不够时，每个列所占比例是100%，只需要这两列都设置float为left即可。

```
.contact-us{
    float:left;
}
.cities{
    float:left;
}

@media screen and (max-width:600px) {
    .contact-us {
        width:100%;
    }
    .cities {
        width:100%;
    }
}
@media screen and (min-width:601px) {
    .contact-us {
        width:40%;
    }
    .cities {
        width:60%;
    }
}
```
4.footer:

    页脚内容全部位于占100%宽度的<footer>元素中
    其中包含一个包装元素footer-wrap，宽度同样是100%，max-width为1280px
    footer-wrap有三个始终含有display:inline-block属性的元素，屏幕尺寸较小时，每一个元素宽度是100%，否则他们宽度都是33%，并且向左浮动，且最小宽度是144px

```
<footer>
    <div class="footer-wrap">
        <div class="footer-1 footer-thrid">
            <li><a href="#">FaceBook</a></li>
            <li><a href="#">Google</a></li>
            <li><a href="#">Twitter</a></li>
        </div>

        <div class="footer-2 footer-thrid">
            <li><a href="#">FaceBook</a></li>
            <li><a href="#">Google</a></li>
            <li><a href="#">Twitter</a></li>
        </div>

        <div class="footer-3 footer-thrid">
            <li><a href="#">FaceBook</a></li>
            <li><a href="#">Google</a></li>
            <li><a href="#">Twitter</a></li>
        </div>
    </div>
</footer>

<style>
    footer {
        width: 100%;
    }
    .footer-wrap {
        width: 100%;
        max-width: 1280px;
        margin: 0 auto;
    }
    .footer-thrid {
        display: inline-block;
    }
    @media screen and (max-width:600px) {
        .footer-thrid {
            width: 100%;
        }
    }
    @media screen and (min-width:601px) {
        .footer-thrid {
            float: left;
            width: 33%;
            min-width: 144px;
        }
    }
</style>
```

**工作原理**

1.将CSS与媒介查询结合在收成一列一起，使得页脚在所有尺寸屏幕中都能居中显示。
2.移动设备上又能够收成一列。
3.响应式布局使得设计者和开发者能够构建适用于不同设备，尤其是移动设备的网页，而省去了开发原生App的花费。

#### 4.使用响应式框架
使用新型框架，通过最新的响应式方法和交互方式，既快速又可靠地完成响应式站点的设计和交付，以及如何将旧的静态框架转换为响应式类型的框架。

要多花些时间挑选契合自己的设计的框架，否则一款不适合的框架会产生事倍功半的效果。

##### 4.1使用流式960网格布局

960网格系统不是响应式的，更像一个表格，其列跨越固定宽度的表头。它在960px宽的窗口中布局最完美

**准备工作**

960网格布局使用了百分比宽度、左浮动元素替代了固定宽度的网格元素。该版本大数情况下能良好工作，但是当列变得很狭窄时，阅读会变得很困难。并且下载解压流式960网格系统代码，引入grid.css

**实现方式**

下面用container_16布局且使用了grid(引用了grid.css)
<div class="clear"></div>用于换行
```
<div class="container_16">
    <div class="grid_16">
        <h2>Fluid Grid</h2>
    </div>
    //换行标签
    <div class="clear"></div>

    <div class="grid_3 break-column">tryhrthuy</div>
    <div class="grid_5 break-column">bmdryEWEREWRT</div>
    <div class="grid_2 break-column">FGHDRTYFGXNXV</div>
    <div class="grid_2 break-column">CVGTAERT</div>
    <div class="grid_2 break-column">MNJYKT</div>
    <div class="grid_2 break-column">ERTSRYRTUY</div>

</div>
```
给上述流式布局添加一些响应式特性，添加媒介查询来覆盖1024px、600px、420px这几个屏幕断点
**工作原理**

1.若在浏览器中打开使用了非响应式流式网格的HTML文件，当浏览器窗口变小，页面中6列会保持相同比例，可读性会变差
2.添加媒介查询重载div元素的样式属性，从而得到响应式效果。
3.三种方法实现重载：
    1.使用min-width方法重载百分比宽度
    2.在grid.css文件之后加载responsive.css文件，并且在responsive.css使用多类显示命名空间(.grid_2.break-column等)
    3.使用！important声明提升重载等级

```
@media screen and (max-width:420px) {
    .break-column {
        min-width:360px;
    }
}
@media screen and (max-width:600px) and (min-width:421px) {
    .grid_2.break-column,
    .grid_3.break-column,
    .grid_5.break-column {
        width:48%;
    }
}
@media screen and (max-width:1024px) {
    .break-column {
        width:30% !important;
    }
}
```
##### 4.2使用Blueprint网格布局

Blueprint CSS框架是另外一款受欢迎的静态CSS网格系统。可以在某些情况下可能需要将静态的Blueprint CSS网格框架定制为自己需要的响应式Blueprint框架。只需简单添加几行CSS代码就能拥有响应式框架。

**准备工作**

下载源码

**实现方式**

总列数是22,先实现基本的blueprint布局
```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Document</title>

    <link rel="stylesheet" type="text/css" href="blueprint-css-master/blueprint/ie.css"/>
    <link rel="stylesheet" type="text/css" href="blueprint-css-master/blueprint/print.css"/>
    <link rel="stylesheet" type="text/css" href="blueprint-css-master/blueprint/screen.css"/>
    <link rel="stylesheet" type="text/css" href="test.css"/>
</head>
<body>
    <h1>Blueprint CSS Framework Responsive</h1>
    <hr>
    <div class="span-7">asfgerter jhgjghr etyry rfg</div>
    <div class="span-8">asfgerter jhgjghr etyry rfg</div>
    <div class="span-7">asfgerter jhgjghr etyry rfg</div>
    <hr>

    <hr>
    <div class="span-15">
        <img src="robots.jpg">
        <p>asfgerter jhgjghr etyry rfg</p>
    </div>
    <div class="span-7">
        <ul>
            <li>asfgerter jhgjghr etyry rfg</li>
            <li>asfgerter jhgjghr etyry rfg</li>
            <li>asfgerter jhgjghr etyry rfg</li>
        </ul>
    </div>
    <hr>
</body>
</html>
```
![](http://img.blog.csdn.net/20161201094914852)
接下来，把这个框架变成一个响应式框架

```
@media screen and (max-width:600px) {
	div[class*="span-"]{width:90%;}
}
@media screen and (min-width:601px) and (max-width:1024px){
	div[class*="span-"]{width:42%;}
}
```

**工作原理**

为了让Blueprint CSS框架具有响应式效果
1.首先将容器宽度由固定宽度修改为流式最大宽度、
2.然后设置一个媒介查询断点
本节主要是使用属性选择器在CSS中利用通配符批量修改span属性

##### 4.3基于三分法(Rule of thrids)的流式布局

基于三分法是一种设计方法论，即一个布局或图片如果从水平方向或者垂直方向被划分为三个区域。

**准备工作**

**实现方式**

**工作原理**

##### 4.4响应式960网格框架--Gumby

**准备工作**
**实现方式**
**工作原理**

##### 4.5易上手的Bootstrap框架

Bootstrap框架是完全响应式的，可以作为静态框架，也可以使用其提供的附加文件快速部署一个完全响应式的站点。

**准备工作**

**实现方式**

**工作原理**

#### 5.设计移动设备优先的web应用
实现web应用程序的移动版本。该章通过jQueryMobile优先针对移动设备优化，并针对桌面视窗进行了优化。
#### 6.优化响应式内容
#### 7.非侵入式javascript
