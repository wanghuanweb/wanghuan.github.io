#### 1.生命周期

Vue 实例有一个完整的生命周期，也就是实例从创建到销毁就是生命周期。
也就是从开始创建、初始化数据(data)、编译模板(template)、挂载Dom(el)→渲染、更新→渲染、卸载等一系列过程，我们称这是 Vue 的生命周期。

#### 2.生命周期钩子

在Vue的整个生命周期中，它提供了一些生命周期钩子，给了我们执行自定义逻辑的机会。
所谓“生命周期”，就是在类实例化的过程中，构造函数执行的不同阶段。
“钩子”就是在某个阶段给你一个做某些处理的机会。

```
<!DOCTYPE html>
<html>
    <head>
        <title></title>
        <script type="text/javascript" src="https://cdn.jsdelivr.net/vue/2.1.3/vue.js"></script>
    </head>
    <body>

    <div id="app">
         <p>{{ message }}</p>
    </div>

    <script type="text/javascript">

      var app = new Vue({
          el: '#app',
          data: {
              message : "xuxiao is boy"
          },
           beforeCreate: function () {
                    console.group('beforeCreate 创建前状态===============》');
                   console.log("%c%s", "color:red" , "el     : " + this.$el); //undefined
                   console.log("%c%s", "color:red","data   : " + this.$data); //undefined
                   console.log("%c%s", "color:red","message: " + this.message)  
            },
            created: function () {
                console.group('created 创建完毕状态===============》');
                console.log("%c%s", "color:red","el     : " + this.$el); //undefined
                   console.log("%c%s", "color:red","data   : " + this.$data); //已被初始化
                   console.log("%c%s", "color:red","message: " + this.message); //已被初始化
            },
            beforeMount: function () {
                console.group('beforeMount 挂载前状态===============》');
                console.log("%c%s", "color:red","el     : " + (this.$el)); //已被初始化
                console.log(this.$el);
                   console.log("%c%s", "color:red","data   : " + this.$data); //已被初始化  
                   console.log("%c%s", "color:red","message: " + this.message); //已被初始化  
            },
            mounted: function () {
                console.group('mounted 挂载结束状态===============》');
                console.log("%c%s", "color:red","el     : " + this.$el); //已被初始化
                console.log(this.$el);    
                   console.log("%c%s", "color:red","data   : " + this.$data); //已被初始化
                   console.log("%c%s", "color:red","message: " + this.message); //已被初始化
            },
            beforeUpdate: function () {
                console.group('beforeUpdate 更新前状态===============》');
                console.log("%c%s", "color:red","el     : " + this.$el);
                console.log(this.$el);   
                   console.log("%c%s", "color:red","data   : " + this.$data);
                   console.log("%c%s", "color:red","message: " + this.message);
            },
            updated: function () {
                console.group('updated 更新完成状态===============》');
                console.log("%c%s", "color:red","el     : " + this.$el);
                console.log(this.$el);
                   console.log("%c%s", "color:red","data   : " + this.$data);
                   console.log("%c%s", "color:red","message: " + this.message);
            },
            beforeDestroy: function () {
                console.group('beforeDestroy 销毁前状态===============》');
                console.log("%c%s", "color:red","el     : " + this.$el);
                console.log(this.$el);    
                   console.log("%c%s", "color:red","data   : " + this.$data);
                   console.log("%c%s", "color:red","message: " + this.message);
            },
            destroyed: function () {
                console.group('destroyed 销毁完成状态===============》');
                console.log("%c%s", "color:red","el     : " + this.$el);
                console.log(this.$el);  
                   console.log("%c%s", "color:red","data   : " + this.$data);
                   console.log("%c%s", "color:red","message: " + this.message)
            }
        })
    </script>
    </body>
</html>
```
第一次页面加载时
触发了 beforeCreate, created, beforeMount, mounted 这几个钩子，data 数据在 created 中可获取到。

再去 console.log('mounted: ', document.getElementsByTagName('p')[0]) ，DOM 渲染在 mounted 中已经
完成。

我们再试着去更改 input 输入框中的内容，可以看到输入框上方的数据同步发生改变，这就是数据绑定的效果，在更新数据时触发 beforeUpdate 和 updated 钩子，且在 beforeUpdate 触发时，数据已更新完毕。

#### 3.生命周期钩子的一些使用方法：

beforecreate : 可以在这加个loading事件，在加载实例时触发
created : 初始化完成时的事件写在这里，如在这结束loading事件，异步请求也适宜在这里调用
mounted : 挂载元素，获取到DOM节点
updated : 如果对数据统一处理，在这里写上相应函数
beforeDestroy : 可以做一个确认停止事件的确认框
nextTick : 更新数据后立即操作dom
