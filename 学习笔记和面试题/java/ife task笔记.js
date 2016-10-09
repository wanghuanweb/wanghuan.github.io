task1:零基础HTML编码
HTML 是一种标记语言
HTML 标签：标记了html文档和元素
HTML 元素：从开始到结束标签的所有代码，是基本的构造区块
HTML 属性:一般都在开始标签中定义，名称/值形式出现

HTML 之前遗忘的标签：这些标签都是为了更好的语义化，语义化方便爬虫等分析
  <nav> :导航栏（横竖均可），用于link other pages
        <nav>
          <ul>
            <li></li>
            <li></li>
            <li></li>
          </ul>
        </nav>

  <article> :定义外部的内容，外部内容可以是来自外部的新闻提供者的一篇新的文章或者是来自blog的文本
      MDN:Each <article> should be identified, typically by including a heading (<h1>-<h6> element) as a child of the <article> element.
  <header>:定义文档的页眉；对应<footer>定义文章的页脚
  <aside> 标签定义 article 以外的内容。aside 的内容应该与 article 的内容相关。：<aside> 的内容可用作文章的侧栏。
  ##整体区块划分
对一些表示块的标签应用的不是很多，导航用nav，头部用header，文章用article， 区块用section，插入图片用figure，侧边栏用aside，正确的使用这些标签无疑能让 代码的可读性更高，结构性更强
        <article>
          <header>
            <h1></h1>
            <h6></h6>
          </header>
          <p></p>--或许海可以被<section>包围
          <footer></footer>
        </article>

  <figure>:用作文档中插图的图像
  <figcaption>:定义figure元素的标题caption
        <figure>
          <figcaption>标题</figcaption>
          <img src=""/>
        </figure>
  <section>

表格table：<table><thread><tbody><tfoot><tr><th><td>
  <table border="1">
  <caption></caption>
  <thead>
    <tr>
      <th>Month</th>
      <th>Savings</th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td>January</td>
      <td>$100</td>
    </tr>
    <tr>
      <td>February</td>
      <td>$80</td>
    </tr>
  </tbody>

  <tfoot>
    <tr>
      <td>Sum</td>
      <td>$180</td>
    </tr>
  </tfoot>

  </table>

表单form：<form><input><textarea><select><label><fieldset>
表单会用到的标签<form>
<span> 标签被用来组合文档中的行内元素。
<em>和<strong>标签是为了强调一段话中的关键字时使用，它们的语义是强调。
<span>标签是没有语义的，它的作用就是为了设置单独的样式用的。

<input>文本，单选，多选，提交按钮
<label>主要用于绑定一个表单元素，当点击label便签的时候，被绑定的表单元素就会获得焦点,和其他表单元素比如input一起使用
      <input type="radio" name="sex" id="male"/>
      <label for="male">男</label>
      <input type="radio" name="sex" id="female"/>
      <label for="female">女</label>
<textarea>多行文本
<select>下拉框选择；
input标签的属性placeholder，pattern 属性规定用于验证输入字段的模式，模式指的是正则表达式pattern="[0-9A-Za-z]{6,16}"
<fieldset>表单内相关元素分组，可以将表单一部分内容打包，生成一组相关表单的字段
legend 元素为 fieldset 元素定义标题（caption）。

https://www.iandevlin.com/blog/2011/04/html5/html5-section-or-article

task2:零基础HTML及CSS编码

属性：
border-radius：向 div 元素添加圆角边框（按钮等）/* offset-x | offset-y | blur-radius | color */box-shadow: 10px 5px 5px black;
box-shadow:基本适用于所有元素，若元素设置了border-radius则阴影也有圆角
text-decoration:none;文本装饰，比如a是否有下划线等
display:使段落生成行内框，实现块级元素以行内元素呈现，或者行内元素以块级元素呈现等，常用值none、inline、block、inline-block及table相关
border-collapse:table中常用
text-indent:2em;段落首行缩进2em
vertical-align 指定了行内水平（inline-level）元素或表格单元格（table-cell）元素的垂直对齐方式

感悟：
1.看了task2之后，我就有点领会到了再task1中很多标签的重要性，也理解到了语义化的重要性；只有充分语义化，我们才方便操作每个模块。
比如，task1，我们可以用一堆的<p>标签实现，但是充分使用task1讲的标签后，语义化充分之后，我们方便后续对页面的完善和修改。
2.导航栏可别随意给nav设置宽度，或者padding-left等，不然在你电脑上很美，在别人电脑上可以是一坨屎，尽量使用float和width：auto
  记住电脑的分辨率是不同的！！！
