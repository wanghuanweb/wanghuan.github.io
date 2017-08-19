##### 31.全屏滚动的原理是什么？用到了CSS的那些属性？
##### 33.视差滚动效果，如何给每页做不同的动画？（回到顶部，向下滑动要再次出现，和只出现一次分别怎么做？）
##### 36.怎么让Chrome支持小于12px 的文字？
```
html{-webkit-text-size-adjust: none;}
```
##### 39.position:fixed;在android下无效怎么处理？
##### 42.overflow: scroll时不能平滑滚动的问题怎么处理？
```
//可以解决ios滑动不流畅的问题
html{-webkit-overflow-scrolling: touch;}
```
##### 45.什么是Cookie 隔离？（或者说：请求资源的时候不要让它带cookie怎么做）
如果静态文件都放在主域名下，那静态文件请求的时候都带有的cookie的数据提交给server的，非常浪费流量，
所以不如隔离开。

因为cookie有域的限制，因此不能跨域提交请求，故使用非主要域名的时候，请求头中就不会带有cookie数据，
这样可以降低请求头的大小，降低请求时间，从而达到降低整体请求延时的目的。

同时这种方式不会将cookie传入Web Server，也减少了Web Server对cookie的处理分析环节，
提高了webserver的http请求的解析速度。
你会如何解决特定浏览器的样式问题？
如何为有功能限制的浏览器提供网页？
你用过栅格系统 (grid system) 吗？如果使用过，你最喜欢哪种？
你熟悉 SVG 样式的书写吗？
如何优化网页的打印样式？
如果设计中使用了非标准的字体，你该如何去实现？
为什么响应式设计 (responsive design) 和自适应设计 (adaptive design) 不同？
