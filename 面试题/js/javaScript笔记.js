第一章：JavaScript介绍

  是一种跨平台、面向对象的轻量级的脚本语言，可用于web和HTML，可以运用于服务器、PC端、移动端。
  JavaScript语句向浏览器发出的命令，语句的作用是告诉浏览器该做什么。

  完整的 JavaScript 实现是由以下 3 个不同部分组成的：ECMAScript（是核心）、文档对象模型、浏览器对象模型
  ECMAScript 描述了该语言的语法和基本对象；(包含语法，类型，语句，关键字，保留字，操作符，对象)
  DOM 描述了处理网页内容的方法和接口，把整个页面映射为一个多层节点结构
  BOM 描述了与浏览器进行交互的方法和接口。

第二章：在HTML中使用javascript

  script：HTML中的脚本位于<script></script>标签之间，脚本放置在HTML页面中的<body>和<head>部分中，但是脚本通常放在<head>标签中，以不干扰页面内容
          浏览器遇到</script>会认为是结束标签，则需要加上转移字符“\”解决问题
          属性src，包含要执行代码的外部文件
          属性type，text/javascript
          属性defer，脚本可以延迟到文档完全被解析和显示之后在执行（延迟脚本）
          属性async，立即下载脚本，但不妨碍页面中的其他操作
第三章：基本概念（语法，数据类型，流控制语句，函数）ECMAScript

  JavaScript语法
  标识符，关键字，大小写敏感，忽略多余的空格，
  JavaScript注释
  // 单行注释
  /*多行注释*/
  JavaScript变量
    数组通过中括号书写，和java等不同
    变量的声明（三种方法）：
    1.通过关键字var: var arr=["ww","qq","wwwfv","fwew"]; 可以用来声明局部和全局变量
      document.write(arr[1]);
    2.直接赋值，eg:x=42;这样就声明了全局变量，但是js编译时会产生一个严格警告
    3.使用关键字let,let y=13,用来声明语句块代码那段的局部变量
  JavaScript常量（constants）
    可以用关键字const声明，一个只读的常量，常量不可以通过赋值改变，也不可以在脚本运行时候重新声明。
  ECMAScript数据类型(和引用类型对比)
    5 种基本数据类型：
      Undefined：这个值未定义；var声明变量但是没有初始化则变量值就是undefined
      Null：
      Boolean：这个值是布尔值
      Number：值是数值；0在数字前是八进制，0x在数字前是十六进制，浮点计算会有些许误差
      String：值是字符串
    1 种复杂数据类型：
      Object：值是对象或空
    ECMAScript无重载
第四章：变量、作用域和内存问题
  变量：包含基本类型值（boolean/number/string/null/undefined）和引用类型值(操作对象的引用)
      ps:string在很多其他语言是以对象的形式表示，操作对象的引用，但ECMAScript不是如此。


第五章：引用类型(Object、Array、Data、RegExp、Function、基本包装类型、单体内置对象)

5.1 Object类型
  创建Object实例有两种方法：
  1. 使用new操作符+Object构造函数
     var person = new Object();
     person.name="wanghuan";
     person.age=23;
  2. 使用对象字面量方法
    var person = {
      name :"wanghuan",(ps:用逗号)
      age :23
    };
  访问对象属性的方法：
  1.点表示法 2.方括号语法