3.表单实现很多多样，但是要逻辑上清除明细，可从代码中看出我之前和现在的表单写法进行对比。

body和浏览器之间默认有间距
body{
  margin:0px;
}
CSS：Cascading Style Sheets 层叠样式表
浏览器在展现一个文档的时候，必须要把文档内容和相应的样式信息结合起来展示。 这个处理过程一般分两个阶段：
1.浏览器先将标记语言和CSS转换成DOM (文档对象模型)结构。 这时DOM 就代表了电脑内存中的相应文档，因为它已经融合了文档内容和相应的样式表。
2.最后浏览器把 DOM的内容展示出来。

选择器selectors:
1.标签选择器strong{}
2.class选择器.
3.id选择器#
4.除了class和id属性的选择器，其他属性可以用方括号的形式指定其他属性。比如，选择器 [type='button'] 选中所有 type 属性为 button 的元素。
5.多个选择器组合，比如 选择器 p.key 选中所有class属性为key的<p> 元素
6.伪类选择器：不仅可以让你为符合某种文档树结构的元素指定样式，还可以为符合某些外部条件的元素指定样式
  浏览历史(比如是否访问过 (:visited)， 内容状态(如 :checked ), 鼠标位置 (如:hover). 完整列表参见 CSS3 Selectors working spec.
  selector:pseudo-class {
    property: value;
  }
7.基于关系的选择器
  选择器 选择的元素
  A E 任何是元素A的后代元素E (后代节点指A的子节点，子节点的子节点，以此类推)
  A > E 任何元素A的子元素
  E:first-child 任何元素的第一个子元素E
  B + E 任何元素B的下一个兄弟元素E
  B ~ E B元素后面的拥有共同父元素的兄弟元素E
https://developer.mozilla.org/zh-CN/docs/Web/Guide/CSS/Getting_started/Selectors

8.布局（水平居中、垂直居中、定位、浮动等）：
  1.先了解盒子模型：
  margin外边距，border边框，padding内边距，element元素
  2.水平布局和水平居中
  盒子模型理解水平布局：
  父元素width=子元素margin-left+border-left+padding-left+width+padding-right+border-right+margin-right;
  这也是这些元素可以设置为auto的原因

    1.行内元素实现水平居中（文本和链接）：
      text-align="center";

    2.使用width和margin水平居中：
    若宽度已知
      {
          width:100px;
          margin-left:auto;
          margin-right:auto;
      }
    3.使用position，margin和left水平居中
     eg1:实现在父元素水平居中
      .box {
      height: 100px;
      width: 100px;
      /*Centering Method 2*/
      position: absolute;
      margin: 0px 0 0 -50px;//宽度的一半
      left: 50%;
      }
      eg2:实现在父元素水平居中
      .box {
      height: 100px;
      width: 70%;
      /*Centering Method 2*/
      position: absolute;
      margin: 0px 0 0 -35%;//宽度的一半
      left: 50%;
      }


    3.使用incline-block水平居中：
      仅inline-block属性是无法让元素水平居中，display:incline-block;
      他的关键之处要在元素的父容器中设置text-align的属性为“center”，这样才能达到效果
    4.浮动实现水平居中的方法：
        <ul>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
        </ul>
        ul{
          float:left;
          position:relative;
          left:50%;//整个分页向右边移动宽度的50%
        }
        li{
          float:left;//我们会让导航浮动到左边，而且每个分页项也进行浮动，
          position:relative;
          right:50%;//将每个分页项向左边移动宽度的50%
        }
  3.垂直布局和垂直居中对齐
    盒子模型理解垂直布局：
    父元素height=子元素margin-top+border-top+padding-top+height+padding-bottom+border-bottom+margin-bottom
    这也是这些元素可以设置为auto的原因
      1.单行文字
        若单行文字居中，让line-height设置与外部盒子的height值一样即可。
      2.多行文字
  4.包含浮动
    一个父元素包含了多个浮动的子元素。页面的内容设置了一个宽度，子元素的浮动确定了他们的位置，但浮动元素不会影响父元素的宽度。
    这样做会让父元素塌陷，从而使父元素的高度为“0”，以及忽略其他的属性。
    <div class="box-set">
    <div class="box">Box 1</div>
    <div class="box">Box 2</div>
    <div class="box">Box 3</div>
    </div>

    .box-set {
    background: #e8eae9;
    }
    .box {
      background: #8ec63f;
      height: 100px;
      float: left;
      margin: 10px;
      width: 200px;
    }
    这个父元素box-set会塌陷，不会出现background: #e8eae9;的效果；
    清除浮动：
    1.父元素中加入overflow清除浮动，则不会出现塌陷，父元素效果可以呈现出来
    .box-set {
    background: #404853;
    overflow: auto;
    }
    使用“overflow:auto;”,在IE中会给元素添加滚动条，最好是直接使用“overflow:hidden;”来清除浮动。
    2.clearfix清除浮动
    “clearfix”技巧是基于在父元素上使用“:before”和“:after”两个伪类。
    使用这些伪类，我们可以在浮动元素的父容器前面和后面创建隐藏元素。
    “:before”伪类是用来防止子元素顶部的外边距塌陷，使用“display: table”创建一个匿名的“table-cell”元素。
    “:after”伪类是用来防止子元素的底部的外边距塌陷，以及用来清除元素的浮动。
    .box-set:before,
    .box-set:after {
      content: "";
      display: table;
    }
    .box-set:after {
      clear: both;
    }
    .box-set {
      *zoom: 1;
    }
  5.定位position
  使用定位，可以准确的定义元素框相对于其正常位置应该出现在哪，或者相对于父元素，另一个元素甚至浏览器窗口本身的位置
  position relative:relative”可以给元素设置位移（offset）“top、right、bottom和left”属性。通过这些位移属性设置可以给元素进行精确的定位。
  position absolute:绝对定位元素会脱离文档流,绝对定位元素的位置直接和父容器是否设置了相对定位（绝对定位）有直接关系。
  绝对定位元素需要至少一个祖先元素设置了相对定位（绝对定位），不然元素定位会相对于页面的主体进行定位。
  position fixer:固定定位和绝对定位很类似，但是他定位是相对于浏览器窗口，并且不会随滚动条进行滚动。
  固定定位最常见的一种用途就是在页面中创建一个固定头部、或者脚部、或者固定页面的一个侧面。不需使用margin、border和padding
  6.z-index属性
    改变元素是的层叠顺序，改变这种层叠顺序可以直接使用“z-index”来控制。元素的“z-index”值越高将会出现在越上面，不管元素在Dom哪个位置上。


task3：三栏式布局
position 属性的基本知识：
  static：
      这个关键字使得这个元素使用正常的表现，即元素处在文档流中它当前的布局位置，top, right, bottom, left 和 z-index 属性无效。
  relative：相对定位
      相对定位（position: relative）的元素仍然被认为是处于文档流之中。
      使用这个关键字来布局元素就好像这个元素没有被设置过定位一样。即会适应该元素的位置，并不改变布局（这样会在此元素原本所在的位置留下空白）。
      position:relative对table-*-group, table-row, table-column, table-cell, table-caption无效。

      如下CSS代码，可以将元素定位到距离它本来位置的顶部和左侧分别 20px 的位置。
      <div class="box" id="one">One</div>
      <div class="box" id="two">Two</div>
      <div class="box" id="three">Three</div>
      <div class="box" id="four">Four</div>

      .box {
       display: inline-block;
       background: red;
       width: 100px;
       height: 100px;
       float: left;
       margin: 20px;
       color: white;
      }

      #two {
         position: relative;
         top: 20px;
         left: 20px;
      }
  absolute：绝对定位
      绝对定位（position: absolute）的元素则被认为脱离了文档流。绝对定位元素的位置是相对于他最近的定位祖先元素（position值非static）。如果没有这样一个祖先元素，则相对于原始的容器。
      不为元素预留空间，元素位置通过指定其与它最近的非static定位的祖先元素的偏移来确定。
      绝对定位的元素可以设置外边距（margins），并且不会与其他边距合并。
      #one { position: relative; width: 500px; }
      #two { position: absolute; top: 20px; left: 20px; }
  fixed：固定位置
      不为元素预留空间。通过指定相对于屏幕视窗的位置来指定元素的空间，并且该元素的位置在屏幕滚动时不会发生改变。打印时元素会出现在的每页的固定位置。
      fixed属性通常会创建新的栈环境。
      #one { position: fixed; top: 80px; left: 20px; }

