##### 1.JavaScript介绍
1. 是一种跨平台、面向对象的轻量级的脚本语言，可用于web和HTML，可以运用于服务器、PC端、移动端。

2. 完整的 JavaScript 实现是由以下 3 个不同部分组成的：ECMAScript（是核心）、文档对象模型、浏览器对象模型

 ECMAScript 描述了该语言的语法和基本对象；(包含语法，类型，语句，关键字，保留字，操作符，对象)

 DOM 描述了处理网页内容的方法和接口，把整个页面映射为一个多层节点结构

 BOM 描述了与浏览器进行交互的方法和接口。

##### 2.script标签位置和属性

1. script标签放在head标签中，意味着js文件被下载执行完成后，且按照先后顺序依次解析，才显示页面的内容。

2. 放在body结束标签前，脚本在页面解析完才执行--最佳选择，因为defer可能不被支持

3. 在head中但是使用defer和asycn属性，这两个属性只适用于外部脚本文件。

    **延迟脚本defer** 属性是告诉浏览器立即下载，但是延迟执行，在文档完全显示之后在执行

    **异步脚本async** 属性也是立即下载，但不保证他们的先后顺序执行，故一定要确保js文件不相互依赖。

##### 3.介绍JavaScript的数据类型。

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

##### 4.JavaScript的类型转换

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

##### 5.检测JavaScript的数据类型。

  **typeof操作符来检测基本数据类型**

  返回值是undefined、boolean、number、string、object、function

  ps:

  1.若值是对象或者null返回Object,返回值中无null

  2.对未声明和未初始化的变量执行typeof操作符都返回undefined

  ```
  typeof null --返回object

  ```

  **instanceof操作符来检测引用数据类型**

  语法：variable instanceof constructor

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

##### 6.JavaScript的作用域。

js通过函数来管理作用域， **无块级作用域**,只是把变量声明添加到 **最近的执行环境** 当中(函数执行环境或者全局执行环境)

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

无块级作用域，变量声明提升，相当于
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


