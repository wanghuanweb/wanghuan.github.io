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

#### 4.vue的组件

Vue.js的组件的使用有3个步骤：创建／注册／使用组件
1.创建组件构造器Vue.extend、创建的是一个组件构造器，不是一个具体的组件实例。
2.注册组件Vue.component，需要提供2个参数，第1个参数时组件的标签，第2个参数是组件构造器。
3.使用组件，将组件挂载在某个Vue实例下，否则它不会生效。也就是不挂载某个元素，组件就不会生效

总共以下三种方法
1.使用vue.extend，vue.component
2.使用vue.component语法糖
3.使用template标签

**创建组件**--vue-extend

Vue.extend方法格式如下：

```
var MyComponent = Vue.extend({
    // 选项...后面再介绍
})
```

**注册组件**--vue-component

如果想要其他地方使用这个创建的组件，还得个组件命个名：

Vue.component('my-component', MyComponent)
命名之后即可在HTML标签中使用这个组件名称，像使用DOM元素一样。下面来看看一个完整的组件注册和使用例子。

**全局使用组件**

命名之后即可在HTML标签中使用这个组件名称，像使用DOM元素一样。下面来看看一个完整的组件注册和使用例子。


```
<div id="example">
    <my-component></my-component>
</div>

var MyComponent = Vue.extend({
    template: '<div>A custom component!</div>'
})

// 注册，要确保在初始化根实例 之前 注册了组件。也就是在下边new之前注册组件
Vue.component('my-component', MyComponent)
或者可以如下，则不需要分别用extend和component
Vue.component('my-component', {
    template: '<div>A custom component!</div>'
})


// 创建根实例
new Vue({
    el: '#example'
})
```

//输出结果：

<div id="example">
    <div>A custom component!</div>
</div>

**局部注册组件**

--如上是全局注册
不必在全局注册每个组件。通过使用组件实例选项注册，可以使组件仅在另一个实例/组件的作用域中可用：

```
<div id="app">
    <!-- 3. my-component只能在#app下使用-->
    <my-component></my-component>
</div>

var myComponent = Vue.extend({
   template: '<div>This is my first component!</div>'
})

new Vue({
   el: '#app',
   components: {
       // 2. 将myComponent组件注册到Vue实例下
       'my-component' : myComponent
   }
});
```

**父组件和子组件**

ps:子组件只能在父组件的template中使用。

我们分几个步骤来理解这段代码：
1.定义一了个childComponent组件构造器
2.定义一个parentComponent组件构造器，将Child组件注册到Parent组件，并将Child组件的标签设置为child-component。在Parent组件内以标签的形式使用Child组件。
3.全局注册Parent组件
4.在页面中使用<parent-component>标签渲染Parent组件的内容，同时Child组件的内容也被渲染出来

```
<div id="app">
    <parent-component></parent-component>
</div>

var childComponent = Vue.extend({
    template:'<div>this is child</div>'
    });
var parentComponent = Vue.extend({
    // 在Parent组件内使用<child-component>标签
    template:'<div>this is parent</div><child-component></child-component>'
    components:{
        'child-component':childComponent
    }
    });
Vue.component('parent-component',parentComponent);
new Vue({
    el:'#app'
    });
```

错误用法：
```
<div id="app">
    <parent-component>
        <child-component></child-component>
    </parent-component>
</div>
或者
<div id="app">
    <parent-component>
    </parent-component>
    <child-component>
    </child-component>
</div>
```

都不可以，因为当子组件注册到父组件时，Vue.js会编译好父组件的模板，模板的内容已经决定了父组件将要渲染的HTML。
<parent-component>…</parent-component>相当于运行时，它的一些子标签只会被当作普通的HTML来执行，<child-component></child-component>不是标准的HTML标签，会被浏览器直接忽视掉。

**组件注册语法糖**

--以上组件注册的方式有些繁琐，Vue.js为了简化这个过程，提供了注册语法糖。使用Vue.component()直接创建和注册组件。

使用Vue.component()直接创建和注册组件：

```
// 全局注册，my-component1是标签名称
Vue.component('my-component1',{
    template: '<div>This is the first component!</div>'
})

var vm1 = new Vue({
    el: '#app1'
})
```
--Vue.component()的第1个参数是标签名称，第2个参数是一个选项对象，使用选项对象的template属性定义组件模板。
使用这种方式，Vue在背后会自动地调用Vue.extend()。

**使用<template>标签**

```
<div id="app">
   <my-component></my-component>
</div>

<template id="myComponent">
   <div>This is a component!</div>
</template>

Vue.component('my-component',{
    template: '#myComponent'
})

new Vue({
    el: '#app'
})
```