float属性的基本知识：（对于可变的高度序列，absolute的position就没有作用，则用float）
  CSS的float 属性可以使一个元素脱离正常的文档流，然后被安放到它所在容器的的左端或者右端，并且其他的文本和行内元素围绕它安放。
  一个 浮动元素（floating element） 是一个float属性计算值不是none的元素。
  取值：
    left表明元素必须漂浮在其所在的块容器左侧的关键字。
    right表明元素必须漂浮在其所在的块容器右侧的关键字。
    none表明元素不得进行浮动的关键字。
  参考资料：
    MDN：position：了解 CSS position 属性的基本知识
    MDN：float：了解 CSS float 属性的基本知识
    Learn CSS Positioning in Ten Steps：通过具体的例子熟悉 position 属性
    清除浮动（clearfix hack）：清除浮动是什么，如何简单地清除浮动
    StackOverflow：Which method of ‘clearfix’ is best?：清除浮动黑科技完整解读
、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、04.02
task4：
圆的画法：先画相应矩形，在用border-radius
画出圆
{
  width:100px;
  height:100px;
  border-radius:50px;
}
画出方向四个不同的本圆
.top
{
  width: 100px;
  height: 50px;
  border-radius: 50px 50px 0 0;
}
.right {
  height: 100px;
  width: 50px;
  border-radius: 0 50px 50px 0;
}
.bottom {
  width: 100px;
  height: 50px;
  border-radius: 0 0 50px 50px;
}
.left {
  width: 50px;
  height: 100px;
  border-radius: 50px 0 0 50px;
}
画出四分之一个圆方法：
{
  width:50px;
  height:50px;
  border-radius:50px 0 0 0;
}
border-radius:50px 0 0 0等价于将border-raduis属性分成四个属性来设置，把一个圆分成上左，上右，下右，下左4份
border-top-left-radius:
border-top-right-radius:
border-bottom-right-radius:
border-bottom-left-radius:
------------------------------------------------------------------------------------------------
task5:
task6:
首行放大的方法：
（first-letter）orspan标签，之前没加行高70px,一直下边会重叠？so为什么？我觉得还是相当于span标签没有给高度，就直接只有字体大小并且是浮动的，所以会造成这样
就像div若没有设高度就会像不存在一样，必须有东西将其分开
span{
  font-size: 70px;
  color: #f5e327;
  font-family: Microsoft YaHei;
  border-right: 5px;
  float: left;
  line-height: 70px;
}
文字环绕图片：
  操作中的错误：
  1.图片用了绝对定位和top等，图片位置是准确了，但图片会覆盖到文字。因为绝对定位文档流中没有图片的位置，因此图片会覆盖文字，这很正常，将图片取消绝对定位才不会覆盖。使用float：right实现浮动即可。
  2.段落p，使用了float left，认为这样可以图片在右，文字在左。但其实多次一举，并且效果不佳。因为图片已经占了文档中的部分，剩下p自动占据剩下文档的位置。
  <div id="p5content">
      <p id="p5content-1"><span>前</span>端前端前端前端端前端前端前端端前端前端前端端前端前端前端端前端前端前端端前端前端前端端前端前端前端端前端前端前
        <img src="part5picture.jpg">
        端端前端前端前端端前端前端前端端前端前端前端端前端前端前端端前端前端前端端前端前端前端端前端前端前端端前端前端前端端前端前端前端端前端前端前端端前端前端前端端前端前端前端端前端前端前端端前端前端前端端前端前端前端端前端前端前端端前
        端前端前端端前端前端前端端前端前端前端端前端前端前端端前端前端前端端前端前端前端端前端前端前端端前端前端前端端前端前端前端端前端前端前端端前端前端前端端前端前端前端端前端前端前端端前端前端前端端前端前端前端.</p>
      <p class="p5content-2">端前端前端前端端前端前端前端端前端前端前端端前端前端前端端前端前端前端端前端前端前端端前端前端前端端前端前端前端端前端前端前端端前端前端端前端前端前端端前端前端前端端前端前端前端端前端前端前端端前端前端前端端前端前端前端端前端前端前端端前端前端前端端前端前端前端端前端前端.</p>
      <p class="p5content-2">端前端前端前端端前端前端前端端前端前端前端端前端前端前端端前端前端前端端前端前端前端端前端前端前端端前端前端前端端前端前端前端端前端前端</p>
  </div>

  #part-5 #p5content p{
    line-height: 16px;
    margin-bottom: 16px;
  }
  #part-5 #p5content #p5content-1 span{
    font-size: 70px;
    color: #f5e327;
    font-family: Microsoft YaHei;
    border-right: 5px;
    float: left;
    line-height: 70px;
  }
  #part-5 #p5content #p5content-1 img{
    border: 1px solid black;
    margin: 8px;
    width: 35%;
    float: right;
  }
  #part-5 #p5content .p5content-2{
    text-indent: 2em;
  }

