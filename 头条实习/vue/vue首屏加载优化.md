#### 1.后端渲染

django是直接把html页面嵌套在视图函数中返回给浏览器
```
def share_live(request, room_id=0, **kwargs):

return get_html_response(request,"template/neihan_reflow_new/page/reflow-living-page/reflow-living-page.html", data)
```

https://juejin.im/entry/595c466e5188250d9e652771
https://segmentfault.com/a/1190000009352506
https://github.com/camsong/blog/issues/8
https://segmentfault.com/a/1190000004135256
https://segmentfault.com/a/1190000004120539
https://segmentfault.com/a/1190000004094442
https://medium.freecodecamp.org/heres-why-client-side-rendering-won-46a349fadb52
http://www.cnblogs.com/rubylouvre/p/4128500.html
