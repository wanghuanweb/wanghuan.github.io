#### 0.指令--特殊的html特性

Vue.js的指令是以v-开头的，它们作用于HTML元素，指令提供了一些特殊的特性，将指令绑定在元素上时，指令会为绑定的目标元素添加一些特殊的行为，我们可以将指令看作特殊的HTML特性（attribute）。
v-if指令
v-show指令
v-else指令
v-for指令
v-bind指令：中间放一个冒号隔开，这个参数通常是HTML元素的特性（attribute），例如：v-bind:class。v-bind指令可以缩写为一个冒号
v-on指令：v-on指令用于给监听DOM事件，它的用语法和v-bind是类似的，例如监听<a>元素的点击事件。v-on指令可以缩写为@符号。
v-model指令：表单控件元素双向绑定数据，在view和model之间同步数据。同步用户的输入的数据到vue实例data属性中。
v-ref：父组件上注册一个子组件的索引，便于直接访问。可以通过父组件的$refs访问子组件
v-el：为DOM元素注册一个索引，可以听过所属实例的$els访问这个元素

model-view-viewmodel
1.是以数据为驱动的，Vue自身将DOM和数据进行绑定，一旦创建绑定，DOM和数据将保持同步，每当数据发生变化，DOM会跟着变化。  
2.ViewModel是Vue的核心，它是Vue的一个实例。Vue实例时作用域某个HTML元素上的，这个HTML元素可以是body，也可以是某个id所指代的元素。
3.DOM Listeners和Data Bindings是实现双向绑定的关键。
DOM Listeners监听页面所有View层DOM元素的变化，当发生变化，Model层的数据随之变化
Data Bindings监听Model层的数据，当数据发生变化，View层的DOM元素随之变化。

v-model中select对应option的value值
v-model修饰指令总共有三种：
lazy：在change事件中去同步
debounce：设置延时同步
number：传给后端类型必须是number时，会在用户输入到同步到model中被转换为数值类型

```
<select v-model="bizline">
    <option v-for="option in options" :value="option.value">
        {{option.text}}
    </option>
</select>
<span>bizline:{{bizline}}</span>

new Vue({
    el:'',
    data:{
        bizline:'flash',
        options:{
            {text:'快车',value:'flash'},
            {text:'专车',value:'premium'},
            {text:'巴士',value:'bus'},
        }
    }
    })
```

#### 1.vue双向绑定的原理

DOM Listeners和Data Bindings是实现双向绑定的关键。

DOM Listeners监听页面所有View层DOM元素的变化，当发生变化，Model层的数据随之变化
Data Bindings监听Model层的数据，当数据发生变化，View层的DOM元素随之变化。

vue.js 则是采用数据劫持结合发布者-订阅者模式的方式来实现数据的双向绑定
1.数据监听其实就是通过Object.defineProperty()来劫持各个属性的setter和getter
2.在数据变动时会调用object.defineProperty()的set方法，监听到数据变动的时候，发布消息给订阅者，触发相应的监听回调。
3.对于dom节点，添加相应的监听数据的订阅者，一旦数据发生变化，收到通知，则更新视图。
4.视图交互变化(input) ，监听change事件， 数据model变更的双向绑定效果。

```
//一个特别简单的双向绑定问题
var obj = {};
Object.defineProperty(obj,'hello',{
    set:function(newVal){
        document.getElementById('a').value = newVal;
        document.getElementById('b').innerHTML = newVal;
    }
});
document.addEventListener("keyup",function(a){
    obj.hello = e.target.value;
});
```
https://segmentfault.com/a/1190000006599500
http://www.cnblogs.com/kidney/p/6052935.html?utm_source=gold_browser_extension

#### 2.生命周期和生命周期钩子

**生命周期**

Vue 实例有一个完整的生命周期，也就是实例从创建到销毁就是生命周期。
也就是从开始创建、初始化数据(data)、编译模板(template)、挂载Dom(el)→渲染、更新→渲染、卸载等一系列过程，我们称这是 Vue 的生命周期。

**生命周期钩子**

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

**生命周期钩子的使用方法**

beforeCreate:--实例new Vue()初始化，但是data和事件未初始化。
这样用：可以在这加个loading事件，在加载实例时触发

created:--数据data，计算属性compute，watch，methods被初始化，但挂载阶段没开始，$el 属性目前不可见
这样用：初始化完成时的事件写在这里，如在这结束loading事件，异步请求也适宜在这里调用（之前文件上传那个例子vue+iview）

beforeMount:
在挂载开始之前被调用：相关的 render 函数首次被调用。