task7:
1.给html图片上叠加半透明颜色层，并且在半透明颜色层上叠加文字
  使用absolute+opacity属性实现不透明度、
  或者不用定位，直接就使用margin-top:一个负数，来定位，但这种不可取，除非明确知道跟top的距离。
  <div id="part-5">
    <img src="part_5\part_05_1.png">
    <div id="p5pic2">
    <div>
  </div>

  #part-5{
    width: 1280px;
    height: 350px;
    border: 1px solid black;
    padding: 0px;
    position: relative;
  }
  #part-5 img{
    width: 100%;
    height: 100%;
    top: 0px;
    position: absolute;
  }
  #part-5 #p5pic2{
    width: 100%;
    height: 100%;
    margin: 0px;
    background-color: #cc7680;
    opacity: 0.2;
    top: 0px;
    position: absolute;
  }
  背景透明，文字不透明
  若使用上述opacity方法，则背景透明，但是文字也跟着透明；若想文字不透明，应该用background: rgba(204,118,128,0.2);
  #part-5 #p5pic2{
    width: 100%;
    height: 100%;
    margin: 0px;
    /*background-color: #cc7680;
    opacity: 0.2;*/
    background: rgba(204,118,128,0.2);
    top: 0px;
    position: absolute;
    text-align: center;
  }
  原因：rgba(204,118,128,0.2)中让父元素是rgba颜色，这其中有一个alpha通道（css中新加的）。
  alpha通道：设定透明度的时候需要单独对每一个设定，可以特定对元素的某个属性设定透明值
  opacity：opacity直接就运用在了整个标签上，只能设定整个元素的透明值
  =-----------------------------------------------------------------------------------------------------------------
