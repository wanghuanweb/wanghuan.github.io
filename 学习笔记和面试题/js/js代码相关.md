#### 1.What is the result of this expression? (or multiple ones)     
题目：
```
[typeof null, null instanceof Object]
```
答案：
```
["object",false]
```
解析：

 **ES的基本数据类型** 有Undefined，Null，Boolean，Number，String

 **ES的复杂数据类型**  有Object。

 **typeof操作符**是检测数据类型：

返回值："undefined","boolean","number","string","object","function"
null是空对象的引用，所以typeof null是object，同样

**MDN上讲解：**

![这里写图片描述](http://img.blog.csdn.net/20160511105052978)

**需要注意的是：**

字符串字面量和直接调用String()方法（不使用new调用构造函数）的结果是原始字符串typeof是string，但是字符串对象的typeof是object，当然其他基本包装类型Number和Boolean也是一样的。
```
typeof new Boolean(true) === 'object';
typeof new Number(1) ==== 'object';
typeof new String("abc") === 'object';

typeof "" === 'string';
typeof "bla" === 'string';
typeof (typeof 1) === 'string'; // typeof返回的肯定是一个字符串
typeof String("abc") === 'string'; // 不要这样使用!
```
**typeof可以用来检查一个没有声明的变量，而不报错**

```
v
// ReferenceError: v is not defined
typeof v
// "undefined"
```
上面代码中，变量v没有用var命令声明，直接使用就会报错。但是，放在typeof后面，就不报错了，而是返回undefined。
实际编程中，这个特点通常用在判断语句

```
// 错误的写法
if (v) {
  // ...
}
// ReferenceError: v is not defined

// 正确的写法
if (typeof v === "undefined") {
  // ...
}
```

**instanceof**
用来判断某个构造函数的prototype属性所指向的對象是否存在于另外一个要检测对象的原型链上
而null instanceof 任何类型 都是false
#### 2.What is the result of this expression? (or multiple ones)

```
var val = 'smtg';
console.log('Value is ' + (val === 'smtg') ? 'Something' : 'Nothing');
```

```
Something
```
解析：
注意运算符的优先级，+的优先级高于?
![这里写图片描述](http://img.blog.csdn.net/20160511100049252)
#### 3.What is the result of this expression? (or multiple ones)
题目：
```
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

```
var name = 'World!';
(function () {
	var name;
    if (typeof name === 'undefined') {
        name = 'Jack';
        console.log('Goodbye ' + name);
    } else {
        console.log('Hello ' + name);
    }
})();
```
则答案是Goodbye Jack
#### 4.What is the result of this expression? (or multiple ones)
几个js数值范围的题目
题目：
```          
var END = Math.pow(2, 53);
var START = END - 100;
var count = 0;
for (var i = START; i <= END; i++) {
    count++;
}
console.log(count);
Goodbye Jack
```
答案：永远陷入无限循环
解析：
js的最大数是2^53,则2^53+1还是2^53，所以for会陷入无限循环
题目：

```
What is the result of this expression? (or multiple ones)


var a = 111111111111111110000,
    b = 1111;
a + b;
```
答案：111111111111111110000

解析：
由于JavaScript实际上只有一种数字形式IEEE 754标准的64位双精度浮点数，其所能表示的整数范围为-2^53~2^53(包括边界值)。这里的111111111111111110000已经超过了2^53次方，所以会发生精度丢失的情况。


#### 5.What is the result of this expression? (or multiple ones)
几个关于数组的题目
数组基本知识
http://blog.csdn.net/github_34514750/article/details/51049935
题目：
```     
var ary = [0,1,2];
ary[10] = 10;
ary.filter(function(x) { return x === undefined;}
```
答案：

```
是[]，而不是[7*undefined]
```
解析：

```
var ary = [0,1,2];
ary[10] = 10;
console.log(ary);//[0, 1, 2, 10: 10]长度是11
console.log(ary[4]);//undefined
缺省元素是不能调用filter的，所以答案是[]
```
题目：
```
["1", "2", "3"].map(parseInt)
```
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
题目：

```
[ [3,2,1].reduce(Math.pow), [].reduce(Math.pow) ]
```

答案：an error
解析：
可先了解reduce的基础知识
 [3,2,1].reduce(Math.pow)值是9，但是reduce在数组为空且没有定义initialValue时，会抛出错误，如chrome下：TypeError: Reduce of empty array with no initial value
题目：

```
What is the result of this expression? (or multiple ones)

var ary = Array(3);
ary[0]=2
ary.map(function(elem) { return '1'; });

```

答案：["1"]

解析：
map在使用的时候，只有数组中被初始化过元素才会被触发
#### 6.What is the result of this expression? (or multiple ones)

题目
```
var two   = 0.2
var one   = 0.1
var eight = 0.8
var six   = 0.6
[two - one == one, eight - six == two]
```
答案

```
[true,false]
```
解析：浮点数计算时的精度丢失问题，其他语言也会出现chrome中计算出来的结果：[0.1, 0.20000000000000007]，也就是[true, false]

#### 7.What is the result of this expression? (or multiple ones)
题目：
```
What is the result of this expression? (or multiple ones)


function showCase(value) {
    switch(value) {
    case 'A':
        console.log('Case A');
        break;
    case 'B':
        console.log('Case B');
        break;
    case undefined:
        console.log('undefined');
        break;
    default:
        console.log('Do not know!');
    }
}
showCase(new String('A'));
```
答案：Do not know!
解析：
new String('A')的typeof是Object（可看第一题解析）

`console.log(new String('A'))`结果就是一个object对象
`String {0: "A", length: 1, [[PrimitiveValue]]: "A"}`
题目：

```
What is the result of this expression? (or multiple ones)


function showCase2(value) {
    switch(value) {
    case 'A':
        console.log('Case A');
        break;
    case 'B':
        console.log('Case B');
        break;
    case undefined:
        console.log('undefined');
        break;
    default:
        console.log('Do not know!');
    }
}
showCase2(String('A'));
```
答案：Case A
解析：
`String('A')的typeof是string`（可看第一题解析）

`console.log(String('A'))`结果就是string对象，就是A

#### 8.What is the result of this expression? (or multiple ones)
几个类型转换的题目：
题目：

```
What is the result of this expression? (or multiple ones)


function isOdd(num) {
    return num % 2 == 1;
}
function isEven(num) {
    return num % 2 == 0;
}
function isSane(num) {
    return isEven(num) || isOdd(num);
}
var values = [7, 4, '13', -9, Infinity];
values.map(isSane);
```

答案：[true,true,true,false,false]
解析：
'13'在进行计算前则会进行隐式类型转换,转换为数字，所以结果为13 % 2 ，也就是true
而JS中负数取模的结果是负数，这里-9%2的结果实际上是-1，所以为false
而Infinity对任意数取模都是NaN，所以是false
类型转换参考：http://www.cnblogs.com/mizzle/archive/2011/08/12/2135885.htmle
题目：

```
[]==[]
```
答案：
false
解析：
这是隐式类型转换，如果两个操作值都是对象，则比较它们是不是指向同一个对象
题目：
```
'5' + 3
'5' - 3
```
答案："53", 2
解析：看上述连接知识点
题目：

```
What is the result of this expression? (or multiple ones)


var a = [0];
if ([0]) {
  console.log(a == true);
} else {
  console.log("wut");
}

```
答案：false
解析：
相等操作符会对操作值进行隐式转换，如果一个操作值为布尔值，则在比较之前先将其转换为数值，因此true为1，如果一个操作值是对象，另一个不是，则调用对象的valueOf()方法，因为a为0，得到的结果按照前面的规则进行比较，则为false

#### 9.What is the result of this expression? (or multiple ones)
题目：

```  
parseInt(3, 8)
parseInt(3, 2)
parseInt(3, 0)
```
答案：

```
[3,NaN,3]
```
解析：

```
参考MDN文章：https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/parseInt
另外，出现的数字不符合后面输入的进制，则为NaN，所以第二个值为NaN。而radix为0时的情况默认为10，所以结果为3
```

#### 10.What is the result of this expression? (or multiple ones)
题目：

```
What is the result of this expression? (or multiple ones)

Array.isArray( Array.prototype )
```
答案：true
解析：见MDN
https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/prototype
#### 11.What is the result of this expression? (or multiple ones)
题目：
```
function sidEffecting(ary) {
  ary[0] = ary[2];
}
function bar(a,b,c) {
  c = 10
  sidEffecting(arguments);
  return a + b + c;
}
bar(1,1,1)
```
答案：21
解析：
函数内部的arguments维护着传递到这个函数的参数列表。它看起来是一个数组，但实际上它只是一个有length属性的Object，不从Array.prototype继承。所以无法使用一些Array.prototype的方法。
参考链接：
http://bonsaiden.github.io/JavaScript-Garden/zh/#function.arguments


#### 12.What is the result of this expression? (or multiple ones)
题目：

```
3.toString()
3..toString()
3...toString()
```
答案： error, “3”, error
解析：
虽然JavaScript会在调用方法时对原始值进行包装，但是这个点是小数点呢、还是方法调用的点呢，于是乎第一个就是error了，因为JavaScript解释器会将其认为是小数点。
而第二个则很好说通了，第一个点解释为小数点，变成了(3.0).toString()，结果就是”3”
第三个也是，第一个点为小数点，第二个是方法调用的点，但是后面接的不是一个合法的方法名，于是乎就error了
#### 13.What is the result of this expression? (or multiple ones)
题目：

```
(function(){
  var x = y = 1;
})();
console.log(y);
console.log(x);
```
答案：1, error
解析：
变量提升和隐式定义全局变量，x变量提升但是函数局部变量，隐式定义了y这个全局变量
#### 14.What is the result of this expression? (or multiple ones)
题目：

```
var a = /123/,
    b = /123/;
a == b
a === b
```
答案：false, false
解析：
console.log(typeof /123/);是object，正则表达式是对象，所以==左右两边是对象时，是判断二者是否指向同一个对象，则是false
#### 15.What is the result of this expression? (or multiple ones)
题目：
```
var a = [1, 2, 3],
    b = [1, 2, 3],
    c = [1, 2, 4]
a == b
a === b
a > c
a < c
```
答案：false, false, false, true
解析：
typeof a和b都是object，所以前两个也是false，而JavaScript中Array的’>’运算符和’<’运算符的比较方式类似于字符串比较字典序，会从第一个元素开始进行比较，如果一样比较第二个，还一样就比较第三个，如此类推，所以第三个结果为false，第四个为true。
####16.What is the result of this expression? (or multiple ones)
几个原型链的题目
题目：
```
var a = {}, b = Object.prototype;
[a.prototype === b, Object.getPrototypeOf(a) === b]
```
答案：
false，true
解析：
**原型链：**
构造函数：有一个指向原型对象的指针prototype
原型对象：有一个指向构造函数的指针constructor
实例：有一个指向原型对象的内部指针[[prototype]]
a是对象实例，有内部指针[[prototype]]，但是没有指针prototype
实例和原型之间，实例中无法访问[[prototype]]，一般确定实例和原型之间确定关系是用：isPrototypeOf()和getPrototypeOf()
题目：

```
function f() {}
var a = f.prototype, b = Object.getPrototypeOf(f);
a === b
```
答案：
false
解析：
Object.getPrototypeOf(f)是找到f.[[prototye]],和f.prototype不同，因此是false

#### 17.What is the result of this expression? (or multiple ones)

```
function A(){}
A.prototype = {}
console.log(new A().constructor)
//输出：function Object() { [native code] }

var tmp = new A();
console.log(tmp.__proto__.hasOwnProperty("constructor"));
//输出：false
console.log(tmp.__proto__.__proto__.hasOwnProperty("constructor"));
//输出：true
```

问题：foo的值是什么？

var foo = 10 + '20';
问题：如何实现以下函数？

add(2, 5); // 7
add(2)(5); // 7
问题：下面的语句的返回值是什么？

"i'm a lasagna hog".split("").reverse().join("");
问题：window.foo的值是什么？

( window.foo || ( window.foo = "bar" ) );
问题：下面两个 alert 的结果是什么？

var foo = "Hello";
(function() {
  var bar = " World";
  alert(foo + bar);
})();
alert(foo + bar);
问题：foo.length的值是什么？

var foo = [];
foo.push(1);
foo.push(2);
问题：foo.x的值是什么？

var foo = {n: 1};
var bar = foo;
foo.x = foo = {n: 2};
问题：下面代码的输出是什么？

console.log('one');
setTimeout(function() {
  console.log('two');
}, 0);
console.log('three');

#### 18.What is the result of this expression? (or multiple ones)

```
//做对了
if (!("a" in window)) {
    var a = 1;
}
alert(a); // undefined 1.声明提升但是赋值不提升--其实就是进入上下文的时候创建变量对象VO里已经有了：函数的所有形参、所有的函数声明、所有的变量声明 2.所有的全局变量都是window的属性
```

#### 19.What is the result of this expression? (or multiple ones)
```
//做对了
var a = 1,
    b = function a(x) {
        x && a(--x);
    };
alert(a); //1
//这个函数其实是一个有名函数表达式，函数表达式不像函数声明一样可以覆盖变量声明，但你可以注意到，变量b是包含了该函数表达式，而该函数表达式的名字是a；不同的浏览器对a这个名词处理有点不一样，在IE里，会将a认为函数声明，所以它被变量初始化覆盖了，就是说如果调用a(--x)的话就会出错，而其它浏览器在允许在函数内部调用a(--x)，因为这时候a在函数外面依然是数字。基本上，IE里调用b(2)的时候会出错，但其它浏览器则返回undefined。

就相当于
var a = 1,
    b = function(x) {
        x && b(--x);
    };
alert(a);
```

#### 20.What is the result of this expression? (or multiple ones)

```
//做对了
function a(x) {
    return x * 2;
}
var a;
alert(a); //function a(x) {return x * 2;}

```

#### 21.What is the result of this expression? (or multiple ones)

```
//做对了
function b(x, y, a) {
    alert(b.length);//3
    alert(arguments.length);//2
    arguments[2] = 10;
    alert(a); //undefined
    alert(arguments[2]);//10
}
b(1, 2);
```

活动上下文AO是进入函数上下文时候被创建
AO = {
  arguments: <ArgO>
};

Arguments对象是活动对象的一个属性，它包括如下属性：
callee — 指向当前函数的引用
length — **真正传递的参数个数**
properties-indexes (字符串类型的整数) 属性的值就是函数的参数值(按参数列表从左到右排列)。 properties-indexes内部元素的个数等于arguments.length. properties-indexes 的值和实际传递进来的参数之间是共享的。

#### 22.What is the result of this expression? (or multiple ones)

```
//做对了,注意this指向什么就可以了，在知识点19中
function a() {
    alert(this);
}
a.call(null); //window
```

##### 23.["1", "2", "3"].map(parseInt) 答案是多少？

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

##### 24.[1,2,3,4,5].duplicator(); // [1,2,3,4,5,1,2,3,4,5]

##### 25.请实现一个遍历至 100 的 for loop 循环，在能被 3 整除时输出 "fizz"，在能被 5 整除时输出 "buzz"，在能同时被 3 和 5 整除时输出 "fizzbuzz"。
##### 26.

```
var foo = {  
  bar: function() { return this.baz; },  
  baz: 1
};

(function(){  
  return typeof arguments[0]();
})(foo.bar);

答案： "undefined"
```
虽然 foo.bar 传递给了函数，但是真正执行的时候，函数 bar 的上下文环境是 arguments ，并不是 foo
arguemnts[0] 可以理解为 arguments.0（不过写代码就不要这样了，语法会错误的），所以这样看来，上下文环境是 arguemnts 就没问题了,所以在执行baz的时候自然this就是window了,window 上没有baz属性,返回的就是undefined, typeof调用的话就转换成"undefined"了

##### 27.
```
var f = (function f(){ return "1"; }, function g(){ return 2; })();
typeof f;

答案 "number"
```

逗号操作符的使用可以很混淆，但这段说明它的行为:
var x = (1, 2, 3);
x;

x的值是3,这表明，当你有一系列的组合在一起，并由逗号分隔的表达式，它们从左到右进行计算，但只有最后一个表达式的结果保存。由于同样的原因，这个问题可以改写为减少混乱：

var f = (function g(){ return 2; })();
typeof f;

##### 28.
```
<script>
    var m= 1, j = k = 0;
    function add(n) {
        return n = n+1;
　 }
    y = add(m);
    function add(n) {
        return n = n + 3;
    }
z = add(m);
</script>
//y和z都是4，因为函数表达式和函数声明有区别，函数声明FD在进入上下文阶段创建，在代码执行阶段就已经可用了
  函数表达式则是在代码执行阶段创建，也就是函数声明有提升
```

##### 29.

function g(){ return 23; }是函数表达式,事实上只有事一个名字,不是一个函数声明
会说g未被定义
```
var f = function g(){ return 23; };
typeof g();//会报错
```

下面代码不报错
```
function g(){ return 23; };
    console.log(typeof g());//number
```

##### 30.

因为函数f不是函数声明，他在if中，所以是true。因为函数声明只能存在于函数或者全局中，不能在block中
```
var x = 1;
  if (function f(){}) {
    x += typeof f;
  }
  x;//1undefined
```

##### 31.

```
var x = [typeof x, typeof y][1];
typeof typeof x;
```

这题目比较简单,注意下返回类型即可
x = [,][1];
即 x = typeof y = 'undefind'.
typeof 返回的是string类型就可以了
typeof typeof必然就是'string'了.

##### 32.

```
function(foo){
  return typeof foo.bar;
})({ foo: { bar: 1 } });

答案 "undefined"
{ foo: { bar: 1 }}对象中只有foo属性，没有bar属性
```

##### 33.|| 和 $$

||运算符
1、只要“||”前面为false,不管“||”后面是true还是false，都返回“||”后面的值。

2、只要“||”前面为true,不管“||”后面是true还是false，都返回“||”前面的值。

$$运算符
1、只要“&&”前面是false，无论“&&”后面是true还是false，结果都将返“&&”前面的值;

2、只要“&&”前面是true，无论“&&”后面是true还是false，结果都将返“&&”后面的值;
```
alert(1&&2);//2
```

##### 34.

```
function A() {

}
function B(a){
    this.a = a;
}
function C(a)
{
    if (a) {
        this.a = a;
}}
A.prototype.a = 1;
B.prototype.a = 1;
C.prototype.a = 1;
console.log(new A());
console.log(new B());
console.log(new C(2));
```

index.html:26 A __proto__: Object
index.html:27 B a: undefined__proto__: Object
index.html:28 C a: 2__proto__: Object

##### 35.

```
function Foo() {
    var i = 0;
    return function() {
        console.log(i++);
    }
}

var f1 = Foo(),
    f2 = Foo();
f1();
f1();
f2();// 0 1 0
```
调用Food()的时候会生成一个新的作用域s1， 返回的内部函数f1使s1保持不被销毁。
再次调用Food()，又生成一个作用域s2，返回的内部函数f2使其不被销毁。
运行两次f1()会使作用域s1中的i增加，变成2， 打印结果是0, 1
运行一次f2()会使作用域s2中的i增加，变成1，打印结果是0
也就是说f1和f2是两个闭包，其实是互不关联的,并不是指向同一个引用，故f1的状态不影响f2的状态

```
var i = 0;
function Foo() {
return function() {
    console.log(i++);
}
}

var f1 = Foo(),
f2 = Foo();
f1();
f1();
f2();//0 1 2
```
把i定义在函数外部，那么f1,f2之间的i就会有关联


```
var i = 0;
function Foo() {
return function() {
    console.log(i++);
}
}

var f1=Foo();
f2 = f1;
f1();
f1();
f2();//0 1 2
```
这样f1,f2都是指向同一个引用，i也会是相同的。
