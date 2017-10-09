#### 1.Django--高效的Web开发框架

models.py 文件主要用一个 Python 类来描述数据表。 称为 模型(model) 。 运用这个类，你可以通过简单的 Python 的代码来创建、检索、更新、删除 数据库中的记录而无需写一条又一条的SQL语句。

views.py文件包含了页面的业务逻辑。相应方法返回相应的html模版

urls.py 指出了什么样的 URL 调用什么的视图。

settings.py：
Django 提供了一种使用方便且功能强大的 API ，用于从磁盘中加载模板
settings.py就是该设置告诉 Django 的模板加载机制在哪里查找模板。 选择一个目录用于存放模板并将其添加到TEMPLATE_DIRS 中：
```
ps：在调试时改成本地的模版
ps：如果你的 TEMPLATE_DIRS只包含一个目录，别忘了在该目录后加上个逗号。以此消除与圆括号表达式之间的歧义。
TEMPLATE_DIRS = (
    '/home/django/mysite/templates',
)
```

**Django的模版**

避免html硬编码在视图中，产生了模版。
模板是一个文本，用于分离文档的表现形式和内容。 模板定义了占位符以及各种用于规范文档该如何显示的各部分基本逻辑（模板标签）。 模板通常用于产生HTML，但是Django的模板也能产生任何基于文本格式的文档。

1.基本的模板标签和过滤器

if-else标签
{% if %} 标签接受 and ， or 或者 not 关键字来对多个变量做判断 ，或者对变量取反（ not )
{% if %} 标签不允许在同一个标签中同时使用 and 和 or
```
{% if today_is_weekend %}
    <p>Welcome to the weekend!</p>
{% endif %}
```
系统不支持用圆括号来组合比较操作。 如果你确实需要用到圆括号来组合表达你的逻辑式，考虑将它移到模板之外处理，然后以模板变量的形式传入结果吧。 或者，仅仅用嵌套的{% if %}标签替换吧，就像这样：
```
{% if athlete_list %}
    {% if coach_list or cheerleader_list %}
        We have athletes, and either coaches or cheerleaders!
    {% endif %}
{% endif %}
```

for标签
```
<ul>
{% for athlete in athlete_list %}
    <li>{{ athlete.name }}</li>
{% endfor %}
</ul>
```

给标签增加一个 reversed 使得该列表被反向迭代：
```
{% for athlete in athlete_list reversed %}
...
{% endfor %}
```

检查是否为空
```
{% if athlete_list %}
    {% for athlete in athlete_list %}
        <p>{{ athlete.name }}</p>
    {% endfor %}
{% else %}
    <p>There are no athletes. Only computer programmers.</p>
{% endif %}
```
上述代码可能较为复杂，所以增加empty标签
```
{% for athlete in athlete_list %}
    <p>{{ athlete.name }}</p>
{% empty %}
    <p>There are no athletes. Only computer programmers.</p>
{% endfor %}
```

在每个`` {% for %}``循环里有一个称为`` forloop`` 的模板变量。这个变量有一些提示循环进度信息的属性。
forloop.counter 总是一个表示当前循环的执行次数的整数计数器。 这个计数器是从1开始的，所以在第一次循环时 forloop.counter 将会被设置为1。
```
{% for item in todo_list %}
    <p>{{ forloop.counter }}: {{ item }}</p>
{% endfor %}
```

{% ifequal %} 标签
比较两个值，当他们相等时，显示在 {% ifequal %} 和 {% endifequal %} 之中所有的值。
```
{% ifequal user currentuser %}
    <h1>Welcome!</h1>
{% endifequal %}
```

注释标签
```
单行注释
{# This is a comment #}
多行注释
{% comment %}
This is a
multi-line comment.
{% endcomment %}
```

过滤器
模板过滤器是在变量被显示前修改它的值的一个简单方法。 过滤器使用管道字符，如下所示：
```
{{ name|lower }}
显示的内容是变量 {{ name }} 被过滤器 lower 处理后的结果，它功能是转换文本为小写。

过滤管道可以被* 套接* ，既是说，一个过滤器管道的输出又可以作为下一个管道的输入，如此下去。 下面的例子实现查找列表的第一个元素并将其转化为大写。
{{ my_list|first|upper }}
```

2.模版加载

settings.py配置TEMPLATE_DIRS 设置后，下一步就是修改视图代码，返回模版

3.include 模板标签

 {% include %} 。该标签允许在（模板中）包含其它的模板的内容。 标签的参数是所要包含的模板名称，可以是一个变量，也可以是用单/双引号硬编码的字符串。 每当在多个模板中出现相同的代码时，就应该考虑是否要使用 {% include %} 来减少重复。

4.模版继承

本质上来说，模板继承就是先构造一个基础框架模板，而后在其子模板中对它所包含站点公用部分和定义块进行重载。
{% block %}  
所有的 {% block %} 标签告诉模板引擎，子模板可以重载这些部分。 每个{% block %}标签所要做的是告诉模板引擎，该模板下的这一块内容将有可能被子模板覆盖。
{% extends "base.html" %}
