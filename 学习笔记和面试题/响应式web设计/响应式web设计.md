#### 1.响应式元素及媒介
1.客户端依赖浏览器窗口的大小来呈现图像

**方法一：依赖客户端实现对大图像文件的缩放，可能会导致性能差**

准备代码：
```
<p class="text">erer sdg hgfgj</p>
<div class="img-wrap">
    <img src="robots.jpg" alt="" class="responsive">
    <p>erer sdg hgfgj</p>
</div>

<style>
/*但此时图片还是静态的，一直宽度不变,宽度都是图像本身的300px*/
    p.text{
        float: left;
        width: 60%;
    }
    div.img-wrap{
        float: right;
        width: 40%;
    }
```

实现方法：

```
/*可以适应浏览器的窗口的大小了*/
img.responsive{
    max-width: 100%;
    height: auto;
}
```

实现原理：

max-width是给元素设置了最大宽度.则表示不能超出父元素的宽度，当浏览器窗口变化时，图像会根据父元素相应改变填充的值。而height为auto则是保证图像自身的宽高比例缩放图像。

**方法二：服务器端根据客户的需求，返回恰当大小的图片文件**
#### 2.响应式字体
#### 3.响应式布局
#### 4.使用响应式框架
#### 5.设计移动设备优先的web应用
#### 6.优化响应式内容
#### 7.非侵入式javascript