**组件中的参数**

通过Vue构造器传入的各种选项大多数都可以在组件里用。 data 是一个例外，它必须是函数。
ps:
data
--必须是函数，这是跟创建vue实例不同的地方。如果data选项指向某个对象，这意味着所有的组件实例共用一个data。
我们应当使用一个函数作为 data 选项，让这个函数返回一个新对象

```
<div id="example-2">
  <simple-counter></simple-counter>
  <simple-counter></simple-counter>
  <simple-counter></simple-counter>
</div>

var data = { counter: 0 }
Vue.component('simple-counter', {
  template: '<button v-on:click="counter += 1">{{ counter }}</button>',
  // 技术上 data 的确是一个函数了，因此 Vue 不会警告，
  // 但是我们返回给每个组件的实例的却引用了同一个data对象
  data: function () {
    return data
  }
  //正确写法
  data: function () {
    return {
      counter: 0
    }
  }
})
new Vue({
  el: '#example-2'
})
```

**构成组件（父组件和子组件）**

编译作用域：
这段代码定义了一个my-component组件，<my-component><my-component>不是标准的HTML元素，浏览器是不理解这个元素的。
那么Vue是如何让浏览器理解<my-component><my-component>标签的呢？
在创建一个Vue实例时，除了将它挂载到某个HTML元素下，还要编译组件，将组件转换为HTML片段。
除此之外，Vue实例还会识别其所挂载的元素下的<my-component>标签，然后将<my-component>标签替换为HTML片段。

Vue.js组件的API来源于三部分——prop，slot和事件。

prop 允许外部环境传递数据给组件；
事件 允许组件触发外部环境的 action；
slot 允许外部环境插入内容到组件的视图结构内。

**父子组件**

--props父组件传输到子组件
父组件通过props向下传递数据--当父组件的属性变化时，将传导给子组件，但是不会反过来。这是为了防止子组件无意修改了父组件的状态
1.html中父组件调用子组件，使用v-bind绑定两个相关特性（-那种方式）
2.html中子组件定义props用驼峰式。
ps：可以使用.sync显式地指定双向绑定，这使得子组件的数据修改会回传给父组件。可以使用.once显式地指定单次绑定，单次绑定

--slot父子组件模版混合
slot混合父组件和子组件的模版

--父子组件之间的访问
父组件访问子组件：使用$children或$refs
子组件访问父组件：使用$parent
子组件访问根组件：使用$root

--通过事件通信
使用 $on() 监听事件；
使用 $emit() 在它上面触发事件；
使用 $dispatch() 派发事件，事件沿着父链冒泡；
使用 $broadcast() 广播事件，事件向下传导给所有的后代。

**父组件通过props将数据传递给子组件**

```
<div id="app">
    <table>
        <tr>
            <th colspan="3">父组件数据</th>
        </tr>
        <tr>
            <td>name</td>
            <td>{{name}}</td>
            <td><input type="text" v-model="name"></td>
        </tr>
        <tr>
            <td>age</td>
            <td>{{age}}</td>
            <td><input type="text" v-model="age"></td>
        </tr>
    </table>
    /*在子组件中定义prop时，使用了camelCase命名法。由于HTML特性不区分大小写，camelCase的prop用于特性时，需要转为 kebab-case（短横线隔开）。例如，在prop中定义的myName，在用作特性时需要转换为my-name。*/
    <my-component v-bind:my-name="name" v-bind:my-age="age"></my-component>
</div>

<template id="myComponent">
    <table>
        <tr>
            <th colspan="3">子组件数据</th>
        </tr>
        <tr>
            <td>name</td>
            <td>{{myName}}</td>
            <td><input type="text" v-model="myName"></td>
        </tr>
        <tr>
            <td>age</td>
            <td>{{myAge}}</td>
            <td><input type="text" v-model="myAge"></td>
        </tr>
    </table>
</template>

var vm = new Vue({
    el: '#app',
    data: {
        name: 'keepfool',
        age: 28
    },
    components: {
        'my-component': {
            template: '#myComponent',
            props: ['myName', 'myAge']
        }
    }
})
```
可以使用.sync显式地指定双向绑定，这使得子组件的数据修改会回传给父组件。：
<my-component v-bind:my-name.sync="name" v-bind:my-age.sync="age"></my-component>

可以使用.once显式地指定单次绑定，单次绑定在建立之后不会同步之后的变化，这意味着即使父组件修改了数据，也不会传导给子组件。
<my-component v-bind:my-name.once="name" v-bind:my-age.once="age"></my-component>

**slot分发内容（组合组件）**--混合父组件和子组件的模版

