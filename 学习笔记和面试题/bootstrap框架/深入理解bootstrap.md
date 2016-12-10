屏幕分辨率(PX)：指在横纵向上的像素点数，单位是px，1px=1个像素点。一般以纵向像素*横向像素来表示一个手机的分辨率，如1960*1080。（这里的1像素值得是物理设备的1个像素点）

屏幕像素密度(PPI)：屏幕上每英寸可以显示的像素点的数量，单位是ppi，即“pixels per inch”的缩写。屏幕像素密度与屏幕尺寸和屏幕分辨率有关，在单一变化条件下，屏幕尺寸越小、分辨率越高，像素密度越大，反之越小。

DPI：dots per inch，最初用于衡量打印物上每英寸的点数密度，就是打印机可以在一英寸内打多少个点。当dpi的概念用在计算机屏幕上时，就称之为ppi。ppi和dpi是同一个概念，Android比较喜欢使用dpi，IOS比较喜欢使用ppi。

DP、DIP：dp和dip都是Density Independent Pixels的缩写，密度独立像素，可以想象成是一个物理尺寸，使同样的设置在不同手机上显示的效果看起来是一样的。

最明显的就是iPhone 3GS(non Retina,480*320px,163PPI)和iPhone 4(Retina,960*640px,326PPI)的区别。屏幕尺寸一样，屏幕分辨率相差一倍，屏幕像素密度也相差一倍。

在Android中，规定以160dpi为基准，1dp=1px。如果密度是320dpi，则1dp=2px，以此类推。

Android和IOS都会通过转换系数让控件适应屏幕的尺寸。一个按钮给了44*44dp的大小，在160dpi密度的时候，按钮就是44*44px大小；在320dpi密度的时候，按钮就是88*88px的大小。不需要我们去书写多套尺寸。

http://www.chinaz.com/web/2015/1110/468774.shtml

#### 1.入门准备

Bootstrap提供了如下重要特性：

1.一套完整基础CSS插件
2.丰富的预定义样式表
3.一组基于jQuery的JS插件集
4.一份灵活的响应式栅格系统，并且崇尚 **移动先行** 的思想

##### 1.1 HTML标准模板

meta标签：
  提供HTML文档的元数据。元数据不会显示在页面上，但是对于机器是可读的。

属性：
    charset     --将对网页使用的字符集作出声明
    http-equiv  --是一个编译指令， 即，由服务器提供的来指示页面应如何加载
    name        --把content属性关联到一个名称
    content     --定义用于翻译 content 属性值的格式

    name="viewport" 是优先移动浏览器的显示,手机浏览器是把页面放在一个虚拟的“窗口”（viewport）中，窗口可大于或小于手机的可视区域，一般手机默认viewport大于可视区域。这样不会破坏没有针对手机浏览器优化的网页的布局，用户可以通过平移和缩放来看网页的其他部分。

    一个常用的针对移动网页优化过的页面的 viewport meta 标签大致如下：

    ```
    <meta name="viewport" content="width=device-width, initial-scale=1, maximun-scale=1">
    ```
    width:控制viewport的大小
    height：控制viewport的高度
    initial-scale：初始缩放比例，也即是当页面第一次 load 的时候缩放比例
    minimun-scale：允许用户缩放到的最小比例
    maximun-scale：允许用户缩放到的最大比例
    user-scalable：用户是否可以手动缩放
    content里多个属性的设置一定要用分号和空格来隔开，如果不规范则不起作用

```
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <!-- Bootstrap从3.0版本开始全面支持移动平台，贯彻移动先行宗旨 -->
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title>Bootstrap 101 Template</title>

    <!-- Bootstrap -->
    <link href="bootstrap-3.3.7-dist/css/bootstrap.min.css" rel="stylesheet">

  </head>
  <body>
    <h1>Hello, world!Hello, world!Hello, world!Hello, world!Hello, world!Hello, world!Hello, world!Hello, world!Hello, world!Hello, world!</h1>

    <!-- bootstrap是基于jQuery-->
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>
    <script src="bootstrap-3.3.7-dist/js/bootstrap.min.js"></script>
  </body>
</html>
```

#### 2.整体架构