2.颜色渐变：
  gradient(top.#,#);
  第一个参数表示线性渐变的方向，top是从上到下、left是从左到右，如果定义成left top，那就是从左上角到右下角。
  第二个和第三个参数分别是起点颜色和终点颜色。你还可以在它们之间插入更多的参数，表示多种颜色的渐变。
3.伪类和伪元素:
  相同点：
    二者都是给某些元素设置特殊的效果，但这些元素实际上并不在文档中生成，它们将在外部可见，
    但是你将不会在文档的源代码中找到它们，因此，实际上它们是“虚假”的元素或者类。
  区别：
    伪类：伪类都效果可以添加一个实际的类来达到。
    p>i:first-child {color: red}
    <p>
        <i>first</i>
        <i>second</i>
    </p>
    伪元素：伪元素的效果则需要通过添加一个实际的元素才能达到。
    .first-child {color: red}
    <p>
        <i class="first-child">first</i>
        <i>second</i>
    </p>
    实际上 css3 为了区分两者，已经明确规定了伪类用一个冒号来表示，而伪元素则用两个冒号来表示。
    :first-line对p元素的第一行文本进行格式化
    :first-letter第一个字设置特殊效果
      （first-letter）orspan标签，之前没加行高70px,一直下边会重叠？so为什么？我觉得还是相当于span标签没有给高度，就直接只有字体大小并且是浮动的，所以会造成这样
      就像div若没有设高度就会像不存在一样，必须有东西将其分开
      span{
        font-size: 70px;
        color: #f5e327;
        font-family: Microsoft YaHei;
        border-right: 5px;
        float: left;
        line-height: 70px;
      }
  :before伪元素在元素的内容前插入新内容
  :after伪元素在元素的内容后插入新内容
3.a标签样式
 1.a标签常用的伪类
 a:link没访问过的链接样式
 a:visited访问过的链接样式
 a:hover鼠标进入连接区域的链接样式
 a:active点击鼠标时的链接样式
 顺序：如下，有人总结了一个便于记忆的“爱恨原则”（LoVe/HAte)原理
  #part-1 nav ul li a:link{
    text-decoration: none;
    color:black;
  }
  #part-1 nav ul li a:visited{
    text-decoration:underline;
    color: #ff6a6a;
  }
  #part-1 nav ul li a:hover{
    text-decoration:underline;
    color: #ff6a6a;
  }
  #part-1 nav ul li a:active{
    text-decoration: underline;
    color: #ff6a6a;
  }