1.单个Slot

为了让组件可以组合，我们需要一种方式来混合父组件的内容与子组件自己的模板。这个过程被称为内容分发

```
<div id="app">
    <my-component>
        <h1>hello</h1>
    </my-component>

    <my-component>
    </my-component>
</div>
<template id="myComponent">
    <div class="content">
        <h2>this is a component</h2>
        <slot>分发内容</slot>
        <p>nothing</p>
    </div>
</template>
Vue.component("my-component",{
    template:"#myComponent"
    });
new Vue({
    el:"#app",

    })

//运行结果
this is a component
hello
nothing

this is a component
分发内容
nothing
```

ps：编译作用域
父组件模板的内容在父组件作用域内编译；子组件模板的内容在子组件作用域内编译。
eg：
```
<child-component>
  {{ message }}-----message 应该绑定到父组件的数据，而不是绑定到子组件的数据
</child-component>
```
类似地，分发内容是在父作用域内编译。

2.指定名称的slot

eg：多个slot一起使用时，会非常有用。例如，对话框是HTML常用的一种交互方式。
在不同的运用场景下，对话框的头部、主体内容、底部可能是不一样的。

```
<div id="app">
    <modal-dialog v-bind:show.sync="show">

        <header class="dialog-header" slot="header">
            <h1 class="dialog-title">提示信息</h1>
        </header>

        <div class="dialog-body" slot="body">
            <p>你想在对话框中放什么内容都可以！</p>
            <p>你可以放一段文字，也可以放一些表单，或者是一些图片。</p>
        </div>

        <footer class="dialog-footer" slot="footer">
            <button class="btn" @click="closeDialog">关闭</button>
        </footer>
    </modal-dialog>

    <button class="btn btn-open" @click="openDialog">打开对话框</button>
</div>
/*
虽然我们在modal-dialog组件中定义了3个slot，但是在页面中使用它时，并不用每次都指定这3个slot。
比如，有时候我们可能只需要header和body：

<modal-dialog v-bind:show.sync="show" v-bind:class="dialogClass">
    <header class="dialog-header" slot="header">
        <h1 class="dialog-title">提示信息</h1>
    </header>

    <div class="dialog-body" slot="body">
        <p>你想在对话框中放什么内容都可以！</p>
        <p>你可以放一段文字，也可以放一些表单，或者是一些图片。</p>
    </div>
</modal-dialog>
*/
<template id="dialog-template">
    <div class="dialogs">
        <div class="dialog" v-bind:class="{'dialog-active':show}">
            <div class="dialog-content">
                <div class="close rotate">
                    <span class="iconfont icon-close" @click="close"></span>
                    <slot name="header"></slot>
                    <slot name="body"></slot>
                    <slot name="footer"></slot>
                </div>
            </div>
        </div>
    </div>
</template>

Vue.component('modal-dialog',{
    template:'#dialog-template',
    props:['show'],
    methods:{
        close:function(){
            this.show = false;
        }
    }
})
new Vue({
    el:'#app',
    data:{
        show:false
    },
    methods:{
        openDialog:function(){
            this.show = true
        },
        closeDialog:function(){
            this.show = false;
        }
    }
})
```

**父子组件之间的访问**

有时候我们需要父组件访问子组件，子组件访问父组件，或者是子组件访问根组件。
针对这几种情况，Vue.js都提供了相应的API：

父组件访问子组件：使用$children或$refs
子组件访问父组件：使用$parent
子组件访问根组件：使用$root

$children:
```
<div id="app">
    <parent-component></parent-component>
</div>

<template id="parent-component">
    <child-component1></child-component1>
    <child-component2></child-component2>
    <button v-on:click="showChildComponentData">显示子组件的数据</button>
</template>

<template id="child-component1">
    <h2>This is child component 1</h2>
</template>

<template id="child-component2">
    <h2>This is child component 2</h2>
</template>

Vue.component('parent-component', {
    template: '#parent-component',
    components: {
        'child-component1': {
            template: '#child-component1',
            data: function() {
                return {
                    msg: 'child component 111111'
                }
            }
        },
        'child-component2': {
            template: '#child-component2',
            data: function() {
                return {
                    msg: 'child component 222222'
                }
            }
        }
    },
    methods: {
        showChildComponentData: function() {
            for (var i = 0; i < this.$children.length; i++) {
                alert(this.$children[i].msg)
            }
        }
    }
})

new Vue({
    el: '#app'
})
```

