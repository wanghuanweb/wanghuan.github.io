SASS（Syntactically Awesome Stylesheet）是一个CSS预处理器，有助于减少CSS的重复，节省时间。 它是更稳定和强大的CSS扩展语言，描述文档的样式干净和结构。

LESS和Sass之间的主要区别是他们的实现方式不同，LESS是基于JavaScript运行,所以LESS是在客户端处理。

另一方面，Sass是基于Ruby的，是在服务器端处理的。很多开发者不选择LESS是因为LESS输出修改过的CSS到浏览器需要依赖于Javascript引擎，而Javascript引擎需要额外的时间来处理代码。关于这个有很多种方式，我选择的是只在开发环节使用LESS。一旦开发完成，我就复制粘贴LESS输出的到一个压缩器，然后到一个单独的CSS文件来替代LESS文件。另一种方式是使用LESS APP来编译和压缩你的LESS文件。两种方式都将是最小化你的样式输出，从而避免由于用户的浏览器不支持Javascript而可能引起的任何问题。尽管这不大可能，但终归是有可能的。

LESS、Sass、Stylus，用来预编译Sass或less，增强了css代码的复用性，
 还有层级、mixin、变量、循环、函数等，具有很方便的UI组件模块化开发能力，极大的提高工作效率。

**sass优点**

1.结构清晰干净
2.编写css更快
3.兼容所有css
4.可以使用嵌套等语法函数

### 1.sass的使用

sass --watch xx:xx --style compressed

1.nested：嵌套缩进的css代码，它是默认值。
2.expanded：没有缩进的、扩展的css代码。
3.compact：简洁格式的css代码。(元素另起行)
4.compressed：压缩后的css代码。

### 2.基本用法

变量--变量声明，变量在字符串，全局和局部变量
嵌套--选择器，属性，伪类嵌套
混合宏--带参数混合宏，不带参数混合宏,会有冗余的代码
继承--这倒是不回有冗余代码了，会合并的
混合宏，继承，占位符对比
if-else语句
循环(for,while,each)
函数(字符串函数/数字函数/列表函数/颜色函数/Introspection 函数/三元函数等)

**变量**

1.变量声明号$ 变量名称 变量值
  $width: 200px;

2.如果变量需要镶嵌在字符串之中，就必须需要写在#{}之中。
```
$side : left;
　　.rounded {
　　　　border-#{$side}-radius: 5px;
　　}
```

3.全局变量和局部变量
```
$color: orange !default;//定义全局变量
.block {
  color: $color;//调用全局变量
}
em {
  $color: red;//定义局部变量
  a {
    color: $color;//调用局部变量
  }
}
span {
  color: $color;//调用全局变量
}
```
**嵌套**

1.选择器嵌套--可以使用&引用父元素

```
//css
div h1 {
　　　　color : red;
　　}
//scss
div{
    h1{
        color:red;
    }
}
```
```
可以使用&引用父元素
//a:hover的写法
a {
　　　　&:hover { color: #ffb3ff; }
　　}
```

2.属性嵌套
Sass 中还提供属性嵌套，CSS 有一些属性前缀相同，只是后缀不一样，比如：border-top/border-right，与这个类似的还有 margin、padding、font 等属性。
```
//css
.box {
    border-top: 1px solid red;
    border-bottom: 1px solid green;
}
//scss
.box {
  border: {
   top: 1px solid red;
   bottom: 1px solid green;
  }
}
```

3.伪类嵌套
其实伪类嵌套和属性嵌套非常类似，只不过他需要借助`&`符号一起配合使用。
```
//css
clearfix:before, .clearfix:after {
  content: "";
  display: table;
}
.clearfix:after {
  clear: both;
  overflow: hidden;
}
//scss
.clearfix{
&:before,
&:after {
    content:"";
    display: table;
  }
&:after {
    clear:both;
    overflow: hidden;
  }
}
```

**混合宏**
其实宏就是一个可以重用的代码块。

1.不带参数的混合宏
```
@mixin border-radius{
    -webkit-border-radius: 5px;
    border-radius: 5px;
}
//使用@include来调用宏
div{
    @include border-radius;
}
```

2.带参数的混合宏
```
@mixin border-radius($radius:5px){
    -webkit-border-radius: $radius;
    border-radius: $radius;
}
```

3.复杂的混合宏
```

```

不足之处：
混合宏在实际编码中给我们带来很多方便之处，特别是对于复用重复代码块。但其最大的不足之处是会生成冗余的代码块。
```
//scss
@mixin border-radius{
  -webkit-border-radius: 3px;
  border-radius: 3px;
}

.box {
  @include border-radius;
  margin-bottom: 5px;
}

.btn {
  @include border-radius;
}
//css
.box {
  -webkit-border-radius: 3px;
  border-radius: 3px;
  margin-bottom: 5px;
}

.btn {
  -webkit-border-radius: 3px;
  border-radius: 3px;
}
```

**继承**
在 Sass 中的继承，可以继承类样式块中所有样式代码，而且编译出来的 CSS 会将选择器合并在一起，形成组合选择器：
```
//SCSS
.btn {
  border: 1px solid #ccc;
  padding: 6px 10px;
  font-size: 14px;
}

.btn-primary {
  background-color: #f36;
  color: #fff;
  @extend .btn;
}

.btn-second {
  background-color: orange;
  color: #fff;
  @extend .btn;
}
//css
.btn, .btn-primary, .btn-second {
  border: 1px solid #ccc;
  padding: 6px 10px;
  font-size: 14px;
}

.btn-primary {
  background-color: #f36;
  color: #fff;
}

.btn-second {
  background-clor: orange;
  color: #fff;
}
```

