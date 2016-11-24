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

##### 2.1创建自适应的响应式字体

使用新的尺寸单位REM，REM的意思就是根EM，若使用EM单位，意味着字体尺寸与根元素尺寸有关，而不是父元素字体。
#### 3.响应式布局
创建可实际应用到项目中的响应式布局。如何使用视窗和媒介查询，是的Web站点在不同视区大小和类型下变成响应式。
#### 4.使用响应式框架
使用新型框架，通过最新的响应式方法和交互方式，既快速又可靠地完成响应式站点的设计和交付，以及如何将旧的静态框架转换为响应式类型的框架。
#### 5.设计移动设备优先的web应用
实现web应用程序的移动版本。该章通过jQueryMobile优先针对移动设备优化，并针对桌面视窗进行了优化。
#### 6.优化响应式内容
#### 7.非侵入式javascript
