##### 1.JavaScript介绍
1. 是一种跨平台、面向对象的轻量级的脚本语言，可用于web和HTML，可以运用于服务器、PC端、移动端。

2. 完整的 JavaScript 实现是由以下 3 个不同部分组成的：ECMAScript（是核心）、文档对象模型、浏览器对象模型

 ECMAScript 描述了该语言的语法和基本对象；(包含语法，类型，语句，关键字，保留字，操作符，对象)

 DOM 描述了处理网页内容的方法和接口，通过此接口动态对文档的内容、结构和样式进行访问和修改

 BOM 描述了与浏览器进行交互的方法和接口。

3. js是弱类型语言，弱类型语言就是不要求进行类型声明的语言。

##### 2.先讲一下浏览器是如何加载，解析，渲染的?回流reflow和重绘repaint？

**基础概念：**

DOM:浏览器将HTML代码解析成树形的数据结构

CSSOM:浏览器将CSS代码解析成树形的数据结构

DOM 和 CSSOM： 都是以 Bytes → characters → tokens → nodes → object model. 这样的方式生成最终的数据。
DOM 树的构建过程是一个深度遍历过程：当前节点的所有子节点都构建好后才会去构建当前节点的下一个兄弟节点。

RENDER TREE:DOM和CSSOM合并生成渲染树

**浏览器的渲染过程：**

下载解析html以构建dom树 -> 下载解析css样式表构建CSSOM -> 构建render树 -> 布局render树 -> 绘制render树

当浏览器获得一个html文件时，会“自上而下”加载，并在加载过程中进行解析渲染。

1.Create/Update DOM And request css/image/js：浏览器请求到HTML代码后，在生成DOM的最开始阶段（应该是 Bytes → characters 后），并行发起css、图片、js的请求，无论他们是否在HEAD里。
注意：发起 js 文件的下载 request 并不需要 DOM 处理到那个 script 节点，比如：简单的正则匹配就能做到这一点，虽然实际上并不一定是通过正则：）。这是很多人在理解渲染机制的时候存在的误区。

2.Create/Update Render CSSOM：CSS文件下载完成，开始构建CSSOM

3.Create/Update Render Tree：所有CSS文件下载完成，CSSOM构建结束后，和 DOM 一起生成 Render Tree。

4.Layout：有了Render Tree，浏览器已经能知道网页中有哪些节点、各个节点的CSS定义以及他们的从属关系。下一步操作称之为Layout，顾名思义就是计算出每个节点在屏幕中的位置。

5.Painting：Layout后，浏览器已经知道了哪些节点要显示（which nodes are visible）、每个节点的CSS属性是什么（their computed styles）、每个节点在屏幕中的位置是哪里（geometry）。就进入了最后一步：Painting，按照算出来的规则，通过显卡，把内容画到屏幕上。

以上五个步骤前3个步骤之所有使用 “Create/Update” 是因为DOM、CSSOM、Render Tree都可能在第一次Painting后又被更新多次，比如JS修改了DOM或者CSS属性。

Layout 和 Painting 也会被重复执行，除了DOM、CSSOM更新的原因外，图片下载完成后也需要调用Layout 和 Painting来更新网页。

**回流reflow和重绘repaint**

回流reflow：浏览器要花时间去渲染，当它发现了某个部分发生了变化影响了布局，那就需要倒回去重新渲染。

重绘repaint：如果只是改变了某个元素的背景颜色，文字颜色等，不影响元素周围或内部布局的属性，将只会引起浏览器的repaint，重画某一部分。

Reflow要比Repaint更花费时间，也就更影响性能。所以在写代码的时候，要尽量避免过多的Reflow。

**回流reflow的原因：**

1.改变窗囗大小

2.改变文字大小

3.添加/删除样式表

4.内容的改变，如用户在输入框中敲字

5.激活伪类，如:hover (IE里是一个兄弟结点的伪类被激活)

6.操作class属性

7.脚本操作DOM

8.计算offsetWidth和offsetHeight

9.设置style属性

**怎样回避回流reflow**

1.css的定位和隐藏巧妙使用

需要频繁操作的地方，不妨使用position：absolute/fixee定位，或者是display：none让脱离文档流，操作完之后再重新进入到文档流中。实现元素的动画，它的position属性应当设为fixed或absolute，这样不会影响其它元素的布局。

2.动画的速度

权衡速度的平滑。比如实现一个动画，以1个像素为单位移动这样最平滑，但reflow就会过于频繁，CPU很快就会被完全占用。如果以3个像素为单位移动就会好很多。

3.CSS中的顽固属性合并

 以下这些属性，只要是改动了他们的值，就会造成回流，建议将他们合并到一起操作，可以减少回流的次数。这些属性包括：offsetTop、offsetLeft、 offsetWidth、offsetHeight；scrollTop、scrollLeft、scrollWidth、scrollHeight；clientTop、clientLeft、clientWidth、clientHeight；getComputedStyle() 、currentStyle（）。

4.Javascript通过设置class来改变样式

 我们在利用Javascript进行样式控制的时候，不妨只是改变被控制者的class，而非在函数内部直接修改具体的样式。因为浏览器在我们用Javascript修改每一个具体样式的时候，都会进行一次重绘，如果是修改了2.2中的顽固属性，还会进行回流，这给浏览器造成了巨大的负担。例如，我们需要用这样的代码：

 ```
 //坏代码
function selectAnchor(element){
    var changeDiv = document.getElementById(element);
    changeDiv.style.color = ‘#093′;
    changeDiv.style.background = ‘#eee’;
    changeDiv.style.height = ’200px’;
}

//好代码：
CSS:
changeDiv {
    background: #eee;
    color: #093;
    height: 200px;
}
JavaScript:
function selectAnchor(element) {
    document.getElementById(element).className = ‘changeDiv’;
}
 ```

5.避免使用表格布局（记住只是布局哦，我们数据还是应该用表格的）

不要用tables布局的另一个原因就是tables中某个元素一旦触发reflow就会导致table里所有的其它元素reflow。在适合用 table的场合，可以设置table-layout为auto或fixed，这样可以让table一行一行的渲染，这种做法也是为了限制reflow的 影响范围。

6.绝对不要使用CSS表达式，性能杀手啊，特别是IE

**加载，解析，渲染**

上述5个步骤的这个过程是逐步完成的，为了更好的用户体验，渲染引擎将会尽可能早的将内容呈现到屏幕上，并不会等到所有的html都解析完成之后再去构建和布局render树。它是解析完一部分内容就显示一部分内容，同时，可能还在通过网络下载其余内容。

HTML页面加载和解析流程：

1. 用户输入网址（假设是个html页面，并且是第一次访问），浏览器向服务器发出请求，服务器返回html文件；

2. 浏览器开始载入html代码，发现＜head＞标签内有一个＜link＞标签引用外部CSS文件；

3. 浏览器又发出CSS文件的请求，服务器返回这个CSS文件；

4. 浏览器继续载入html中＜body＞部分的代码，并且CSS文件已经拿到手了，可以开始渲染页面了；

5. 浏览器在代码中发现一个＜img＞标签引用了一张图片，向服务器发出请求。此时浏览器不会等到图片下载完，而是继续渲染后面的代码；

6. 服务器返回图片文件，由于图片占用了一定面积，影响了后面段落的排布，因此浏览器需要回过头来重新渲染这部分代码；

7. 浏览器发现了一个包含一行Javascript代码的＜script＞标签，赶快运行它；

8. Javascript脚本执行了这条语句，它命令浏览器隐藏掉代码中的某个＜div＞ （style.display=”none”）。突然少了这么一个元素，浏览器不得不重新渲染这部分代码；

9. 终于等到了＜/html＞的到来，浏览器泪流满面……

10. 等等，还没完，用户点了一下界面中的“换肤”按钮，Javascript让浏览器换了一下＜link＞标签的CSS路径；

11. 浏览器召集了在座的各位＜div＞＜span＞＜ul＞＜li＞们，“大伙儿收拾收拾行李，咱得重新来过……”，浏览器向服务器请求了新的CSS文件，重新渲染页面。

##### 3.script标签位置和属性，把 Script 标签 放在页面的最底部的body封闭之前 和封闭之后有什么区别？浏览器会如何解析它们？

浏览器接收到一半就开始解析还是全部以后再解析
把js放在css之前，浏览器会先解析什么

**为什么把<script src=""></script>这样的代码放在body最底部？**

js的下载和执行会阻塞Dom树的构建。js载入后马上执行；且执行时会阻塞页面后续的内容（包括页面的渲染、其它资源的下载）。原因：因为浏览器需要一个稳定的DOM树结构，而JS中很有可能有 代码直接改变了DOM树结构，比如使用 document.write 或 appendChild,甚至是直接使用的location.href进行跳转，浏览器为了防止出现JS修 改DOM树，需要重新构建DOM树的情况，所以 就会阻塞其他的下载和呈现。

**减少 JavaScript 对性能的影响的方法**

1.将所有的script标签放到页面底部，也就是body闭合标签之前，这能确保在脚本执行前页面已经完成了DOM树渲染。

2.尽可能地合并脚本。页面中的script标签越少，加载也就越快，响应也越迅速。无论是外链脚本还是内嵌脚本都是如此。

3.采用无阻塞下载 JavaScript 脚本的方法：

（1）使用script标签的 defer 属性（仅适用于 IE 和 Firefox 3.5 以上版本）

（2）使用动态创建的script元素来下载并执行代码；

**script标签的位置会影响首屏时间么？**

不影响（如果这里里的首屏指的是页面从白板变成网页画面——也就是第一次Painting），但有可能截断首屏的内容，使其只显示上面一部分。

**script标签一定要放在body最后面么？**

如果用了Tiny-Loader，JS可以不放在Body最底部

**总结：**

1. script标签放在head标签中，意味着js文件被下载执行完成后，且按照先后顺序依次解析，才显示页面的内容。

2. 放在body结束标签前，脚本在页面解析完才执行--最佳选择，因为defer可能不被支持

3. 在head中但是使用defer和asycn属性，这两个属性只适用于外部脚本文件。

    **延迟脚本defer** 属性是告诉浏览器立即下载，但是延迟执行，在文档完全显示之后在执行

    **异步脚本async** 属性也是立即下载，但不保证他们的先后顺序执行，故一定要确保js文件不相互依赖。


**s延迟加载的方式有哪些？异步加载的方式？**

    defer和async、动态创建DOM方式（用得最多）、按需异步载入js

    **异步加载的方式**

    (1) defer，只支持IE

    (2) async：

    (3) 创建script，插入到DOM中，加载完毕后callBack

##### 4.介绍JavaScript的数据类型。

5种基本数据类型: Undefined Null Boolean Number String--基本类型占用固定大小的空间，保存在栈内存中

 引用类型: Object

**Number**

###### 1.number类型的数值范围

Number.MIN_VALUE--Number.MAX_VALUE,超出这个范围的被转化-Infinity和Infinity

同时可以使用isFinite()函数来判断此数是否有穷

######  2.NaN(非数值)--一个特殊的数值

  1.任何涉及到非数值的操作返回都是NaN

  2.NaN和任何值都不相等，包含本身(NaN == NaN)是false

  3.isNaN()函数是确定参数是否"不是数值"，接收值后，先 **尝试把这个值转换成数值** ，然后在进行判断。

  ```
  alert(isNaN("10"));//false--被转换了
  alert(isNaN(10));//false
  alert(isNaN(NaN));//true
  alert(isNaN("blue"));//true--不能转换成数值
  alert(isNaN(true));//false--被转换成数值1
  ```
######  3.数值转换

Number()--转换规则比较复杂且不够合理，一般都用parseInt()

    Number(" ");//0

parseInt()--此函数在转换字符串时,更多的是看是否符合数值模式

它忽略了字符串前边的空格，直到找到第一个非空格字符，若第一个字符不是数字字符或者负号，则返回NaN

    parseInt("1234blue");//1234
    parseInt(" ");//NaN
    parseInt("w");//NaN
    parseInt("0xA");//10
    parseInt("22.5");//22

此函数还有第二个参数，转换时使用的基数

    parseInt("10",2);//2
    parseInt("10",8);//8
    parseInt("10",10);//10
    parseInt("10",16);//16

parseFloat()--字符串第一个小数点有效，和parseInt()区别是会忽略前导0

    parseFloat("1234blue");//1234
    parseFloat("0xA");//0(此处就是区别)
    parseFloat("1234.23.4");//1234.23

**String**

数值、布尔值、对象和字符串值都可以使用toString()方法，但是null和undefined没有toString()方法

在不知道转换的是是不是null和undefined的时候，使用转型函数String(),规则

 1. 若值有toString()方法，则调用此方法并返回相应的结果
 2. 若值是null，则返回"null"
 3. 若值是undefined,则返回"undefined"

##### 5.JavaScript的类型转换

NaN==NaN也返回false
0==false //true
true==1 //true
0==undefined //false

###### 4.1.显式转换
转换为数值类型：Number(mix)、parseInt(string,radix)、parseFloat(string)

转换为字符串类型：toString(radix)、String(mix)

转换为布尔类型：Boolean(mix)

**Number(mix)**

1.如果是布尔值，true和false分别被转换为1和0

2.如果是数字值，返回本身。

3.如果是null，返回0.

4.如果是undefined，返回NaN。

5.如果是字符串，遵循以下规则：

	5.1.如果字符串中只包含数字，则将其转换为十进制（忽略前导0）
	5.2.如果字符串中包含有效的浮点格式，将其转换为浮点数值（忽略前导0）
	5.3.如果是空字符串，将其转换为0
	5.4.如果字符串中包含非以上格式，则将其转换为NaN

6.如果是对象，则调用对象的valueOf()方法，然后依据前面的规则转换返回的值。如果转换的结果是NaN，则调用对象的toString()方法，再次依照前面的规则转换返回的字符串值。

```
	console.log(Number("hello CSSer!"));//NaN
    console.log(Number("0×8"));//NaN--无效的十六进制
    console.log(Number("0xf"));//15--有效的十六进制
    console.log(Number(""));//0
    console.log(Number("020dd"));//NaN
    console.log(Number("070"));//70--只包含数字，忽略前导0
    console.log(Number(true));//1
```

**parseInt(string,radix)**--此函数在转换字符串时,更多的是看是否符合数值模式

1.忽略字符串前面的空格，直至找到第一个非空字符

2.如果第一个字符不是数字符号或者负号，返回NaN

3.如果第一个字符是数字，则继续解析直至字符串解析完毕或者遇到一个非数字符号为止

4.如果上步解析的结果以0开头，则将其当作八进制来解析；如果以0x开头，则将其当作十六进制来解析

5.如果指定radix参数，则以radix为基数进行解析

```
//它忽略了字符串前边的空格，直到找到第一个非空格字符，若第一个字符不是数字字符或者负号，则返回NaN

    parseInt("1234blue");//1234
    parseInt(" ");//NaN
    parseInt("w");//NaN
    parseInt("0xA");//10
    parseInt("22.5");//22

//此函数还有第二个参数，转换时使用的基数

    parseInt("10",2);//2
    parseInt("10",8);//8
    parseInt("10",10);//10
    parseInt("10",16);//16
```

**parseFloat(string)**

```
//parseFloat()--字符串第一个小数点有效，和parseInt()区别是会忽略前导0

    parseFloat("1234blue");//1234
    parseFloat("0xA");//0(此处就是区别)
    parseFloat("1234.23.4");//1234.23
```

**toString(radix)、String(mix)**

数值、布尔值、对象和字符串值都可以使用toString()方法，但是null和undefined没有toString()方法

在不知道转换的是是不是null和undefined的时候，使用转型函数String(),规则

 1. 若值有toString()方法，则调用此方法并返回相应的结果
 2. 若值是null，则返回"null"
 3. 若值是undefined,则返回"undefined"

**Boolean(mix)**

以下值会被转换为false：false、”"、0、NaN、null、undefined，其余任何值都会被转换为true。

###### 4.2.隐式转换

主要分为三个方面：
1.一些函数涉及的隐式转换
2.对象的隐式转换
3.操作符与隐式类型转换

####### 4.2.1 一些函数涉及的隐式转换

用于检测是否为非数值的函数：isNaN(mix)
isNaN()函数，经测试发现，该函数会尝试将参数值用Number()进行转换，如果结果为“非数值”则返回true，否则返回false。

####### 4.2.2 对象的隐式转换

**对象转换成布尔**
 基本包装类型Boolean、Number、Sring，这些对象都被转换成布尔值ture


```
  var falseObject = new Boolean(false);
  var res = falseObject && true;
  alert(res); //true

  var falseValue = false;
  var res = falseValue && true;
  alert(res); //false
```
**对象转换成数字**

对象转数字经过如下步骤：

如果对象有valueOf()方法，后者返回一个原始值，那么将这个原始值转换为数字并返回

如果对象没有valueOf()方法，或返的不是一个原始值，尝试toString()方法。如果有toString()方法，且返回一个原始值，那么将其转换成数字并返回

如果无法从valueOf()或toString()获得一个原始值，那么将抛出一个类型错误异常

```
function Obj() {}
Obj.prototype.toString = function() {
    return "20"
};

console.log(new Obj() * 1);//输出20

Obj.prototype.valueOf = function() {
    return "10"
};

console.log(new Obj() * 1);//输出10
```

**对象转换成字符串**

对象转字符串经过如下步骤：

如果对象有toString()方法，则调用toString()。如果toString()返回一个原始值，那么将这个值转为字符串（如果它不是字符串的话），并返回

如果对象没有toString()方法，或者调用toString()方法返回的不是一个原始值，那么调用valueOf()方法。 如果valueOf()方法返回的是原始值，那么将它转换为字符串，并返回

如果无法从toString()或valueOf()获得一个原始值，那么将抛出一个类型错误异常

```
function Obj(){}
Obj.prototype.toString = function(){return "callToString"}
Obj.prototype.valueOf = function(){return "callValueOf"}
var data = {
    "callToString" : "callToString",
    "callValueOf" : "callValueOf"
};

console.log(data[new Obj()]);//输出"callToString"

Obj.prototype.toString = function(){return {};}

console.log(data[new Obj()]);//输出"callValueOf"
```

####### 4.3 操作符与隐式类型转换

**递增递减操作符**

这些操作符适用于任何数据类型的值，针对不同类型的值，该操作符遵循以下规则（经过对比发现，其规则与Number()规则基本相同）：

1.如果是包含有效数字字符的字符串，先将其转换为数字值（转换规则同Number()），在执行加减1的操作，字符串变量变为数值变量。

2.如果是不包含有效数字字符的字符串，将变量的值设置为NaN，字符串变量变成数值变量。

3.如果是布尔值false，先将其转换为0再执行加减1的操作，布尔值变量编程数值变量。

4.如果是布尔值true，先将其转换为1再执行加减1的操作，布尔值变量变成数值变量。

5.如果是浮点数值，执行加减1的操作。

6.如果是对象，先调用对象的valueOf()方法，然后对该返回值应用前面的规则。如果结果是NaN，则调用toString()方法后再应用前面的规则。对象变量变成数值变量。

**加法操作符**

如果两个操作值都是数值，其规则为：

1.如果一个操作数为NaN，则结果为NaN

2.如果是Infinity+Infinity，结果是Infinity

3.如果是-Infinity+(-Infinity)，结果是-Infinity

4.如果是Infinity+(-Infinity)，结果是NaN

5.如果是+0+(+0)，结果为+0

6.如果是(-0)+(-0)，结果为-0

7.如果是(+0)+(-0)，结果为+0

如果有一个操作值为字符串，则：

1.如果两个操作值都是字符串，则将它们拼接起来

2.如果只有一个操作值为字符串，则将另外操作值转换为字符串，然后拼接起来

3.如果一个操作数是对象、数值或者布尔值，则调用toString()方法取得字符串值，然后再应用前面的字符串规则。对于undefined和null，分别调用String()显式转换为字符串。

```
function Obj(){}
Obj.prototype.valueOf = function(){
    return "234";
};

console.log(123 + new Obj());//输出"123234"

Obj.prototype.valueOf = function(){
    return 234;
};

console.log(123 + new Obj());//输出"357"

Obj.prototype.valueOf = function(){
    return true;
};

console.log(123 + new Obj());//输出"124"

console.log(123 + new Date());//输出"123Sun Mar 30 2014 12:53:02 GMT+0800 (中国标准时间)"
```

**乘除、减号运算符、取模运算符**

这些操作符针对的是运算，所以他们具有共同性：如果操作值之一不是数值，则被隐式调用Number()函数进行转换。

**逻辑操作符（!、&&、||）**

逻辑非（！）操作符首先通过Boolean()函数将它的操作值转换为布尔值，然后求反。

```
!""
true

!NaN
true

!"a"
false
```

逻辑与（&&）操作符，如果一个操作值不是布尔值时，遵循以下规则进行转换：

1.如果第一个操作数经Boolean()转换后为true，则返回第二个操作值，否则返回第一个值（不是Boolean()转换后的值）

2.如果有一个操作值为null，返回null

3.如果有一个操作值为NaN，返回NaN

4.如果有一个操作值为undefined，返回undefined

```
var a,b;
a = null;
b = "something";
console.log(a && b);//输出null

a = "something";
b = null;
console.log(a && b);//输出null

a = "something";
b = "otherthing";
console.log(a && b);//输出"otherthing"
```

逻辑或（||）操作符，如果一个操作值不是布尔值，遵循以下规则：

1.如果第一个操作值经Boolean()转换后为false，则返回第二个操作值，否则返回第一个操作值（不是Boolean()转换后的值）

2.对于undefined、null和NaN的处理规则与逻辑与（&&）相同

```
var a,b;
a = "something";
b = null;
console.log(a || b);//输出"something"

a = null;
b = null;
console.log(a || b);//输出null

a = null;
b = "something";
console.log(a || b);//输出"something"
```

**关系操作符**

与上述操作符一样，关系操作符的操作值也可以是任意类型的，所以使用非数值类型参与比较时也需要系统进行隐式类型转换：

1.如果两个操作值都是数值，则进行数值比较

2.如果两个操作值都是字符串，则比较字符串对应的字符编码值

```
//大写字母的字符编码全部小于小写字母的字符编码值
var result = "Brick" < "alphabet";//true
    var result = "Brick".toLowerCase() < "alphabet".toLowerCase();//false
```

3.如果只有一个操作值是数值，则将另一个操作值转换为数值，进行数值比较

4.如果一个操作数是对象，则调用valueOf()方法（如果对象没有valueOf()方法则调用toString()方法），得到的结果按照前面的规则执行比较

5.如果一个操作值是布尔值，则将其转换为数值，再进行比较

注：NaN是非常特殊的值，它不和任何类型的值相等，包括它自己，同时它与任何类型的值比较大小时都返回false。

```
NaN < 1
false

NaN > 1
false

Infinity < Infinity
fasle

Infinity > Infinity
false

Infinity > -Infinity
true

"a" < "b"
true

"abcd" < "abce"
true
```

**相等操作符**

相等操作符（==），进行类型转换之后比较~ === 则是直接比较

相等操作符会对操作值进行隐式转换后进行比较：

1.如果一个操作值为布尔值，则在比较之前先将其转换为数值

2.如果一个操作值为字符串，另一个操作值为数值，则通过Number()函数将字符串转换为数值

3.如果一个操作值是对象，另一个不是，则调用对象的valueOf()方法，得到的结果按照前面的规则进行比较

4.null与undefined是相等的

5.如果一个操作值为NaN，则相等比较返回false

6.如果两个操作值都是对象，则比较它们是不是指向同一个对象

```
// null和undefined在比较之前不能转换成任何一个值，所以null != 0且undefined != 0且null == undefined
	NaN == NaN//FALSE,NaN和谁都不相等
    NaN != NaN//TRUE
    undefined == 0//false
    null == 0//false
    null == undefined//true

null == undefined
true

({}) == ({})
false

[] == []
false

"123" == 123
true

true == "1"
true

NaN == NaN
false

function Obj(){}
Obj.prototype.toString = function(){return "tostring";}
Obj.prototype.valueOf = function(){return "valueof";}
new Obj() == "valueof"
true

nfinity == Infinity
true

Infinity == -Infinity
false
```

##### 6.检测JavaScript的数据类型。安全的类型检测。

typeof检测基本类型，instanceof检测引用类型

但typeof会有一些不可预知的结果，蔽日safari(直到第四版)在对正则表达式应用typeof操作符还是返回function，因此很难做出判断。
若用instanceof，value instanceof Array 若Array是在另一个frame中定义的数组，那么返回的则是false，因为Array毕竟是window的属性。

所以typeof instanceof都是不安全的检测，其实可以利用Object原生的toString方法。

  **typeof操作符来检测基本数据类型**

  返回值是undefined、boolean、number、string、object、function

  ps:

  1.若值是对象或者null返回Object,返回值中无null

  2.对未声明和未初始化的变量执行typeof操作符都返回undefined

  ```
  typeof null --返回object
  ```