4.用css实现向下箭头、三角形等
  向下箭头：画出border边框，用border-width属性隐藏掉两边，再旋转一下，就可以成为一个向下箭头
    display: block;
    width: 6px;
    height: 6px;
    border: solid #867e7a;
    border-width: 0 1px 1px 0;
    -webkit-transform: rotate(45deg);
    transform: rotate(45deg);
  三角形：
  .triangle-up {
    width:0;
    height:0;
    border-left:30px solid transparent;
    border-right:30px solid transparent;
    border-bottom:60px solid #fff;
  }
  .triangle-down {
    width:0;
    height:0;
    border-left:20px solid transparent;
    border-right:20px solid transparent;
    border-top:40px solid #0066cc;
  }
  .triangle-left {
    width:0;
    height:0;
    border-top:30px solid transparent;
    border-bottom:30px solid transparent;
    border-right:60px solid yellow;
  }
  .triangle-right {
    width:0;
    height:0;
    border-top:50px solid transparent;
    border-bottom: 50px solid transparent;
    border-left: 100px solid green;}
5.超出行数限制
6.纯css改变下拉列表select的默认样式
    select {
      /*Chrome和Firefox里面的边框是不一样的，所以复写了一下*/
      border: solid 1px #000;
      /*很关键：将默认的select选择框样式清除*/
      appearance:none;
      -moz-appearance:none;
      -webkit-appearance:none;
      /*在选择框的最右侧中间显示小箭头图片*/
      background: url("http://ourjs.github.io/static/2015/arrow.png") no-repeat scroll right center transparent;
      /*为下拉小箭头留出一点位置，避免被文字覆盖*/
      padding-right: 14px;
    }
task8:响应式网格布局
1.bootstrap 的网格系统(grid system)：
  Bootstrap 包含了一个响应式的、移动设备优先的、不固定的网格系统，可以随着设备或视口大小的增加而适当地扩展到 12 列。
  它包含了用于简单的布局选项的预定义类，也包含了用于生成更多语义布局的功能强大的混合类。
  相应式的网格系统随着屏幕或视口（viewport）尺寸的增加，系统会自动分为最多12列。

  本task就是
  .col-xs-
  .col-sm-
2.outline属性和border属性的对比
border是边框属性
outline设置元素轮廓样式，不一定是矩形，不占据空间，不会增加额外的width和height，不一定是矩形，在此任务中边框用outline实现较好
  outline-style设置元素轮廓的格式
  outline-width设置元素轮廓的宽度
  outline-color设置元素轮廓的颜色
3.calc的使用
  其实之前知道calc的用法，但是不常用，这里虽然用了，但是在做task的时候，-左右没加空格，-都没有识别，多以值得注意。
  .col-md-1{
    width:calc(8.33% - 20px);
  }


task9:使用HTML/CSS实现一个复杂页面
1.实现圆角边框，其实很简单，但是之前使用outline习惯了，用此便出现问题
正确写法：
{
  width: 335px;
  height: 400px;
  border: 2px solid #eaeaea;
  border-radius: 10px;
}
之前用的outline和border-raduis无法实现，查了之后发现可以用outline和outline-raduis，但是这个好像只有火狐支持，所以不推荐。
2.调整段落间的间距
  使用margin-top和margin-bottom
task9:使用HTML/CSS实现一个复杂页面
1.使用了css3的not选择器
目的：给日历加样式，但是排除掉头部
#part-09 #p9content .p9content-a:not(#p9content-1) ul li:hover{
  background-color: #eaeaea;
  box-shadow: 2px 2px 2px #eaeaea;
}
2.日历做法借鉴横向导航栏的做法