5.2 Array类型（目测是ECMAScript最常用的类型）
  1. 检测数组
    value instanceof Array---但若在两个以上不同的全局执行环境下，会存在两个以上版本的Array构造函数，当一个框架向另外一个框架传入数组时，传入的数组和第二个框架中原生创建的数组分别具有不同的构造函数，从而会出错。
    Array.isArray(value)---这个是ECMAScript5新增的方法，此方法目的是最终确定某个值是否为数组，不管是在哪个全局执行环境中创建
  2. 转换方法
    toString(),valueOf(),toLocaleString()
    var colors=["red","blue","green"];
    alert(colors.toString());
    alert(colors.valueOf());
    alert(colors);
  3. 栈方法
    栈是后进先出的数据结构，栈中项的插入和弹出都在栈的顶部。用push()和pop()
    push():此方法接收任意数目的参数，将它们逐个添加到数组末尾，返回修改后的数组的长度。
    pop():此方法从数组末尾移除最后一项，减少数组的长度，然后返回移除的项。
    var colors = new Array();
    var count = colors.push("red","green");//count=2
    var item = colors.pop();//item=green
  4. 队列方法
    队列是先进先出。用push()和shift()
    shift():此方法从数组对头移除最后一项，减少数组的长度，然后返回移除的项。
    因此，unshift()和pop()可以从相反的队列来模拟队列
  5. 重排序方法（important）
    sort()和reverse()
    var values=[0,1,5,10,15];
    alert(values.sort());//0，1，10，15，5是排序结果
    sort()排序先调用toString()转型方法，然后比较字符串进行排序，数字排序应该写成
    function compare(a,b){
      return a-b;//返回升序序列
      retyrn b-a;//返回降序序列
    }
    var values = [0,1,5,10,15];
    alert(values.sort(compare));
  6. 操作方法
    concat();slice();splice();
  7. 位置方法
    indexOf();lastIndexOf();
    二者都返回查找的项在数组中的位置；
    接收参数：1. 要查找的项 2. 查找起点位置的索引（可选）
  8. 迭代方法：
    这几个方法都接收两个参数（1. 要在每一项上运行的函数 2. 运行该函数的作用域对象（可选））
    传入这些方法中的函数会接收三个参数：数组项的值，该项在数组中的位置，数组对象本身
    every():对数组中的每一项运行给定函数，若该函数对每一项都返回true，则返回true
    some():对数组中的每一项运行给定函数，若该函数对某一项返回true，则返回true
    forEach():对数组中的每一项运行给定函数，这个方法没有返回值
    filter():对数组中的每一项运行给定函数，返回该函数会返回true的项组成的数组
    map():对数组中的每一项运行给定函数，返回每次函数调用的结果组成的数组
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
  9. 归并方法
    EMCAScript5新添了reduce()和reduceRight()两个方法都迭代数组中所有的项，然后构建一个最终返回的值。reduce()从第一项遍历到最后，reduceRight()从最后一项遍历到第一项
    这2个方法都接收两个参数（1. 要在每一项上调用的函数 2. 作为归并基础的初始值（可选））
    传入这些方法中的函数会接收四个参数：前一个值，当前值，项的索引和数组对象
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
5.3 Date类型

5.4 RegExp类型--支持正则表达式
    一个正则表达式就是一个模式 + 3 个标志的组合体。---g,i,m三个标志（全局模式，不缺分大小写模式，多行模式）
    定义：var expression = /pattern/flags;
    字面量定义：var pattern1 = /[bc]at/i;和 构造函数定义：var pattern1 = new RegExp("[bc]at","i");
    attention：构造函数创造正则对象的时候，需要常规的字符转移规则（在前面加反斜杠\）
    1. RegExp属性--这几个属性在正则表达式中可以获取，其实没多大必要
      1. global 表示是否设置了g标志
      2. ignoreCase 表示是否设置了i标志
      3. multiline 表示是否设置了m标志
      4. lastIndex 表示开始搜索下一个匹配项的字符位置，从0算起
      5. source 正则表达式的字符串表示，按照字面量模式返回而非传入构造函数的字符串模式返回。(important)
      eg： var pattern1 = new RegExp("\\[bc\\]at","i");
           alert(pattern1.source);//"\[bc\]at"
    2.  RegExp方法
      1. exec()方法
         --接收一个参数，就是应用模式的字符串
         --返回包含第一个匹配项信息的数组(包含index匹配项在字符串中的位置和input应用正则表达式的字符串)，或者在没有匹配项的情况下返回null
         --此数组的第 0 个元素是与正则表达式相匹配的文本，第 1 个元素是与 RegExpObject 的第 1 个子表达式相匹配的文本（如果有的话），
           第 2 个元素是与 RegExpObject 的第 2 个子表达式相匹配的文本（如果有的话），以此类推。
           eg:
           var text = "mom and dad and baby";
           var pattern = /mom( and dad ( and baby)?)?/gi;

           var match = pattern.exec(text);
           alert(match.index);//0
           alert(match.input);//"mom and dad and baby"
           alert(match[0]);//"mom and dad and baby"
           alert(match[1]);//"and dad and baby"
           alert(match[2]);//"and baby"
        --exec()属性就算是设置了g标志，每次也就返回一个匹配项。
        --但是在不设置g标志的情况下，同个字符串上调用exec()始终返回第一个匹配项的信息。设置全局标志g情况下，每次调用exec()会返回一个新的匹配项的信息。
          eg：
              var text = "cat pat fat";
              var pattern = /.at/;
              var match = pattern.exec(text);
              alert(match.index);//0
              alert(match.input);//cat pat fat
              alert(match[0]);//cat
              alert(pattern.lastIndex);//0

              var match = pattern.exec(text);
              alert(match.index);//0
              alert(match.input);//cat pat fat
              alert(match[0]);//cat
              alert(pattern.lastIndex);//0
           eg：
             var text = "cat pat fat";
             var pattern = /.at/g;
             var match = pattern.exec(text);
             alert(match.index);//0
             alert(match.input);//cat pat fat
             alert(match[0]);//cat
             alert(pattern.lastIndex);//3

             var match = pattern.exec(text);
             alert(match.index);//4
             alert(match.input);//cat pat fat
             alert(match[0]);//pat
             alert(pattern.lastIndex);//7
      2. text()方法
            --搜索字符串指定的值，根据结果并返回真或假。
            var str = 'runoob';
            var patt1 = new RegExp('\\w', 'g'); // 有转义作为正则表达式处理
            var patt2 = new RegExp('\w', 'g');  // 无转义作为字符串处理
            var patt3 =/\w+/g;  // 与 patt1 效果相同

            document.write(patt1.test(str)) //输出 true
            document.write("<br>")

            document.write(patt2.test(str)) //输出 false
            document.write("<br>")

            document.write(patt3.test(str)) //输出 true