![这里写图片描述](http://img.blog.csdn.net/20161207093248273?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvZ2l0aHViXzM0NTE0NzUw/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast)

BootStrap框架公共六个部分：(css组件和js插件是其表现形式，其余的是基础支撑平台)
**表现形式**
    CSS组件
    JS插件
**基础支撑平台**
    CSS12栅格系统
    基础布局组件
    jQuery
    响应式设计

##### 2.1 CSS12栅格系统

12栅格系统是BootStrap的核心功能，也是响应式设计核心理念的一个实现方式。

###### 2.1.1 实现原理

栅格布局原理：定义容器大小，平分12分，在调整内外边距，最后结合媒体查询，制作出强大响应式的栅格系统。

![这里写图片描述](http://img.blog.csdn.net/20161207101744787?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvZ2l0aHViXzM0NTE0NzUw/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast)

1.最外层的边框，伴随着响应式思想，区分了四种类型浏览器，像素分界点768px、992px、1200px
2.第二层的边框，即.container样式容器，针对四种浏览器宽度不一样，值是自动、750px、970px、1170px
    ```
    //源码
    .container {
      padding-right: 15px;
      padding-left: 15px;
      margin-right: auto;
      margin-left: auto;
    }
    @media (min-width: 768px) {
      .container {
        width: 750px;
      }
    }
    @media (min-width: 992px) {
      .container {
        width: 970px;
      }
    }
    @media (min-width: 1200px) {
      .container {
        width: 1170px;
      }
    }
    ```
3.1号横条，左内边距和右内边距是15px，是12个col-lg-1，没有row，则会有边距
    ```
    //源码
    .col-xs-1, .col-sm-1, .col-md-1, .col-lg-1, .col-xs-2, .col-sm-2, .col-md-2, .col-lg-2, .col-xs-3, .col-sm-3, .col-md-3, .col-lg-3, .col-xs-4, .col-sm-4, .col-md-4, .col-lg-4, .col-xs-5, .col-sm-5, .col-md-5, .col-lg-5, .col-xs-6, .col-sm-6, .col-md-6, .col-lg-6, .col-xs-7, .col-sm-7, .col-md-7, .col-lg-7, .col-xs-8, .col-sm-8, .col-md-8, .col-lg-8, .col-xs-9, .col-sm-9, .col-md-9, .col-lg-9, .col-xs-10, .col-sm-10, .col-md-10, .col-lg-10, .col-xs-11, .col-sm-11, .col-md-11, .col-lg-11, .col-xs-12, .col-sm-12, .col-md-12, .col-lg-12 {
      position: relative;
      min-height: 1px;
      padding-right: 15px;
      padding-left: 15px;
    }
    ```

    ![这里写图片描述](http://img.blog.csdn.net/20161207110539576?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvZ2l0aHViXzM0NTE0NzUw/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast)
    ```
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <!-- Bootstrap从3.0版本开始全面支持移动平台，贯彻移动先行宗旨 -->
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>Bootstrap 101 Template</title>

        <!-- Bootstrap -->
        <link href="bootstrap-3.3.7-dist/css/bootstrap.min.css" rel="stylesheet">

      </head>
      <body>
        <div class="container" style="border:1px solid black">
                <div class="col-lg-1" style="border:1px solid black">col-lg-1</div>
                <div class="col-lg-1" style="border:1px solid black">col-lg-1</div>
                <div class="col-lg-1">col-lg-1</div>
                <div class="col-lg-1">col-lg-1</div>
                <div class="col-lg-1">col-lg-1</div>
                <div class="col-lg-1">col-lg-1</div>
                <div class="col-lg-1">col-lg-1</div>
                <div class="col-lg-1">col-lg-1</div>
                <div class="col-lg-1">col-lg-1</div>
                <div class="col-lg-1">col-lg-1</div>
                <div class="col-lg-1">col-lg-1</div>
                <div class="col-lg-1" style="border:1px solid black">col-lg-1</div>
        </div>
        <!-- bootstrap是基于jQuery-->
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>
        <script src="bootstrap-3.3.7-dist/js/bootstrap.min.js"></script>
      </body>
    </html>
    ```
4.2号横条，也就是row容器的定义,margin-left和margin-right都是-15px，组合row和列后，形成3号横条的效果，也就是左右宽度用满的效果。
    ```
    //源码
    .row {
      margin-right: -15px;
      margin-left: -15px;
    }
    ```

    有row，则会没边距
    ![这里写图片描述](http://img.blog.csdn.net/20161207111025748?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvZ2l0aHViXzM0NTE0NzUw/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast)
    ```
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <!-- Bootstrap从3.0版本开始全面支持移动平台，贯彻移动先行宗旨 -->
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>Bootstrap 101 Template</title>

        <!-- Bootstrap -->
        <link href="bootstrap-3.3.7-dist/css/bootstrap.min.css" rel="stylesheet">

      </head>
      <body>
        <div class="container" style="border:1px solid black">
            <div class="row">
                <div class="col-lg-1" style="border:1px solid black">col-lg-1</div>
                <div class="col-lg-1" style="border:1px solid black">col-lg-1</div>
                <div class="col-lg-1">col-lg-1</div>
                <div class="col-lg-1">col-lg-1</div>
                <div class="col-lg-1">col-lg-1</div>
                <div class="col-lg-1">col-lg-1</div>
                <div class="col-lg-1">col-lg-1</div>
                <div class="col-lg-1">col-lg-1</div>
                <div class="col-lg-1">col-lg-1</div>
                <div class="col-lg-1">col-lg-1</div>
                <div class="col-lg-1">col-lg-1</div>
                <div class="col-lg-1" style="border:1px solid black">col-lg-1</div>
            </div>
        </div>
        <!-- bootstrap是基于jQuery-->
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>
        <script src="bootstrap-3.3.7-dist/js/bootstrap.min.js"></script>
      </body>
    </html>
    ```
###### 2.1.2 基本用法

1.列组合

```
<div class="container" style="border:1px solid black">
    <div class="row">
        <div class="col-lg-8" style="border:1px solid black">col-lg-8</div>
        <div class="col-lg-4" style="border:1px solid black">col-lg-4</div>
    </div>
    <div class="row">
        <div class="col-lg-6" style="border:1px solid black">col-lg-6</div>
        <div class="col-lg-6" style="border:1px solid black">col-lg-6</div>
    </div>
</div>
```

实现很简单，就是涉及了两个CSS特性：左浮动和宽度百分比

```
//源码
@media (min-width: 1200px) {
  .col-lg-1, .col-lg-2, .col-lg-3, .col-lg-4, .col-lg-5, .col-lg-6, .col-lg-7, .col-lg-8, .col-lg-9, .col-lg-10, .col-lg-11, .col-lg-12 {
    float: left;
  }
  .col-lg-12 {
    width: 100%;
  }
  .col-lg-11 {
    width: 91.66666667%;
  }
  .col-lg-10 {
    width: 83.33333333%;
  }
  .col-lg-9 {
    width: 75%;
  }
  .col-lg-8 {
    width: 66.66666667%;
  }
  .col-lg-7 {
    width: 58.33333333%;
  }
  .col-lg-6 {
    width: 50%;
  }
  .col-lg-5 {
    width: 41.66666667%;
  }
  .col-lg-4 {
    width: 33.33333333%;
  }
  .col-lg-3 {
    width: 25%;
  }
  .col-lg-2 {
    width: 16.66666667%;
  }
  .col-lg-1 {
    width: 8.33333333%;
  }
}
```
2.列偏移

我们不想让相邻的列挨在一起，则利用栅格系统的列偏移.col-xs(sm,md,lg)-offset-\* 功能来实现，不必再定义margin

```
<div class="row">
    <div class="col-lg-8 col-lg-offset-2" style="border:1px solid black">col-lg-8 col-lg-offset-2</div>
    <div class="col-lg-2 col-lg-offset-2" style="border:1px solid black">col-lg-2 col-lg-offset-2</div>
</div>
```

```
//源码
.col-lg-offset-12 {
  margin-left: 100%;
}
.col-lg-offset-11 {
  margin-left: 91.66666667%;
}
.col-lg-offset-10 {
  margin-left: 83.33333333%;
}
.col-lg-offset-9 {
  margin-left: 75%;
}
.col-lg-offset-8 {
  margin-left: 66.66666667%;
}
.col-lg-offset-7 {
  margin-left: 58.33333333%;
}
.col-lg-offset-6 {
  margin-left: 50%;
}
.col-lg-offset-5 {
  margin-left: 41.66666667%;
}
.col-lg-offset-4 {
  margin-left: 33.33333333%;
}
.col-lg-offset-3 {
  margin-left: 25%;
}
.col-lg-offset-2 {
  margin-left: 16.66666667%;
}
.col-lg-offset-1 {
  margin-left: 8.33333333%;
}
.col-lg-offset-0 {
  margin-left: 0;
}
```

3.列嵌套

栅格系统也支持列嵌套，也就是一个列中可以在声明一个或者多个行.内部嵌套的row宽度是100%，就是当前外部列的宽度

```
<div class="row">
    <div class="col-lg-8" style="border:1px solid black">col-lg-8</div>
    <div class="col-lg-4" style="border:1px solid black">
        <div class="row">
            <div class="col-lg-6">col-lg-6</div>
            <div class="col-lg-6">col-lg-6</div>
        </div>
    </div>
</div>
```

4.列排序

列排序就是改变列的方向，也就是改变左右浮动，并且设置浮动的距离。可以通过.col-xs(sm,md,lg)-pull(push)-\*
所有列设置的都是左浮动，通过设置left和right来实现定位显示。push则设置left，pull则设置right

其实只是利用了float，left，right三个属性就实现了这种效果
![这里写图片描述](http://img.blog.csdn.net/20161207155813708?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvZ2l0aHViXzM0NTE0NzUw/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast)

```
//源码
.col-lg-pull-12 {
  right: 100%;
}
.col-lg-pull-11 {
  right: 91.66666667%;
}
.col-lg-pull-10 {
  right: 83.33333333%;
}
.col-lg-pull-9 {
  right: 75%;
}
.col-lg-pull-8 {
  right: 66.66666667%;
}
.col-lg-pull-7 {
  right: 58.33333333%;
}
.col-lg-pull-6 {
  right: 50%;
}
.col-lg-pull-5 {
  right: 41.66666667%;
}
.col-lg-pull-4 {
  right: 33.33333333%;
}
.col-lg-pull-3 {
  right: 25%;
}
.col-lg-pull-2 {
  right: 16.66666667%;
}
.col-lg-pull-1 {
  right: 8.33333333%;
}
.col-lg-pull-0 {
  right: auto;
}
.col-lg-push-12 {
  left: 100%;
}
.col-lg-push-11 {
  left: 91.66666667%;
}
.col-lg-push-10 {
  left: 83.33333333%;
}
.col-lg-push-9 {
  left: 75%;
}
.col-lg-push-8 {
  left: 66.66666667%;
}
.col-lg-push-7 {
  left: 58.33333333%;
}
.col-lg-push-6 {
  left: 50%;
}
.col-lg-push-5 {
  left: 41.66666667%;
}
.col-lg-push-4 {
  left: 33.33333333%;
}
.col-lg-push-3 {
  left: 25%;
}
.col-lg-push-2 {
  left: 16.66666667%;
}
.col-lg-push-1 {
  left: 8.33333333%;
}
.col-lg-push-0 {
  left: auto;
}
```

###### 2.1.3 响应式栅格

已知col-xs-* col-sm-* col-md-* col-lg-*

1.跨设备组合定义
一种样式（比如col-md-9）在其定义的尺寸范围以外是不起作用的，比如，在小型或者大型屏幕上，所有带有md的样式都不会生效。我们可以在一个元素上应用不同的样式，以适配不同尺寸的屏幕。

```
<div class="container" style="border:1px solid black">
    <div class="row">
        <div class="col-xs-6 col-sm-3" style="border:1px solid black"> div1 col-xs-6 col-sm-3 qwerwrgwefhsdgfsdfg</div>
        <div class="col-xs-6 col-sm-3" style="border:1px solid black"> div2 col-xs-6 col-sm-3</div>
        <div class="clearfix visible-xs"></div>
        <div class="col-xs-6 col-sm-3" style="border:1px solid black"> div3 col-xs-6 col-sm-3</div>
        <div class="col-xs-6 col-sm-3" style="border:1px solid black"> div4 col-xs-6 col-sm-3</div>
    </div>
</div>
```
![这里写图片描述](http://img.blog.csdn.net/20161207162220045?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvZ2l0aHViXzM0NTE0NzUw/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast)

如图，由于div3换行时，但div1过高，则div3就右边紧挨着显示了。
所以需要利用clearfix样式清除浮动，但前提是在超小型屏幕上才显示(用visible-xs控制)
```
<div class="container" style="border:1px solid black">
    <div class="row">
        <div class="col-xs-6 col-sm-3" style="border:1px solid black"> div1 col-xs-6 col-sm-3 qwerwrgwefhsdgfsdfg</div>
        <div class="col-xs-6 col-sm-3" style="border:1px solid black"> div2 col-xs-6 col-sm-3</div>
        <div class="clearfix visible-xs"></div>
        <div class="col-xs-6 col-sm-3" style="border:1px solid black"> div3 col-xs-6 col-sm-3</div>
        <div class="col-xs-6 col-sm-3" style="border:1px solid black"> div4 col-xs-6 col-sm-3</div>
    </div>
</div>
```
![这里写图片描述](http://img.blog.csdn.net/20161207162512768?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvZ2l0aHViXzM0NTE0NzUw/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast)
```
//源代码
.clearfix:before,
.clearfix:after,
.dl-horizontal dd:before,
.dl-horizontal dd:after,
.container:before,
.container:after,
.container-fluid:before,
.container-fluid:after,
.row:before,
.row:after,
.form-horizontal .form-group:before,
.form-horizontal .form-group:after,
.btn-toolbar:before,
.btn-toolbar:after,
.btn-group-vertical > .btn-group:before,
.btn-group-vertical > .btn-group:after,
.nav:before,
.nav:after,
.navbar:before,
.navbar:after,
.navbar-header:before,
.navbar-header:after,
.navbar-collapse:before,
.navbar-collapse:after,
.pager:before,
.pager:after,
.panel-body:before,
.panel-body:after,
.modal-header:before,
.modal-header:after,
.modal-footer:before,
.modal-footer:after {
  display: table;
  content: " ";
}
.clearfix:after,
.dl-horizontal dd:after,
.container:after,
.container-fluid:after,
.row:after,
.form-horizontal .form-group:after,
.btn-toolbar:after,
.btn-group-vertical > .btn-group:after,
.nav:after,
.navbar:after,
.navbar-header:after,
.navbar-collapse:after,
.pager:after,
.panel-body:after,
.modal-header:after,
.modal-footer:after {
  clear: both;
}
//源代码
@media (max-width: 767px) {
  .visible-xs {
    display: block !important;
  }
  table.visible-xs {
    display: table !important;
  }
  tr.visible-xs {
    display: table-row !important;
  }
  th.visible-xs,
  td.visible-xs {
    display: table-cell !important;
  }
}
```
##### 2.2 基础布局组件

在12栅格系统上基础上，BootStrap还提供了多种基础布局组件
--buttons,tables,labels,badges(徽章),dropdown menus,nav(导航),navbar(导航条),alert,progress bars(进程条),list groups,panels(面板),wells(是一种会引起内容凹陷显示或插图效果的容器)

CSS组件，总结为8大类型的样式：
基础样式、颜色样式、尺寸样式、状态样式、特殊元素样式、并列元素样式、嵌套子元素样式、动画样式

###### 2.2.1基础样式

基本样式，一般包含文本字体，颜色背景，边框，定位等，如下面警告框：
```
//源码
.alert {
  padding: 15px;
  margin-bottom: 20px;
  border: 1px solid transparent;
  border-radius: 4px;
}
```
###### 2.2.2颜色样式

看BootStrap官网的按钮btn或者alert警告框会发现许多组件默认的5种颜色样式：
primary(重点蓝)、success(成功绿)、info(信息蓝)、warning(警告橙)、danger(危险红)
http://getbootstrap.com/examples/theme/

定义规则：组件名称-颜色类型，比如btn-primary，alert-info

```
//源码
.btn-primary {
  color: #fff;
  background-color: #337ab7;
  border-color: #2e6da4;
}
```
###### 2.2.3尺寸样式

BootStrap为大部分组件都提供了尺寸的快捷设置。一般组件包含xs、sm、普通、lg四种尺寸
定义规则：组件名称-尺寸，比如btn-xs

```
//源码
.btn-lg,
.btn-group-lg > .btn {
  padding: 10px 16px;
  font-size: 18px;
  line-height: 1.3333333;
  border-radius: 6px;
}
.btn-sm,
.btn-group-sm > .btn {
  padding: 5px 10px;
  font-size: 12px;
  line-height: 1.5;
  border-radius: 3px;
}
.btn-xs,
.btn-group-xs > .btn {
  padding: 1px 5px;
  font-size: 12px;
  line-height: 1.5;
  border-radius: 3px;
}
```

###### 2.2.4状态样式

高亮可用的时候用active样式，禁用的时候用disabled样式或disabled属性。

```
//源码
.btn:active,
.btn.active {
  background-image: none;
  outline: 0;
  -webkit-box-shadow: inset 0 3px 5px rgba(0, 0, 0, .125);
          box-shadow: inset 0 3px 5px rgba(0, 0, 0, .125);
}
```
###### 2.2.5特殊元素样式

所谓特殊元素，即特定类型的组件一般只使用某一种或者几种固定的元素。
比如：alert警告框内一般有警告标题、内容、关闭链接元素；nav导航中常用li元素

```
//源码
//alert内连接的样式
.alert .alert-link {
  font-weight: bold;
}
//alert内p元素和ul元素的底部外边距设置
.alert > p,
.alert > ul {
  margin-bottom: 0;
}
//两个段落之间，增加一个段落外边距
.alert > p + p {
  margin-top: 5px;
}
//增大右内边距，以便关闭按钮
.alert-dismissable,
.alert-dismissible {
  padding-right: 35px;
}
//关闭按钮，右对齐
.alert-dismissable .close,
.alert-dismissible .close {
  position: relative;
  top: -2px;
  right: -21px;
  color: inherit;
}
```

```
//源码
.nav > li {
  position: relative;
  display: block;
}
.nav > li > a {
  position: relative;
  display: block;
  padding: 10px 15px;
}
.nav > li > a:hover,
.nav > li > a:focus {
  text-decoration: none;
  background-color: #eee;
}
.nav > li.disabled > a {
  color: #777;
}
.nav > li.disabled > a:hover,
.nav > li.disabled > a:focus {
  color: #777;
  text-decoration: none;
  cursor: not-allowed;
  background-color: transparent;
}
```
###### 2.2.6并列元素样式

很多情况下，一个组件内部需要放置多个子元素，比如导航栏nav里放置多个li元素，按钮组可以放置多个button元素。
一般并列元素考虑：1.水平并列时左右内边距(padding-left padding-right)和外边距(margin-left margin-right)2.垂直并列时上下内边距(padding-top padding-bottom)和外边距(margin-top margin-bottom)

```
//源码
.alert > p,
.alert > ul {
  margin-bottom: 0;
}
.alert > p + p {
  margin-top: 5px;
}
```

```
.modal-footer .btn + .btn {
  margin-bottom: 0;
  margin-left: 5px;
}
```

###### 2.2.7嵌套子元素样式

需要将两个相同或不同的组件嵌套在一起使用，这时会有特殊情况，比如，多个按钮组在一起使用，或者按钮和下拉菜单一起使用。

需要考虑嵌套元素的使用情况。比如多个分组按钮一起使用的时候，需要考虑浮动方向和间距

```
//源码
//消除2个按钮(或一个按钮和另外一个按钮组)之间的1像素细节引起的冲突
.btn-group .btn + .btn,
.btn-group .btn + .btn-group,
.btn-group .btn-group + .btn,
.btn-group .btn-group + .btn-group {
  margin-left: -1px;
}
```
###### 2.2.8动画样式

动画样式在BootStrap中的进度条progress组件中才使用到。

```
<div class="progress">
    <div class="progress-bar" style="width:45%">
        <span class="sr-only">45% complete</span>
    </div>
</div>
```

注意用.progress是总进度条，progress-bar是进度条显示的部分，还有五种颜色progress-bar-success等
sr-only，全称是 screen reader only（仅供）屏幕阅读器有时候 UI 上会出现一些仅供视觉识别的元素，比如说“汉堡包菜单按钮”只有视力正常的人才能清楚辨识这些元素的作用。而残障人士，比如弱势或盲人是不可能知道这些视觉识别元素是什么的。他们上网使用的是屏幕阅读器，也就是 screen reader（sr），屏幕阅读器需要找到能辨识的文本说明然后“读”出来给用户听。
```
//源码
.progress {
  height: 20px;
  margin-bottom: 20px;
  overflow: hidden;
  background-color: #f5f5f5;
  border-radius: 4px;
  -webkit-box-shadow: inset 0 1px 2px rgba(0, 0, 0, .1);
          box-shadow: inset 0 1px 2px rgba(0, 0, 0, .1);
}
.progress-bar {
  float: left;
  width: 0;
  height: 100%;
  font-size: 12px;
  line-height: 20px;
  color: #fff;
  text-align: center;
  background-color: #337ab7;
  -webkit-box-shadow: inset 0 -1px 0 rgba(0, 0, 0, .15);
          box-shadow: inset 0 -1px 0 rgba(0, 0, 0, .15);
  -webkit-transition: width .6s ease;
       -o-transition: width .6s ease;
          transition: width .6s ease;
}
.progress-striped .progress-bar,
.progress-bar-striped {
  background-image: -webkit-linear-gradient(45deg, rgba(255, 255, 255, .15) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, .15) 50%, rgba(255, 255, 255, .15) 75%, transparent 75%, transparent);
  background-image:      -o-linear-gradient(45deg, rgba(255, 255, 255, .15) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, .15) 50%, rgba(255, 255, 255, .15) 75%, transparent 75%, transparent);
  background-image:         linear-gradient(45deg, rgba(255, 255, 255, .15) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, .15) 50%, rgba(255, 255, 255, .15) 75%, transparent 75%, transparent);
  -webkit-background-size: 40px 40px;
          background-size: 40px 40px;
}
.progress.active .progress-bar,
.progress-bar.active {
  -webkit-animation: progress-bar-stripes 2s linear infinite;
       -o-animation: progress-bar-stripes 2s linear infinite;
          animation: progress-bar-stripes 2s linear infinite;
}
.progress-bar-success {
  background-color: #5cb85c;
}
.progress-striped .progress-bar-success {
  background-image: -webkit-linear-gradient(45deg, rgba(255, 255, 255, .15) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, .15) 50%, rgba(255, 255, 255, .15) 75%, transparent 75%, transparent);
  background-image:      -o-linear-gradient(45deg, rgba(255, 255, 255, .15) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, .15) 50%, rgba(255, 255, 255, .15) 75%, transparent 75%, transparent);
  background-image:         linear-gradient(45deg, rgba(255, 255, 255, .15) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, .15) 50%, rgba(255, 255, 255, .15) 75%, transparent 75%, transparent);
}
.progress-bar-info {
  background-color: #5bc0de;
}
.progress-striped .progress-bar-info {
  background-image: -webkit-linear-gradient(45deg, rgba(255, 255, 255, .15) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, .15) 50%, rgba(255, 255, 255, .15) 75%, transparent 75%, transparent);
  background-image:      -o-linear-gradient(45deg, rgba(255, 255, 255, .15) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, .15) 50%, rgba(255, 255, 255, .15) 75%, transparent 75%, transparent);
  background-image:         linear-gradient(45deg, rgba(255, 255, 255, .15) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, .15) 50%, rgba(255, 255, 255, .15) 75%, transparent 75%, transparent);
}
.progress-bar-warning {
  background-color: #f0ad4e;
}
.progress-striped .progress-bar-warning {
  background-image: -webkit-linear-gradient(45deg, rgba(255, 255, 255, .15) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, .15) 50%, rgba(255, 255, 255, .15) 75%, transparent 75%, transparent);
  background-image:      -o-linear-gradient(45deg, rgba(255, 255, 255, .15) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, .15) 50%, rgba(255, 255, 255, .15) 75%, transparent 75%, transparent);
  background-image:         linear-gradient(45deg, rgba(255, 255, 255, .15) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, .15) 50%, rgba(255, 255, 255, .15) 75%, transparent 75%, transparent);
}
.progress-bar-danger {
  background-color: #d9534f;
}
.progress-striped .progress-bar-danger {
  background-image: -webkit-linear-gradient(45deg, rgba(255, 255, 255, .15) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, .15) 50%, rgba(255, 255, 255, .15) 75%, transparent 75%, transparent);
  background-image:      -o-linear-gradient(45deg, rgba(255, 255, 255, .15) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, .15) 50%, rgba(255, 255, 255, .15) 75%, transparent 75%, transparent);
  background-image:         linear-gradient(45deg, rgba(255, 255, 255, .15) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, .15) 50%, rgba(255, 255, 255, .15) 75%, transparent 75%, transparent);
}
```

###### 2.2.9总结

1.通常8种类型样式，需要组合使用，比如设置active状态时候还要兼顾颜色和尺寸样式，设置尺寸又要考虑并列元素的情况，所以从高层往下考虑，考虑需要写哪几种样式。
2.还有就是样式利用CSS重载覆盖的概念，注意定义的顺序，以免重载顺序错误。

##### 2.3 JavaScript插件架构

BootStrap所有的插件在开发中都遵循了同样的规则，也为自定义插件提供了规范和依据(如下三个规则)：

###### 2.3.1 HTML布局规则：基于元素自定义属性的布局规则，比如使用类似于

###### 2.3.2 JavaScript实现步骤(所有插件都遵循jQuery插件开发的标准步骤，所有事件保持统一的标准)

BootStrap中所有JavaScript插件走遵循统一的实现步骤，维护方便，自定义插件也方便，步骤如下：

**1.声明立即调用函数，比如+function($){"use strict";...}(jQuery);**

参数中传入jQuery的对象，通过参数$引入变量，好处是：
1.函数内部的$符变量代表了局部变量，而不是全局变量中代表jQuery的$符变量，以达到防止变量污染的目的。
2.内部的代码都是私有代码，外部代码无法访问。只能通过第三步，在$.fn上设置了插件(比如$.fn.alert=)的形式，通过$符变量才能将整个插件通过唯一的借口$.fn.alert暴露出去，从而保护了内部代码。
```
//function前边的+，主要目的是防止前面有未正常结束的代码(比如遗漏了分号)，导致前后代码被编译器认为是一体的，从而导致代码运行出错。
+function($){
    "use strict";

}(window.jQuery);
```

**2.定义插件类(或者选择器)以及相关原型方法。比如Alert,prototype.close**

定义插件类Alert，然后在定义一些原型函数，比如close函数方法。
先定义选择器，所有符合该自定义属性的元素可以触发下面的事件。
```
var dismiss = '[data-dismiss="alert"]';
var Alert = function(el) {
    //传入元素，如果元素内部有dismiss上设置的自定义属性，则click事件会触发原型上的close方法
    $(el).on('click',dismiss,this.close);
};
Alert.prototype.close = function(e) {

}
```

**3.在jQuery上定义插件并重设插件构造函数，例如$.fn.alert.Constructor=Alert**

在jQuery上定义插件，以便通过jQuery.[插件名称]()的方式，也能够使用该插件。

```
//jQuery插件的定义使用了标准的方式，在fn上进行扩展,在jQuery上定义alert插件
var old = $.fn.alert;
//保留其他插件的$.fn.alert代码(如果定义)以便在noConflict之后，可以继续使用改旧代码
//先备份之前插件的旧代码，以便在后面防冲突的时候使用
$.fn.alert = function (option) {
    return this.each(function () {
        //根据选择器，遍历所有符合规则的元素，然后在元素上绑定插件的实例，以便监控用户的事件行为
    })
}
//在附加扩展之后，重新设置插件的构造器(即Constructor属性)，这样就可以通过Constructor属性查询到插件的真实类函数，使用new操作符实例化的时候也不会出错
$.fn.alert.Constructor = Alert;
```
不声明第三步的话，HTML声明式的方式也是可以用的。所以第三步是专门为某些喜欢用js代码触发事件的人所准备的。需要注意的是，如果第三步不需要，第四步的方冲突的功能也就没办法用了~

**4.防冲突处理(noConflict)，例如$.fn.alert.noConflict**

目的是让BootStrap插件和其他UI库的同名插件并存。

```
$.fn.alert.noConflict = function() {
    //恢复以前的代码
    $.fn.alert = old
    //将$.fn.alert.noConflict()设置为BootStrap的alert插件
    return this
}
```

比如A库中有个同名$.fn.alert插件，则BootStrap在执行之前就通过old先备份了，
然后执行$.fn.alert.noConflict后就会还原该old对象插件
而使用BootStrap的alert插件的话，则通过var alert = $.fn.alert.noConflict()的形式，将BootStrap的alert插件转移到另外一个变量上，从而继续使用。

**5.绑定各种触发事件(data-api)**

由于已经为jQuery提供了默认的$.fn.alert扩展插件功能，就可以手工编写js代码来触发事件了。
这里主要是为声明式的HTML触发事件。即：在HTML文档里已经按照布局规则声明了相关的自定义属性(比如data-dismiss="alert")，然后通过这里的代码初始化默认的单击事件行为。

```
/*
绑定触发事件
为声明式的HTML绑定单击事件
在整个document对象上，检测是否有自定义属性data-dismiss="alert"，若有则关闭指定的警告框
 */
$(document).on('click.bs.alert.data-api',dismiss,Alert.prototype.close)
```
###### 2.3.3 插件调用方法(插件使用方式可以是HTML声明式或者调用式)

##### 2.4 响应式设计

响应式设计师一个理念，而不是功能，放在架构图的左边就是因为BootStrap的所有内容，都是以响应式设计为设计理念来实现的。

##### 2.5 CSS组件