mounted :
el被新创建的vm.$el替换，并挂载到实例上去之后调用该钩子。
这样用：挂载元素，获取到DOM节点

beforeUpdated :
数据更新时调用，发生在虚拟 DOM 重新渲染和打补丁之前。
你可以在这个钩子中进一步地更改状态，这不会触发附加的重渲染过程。

updated :（一般应该使用计算属性或者watcher取而代之）
由于数据更改导致的虚拟 DOM 重新渲染和打补丁，在这之后会调用该钩子。
当这个钩子被调用时，组件 DOM 已经更新，所以你现在可以执行依赖于 DOM 的操作。然而在大多数情况下，你应该避免在此期间更改状态。如果要相应状态改变，通常最好使用计算属性或 watcher 取而代之。
这样用：如果对数据统一处理，在这里写上相应函数

beforeDestroy :
可以做一个确认停止事件的确认框

destroyed：
Vue 实例销毁后调用。调用后，Vue 实例指示的所有东西都会解绑定，所有的事件监听器会被移除，所有的子实例也会被销毁。

nextTick : 更新数据后立即操作dom

#### 3.计算属性和watch

选项：data／props／propsData／computed／methods／watch

computed：计算属性的结果会被缓存，除非依赖的响应式属性变化才会重新计算

watch：一个对象，键是需要观察的表达式，值是对应回调函数。值也可以是方法名，或者包含选项的对象。Vue 实例将会在实例化时调用 $watch()，遍历 watch 对象的每一个属性。

#### 4.vue实例方法

讲解实例属性和实例方法（实例dom方法和实例event方法）

**实例属性**

组件树访问：$parent $root $children $refs
DOM访问：$el,$els
数据访问：$data,$options,$props

组件实例子
```
//组件树访问
$parent 访问当前组件实例的父实例
$root   访问当前组件实例的根实例，如果没有父实例，则表示当前组件实例本身
$children 访问当前组件实例的直接子组件实例
$refs   访问使用了v-ref指令的子组件
```

```
//DOM访问，$el挂载当前组件实例中的DOM元素，$els访问元素中使用了v-el指令的DOM元素。
var data = { a: 1 }
var vm = new Vue({
  el: '#example',
  data: data
})
vm.$el === document.getElementById('example') // -> true
```

```
//数据访问,$data就是组件实例中的数据对象，$options是组件实例中的初始化选项对象，$props访问到这个props对象的属性们
new Vue({
  data:{
      a:1
  }
  customOption: 'foo',
  created: function () {
    console.log(this.$data)//{a:1}
    console.log(this.$options.customOption) // -> 'foo'
  }
})
```

**实例方法**

实例DOM方法

内部插入$appendTo
同级插入$before和$after
删除$remove
延迟$nextTick--下次DOM更新循环后执行指定的回调函数，这个方法可以保证内容已经和最新数据保持同步

实例Event方法
$on(event,callback)：监听当前实例上的自定义事件。事件可以由vm.$emit触发。
$once(event,callback)：监听一个自定义事件，但是只触发一次，在第一次触发之后移除监听器。
$emit(event,[...args]):触发当前实例上的事件。
$dispatch(event,[...args]):派发事件，即在当前实例触发，并且沿着父链一层一层向上，如果对应的监听函数返回false就停止。
$broadcast(event,[...args]):广播事件，遍历$children，如果对应的监听函数返回false就停止。
$off([event,callback]):移除自定义事件监听器。如果没有提供参数，则移除所有的事件监听器；如果只提供了事件，则移除该事件所有的监听器；如果同时提供了事件与回调，则只移除这个回调的监听器。

```
vm.$on('test', function (msg) {
  console.log(msg)
})
vm.$emit('test', 'hi')
// -> "hi"
```