$refs:
组件个数较多时，我们难以记住各个组件的顺序和位置，通过序号访问子组件不是很方便。
在子组件上使用v-ref指令，可以给子组件指定一个索引ID：
```
<template id="parent-component">
    <child-component1 v-ref:cc1></child-component1>
    <child-component2 v-ref:cc2></child-component2>
    <button v-on:click="showChildComponentData">显示子组件的数据</button>
</template>
//在父组件中，则通过$refs.索引ID访问子组件的实例：
showChildComponentData: function() {
    alert(this.$refs.cc1.msg);
    alert(this.$refs.cc2.msg);
}
```

$parent:
下面这段代码定义了两个组件：child-component和它的父组件parent-component。
在子组件中，通过this.$parent可以访问到父组件的实例。
```
<div id="app">
    <parent-component></parent-component>
</div>
<template id="parent-component">
    <child-component></child-component>
</template>
<template id="child-component">
    <h2>this is a child component</h2>
    <button v-on:click="showParentComponentData"></button>
</template>

Vue.component('parent-component', {
    template: '#parent-component',
    components: {
        'child-component': {
            template: '#child-component',
            methods:{
                showParentComponentData:function(){
                    alert(this.$parent.msg)
                }
            }
        }
    },
    data:function(){
        return{
            msg:'parent component message'
        }
    }
})

new Vue({
    el: '#app'
})
```

**自定义事件在父子组件传输数据**

使用 $on() 监听事件；
使用 $emit() 在它上面触发事件；
使用 $dispatch() 派发事件，事件沿着父链冒泡；
使用 $broadcast() 广播事件，事件向下传导给所有的后代。

$on监听当前实例上的自定义事件
$emit触发当前实例上的事件。--子组件通过$emit触发父组件的事件，$emit后面的参数是向父组件传参

```
<body>
    <div id="counter-event-example">
      <p>{{ total }}</p>
      //监听事件
      <button-counter v-on:ee="incrementTotal"></button-counter>
      <button-counter v-on:ee="incrementTotal"></button-counter>
    </div>

    <script>
        Vue.component('button-counter', {
          template: '<button v-on:click="increment">{{ counter }}</button>',
          data: function () {
            return {
              counter: 0
            }
          },
          methods: {
            increment: function () {
              this.counter += 1
              //出发父元素的事件
              this.$emit('ee', 'cc' )
            }
          },
        })
        new Vue({
          el: '#counter-event-example',
          data: {
            total: 'arg'
          },
          methods: {
            incrementTotal: function (b) {
              this.total  = b + '1';
            }
          }
        })
    </script>
</body>
```

使用 $dispatch() 派发事件，事件沿着父链冒泡；
1.子组件的button元素绑定了click事件，该事件指向一个方法
2.子组件的该方法在处理时，调用了$dispatch，将事件派发到父组件的某事件，并给该事件提供参数
3.父组件的events选项中定义某事件，父组件接收到子组件的派发后，调用该事件。
```
<div id="app">
    <p>messages:{{messages}}</p
    <child-component></child-component>
</div>
<template id="child-component">
    <input v-model="msg">
    <button v-on:click="notify">dispatch event</button>
</template>

Vue.component('child-component',{
    template:'#child-component',
    data:function(){
        return{
            msg:''
        }
    }
    methods:{
        notify:function(){
            if(this.msg.trim()){
                this.$dispatch('child-msg',this.msg)
                this.msg = ''
            }
        }
    }
    })
new Vue({
    el:"#app"
    data:{
        messages:[]
    },
    events:{
        'child-msg':function(msg){
            this.messages.push(msg)
        }
    }
    })
```

使用 $broadcast() 广播事件，事件向下传导给所有的后代。
1.父组件的button元素绑定了click事件，该事件指向某方法
2.父组件的该方法在处理时，调用了$broadcast，将事件派发到子组件的某事件，并给该事件提供了一参数
3.子组件的events选项中定义了该事件，子组件接收到父组件的广播后，调用parent-msg事件。
```
<div id="app">
    <input v-model="msg">
    <button v-on:click="notify">broadcast event</button>
    <child-component></child-component>
</div>
<template id="child-component">
    <ul>
        <li v-for="item in messages">
            父元素录入了信息：{{item}}
        </li>
    </ul>
</template>

Vue.component('child-component',{
    template:'#child-component',
    data:function(){
        return{
            messages:[]
        }
    }
    events:{
        'parent-msg':function(msg){
            this.messages.push(msg)
        }
    }
})
new Vue({
    el:"#app"
    data:{
        messages:[]
    },
    methods:{
        notify:function(){
            if(this.msg.trim()){
                this.$broadcast('parent-msg',this.msg)
            }
        }
    }
    })
```
#### 5.vue--基于$.ajax实现数据的跨域增删查改

#### 6.vue-router