myname = "global"; // global variable
function func() {
   var myname; // 等同于 -> var myname = undefined;
   alert(myname); // "undefined"
   myname = "local";
   alert(myname); // "local"}
func();
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

##### 7.介绍js有哪些内置对象？

引用类型：

**Array对象**

栈方法:push(),pop()

队列方法：push(),shift()/unshift(),pop()

重排序：sort(),reverse()

操作：concat(),slice(),splice()

位置：indexOf(),lastIndexOf()

迭代：every(),some(),forEach(),filter(),map()

归并：reduce(),reduceRight()

http://blog.csdn.net/github_34514750/article/details/51049935


**Date对象**



**RegExp对象**

http://blog.csdn.net/github_34514750/article/details/51043277


**Global对象**

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

**字符串的模式匹配方法**

##### 8.js数组合并的方法？

http://blog.csdn.net/github_34514750/article/details/51320982

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

请指出以下代码的区别：function Person(){}、var person = Person()、var person = new Person()？(可结合下列知识点回答)

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

Arguments对象是活动对象的一个属性，它包括如下属性：

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

如上，this是执行上下文的一个属性，this值在 **进入** 上下文时确定，并且在上下文运行期间永久不变。

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
 console.log(point.x); //==>0
 console.log(point.y); //==>0
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

call,apply都是改变了被调用函数的执行上下文环境，并且直接执行了函数

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

**bind**  -- (请解释 Function.prototype.bind？)

bind()方法会创建一个新函数,称为绑定函数,新函数与被调函数（绑定函数的目标函数）具有相同的函数体。只是返回一个函数但不直接执行该函数。当调用这个绑定函数时,绑定函数会以创建它时传入bind()方法的第一个参数作为 this,传入 bind() 方法的第二个以及以后的参数加上绑定函数运行时本身的参数按照顺序作为原函数的参数来调用原函数(所以有下面多种写法)。

19个知识点中讲到了函数调用的方式(为函数调用，对象方法调用，构造函数调用，call或者apply调用)--函数调用中涉及到了函数中的内部函数，this指向全局对象

```
function Person(name){
 this.nickname = name;
 this.distractedGreeting = function() {
 
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

```
function Person(name){
 this.nickname = name;
 this.distractedGreeting = function() {
   var that = this;
 
   setTimeout(function(){
     console.log("Hello, my name is " + that.nickname);---setTimeout是函数内部的函数，this指向全局对象，所以是undefined
   }, 500);
 }
}
 
var alice = new Person('Alice');
alice.distractedGreeting();
//Hello, my name is undefined
```

更好的方法：是使用bind()来创建，使这个函数不论怎么调用都有同样的 this 值，从原来的函数和原来的对象创建一个绑定函数

```
function Person(name){
 this.nickname = name;
 this.distractedGreeting = function() {

   setTimeout(function(){
     console.log("Hello, my name is " + this.nickname);---setTimeout是函数内部的函数，this指向全局对象，所以是undefined
   }.bind(this), 500);
 }
}
 
var alice = new Person('Alice');
alice.distractedGreeting();
//Hello, my name is undefined
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

##### 21.什么是闭包（closure）？如何使用闭包？为什么要用它？

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
##### 23.NodeList转换成数组的方法？

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

##### 24."attribute" 和 "property" 的区别是什么？

Property：属性，property是DOM中的属性，是JavaScript里的对象  比如：element.id;

Attribute：特性，attribute是HTML标签上的特性，它的值只能够是字符串，通过类数组attributes可以罗列所有的attribute。 比如：element.getAttribute("id");或者element.attributes.

标准的 DOM properties 与 attributes 是同步的。公认的（非自定义的）特性会被以属性的形式添加到DOM对象中。如，id，align，style等，这时候操作property或者使用操作特性的DOM方法如getAttribute()都可以操作属性。

优先选择property
在实际应用中，98%的 DOM 操作都是使用 properties。
只有两种情形需要使用attributes
1.自定义 HTML attributes，因为它并不同步到DOM property。
2.访问内置的 HTML attributes，这些 attribute 不能从 property 同步过来。例如 INPUT标签的value值。

http://www.codeceo.com/article/javascript-property-attribute.html

##### 25.DOM扩展?

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

##### 25.通过DOM API操作元素?

###### 1.操作元素的样式

-- 1.直接点属性来访问，去除-，首字母变大些 2.像数组一样访问属性

这里我们只是要了基本的CSS属性名称，唯一区别是CSS属性的名称如果带有-的话，就需要去除，比如用marginTop代替margin-top。

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

###### 2.操作元素的内容

通常DOM操作都是改变原始的内容，最简单的是使用innerHTML属性

```
var myIntro = document.getElementById('intro');  

// 替换当前的内容
myIntro.innerHTML = 'New content for the <strong>amazing</strong> paragraph!';  

// 添加内容到当前的内容里
myIntro.innerHTML += '... some more content...';
```
###### 3.DOM操作——怎样添加、移除、移动、复制、创建和查找节点?

（1）创建新节点（只是创建没添加到文档中，添加还需要2中的方法）

       createDocumentFragment()    //创建一个DOM文档片段

       createElement()   //创建一个具体的元素

       createTextNode()   //创建一个文本节点

（2）添加、移除、替换、插入

       appendChild()

       replaceChild()

       insertBefore() //在已有的子节点前插入一个新的子节点

       removeChild()

（3）查找

       getElementsByTagName()    //通过标签名称

       getElementsByName()    //通过元素的Name属性的值(IE容错能力较强，会得到一个数组，其中包括id等于name值的)

       getElementById()    //通过元素Id，唯一性










##### 21.javascript 代码中的"use strict";是什么意思 ? 使用它区别是什么？

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


##### 22.如何判断一个对象是否属于某个类？

object instanceof construtor

##### 23.new操作符具体干了什么呢?

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

##### 24.js延迟加载的方式有哪些？

defer和async、动态创建DOM方式（用得最多）、按需异步载入js

##### 25.Ajax 是什么? 如何创建一个Ajax？

ajax的全称：Asynchronous Javascript And XML。

(1)创建XMLHttpRequest对象,也就是创建一个异步调用对象

(2)创建一个新的HTTP请求,并指定该HTTP请求的方法、URL及验证信息

(3)设置响应HTTP请求状态变化的函数

(4)发送HTTP请求

(5)获取异步调用返回的数据

(6)使用JavaScript和DOM实现局部刷新


##### 26.同步和异步的区别?

同步：浏览器访问服务器请求，用户看得到页面刷新，重新发请求,等请求完，页面刷新，新内容出现，用户看到新内容,j进行下一步操作。

异步：浏览器访问服务器请求，用户正常操作，浏览器后端进行请求。等请求完，页面不刷新，新内容也会出现，用户看到新内容。


##### 27.如何解决跨域问题?


##### 28.页面编码和被请求的资源编码如果不一致如何处理？


##### 29.模块化开发怎么做？


##### 30.AMD（Modules/Asynchronous-Definition）、CMD（Common Module Definition）规范区别？


##### 31.requireJS的核心原理是什么？（如何动态加载的？如何避免多次加载的？如何 缓存的？）


requireJS就是模块化的管理和生成，且定义无依赖和有依赖的模块

##### 32.谈一谈你对ECMAScript6的了解？


##### 33.ECMAScript6 怎么写class，为什么会出现class这种东西?


##### 34.异步加载的方式有哪些？

(1) defer，只支持IE

(2) async：

(3) 创建script，插入到DOM中，加载完毕后callBack

##### 35.documen.write和 innerHTML的区别?

document.write是重写这个document也就是重写页面，写入内容是字符串的html

innerHTML是DOM元素的一个属性，代表这个元素的内部html内容。

innerHTML允许更精确的控制刷新某个页面的某个部分，所以优于document.write

##### 20.用原生JavaScript的实现过什么功能吗？


##### 21.Javascript中，有一个函数，执行时对象查找时，永远不会去查找原型，这个函数是？

hasOwnProperty

javaScript中hasOwnProperty函数方法是返回一个布尔值，指出一个对象是否具有指定名称的属性。此方法无法检查该对象的原型链中是否具有该属性；该属性必须是对象本身的一个成员。

##### 22.对JSON的了解？


##### 23. [].forEach.call($$("*"),function(a){ a.style.outline="1px solid #"+(~~(Math.random()*(1<<24))).toString(16) })  能解释一下这段代码的意思吗？

##### 41.数组和对象有哪些原生方法，列举一下？


##### 42.JS 怎么实现一个类。怎么实例化这个类


##### 42.那些操作会造成内存泄漏？

1.不规范的js代码

比如意外的全局变量，不使用var来定义，js中如果不用 var 声明变量,该变量将被视为 window 对象(全局对象)的属性,也就是全局变量.



##### 61.需求：实现一个页面操作不会整页刷新的网站，并且能在浏览器前进、后退时正确响应。给出你的技术实现方案？


##### 62.如何判断当前脚本运行在浏览器还是node环境中？（阿里）


##### 63.移动端最小触控区域是多大？



##### 65.把 Script 标签 放在页面的最底部的body封闭之前 和封闭之后有什么区别？浏览器会如何解析它们？


##### 66.移动端的点击事件的有延迟，时间是多久，为什么会有？ 怎么解决这个延时？（click 有 300ms 延迟,为了实现safari的双击事件的设计，浏览器要知道你是不是要双击操作。）


##### 67.知道各种JS框架(Angular, Backbone, Ember, React, Meteor, Knockout...)么? 能讲出他们各自的优点和缺点么?


##### 68.Underscore 对哪些 JS 原生对象进行了扩展以及提供了哪些好用的函数方法？


##### 71.Node.js的适用场景？


##### 72.(如果会用node)知道route, middleware, cluster, nodemon, pm2, server-side rendering么?


##### 73.解释一下 Backbone 的 MVC 实现方式？


##### 74.什么是“前端路由”?什么时候适合使用“前端路由”? “前端路由”有哪些优点和缺点?


##### 75.知道什么是webkit么? 知道怎么用浏览器的各种工具来调试和debug代码么?


##### 76.如何测试前端代码么? 知道BDD, TDD, Unit Test么? 知道怎么测试你的前端工程么(mocha, sinon, jasmin, qUnit..)?


##### 77.前端templating(Mustache, underscore, handlebars)是干嘛的, 怎么用?


##### 78.简述一下 Handlebars 的基本用法？


##### 79.简述一下 Handlerbars 的对模板的基本处理流程， 如何编译的？如何缓存的？


##### 80.用js实现千位分隔符?(来源：前端农民工，提示：正则+replace)


##### 81.检测浏览器版本版本有哪些方式？

##### 17.写一个通用的事件侦听器函数(机试题)。


##### 82.What is a Polyfill?


##### 83.做的项目中，有没有用过或自己实现一些 polyfill 方案（兼容性处理方案）？


##### 84.我们给一个dom同时绑定两个点击事件，一个用捕获，一个用冒泡。会执行几次事件，会先执行冒泡还是捕获？

请解释事件代理 (event delegation)。
你怎么看 AMD vs. CommonJS？
请举出一个匿名函数的典型用例？
请指出 JavaScript 宿主对象 (host objects) 和原生对象 (native objects) 的区别？
在什么时候你会使用 document.write()？
请指出浏览器特性检测，特性推断和浏览器 UA 字符串嗅探的区别？
请尽可能详尽的解释 Ajax 的工作原理。
使用 Ajax 都有哪些优劣？
请解释 JSONP 的工作原理，以及它为什么不是真正的 Ajax。
你使用过 JavaScript 模板系统吗？
如有使用过，请谈谈你都使用过哪些库？
请描述事件冒泡机制 (event bubbling)。
为什么扩展 JavaScript 内置对象不是好的做法？
请指出 document load 和 document DOMContentLoaded 两个事件的区别。
请解释 JavaScript 的同源策略 (same-origin policy)。
什么是三元表达式 (Ternary expression)？“三元 (Ternary)” 表示什么意思？
为何通常会认为保留网站现有的全局作用域 (global scope) 不去改变它，是较好的选择？
为何你会使用 load 之类的事件 (event)？此事件有缺点吗？你是否知道其他替代品，以及为何使用它们？
请解释什么是单页应用 (single page app), 以及如何使其对搜索引擎友好 (SEO-friendly)。
What is the extent of your experience with Promises and/or their polyfills?
使用 Promises 而非回调 (callbacks) 优缺点是什么？
使用一种可以编译成 JavaScript 的语言来写 JavaScript 代码有哪些优缺点？
你使用哪些工具和技术来调试 JavaScript 代码？
你会使用怎样的语言结构来遍历对象属性 (object properties) 和数组内容？
请解释可变 (mutable) 和不变 (immutable) 对象的区别。
请举出 JavaScript 中一个不变性对象 (immutable object) 的例子？
不变性 (immutability) 有哪些优缺点？
如何用你自己的代码来实现不变性 (immutability)？
请解释同步 (synchronous) 和异步 (asynchronous) 函数的区别。
什么是事件循环 (event loop)？
请问调用栈 (call stack) 和任务队列 (task queue) 的区别是什么？


##### 19.关于事件，IE与火狐的事件机制有什么区别？ 如何阻止冒泡？