5.5 Function类型
    ECMAScript最有意思的就是函数了，因为在ECMAScript中函数也是对象。每个函数都是Function类型的实例，并且都与其他引用类型一样具有属性和方法。
    函数定义方法：
    1. 函数声明语法定义
      function sum(num1,num2){
        return num1 + num2;
      }
    2. 定义变量sum让其初始化成一个函数
      var sum = function(num1,num2) {
        return num1 + num2;
      };//注意有分号，因为这是相当于一个变量的定义
    3. 使用Function构造函数定义函数//不推荐使用
      var sum = new Function("num1","num2","return num1+num2");
    此时，深入理解一下js函数没有重载的原因：
        Java：通过方法签名来唯一确定一个方法。所谓方法签名包括：方法名、参数类型和参数顺序、参数个数这几个要素。
        所以，如果两个方法名称相同，但是只要其他要素(例如参数类型、参数个数)不同，编译器就会认为是不同方法。从而可以存在同名的不同方法，导致了重载现象。
        JavaScript：js中的函数是作为一个特殊对象类型存在的，函数的名字只是一个普通的变量，先后定义的两个同名函数，
        实际上相当于两个函数对象绑定到了同一个变量上，后者肯定是会覆盖前者的，自然不会共存，也不会重载。
        function box(num, a){
           return  num + a + 100;
        }
        function box(num){
           return  num + 200;
        }
       alert(box(50,1));   //结果显示250,而不是151
       因为上述代码相当于：
       var sum = function box(num, a){
          return  num + a + 100;
       };
       sum = function box(num){
          return  num + 200;
       };
      alert(sum);   //结果显示250,而不是151
    作为值的函数：--因为EMCAScript中函数名本身就是变量，所以函数也可以当做值来使用。



5.6 基本包装类型

5.7 单体内置对象


第六章：面向对象的程序设计

创建对象的模式：
  ECMAScript支持面向对象编程，但不使用类或者接口。对象可以在代码执行过程中创建和增强，因此具有动态性而非严格定义的实体。
  在没有类的情况下，可以采用下列模式在创建对象。
  1. 工厂模式
    工厂模式的问题：虽然解决了多个相似对象的问题，但却没有解决对象识别的问题。
    发明了一种函数，用函数来封装以特定接口创建对象的细节。
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
  2. 构造函数模式
    优点：自定义的构造函数意味着将来可以把它的实例标识为一种特定的类型，这正是构造函数模式胜过工厂模式的地方。
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
    缺点：构造函数主要问题就是每个方法都要在每个实例上重新创建一遍，这种方法创建函数，会导致不同的作用域链和标识符解析。
    因此，用
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
    问题：1. 全局作用域定义的函数每次被一个对象调用，全局作用域不是名副其实
          2. 对象需要定义很多方法，要是全部都定义成全局函数，自定义的引用类型就丝毫无封装性可言。
  3. 原型模式
    创建的每个函数都有一个prototype(原型)属性，这个属性是一个指针，指向一个对象。
    每次读取某个对象的某个属性的时候，需要执行搜索：
    1. 搜索实例本身，








