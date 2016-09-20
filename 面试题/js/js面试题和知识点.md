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

###### 4.2.1 一些函数涉及的隐式转换

用于检测是否为非数值的函数：isNaN(mix)
isNaN()函数，经测试发现，该函数会尝试将参数值用Number()进行转换，如果结果为“非数值”则返回true，否则返回false。

###### 4.2.2 对象的隐式转换

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

###### 2.3 操作符与隐式类型转换

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

js **无块级作用域**,只是把变量声明添加到 **最近的执行环境** 当中(函数执行环境或者全局执行环境)

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

##### 6.介绍js有哪些内置对象？

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

##### 7.js数组合并的方法？

http://blog.csdn.net/github_34514750/article/details/51320982

##### 8.说说写JavaScript的基本规范？

##### 9.Javascript创建对象的几种方式？

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

##### 10.JavaScript原型，原型链 ? 有什么特点？
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

##### 11.Javascript如何实现继承？

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


##### 12.Javascript作用链域?

全局函数无法查看局部函数的内部细节，但局部函数可以查看其上层的函数细节，直至全局细节。

当需要从局部函数查找某一属性或方法时，如果当前作用域没有找到，就会上溯到上层作用域查找，

直至全局函数，这种组织形式就是作用域链。

##### 13.谈谈this对象的理解。


##### 14.eval是做什么的？

**语法**

eval(string)

**参数说明**

该方法只接受原始字符串作为参数，若string参数不是原始字符串，则不做任何改变地返回。因此，不要为此函数传递String对象来作为参数

**使用场景**

eval其实就是让字符串当成js代码执行(把一段字符串传递给JS解释器，由JS解释器将这段字符串解释成JS代码并执行),虽然任何字符串都可以当js代码执行，但是预先编辑好的（不是在动态运行时候决定）没有理由使用eval()

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

##### 15.什么是window对象? 什么是document对象?

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

http://www.w3school.com.cn/jsref/dom_obj_document.asp


##### 16.null，undefined的区别？

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

##### 17.写一个通用的事件侦听器函数(机试题)。


##### 18.["1", "2", "3"].map(parseInt) 答案是多少？

答案：

```
[1, NaN, NaN]
```
解析：
考察map函数，map的第一个参数是回调函数，并且自动给回调函数传递item,index,array三个参数，这里parseInt是回调函数，但是parseInt只接受两个参数(element,radix)，其实就是
```
parseInt("1", 0)--1--radix为0时，比较特殊，其实当成10进制处理。
parseInt("2", 1)--NaN--数值都超过了进制2>1不合理，无法解析
parseInt("3", 2)--NaN--数值都超过了进制3>2不合理，无法解析
```

##### 19.关于事件，IE与火狐的事件机制有什么区别？ 如何阻止冒泡？


##### 20.什么是闭包（closure），为什么要用它？

**闭包**

闭包就是有权访问另一个函数作用域中的变量的函数

##### 21.javascript 代码中的"use strict";是什么意思 ? 使用它区别是什么？

**use strict**：严格模式

除了正常运行模式，ECMAScript5添加了第二种运行模式：严格模式，这种模式让js在更严格的条件下运行。

**使用严格模式的区别**

1.消除js语法的一些不合理，不严谨之处，比如不能用with，也不能在意外的情况下给全局变量赋值

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

##### 20.用原生JavaScript的实现过什么功能吗？


##### 21.Javascript中，有一个函数，执行时对象查找时，永远不会去查找原型，这个函数是？

hasOwnProperty
javaScript中hasOwnProperty函数方法是返回一个布尔值，指出一个对象是否具有指定名称的属性。此方法无法检查该对象的原型链中是否具有该属性；该属性必须是对象本身的一个成员。

##### 22.对JSON的了解？


##### 23. [].forEach.call($$("*"),function(a){ a.style.outline="1px solid #"+(~~(Math.random()*(1<<24))).toString(16) })  能解释一下这段代码的意思吗？


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


##### 32.谈一谈你对ECMAScript6的了解？


##### 33.ECMAScript6 怎么写class，为什么会出现class这种东西?


##### 34.异步加载的方式有哪些？

(1) defer，只支持IE

