##### 77.前端templating(Mustache, underscore, handlebars)是干嘛的, 怎么用?
##### 78.简述一下 Handlebars 的基本用法？
##### 79.简述一下 Handlerbars 的对模板的基本处理流程， 如何编译的？如何缓存的？

**前端模板的作用**

模板就是包含占位符的的字符串，根据不同结构数据相同的html结构，达到DOM和数据分离。

1.模板其实是一个包含特定占位符的普通字符串
2.根据不同数据，重复生成相同html结构，节省代码
3.数据和DOM结构分离

**用过的前端模板**

mustache和handlers


**不依赖库实现前端模板**(正则表达式+DOM的innerHTML)

其实就是通过字符串的代换来实现的，其实就是用正则表达式替换和利用DOM元素的innerHTML属性实现。

```
//定义HTML模板
var template = "<p>Name:<a href=\"mailto{{email}}">{{firstName}}{{lastName}}</a>
<br>Company:{{company}}</p>
<p>City:{{city}}</p>";

//定义两个数据对象
var me = {
    firstName:"Huan",
    lastName:"Wang",
    email:"1937484159@qq.com",
    compamy:"MT",
    city:"XC"
},
bill = {
    firstName:"Peng",
    lastName:"Z",
    email:"1937484159@qq.com",
    compamy:"MT",
    city:"XC"
};
//正则表达式+DOM将数据应用到模板
function applyDataToTemplate(templateString,dataObject){
    var key,
        regex,
        value;

    for(key in dataObject){
        regex = new RegExp("{{"+key+"}}","g");
        value = dataObject[key];
        templateString = templateString.replace(regex,value);
    }
    return templateString;
}
//随后调用函数，然后innerHTML
```

**mustache.js**

1.Mustache.render(tpl, data)方法是用于渲染输出最终的 HTML 代码。
2.语法
变量{{}}
小节{{#}}{{/}}--条件小节，迭代小节，函数小节
小节{{#}}{{/}}{{^}}{{/}}反义小节
注释{{!}}开发的注释，但内容不会被输出到结果字符串中
局部模板{{>}}

```
<script type="text/javascript" src="mustache.js"></script>
<script type="text/javascript">
var data = {
    "company": "Apple",
    "address": {
        "street": "1 Infinite Loop Cupertino</br>",
        "city": "California ",
        "state": "CA ",
        "zip": "95014 "
    },
    "product": ["Macbook ","iPhone ","iPod ","iPad "]
}

var tpl = '<h1>Hello {{company}}</h1>';
var html = Mustache.render(tpl, data);

console.log( html )
</script>
//运行后 Console 输出：
<h1>Hello Apple</h1>
```

**handlerbar**--Handlebars.compile()，Handlerbar的表达式，路径，自定义helper

1.Handlebars.compile()--将模板编译成函数，向生成的函数传递数据，渲染模板

```
var source = "<p>Hello, my name is {{name}}. I am from {{hometown}}. I have " +
             "{{kids.length}} kids:</p>" +
             "<ul>{{#kids}}<li>{{name}} is {{age}}</li>{{/kids}}</ul>";
var template = Handlebars.compile(source);
var data = { "name": "Alan",
            "hometown": "Somewhere, TX",
             "kids": [{"name": "Jimmy", "age": "12"}, {"name": "Sally", "age": "4"}]};
var result = template(data);
```

2.Handlebar的表达式--块级表达式，内置块表达式

块级表达式：

```
<ul>
{{#programme}}
<li>{{language}}</li>
{{/programme}}
</ul>
//数据
{
    programme:[
        {language:"JS"},
        {language:"HTML"},
        {language:"CSS"}
    ]
}
//渲染后
<ul>  
  <li>JS</li>
  <li>HTML</li>
  <li>CSS</li>
</ul>
```

内置块表达式：

each block helper
你可以使用内置的{{#each}} helper遍历列表块内容，用this来引用遍历的元素
```
<ul>
{{#each name}}
    <li>{{this}}</li>
{{/each}}
</ul>
//数据
{
    name:["html","css","js"]
}
```

if-else block helper
{{#if}}就你使用JavaScript一样，你可以指定条件渲染DOM，如果它的参数返回false，undefined, null, "" 或者 [] (a "falsy" value),
Handlebar将不会渲染DOM，如果存在{{#else}}则执行{{#else}}后面的渲染
```
{{#if list}}
<ul id="list">  
    {{#each list}}
        <li>{{this}}</li>
    {{/each}}
</ul>  
{{else}}
    <p>{{error}}</p>
{{/if}}

{  
    list:['HTML5','CSS3',"WebGL"],
    "error":"数据取出错误"
}
```

unless block helper
{{#unless}}这个语法是反向的if语法也就是当判断的值为false时他会渲染DOM
```
{{#unless data}}
<ul id="list">  
    {{#each list}}
        <li>{{this}}</li>
    {{/each}}
</ul>  
{{else}}
    <p>{{error}}</p>
{{/unless}}
```

with block helper
使用with的方法，我们可以将context转移到数据的一个section里面（如果你的数据包含section）。
```
<div class="entry">  
  <h1>{{title}}</h1>
  {{#with author}}
  <h2>By {{firstName}} {{lastName}}</h2>
  {{/with}}
</div>  

{
  title: "My first post!",
  author: {
    firstName: "Charles",
    lastName: "Jolley"
  }
}
```

3.访问路径

Handlebar支持路径和mustache,Handlebar还支持嵌套的路径，使得能够查找嵌套低于当前上下文的属性
可以通过.来访问属性也可以使用../,来访问父级属性。
```
<h1>{{author.id}}</h1>  

{
  title: "My First Blog Post!",
  author: {
    id: 47,
    name: "Yehuda Katz"
  },
  body: "My first post. Wheeeee!"
 };
//or
 {{#with person}}
    <h1>{{../company.name}}</h1>
{{/with}}

{
    "person":
    { "name": "Alan" },
        company:
    {"name": "Rad, Inc." }
};
```

4.自定义helper

Handlebars，可以从任何上下文可以访问在一个模板，你可以使用Handlebars.registerHelper()方法来注册一个helper。