#### 5.vue的组件

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
new Vue({
    el:'#app',
    components:{
        'parent-component':parentComponent
    }
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

#### 6.vue的组件之间数据的传输——prop，slot，实例属性和事件。

数据传递主要通过三方面——prop，slot，实例属性和事件。

**props**

props(父组件传输到子组件)
--组件实例的作用域是孤立的,子组件不能用父组件的数据。所以子组件使用props选项获取父组件的数据。
--父组件通过props向下传递数据--当父组件的属性变化时，将传导给子组件，但是不会反过来。这是为了防止子组件无意修改了父组件的状态
1.html中父组件调用子组件，使用v-bind绑定两个相关特性（-那种方式）
2.html中子组件定义props用驼峰式。
ps：可以使用.sync显式地指定双向绑定，这使得子组件的数据修改会回传给父组件。可以使用.once显式地指定单次绑定，单次绑定

另外：
props 可以是数组或对象，用于接收来自父组件的数据。props 可以是简单的数组，或者使用对象作为替代，对象允许配置高级选项，如类型检测、自定义校验和设置默认值。
```
props: {
    // 只检测类型
    height: Number,
    // 检测类型 + 其他验证
    age: {
      type: Number,
      default: 0,
      required: true,//代表必填
      validator: function (value) {
        return value >= 0
      }
    }
  }
```

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

**slot**

slot(slot父子组件模版混合)

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

**自定义属性和事件**

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
              //触发父元素的事件
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

--父子组件之间的访问（实例属性之组件树属性）
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

#### 7.vue组件的调用方式

请教一下，比如说Vue定义了Message组件，我想让他像Vue的实例选项一样调用，this.$message，不需要<message> </message> ,该怎么写呢
回答：
我针对这个写过一篇笔记，可以参考一下

https://molunerfinn.com/vue-components/


#### 8.动态组件--多个组件使用同一个挂载点

通过使用保留的 <component> 元素，动态地绑定到它的 is 特性，我们让多个组件可以使用同一个挂载点，并动态切换：

```
<component v-bind:is="currentView">
  <!-- 组件在 vm.currentview 变化时改变！ -->
</component>

var vm = new Vue({
  el: '#example',
  data: {
    currentView: 'home'
  },
  components: {
    home: { /* ... */ },
    posts: { /* ... */ },
    archive: { /* ... */ }
  }
})
```

如果把切换出去的组件保留在内存中，可以保留它的状态或避免重新渲染。为此可以添加一个 keep-alive 指令参数：
```
<keep-alive>
  <component :is="currentView">
    <!-- 非活动组件将被缓存！ -->
  </component>
</keep-alive>
```

#### 9.vue--基于$.ajax实现数据的跨域增删查改

http://www.cnblogs.com/keepfool/p/5648674.html

组件们：
1.simple-grid组件--用于绑定和显示数据
2.modal-dialog组件--数据的新建和编辑将使用模态对话框

Ajax帮助方法
1.基于$.ajax声明一个简单的AjaxHelper构造器，AjaxHelper构造器的原型对象包含5个方法

```
<template id="grid-template">
    <table>
        <thead>
            <tr>
                <th v-for="col in columns">
                    {{ col | capitalize}}
                </th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(index,entry) in dataList">
                <td v-for="col in columns">
                    {{entry[col]}}
                </td>
            </tr>
        </tbody>
    </table>
</template>

<script src="js/vue.js"></script>
<script>
    Vue.component('simple-grid', {
        template: '#grid-template',
        props: ['dataList', 'columns']
    })
</script>
```

```
<template id="dialog-template">
    <div class="dialogs">
        <div class="dialog" v-bind:class="{ 'dialog-active': show }">
            <div class="dialog-content">
                <div class="close rotate">
                    <span class="iconfont icon-close" @click="close"></span>
                </div>
                <slot name="header"></slot>
                <slot name="body"></slot>
                <slot name="footer"></slot>
            </div>
        </div>
        <div class="dialog-overlay"></div>
    </div>
</template>

<script>
    Vue.component('modal-dialog', {
        template: '#dialog-template',
        props: ['show'],
        methods: {
            close: function() {
                this.show = false
            }
        }
    })
</script>
```

```
function AjaxHelper() {
    this.ajax = function(url, type, dataType, data, callback) {
        $.ajax({
            url: url,
            type: type,
            dataType: dataType,
            data: data,
            success: callback,
            error: function(xhr, errorType, error) {
                alert('Ajax request error, errorType: ' + errorType +  ', error: ' + error)
            }
        })
    }
}
AjaxHelper.prototype.get = function(url, data, callback) {
    this.ajax(url, 'GET', 'json', data, callback)
}
AjaxHelper.prototype.post = function(url, data, callback) {
    this.ajax(url, 'POST', 'json', data, callback)
}

AjaxHelper.prototype.put = function(url, data, callback) {
    this.ajax(url, 'PUT', 'json', data, callback)
}

AjaxHelper.prototype.delete = function(url, data, callback) {
    this.ajax(url, 'DELETE', 'json', data, callback)
}

AjaxHelper.prototype.jsonp = function(url, data, callback) {
    this.ajax(url, 'GET', 'jsonp', data, callback)
}

AjaxHelper.prototype.constructor = AjaxHelper
```