**混合宏，继承，占位符对比**

E:\wanghuan.github.io\sass\混合宏，继承，占位符.jpg

```
//SCSS中混合宏使用
@mixin mt($var){
  margin-top: $var;  
}

.block {
  @include mt(5px);

  span {
    display:block;
    @include mt(5px);
  }
}

.header {
  color: orange;
  @include mt(5px);

  span{
    display:block;
    @include mt(5px);
  }
}

//SCSS 继承的运用
.mt{
  margin-top: 5px;  
}

.block {
  @extend .mt;

  span {
    display:block;
    @extend .mt;
  }
}

.header {
  color: orange;
  @extend .mt;

  span{
    display:block;
    @extend .mt;
  }
}

//SCSS中占位符的使用
%mt{
  margin-top: 5px;  
}

.block {
  @extend %mt;

  span {
    display:block;
    @extend %mt;
  }
}

.header {
  color: orange;
  @extend %mt;

  span{
    display:block;
    @extend %mt;
  }
}
```

**if-else语句**
```
@if
```
**for语句**
```
@for $i from <start> to <end>  (to不包含end数)
@for $i from <start> through <end> (through包含end数)
```

网格系统生成各个格子的class代码
```
$grid-prefix:span !default;
$grid-width:60px !default;
$grid-gutter:20px !default;
%grid{
    float: left;
    margin-left: $grid-gutter / 2;
    margin-right: $grid-gutter / 2;
}

@for $i from 1 through 12{
    .#{$grid-prefix}#{$i}{
        width: $grid-width * $i + $grid-gutter * ($i - 1);
        @extend %grid;
    }
}
```
**while循环**
```
$types:4;
$type-width:20px;
@while $types > 0{
    .whild-#{$types} {
        width: $type-width + $types;
    }
    $types:$types - 1;
}
```
**each循环**
@each $var in <list>

```
$list: adam john wynn mason kuroir;

@mixin author-images {
    @each $author in $list {
        .photo-#{$author} {
            background: url("/images/avatars/#{$author}.png") no-repeat;
        }
    }
}

.author-bio {
    @include author-images;
}
```

**函数**
字符串函数：

--unquote($string)：删除字符串中的引号(只能删除字符串最前和最后的引号（双引号或单引号），而无法删除字符串中间的引号。)
--quote($string)：给字符串添加引号。(用来给字符串添加引号。如果字符串，自身带有引号会统一换成双引号 "")
--To-upper-case()
--To-lower-case()

数字函数：
```
percentage($value)--不带单位的数转换成百分数
round($value)--四舍五入
ceil($value)--较大的数
floor($value)--去掉小数部分
abs($value)--返回数的绝对值
min($numbers…)--找出最小值
max($numbers…)--找出最大值
random()--获取随机数
```

列表函数：

lenght($list)
length(10px 20px (border 1px solid) 2em)
为4
--返回一个列表中有几个值，列表参数之间使用空格隔开，不能使用逗号，否则函数将会出错

nth($list, $n)
nth(10px 20px 30px,1)
为10px
--指定列表中某个位置的值， $n 必须是大于 0 的整数

join($list1, $list2, [$separator])
join(10px 20px, 30px 40px)
为(10px 20px 30px 40px)
--[$separator],可以是auto，comma(,)，space(空格)
--将两个列表连接合并成一个列表，只能将两个列表连接成一个列表，如果直接连接两个以上的列表将会报错
--不只碰到两个列表连接成一个列表，这个时候就需要将多个 join() 函数合并在一起使用
join((blue red), join((#abc #def),(#dee #eff)))
为(#0000ff #ff0000 #aabbcc #ddeeff #ddeeee #eeffff)

append($list1, $val, [$separator])
--append((blue green),red,comma)
为(#0000ff, #008000, #ff0000)
-- append((blue green),red,space)
为(#0000ff #008000 #ff0000)

zip($lists…)
--将多个列表值转成一个多维的列表，每个单一的列表个数值必须是相同的否则出错
--zip(1px 2px 3px,solid dashed dotted,green blue red)
为((1px "solid" #008000), (2px "dashed" #0000ff), (3px "dotted" #ff0000))

index($list, $value)
-- 函数类似于索引一样，主要让你找到某个值在列表中所处的位置
--index(1px solid red, 1px)
为1

Introspection函数：
type-of($value)：返回一个值的类型
unit($number)：返回一个值的单位
unitless($number)：判断一个值是否带有单位
comparable($number-1, $number-2)：判断两个值是否可以做加、减和合并

**自动浏览器加前缀**

```
@mixin prefix($property,$value){
    -webkit-#{$property}:$value;
    -moz-#{$property}:$value;
    #{$property}:$value;
}
@mixin radius($value){
    @include prefix(border-radius,$value)
}
div{
    @include radius(50px);
}
```

则为
```
div{
    -webkit-border-radius:50px;
    -moz-border-radius:50px;
    border-raduis:50px;
}
```