JavaScript的语法
JavaScript的语法
  JavaScript中任何类型和字符串相加都是转换成字符串类型
  举例：var i = 5;var j = "5";var m = i+j;则m输出为55
        var i = 5;var j = "5"; i==j为真,i===j为false，因为===需要满足类型也想通（类似有！=和！==）
  方法：无参数function 函数名(){}
        有参数function 函数名(a,b){}js中是弱类型语言，不需要声明类型
        有返回值function 函数名(a,b){return;}
  调用方法：
    1.在<script>标签中调用
    2.在HTML文件中调用
  异常：
    异常：执行js代码的时候，发生错误，就会导致程序停止运行称为异常；
    异常抛出：异常产生，将这个异常生成一个错误信息；
    异常捕获：
    try{
      发生异常的代码块
    }catch(err){
      错误信息处理
    }
    throw 语句：创建一个自定义错误
事件：
    onClick  单击事件
    onMouseOver 鼠标经过事件
    onMouseOut  鼠标移出事件
    onChange    文本内容改变事件
    onSelect    文本框选中事件
    onFouse     光标聚集事件
    onBlur      移动光标事件
    onLoad      网页加载事件
    onUnload    关闭网页事件
js DOM(document object model)文档对象模型
    DOM简介：
        1. 网页被加载时，浏览器会创建页面的文档对象模型（即DOM），
        2. DOM可以以一种独立于平台和语言的方式访问和修改一个文档的内容和结构，换句话说，这是表示和处理一个HTML或XML文档的常用方法
        3.通过 JavaScript，您可以重构整个 HTML 文档。您可以添加、移除、改变或重排页面上的项目。
        要改变页面的某个东西，JavaScript 就需要获得对 HTML 文档中所有元素进行访问的入口。这个入口通过文档对象模型来获得的（DOM）。
    DOM操作HTML（4个方面）：
        1.js 能够改变页面中的所有HTML元素
            通过id或者公共标签名找到HTML元素，innerHTML改变HTML内容
            var nv=document.getElementById("pid");
            nv.innerHTML="change";
        2.js 能够改变页面中的所有HTML属性
            document.getElementById("pid").href="http://www.jikexueyuan.com";
        3.js 能够改变页面中的所有CSS属性
            document.getElementById("pid").style.color="";
        4.js 能够对页面中的所有事件做出反应
    DOM操作class：
    DOMEventListener：
        方法：addEventListener()用于向指定元素添加事件句柄
              removeEventListener()移除方法添加的事件句柄
        document.getElementById("myBtn").addEventListener("click", function(){
      	   document.getElementById("demo").innerHTML = "Hello World";});
           程序员可以自己选择绑定事件时采用事件捕获还是事件冒泡，方法就是绑定事件时通过addEventListener函数，
           它有三个参数，第三个参数若是true，则表示采用事件捕获，若是false，则表示采用事件冒泡。
           addEventListener('click',doSomething2,true)；true=捕获；false=冒泡