或者用下面的方法判断：
 ```
    function type(obj) {
    var toString = Object.prototype.toString;
    var map = {
        '[object Boolean]'  : 'boolean',
        '[object Number]'   : 'number',
        '[object String]'   : 'string',
        '[object Function]' : 'function',
        '[object Array]'    : 'array',
        '[object Date]'     : 'date',
        '[object RegExp]'   : 'regExp',
        '[object Undefined]': 'undefined',
        '[object Null]'     : 'null',
        '[object Object]'   : 'object'
    };
    return map[toString.call(obj)];
    }
 ```
  **instanceof操作符来检测引用数据类型**

  语法：variable instanceof constructor(Array等)

  返回值:true和false；

  基本包装类型Boolean、Number、Sring，对这些事例调用typeof会返回object

  ```
  var obj = new Number(23);
  alert(typeof obj);//object

  ```
  基本包装类型Boolean、Number、Sring，这些对象都被转换成布尔值ture

  ```
  var falseObject = new Boolean(false);
  var res = falseObject && true;
  alert(res); //true

  var falseValue = false;
  var res = falseValue && true;
  alert(res); //false

  ```

**Object.prototype.toString()**

这一方法应用于检测原生JSON对象，不能检测非原生构造函数的构造函数名。
开发人员定义的任何构造函数都将返回[Object Object]

```
function isArray(value) {
    return Object.prototype.toString.call(value) == "[Object Array]";
}
function isFunction(value) {
    return Object.prototype.toString.call(value) == "[Object Function]";
}
function isRegExp(value) {
    return Object.prototype.toString.call(value) == "[Object RegExp]";
}
```

##### 7.JavaScript的作用域。

js通过函数来管理作用域， **无块级作用域**,只有函数作用域和全局作用域，
只是把变量声明添加到 **最近的执行环境** 当中(函数执行环境或者全局执行环境)

也就是所谓的var hoisting变量声明提升，但是变量初始化不提升

```
if (true) {
    var color = "blue";
}

alert(color); //blue

无块级作用域，变量声明提升，相当于
var color;
if (true) {
    color = "blue";
}

alert(color); //blue
```

```
for (var i = 0;i < 10;i++) {
    doSomething(i);
}

alert(i); //10

无块级作用域，变量声明提升，但是初始化不提升
var i;
for (i = 0;i < 10;i++) {
    doSomething(i);
}

alert(i); //10
```

```
function func() {
    alert(myname); // "undefined"
    var myname = "local";
    alert(myname); // "local"
}
func();

相当于如下，声明提升，但是初始化不提升
myname = "global"; // global variable
function func() {
   var myname; // 等同于 -> var myname = undefined;
   alert(myname); // "undefined"
   myname = "local";
   alert(myname); // "local"
}
func();
```

```
var name = 'zach'

while (true) {
    var name = 'obama'
    console.log(name)  //obama
    break
}

console.log(name)  //obama
```

```
题目：
What is the result of this expression? (or multiple ones)


var name = 'World!';
(function () {
    if (typeof name === 'undefined') {
        var name = 'Jack';
        console.log('Goodbye ' + name);
    } else {
        console.log('Hello ' + name);
    }
})();

```
答案：
```
Goodbye Jack
```
解析：
注意js的var hoisting变量声明提升，虽然声明提升，但是初始化并不提升
则上述代码相当于

##### 8.介绍js有哪些内置对象？内置对象(build-in objects),原生对象(native objects),宿主对象(host bojects)的区别？

基本数据类型：null，undefined，boolean，number，string
引用数据类型：object，function
typeof的返回值：undefined，boolean，number，string，object，function

js对象分为三种类型：用户定义对象、内建对象、宿主对象

**内置对象** -- (不要NEW就是不可以实例化,直接引用——只有MATH  GLOBAL)

“由 ECMAScript 实现提供的、独立于宿主环境的所有对象，在 ECMAScript 程序开始执行时出现”。这意味着开发者不必明确实例化内置对象，它已被实例化了。

**原生对象** -- (本地对象，要NEW也就是可以实例化)

为“独立于宿主环境的 ECMAScript 实现提供的对象”，需要new，Object、Function、Array、String、Boolean、Number、Date、RegExp、Error、EvalError、RangeError、ReferenceError、SyntaxError、TypeError、URIError、ActiveXObject(服务器方面)、Enumerator(集合遍历类)、RegExp（正则表达式）---本地对象就是 ECMA-262 定义的类（引用类型）。

**宿主对象** -- (BOM  DOM  &  自定义对象)

由运行环境提供的对象，也就是由浏览器提供的对象。宿主对象主要有Document、Form、Image、Element，可以通过这些对象获取给定网页的表单、图像和各种表单元素等信息。

 ECMAScript中的“宿主”当然就是我们网页的运行环境，即“操作系统”和“浏览器”。所有非本地对象都是宿主对象（host object），即由 ECMAScript 实现的宿主环境提供的对象。你自己构建的对象和所有的BOM和DOM对象都是宿主对象。

**为什么扩展 JavaScript 内置对象不是好的做法？**

因为扩展内置对象会影响整个程序中所使用到的该内置对象的原型属性.浏览器或javascript本身就会实现这个方法，而且和你扩展的实现有不一致的表现。到时候你的javascript代码可能已经在无数个页面中执行了数年，而浏览器的实现导致所有使用扩展原型的代码都崩溃了。

**引用类型**

**Array对象**

栈方法:push(),pop()

队列方法：push(),shift()/unshift(),pop()

重排序：sort(),reverse()

操作：concat(),slice(),splice()

位置：indexOf(),lastIndexOf()

迭代：every(),some(),forEach(),filter(),map()

归并：reduce(),reduceRight()

http://blog.csdn.net/github_34514750/article/details/51049935

**RegExp对象**

http://blog.csdn.net/github_34514750/article/details/51043277

**Math对象**

基本包装类型：

Boolean、Number、String

引用类型new操作符创建的引用类型的实例，执行流离开当前作用域之前一直保存在内存中。但是自动创建的基本包装类型则只是存在于一行代码的一瞬间。p118-119

基本包装类型Boolean、Number、Sring，这些对象都被转换成布尔值ture

```
var falseObject = new Boolean(false);
var res = falseObject && true;
alert(res); //true

var falseValue = false;
var res = falseValue && true;
alert(res); //false

```

**String的一些操作方法**

**字符方法**

charAt()字符,charCodeAt()字符编码,或者stringValue[]

**字符串操作方法**

concat(),slice(),substring(),substr()都不修改字符串本身的值

slice(),substring(),substr()三者区别：

**slice():**

参数：接收一个或者两个参数，第一个参数指定字符串的开始位置；第二个参数表示子字符串到最后一个字符后面的位置

```
var stringValue = "hello world";
stringValue.slice(3);//"lo world"
stringValue.slice(3,7);//"lo w"
```
参数为负数时：两个参数会将负数和字符串的长度相加

```
var stringValue = "hello world";
stringValue.slice(-3);//"rld"
stringValue.slice(3,-4);//"lo w"
```

**substring():**

参数：和slice()相同

参数为负数时：两个参数都转换成0

```
var stringValue = "hello world";
stringValue.substring(-3);//"hello world"
stringValue.substring(3,-4);//"hel"--首先会是substring(3,0)--自动会把较小的数为开始位置substring(0,3)
```

**substr():**

参数：接收一个或者两个参数，第一个参数指定字符串的开始位置；第二个参数表示返回子字符串的长度

```
var stringValue = "hello world";
stringValue.substr(3);//"lo world"
stringValue.substr(3,7);//"lo worl"
```

参数为负数时：第一个参数会将负数和字符串的长度相加，第二个参数变成0

```
var stringValue = "hello world";
stringValue.substr(-3);//"rld"
stringValue.substr(3,-4);//""
```

**字符串位置方法**

indexOf(),lastIndexOf()

**trim()**

创建一个字符串副本，删除前缀和后缀所有空格

**字符串大小写转换方法**

toUpperCase(),toLowerCase()

##### 9.js数组方法？

数组基本方法：
检测数组：instanceof或者Array.isArray()
转换方法：toString(),valueOf(),toLocaleString()
栈方法：push()、pop()
队列方法：push()、shift()
重排序方法：sort()、
操作方法：concat()、slice()、splice()
位置方法：indexOf()、lastIndexOf()
迭代方法：every()、some()、forEach()、filter()、map()
归并方法：reduce()、reduceRight()

1.检测数组

方法一：

```
value instanceof Array
```
但若在两个以上不同的全局执行环境下，会存在两个以上版本的Array构造函数，当一个框架向另外一个框架传入数组时，传入的数组和第二个框架中原生创建的数组分别具有不同的构造函数，从而会出错。

方法二：

```
Array.isArray(value)
```
这个是ECMAScript5新增的方法，此方法目的是最终确定某个值是否为数组，不管是在哪个全局执行环境中创建

方法三：

```
functionisArray(obj){
    return Object.prototype.toString.call(obj) === '[object Array]' ;
}
```


2.转换方法

```
toString(),valueOf(),toLocaleString()
var colors=["red","blue","green"];
alert(colors.toString());
alert(colors.valueOf());
alert(colors);
```

3.栈方法

栈是后进先出的数据结构，栈中项的插入和弹出都在栈的顶部。用push()和pop()

**push():** 此方法接收任意数目的参数，将它们逐个添加到数组末尾，返回修改后的数组的长度。

**pop():** 此方法从数组末尾移除最后一项，减少数组的长度，然后返回移除的项。

```
var colors = new Array();
var count = colors.push("red","green");//count=2
var item = colors.pop();//item=green
```

4.队列方法

队列是先进先出。用push()和shift()

**shift():** 此方法从数组对头移除最后一项，减少数组的长度，然后返回移除的项。
因此，unshift()和pop()可以从相反的队列来模拟队列

5.重排序方法（important）

arr.sort([compareFunction])

**参数:**

compareFunction,可选。用来指定按某种顺序进行排列的函数。
如果省略，元素按照转换为的字符串的诸个字符的Unicode位点进行排序
如果指明了 compareFunction ，那么数组会 **按照调用该函数的返回值排序**。

记 a 和 b 是两个将要被比较的元素：
```
var values=[0,1,5,10,15];
alert(values.sort());//0，1，10，15，5是排序结果
```

sort()排序先调用toString()转型方法，然后比较字符串进行排序，数字排序应该写成
```
function compare(a,b){
	return a-b;//返回升序序列
	return b-a;//返回降序序列
}
var values = [0,1,5,10,15];
alert(values.sort(compare));
```

6.操作方法

concat();复制数组之后，在元素尾部添加元素

**方法：**
array.concat(value1, value2, ..., valueN)

**参数：**
valueN需要与原数组合并的数组或非数组值.

```
var num = [1,2,3];
alert(num.concat(4,5));//1,2,3,4,5
```

如下例子是合并三个数组
```
var num1 = [1, 2, 3];
var num2 = [4, 5, 6];
var num3 = [7, 8, 9];

// 组成新数组[1, 2, 3, 4, 5, 6, 7, 8, 9]; 原数组 num1, num2, num3 未被修改
var nums = num1.concat(num2, num3);
```

多个数组和多个非数组值合并为一个新数组:
```
var alpha = ['a', 'b', 'c'];
// 组成新数组 ["a", "b", "c", 1, 2, 3], 原alpha数组未被修改
var alphaNumeric = alpha.concat(1, [2, 3]);
```

slice();划分数组，不影响原数组

**语法：**

array.slice([begin[,end]])，提取数组begin到end的元素，但是包含begin不包含end

**参数：**
一个或者两个参数，就是返回项的起始位置和结束位置

```
var colors = ["green","yellow","orange","blue"];
alert(colors.slice(1,3));//yellow,orange
```

splice();可以用来删除，插入，替换数组中的元素，影响原数组

**语法：**
array.splice(start, deleteCount[, item1[, item2[, ...]]])

**参数：**

**start:**
从数组的哪一位开始修改内容。如果超出了数组的长度，则从数组末尾开始添加内容；如果是负值，则表示从数组末位开始的第几位。

**deleteCount:**
整数，表示要移除的数组元素的个数。如果 deleteCount 是 0，则不移除元素。这种情况下，至少应添加一个新元素。如果 deleteCount 大于start 之后的元素的总数，则从 start 后面的元素都将被删除（含第 start 位）。

**items:**
要添加进数组的元素。如果不指定，则 splice() 只删除数组元素。
```
//splice()可以用于删除数组中的某个元素
 for(var i = 0;i < array.length;i++) {
   if(content === array[i]) {
   //第一个参数是要删除的第一项，第二个参数是要删除的项数
     array.splice(i,1);
   }
 }

```
```
 //splice()可以用于插入元素到数组中
 //参数：1.插入的位置2.删除项数3.插入元素
 var colors = ["green","blue"];
 colors.splice(1,0,"yellow","orange");
 alert(colors);//green,yellow,orange,blue
```
```
 //splice()可以用于替换元素到数组中
 //参数：1.起始位置2.删除项数3.插入元素
 var colors = ["green","yellow","orange","blue"];
 colors.splice(1,1,"red","purple");
 alert(colors);//green,red,purple,orange,blue
```

7.位置方法

indexOf();

**语法：**
arr.indexOf(searchElement[, fromIndex = 0])

**参数：**

**searchElement**
要查找的元素

**fromIndex**
开始查找的位置。如果该索引值大于或等于数组长度，意味着不会在数组里查找，返回-1。如果参数中提供的索引值是一个负值，则将其作为数组末尾的一个抵消，即-1表示从最后一个元素开始查找，-2表示从倒数第二个元素开始查找 ，以此类推。 注意：如果参数中提供的索引值是一个负值，仍然从前向后查询数组。如果抵消后的索引值仍小于0，则整个数组都将会被查询。其默认值为0.

```
var array = [2, 5, 9];
array.indexOf(2);     // 0
array.indexOf(7);     // -1
array.indexOf(9, 2);  // 2
array.indexOf(2, -1); // -1
array.indexOf(2, -3); // 0
```

lastIndexOf();
 二者都返回查找的项在数组中的位置；

接收参数：1. 要查找的项 2. 查找起点位置的索引（可选）

8.迭代方法

**语法：**

arr.every(callback[, thisArg])ps：其他几个类似

**参数：**

1.callback要在每一项上运行的函数

2.运行该函数的作用域对象（可选）

**callback 被调用时传入的参数**

1.数组项的值

2.该项在数组中的位置

3.数组对象本身

**every():**

对数组中的每一项运行给定函数，若该函数对每一项都返回true，则返回true，若有一个返回false，则不执行接下来的回调，立即返回false

```
var isNum = function(item,index,array) {
    	return (item>2);
    }
    var res = arr.every(isNum);
    console.log(res);//false;
    或者
    var res = arr.every(function(item,index,array){
      return (item>2);
    });
    console.log(res);//false;
```

**some():**

    对数组中的每一项运行给定函数，若该函数对某一项返回true，则立即返回true，不执行接下来的回调。

**forEach():**

 对数组中的每一项运行给定函数，这个方法 **没有返回值**

```
function logArrayElements(element, index, array) {
    console.log("a[" + index + "] = " + element);
}
[2, 5, 9].forEach(logArrayElements);
// logs:
// a[0] = 2
// a[1] = 5
// a[2] = 9
```

**filter():**

 对数组中的每一项运行给定函数，返回该函数会返回true的项组成的数组，**被删除或从来未被赋值的元素不会被遍历到。**

```
function isBigEnough(element) {
  return element >= 10;
}
var filtered = [12, 5, 8, 130, 44].filter(isBigEnough);
// filtered is [12, 130, 44]
```

**map():**

对数组中的每一项运行给定函数，返回每次函数调用的结果组成的数组

```
var numbers = [1, 4, 9];
var roots = numbers.map(Math.sqrt);
/* roots的值为[1, 2, 3], numbers的值仍为[1, 4, 9] */
```

9.归并方法

EMCAScript5新添了reduce()和reduceRight()两个方法都迭代数组中所有的项，然后构建一个最终返回的值。

**reduce()：** 从第一项遍历到最后

**reduceRight()**按降序索引顺序处理元素。

**语法**
array1.reduce(callbackfn[, initialValue])

**参数：**

**callbackfn：回调函数**

（传入这些方法中的函数会接收四个参数：previousValue，currentValue，currentIndex和array）
通过上一次调用回调函数获得的值。如果向 reduce 方法提供 initialValue，则在首次调用函数时，previousValue 为 initialValue。

**initialValue**
作为归并基础的初始值（可选）
如果指定 initialValue，则它将用作初始值来启动累积。第一次调用 callbackfn 函数会将此值作为参数而非数组值提供。

**返回值**
通过最后一次调用回调函数获得的累积结果。

```
function addDigitValue(previousValue, currentDigit, currentIndex, array) {
    var exponent = (array.length - 1) - currentIndex;
    var digitValue = currentDigit * Math.pow(10, exponent);
    return previousValue + digitValue;
}
var digits = [4, 1, 2, 5];
// Determine an integer that is computed from values in the array.
var result = digits.reduce(addDigitValue, 0);
document.write (result);
// Output: 4125
```

10.二元数组的创建

```
var data = [];
for(var i = 0;i < len;i++){
	//二元数组
	data[i] = [];
	//二元数组赋值方法1
	data[i][0] = arr[i].firstChild.substringData(0,2);
    data[i][1] = arr[i].lastChild.innerHTML;
    //二元数组赋值方法2
    data[i].push(arr[i].firstChild.substringData(0,2));
    data[i].push(arr[i].lastChild.innerHTML);
}
```

**关联数组**

平常用的是数值数组，在新元素给出下标时，不必局限于整数数字，数组下标可以是字符串，这就是关联数组。这样可以提高脚本的可读性。
数值数组其实是关联数组的特殊情况。

```
var lennon = Array();
lennon["name"] = "wanghuan";
lennon["year"] = 1993;
lennon["living"] = false;

var stus = Array();
stus["stu1"] = lennon;

//访问stus["stu1"]["name"]值是wanghuan
```
##### 10.数组新增，删除，替换元素的方法

影响原数组：：push()/pop()/shift()/unshift()/splice()

不影响原数组：concat()/slice()

**新增**

影响原数组：push(),unshift()

不影响原数组：concat()，或者使用展开（spread）操作符，展开操作符是三个点（…）

```
const arr1 = ['a', 'b', 'c', 'd', 'e'];
const arr2 = [...arr1, 'f']; // ['a', 'b', 'c', 'd', 'e', 'f']  
const arr3 = ['z', ...arr1]; // ['z', 'a', 'b', 'c', 'd', 'e']
```
展开操作符会复制原来的数组，从原数组取出所有元素，然后存入新的环境。

**移除**

影响原数组：pop(),shift(),splice()

```
let mutatingRemove = ['a', 'b', 'c', 'd', 'e'];  
mutatingRemove.pop(); // ['a', 'b', 'c', 'd']  
mutatingRemove.shift(); // ['b', 'c', 'd']
```
不影响原数组：slice()，filter()

**替换**

影响原数组：splice()

```
let mutatingRemove = ['a', 'b', 'c', 'd', 'e'];  
mutatingRemove.pop(); // ['a', 'b', 'c', 'd']  
mutatingRemove.shift(); // ['b', 'c', 'd']
```

不影响原数组：可以使用 array.map() 创建一个新数组，并且可以检查每一个元素，根据特定的条件替换它们。

##### 11.js数组合并的方法

###### 1.concat合并数组

concat是生成一个新数组，内存则是a和b的和

```
var a = [1,2,3],
	b = ["ab","cd","ef"],
	c = a.concat(b);
console.log(c);
```
如图：