(2) async：

(3) 创建script，插入到DOM中，加载完毕后callBack

##### 35.documen.write和 innerHTML的区别?


##### 36.DOM操作——怎样添加、移除、移动、复制、创建和查找节点?

（1）创建新节点

       createDocumentFragment()    //创建一个DOM片段

       createElement()   //创建一个具体的元素

       createTextNode()   //创建一个文本节点

（2）添加、移除、替换、插入

       appendChild()

       removeChild()

       replaceChild()

       insertBefore() //在已有的子节点前插入一个新的子节点

（3）查找

       getElementsByTagName()    //通过标签名称

       getElementsByName()    //通过元素的Name属性的值(IE容错能力较强，会得到一个数组，其中包括id等于name值的)

       getElementById()    //通过元素Id，唯一性

##### 37. .call() 和 .apply() 的作用和区别？


##### 38.数组和对象有哪些原生方法，列举一下？


##### 39.JS 怎么实现一个类。怎么实例化这个类


##### 40.JavaScript中的作用域与变量声明提升？


##### 41.如何编写高性能的Javascript？


##### 42.那些操作会造成内存泄漏？


##### 43.JQuery的源码看过吗？能不能简单概况一下它的实现原理？


##### 44.jQuery.fn的init方法返回的this指的是什么对象？为什么要返回this？


##### 45.jquery中如何将数组转化为json字符串，然后再转化回来？


##### 46.jQuery 的属性拷贝(extend)的实现原理是什么，如何实现深拷贝？


##### 47.jquery.extend 与 jquery.fn.extend的区别？


##### 48.jQuery 的队列是如何实现的？队列可以用在哪些地方？


##### 49.谈一下Jquery中的bind(),live(),delegate(),on()的区别？


##### 50.JQuery一个对象可以同时绑定多个事件，这是如何实现的？


##### 51.是否知道自定义事件。jQuery里的fire函数是什么意思，什么时候用？


##### 52.jQuery 是通过哪个方法和 Sizzle 选择器结合的？（jQuery.fn.find()进入Sizzle）


##### 53.针对 jQuery性能的优化方法？


##### 54.Jquery与jQuery UI有啥区别？


##### 55.JQuery的源码看过吗？能不能简单说一下它的实现原理？


##### 56.jquery 中如何将数组转化为json字符串，然后再转化回来？


##### 57.jQuery和Zepto的区别？各自的使用场景？


##### 58.针对 jQuery 的优化方法？


##### 59.Zepto的点透问题如何解决？


##### 60.jQueryUI如何自定义组件?


##### 61.需求：实现一个页面操作不会整页刷新的网站，并且能在浏览器前进、后退时正确响应。给出你的技术实现方案？


##### 62.如何判断当前脚本运行在浏览器还是node环境中？（阿里）


##### 63.移动端最小触控区域是多大？


##### 64.jQuery 的 slideUp动画 ，如果目标元素是被外部事件驱动, 当鼠标快速地连续触发外部元素事件, 动画会滞后的反复执行，该如何处理呢?


##### 65.把 Script 标签 放在页面的最底部的body封闭之前 和封闭之后有什么区别？浏览器会如何解析它们？


##### 66.移动端的点击事件的有延迟，时间是多久，为什么会有？ 怎么解决这个延时？（click 有 300ms 延迟,为了实现safari的双击事件的设计，浏览器要知道你是不是要双击操作。）


##### 67.知道各种JS框架(Angular, Backbone, Ember, React, Meteor, Knockout...)么? 能讲出他们各自的优点和缺点么?


##### 68.Underscore 对哪些 JS 原生对象进行了扩展以及提供了哪些好用的函数方法？


##### 69.解释JavaScript中的作用域与变量声明提升？


##### 70.那些操作会造成内存泄漏？


##### 71.JQuery一个对象可以同时绑定多个事件，这是如何实现的？


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


##### 82.What is a Polyfill?


##### 83.做的项目中，有没有用过或自己实现一些 polyfill 方案（兼容性处理方案）？


##### 84.我们给一个dom同时绑定两个点击事件，一个用捕获，一个用冒泡。会执行几次事件，会先执行冒泡还是捕获？