js事件详解：
  事件流：描述的是在页面中接受事件的顺序；同时支持两种事件模型：捕获型事件和冒泡型事件
  事件冒泡：由最具体的元素接收，然后逐级向上传播至最不具体的元素的节点；事件按照从最特定的事件目标到最不特定的事件目标(document对象)的顺序触发。
  事件捕获：最不具体的节点先接收事件，而最具体的节点应该是最后接收事件；事件从最不精确的对象(document 对象)开始触发，然后到最精确(也可以在窗口级别捕获事件，不过必须由开发人员特别指定)。
  事件处理：
    1.HTML事件处理（直接添加到HTML结构中）--当函数名称改变的时候，就需要调用处也修改，多次修改比较麻烦
    2.DOM0级事件处理（把一个函数赋值给一个事件处理程序属性）but1.onclick=function(){};,
       优点：DOM0级事件，html代码和js代码的耦合性已经大大降低;缺点：多次定义会被覆盖掉
    3.DOM2级事件处理（addEventListener和removeEventListener）不会覆盖，在添加删除事件处理的时候，这种方法更直接，也最简便。
          btn1.addEventListener("click",demo1);
          btn2.addEventListener("click",demo2);
          function demo1(){
            alert("1");
          }
          function demo2(){
            alert("2");
          }
    4.IE事件处理程序（attachEvent和detachEvent）（如果浏览器不支持 addEventListener() 方法, 你可以使用 attachEvent() 方法替代。）
          var x = document.getElementById("myBtn");
          if (x.addEventListener) {                    //所有主流浏览器，除了 IE 8 及更早 IE版本
          x.addEventListener("click", myFunction);
          } else if (x.attachEvent) {                  // IE 8 及更早 IE 版本
          x.attachEvent("onclick", myFunction);
          }
  事件对象：触发DOM事件的时候都会产生一个对象
  事件对象event有很多属性和方法可以使用，比如：
    1.type获取事件类型
        document.getElementById('btn').addEventListener("mouseover",myfunction);
        function myfunction(event){
          alert(event.type);//则alert出mouseover
          alert(event.target);//事件目标是button
          event.stopPropagation();//阻止事件冒泡
        }
    2.target获取事件目标
    3.stopPropagation()阻止事件冒泡
    4.preventDafault()阻止事件默认行为

js内置的对象和相应的属性和方法（String，Math 等对象）
自定义对象：
  1.定义并创建对象实例和使用
    people = new Object();
    people.name = "ww";
    people.age = 18;
    或者 people = {name:"wewe",age:"30"}
  2.使用函数来定义对象，然后创建新的对象实例
    function people(name,age){
      this.name = name;
      this.age = age;
    }
    son =new people("we","18");
    document.write("name:"+son.name+"age:"+son.age);
内置对象：String 对象，Date 对象，Math 对象，Array 对象
    访问对象属性：objectName.propertyName
    var message="Hello World!";
    var x=message.length;
    访问对象方法：objectName.methodName()
    var message="Hello world!";
    var x=message.toUpperCase();
    var date = new Date();document.write(date);
js浏览器对象模型BOM（Browser Object Model）
  1.window对象
    window 对象是BOM的核心，window 对象指当前的浏览器窗口
    所有js全局对象、函数以及变量都会自动成为window对象的成员
    全局变量是window对象的属性，全局函数是window对象的方法
    甚至HTML DOM的document也是window对象的属性之一----所以也可以写成window.document.write();
    window尺寸：window.innerHeight;window.innerWidth;浏览器窗口内部高度和内部宽度
    window.open() - 打开新窗口
    window.close() - 关闭当前窗口
    window.moveTo() - 移动当前窗口
    window.resizeTo() - 调整当前窗口的尺寸
  2.计时器js Timing
    计时事件：通过使用 JavaScript，我们有能力做到在一个设定的时间间隔之后来执行代码，而不是在函数被调用后立即执行。我们称之为计时事件。
    <p id="showtime"></p>
    <script>
        var t = setInterval(function(){
          var date = new Date();
          document.getElementById("showtime").innerHTML = date;
        },1000)
    </script>
  3.History对象 wimdow.history对象包含浏览器的历史url的集合
    history.back() 方法加载历史列表中的前一个 URL
    history forward() 方法加载历史列表中的下一个 URL,这与在浏览器中点击前进按钮是相同的：
    history.go(-1/1);进入历史中的某个页面
  4.Location对象
    window.location 对象用于获得当前页面的地址 (URL)，并把浏览器重定向到新的页面。
    •location.hostname 返回 web 主机的域名
    •location.pathname 返回当前页面的路径和文件名
    •location.port 返回 web 主机的端口 （80 或 443）
    •location.protocol 返回所使用的 web 协议（http:// 或 https://）
    •location.assign() 方法加载新的文档。

  5.Screen对象,对象包含有关用户屏幕的信息。
    •screen.availWidth - 可用的屏幕宽度
    •screen.availHeight - 可用的屏幕高度







































Node.js
1.认识Node.js
2.Node.js和JavaScript的关系
3.Node.js的特点