![这里写图片描述](http://img.blog.csdn.net/20160505101405193)

###### 2.push循环合并数组

push是一个数组的内容加入到另一个中

```
var a = [1,2,3],
	b = ["ab","cd","ef"],
	i,
	len;
for(i = 0,len = b.length;i < len;i++) {
	a.push(b[i]);
}
b = null;//b可以清空
```
![这里写图片描述](http://img.blog.csdn.net/20160505101913320)

###### 3.unshift循环合并数组

若a比较少，则希望a插入到b前边，这样节省时间

```
var a = [1,2,3],
	b = ["ab","cd","ef"],
	i;
for(i = a.length-1;i >= 0;i--) {
	b.unshift(a[i]);
}
console.log(b);
a = null;//a可以清空
```

![这里写图片描述](http://img.blog.csdn.net/20160505101913320)

###### 4.reduce合并数组

```
var a = [1,2,3],
	b = ["ab","cd","ef"],
	i;
b.reduce(function(prev,curr){
   prev.push(curr);
   return prev;
},a);
console.log(a);
```

![这里写图片描述](http://img.blog.csdn.net/20160505101913320)

###### 5.reduceRight合并数组

```
var a = [1,2,3],
	    b = ["ab","cd","ef"],
	    i;
    a.reduceRight(function(prev,curr){
        prev.unshift(curr);
        return prev;
    },b);
    console.log(b);
```
![这里写图片描述](http://img.blog.csdn.net/20160505101913320)

###### 6.用Array.prototype.push.apply合并数组

```
var a = [1,2,3],
	b = ["ab","cd","ef"];
// call和apply可以用来重新定义函数的执行环境，apply中的第一个参数a用于指定将要调用函数push的对象，参数是b
// 其实就是在a的上下文环境中执行Array.prototype.push函数，参数是b
Array.prototype.push.apply(a,b);
console.log(a);
```

![这里写图片描述](http://img.blog.csdn.net/20160505101913320)

###### 7.用Array.prototype.unshift.apply合并数组

```
var a = [1,2,3],
	b = ["ab","cd","ef"];
// 其实就是在b的上下文环境中执行Array.prototype.unshift函数，参数是a
Array.prototype.unshift.apply(b,a);
console.log(b);
```

![这里写图片描述](http://img.blog.csdn.net/20160505101913320)

**问题**

1.js引擎都会有拷贝数据长度的限制，若数组很大，肯定会超出push或unshift允许调用堆栈的限制，则可以结合splice使用

```
function combineInto(a,b) {
     var len = a.length;
     for (var i=0; i < len; i=i+5000) {
         b.unshift.apply( b, a.slice( i, i+5000 ) );
     }
 }
```

##### 12.js实现数组的简单复制，深度复制？(浅拷贝和深拷贝)

对于简单复制中对象只是简单的=复制，也就是只是保存了内存地址，不是完全复制，这样修改对象的时候，会把原对象和复制对象一起修改。

深度复制则是修改复制后的对象不会影响原始对象。

**简单复制**

对于数组，对象，函数等引用类型的数据，等号只是保存了内存地址，而不是完全复制。

1.使用 slice 或 contcat 方法实现简单复制

简单数组如下：
```
var arr1 = [1, 2, 3, 4],
arr2 = arr1.slice(0),
arr3 = arr1.concat();

console.log(arr1, arr2, arr3);//[1, 2, 3, 4] [1, 2, 3, 4] [1, 2, 3, 4],
arr2[2] = 10;
arr3[2] = 11;
console.log(arr1[2], arr2[2], arr3[2]); //3 10 11
```

有对象和函数或者数组的数组，简单值不一起改变，但是引用类型则原来对象和复制对象一起改变
```
var fun = function(log) {console.log},
arr1 = [1, 2, [3, 4], {a: 5, b: 6}, fun],
arr2 = arr1.slice(0),
arr3 = arr1.concat();

arr1[0] = 10;
arr3[2][1] = 5;
arr2[3].a = 100;

console.log(arr1, arr2, arr3);
```
![这里写图片描述](http://img.blog.csdn.net/20170223182839766?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvZ2l0aHViXzM0NTE0NzUw/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast)

**深度复制**

1.使用jq的$.extend(true,target,obj)

```
var arr1 = [1, 2, [3, 4], {a: 5, b: 6}, 7],
arr2 = $.extend(true, [], arr1);
```

2.深度复制的完全实现

考虑多维数组的嵌套，以及数组值为对象的情况，可以作如下原型扩展

newobj = Object.create(sourceObj)

```
Object.prototype.clone = function() {
    var obj = {};

    for(var i in this) {
        obj[i] = this[i];
    }

    return obj;
}

Array.prototype.clone = function() {
    var len = this.lenght,
        arr = [];

    for(var i = 0;i < len;i++) {
        if(typeof this[i] !== "object") {
            arr.push(this[i]);
        } else {
            arr.push(this[i].clone());
        }
    }
    return arr;
}

//测试Object
var obj1 = {
    name: 'Rattz',
    age: 20,
    hello: function () {
        return "I'm " + name;
    }
};
var obj2 = obj1.clone();
obj2.age++;
console.log(obj1.age);//20

//测试2 Array
var fun = function(log) {console.log},
arr1 = [1, 2, [3, 4], {a: 5, b: 6}, fun],
arr2 = arr1.clone();
```

3.使用JSON方法

newObj = JSON.parse(JSON.stringify(sourceObj));

```
var arr1 = [1, 2, [3, 4], {a: 5, b: 6}, 7],
    arr2 = JSON.parse(JSON.stringify(arr1));

console.log(arr1, arr2);//[1, 2, [3, 4], {a: 5, b: 6}, 7] [1, 2, [3, 4], {a: 5, b: 6}, 7],
arr2[1] = 10;
arr2[3].a = 20;
console.log(arr1[1], arr2[1]);//2 10
console.log(arr1[3], arr2[3]);//{a: 5, b: 6} {a:20,b:6}
```

##### 13.NodeList转换成数组的方法？

但是我们能通过 Array.prototype.slice.call 转换为真正的数组的带有 length 属性的对象，这样 NodeList 就可以应用 Array 下的所有方法了。

```
<!--  一般用此方法转换成数组，但是在IE8及更早版本吧nodelist实现成一个COM对象，不能用js对象的方法，所以IE8之前需要枚举所有对象 -->
Array.prototype.slice.call(someNode.childNodes,0);

<!-- 通用的方法 -->

function convertListToArray(nodes) {
    var array = null;
    try{
        array = Array.prototype.slice.call(nodes,0);
    }catch(ex){
        array = new Array();
        for(var i = 0,len = nodes.length;i < len;i++) {
            array.push(nodes[i]);
        }
    }

    return array;
}
```


##### 14.扁平化多维数组

1、老方法

```
var result = []
function unfold(arr){
     for(var i=0;i< arr.length;i++){
      if(typeof arr[i]=="object" && arr[i].length>1) {
       unfold(arr[i]);
     } else {        
       result.push(arr[i]);
     }
  }
}
var arr = [1,3,4,5,[6,[0,1,5],9],[2,5,[1,5]],[5]];
unfold(arr)
```

2、使用tostring

```
var c=[1,3,4,5,[6,[0,1,5],9],[2,5,[1,5]],[5]];
var b = c.toString().split(',')
```

3、使用es6的reduce函数

```
var arr=[1,3,4,5,[6,[0,1,5],9],[2,5,[1,5]],[5]];
const flatten = arr => arr.reduce((a, b) => a.concat(Array.isArray(b) ? flatten(b) : b), []);
var result = flatten(arr)
```

##### 9.说说写JavaScript的基本规范？或者说如何编写高质量的可维护的js代码？

**1.注意编程规范**

注意常量，函数灯命名的大小写，注释，空格，缩进等

**2.注意变量的声明**

一方面是避免创建隐藏的全局变量，另一方面尽量使用单个var的声明。

1.注意使用var声明变量，避免创建隐藏的全局变量

2.避免用任务链进行部分var声明，从而避免创建隐藏的全局变量

```
//a是本地变量，b是全局变量
function foo() {
   var a = b = 0;
   // ...
}
```

3.使用单var形式声明变量(代码少，且变量放一起增加可读性,且反正变量会hoisting)

```
function func() {
   var a = 1,
       b = 2,
       sum = a + b,
       myobject = {},
       i,
       j;
   // function body...
}
```

**3.注意for循环和for-in循环**

for循环一方面是缓存数组的长度，另一方面是避免使用i++

1.缓存数组的长度

```
// 若myarray是HTMLCOLLECTION对象的话，需要每次查询HTML页面，也就是实时操作DOM，则效率很低
for (var i = 0; i < myarray.length; i++) {
   // 使用myarray[i]做点什么
}
//因此使用缓存数组长度
for (var i = 0, max = myarray.length; i < max; i++) {
   // 使用myarray[i]做点什么
}
```
2.避免使用i++

对象使用for-in循环(属性列表顺序不被保证，所以虽然可以遍历数组但是不推荐)，数组使用for循环

```
var man = {
    hands:2,
    legs:2,
    heads,1
};

if(typeof Object.prototype.clone === "undefined") {
    Object.prototype.clone = function() {

    };
}
//需要应用hasOwnProperty()方法过滤原型属性
for(var i in man) {
    if(man.hasOwnPrototype(i)) {
        console.log(i, ":", man[i]);
    }
}
//或者这样使用hasOwnPrototype来过滤属性
for(var i in man) {
    if(Object.prototype.hasOwnPrototype.call(man,i)) {
        console.log(i,":",man[i]);
    }
}
```

**4.避免隐式类型的转换**

在比较值和表达式类型的时候始终使用===和!==操作符

**5.避免使用eval**

1.动态访问属性，可以用[]来代替

```
//避免使用eval访问动态属性，用[]方法访问动态属性
var property = "name";
alert(eval("obj." + property));

// 更好的
var property = "name";
alert(obj[property]);
```

2.若必须使用eval(),可以考虑使用new Function()来代替

因为在新Function()中作代码评估是在局部函数作用域中运行，所以代码中任何被评估的通过var 定义的变量都不会自动变成全局变量

```
console.log(typeof un);    // "undefined"
console.log(typeof deux); // "undefined"
console.log(typeof trois); // "undefined"

var jsstring = "var un = 1; console.log(un);";
eval(jsstring); // logs "1"

jsstring = "var deux = 2; console.log(deux);";
new Function(jsstring)(); // logs "2"

jsstring = "var trois = 3; console.log(trois);";
(function () {
   eval(jsstring);
}()); // logs "3"

console.log(typeof un); // number
console.log(typeof deux); // "undefined"
console.log(typeof trois); // "undefined"
```

##### 10.Javascript创建对象的几种方式？

相关问题：如何继承性地创建一个对象？JS 怎么实现一个类。怎么实例化这个类?

对象分类(纯对象/实例对象/其他对象)：

纯对象：使用纯对象指代由字面量生成的、成员中不含函数和日期、正则表达式等类型的对象

实例对象：指通过构造函数（类）生成的对象

其他对象：主要指数组、日期、正则表达式等这类在Object基础上派生出来的对象

请指出以下代码的区别：
function Person(){}、
var person = Person()、
var person = new Person()？(可结合下列知识点回答)

###### 1.使用Object构造函数创建对象

```
var person = new Object();
person.name = "wanghuan";
person.age = 23;
person.sayName = function(){
    alert(this.name);
};
```
###### 2.使用对象字面量创建对象

```
var person = {
    name:"wanghuan",
    age:23,
    sayName:function(){
        alert(this.name);
    }
};
```

**上述两个方法都是创建单个对象，要想批量创建对象，则使用下列方法**

###### 3.使用工厂模式创建对象

**工厂模式的优点：**

发明了一种函数，用函数来封装以特定接口创建对象的细节。

**工厂模式的问题：**

虽然解决了多个相似对象的问题，但却没有解决对象识别的问题。

```
function createPerson (name,age,job) {
	var o = new Object();
	o.name = name;
	o.age = age;
	o.job = job;
	o.sayName = function(){
	alert(this.name);
    }
    return o;
}
var person1 = createPerson("wanghuan",22,"software engineer");
var person2 = createPerson("shuguang",22,"army");
```

###### 4.使用构造函数模式创建对象

**构造函数模式的优点：**

自定义的构造函数意味着将来可以把它的实例标识为一种特定的类型，这正是构造函数模式胜过工厂模式的地方。

```
function Person (name,age,job) {//构造函数，习惯性的第一个字母大写
   this.name = name;
   this.age = age;
   this.job = job;
   this.sayName = function(){
     alert(this.name);
   }//其实有this对象在，根本不用在执行代码前把函数绑定到特定对象上边
}
var person1 =  new Person("wanghuan",22,"software engineer");
var person2 = new Person("shuguang",22,"army");
```
**构造函数模式的缺点：**

构造函数主要问题就是每个方法都要在每个实例上重新创建一遍，这种方法创建函数，会导致不同的作用域链和标识符解析。
因此，用
```
function Person (name,age,job) {//构造函数，习惯性的第一个字母大写
   this.name = name;
   this.age = age;
   this.job = job;
}
function sayName(){
   alert(this.name);
}//把sayName()函数的定义转移到了构造函数外部，对象共享在全局作用域中定义的同一个函数
var person1 =  new Person("wanghuan",22,"software engineer");
var person2 = new Person("shuguang",22,"army");    
```    
 **但还有缺点：**
1. 全局作用域定义的函数每次被一个对象调用，全局作用域不是名副其实
2. 对象需要定义很多方法，要是全部都定义成全局函数，自定义的引用类型就丝毫无封装性可言。

###### 5.使用原型模式创建对象

**原型模式prototype属性**

prototype属性是一个这指针，指向一个对象，这个对象包含可以由特定类型的所有实例共享他所包含的属性和方法。可看下图


**原型模式的缺点**

所有属性的共享会导致所有实例默认一样的属性值，不合常理

创建的每个函数都有一个prototype(原型)属性，这个属性是一个指针，指向函数的原型对象。
![prototype属性指向函数的原型对象](http://img.blog.csdn.net/20160402143519956)
每次读取某个对象的某个属性的时候，需要执行搜索：

1.搜索对象实例本身，在实例中找到给定名字的属性，则返回属性的值，使用delete属性可以删除实例属性。

2.若没找到，则继续搜索指针指向的原型对象。
言外之意，对象实例本身的属性优先。
ps：用hasOwnProperty来判断属性是否存在于实例中或者原型中

此图为添加实例属性的情况：

看构造函数，构造函数的原型对象，和实例之间的关系

![这里写图片描述](http://img.blog.csdn.net/20160402143808676)

```
<!-- 注意上图的prototype、constructor、[[Prototype]]三个指针
Person.prototype.constructor指向Person -->
Person.prototype.constructor == Person

且实例都包含内部属性[[Prototype]]，该属性指向Person.prototype
```

```
function Person () {
}
Person.prototype.name = "wanghuan";
Person.prototype.age = "22";
Person.prototype.job = "software engineer";
Person.prototype.sayName = function(){
	alert(this.name);
};

var person1 = new Person();
var person2 = new Person();
person1.name = "shuguang";
alert(person1.name);//shuguang---先搜索实例对象，就返回
alert(person1.hasOwnProperty("name"));//true
alert(person2.name);//wanghuan--原型对象属性返回

delete person1.name;//delete操作符删除实例属性
alert(person1.hasOwnProperty("name"));//false
alert(person1.name);//wanghuan--原型对象属性返回
```
**原型模式更简单的语法**

以对象字面量形式创建的新对象，但是这样相当于重写了Person.prototype则constructor属性也就跟着改变，所以若按照下面写，constructor属性就变成了新对象的constructor属性(指向Object构造函数)

```
function Person () {
}
Person.prototype = {
	name:"wanghuan",
    age : "22",
	job : "software engineer",
	sayName: function(){
		alert(this.name);
	}
};
```

```
var friend = new Person();
alert(friend instanceof Object);//true
alert(friend instanceof Person);//true
alert(friend.constructor == Person);//false
alert(friend.constructor == Object);//true
```

###### 6.原型模式和构造函数模型的组合使用创建对象

**组合模式的优点**

每个实例有自己的属性，所有的实例共享着对方法的引用，最大限制的节省了内存。

```
//构造函数
function Person(name,age,job){
	this.name = name;
	this.age = age;
	this.job = job;
	this.friends = ["a","b"];
}
//原型对象
Person.prototype = {
	constructor:Person;
	sayName:function(){
		alert(this.name);
	}
}
var person1 = new Person("wanghuan",22,"software engineer");
var person2 = new Person("shuguang",22,"army");

person2.friends.push("c");
alert(person1.friends);//a,b
alert(person2.friends);//a,b,c
alert(person1.sayName === person2.sayName);//true
//说明两者的函数指针相同
```

###### 7.动态原型模式

**动态原型模式的优点**

1.看起来更像传统的面向对象编程，具有更好的封装性

2.初次调用构造函数才可执行下面的if判断方法

3.不需要对每一个方法进行if检查，只需要检查其中一个即可

```
function Person(name,age,job)
{
    //属性
    this.name=name;
    this.age=age;
    this.job=job;
    this.friends=["shu","guang"];
    //方法，不需要对每一个方法进行if检查，只需要检查其中一个即可
    if(typeof this.sayName !="function")
    {
        Person.prototype.sayName=function()
        {
            alert(this.name);
        };

        Person.prototype.sayFriends=function()
        {
            alert(this.friends);
        };
    }
}

var person = new Person("wanghuan",23,"SE");
person.sayName();
person.sayFriends();
```

##### 11.JavaScript原型，原型链 ? 有什么特点？

**构造函数，原型和实例的关系**

**构造函数**：都有一个原型属性，指向一个原型对象。prototype

**原型对象**：都包含一个指向构造函数的指针.constructor

**实例**：包含一个指向原型对象的**内部指针**.[[prototype]]

**原型**

1.创建的每个函数都有一个prototype原型属性，指向原型对象，prototype属性是一个指针，指向一个对象，这个对象包含可以由特定类型的所有实例共享的属性和方法。

2.每个实例都有一个内部属性原型[[Prototype]],指向它的原型对象

**原型链**

让原型对象等于另一个类型的实例(SubType.prototype = new SuperType();)，则重写了prototype的constructor，则会让一个原型对象包含一个指向另一个原型的指针[[Prototype]],这样层层递进，构成了实例与原型的链条，也就是原型链。

因此访问一个属性过程：

1.在实例中搜索该属性

2.若没找到，则会搜索实例的原型

3.若还没找到，则沿着原型链继续往上搜索原型


```
<script type="text/javascript">  
    function Person(name,age){  
        this.name=name;  
        this.age=age;  
    }  
    Person.prototype.sayHello=function(){  
        alert("使用原型得到Name："+this.name);  
    }  
    var per=new Person("wanghuan",22);  
    per.sayHello(); //输出：使用原型得到Name:wanghuan

    function Student(){}  
    Student.prototype=new Person("shuguang",22);  
    Student.prototype.grade=5;  
    Student.prototype.intr=function(){  
        alert(this.grade);  
    }  
    var stu=new Student();  
    //stu指向Student的原型，Student原型又指向Person的原型
    stu.sayHello();//输出：使用原型得到Name:shuguang
    stu.intr();//输出：5  
</script>  
```
![这里写图片描述](http://img.blog.csdn.net/20160917215757067)

注意：需要注意构造函数也有自己的_proto_，这点容易被自己忽略，如下所示

```
// 构造函数
function Foo(y) {
  // 构造函数将会以特定模式创建对象：被创建的对象都会有"y"属性
  this.y = y;
}

// "Foo.prototype"存放了新建对象的原型引用
// 所以我们可以将之用于定义继承和共享属性或方法
// 所以，和上例一样，我们有了如下代码：

// 继承属性"x"
Foo.prototype.x = 10;

// 继承方法"calculate"
Foo.prototype.calculate = function (z) {
  return this.x + this.y + z;
};

// 使用foo模式创建 "b" and "c"
var b = new Foo(20);
var c = new Foo(30);

// 调用继承的方法
b.calculate(30); // 60
c.calculate(40); // 80

// 让我们看看是否使用了预期的属性

console.log(

  b.__proto__ === Foo.prototype, // true
  c.__proto__ === Foo.prototype, // true

  // "Foo.prototype"自动创建了一个特殊的属性"constructor"
  // 指向a的构造函数本身
  // 实例"b"和"c"可以通过授权找到它并用以检测自己的构造函数

  b.constructor === Foo, // true
  c.constructor === Foo, // true
  Foo.prototype.constructor === Foo // true

  b.calculate === b.__proto__.calculate, // true
  b.__proto__.calculate === Foo.prototype.calculate // true

);
```

![这里写图片描述](http://img.blog.csdn.net/20161024141846209)

**确定原型和实例之间的关系**：
**instanceof**:

```
alert(stu instanceof Object);
//true,所有引用类型默认都继承了Object，其实也是通过原型链实现的
alert(stu instanceof Student);//true
alert(stu instanceof Person);//true
```

**isPrototypeOf():**

```
alert(Object.prototype.isPrototypeOf(stu));//true
alert(Student.prototype.isPrototypeOf(stu));//true
alert(Person.prototype.isPrototypeOf(stu));//true
```
**getPrototypeOf():**

```
Object.getPrototypeOf(person1)==Person.prototye
```

**原型链的一些题目**
```
function A(){

}

1.new A()._proto_ == A.prototype
2.A.prototype._proto_ == Object.prototype 也就是Object{}
3.A.prototype._proto_._proto_ == null;
```

##### 12.Javascript如何实现继承？
相关问题：对象的继承

###### 1.使用原型链实现继承
继承实际是依靠原型链来实现的，原型链是实现继承的主要方法。
```
function SuperType(){
	this.colors = ["red","blue","green"];
}
function SubType(){
}
//继承了SuperType
SubType.prototype = new SuperType();

var instance1 = new SubType();
instance1.colors.push("black");
alert(instance1.colors);//red,blue,green,black

var instance2 = new SubType();
alert(instance2.colors);//red,blue,green,black
```

```
function Parent(){}
function Child(){}
Child.prototype = new Parent();
console.log(new Child().constructor);
//输出：function Parent(){}
```

```
function Parent(){}
function Child(){}
Child.prototype = new Parent();
Child.prototype.constructor = Child;
console.log(new Child().constructor);
//输出：function Child(){}
```
但是有包含引用类型值带来的问题：

因为此原型是父对象的一个实例，则实例属性会成为原型属性，这样原型属性会被所有实例共享。也就是实例属性就变成了现在的原型属性。

###### 2.借用构造函数实现继承

即子类型构造函数的内部调用超类型构造函数

**缺点**

方法是在构造函数中定义，因此函数复用就无从谈起了。
```
function SuperType(){
	this.colors = ["red","blue","green"];
}
function SubType(){
	//继承了构造函数SuperType
	SuperType.call(this);
}
var instance1 = new SubType();
instance1.colors.push("black");
alert(instance1.colors);//red,blue,green,black

var instance2 = new SubType();
alert(instance2.colors);//red,blue,green
```

```
function SuperType(){
	this.name = name;
}
function SubType(){
	//继承了构造函数SuperType,同时还传递了参数
	SuperType.call(this,"wanghuan");
    //实例属性
	this.age = 22;
}
var instance = new SubType();
alert(instance.name);//"wanghuan"
alert(instance.age);//22
```
###### 3.组合继承（原型链和借用构造函数的技术组合）

**优点**：

使用最多的继承模式就是组合继承，这种模式使用原型链继承共享的属性和方法，而且通过借用构造函数实现实例属性的继承。

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
//继承方法
SubType.prototype = new SuperType();
SubType.prototype.constructor = SubType;
SubType.prototype.sayAge = function(){
	alert(this.age);
};
//这种组合继承，可以使两个不同的SubType实例分别有各自的属性--包含colors属性，又可以使用相同的方法
var instance1 = new SubType("wanghuan","22");
instance1.colors.push("black");
alert(instance1.colors);//red,blue,green,black
instance1.sayName();//wanghuan
instance1.sayAge();//22

var instance2= new SubType("shuguang","23");
alert(instance2.colors);//red,blue,green
instance2.sayName();//shuguang
instance2.sayAge();//23
```
##### 13.eval是做什么的？

**语法**

eval(string)

**参数说明**

该方法只接受原始字符串作为参数，若string参数不是原始字符串，则不做任何改变地返回。因此，不要为此函数传递String对象来作为参数

**使用场景**

eval其实就是让字符串当成js代码执行(把一段字符串传递给JS解释器，由JS解释器将这段字符串解释成JS代码并执行)
若代码是事先知道，不是在运行时才确定的，不用使用eval()

**例子**

```
<script type="text/javascript">
    eval("alert(1+1)"); //2,字符串被解释成js代码执行的，但是这样用着没什么意义
<script>

```

```
//eval函数的使用经常在DOM中，例如我们有div1,div2,div3，那么在document.getElementByID时我们的ID没有办法去得到

<script type="text/javascript">
    for (var loop = 1; loop < 10; loop++)  
    {

        eval('document.getElementById("div"+loop).innerHTML="123"');
    }
<script>
```

##### 14.什么是window对象? 什么是document对象?

**window对象**

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

http://www.w3school.com.cn/jsref/dom_obj_window.asp

**document对象**

document对象是window对象的一个属性，因此可以将他当成全局对象来访问。

document对象代表整个html文档，可用来访问页面中的所有元素，也就是页面。

Document类型表示文档。document对象是Document的一个实例，表示整个HTML页面。document对象是window对象的一个属性，可以作为全局对象来访问。

http://www.w3school.com.cn/jsref/dom_obj_document.asp

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

##### 15.null，undefined的区别？

**null**

null表示“没有对象”，即该处不应该存在值

（1） 作为函数的参数，表示该函数的参数不是对象。

（2） 作为对象原型链的终点。

```
Object.getPrototypeOf(Object.prototype)
// null

```

**undefined**

undefined表示"缺少值",就是此处应该有个值，变量声明但是没有初始化

（1）变量被声明了，但没有赋值时，就等于undefined。

（2) 调用函数时，应该提供的参数没有提供，该参数等于undefined。

（3）对象没有赋值的属性，该属性的值为undefined。

（4）函数没有返回值时，默认返回undefined。

```
var i;
i // undefined

function f(x){console.log(x)}
f() // undefined

var  o = new Object();
o.p // undefined

var x = f();
x // undefined

```

##### 16.函数和立即调用的函数表达式Immediately-Invoked Function Expression (IIFE)？

###### 1.创建函数的方法

创建函数的方法是函数声明,函数表达式,通过函数构造器创建

**函数声明**

function 函数名称 (参数：可选){ 函数体 }

```
function foo(){} // 声明，因为它是程序的一部分

(function(){
    function bar(){} // 声明，因为它是函数体的一部分
})();
```
**函数表达式**

function 函数名称（可选）(参数：可选){ 函数体 }

```
无函数名的肯定是函数表达式
var bar = function foo(){}; // 表达式，因为它是赋值表达式的一部分,虽然FE赋值给了一个变量（也就是参数），函数将该表达式保存在内存中，并通过变量名来访问（因为变量影响变量对象)
new function bar(){}; // 表达式，因为它是new表达式
(function foo(){}); // 函数表达式：包含在分组操作符内，是因为括号 ()是一个分组操作符，它的内部只能包含表达式

// 在数组初始化器内只能是表达式
[function bar() {}];

// 逗号也只能操作表达式
1, function baz() {};
```

**函数构造器创建**

既然这种函数对象也有自己的特色，我们将它与FD和FE区分开来。其主要特点在于这种函数的[[Scope]]属性仅包含全局对象;

```
//函数bar的[[Scope]]属性不包含foo上下文的Ao——变量”y”不能访问，变量”x”从全局对象中取得。
var x = 10;
foo();

function foo() {

  var x = 20;
  var y = 30;

  var bar = new Function('console.log(x); console.log(y);');

  bar(); // 10, "y" 未定义

}

```
**函数声明和函数表达式的区别**

1.函数声明FD在进入上下文阶段创建，在代码执行阶段就已经可用了
  函数表达式则是在代码执行阶段创建

---所以函数声明可以提升，但是函数表达式无函数声明提升的特性

```
sayName();//Name
function sayName(){
    alert("Name");
}

sayName();//报错，函数不存在
var sayName = function(){
    alert("Name");
}
```

2.函数声明影响变量对象VO，也就是存储在上下文的VO中的变量对象
函数表达式不影响变量对象VO，不存在于变量对象中（那样意味着既不可能通过名称在函数声明之前调用它，也不可能在声明之后调用它）。但是，FE在递归调用中可以通过名称调用自身。

```
// FE在定义阶段之前不可用（因为它是在代码执行阶段创建）

alert(foo); // "foo" 未定义

(function foo() {});

// 定义阶段之后也不可用，因为他不在变量对象VO中

alert(foo);  // "foo" 未定义
```

```
(function foo(bar) {

  if (bar) {
    return;
  }

  foo(true); // "foo" 是可用的,因为递归调用中可以通过名称调用自身

})();

// 在外部，是不可用的
foo(); // "foo" 未定义
```

```
//表达式，因为它是赋值表达式的一部分,虽然FE赋值给了一个变量（也就是参数），函数将该表达式保存在内存中，并通过变量名来访问（因为变量影响变量对象)
var foo = function () {
  alert('foo');
};

foo();
```
3.函数声明只能出现在程序或函数体内。从句法上讲，它们 不能出现在表达式或者Block（块）（{ ... }）中，例如不能出现在 if、while 或 for 语句中。因为js无块级作用域，只有函数和全局作用域。
函数表达式则在源码中须出现在表达式的位置

```
// 函数可以在如下地方声明：
// 1) 直接在全局上下文中
function globalFD() {
  // 2) 或者在一个函数的函数体内
  function innerFD() {}
}
```

```
// 千万别这样做！
// 因为有的浏览器会返回first的这个function，而有的浏览器返回的却是第二个

if (true) {
    function foo() {
      return 'first';
    }
}
else {
    function foo() {
      return 'second';
    }
}
foo();

// 相反，这样情况，我们要用函数表达式
var foo;
if (true) {
    foo = function() {
      return 'first';
    };
}
else {
    foo = function() {
      return 'second';
    };
}
foo();
```

**函数表达式的有优点** -- 不污染全局变量

```
//在代码执行阶段通过条件语句进行创建FE，不会污染变量对象VO。
var foo = 10;

var bar = (foo % 2 == 0
  ? function () { alert(0); }
  : function () { alert(1); }
);

bar(); // 0
```

###### 2.立即调用的函数表达式Immediately-Invoked Function Expression (IIFE)

**函数的正常调用**

函数function foo(){}或者var foo = function(){}，调用时，你都需要在后面加上一对圆括号，像这样foo()。

**立即调用的函数表达式**

立即调用的函数表达式如果没有引用的话(没有赋值给变量)，是在代码执行阶段这个的function就会被创建，并且立即执行，然后自动销毁。(因为是函数表达式，不在VO中)

```
//立即调用的几种形式
var foo = function(){}();
//这两种模式都可以被用来立即调用一个函数表达式，利用函数的执行来创造私有变量

(function(){/* code */}());//Crockford recommends this one，括号内的表达式代表函数立即调用表达式
(function(){/* code */})();//But this one works just as well，括号内的表达式代表函数表达式

//下面一个立即执行的函数，周围的括号不是必须的，因为函数已经处在表达式的位置
var foo = {

  bar: function (x) {
    return x % 2 != 0 ? 'yes' : 'no';
  }(1)

};

alert(foo.bar); // 'yes'--foo.bar是一个字符串而不是一个函数，这里的函数仅仅用来根据条件参数初始化这个属性——它创建后并立即调用
```

function (){}();和function foo(){ }();--都不是立即调用的函数表达式,且都会报错

原因：因为圆括号放在一个函数表达式后面指明了这是一个被调用的函数;但是有关键字function，解释器会将它看做是函数声明，若在一个声明后面则意味着只是一个分组操作符。

比如：
```
alert(foo); // 函数
function foo(){
    alert(x);
}(1);
foo(10); // 这才是一个真正的函数调用，结果是10
// 1只是分组操作符，不是函数调用，其实相当于下边这段代码
// 下面的声明的时候产生了2个对象：一个函数声明，一个带有1的分组操作符
function foo(){
    alert(x);
}
// 一份分组操作符，包含一个表达式1
(1);
```

解决：将函数声明包裹在圆括号里来告诉语法分析器去当成一个函数表达式解析，这样才对(function foo(){ })()

**保存闭包的状态**

一个立即调用的函数表达式可以用来锁定值并且有效的保存此时的状态

闭包：一个函数内的函数可以访问外部函数作用域的变量

```
//i没有被锁定，相反的，每个链接，当被点击时（循环已经被很好的执行完毕）,因此会弹出所有元素的总数,因为这是 `i` 此时的真实值。
var elems = document.getElementsByTagName("a");

for(var i = 0,len = elems.length;i < len;i++) {
    elems[i].addEventListener('click',function(e){
        e.preventDefault();
        alert('I am link #' + i)
    },false);
}
// 而像下面这样改写，便可以了，因为在IIFE里，`i`值被锁定在了`lockedInIndex`里。
// 在循环结束执行时，尽管`i`值的数值是所有元素的总和，但每一次函数表达式被调用时，
// IIFE 里的 `lockedInIndex` 值都是`i`传给它的值,所以当链接被点击时，正确的值被弹出。
var elems = document.getElementsByTagName("a");

for(var i = 0,len = elems.length;i < len;i++) {
    (function(lockedInIndex){
        elems[i].addEventListener('click',function(e){
            e.preventDefault();
            alert('I am link #' + lockedInIndex);
        },false);
    })(i);
}
//你同样可以像下面这样使用IIFE，仅仅只用括号包括点击处理函数，并不包含整个`addEventListener`。
//无论用哪种方式，这两个例子都可以用IIFE将值锁定，不过我发现前面一个例子更可读
var elems = document.getElementsByTagName("a");

for(var i = 0,len = elems.length;i < len;i++) {
    elems[i].addEventListener('click',(function(lockedInIndex){
        return function(e) {
            e.preventDefault();
            alert('I am link #' + lockedInIndex);
        };
    }(i),false);
}
```

##### 17.执行上下文(EC Execution Context),变量对象(VO variable object),活动对象(AO active object)

若把执行上下文看成一个对象，则应该包含如下属性

```
(executionContextObj = {
   variableObject: { /* 函数中的arguments对象, 参数, 内部的变量以及函数声明,注意不包含函数表达式 */ },
   scopeChain: { /* variableObject 以及所有父执行上下文中的variableObject */ },
   this: {}
   }
)
```

```
var foo = 10;

function bar() {} // // 函数声明
(function baz() {}); // 函数表达式

console.log(
  this.foo == foo, // true
  window.bar == bar // true
);

console.log(baz); // 引用错误，baz没有被定义
```
![这里写图片描述](http://img.blog.csdn.net/20161024144141046)
**处理上下文代码的2个阶段**

进入执行上下文和执行代码

**进入执行上下文：** important

1.建立变量对象AO，函数，arguments对象，参数，变量是进入上下文阶段放入VO中，也就是变量声明提升并且变量声明顺序上是在函数声明和形参声明后
2.建立作用域链
3.确定上下文中this的指向对象

```
if (true) {
  var a = 1;
} else {
  var b = 2;
}

alert(a); // 1
alert(b); // undefined,不是b没有声明，而是b的值是undefined
```

```
//变量声明在顺序上跟在函数声明和形式参数声明之后，而且在这个进入上下文阶段，变量声明不会干扰VO中已经存在的同名函数声明或形式参数声明
alert(x); // function

var x = 10;
alert(x); // 10

x = 20;

function x() {};

alert(x); // 20
```

```
function test(a, b) {
  var c = 10;
  function d() {}
  var e = function _e() {};
  (function x() {});
}

test(10); // call
当进入带有参数10的test函数上下文时，AO表现为如下：
//AO里并不包含函数“x”。这是因为“x” 是一个函数表达式(FunctionExpression, 缩写为 FE) 而不是函数声明，函数表达式不会影响VO
AO(test) = {
  a: 10,
  b: undefined,
  c: undefined,
  d: <reference to FunctionDeclaration "d">
  e: undefined
};
```

**代码执行：**

变量赋值，函数引用，执行其它代码

**变量对象VO**

每个执行环境都有一个与之关联的变量对象，变量对象VO是与执行上下文相关的特殊对象,用来存储上下文的函数声明，函数形参和变量。
每个上下文拥有自己的变量对象：对于全局上下文，它是全局对象自身；对于函数，它是活动对象。

变量对象VO存储上下文中声明的以下内容
{
    函数声明FD(如果在函数上下文中),----不包含函数表达式
    函数形参function arguments,
    变量声明--注意b=10不是变量，但是var b = 10;是变量，有变量声明提升
    alert(a); // undefined
    alert(b); // "b" 没有声明

    b = 10;
    var a = 20;
}

变量对象的例子

```
var a = 10;

function test(x) {
  var b = 20;
};

test(30);

// 全局上下文的变量对象
VO(globalContext) = {
  a: 10,
  test: <reference to function>
};

// test函数上下文的变量对象
VO(test functionContext) = {
  x: 30,
  b: 20
};
```

变量对象中 **函数声明可以覆盖变量声明**，但是不能覆盖变量赋值,如下

```
//函数声明可以覆盖变量声明
function value(){
    return 1;
}
var value;
alert(typeof value);    //"function"

//函数声明的优先级高于变量声明的优先级，但如果该变量value赋值了，变量赋值初始化就覆盖了函数声明
function value(){
    return 1;
}
var value = 1;
alert(typeof value);    //"number"
```


**变量对象VO分类**

全局上下文的变量对象VO，函数上下文的变量对象VO

```
//全局上下文的变量对象VO就是全局对象
VO(globalContext) === global;
```

**活动变量AO**

当函数被调用后，这个特殊的活动对象就被创建了。它包含普通参数与特殊参数对象（具有索引属性的参数映射表）。活动对象在函数上下文中作为变量对象使用。

在函数执行上下文中，VO是不能直接访问的，此时由活动对象(activation object,缩写为AO)扮演VO的角色。

```
VO(functionContext) === AO;
```

**arguments**

Arguments对象是活动对象的一个属性，它是一个类数组对象，实际不是数组的实例，它包括如下属性：

callee — 指向当前函数的引用

length — 真正传递的参数个数

properties-indexes (字符串类型的整数) 属性的值就是函数的参数值(按参数列表从左到右排列)。
properties-indexes内部元素的个数等于arguments.length. properties-indexes 的值和实际传递进来的参数之间是共享的。

```
function foo(x, y, z) {

  // 声明的函数参数数量arguments (x, y, z)
  alert(foo.length); // 3

  // 真正传进来的参数个数(only x, y)
  alert(arguments.length); // 2

  // 参数的callee是函数自身
  alert(arguments.callee === foo); // true

  // 参数共享

  alert(x === arguments[0]); // true
  alert(x); // 10

  arguments[0] = 20;
  alert(x); // 20

  x = 30;
  alert(arguments[0]); // 30

  // 不过，没有传进来的参数z，和参数的第3个索引值是不共享的

  z = 40;
  alert(arguments[2]); // undefined

  arguments[2] = 50;
  alert(z); // 40

}

foo(10, 20);
```

http://www.cnblogs.com/TomXu/archive/2012/01/16/2309728.html

##### 18.Javascript作用链域(Scope Chain)?如何延长或者改变作用域链？

作用域链就是内部上下文的变量对象VO的列表，作用域链用来检索上下文出现的标识符，从而保证有序访问所有变量和函数。

一个作用域链包括父级变量对象（variable object）（作用域链的顶部）、函数自身变量VO和活动对象（activation object）。

当查找标识符的时候，会从作用域链的活动对象部分开始查找，然后(如果标识符没有在活动对象中找到)查找作用域链的顶部，循环往复，就像作用域链那样。

```
var x = 10;

(function foo() {
  var y = 20;
  (function bar() {
    var z = 30;
    // "x"和"y"是自由变量
    // 会在作用域链的下一个对象中找到（函数”bar”的互动对象之后）
    console.log(x + y + z);
  })();
})();
```
![这里写图片描述](http://img.blog.csdn.net/20161024155123546)

**改变或者延长作用域链**

如果使用with或者catch语句就会改变作用域链。这两个语句是可以在作用域链前端临时增加一个变量对象，该变量对象在代码执行后被移除。

**with语句** --将指定的对象添加到作用域链中

**try-catch中的catch语句** --创建一个新的变量对象


##### 19.谈谈this对象的理解。(全局和函数代码中的this)--且有函数调用的方式

this是执行上下文的一个属性，this值在 **进入** 上下文时确定，并且在上下文运行期间永久不变。
this是为了寻找拥有当前上下文（context）的对象（context object）

也就是this 是动态绑定，或称为运行期绑定的

```
(executionContextObj = {
   variableObject: { /* 函数中的arguments对象, 参数, 内部的变量以及函数声明 */ },
   scopeChain: { /* variableObject 以及所有父执行上下文中的variableObject */ },
   this: {}
   }
)
```

**全局代码中的this**

全局代码中的this始终指向全局对象本身

```
// 显示定义全局对象的属性
this.a = 10; // global.a = 10
alert(a); // 10
```

**函数代码中的this** --- **函数调用的方式**

this取决于调用函数的方式。(作为函数调用，对象方法调用，构造函数调用，call或者apply调用)

1.作为函数调用--this绑定到全局对象

```
//隐式的声明了一个全局变量
function makeNoSense(x) {
this.x = x;
}

makeNoSense(5);
x;// x 已经成为一个值为 5 的全局变量
```

对于内部函数，即声明在另外一个函数体内的函数，这种绑定到全局对象的方式会产生另外一个问题。

```
var point = {
 x : 0,
 y : 0,
 moveTo : function(x, y) {
     // 内部函数
     var moveX = function(x) {
     this.x = x;//this 绑定到了哪里？--绑定到全局对象，生成一个全局变量
    };
    // 内部函数
    var moveY = function(y) {
    this.y = y;//this 绑定到了哪里？--绑定到全局对象，生成一个全局变量
    };

    moveX(x);
    moveY(y);
    }
 };
 point.moveTo(1, 1);
 console.log(point.x); //==>0
 console.log(point.y); //==>0
 console.log(x); //==>1
 console.log(y); //==>1
```

解决：内部函数的this应该绑定在外层函数对应的对象上

```
var point = {
 x : 0,
 y : 0,
 moveTo : function(x, y) {
     // 内部函数
     var that = this;
     var moveX = function(x) {
     that.x = x;//that 绑定到了外部函数的对象上
    };
    // 内部函数
    var moveY = function(y) {
    that.y = y;//that 绑定到了外部函数的对象上
    };

    moveX(x);
    moveY(y);
    }
 };
 point.moveTo(1, 1);
 console.log(point.x); //==>1
 console.log(point.y); //==>1
 console.log(x); //==>x is not defined
 console.log(y); //==>y is not defined
```

2.作为对象方法调用--this绑定到此对象上

```
var point = {
x : 0,
y : 0,
moveTo : function(x, y) {
    this.x = this.x + x;
    this.y = this.y + y;
    }
};

point.moveTo(1, 1)//this 绑定到当前对象，即 point 对象
console.log(point.x); //==>1
console.log(point.y); //==>1
console.log(x); //==>x is not defined
console.log(y); //==>y is not defined
```

3.作为构造函数调用-- 绑定到新创建的对象上

```
function Point(x, y){
    this.x = x;
    this.y = y;
 }
```

4.使用call和apply调用

call和apply是改变了被调用函数的执行上下文环境，即this绑定的对象；this指向的是apply中的第一个参数

```
function Point(x, y){
    this.x = x;
    this.y = y;
    this.moveTo = function(x, y){
        this.x = x;
        this.y = y;
    }
 }

 var p1 = new Point(0, 0);
 var p2 = {x: 0, y: 0};
 p1.moveTo(1, 1);
 //apply 可以将 p1 的方法应用到 p2 上，这时候 this 也被绑定到对象 p2 上
 p1.moveTo.apply(p2, [10, 10]);
```

##### 20.aplly(),call(),bind()的区别？

三者都属于Function.prototype的一个方法，区别如下：

**call和apply**

call,apply都是改变了被调用函数的执行上下文环境，并且直接执行了函数。
call 需要把参数按顺序传递进去，而 apply 则是把参数放在数组里

```
var zlw = {
    name: "zlw",
    sayHello: function (age) {
         console.log("hello, i am ", this.name + " " + age " years old");
     }
};

var  xlj = {
    name: "xlj",
};

zlw.sayHello(24);// hello, i am zlw 24 years old

//call ，apply
zlw.sayHello.call(xlj, 24);// hello, i am xlj 24 years old
zlw.sayHello.apply(xlj, [24]);// hello, i am xlj 24 years old

//bind
zlw.sayHello.bind(xlj, 24)(); //hello, i am xlj 24 years old
zlw.sayHello.bind(xlj, [24])(); //hello, i am xlj 24 years old
zlw.sayHello.bind(xlj)(24); //hello, i am xlj 24 years old
zlw.sayHello.bind(xlj)([24]); //hello, i am xlj 24 years old
```

call和apply的区别是：

语法结构--call方法中传入的参数是是一个个列举出来的，而apply方法中的参数二是一个数组

```
apply(thisArg [,arg1,arg2,... ] );
call(thisArg,arg1,arg2,...);
```

参数个数不确定的apply用法：

定义一个 log 方法，让它可以代理 console.log 方法，常见的解决方法是：

```
function log(msg)　{
    console.log(msg);
}
log(1); //1
log(1,2); //1
```

上面方法可以解决最基本的需求，但是当传入参数的个数是不确定的时候，上面的方法就失效了，这个时候就可以考虑使用 apply 或者 call，注意这里传入多少个参数是不确定的，所以使用apply是最好的，方法如下：

```
function log(){
    console.log.apply(console, arguments);
};
log(1); //1
log(1,2); //1 2
```

接下来的要求是给每一个 log 消息添加一个"(app)"的前辍，比如：

```
log("hello world"); //(app)hello world
```

该怎么做比较优雅呢?这个时候需要想到arguments参数是个伪数组，通过 Array.prototype.slice.call 转化为标准数组，再使用数组方法unshift，像这样：

```
function log(){
    var args = Array.prototype.slice.call(arguments);
    args.unshift('(app)');

    console.log.apply(console, args);
};
```

**bind**  -- (请解释 Function.prototype.bind？)

bind()方法会创建一个新函数,称为绑定函数,新函数与被调函数（绑定函数的目标函数）具有相同的函数体。只是返回一个函数但不直接执行该函数。当调用这个绑定函数时,绑定函数会以创建它时传入bind()方法的第一个参数作为 this,传入 bind() 方法的第二个以及以后的参数加上绑定函数运行时本身的参数按照顺序作为原函数的参数来调用原函数(所以有下面多种写法)。

也就是说，区别是，当你希望改变上下文环境之后并非立即执行，而是回调执行的时候，使用 bind() 方法。而 apply/call 则会立即执行函数。

19个知识点中讲到了函数调用的方式(为函数调用，对象方法调用，构造函数调用，call或者apply调用)--函数调用中涉及到了函数中的内部函数，this指向全局对象

```
function Person(name){
 this.nickname = name;
 this.distractedGreeting = function() {
   <!--  函数里边的函数，this是全局变量-->
   setTimeout(function(){
     console.log("Hello, my name is " + this.nickname);---setTimeout是函数内部的函数，this指向全局对象，所以是undefined
   }, 500);
 }
}
 
var alice = new Person('Alice');
alice.distractedGreeting();
//Hello, my name is undefined
```

以前的方法是缓存this，因为它使得setTimeout函数中可以访问Person的上下文，和上述19知识点类同

由于 Javascript 特有的机制，上下文环境在 distractedGreeting:function(){ } 过渡到 setTimeout(function(){})发生了改变，上述使用变量保存 this 这些方式都是有用的，也没有什么问题。

当然使用 bind() 可以更加优雅的解决这个问题

```
function Person(name){
 this.nickname = name;
 this.distractedGreeting = function() {
   var that = this;
 
   setTimeout(function(){
     console.log("Hello, my name is " + that.nickname);
   }, 500);
 }
}
 
var alice = new Person('Alice');
alice.distractedGreeting();
//Hello, my name is Alice
```

更好的方法：是使用bind()来创建，使这个函数不论怎么调用都有同样的 this 值，从原来的函数和原来的对象创建一个绑定函数

```
function Person(name){
 this.nickname = name;
 this.distractedGreeting = function() {

   setTimeout(function(){
     console.log("Hello, my name is " + this.nickname);
   }.bind(this), 500);
 }
}
 
var alice = new Person('Alice');
alice.distractedGreeting();
//Hello, my name is Alice
```

bind() 最简单的用法是创建一个函数，使这个函数不论怎么调用都有同样的 this 值。JavaScript新手经常犯的一个错误是将一个方法从对象中拿出来，然后再调用，希望方法中的 this 是原来的对象。（比如在回调中传入这个方法。）如果不做特殊处理的话，一般会丢失原来的对象。从原来的函数和原来的对象创建一个绑定函数，则能很漂亮地解决这个问题：

```
this.x = 9;
var module = {
  x: 81,
  getX: function() { return this.x; }
};
 
module.getX(); // 81
 
var getX = module.getX;
getX(); // 9, 因为在这个例子中，"this"指向全局对象
 
// 创建一个'this'绑定到module的函数
var boundGetX = getX.bind(module);
boundGetX(); // 81
```

总结：

1.apply 、 call 、bind 三者都是用来改变函数的this对象的指向的；

2.apply 、 call 、bind 三者第一个参数都是this要指向的对象，也就是想指定的上下文；

3.apply 、 call 、bind 三者都可以利用后续参数传参；

4.bind是返回对应函数，便于稍后调用；apply、call则是立即调用 。

##### 21.什么是闭包（closure）？如何使用闭包？为什么要用它？

相关问题：闭包优点缺点

导致闭包出现的原因是JavaScript的哪种机制？(因为作用域链原理，不能从外部读取其他函数的内部变量，所以引出了闭包)

**背景：**

根据作用域和作用域链的原理，我们似乎不能在外部读取其它函数的内部变量。

**闭包：**

闭包就是有权访问另一个函数作用域中的变量的函数

**原理：**

1.后台执行环境中，闭包的作用域链包含着自己的作用域、函数的作用域和全局作用域。

2.通常，函数的作用域和变量会在函数执行结束后销毁。

3.但是，当函数返回一个闭包时，这个函数的作用域将会一直在内存中保存到闭包不存在为止。

**缺点：**

1.需要维护额外的作用域

2.过度使用闭包会占用大量内存

eg1：通过返回内部函数实现闭包对函数内部数据的访问

```
function sayHello2(name) {
    var text = 'Hello ' + name; // Local variable
    var say = function() {
	    console.log(text);
    }
    return say;
}
//可以访问函数内部变量，说明text被保存在了闭包中
var say2 = sayHello2('Bob');
say2(); // "Hello Bob"
```

eg2：闭包不是复制本地变量值保存， 而是提供关联本地变量（可理解成指针）

```
function say667() {
    var num = 666;
    var say = function() { console.log(num); }
    num++;
    return say;
}
var sayNumber = say667();
sayNumber(); //667
```

```
function foo(x) {

    var tmp = 3;
    return function (y) {
        alert(x + y + (++tmp)); //16
    }
}
var bar = foo(2); // bar 现在是一个闭包
bar(10);
```

eg3：闭包不是复制本地变量值保存， 而是提供关联本地变量（可理解成指针）
```
var gLogNumber, gIncreaseNumber, gSetNumber;
function setupSomeGlobals() {
    // Local variable that ends up within closure
    var num = 666;
    // Store some references to functions as global variables
    gLogNumber = function() { console.log(num); }
    gIncreaseNumber = function() { num++; }
    gSetNumber = function(x) { num = x; }
}
//第一个闭包创建
setupSomeGlobals();
gIncreaseNumber();
gLogNumber(); // 667
gSetNumber(5);
gLogNumber(); // 5

var oldLog = gLogNumber;
//一个新的闭包被创建
setupSomeGlobals();
gLogNumber(); // 666

oldLog() // 5
```

##### 22.DOM的作用和Node接口？

**1.DOM的作用**

DOM是针对HTML和XML文档的API，允许开发人员添加，移除和修改页面的某一部分。DOM为web文档创建带有层级的结果，这些层级是通过node节点组成

**2.Node接口--12种节点**

DOM1级定义了一个 **Node接口** ，该接口将DOM中的所有节点类型实现，总共有12种节点。

常用的有元素节点，属性节点，文本节点，注释节点，文档节点

ELEMENT_NODE(1),ATTRIBUTE_NODE(2),TEXT_NODE(3),COMMENT_NODE(8),DOCUMENT_NODE(9)

判断节点类型

```
// 在ie种无效，因为ie没有公开NODE的构造函数
if(someNode.nodeType == NODE.ELEMENT_NODE) {

}

//一般通用，在ie中也有效
if(someNode.nodeType == 1) {

}
```

**3.node类型的属性和方法**

```
someNode.nodeType
someNode.nodeName
someNode.nodeValue
someNode.childNodes----保存着NodeList对象，可以用someNode.childNodes[0]或者someNode.childNodes.item(0)两种方式访问(可用以下方法来转换成数组)
someNode.firstChild
someNode.lastChild
someNode.parentNode
someNode.nextSibling
someNode.previousSibling
```

常用的方法
```
getElementById()
getElementsByTagName()
getAttribute()
setAttribute()
--上述是DOM1的组成部分，也是DOM core的方法，可以对任意元素节点任意属性进行设置
--之前用的是element.value或者element.src等HTML-DOM方法，但这个方法不是对所有属性都有用，所以基本都用setAttribute方法
```

**4.node类型--Document类型**

Document类型表示文档。document对象是Document的一个实例，表示整个HTML页面。document对象是window对象的一个属性，可以作为全局对象来访问。

document对象的属性和方法
```
document.nodeType--9
document.nodeName--"#document"
document.nodeValue--null
document.parentNode--null

<!-- 所有浏览器访问html和body通用的方法是document.documentElement和document.body -->
html == document.documentElement---一般不用document.childNodes[0]或者document.firstChild因为前边可能有注释节点
body == document.body

<!-- 文档信息 -->
document.title

<!-- 和网页请求相关的属性 -->
document.URL--页面完整的URL
document.domain--页面的域名
document.referrer--保存着链接到当前页面的那个页面的URL

<!-- 查找元素 -->
document.getElementById("someId");
var images = document.getElementsByTagName("img");
images[0]---其实就是在后台调用images.item(0)
images["myImage"]--其实就是在后台调用images.namedItem("myImage");
```

**5.node类型--Element类型**

element对象的属性和方法，注意attributes这个属性
```
element.nodeType--1
element.nodeName--元素的标签名
element.nodeValue--null
element.parentNode--Document或Element
<!-- 访问设置元素的属性 -->
element.getAttribute();
element.setAttribute();
element.removeAttribute();
element.attributes--也是一个类似nodeList
```

遍历元素的所有属性element.attributes
```
function outputAttributes(element) {
    var pairs = new Array(),
        attrName,
        attrValue,
        len,
        i;

    for(i = 0,len = element.attributes.length;i < len;i++) {
        attrName = element.attributes[i].nodeName;
        attrValue = element.attributes[i].nodeValue;
        <!-- 加上此判断语句是为了防止IE7以更早的版本中会返回所有可能的属性，而不是只返回被指定的特性 -->
        if(element.attributes[i].specified) {
            pairs.push(attrName + "=\"" + attrValue + "\"");
        }
    }
    return pairs.join(" ");
}
```

**遍历所有元素子节点**

元素的子节点(li标签之间有空白是如何形成的)
```
<!-- IE解析成3个子节点，但是其他浏览器解析成7个节点(3个li元素节点和4个空白文本节点) -->
<ul id="myList">
    <li>Item 1</li>
    <li>Item 2</li>
    <li>Item 3</li>
</ul>
```
所以要想遍历li标签的方法如下两种：

1.childNodes节点遍历

```
var ulList = document.getElementById("myList");

for(var i = 0 ,len = ulList.childNodes.length;i < len;i++) {
    <!-- 确保是li子节点 -->
    if(ulList.childNodes[i].nodeType == 1) {
        // do something
    }
}
```

2.直接使用getElementsByTagName

```
var ulList = document.getElementById("myList");
var items = ulList.getElementsByTagName("li");
```

3.使用专门的元素遍历方法(dom扩展中)，这样就不用担心空白的文本节点了

DOM扩展的元素遍历的属性：

childElementCount

firstElementChild

lastElementChild

previousElementSibling

nextElementSibling

```
var ulList = document.getElementById("myList"),
    child = ulList.firstElementChild;

for(var i = 0 ,len = ulList.childElementCount;i < len;i++) {
    if(child != ulList.firstElementChild) {
        child = child.nextElementSibling;
    }
}
```

**下一个元素节点**

真正需要的不是下一个节点，而是下一个元素节点。
```
function getNextElement(node) {
    if(node.nodeType == 1) {
        return node;
    }
    if(node.nextSibling) {
        return getNextElement(node.nextSibling);
    }
    return null;
}

//把当前h1元素(即headers[i])的nextSibing节点作为参数传递给getNextElement()函数
var elem = getNextElement(headers[i].nextSibing);
```

**6.node类型--Attr类型**--不常用

attr对象的属性和方法--虽然也是节点，但不被人为是DOM文档树的一部分
```
attrNode.nodeType--2
attrNode.nodeName--特性的名称
attrNode.nodeValue--特性的值
attrNode.parentNode--null
```
一般我们都用元素的getAttribute(),setAttribute(),removeAttribute()，很少直接引用特性节点
Attr对象3个属性name特性名称，value特性的值，specified代码中是否注定此特性，是布尔值

**访问特性的三个方法**

```
var attr = document.createAttribute("align");
attr.value = "left";
element.setAttributeNode(attr);--为元素添加特性
<!-- 访问特性的三种方法
1.getAttribute()只返回特性的值
2.getAttributeNode()返回特性节点
3.attributes也是返回特性节点
 -->
element.attributes["align"].value;--left
element.getAttribute("align");--left
element.getAttributeNode("align").value;--left
```

**7.node类型--Text类型**

若想改变某个文本节点的值，那就使用nodeValue属性。比如，想获取p元素下的文本内容
```
<p id="discription">text content</p>

document.getElementById("discription").childNodes[0].nodeValue;
document.getElementById("discription").firstChild.nodeValue;
--获取p元素孩子节点也就是文本内容的nodeValue也就是文本的值
```

text对象的属性和方法
```
textNode.nodeType--3
textNode.nodeName--"#text"
textNode.nodeValue--节点所包含的文本
textNode.parentNode--是一个element

<!-- 无文本节点 -->
<div></div>
<!-- 有空格，有一个文本节点 -->
<div> </div>
<!-- 有内容，有一个文本节点 -->
<div>hello world！</div>

<!-- 规范化文本节点normalize()和分割文本节点splitText() -->
在一个包含两个或者多个文本节点的父元素调用normalize方法

```

创建文本节点document.createTextNode()

```
var element = document.createElement("div");
element.className = "message";

var textNode = document.createTextNode("Hello world!");
element.appendChild(textNode);

document.body.appendChild(element);
```

**8.node类型--Comment类型**
comment对象的属性和方法
```
commentNode.nodeType--8
commentNode.nodeName--"#comment"
commentNode.nodeValue--注释的内容
commentNode.parentNode--可能是Document或Element
```

**9.node类型--DocumentFragment类型**
DocumentFragment对象的属性和方法
```
documentFragmentNode.nodeType--11
documentFragmentNode.nodeName--"#document-fragment"
documentFragmentNode.nodeValue--null
documentFragmentNode.parentNode--null
```

documentFragment是一种轻量级的文档，是文档片段，文档片段不能直接添加到文档中，但是可以作为一个仓库来使用，可以在里面保存将来可能会添加到文档中的节点。
```
var fragment = document.createDocumentFragment();
var ul = document.getElementById("myList");
var li = null;

for(var i = 0;i < 3;i++) {
    li = document.createElement("li");
    li.appendChild(document.createTextNode("Item" + (i+1)));
    fragment.appendChild(li);
}

ul.appendChild(fragment);
```

##### 23.通过DOM API操作元素(样式，类名，内容，节点)?

###### 1.CSS-DOM(样式style，类名className)--DOM2

**样式style属性**

1.直接DOM属性来访问，去除-，首字母变大些
2.像数组一样访问属性

DOM属性和CSS属性的区别：
这里我们只是要了基本的CSS属性名称，唯一区别是CSS属性的名称如果带有-的话，就需要去除，比如用marginTop代替margin-top,采用Camel记号。

```
document.getElementById('intro').style.color = '#FF0000';
document.getElementById('intro').style.padding = '2px 3px 0 3px';  
document.getElementById('intro').style.backgroundColor = '#FFF';  
document.getElementById('intro').style.marginTop = '20px';
```

用数组来访问style中的属性

```
function changeStyle(elem, property, val) {
    elem.style[property] = val; // 使用[]来访问属性
}

// 使用上述的函数：  
var myIntro = document.getElementById('intro'); // 获取intro文本对象
changeStyle(myIntro, 'color', 'red');  
```

**style对象定义了一些属性和方法**

cssText,length,getPropertyValue,removeProperty,setProperty

```
myDiv.style.cssText = "width:25px;height:100px;background-color:green";
alert(myDiv.style.cssText);


for(var i = 0,len = myDiv.style.length;i < len;i++) {
    var prop,value;

    prop = myDiv.style[i];
    value = myDiv.style.getPropertyValue(prop);
    alert(prop + ":" + value);
}


myDiv.style.removeProperty("border");
```

**className属性**

以下是设置className
```
elem.className = "newName";
//存在现有的class--将新的class设置值追加到className属性上，注意又空格
elem.className += " newName";
//不存在现有的class用函数
function addClass(element,value) {
    if (!element.className) {
        element.className = value;
    } else {
        newClassName = element.className;
        newClassName += " ";
        newClassName += value;
        element.className = newClassName;
    }
}
```
可以看下面DOM扩展中，classList的方便性
```
操作类名的原始方法
var classNames = div.className.split(/\s+/);

var pos = -1,
   len,
   i;

for(i = 0,len = classNames.length;i < len;i++) {
   if(classNames[i] == "user") {
       pos = i;
       break;
   }
}
classNames.splice(i,1);
div.className = classNames.join(" ");

有了classList之后可以直接用整个方法，classList有如下方法
div.classList.add(value);
div.classList.contains(value);
div.classList.remove(value);
div.classList.toggle(value);
```
###### 2.动态创建HTML内容(除了两个老方法还结合第三部分)

动态创建HTML内容的老技巧：document.write() 和innerHTML

document.write():

用法：document.write()是DOM方法,此方法是方便快捷把字符串插入到文档里，也就是内容写入页面从而导致整个页面重绘
缺点：违背了分离javascript原则，应该避免HTML文档的<body>部分使用<script>标签,避免使用
```
//违背了分离js原则，html文档中还有script
<body>
    <script type="text/javascript">
        document.write("<p>This is inserted</p>");
    </script>
</body>

//就算是document.write挪到外部函数中，你也需要在html文档的body中使用script调用这个函数,所以还是没有分离js

function insertP(text) {
    var str = "<p>";
    str += text;
    str += "</p>";
    document.write(str);
}

<body>
    <script type="text/javascript">
        insertP("This is inserted");
    </script>
</body>
```

innerHTML(比上一个方法更值得推荐)：

用法：是DOM元素的一个属性，代表这个元素的内部html内容。可以用来读，写某给定元素里的HTML内容。一旦使用innerHTML属性，整个元素全部内容将被替换
优点：允许更精确的控制刷新某个页面的某个部分，所以优于document.write
缺点：
```
var myIntro = document.getElementById('intro');  

//获取某元素的innerHTML
myIntro.innerHTML;

// 替换当前的内容
myIntro.innerHTML = 'New content for the <strong>amazing</strong> paragraph!';  

// 添加内容到当前的内容里
myIntro.innerHTML += '... some more content...';
```

**document.write和 innerHTML的区别**

1.document.write是DOM方法，innerHTML是DOM属性
2.document.write是方便快捷把字符串插入到文档里，也就是内容写入页面从而导致整个页面重绘；
  innerHTML则是可以读写某元素的HTML内容，对页面控制更加准确
3.document.write没实现js分离，innerHTML实现js和html分离

###### 3.DOM操作——怎样添加、移除、移动、复制、创建和查找节点?

（1）创建新节点（只是创建没添加到文档中，添加还需要2中的方法）

       createDocumentFragment()    //创建一个DOM文档片段

       createElement()   //创建一个具体的元素

       createTextNode()   //创建一个文本节点

（2）添加、移除、替换、插入

       appendChild()--在已有的节点最后插入一个新的子节点，此方法传入一个文档中的一个已有元素，那么就是从这个元素的父节点移除它，再把它添加到指定的位置。

       replaceChild()

       insertBefore() //在已有的子节点前插入一个新的子节点，若此方法传入一个文档中的一个已有元素，那么就是从这个元素的父节点移除它，再把它添加到指定的位置。

       removeChild()

insertBefore()这个方法把一个新元素插入到一个现有元素的前面：
1.想插入的新元素(newElement)
2.新元素插入到哪个现有元素(targetElement)的前面
3.这两个元素共同的父元素(parentElement)
语法：
parentElement.insertBefore(newElement,targetElement);

**自己编写insertAfter方法**
```
function insertAfter(newElement,targetElement) {
    var parent = targetElement.parentNode;
    if( parent.lastChild == targetElement ) {
        parent.appendChild(newElement);
    } else {
        parent.insertBefore(newElement,targetElement.nextSibling);
    }
}
```
（3）查找

       getElementsByTagName()    //通过标签名称

       getElementsByName()    //通过元素的Name属性的值(IE容错能力较强，会得到一个数组，其中包括id等于name值的)

       getElementById()    //通过元素Id，唯一性

##### 24.DOM扩展?

1.选择器API

querySelector(),querySelectorAll(),matchesSelector()

2.元素遍历(上边讲过了)

3.HTML5 DOM扩展--支持的浏览器不全

 getElementByClassName()--一个可以包含一个或者多个类名的名字

 childList--操作类名的时候，需要通过className属性添加，删除和替换类名，可以操作类名

```
操作类名的原始方法
var classNames = div.className.split(/\s+/);

var pos = -1,
   len,
   i;

for(i = 0,len = classNames.length;i < len;i++) {
   if(classNames[i] == "user") {
       pos = i;
       break;
   }
}
classNames.splice(i,1);
div.className = classNames.join(" ");

有了classList之后可以直接用整个方法，classList有如下方法
div.classList.add(value);
div.classList.contains(value);
div.classList.remove(value);
div.classList.toggle(value);
```

##### 25.DOM2 级遍历?

DOM2 级遍历DOM结构的类型：NodeIterator和TreeWalker，两者都是深度优先的DOM结构遍历

###### 1.NodeIterator--较简单

使用document.createNodeIterator()方法创建NodeIterator的新实例，可以接收的4个参数，创建的NodeIterator的新实例中一个内部指针指向根节点

1.root  作为搜索起点的树中的节点

2.whatToShow  想访问那些树中的节点(NodeFilter.SHOW_ELEMENT,NodeFilter.SHOW_ALL,NodeFilter.SHOW_ATTRIBUTE等)

3.filter 是一个NodeFilter对象，或者一个表示应该接收还是拒绝某种特定节点的函数

4.entityReferenceExpansion 布尔值，表示是否要扩展实体引用

NodeIterator类型的两个主要方法:nextNode()，previousNode()

```
//讲解第三个参数filter，filter对象只是一个方法就是acceptNode()，若该访问此节点，则返回NodeFilter.FILTER_ACCEPT,否则返回NodeFilter.FILTER_SKIP

var filter = {
    acceptNode: function(node) {
        return node.tagName.toLowerCase() == "p" ?
               NodeFilter.FILTER_ACCEPT:
               NodeFilter.FILTER_SKIP;
    }
}
var iterator = document.createNodeIterator(document,NodeFilter.SHOW_ELEMENT,filter,false);
```

```
//下面讲解此遍历函数NodeIterator的使用
//HTML代码
<div id="div1">
    <p><b></b></p>
</div>

<ul>
    <li></li>
    <li></li>
    <li></li>
</ul>

//js代码遍历div下的所有元素节点
var div = document.getElementById("div1"),
    iterator = document.createNodeIterator(div,NodeFilter.SHOW_ELEMENT,null,false),----创建的NodeIterator的新实例中一个内部指针指向根节点div
    node = iterator.nextNode();

while(node != null) {
    alert(node.tagName);
    node = iterator.nextNode;
}

//输出 DIV P B UL LI LI LI

//若执行返回li标签
var filter = function(node) {
    return node.tagName.toLowerCase() == "li"?
           NodeFilter.FILTER_ACCEPT:
           NodeFilter.FILTER_SKIP;
}
var div = document.getElementById("div1"),
    iterator = document.createNodeIterator(div,NodeFilter.SHOW_ELEMENT,filter,false),----创建的NodeIterator的新实例中一个内部指针指向根节点div
    node = iterator.nextNode();

while(node != null) {
    alert(node.tagName);
    node = iterator.nextNode();
}
```
###### 2.TreeWalker--是NodeIterator的另一个更高级的版本

除了NodeIterator的nextNode()和previousNode()的功能外，还有其他方向上遍历DOM结构的方法

pareentNode(),firstChild(),lastChild(),nextSibling(),previousSibling()

使用document.createTreeWalker()方法创建TreeWalker的新实例，可以接收的4个参数(和NodeIterator一致)，创建的TreeWalker的新实例中一个内部指针指向根节点

1.root  作为搜索起点的树中的节点

2.whatToShow  想访问那些树中的节点(NodeFilter.SHOW_ELEMENT,NodeFilter.SHOW_ALL,NodeFilter.SHOW_ATTRIBUTE等)

3.filter 是一个NodeFilter对象，或者一个表示应该接收还是拒绝某种特定节点的函数---区别：这里返回值是NodeFilter.FILTER_ACCEPT,NodeFilter.FILTER_SKIP,NodeFilter.FILTER_REJECT;

NodeFilter.FILTER_SKIP----跳出相应节点继续前进到子树的下一个节点
NodeFilter.FILTER_REJECT--跳出相应的节点和节点的整个子树

4.entityReferenceExpansion 布尔值，表示是否要扩展实体引用

```
//下面讲解此遍历函数TreeWalker的使用
//HTML代码
<div id="div1">
    <p><b></b></p>
</div>

<ul>
    <li></li>
    <li></li>
    <li></li>
</ul>

//js代码遍历div下的所有元素节点
var div = document.getElementById("div1"),
    walker = document.createTreeWalker(div,NodeFilter.SHOW_ELEMENT,null,false;

walker.firstChild(); //转到<p>
walker.nextSibling();//转到<ul>

var node = walker.firstChild();//转到第一个<li>

while(node != null) {
    alert(node.tagName);
    node = walker.nextSibling();
}
```


##### 27."attribute" 和 "property" 的区别是什么？

Property：属性，property是DOM中的属性，是JavaScript里的对象  比如：element.id;

Attribute：特性，attribute是HTML标签上的特性，它的值只能够是字符串，通过类数组attributes可以罗列所有的attribute。 比如：element.getAttribute("id");或者element.attributes.

property能够从attribute中得到同步；attribute不会同步property上的值；attribute和property之间的数据绑定是单向的，attribute->property；更改property和attribute上的任意值，都会将更新反映到HTML页面中；

```
html代码
<input id="in_1" value="1" sth="whatever">
js代码
var in1 = document.getElementById('in_1');
in1.value = 'new value of prop';
console.log(in1.value);				// 'new value of prop'
console.log(in1.attributes.value);	// 'value="1"'-----attribute不会同步property上的值

in1.attributes.value.value = 'new value of attr';
console.log(in1.value);				// 'new value of attr'
console.log(in1.attributes.value);	// 'new value of attr'-----property能够从attribute中得到同步
```

http://www.codeceo.com/article/javascript-property-attribute.html

##### 28.事件流(事件冒泡和事件捕获)

**哪些事件冒泡**

支持冒泡事件：
click/dblclick/focusin/focusout/input/keydown/keyup/mousedown/mousemove/mouseout/mouseover/mouseup

不支持冒泡事件：
blur: 在元素失去焦点时触发，该事件不支持冒泡
focus: 在元素获得焦点时触发，该事件不支持冒泡
mouseenter: 当鼠标移入元素时触发，该事件不支持冒泡
mouseleave: 当鼠标移出元素时触发，该事件不支持冒泡
blur、focus、load、unload不支持
当你在需要的冒泡的时候，绑定了这些事件，而你恰好不知道居然还有事件天生就不支持冒泡的，那么你可能就悲剧了。

事件流描述的是从页面中接受事件的顺序。

事件冒泡机制：当一个元素接收到事件的时候，会把他接收到的所有事件传播给他的父级，一直到顶层window

事件捕获机制：当触发目标元素时，会从目标元素的最顶层的祖先元素事件往下执行到目标元素为止。

“DOM2级事件”规定的事件流的三个阶段：事件捕获阶段，处于目标阶段，事件冒泡阶段(无论是冒泡事件还是捕获事件，元素都会先执行捕获阶段 )

**事件捕获的坑**

1.坑一：新插入的子元素没有绑定点击事件

可能不少同学在初学js的时候遇到过这样一个坑。一个ul元素中初始的状态有4个li元素，我们可以循环给li元素添加click事件，执行我们想要的动作。这个例子的坑就在于，新添加的li元素不会有我们绑定的click事件。

其实就是用事件委托

```
<ul class="container">

    <!-- 先循环给原有的4个li绑定click事件 -->
    <li class="item"></li>
    <li class="item"></li>
    <li class="item"></li>
    <li class="item"></li>

    <!-- 这是新添加的li元素，但是该元素没绑定click事件 -->
    <li class="item new"></li>
</ul>

是的，就是这么坑，为了解决这个问题，我们就要利用事件捕获的原理。

$('ul.container').click(function(event) {
    var target = event.target;
    if (target.className == 'item') {
        // dosomething
    }
})
```

2.坑二： 如果目标元素有子元素，那么怎么办？

当我们在使用className判断目标元素时，会遇到这样的情况。
```
<li class="item">
    <div class="title">xxx</title>
    <p class="desc">xxxxxxs</p>
</li>
```
当我们试图使用事件委托希望给所有的li添加元素时，在利用className判断的过程中发现，目标event.target元素居然是li.item的子元素，这个时候就没办法准确的将事件绑定到li上了，这个时候我们应该怎么办？

这种情况，我们要做的，就是阻止事件捕获的传递，那么，要如何阻止呢？

我知道的一种方式，利用css，给li所有子元素添加如下css属性即可
```
li.item >  * {
  pointer-events: none;
}
```

**所有事件的顺序是**(注意本元素代码的顺序执行)

其他元素捕获阶段事件 -> 本元素代码顺序事件 -> 其他元素冒泡阶段事件 。

**关于事件，IE与火狐的事件机制有什么区别？**

IE是事件冒泡、firefox支持事件冒泡和事件捕获模型

**如何阻止事件冒泡？**

1、cancelBubble（HTML DOM Event 对象属性） ：如果事件句柄想阻止事件传播到包容对象，必须把该属性设为 true。
注意旧ie的方法：ev.cancelBubble = true;（IE）
2、stopPropagation（HTML DOM Event 对象方法）：（Firefox）终止事件在传播过程的捕获、目标处理或起泡阶段进一步传播。调用该方法后，该节点上处理该事件的处理程序将被调用，事件不再被分派到其他节点。
3、preventDefault（HTML DOM Event 对象方法）通知浏览器不要执行与事件关联的默认动作。

```
//根据情况分别取消DOM或者IE中事件冒泡
stopPropagation: function(event) {
    if (event.stopPropagation) {
        event.stopPropagation();
    } else {
        event.cancelBubble = true;
    }
}

把这个stopBubble(e)函数放到你想要的阻止事件冒泡函数里面就可以阻止事件冒泡了
```

**我们给一个dom同时绑定两个点击事件，一个用捕获，一个用冒泡。会执行几次事件，会先执行冒泡还是捕获？**

执行两次事件，同一个dom元素且这个是目标阶段的元素，按照事件的顺序执行事件----参数为false是冒泡，为true是捕获

```
<head>
  <title></title>
  <style type="text/css">
    #p { width: 300px; height: 300px; padding: 10px; border: 1px solid black; }
    #c { width: 200px; height: 200px; border: 1px solid red; }
    #sub { width: 100px; height: 100px; border: 1px solid red; }
  </style>
</head>
<body>
  <div id="p">
    parent
    <div id="c">
      child
    </div>
  </div>

  //点击子div，则输出父节点捕获，子节点捕获，子节点冒泡，父节点冒泡--看参数false则是事件冒泡，若是true，则是事件捕获
  <script type="text/javascript">
    window.alert = function (msg) {
      console.log(msg);
    };
    var p = document.getElementById('p'),
        c = document.getElementById('c');
    p.addEventListener('click', function (e) {
      alert('父节点冒泡')
    }, false);

    c.addEventListener('click', function (e) {
      alert('子节点捕获')
    }, true);
    c.addEventListener('click', function (e) {
      alert('子节点冒泡')
    }, false);
    p.addEventListener('click', function (e) {
      alert('父节点捕获')
    }, true);

    //点击子div，则输出父节点捕获，子节点冒泡，子节点捕获，父节点冒泡
    p.addEventListener('click', function (e) {
      alert('父节点冒泡')
    }, false);

    c.addEventListener('click', function (e) {
      alert('子节点冒泡')
    }, false);
    c.addEventListener('click', function (e) {
      alert('子节点捕获')
    }, true);

    p.addEventListener('click', function (e) {
      alert('父节点捕获')
    }, true);
  </script>
</body>
</html>
```

```
<div id='one'>
  <div id='two'>
    <div id='three'>
      <div id='four'>
      </div>
    </div>
  </div>
</div>

//可看参数全是事件冒泡事件，点击one元素，输出one；点击two元素，输出two one;点击three元素，输出 three two one；点击four元素，输出 four three two one；
<script type='text/javascript'>
  var one=document.getElementById('one');
  var two=document.getElementById('two');
  var three=document.getElementById('three');
  var four=document.getElementById('four');
  one.addEventListener('click',function(){
    alert('one');
  },false);
  two.addEventListener('click',function(){
    alert('two');
  },false);
  three.addEventListener('click',function(){
    alert('three');
  },false);
  four.addEventListener('click',function(){
    alert('four');
  },false);
</script>

//点击four元素,最终执行结果为：one three four two
one.addEventListener('click',function(){
alert('one');
},true);
two.addEventListener('click',function(){
alert('two');
},false);
three.addEventListener('click',function(){
alert('three');
},true);
four.addEventListener('click',function(){
alert('four');
},false);


//点击two执行结果：one(因为是two的父元素支持捕获事件所以先执行)  two,bubble  two,capture(顺序执行，注意逗号不是间隔，是输出内容。)
//如果目标元素不是two，则two的两个事件按先捕获后冒泡触发执行，点击three执行结果：one two,capture three,bubble two,bubble
one.addEventListener('click',function(){
alert('one');
},true);
two.addEventListener('click',function(){
alert('two,bubble');
},false);
two.addEventListener('click',function(){
alert('two,capture');
},true);
three.addEventListener('click',function(){
alert('three,bubble');
},true);
four.addEventListener('click',function(){
alert('four');
},true);
```

##### 29.事件处理程序(HTML事件处理程序，DOM0事件处理程序，DOM2事件处理程序，IE事件处理程序，跨浏览器事件处理程序)

相关问题：给元素绑定点击事件怎么绑定，有哪几种方法，区别是什么？
         dom0和dom2的区别

在以下几点进行对比和了解：
1.各种事件处理程序的添加和删除
2.在捕获阶段或者是冒泡阶段执行事件处理程序
3.是否可以添加多个事件处理程序

**HTML事件处理程序**

在html元素中加onclick等事件

**DOM0级事件处理程序**  

1.=null就是事件的删除

2.这种事件处理程序会在事件流的冒泡阶段被处理

3.DOM0级对每个事件只支持一个事件处理程序
```
// 添加事件处理程序
var btn = document.getElementById("myBtn");
btn.onclick = function() {
    alert(this.id); //"myBtn"
};
//删除事件处理程序
btn.onclick = null;
```

**DOM2级事件处理程序**

DOM2级方法添加事件处理程序主要好处是可以添加多个事件处理程序，并按照他们的顺序触发

```
var btn = document.getElementById("myBtn");

btn.addEventListener("click",function() {
    alert(this.id);
},false);
btn.addEventListener("click",function() {
    alert("Hello World!");
},false);
```

attention:通过addEventListener和removeEventListener来添加和删除事件处理程序，但是移除和添加处理程序的时候参数必须相同，这意味着addEventListener添加的匿名函数将无法移除

//错误的写法
```
var btn = document.getElementById("myBtn");

btn.addEventListener("click",function() {
    alert(this.id);
},false);

// 这个和addEventListener的函数完全不是同一个函数，匿名函数无法移除
btn.removeEventListener("click",function() {
    alert(this.id);
},false);
```
//正确的写法
```
var btn = document.getElementById("myBtn"),
    handler = function() {
        alert(this.id);
    };

btn.addEventListener("click",handler,false);

// 这样就删除掉了
btn.removeEventListener("click",handler,false);
```

**IE事件处理程序**

1.增加删除事件处理程序attachEvent()和detachEvent()

2.IE只支持冒泡，因此由attachEvent()添加的事件处理程序会被添加到冒泡阶段

3.attachEvent()方法也可以为一个元素添加多个事件处理程序

```
var btn = document.getElementById("myBtn");
btn.attachEvent("onclick",function(){
    alert("Clicked");
});
```

**跨浏览器事件处理程序**

```
var EventUtil = {
    //根据情况分别使用dom2 || IE || dom0方式 来添加事件
    addHandler:function(element,type,handler) {
        if(element.addEventListener) {
            element.addEventListener(type,handler,false);
        } else if(element.attachEvent) {
            element.attachEvent("on" + type,handler);
        } else {
            element["on" + type] = handler;
        }
    },
    //根据情况分别使用dom2 || IE || dom0方式 来删除事件
    removeHandler:function(element,type,handler){
        if(element.removeHandler) {
            element.removeEventListener(type,handler,false);
        } else if(element.detachEvent) {
            element.detachEvent("on" + type,handler);
        } else {
            element["on" + type] = null;
        }
    }
}

var btn = document.getElementById("myBtn"),
    handler = function () {
        alert("Clicked");
    };

EventUtil.addHandler(btn,"click",handler);
EventUtil.removeHandler(btn,"click",handler);
```
##### 30.事件对象

触发DOM上的某个对象时，会产生一个事件对象event

**DOM0级事件对象**

无论指定事件处理程序时使用什么方法(DOM0级和DOM2级)，都传入event对象

阻止特定事件的默认行为，就是使用preventDefault();

阻止进一步事件的事件捕获或冒泡，就是使用stopPropagation()

**IE中的事件对象**

目标：srcElement

阻止特定事件的默认行为，就是使用returnValue

阻止进一步事件的事件捕获或冒泡，就是使用cancelBubble

**跨浏览器的事件对象**

```
var EventUtil = {

    //根据情况分别获取DOM或者IE中的事件对象，事件目标，阻止事件的默认行为
    getEvent: function(event) {
        return event ? event : window.event;
    },
    getTarget: function(event) {
        return event.target || event.srcElement;
    },
    preventDefault: function(event) {
        if(event.preventDefault) {
            event.preventDefault();
        } else {
            event.returnValue = false;
        }
    },

    //根据情况分别取消DOM或者IE中事件冒泡
    stopPropagation: function(event) {
        if (event.stopPropagation) {
            event.stopPropagation();
        } else {
            event.cancelBubble = true;
        }
    }
}

var btn = document.getElementById("myBtn");

btn.onclick = function(event) {
    event = EventUtil.getEvent(event);
    var target = EventUtil.getTarget(event);
    EventUtil.preventDefault(event);
    EventUtil.stopPropagation(event);
}
```

##### 31.写一个通用的事件侦听器函数(机试题)。

```
var EventUtil = {
    //根据情况分别使用dom2 || IE || dom0方式 来添加事件
    addHandler: function(element,type,handler) {
        if(element.addEventListener) {
            element.addEventListener(type,handler,false);
        } else if(element.attachEvent) {
            element.attachEvent("on" + type,handler);
        } else {
            element["on" + type] = handler;
        }
    },

    //根据情况分别获取DOM或者IE中的事件对象，事件目标，阻止事件的默认行为
    getEvent: function(event) {
        return event ? event: window.event;
    },
    getTarget: function(event) {
        return event.target || event.srcElement;
    },
    preventDefault: function(event) {
        if(event.preventDefault) {
            event.preventDefault();
        } else {
            event.returnValue = false;
        }
    }

    //根据情况分别使用dom2 || IE || dom0方式 来删除事件
    removeHandler: function(element,type,handler){
        if(element.removeHandler) {
            element.removeEventListener(type,handler,false);
        } else if(element.detachEvent) {
            element.detachEvent("on" + type,handler);
        } else {
            element["on" + type] = null;
        }
    }

    //根据情况分别取消DOM或者IE中事件冒泡
    stopPropagation: function(event) {
        if (event.stopPropagation) {
            event.stopPropagation();
        } else {
            event.cancelBubble = true;
        }
    }

    //键盘事件的相关跨浏览器解决方法
    //触发keypress的时候，charCode会包含按下的键的ASCII编码，IE8之前版本和Opera则是keyCode中保存字符的ASCII编码,所以得到字符编码的方法如下
    getCharCode: function(event) {
        if(typeof event.charCode == "number") {
            return event.charCode;
        } else {
            return event.keyCode;
        }
    }
    getClipboardText: function(event) {
        var clipboardData = (event.clipboardData || window.clipboardData);
        return clipboardData.getData("text");
    },

    setClipboardText: function(event,value) {
        if (event.clipboardData) {
            return event.clipboardData.setData("text/plain",value);
        } else if (window.clipboardData) {
            return window.clipboardData.setData("text",value);
        }
    },

    //鼠标按钮的相关事件
    //event对象的relatedTarget属性提供了相关元素的信息，整个属性只对于mouseover和mouseout事件才有包含值，对于其他时间，整个属性值是null
    //ie8及之前不支持relatedElement，mouseover触发时IE中的fromElement保存了相关元素，mouseout触发时IE中toElement属性保存着相关元素
    getRelatedTarget: function(event) {
        if (event.relatedTarget) {
            return event.relatedTarget;
        } else if (event.toElement) {
            return event.toElement;
        } else if (event.fromElement) {
            return event.fromElement;
        } else {
            return null;
        }
    },
    //一个取得鼠标滚轮增值量
    //opra9.5之前的版本，wheelDelta正负号是颠覆的，是120倍数；firefox触发类似事件，鼠标滚动信息保存在detail事件中，向前滚动鼠标滚轮时，属性是-3倍数
    getWheelDelta: function(event) {
        if (event.wheelDelta) {
            return (client.engine.opera && client.engine.opera < 9.5) ? -event.wheelDelta : event.wheelDelta;
        } else {
            return -event.detail * 40;
        }
    }
}

var btn = document.getElementById("myBtn"),
    handler = function () {
        alert("Clicked");
    };

EventUtil.addHandler(btn,"click",handler);
EventUtil.removeHandler(btn,"click",handler);
```
##### 32.事件类型

**鼠标与滚轮事件**

mousedown,mouseup,click,dblclick,mouseenter,mouseleave,mousemove,mouseout,mouseover

双击触发事件的顺序
(1)mousedown
(2)mouseup
(3)click
(4)mouseout
(5)mouseover
(6)click
(7)dblclick

鼠标事件涉及的一些属性(clientX,clientY,pageX,pageY,screenX,scrennY)：

客户区坐标位置(clientX,clientY)---浏览器视口中的特定位置，也就是不包含页面滚动的距离
页面坐标位置(pageX,pageY)---页面本身而非视口的左边和顶边计算的
屏幕坐标位置(screenX,screenY)---鼠标相对于整个电脑屏幕的位置
```
//ie8以及更早版本不支持事件对象上的页面坐标pageX和pageY，不过可以使用客户区和滚动信息计算出来
//另外混杂模式用document.body,标准模式用document.documentElement

var div = document.getElementById("myDiv");

EventUtil.addHandler(div,"click",function(event) {
    event = EventUtil.getEvent(event);
    var pageX = event.pageX,
        pageY = event.pageY;

    if(pageX == undefined) {
        pageX = event.clientX + (document.body.scrollLeft || document.documentElement.scrollLeft);
    }
    if(pageY == undefined) {
        pageY = event.clientY + (document.body.scrollTop || document.documentElement.scrollTop);
    }
};
```

mouseout,mouseover两个事件有属性relatedTarget
```
//event对象的relatedTarget属性提供了相关元素的信息，整个属性只对于mouseover和mouseout事件才有包含值，对于其他时间，整个属性值是null
//ie8及之前不支持relatedElement，mouseover触发时IE中的fromElement保存了相关元素，mouseout触发时IE中toElement属性保存着相关元素
getRelatedTarget: function(event) {
    if (event.relatedTarget) {
        return event.relatedTarget;
    } else if (event.toElement) {
        return event.toElement;
    } else if (event.fromElement) {
        return event.fromElement;
    } else {
        return null;
    }
}
```
```
//一个取得鼠标滚轮增值量
//opra9.5之前的版本，wheelDelta正负号是颠覆的，是120倍数；firefox触发类似事件，鼠标滚动信息保存在detail事件中，向前滚动鼠标滚轮时，属性是-3倍数
getWheelDelta: function(event) {
    if (event.wheelDelta) {
        return (client.engine.opera && client.engine.opera < 9.5) ? -event.wheelDelta : event.wheelDelta;
    } else {
        return -event.detail * 40;
    }
}
```

**键盘事件**

keydown：用户按下任意键时触发
keypress：用户按下字符键时触发
keyup：用户释放键盘上的键时触发

```
var EventUtil = {
    //触发keypress的时候，charCode会包含按下的键的ASCII编码，IE8之前版本和Opera则是keyCode中保存字符的ASCII编码,所以得到字符编码的方法如下
    getCharCode: function(event) {
        if(typeof event.charCode == "number") {
            return event.charCode;
        } else {
            return event.keyCode;
        }
    }
};
```

**onload事件**

网页加载完成触发onload事件，所以我们可以利用onload事件来网页加载完毕之后就立即执行的函数。

把myfunction函数绑定到这个事件上：
```
window.onload = myFunction();
```

若需要加载页面完成之后执行多个函数
```
//方法一,执行两个函数
window.onload = function() {
    myFunction1();
    myFunction2();
}

//这样会覆盖，只执行第二个函数myFunction2
window.onload = myFunction1();
window.onload = myFunction2();
```

但是其实还存在一个最佳的解决方案——不管你打算在页面加载完毕后要执行多少个函数，利用该函数都可以轻松的实现。
```
/*addLoadEvent函数主要是完成如下的操作：
           1、把现有的window.onload事件处理函数的值存入到oldonload中。
           2、如果在这个处理函数上还没有绑定任何函数，就将该函数添加给它。
           3、如果在这个处理函数上已经绑定了一些函数，就把该函数追加到现有指定的末尾。
*/
function addLoadEvent(func){  
   var oldonLoad = window.onload;  
   if(typeof window.onload!='function'){  
        window.onload = func;  
   }  
   else{  
       window.onload = function(){  
       oldonload();  
       func();  
       }  
   }  
}  

addLoadEvent(myFunction1);
addLoadEvent(myFunction2);
```

##### 33.js是单线程的？什么是同步异步？什么同步异步函数？什么是异步过程？什么是消息队列和事件循环 (event loop)？

事件循环是js的运行机制

**js是单线程**

JavaScript的单线程，与它的用途有关。作为浏览器脚本语言，JavaScript的主要用途是与用户互动，以及操作DOM。这决定了它只能是单线程，否则会带来很复杂的同步问题。比如，假定JavaScript同时有两个线程，一个线程在某个DOM节点上添加内容，另一个线程删除了这个节点，这时浏览器应该以哪个线程为准？

为了利用多核CPU的计算能力，HTML5提出Web Worker标准，允许JavaScript脚本创建多个线程，但是子线程完全受主线程控制，且不得操作DOM。所以，这个新标准并没有改变JavaScript单线程的本质。

**同步和异步区别**

同步：浏览器访问服务器请求，用户看得到页面刷新，重新发请求,等请求完，页面刷新，新内容出现，用户看到新内容,js进行下一步操作。

异步：浏览器访问服务器请求，用户正常操作，浏览器后端进行请求。等请求完，页面不刷新，新内容也会出现，用户看到新内容。

**同步函数和异步函数区别**

假设存在一个函数A：A(args...);

同步函数：如果在函数A返回的时候，调用者就能够得到预期结果(即拿到了预期的返回值或者看到了预期的效果)，那么这个函数就是同步的。

异步函数：如果在函数A返回的时候，调用者还不能够得到预期结果，而是需要在将来通过一定的手段得到，那么这个函数就是异步的。

**异步过程**

主线程发起一个异步请求，相应的工作线程接收请求并告知主线程已收到(异步函数返回)；主线程可以继续执行后面的代码，同时工作线程执行异步任务；工作线程完成工作后，通知主线程；主线程收到通知后，执行一定的动作(调用回调函数)。

异步函数通常具有以下的形式：
A(args..., callbackFn)

从主线程的角度看，一个异步过程包括下面两个要素：发起函数(或叫注册函数)A和回调函数callbackFn；它们都是在主线程上调用的，其中注册函数用来发起异步过程，回调函数用来处理结果。

eg：setTimeout(fn, 1000);其中的setTimeout就是异步过程的发起函数，fn是回调函数。

**消息队列和事件循环**

异步过程中，工作线程在异步操作完成后需要通知主线程。那么这个通知机制是怎样实现的呢？答案是利用消息队列和事件循环。

消息队列：工作线程将消息放到消息队列，消息队列是一个先进先出的队列，它里面存放着各种消息。

事件循环：主线程通过事件循环过程去取消息（消息队列中的每条消息实际上都对应着一个事件。），事件循环是指主线程重复从消息队列中取消息、执行的过程。实际上，主线程只会做一件事情，就是从消息队列里面取消息、执行消息，再取消息、再执行。当消息队列为空时，就会等待直到消息队列变成非空。而且主线程只有在将当前的消息执行完成后，才会去取下一个消息。这种机制就叫做事件循环机制，取一个消息并执行的过程叫做一次循环。

**异步函数，回调函数，setTimeOut**

```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title></title>
</head>
<body>

    <script>
        alert(1);
        setTimeout("alert(2)", 0);
        alert(3);
    </script>
</body>
</html>
```
打印出来是1 3 2

js引擎是基本事件驱动单线程执行的，它的执行顺序是遵循一个叫做事件队列的机制。有一个主线程，但有很多工作线程。
js引擎处理到与其他线程相关的代码,就会分发给其他工作线程，这里比如就是遇到了settimeout(0)，就开启了定时器线程，主线程继续执行下边的代码。
工作线程处理完之后，事件队列种会增加一个任务。
主线程执行完下边的代码，空闲后从事件队列种取消息执行，取消息执行。所以settimeout(0)里面的操作会放在所有主线程任务之后

##### 34.请解释事件代理 (event delegation)or事件委托。

事件委托和移除事件处理程序都是考虑到了----内存和性能。

事件委托技术是建立在事件冒泡机制之上的。

**引出事件代理的原因**

对于“事件处理程序过多”问题的解决方案就是事件代理或者说事事件委托。
在传统的事件处理中，你按照需要为每一个元素添加或者是删除事件处理器。然而，事件处理器将有可能导致内存泄露或者是性能下降——你用得越多这种风险就越大。如下：

以下就是利用了事件捕获和事件委托
```
<ul id="parent-list">
  <li id="post-1">Item 1</li>
  <li id="post-2">Item 2</li>
  <li id="post-3">Item 3</li>
  <li id="post-4">Item 4</li>
  <li id="post-5">Item 5</li>
  <li id="post-6">Item 6</li>
</ul>

//给每个li标签都添加了事件，这样可能导致内存泄漏
window.onload = function(){
    var ulNode = document.getElementById("parent-list");
    var liNodes = ulNode.getElementByTagName("Li");
    for(var i=0, l = liNodes.length; i < l; i++){
        EventUtil.addHandler(liNodes[i],"click",function(event) {

        });
    }   
}
```

**事件代理**

优点：

1.管理的函数变少了。可以把事件处理器添加到一个父级元素上，这样就避免了把事件处理器添加到多个子级元素上。(这样可以得益于事件冒泡)创建的以及驻留在内存中的事件处理器少了，这样我们就提高了性能，并降低了崩溃的风险。

2.可以方便地动态添加和修改元素，不需要因为元素的改动而修改事件绑定。

```
<ul id="parent-list">
  <li id="post-1">Item 1</li>
  <li id="post-2">Item 2</li>
  <li id="post-3">Item 3</li>
  <li id="post-4">Item 4</li>
  <li id="post-5">Item 5</li>
  <li id="post-6">Item 6</li>
</ul>

window.onload = function() {
    var ulNode = document.getElementById("parent-list");

    EventUtil.addHandler(ulNode,"click",function(event) {
        event = EventUtil.getEvent(event);
        var target = EventUtil.getTarget(event);

        // 检查事件源e.targe是否为Li
        if(target && target.nodeName.toUpperCase() === "LI") {
            console.log("List item ",target.id.replace("post-")," was clicked!");
        }
    });

}
```

##### 35.表单字段，表单字段属性、方法、和事件

取得所有的表单：document.forms

取得表单的所有字段：form.elements--比如<input><textarea><button><fieldset>

共有的表单字段属性：type value name form disabled readOnly

共有的表单字段方法：focus() blur()

共有的表单字段事件：onfocus onblur onchange

**js防止form表单重复提交**

1.第一个提交表单后禁用提交按钮
```
//要用submit事件来禁用按钮，不要用click，因为click和submit在不同浏览器的出发先后顺序不同，有的浏览器先出发click，后出发submit，则谁提交之前禁用按钮
var form = document.getElementById("myForm");

EventUtil.addHandler(form,"submit",function(event) {
    event = EventUtil.getEvent(event);
    var target = EventUtil.getTarget(event);
    //取得提交按钮
    var btn = target.elements["submit-btn"];
    //禁用他
    btn.disabled = true;
});
```
2.用一个全局变量控制


**加载完页面之后自动聚焦**

共有的表单字段方法：focus() blur()

```
EventUtil.addHandler(window,"load",function() {
    document.forms[0].elements[0].focus();
});
```

**某字段聚焦之后，失去焦点为空，改变内容为空时则变色等**
共有的表单字段事件：onfocus onblur onchange

```
var textbox = document.forms[0].elements[0];

EventUtil.addHandler(textbox,"focus",function(event){
    event = EventUtil.getEvent(event);
    var target = EventUtil.getTarget(event);

    if(target.style.backgroundColor != "red") {
        target.style.backgroundColor = "yellow";
    }
});
EventUtil.addHandler(textbox,"blur",function(event){
    event = EventUtil.getEvent(event);
    var target = EventUtil.getTarget(event);

    if(/[^\d]/.test(target.value)) {
        target.style.backgroundColor = "red";
    } else {
        target.style.backgroundColor = "";
    }
});
EventUtil.addHandler(textbox,"focus",function(event){
    event = EventUtil.getEvent(event);
    var target = EventUtil.getTarget(event);

    if(/[^\d]/.test(target.value)) {
        target.style.backgroundColor = "red";
    } else {
        target.style.backgroundColor = "";
    }

});
```

##### 36.文本框脚本

输入文本框输入文本的常用到keydown，keypress，keyup，textInput事件

keydown：用户按下任意键时触发
keypress：用户按下字符键时触发
keyup：用户释放键盘上的键时触发

```
var EventUtil = {
    //触发keypress的时候，charCode会包含按下的键的ASCII编码，IE8之前版本和Opera则是keyCode中保存字符的ASCII编码,所以得到字符编码的方法如下
    getCharCode: function(event) {
        if(typeof event.charCode == "number") {
            return event.charCode;
        } else {
            return event.keyCode;
        }
    }
};
```

<input>和<textarea>两种方式表现文本框--input是单行文本框，textarea是多行文本框

<input>--属性(value,size,maxLength)
value设置文本框的初始值;size指定文本框中能够显示的字符数;maxLength特性则用于指定文本框可以接受的最大字符数

<textarea>--属性(rows,cols)

**选择文本**

**过滤输入**

1.屏蔽字符

```
//1.屏蔽不是数值的字符
//2.因为有些浏览器按下非字符的话，也可能会触发keypress事件，避免屏蔽极为常用和必要的键，不同浏览器非字符串触发的keypress事件对应的字符编码都小于10
//3.复制，粘粘，等操作会用到ctrl或者ctrl的组合键，所以就是要检测用户是否按下ctrl键
EventUtil.addHandler(tele,"keypress",function(event) {
    event = EventUtil.getEvent(event);
    var target = EventUtil.getTarget(event);
    var charCode = EventUtil.getCharCode(event);

    if(!/\d/.test(String.fromCharCode(charCode))  && charCode > 9 && !event.ctrlKey) {
        EventUtil.preventDefault(event);
    }

});
```

```
//完整代码
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>test</title>

</head>
<body>
    <form id="myForm">
        <input id="tel" type="text" maxlength="50">
    </form>
    <script type="text/javascript">
        var EventUtil = {
            addHandler: function(element,type,handler) {
                if (element.addEventListener) {
                    element.addEventListener(type,handler,false);
                } else if (element.attachEvent) {
                    element.attachEvent("on" + type,handler);
                } else {
                    element["on" + type] = handler;
                }
            },

            getEvent: function(event) {
                return event ? event : window.event;
            },
            getTarget: function(event) {
                return event.target || event.srcElement;
            },
            preventDefault:function(event) {
                if(event.preventDefault) {
                    event.preventDefault();
                } else {
                    event.returnValue = false;
                }
            },

            getCharCode: function(event) {
                if(typeof event.charCode == "number") {
                    return event.charCode;
                } else {
                    return event.keyCode;
                }
            }
        };

        var tele = document.getElementById("tel");
        EventUtil.addHandler(tele,"keypress",function(event) {
            event = EventUtil.getEvent(event);
            var target = EventUtil.getTarget(event);
            var charCode = EventUtil.getCharCode(event);

            if(!/\d/.test(String.fromCharCode(charCode))  && charCode > 9 && !event.ctrlKey) {
                EventUtil.preventDefault(event);
            }

        });
    </script>
</body>
</html>

```

2.操作剪贴板

```
var EventUtil = {
    getClipboardText: function(event) {
        var clipboardData = (event.clipboardData || window.clipboardData);
        return clipboardData.getData("text");
    },

    setClipboardText: function(event,value) {
        if (event.clipboardData) {
            return event.clipboardData.setData("text/plain",value);
        } else if (window.clipboardData) {
            return window.clipboardData.setData("text",value);
        }
    }
};

EventUtil.addHandler(textbox,"paste",function(event) {
    event = EventUtil.getEvent(event);
    var text = EventUtil.getClipboardText(event);

    if(!/^\d*$/.test(text)) {
        EventUtil.preventDefault(event);
    }
});
```

**自动切换焦点**

在前一个文本框中的字符数达到最大数量的时候，自动将焦点切换到下一个文本框

```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>test</title>

</head>
<body>
    <form id="myForm">
        <input name="tel1" type="text" maxlength="3" class="tel">
        <input name="tel2" type="text" maxlength="4" class="tel">
        <input name="tel3" type="text" maxlength="5" class="tel">
    </form>
    <script type="text/javascript">
        var EventUtil = {
            addHandler: function(element,type,handler) {
                if (element.addEventListener) {
                    element.addEventListener(type,handler,false);
                } else if (element.attachEvent) {
                    element.attachEvent("on" + type,handler);
                } else {
                    element["on" + type] = handler;
                }
            },

            getEvent: function(event) {
                return event ? event : window.event;
            },
            getTarget: function(event) {
                return event.target || event.srcElement;
            },
            preventDefault:function(event) {
                if(event.preventDefault) {
                    event.preventDefault();
                } else {
                    event.returnValue = false;
                }
            }
        };

        function tabForward(event) {
            event = EventUtil.getEvent(event);
            var target = EventUtil.getTarget(event);

            //检测到目标元素且目标还有下一个元素的时候，则focus在下一个元素
            if(target && target.nodeName.toUpperCase() === "INPUT") {
                if(target.value.length == target.maxLength) {
                    console.log("tab");
                    var form = target.form;

                    for(var i = 0 ,len = form.length;i < len;i++) {
                        if(form.elements[i] == target) {
                            if(form.elements[i+1]) {
                                form.elements[i+1].focus();
                            }
                            return;
                        }
                    }
                }
            }
        }

        // 用事件代理，减少事件的绑定，减少内存的占用
        var form = document.getElementById('myForm');
        EventUtil.addHandler(form,"keyup",tabForward);
    </script>
</body>
</html>
```
**HTML5约束验证API**

##### 37.选择框脚本

选择框由<select>和<option>元素创建

除了所有表单字段的所有属性和方法type,name,value,form,disabled,readOnly,focus(),blur()

**HTMLSelectElement类型还有这些属性和方法**

options,add(newOption,relOption),remove(index),selectedIndex,multiple--是否允许多项选择

**HTMLOptionElement类型还有这些属性和方法**

text,value,index,selected,label

**选择选项**

```
//只有一个选中项方法
var selectbox = document.getElementById("selectExam"),
    selectIndex = selectbox.selectedIndex,
    selectedOption = selectbox.options[selectIndex];

alert(selectedIndex + selectedOption.text + selectedOption.value);
```

```

//一个或者多个选中项，取得所有选中项的值

function getSelectedOptions(selectbox) {

    var result = new Array(),
        option = null;

    for(var i = 0,len = selectbox.length;i < len;i++) {
        option = selectbox.options[i];
        if(option.selected) {
            result.push(option);
        }
    }

    return result;
}

var selectbox = document.getElementById("selectExam"),
    selectedOptions = getSelectedOptions(selectbox),
    message = "";

for(var i = 0,len = selectedOptions.length;i < len;i++) {
    message += selectedIndex + selectedOption.text + selectedOption.value;
}
alert(message);
```

```
//一个敲击之后的实例
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>test</title>

</head>
<body>
    <form id="myForm">

        <select id="selectExam">
            <option value="1">a</option>
            <option value="2">b</option>
            <option value="3">c</option>
        </select>
    </form>
    <script type="text/javascript">
        var EventUtil = {
            addHandler:function(element,type,handler) {
                if(element.addEventListener) {
                    element.addEventListener(type,handler,false);
                } else if(element.attachEvent) {
                    element.attachEvent("on" + type,handler);
                } else {
                    element["on" + type] = handler;
                }
            }
        };

        function getSelectedOptions() {
            var result = new Array(),
                option = null,
                message = "";

            var selectbox = document.getElementById("selectExam");

            for(var i = 0,len = selectbox.length;i < len;i++) {

                option = selectbox.options[i];
                console.log(option.text);
                if(option.selected) {
                    result.push(option);
                }
            }

            for(var i = 0,len = result.length;i < len;i++) {
                message += result[i].index + result[i].text + result[i].value;
            }

            alert(message);
        }

        var selectbox = document.getElementById("selectExam");
        EventUtil.addHandler(selectbox,"change",getSelectedOptions);
    </script>
</body>
</html>
```

**添加选项**

以下三种方法，都是添加新选项到最后一个，若不是添加到最后一个，就应该用DOM技术和insertBefore()

方法一：使用DOM方法
```
var newOption = document.createElement("option");
newOption.appendChild(document.createTextNode("Option text"));
newOption.setAttribute("value","Option value");

selectbox.appendChild(newOption);
```

方法二：使用Option构造函数--构造函数接收参数text和value
```
var newOption = new Option("Option text","Option value");
selectbox.appendChild(newOption);
```

方法三：使用选择框的add方法
```
var newOption = new Option("Option text","Option value");
selectbox.add(newOption,undefined);
```

**移除选项**

方法一：使用DOM方法
```
selectbox.removeChild(selectbox.options[0]);
```

方法二：使用DOM浏览器

```
selectbox.options[0] = null;
```

方法三：使用选择框的remove方法
```
selectbox.remove(0);
```

```
function clearSelectbox(selectbox) {
    for(var i = 0,len = selectbox.length;i < len;i++) {
        selectbox.remove(i);
    }
}
```
**移动和重排选项**

```
var select1 = document.getElementById("selectExam"),
    select2 = document.getElementById("selectExam2");

select2.appendChild(select1.options[0]);
```

```
//选择框向前移动一个选项的位置
var optionToMove = selectbox.options[1];
selectbox.insertBefore(optionToMove,selectbox.options[optionToMove.index-1]);
```

##### 38.BOM

**window对象**

BOM就是浏览器窗口对象模型，顶级对象就是window，window对象表示浏览器中一个打开的窗口，也就是窗体，所有的全局对象和函数都属于window对象的属性和方法。

1.窗口位置window.screenLeft,window.screenTop：

IE,safari,chrome,opera用screenLeft和screenTop分别表示窗口相对于屏幕左边和屏幕上边的位置
firefox用screenX和screenY分别表示窗口相对于屏幕左边和屏幕上边的位置
```
//跨浏览器
var leftPos = (typeof window.screenLeft == "number") ? window.screenLeft : window.screenX,
    topPos = (typeof window.screenTop == "number") > window.screenTop : window.screenY;
```

2.窗口大小window.innerWidth,window.innerHeight,window.outerWidth,window.outerHeight

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

3.导航和打开窗口

open() 方法用于打开一个新的浏览器窗口或查找一个已命名的窗口。
window.open(URL,name,features,replace)

name：第二个参数是创建一个新窗口的名字，也可以是任何一个特殊的窗口名称：(self, parent, top, blank)

4.alert()、confirm()和prompt()警告-确认-提示框

http://blog.csdn.net/sjf0115/article/details/7578722

**location对象**

可用来在浏览器窗口中载入一个新网址:window.location

**navigator对象**

**screen对象**

screen对象是js中用处不大的对象之一。可以包含浏览器窗口外部的显示器的信息。
screen.height screent.width

**history对象**

history对象保存了用户上网的历史激励吗，从窗口被打开的那一刻算起。
```
history.go(-1);//后退一页
history.go(1);//前进一页
history.go("wrox.com");//跳转到最近的wrox.com那个界面
history.back();
history.forward();
```
##### 39.如何进行客户端检测？检测浏览器版本版本有哪些方式？

**客户端检测**--客户端检测的三种方法：能力检测，怪癖检测，用户代理检测。

浏览器普遍存在的不一致性问题，用各种客户端检测方法，来突破或者规避种种局限性。但是，只要能找到更通用的方法，就应该采用。不到万不得已，不要使用客户端检测。


**能力检测**--人们广泛接受的客户端检测形式就是能力检测

不是识别特定的浏览器，是识别浏览器的能力。

1.先检测达成目的最常用的特性，可以保证代码最优 2.测试实际要用到的特性，而不是测试这个用那个

```
// 基本模式
if (object.propertyInQuestion) {
    // 使用object.propertyInQuestion
}
// IE5.0前不支持document.getElementById()
function getElement(id) {
    if(document.getElementById) {
        return document.getElementById(id);
    } else if(document.all) {
        return document.all[id];
    } else {
        throw new Error("No way to retrieve element!");
    }
}
```

**怪癖检测**

怪癖检测是识别浏览器的特殊行为，也就是不是看浏览器的能力而是看浏览器存在的缺陷。

**用户代理检测**

用户代理检测通过检测用户代理字符串来确定实际使用的浏览器。这个字符串可以通过navigator.userAgent来访问

引擎和浏览器考虑顺序：opera--webkit(chrome和safari)--khtml--gecko(firefox)--ie
```
var client = function(){  

    var engine = {  

        //呈现引擎  
        ie : 0,  
        gecko : 0,  
        webkit : 0,  
        khtml : 0,  
        opera : 0,  

        //完整的版本号
        ver : null  
    }; 
 
    //浏览器  
    var browser = {  

        //主要浏览器  
        ie : 0,  
        firefox : 0,  
        konq : 0,  
        opera : 0,  
        chrome : 0,  
        safari : 0,  

        //具体的版本号  
        ver : null  
    };  

    //平台、设备和操作系统
    var system = {  
        win : false,  
        mac : false,  
        x11 : false,  //unix系统

        //移动设备  
        iphone : false,  
        ipod : false,  
        nokiaN  : false,  
        winMobile : false,  
        macMobile : false,  

        //游戏系统  
        wii : false,  
        ps　:false  
    };  
      
      
    //检测呈现引擎和浏览器  
    var ua  = navigator.userAgent; 

    //第一位检测到的是opera，opera的用户代理字符串不会将自己标识为opera，所以优先考虑opera
    if(window.opera){  
        engine.ver = browser.ver = window.opera.version();  
        engine.opera = browser.opera = parseFloat(engine.ver);  
    }
    //第二位考虑的引擎是webkit，因为webkit的用户代理字符串中包含Gecko和KHTML字符串
    else if(/AppleWebKit\/(\S+)/.test(ua)){  
        //RegExp["$1"]是第一个子匹配
        engine.ver = RegExp["$1"];  
        engine.webkit = parseFloat(engine.ver);  

        //确定是chrome还是safari
        if(/Chrome\/(\S+)/.test(ua)){  
            browser.ver = RegExp["$1"];  
            browser.chrome = parseFloat(browser.ver);  
        }else if(/Version\/(\S+)/.test(ua)){  
            browser.ver = RegExp["$1"];  
            browser.safari = parseFloat(browser.ver);  
        }else{  
            var safariVersion = 1;  
            if(engine.webkit < 100){  
                safariVersion = 1;  
            }else if(engine.webkit < 312){  
                safariVersion = 1.2;  
            }else if(engine.webkit < 412){  
                safariVersion = 1.3;  
            }else{  
                safariVersion = 2;  
            }  
            browser.safari = browser.ver = safariVersion;  
        }  
    }

    //第三位考虑的是KHTML，因为ktml的用户代理字符串中也包含“Gecko”
    else if(/KHTML\/(\S+)/.test(ua) || /Konqueror\/([^;]+)/.test(ua)){  
        engine.ver = browser.ver = RegExp["$1"];  
        engine.khtml = parseFloat(engine.ver);  
    }

    //第四位考虑的是Gecko，([^\)]+)这个是表示是除了)开头的其他字符
    else if(/rv:([^\)]+)\) Gecko\/\d{8}/.test(ua)){  
        engine.ver = browser.ver = RegExp["$1"];  
        engine.gecko = parseFloat(engine.ver);  
          
        //确定是不是Firefox，检测firefox也是先找到firefox这个关键字
        if(/Firefox\/(\S+)/.test(ua)){  
            browser.ver = RegExp["$1"];  
            browser.firefox = parseFloat(browser.ver);  
        }  
    }

    //第五位考虑的是ie
    else if(/MSIE ([^;]+)/.test(ua)){  
        engine.ver = browser.ver = RegExp["$1"];  
        engine.ie = browser.ie = parseFloat(browser.ver);  
    }  

    //检测浏览器
    browser.ie = engine.ie;  
    browser.opera = engine.opera;  
      
    //检测平台        
    var p = navigator.platform;  
    system.win = p.indexOf("Win") == 0;  
    system.mac = p.indexOf("Mac") == 0;  
    system.x11 = (p == "x11") || (p.indexOf("Linux") == 0);  
      
    //检测windows操作系统
    if(system.win){  
        if(/Win(?:dows )?([^do]{2})\s?(\d+\.\d+)?/.test(ua)){  
            if(RegExp["$1"] == "NT"){  
                switch(RegExp["$2"]){  
                    case "5.0" :   
                        system.win = "2000";  
                        break;  
                    case "5.1" :  
                        system.win = "XP";  
                        break;  
                    case "6.0" :   
                        system.win = "Vista";  
                        break;  
                    default :  
                        system.win = "NT";  
                        break;                            
                }  
            }else if(RegExp["$1"] == "9x"){  
                system.win = "ME";  
            }else{  
                system.win = RegExp["$1"];  
            }  
        }  
    }  

    //移动设备
    system.iphone = ua.indexOf("iPhone") > -1;  
    system.ipod = ua.indexOf("iPod") > -1;  
    system.ipad = ua.indexOf("iPad") > -1;  
    system.nokiaN = ua.indexOf("nokiaN") > -1;  

    //windows mobile
    if(system.win == "CE") {
        system.winMobile = system.win;
    } else if (system.win == "Ph") {
        if(/Windows Phone OS (\d+.\d+)/.test(ua)) {
            ;
            system.win = "Phone";
            system.winMobile = parseFloat(RegExp["$1"]);
        }
    }

    //检测ios版本
    if (system.mac && ua.indexOf("Mobile") > -1) {
        if(/CPU (?:iphone)?OS (\d+_\d+)/.test(ua)) {
            system.ios = parseFloat(RegExp.$1.replace("_","."));
        } else {
            system.ios = 2;//不能真正检测出来，所以只能猜测
        }
    }

    //检测Android版本
    if(/Android (\d+\.\d+)/.test(ua)) {
        system.android = parseFloat(RegExp.$1);
    }

    //游戏系统
    system.wii = ua.indexOf("Wii") > -1;  
    system.ps = /playstation/i.test(ua);  

    //返回这些对象    
    return {  
        engine : engine,  
        browser : browser,  
        system : system  
    };  
}();   
```
##### 40.知道什么是webkit么? 知道怎么用浏览器的各种工具来调试和debug代码么?你使用哪些工具和技术来调试 JavaScript 代码？

浏览器引擎和浏览器：opera--webkit(chrome和safari)--khtml--gecko(firefox)--ie

webkit是一个引擎，此引擎的主要的使用者有Safari，Chrome。

##### 41.javascript 代码中的"use strict";是什么意思 ? 使用它区别是什么？

**use strict**：严格模式

除了正常运行模式，ECMAScript5添加了第二种运行模式：严格模式，这种模式让js在更严格的条件下运行。

**使用严格模式的区别**

1.消除js语法的一些不合理，不严谨之处，比如不能用with(因为增加了访问作用域链的成本)，也不能在意外的情况下给全局变量赋值

2.消除代码中的一些不安全之处，保证代码的安全

比如：禁止this关键字指向全局对象

```
function f(){
　　　　return !this;
　　}
　　// 返回false，因为"this"指向全局对象，"!this"就是false
　　function f(){
　　　　"use strict";
　　　　return !this;
　　}
　　// 返回true，因为严格模式下，this的值为undefined，所以"!this"为true。
```

因此，使用构造函数时，如果忘了加new，this不再指向全局对象，而是报错。

```
function f(){
　　　　"use strict";
　　　　this.a = 1;
　　};
　　f();// 报错，this未定义
```

3.提高编译器效率，增加运行速度

4.为未来新版本的Javascript做好铺垫


##### 42.如何判断一个对象是否属于某个类？

object instanceof construtor

##### 43.new操作符具体干了什么呢?

new操作符：

1.创建一个空对象

2.修改这个对象的内部属性_proto_，使其指向构造函数的prototype

3.将这个对象交给构造函数的this，调用构造函数

4.如果构造函数没有return，就返回这个对象。否则构造函数返回return语句后面的内容

我们可以通过在Function.prototype上创建个新方法来模拟new：

```
Function.prototype._new_ = function() {

    var newObj,
        resultObj;

    newObj = {};
    newObj._proto_ = this.prototype;
    resultObj = this.apply(newObj,arguments);

    return (typeof resultObj === "object" && resultObj) || newObj;
};
```

##### 44.那些操作会造成内存泄漏？

内存泄露：应用程序不再需要占用内存的时候，由于某些原因，内存没有被操作系统或可用内存池回收。

1.不规范的js代码

比如意外的全局变量，不使用var来定义，js中如果不用 var 声明变量,该变量将被视为 window 对象(全局对象)的属性,也就是全局变量.

##### 45.对JSON的了解？

###### 1.什么是JSON

1.JSON:JavaScript Object Notation，javascript对象表示法

2.json是一种数据结构

3.不从属于javascript

4.很多语言都有针对JSON的解析器和序列化器

**JSON流行的原因**

1.和js语法类似，容易理解

2.可以将JSON数据结构解析成有用的js对象

###### 2.JSON语法

**JSON的语法可以表示以下三种类型的值：**

简单值：字符串、数值、布尔值、null，但不支持js的undefined

对象：表示一组无序的键值对儿

数组：有序的值的列表

JSON不支持变量，函数，对象实例，只是一种表示结构化数据的格式

**JSON的对象**

```
{
	"name":"wanghuan",
	"age":29,
	"school":{
		"name":"bupt",//虽有两个name，但是在不同对象中不影响
		"location":"beijing"
	}
}
```

与js对象字面量的不同：

1.对象属性必须加上""
2.无末尾的分号；
3.没有声明变量（json只是数据结构，没有变量的概念）

**JSON的数组**

[23,"wanghuan",true]

与js数组字面量的不同：
1.无声明变量
2.无分号

```
//数组和对象结合出更复杂的数据集合
[
	{
		"title":"bupt",
		"author":"wanghuan",
		"year":2011
	},
	{
		"title":"bupt",
		"author":"wanghuan",
		"year":2011
	},
	{
		"title":"bupt",
		"author":"wanghuan",
		"year":2011
	}
]
```

###### 3.序列化

JSON对象的方法：

**stringify()**

用于把js对象序列化为JSON字符串,默认情况下，此函数输出的JSON字符串不包含任何空格字符或缩进，同时会忽略js对象的函数和原型对象。
参数1：js对象
```
var book = {
	title:"bupt",
	author:["wanghuan"],
	year:2011
};
var jsonText = JSON.stringify(book);
//{"title":"bupt","author":["wanghuan"],"year":2011}
```

参数2：过滤器（可以是数组，也可以是函数），可选

```
var book = {
	title:"bupt",
	author:["wanghuan"],
	year:2011
};
var jsonText = JSON.stringify(book,["title","author"]);
//{"title":"bupt","author":["wanghuan"]}
```

```
var book = {
	title:"bupt",
	author:["wanghuan"],
	year:2011,
	edition:3
};
var jsonText = JSON.stringify(book,function(key,value) {
	switch(key){
		case "author":
			return value.join(",");//key为数组连接成一个字符串
		case "year":
			return 5000;
		case "edition":
			return undefined;//返回undefined删除此属性
		default:
			return value;//其他值正常显示
	}
});
//{"title":"bupt","author":"wanghuan","year":5000}
```

参数3：字符串缩进（可以是数值等），可选

```
var book = {
	title:"bupt",
	author:["wanghuan"],
	year:2011
};
var jsonText = JSON.stringify(book,null,4);
//jsonText为，缩进4个空格（自动包含换行符），最大缩进值是10个字符
{
	"title":"bupt",
	"author":["wanghuan"],
	"year":2011
}
```

**toJSON()方法**--对过滤器的补充

JSON.stringify()有时不能满足某些对象进行自定义序列化的需求，则给对象定义toJSON()方法
```
var book = {
	title:"bupt",
	author:["wanghuan"],
	year:2011,
	toJSON:function(){
		return this.title;
	}
};
var jsonText = JSON.stringify(book);
```

**序列化对象的顺序**

1.若存在toJSON()方法而且能通过它取得有效的值，则调用这个方法。否则，返回对象本身
2.如果提供了第二个参数，应用此函数过滤器。传入函数过滤器的值是第1步返回的值
3.对第2步返回的每个值进行相应的序列化
4.如果提供了第三个参数，执行相应的格式化

###### 4.解析

**parse()**
把JSON字符串解析成原生js值

参数1：js对象
```
var bookCopy = JSON.parse(jsonText);
//book与bookCopy有相同属性，但是是无关的对象
```

参数2：函数，可选，将在每个键值对上调用
```
var book = {
	title:"bupt",
	author:["wanghuan"],
	year:2011,
	//此属性保存了一个Date对象
	releaseDate:new Date(2011,11,1)
};
//Date对象在序列化之后变成了有效的JSON字符串
var jsonText = JSON.stringify(book);

var bookCopy = JSON.parse(jsonText,function(key,value){
	//解析在bookCopy中还原了一个Date对象，则bookCopy.releaseDate()属性中会保存一个Date对象
	if(key == "releaseDate") {
		return new Date(value);
	} else {
		return value;
	}
});
//因为已经是一个Date对象，可以调用getFullYear()
alert(bookCopy.releaseDate.getFullYear());
```

##### 46.在JS方法中返回多个值的三种方法

1.使用数组的方式

```
<html>
<head>
    <title>JS函数返回多个值--oec2003</title>
</head>
<body>
    <input type="button" onclick="getNames()" value="test" />
    <script type="text/javascript">
function getData()
{
    var names=new Array("oec2003","oec2004");
    return names;
}
function getNames()
{
    var names=getData();
    alert(getData()[0]); //返回oec2003
}
</script>
</body>
</html>
```

2.将数据封装到Json中返回

```
<html>
<head>
<title>JS函数返回多个值--oec2003</title>
</head>
<body>
<input type="button" onclick="getInfo()" value="test"/>
<script type="text/javascript">
function getData()
{
    var info={"name":"oec2003","age":"25"};
    return info;
}
function getInfo()
{
    var info=getData();
    var name=info["name"];
    var age=info["age"];
    alert("姓名："+name+" 年龄："+age);
}
</script>
</body>
</html>
```

3.这是最简单的一种方法，看下面代码

```
<html>
<head>
<title>JS函数返回多个值--oec2003</title>
</head>
<body>
<input type="button" onclick="getInfo()" value="test"/>
<script type="text/javascript">
    function getData()
    {
        return ["oec2003", 25]
    }
    function getInfo()
    {
        var info = getData();
        alert("姓名：" + info[0] + "年龄：" + info[1]);
    }
</script>
</body>
</html>
```

##### 46.Ajax 是什么? 如何创建一个Ajax？请尽可能详尽的解释 Ajax 的工作原理？使用 Ajax 都有哪些优劣？

ajax可以跨域吗？怎么跨域？
ajax怎么向服务器发送请求
ajax原理﻿
ajax的优点和缺点
什么是跨域资源共享 (CORS)？它用于解决什么问题？

ajax的全称：Asynchronous Javascript And XML。

(1)创建XMLHttpRequest对象,也就是创建一个异步调用对象

(2)创建一个新的HTTP请求,并指定该HTTP请求的方法、URL及验证信息

(3)设置响应HTTP请求状态变化的函数

(4)发送HTTP请求

(5)获取异步调用返回的数据

(6)使用JavaScript和DOM实现局部刷新

##### 47. 请解释 JSONP 的工作原理，以及它为什么不是真正的 Ajax。

##### 48. .和[ ]的区别

访问对象属性的方法

**1.语法差别**

```
object.property
object['property']
```

**2.举例**

```
function Person() {
  this.name=" 王欢 ";
  this.sex=" 女 ";
  this.age=22;
}
var wanghuan=new Person();
wanghuan.name;
wanghuan["name"];
```

**3.灵活性差别**
使用”.“运算符来存取一个对象的属性时，属性名是用标识符表示的。而在JavaScript程序中，标识符必须被逐字地输入，它们不是一种数据类型，因此程序不能对其操作。
而使用数组[]表示法来存取一个对象的属性时，属性名是用字符串表示的。字符串是JavaScript的一种数据类型，因此可以在程序运行中操作并创建它们。

这种情况使用[]才可，因为city是个字符串

```
var city = document.getElementById('aqi-city-input').value,
    num = document.getElementById('aqi-value-input').value;
//这里就不能用.看随后属性访问的比较
aqiData[city] = num;
//随后的遍历操作
for(var city in aqiData) {
	alert(city+":"+aqiData[city]);//北京：90，上海：40等
}
```

**4.执行效率差别**
数组[]表示法在存取属性值时会进行表达式运行。
而点表示法是直接存取属性值，理论上执行效率会比数组表示法高。


##### 49.谈一谈你对ECMAScript6的了解？ECMAScript6的基础知识。

ECMAScript 6（以下简称ES6）是JavaScript语言的下一代标准.
因为当前版本的ES6是在2015年发布的，所以又称ECMAScript 2015。
若是2016年发布的，就是ECMAScript 2016。

Babel是一个广泛使用的ES6转码器，可以将ES6代码转为ES5代码。目前并不是所有浏览器都能兼容ES6全部特性

###### 1.let和const

let定义块级作用域，声明的变量不具备变量提升（hoisting）特性

const定义块级作用域，是定义常量，const 在声明时必须被赋值

ES5只有全局作用域和函数作用域，没有块级作用域，ES6用let则实际上为JavaScript新增了块级作用域

块级作用域：1.防止变量在作用域外被访问 2.防止重复声明变量 3.不再需要立即执行的函数表达式(IIFE) 4.循环种的闭包不会有问题

```
var name = 'zach'
防止重复声明变量

while (true) {
    var name = 'obama'
    console.log(name)  //obama
    break
}

console.log(name)  //obama
用let如下：
let name = 'zach'

while (true) {
    let name = 'obama'
    console.log(name)  //obama
    break
}

console.log(name)  //zach
```

```
//另外一个var带来的不合理场景就是用来计数的循环变量泄露为全局变量
var a = [];
for (var i = 0; i < 10; i++) {
  a[i] = function () {
    console.log(i);
  };
}
a[6](); // 10

//上面代码中，变量i是var声明的，在全局范围内都有效。
//因为 let 语句会使该变量处于一个块级作用域中，从而让事件监听回调函数中的变量引用得到保持
//其实若用es5的话，其实可以用闭包就可以解决这个问题
var a = [];
for (let i = 0; i < 10; i++) {
  a[i] = function () {
    console.log(i);
  };
}
a[6](); // 6
```

const也用来声明变量，但是声明的是常量。一旦声明，常量的值就不能改变。

```
const MY_CONSTANT = 1;
MY_CONSTANT = 2 // Error
const SOME_CONST; // Error
```

注意，对象的属性或数组成员还是可以改变的。

```
const MY_OBJECT = {some: 1};
MY_OBJECT.some = 'body'; // Cool
```

###### 2.箭头函数

箭头函数是函数的一种简写方式，括号包裹参数，跟随一个=>，紧接着函数体

**箭头函数好处**

1.箭头函数可以让代码变得简洁

2.函数体this总是指向对象自身

3.可以为参数设置默认值

对于函数中的函数this指向全局对象，之前的解决方法是1.用that缓存 2.用bind(this)绑定 3.用箭头函数

```
function Person(){
  this.age = 0;

  setInterval(() => {
    // |this| 指向 person 对象
    this.age++;
  }, 1000);
}

var person = new Person();
```

默认参数：

```
let getFinalPrice = (price, tax=0.7) => price + price * tax;
getFinalPrice(500); // 850
```
###### 3.字符串

1.新增的字符串方法

ES6提供了3种可以替代indexof方法，可以用来确定一个字符串是否包含在另一个字符串中
includes()：返回布尔值，表示是否找到了参数字符串。
startsWith()：返回布尔值，表示参数字符串是否在源字符串的头部。
endsWith()：返回布尔值，表示参数字符串是否在源字符串的尾部。
```
'my string'.startsWith('my'); //true
'my string'.endsWith('my'); // false
'my string'.includes('str'); // true
```

repeat():返回一个新字符串，表示将原字符串重复n次
```
'x'.repeat(3) // "xxx"
'hello'.repeat(2) // "hellohello"
'na'.repeat(0) // ""
```

2.字符串模板--提供一个简洁的方式来实现字符串插值

ES5:在其它语言中，使用模板和插入值是在字符串里面输出变量的一种方式。因此，在ES5，我们可以这样组合一个字符串：

ES6:幸运的是，在ES6中，我们可以使用新的语法$ {NAME}，并把它放在反引号里：
```
//es5
var name = 'Your name is ' + first + ' ' + last + '.';
var url = 'http://localhost:3000/api/messages/' + id;
//es6
var name = `Your name is ${first} ${last}. `;
var url = `http://localhost:3000/api/messages/${id}`;
```

3.多行字符串

```
//ES6的多行字符串是一个非常实用的功能。在ES5中，我们不得不使用以下方法来表示多行字符串：

var roadPoem = 'Then took the other, as just as fair,nt'
    + 'And having perhaps the better claimnt'
    + 'Because it was grassy and wanted wear,nt'
    + 'Though as for that the passing therent'
    + 'Had worn them really about the same,nt';
var fourAgreements = 'You have the right to be you.n
    You can only be you when you do your best.';

//然而在ES6中，仅仅用反引号就可以解决了：

var roadPoem = `Then took the other, as just as fair,
    And having perhaps the better claim
    Because it was grassy and wanted wear,
    Though as for that the passing there
    Had worn them really about the same,`;
var fourAgreements = `You have the right to be you.
    You can only be you when you do your best.`;
```
###### 4.数组

Array 对象增加了一些新的静态方法，Array 原型上也增加了一些新方法。

1.Array.from

Array.from方法用于将两类对象转为真正的数组：类似数组的对象（函数中的 arguments/由 document.getElementByTagName() 返回的 nodeList/新增加的 Map 和 Set 数据结构）和可遍历（iterable）的对象（包括ES6新增的数据结构Set和Map）。

```
let itemElements = document.querySelectorAll('.items');
let items = Array.from(itemElements);
items.forEach(function(element) {
    console.log(element.nodeType)
});

// A workaround often used in ES5:
let items = Array.prototype.slice.call(itemElements);
```

2.Array.of()

Array.of方法用于将一组值，转换为数组。

```
Array.of(3, 11, 8) // [3,11,8]
Array.of(3) // [3]
Array.of(3).length // 1
Array.of() // []
Array.of(undefined) // [undefined]
Array.of(1) // [1]
Array.of(1, 2) // [1, 2]
```
这个方法的主要目的，是弥补数组构造函数Array()的不足。因为参数个数的不同，会导致Array()的行为有差异。

```
Array() // []
Array(3) // [, , ,]
Array(3, 11, 8) // [3, 11, 8]
```

Array.of基本上可以用来替代Array()或new Array()，并且不存在由于参数不同而导致的重载。它的行为非常统一。

3.find()和findIndex()

find 返回回调返回 true 的第一个元素。
findIndex 返回回调函数返回 true的第一个元素的下标。
fill 用所给参数“覆盖”数组的元素。

数组实例的find方法，用于找出第一个符合条件的数组成员。它的参数是一个回调函数，所有数组成员依次执行该回调函数，直到找出第一个返回值为true的成员，然后返回该成员。如果没有符合条件的成员，则返回undefined。

```
[1, 4, -5, 10].find((n) => n < 0)
// -5

[1, 5, 10, 15].find(function(value, index, arr) {
  return value > 9;
}) // 10
[5, 1, 10, 8].find(n => n === 10) // 10

[5, 1, 10, 8].findIndex(n => n === 10) // 2

[0, 0, 0].fill(7) // [7, 7, 7]
[0, 0, 0, 0, 0].fill(7, 1, 3) // [0, 7, 7, 7, 0]
```
###### 5.Spread和Rest操作符(...)

spread操作符主要用于数组构造和解构，在调用时将数组填入函数参数
rest操作符主要用于获得传递给函数的参数列表

```
//rest操作符
function countArguments(...args) {  
　　return args.length;
}
// 获得参数的数量
countArguments('welcome', 'to', 'Earth'); // => 3  

//spread操作符
let cold = ['autumn', 'winter'];  
let warm = ['spring', 'summer'];  
// 构造一个数组
[...cold, ...warm] // 真正数组值是 ['autumn', 'winter', 'spring', 'summer']
// 解构一个数组
let otherSeasons, autumn;  
[autumn, ...otherSeasons] = cold;
otherSeasons      // 值是 ['winter']  
// 代表一个数组的函数参数
cold.push(...warm);  
cold              // 值是 ['autumn', 'winter', 'spring', 'summer']  
```

其实可以很好的简化之前的代码，因为arguments是类数组

```
function f(x, y, z) {
    return x + y + z;
}

var args = [1, 2, 3];

// Old method
func.apply(this, args);
// New method
func(...args);
```
###### 6.解构

解构提供了一个方便地从对象或数组中提取数据的方法

```
let [x, y] = [1, 2]; // x = 1, y = 2
// ES5 equivalent:
var arr = [1, 2];
var x = arr[0];
var y = arr[1];

let x = 1,
   y = 2;
[x, y] = [y, x]; // x = 2, y = 1

let obj = {x: 1, y: 2};
let {x, y} = obj; // x = 1, y = 2

let obj = {x: 1, y: 2};
let {x: a, y: b} = obj; // a = 1, b = 2

function doSomething() {
   return [1, 2]
}
let [x, y] = doSomething(); // x = 1, y = 2
```
###### 7.Promise以及和回调比较的优缺点

Promise 是异步编程的一种解决方案，避免因为异步函数调用而导致回调函数一环套一环的场景，从而改善代码的可读性。
Promise 简单说就是一个容器，里面保存着某个未来才会结束的事件（通常是一个异步操作）的结果。从语法上说，Promise 是一个对象，从它可以获取异步操作的消息。Promise 提供统一的 API，各种异步操作都可以用同样的方法进行处理。

下面是一个简单的用setTimeout()实现的异步延迟加载函数:(异步+回调)

```
//ES5
setTimeout(function(){
  console.log('Yay!');
}, 1000);
//ES6
var wait1000 =  new Promise(function(resolve, reject) {
  setTimeout(resolve, 1000);
}).then(function() {
  console.log('Yay!');
});
```

```
//ES5
setTimeout(function(){
  console.log('Yay!');
  setTimeout(function(){
    console.log('Wheeyee!');
  }, 1000)
}, 1000);
//ES6
var wait1000 =  ()=> new Promise((resolve, reject)=> {setTimeout(resolve, 1000)});
wait1000()
    .then(function() {
        console.log('Yay!')
        return wait1000()
    })
    .then(function() {
        console.log('Wheeyee!')
    });
```

promise对象的三个状态：pending执行中，fulfilled成功，reject拒绝(其中pending为初始状态，fulfilled和rejected为结束状态（结束状态表示promise的生命周期已结束）。)

状态转换关系为：pending->fulfilled，pending->rejected。随着状态的转换将触发各种事件（如执行成功事件、执行失败事件等）

**基本用法**

Promise构造函数接受一个函数作为参数，该函数的两个参数分别是resolve和reject。它们是两个函数，由JavaScript引擎提供，不用自己部署。

Promise实例生成以后，可以用then方法分别指定Resolved状态和Reject状态的回调函数，用then后的回调函数处理resolved或者reject的结果。
```
//promise实例--创建promise的时候就执行函数里边的逻辑了
var promise = new Promise(function(resolve,reject) {
    //...some code
    if(success) {
        resolve(value);
    } else {
        reject(error);
    }
});
//Promise实例生成以后，可以用then方法分别指定Resolved状态和Reject状态的回调函数。
promise.then(function(value){

},function(error){

});

```
**使用 Promises 而非回调 (callbacks) 优缺点是什么**

优点：
1.有了Promise对象，就可以将异步操作以同步操作的流程表达出来，避免了层层嵌套的回调函数。代码易读。
2.Promise对象提供统一的接口，使得控制异步操作更加容易。
3.Promise的作用是解决回调金字塔的问题，对于控制异步流程实际上没有起到很大的作用。真正使用Promise对异步流程进行控制，我们还要借助ES6 generator函数。

缺点：
1.无法取消Promise，一旦新建它就会立即执行，无法中途取消。

```
//Promise新建后立即执行，所以首先输出的是“Promise”。然后，then方法指定的回调函数，将在当前脚本所有同步任务执行完才会执行(就是所谓的主线程继续往下执行)，所以“Resolved”最后输出。
let promise = new Promise(function(resolve, reject) {
  console.log('Promise');
  resolve();
});

promise.then(function() {
  console.log('Resolved.');
});

console.log('Hi!');

// Promise
// Hi!
// Resolved
```

2.如果不设置回调函数，Promise内部抛出的错误，不会反应到外部
3.当处于Pending状态时，无法得知目前进展到哪一个阶段（刚刚开始还是即将完成）。


###### 8.class, extends, super

这三个特性涉及了ES5中最令人头疼的的几个部分：原型、构造函数，继承.

**引入class目的**

让对象原型的写法更加清晰、更像面向对象编程的语法而已

ES6的类，完全可以看作构造函数的另一种写法,类的数据类型就是函数，类本身就指向构造函数。
```
class Point {
  // ...
}

typeof Point // "function"
Point === Point.prototype.constructor // true
```

**class如何写**

1.class里面有一个constructor方法，这就是构造方法。

2.定义class的方法的时候，前面不需要加上function这个关键字，直接把函数定义放进去了就可以了。

3.方法之间不需要逗号分隔，加了会报错。

```
class baseModel {
  constructor(options, data) { // class constructor，node.js 5.6暂时不支持options = {}, data = []这样传参
    this.name = 'Base';
    this.url = 'http://azat.co/api';
    this.data = data;
    this.options = options;
   }
    getName() { // class method
        console.log(`Class name: ${this.name}`);
    }
}
```

AccountModel 从类baseModel 中继承而来:
```
class AccountModel extends baseModel {
    constructor(options, data) {
        //为了调用父级构造函数，可以毫不费力的唤起super()用参数传递
       super({private: true}, ['32113123123', '524214691']); //call the parent method with super
       this.name = 'Account Model';
       this.url +='/accounts/';
    }
    //如果你想做些更好玩的，你可以把 accountData 设置成一个属性：
    get accountsData() { //calculated attribute getter
    // ... make XHR
        return this.data;
    }
}
```

```
let accounts = new AccountModel(5);
accounts.getName();
console.log('Data is %s', accounts.accountsData);
```
结果令人惊讶，输出是：

Class name: Account Model
Data is  32113123123,524214691

###### 9.模块(export或者import)

ES6之前：模块加载方案，最主要的有 CommonJS 和 AMD 两种。前者用于服务器，后者用于浏览器。
为了实现 AMD 或 CommonJS，你通常需要一个构建步骤或加载器。解决这个问题的工具包括 RequireJS、Browserify 和 WebPack。

ES6：模块功能可以取代 CommonJS 和 AMD 规范。模块设计围绕 export 和 import 关键词
```
// lib/math.js

export function sum(x, y) {
   return x + y;
}
export var pi = 3.141593;
// app.js

import { sum, pi } from "lib/math";
console.log('2π = ' + sum(pi, pi));
```
正如你所见，可以存在多个 export 声明。每一个都要明确地指明输出值的类型（本例中的 function 和 var）。

本例中的 import 声明使用一种语法（类似解构）来明确定义被导入的内容。可以使用 * 通配符，结合 as 关键词给模块提供一个本地名称，把模块当成一个整体导入。
```
// app.js

import * as math from "lib/math";
console.log('2π = ' + math.sum(math.pi, math.pi));
```
模块系统有一个 default 输出。它可以是一个函数。只需要提供一个本地名称就可以导入这个默认值（即无解构）：
```

// lib/my-fn.js

export default function() {
   console.log('echo echo');
}

// app.js

import doSomething from 'lib/my-fn';
doSomething();
```
请注意 import 声明是同步的，但是模块代码需在所有依赖加载完后才会运行。

###### 10. Generators

Generator 函数是 ES6 的新特性，它允许一个函数返回的可遍历对象生成多个值。

在使用中你会看到 * 语法和一个新的关键词 yield:
```
function *infiniteNumbers() {
  var n = 1;
  while (true){
    yield n++;
  }
}

var numbers = infiniteNumbers(); // returns an iterable object

numbers.next(); // { value: 1, done: false }
numbers.next(); // { value: 2, done: false }
numbers.next(); // { value: 3, done: false }
```

###### 11.迭代器（Iterators）
迭代器允许每次访问数据集合的一个元素，当指针指向数据集合最后一个元素是，迭代器便会退出。它提供了 next() 函数来遍历一个序列，这个方法返回一个包含 done 和value 属性的对象。

ES6 中可以通过 Symbol.iterator 给对象设置默认的遍历器，无论什么时候对象需要被遍历，执行它的 @@iterator 方法便可以返回一个用于获取值的迭代器。

```
var arr = [11,12,13];
var itr = arr[Symbol.iterator]();

itr.next(); // { value: 11, done: false }
itr.next(); // { value: 12, done: false }
itr.next(); // { value: 13, done: false }

itr.next(); // { value: undefined, done: true }
```
你可以通过 [Symbol.iterator]() 自定义一个对象的迭代器。

###### 12.Map 和 WeakMap
ES6 中两种新的数据结构集：Map 和 WeakMap。事实上每个对象都可以看作是一个Map。

一个对象由多个 key-val 对构成，在 Map 中，任何类型都可以作为对象的 key，如：
```
var myMap = new Map();

var keyString = "a string",
    keyObj = {},
    keyFunc = function () {};

// 设置值
myMap.set(keyString, "value 与 'a string' 关联");
myMap.set(keyObj, "value 与 keyObj 关联");
myMap.set(keyFunc, "value 与 keyFunc 关联");

myMap.size; // 3

// 获取值
myMap.get(keyString);    // "value 与 'a string' 关联"
myMap.get(keyObj);       // "value 与 keyObj 关联"
myMap.get(keyFunc);      // "value 与 keyFunc 关联"
```
WeakMap

WeakMap 就是一个 Map，只不过它的所有 key 都是弱引用，意思就是 WeakMap 中的东西垃圾回收时不考虑，使用它不用担心内存泄漏问题。

另一个需要注意的点是，WeakMap 的所有 key 必须是对象。它只有四个方法delete(key),has(key),get(key) 和 set(key, val)：
```
let w = new WeakMap();
w.set('a', 'b');
// Uncaught TypeError: Invalid value used as weak map key

var o1 = {},
    o2 = function(){},
    o3 = window;

w.set(o1, 37);
w.set(o2, "azerty");
w.set(o3, undefined);

w.get(o3); // undefined, because that is the set value

w.has(o1); // true
w.delete(o1);
w.has(o1); // false
```

###### 13.Set 和 WeakSet
Set 对象是一组不重复的值，重复的值将被忽略，值类型可以是原始类型和引用类型：
```
let mySet = new Set([1, 1, 2, 2, 3, 3]);
mySet.size; // 3
mySet.has(1); // true
mySet.add('strings');
mySet.add({ a: 1, b:2 });

可以通过 forEach 和 for...of 来遍历 Set 对象：

mySet.forEach((item) => {
  console.log(item);
    // 1
    // 2
    // 3
    // 'strings'
    // Object { a: 1, b: 2 }
});

for (let value of mySet) {
  console.log(value);
    // 1
    // 2
    // 3
    // 'strings'
    // Object { a: 1, b: 2 }
}
```

Set 同样有 delete() 和 clear() 方法。

WeakSet
类似于 WeakMap，WeakSet 对象可以让你在一个集合中保存对象的弱引用，在WeakSet 中的对象只允许出现一次：
```
var ws = new WeakSet();
var obj = {};
var foo = {};

ws.add(window);
ws.add(obj);

ws.has(window); // true
ws.has(foo);    // false, foo 没有添加成功

ws.delete(window); // 从结合中删除 window 对象
ws.has(window);    // false, window 对象已经被删除
```
##### 50.如何解决跨域问题?js跨域请求的方式

怎么跨域
Jasonp跨域

**js跨域请求的方式**

1、通过jsonp跨域
2、通过修改document.domain来跨子域
3、使用window.name来进行跨域
4、使用HTML5中新引进的window.postMessage方法来跨域传送数据（ie 67 不支持）
5、CORS 需要服务器设置header ：Access-Control-Allow-Origin。
6、nginx反向代理 这个方法一般很少有人提及，但是他可以不用目标服务器配合，不过需要你搭建一个中转nginx服务器，用于转发请求

##### 51.请大概描述下页面访问cookie的限制条件

1.跨域问题
2.设置了HttpOnly

##### 52.图片预览

```
<input type="file" name="file" onchange="showPreview(this)" />
<img id="portrait" src="" width="70" height="75">

function showPreview(source) {
  var file = source.files[0];
  if(window.FileReader) {
      var fr = new FileReader();
      fr.onloadend = function(e) {
        document.getElementById("portrait").src = e.target.result;
      };
      fr.readAsDataURL(file);
  }
}
```

















##### 34.请指出 document load 和 document DOMContentLoaded 两个事件的区别。

http://www.jianshu.com/p/d851db5f2f30

为何你会使用 load 之类的事件 (event)？此事件有缺点吗？你是否知道其他替代品，以及为何使用它们？


##### 28.页面编码和被请求的资源编码如果不一致如何处理？


##### 29.模块化开发怎么做？


##### 30.AMD（Modules/Asynchronous-Definition）、CMD（Common Module Definition）规范区别？

AMD，CMD规范什么的。二面问jQuery的事件代理实现，浏览器跨域方法，用JS实现Array的indexOf方法，还有一些杂七杂八的记不清了。三面跟腾讯二面一样，主要问项目的东西，外加了一些团队合作，学习方法的问题。

 阿里面试：一面面试官现场带电脑直接联网看作品，GitHub，博客什么的，然后从中挑一些东西来问，后面又顺带考了Tab组件的实现和JS的类继承实现等内容。二面也是看了作品，GitHub，博客什么的，跟一面不同的是还看了我pixiv帐号上的东东并称赞画得不错啥的

##### 31.requireJS的核心原理是什么？（如何动态加载的？如何避免多次加载的？如何 缓存的？）


requireJS就是模块化的管理和生成，且定义无依赖和有依赖的模块


##### 20.用原生JavaScript的实现过什么功能吗？


##### 21.Javascript中，有一个函数，执行时对象查找时，永远不会去查找原型，这个函数是？

hasOwnProperty

javaScript中hasOwnProperty函数方法是返回一个布尔值，指出一个对象是否具有指定名称的属性。此方法无法检查该对象的原型链中是否具有该属性；该属性必须是对象本身的一个成员。

##### 23. [].forEach.call($$("*"),function(a){ a.style.outline="1px solid #"+(~~(Math.random()*(1<<24))).toString(16) })  能解释一下这段代码的意思吗？


##### 61.需求：实现一个页面操作不会整页刷新的网站，并且能在浏览器前进、后退时正确响应。给出你的技术实现方案？


##### 62.如何判断当前脚本运行在浏览器还是node环境中？（阿里）

十三、iframe有那些缺点？

iframe会阻塞主页面的Onload事件；
搜索引擎的检索程序无法解读这种页面，不利于SEO;
iframe和主页面共享连接池，而浏览器对相同域的连接有限制，所以会影响页面的并行加载。
使用iframe之前需要考虑这两个缺点。如果需要使用iframe，最好是通过javascript动态给iframe添加src属性值，这样可以绕开以上两个问题。

##### 63.移动端最小触控区域是多大？


##### 66.移动端的点击事件的有延迟，时间是多久，为什么会有？ 怎么解决这个延时？（click 有 300ms 延迟,为了实现safari的双击事件的设计，浏览器要知道你是不是要双击操作。）


##### 67.知道各种JS框架(Angular, Backbone, Ember, React, Meteor, Knockout...)么? 能讲出他们各自的优点和缺点么?


##### 68.Underscore 对哪些 JS 原生对象进行了扩展以及提供了哪些好用的函数方法？


##### 71.Node.js的适用场景？


##### 72.(如果会用node)知道route, middleware, cluster, nodemon, pm2, server-side rendering么?


##### 73.解释一下 Backbone 的 MVC 实现方式？


##### 74.什么是“前端路由”?什么时候适合使用“前端路由”? “前端路由”有哪些优点和缺点?
1，什么是前端路由？
路由是根据不同的 url 地址展示不同的内容或页面
前端路由就是把不同路由对应不同的内容或页面的任务交给前端来做，之前是通过服务端根据 url 的不同返回不同的页面实现的。

2，什么时候使用前端路由？
在单页面应用，大部分页面结构不变，只改变部分内容的使用

3，前端路由有什么优点和缺点？
优点：
用户体验好，不需要每次都从服务器全部获取，快速展现给用户
缺点：
使用浏览器的前进，后退键的时候会重新发送请求，没有合理地利用缓存
单页面无法记住之前滚动的位置，无法在前进，后退的时候记住滚动的位置


##### 76.如何测试前端代码么? 知道BDD, TDD, Unit Test么? 知道怎么测试你的前端工程么(mocha, sinon, jasmin, qUnit..)?


##### 77.前端templating(Mustache, underscore, handlebars)是干嘛的, 怎么用?


##### 78.简述一下 Handlebars 的基本用法？


##### 79.简述一下 Handlerbars 的对模板的基本处理流程， 如何编译的？如何缓存的？


##### 80.用js实现千位分隔符?(来源：前端农民工，提示：正则+replace)
请举出一个匿名函数的典型用例？

##### 82.What is a Polyfill?
What is the extent of your experience with Promises and/or their polyfills?

##### 83.做的项目中，有没有用过或自己实现一些 polyfill 方案（兼容性处理方案）？


你怎么看 AMD vs. CommonJS？
请指出浏览器特性检测，特性推断和浏览器 UA 字符串嗅探的区别？
你使用过 JavaScript 模板系统吗？
如有使用过，请谈谈你都使用过哪些库？
请解释 JavaScript 的同源策略 (same-origin policy)。
为何通常会认为保留网站现有的全局作用域 (global scope) 不去改变它，是较好的选择？
请解释什么是单页应用 (single page app), 以及如何使其对搜索引擎友好 (SEO-friendly)。
使用一种可以编译成 JavaScript 的语言来写 JavaScript 代码有哪些优缺点？
请解释可变 (mutable) 和不变 (immutable) 对象的区别。
请举出 JavaScript 中一个不变性对象 (immutable object) 的例子？
不变性 (immutability) 有哪些优缺点？
如何用你自己的代码来实现不变性 (immutability)？
请问调用栈 (call stack) 和任务队列 (task queue) 的区别是什么？
#### 6.画圆的方法
可以用html、css、js不同的方法画出圆

css：
```
{
  width:100px;
  height:100px;
  border-radius:50px;
}
```

html5 canvas和js：
```
<canvas id="drawing" width="200px" height="200px">A drawing of something</canvas>
if(drawing1.getContext){
    var context1 = drawing1.getContext("2d");
    //开始路径
    context1.beginPath();
    //绘制外圆
    context1.arc(100,100,99,0,2*Math.PI,false);
    //描边路径
    context1.strokeStyle = "#ff0000";
    context1.stroke();
}
```

#### 7.请写出一些前端性能优化的方式

1.减少dom操作
2.部署前，图片压缩，代码压缩
3.优化js代码结构，减少冗余代码
4.减少http请求，合理设置 HTTP缓存
5.使用内容分发cdn加速
6.静态资源缓存
7.图片延迟加载


#### 8.对前端工程化的理解

开发规范
模块化开发
组件化开发
组件仓库
性能优化
项目部署
开发流程
开发工具

#### 9.vue生命周期钩子

1.beforcreate
2.created
3.beformount
4.mounted
5.beforeUpdate
6.updated
7.actived
8.deatived
9.beforeDestroy
10.destroyed
