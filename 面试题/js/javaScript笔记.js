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