task10：Flexbox 布局
1.flexbox布局
    flexbox：是css3中的新的布局模式，可以控制未知容器元素的对齐方式、排列方向、排列顺序。
    flex布局：（由父元素和它的直接子元素组成）
      父元素：成为flex容器
      直接子元素：成为flex项目/flex item
    flex容器的属性：
      1.  设置display:flex;/display:inline-flex;
      2.  设置flex容器的主轴方向，执行flex项目在flex容器中的排列方式。flex-direction:row/row-reverse/column/column-reverse;
      3.  flex项目在flex容器中默认显示一行，若控制flex项目在flex容器按一行或者多行排列flex-wrap:nowrap(默认值)/wrap/wrap-reverse;
      4.  flex-flow(是flex-direction和flex-wrap属性的简写)
      5.  制定flex项目在flex容器沿着主轴在当前行的对齐方式justify-content:flex-start/flex-end/center/space-between/space-around;
      6.  flex项目在容器側轴对齐方式，类似于justify-content,align-items:stretch（填满默认值）/flex-start/flex-end/center/baseline;
      7.  flex容器内的行内flex容器中側轴排列方式align-content:stretch/flex-start/flex-end/center/space-between/space-around;
      8.  flex容器上不能使用::first-line和::first-letter伪元素.所有column-*属性在flex容器上都不生效
    flex项目属性：
      1.  控制flex容器中flex项目的排列顺序order，默认值是0
      2.  制定flex项目的放大和缩小比例，决定了flex项目相对flex容器自由空间进行放大缩小flex-grow、flex-shrink
      3.  制定flex项目的大小flex-basis（与width和height相同）
      4.  flex(flex-grow,flex-shrink,flex-basis属性的简写)
      5.  使用align-self属性可以指定flex项目自身的对齐方式或者使用align-items来指定单个flex项目。
          使用align-items对齐方式来解释flex容器，能更好的理解他们的值。

2.flexbox布局和bootstrap网格布局的差异

task12:
css3新特性：（其实在之前task多少有用到一些新特性，这里做个总结）
1.新增选择器/新的伪类：
  [attribute^="value"]eg:a[src^="https"] 选择其 src 属性值以 "https" 开头的每个 <a> 元素。
  [attribute$="value"]eg:a[src$=".pdf"] 选择其 src 属性以 ".pdf" 结尾的所有 <a> 元素
  [attribute*="value"]eg:a[src*="abc"] 选择其 src 属性中包含 "abc" 子串的每个 <a> 元素。 [class*="col-"]类名中包含col-子串的元素

  n可以是even、odd（表格常用）、m*n+偏移量（m自己定一个值）、数字
  :only-child eg:p:only-child 选择属于其父元素的唯一子元素的每个 <p> 元素。
  :nth-child(n) eg:p:nth-child(2) 选择属于其父元素的第二个子元素的每个 <p> 元素。
  :nth-last-child(n) eg：p:nth-last-child(2) 同上，从最后一个子元素开始计数。
  :last-child eg:p:last-child 选择属于其父元素最后一个子元素每个 <p> 元素。

  :nth-of-type(n) eg:p:nth-of-type(2) 选择属于其父元素第二个 <p> 元素的每个 <p> 元素。
  :nth-last-of-type(n) eg:p:nth-last-of-type(2) 同上，但是从最后一个子元素开始计数。
  :first-of-type  eg:p:first-of-type 选择属于其父元素的首个 <p> 元素的每个 <p> 元素。
  :last-of-type  eg:p:last-of-type 选择属于其父元素的最后 <p> 元素的每个 <p> 元素。
  :only-of-type  eg:p:only-of-type 选择属于其父元素唯一的 <p> 元素的每个 <p> 元素。

  :nth-child(n) 选择器匹配属于其父元素的第 N 个子元素，不论元素的类型。
  :nth-of-type(n) 选择器，该选择器选取父元素的第 N 个指定类型的子元素。

  :root  eg::root 选择文档的根元素。
  :empty  eg:p:empty 选择没有子元素的每个 <p> 元素（包括文本节点）。
  :target  eg:#news:target 选择当前活动的 #news 元素。
  :enabled  eg:input:enabled 选择每个启用的 <input> 元素。
  :disabled  eg:input:disabled 选择每个禁用的 <input> 元素
  :checked  eg:input:checked 选择每个被选中的 <input> 元素。
  :not(selector)  eg::not(p) 选择非 <p> 元素的每个元素。
  :focus(鼠标点入之后)
  --这个文本框focus动画效果感觉蛮好看的~，代码如下
    input:focus{
    width: 200px;
    transition: width 2s;
    border: #87c6f9 1px solid;
    box-shadow: 0 0 8px rgba(103,166,217,1);
    }
2.伪元素：
  伪元素使用两个冒号而不是一个来表示
   :after 变为 ::after， :before 变为 ::before，
   :first-letter 变为 ::first-letter， :first-line 变为 ::first-line。

3.css3边框属性：
   border-radius，box-shadow，border-image
   border-radius：（用此属性画出圆，半圆，四分之一圆）
       圆的画法：先画相应矩形，在用border-radius
       画出圆
       {
         width:100px;
         height:100px;
         border-radius:50px;
       }
       画出方向四个不同的半圆
       .top
       {
         width: 100px;
         height: 50px;
         border-radius: 50px 50px 0 0;
       }
       .right {
         height: 100px;
         width: 50px;
         border-radius: 0 50px 50px 0;
       }
       .bottom {
         width: 100px;
         height: 50px;
         border-radius: 0 0 50px 50px;
       }
       .left {
         width: 50px;
         height: 100px;
         border-radius: 50px 0 0 50px;
       }
       画出四分之一个圆方法：
       {
         width:50px;
         height:50px;
         border-radius:50px 0 0 0;
       }
       border-radius:50px 0 0 0等价于将border-raduis属性分成四个属性来设置，把一个圆分成上左，上右，下右，下左4份
       border-top-left-radius:
       border-top-right-radius:
       border-bottom-right-radius:
       border-bottom-left-radius:
  box-shadow：eg：box-shadow: 10px 10px 5px #888888;
4.css3背景
  background-origin：规定背景图片的定位区域，背景图片可以放置于 content-box、padding-box 或 border-box 区域。
5.css3过渡
  如下transition过渡，则是focus到input框之后，2s变成width为200
    input:focus{
    width: 200px;
    transition: width 2s;
    border: #87c6f9 1px solid;
    box-shadow: 0 0 8px rgba(103,166,217,1);
    }
    向宽度、高度和转换添加过渡效果：
    transition: width 2s, height 2s, transform 2s;

6.css3实现banner切换




####1.回顾

回顾下构造函数，原型和实例的关系
构造函数：都有一个原型属性，指向一个原型对象。
原型对象：都包含一个指向构造函数的指针
实例：包含一个指向原型对象的内部指针
http://blog.csdn.net/github_34514750/article/details/51044272#t1

####2.原型链实现继承
ECMAScript无法实现接口继承，而是依靠**原型链**支持**实现继承**。
**基本思想**：利用原型让一个引用类型继承另外一个引用类型的属性和方法。原型链的构建是将一个类型的实例赋值给另一个构造函数的原型实现的。从而，子类型可以访问超类型的所有属性和方法。

```
<script type="text/javascript">
    function Person(name,age){
        this.name=name;
        this.age=age;
    }
    Person.prototype.sayHello=function(){
        alert("使用原型得到Name："+this.name);
    }
    var per=new Person("马小倩",21);
    per.sayHello(); //输出：使用原型得到Name:马小倩

    function Student(){}
    Student.prototype=new Person("洪如彤",21);
    var stu=new Student();
    Student.prototype.grade=5;
    Student.prototype.intr=function(){
        alert(this.grade);
    }
    stu.sayHello();//输出：使用原型得到Name:洪如彤
    stu.intr();//输出：5
</script>
```
**问题**：原型链的问题是对象实例共享所有继承的属性和方法，不适合单独使用。借用构造函数一起实现，即在子类型构造函数的内部调用超类型构造函数。
####3.借用构造函数实现继承
即子类型构造函数的内部调用超类型构造函数

```
function SuperType(){
	this.colors = ["red","blue","green"];
}
function SubType(){
	//继承了构造函数SuperType
	SuperType.call(this);
}
var instance1 = new SubType;
instance1.colors.push("black");
alert(instance1.colors);//red,blue,green,black

var instance2 = new SubType;
alert(instance2.colors);//red,blue,green
```

####4.组合继承（原型链和借用构造函数的技术组合）

```
function SuperType(name){
	this.name = name;
	this.colors = ["red","blue","green"];
}
SuperType.prototype.sayName = function(){
	alert(this.name);
};
function SubType(name,age){
	//继承属性
	SuperType.call(this,name);
	this.age = age;
}
```
