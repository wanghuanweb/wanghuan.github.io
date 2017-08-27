#### 0.什么是“前端路由”?什么时候适合使用“前端路由”? “前端路由”有哪些优点和缺点?

**什么是前端路由？**

路由是根据不同的 url 地址展示不同的内容或页面
前端路由就是把不同路由对应不同的内容或页面的任务交给前端来做，之前是通过服务端根据 url 的不同返回不同的页面实现的。

**什么时候使用前端路由？**

在单页面应用，大部分页面结构不变，只改变部分内容的使用。

单页面应用：
1.页面只加载一个，之后的操作和数据交互都通过路由，ajax进行，页面没有刷新。界面切换非常流畅，响应很迅速
2.优点：加载次数少，经典MVC开发模式，前后端各负其责。
  缺点：不利于seo。所以一般不用锚点开发单页面，而是用h5的pushState

**前端路由有什么优点和缺点？**

优点：
用户体验好，不需要每次都从服务器全部获取，快速展现给用户
缺点：
使用浏览器的前进，后退键的时候会重新发送请求，没有合理地利用缓存
单页面无法记住之前滚动的位置，无法在前进，后退的时候记住滚动的位置

**使用js实现前端路由**

实现前端路由有两种方法：

方法一：
1.利用url的hash,就是常用的锚点（#）操作
2.当hash改变，触发hashChange注册的回调
3.回调进行不同的操作，进行不同的内容展示

方法二：--以”/”分割，没有”#”，但页面并没有跳转，不过使用这种模式需要服务器端的支持，服务器在接收到所有的请求后，都指向同一个html文件
1.使用history.pushState(state,title,url) 方法向浏览器历史添加了一个记录
2.window.onpopstate事件响应浏览器的前进和后退操作。


方法一代码：
```
<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf8" />
        <script type="text/javascript" src="./router.js"></script>
        <style type="text/css">
        </style>
    </head>
    <body>
        <li><a href="#/"></a></li>
        <li><a href="#/home">主页</a></li>
        <li><a href="#/about">详情页</a></li>
    </body>
    <script type="text/javascript">
        window.onload = function() {
            var router = new Router();
            router.add('home', function() {
                console.log('这是主页');
            });
            router.add('about', function() {
                console.log('这是详情页');
            });
            router.setIndex('home');
            router.start();
        };
    </script>
</html>

(function() {
    window.Router = function() {
        var self = this;
        self.hashList = {}; /* 路由表 */
        self.index = null;
        self.key = '/';
        window.onhashchange = function() {
            self.reload();
        };
    };
    /**
     * 添加路由,如果路由已经存在则会覆盖
     * @param addr: 地址
     * @param callback: 回调函数，调用回调函数的时候同时也会传入相应参数
     */
    Router.prototype.add = function(addr, callback) {
        var self = this;
        self.hashList[addr] = callback;
    };
    /**
     * 删除路由
     * @param addr: 地址
     */
    Router.prototype.remove = function(addr) {
        var self = this;
        delete self.hashList[addr];
    };
    /**
     * 设置主页地址
     * @param index: 主页地址
     */
    Router.prototype.setIndex = function(index) {
        var self = this;
        self.index = index;
    };
    /**
     * 跳转到指定地址
     * @param addr: 地址值
     */
    Router.prototype.go = function(addr) {
        var self = this;
        window.location.hash = '#' + self.key + addr;
    };
    /**
     * 重载页面
     */
    Router.prototype.reload = function() {
        var self = this;
        var hash = window.location.hash.replace('#' + self.key, '');
        var addr = hash.split('/')[0];
        var cb = getCb(addr, self.hashList);
        if(cb != false) {
            var arr = hash.split('/');
            arr.shift();
            cb.apply(self, arr);
        } else {
            self.index && self.go(self.index);
        }
    };
    /**
     * 开始路由，实际上只是为了当直接访问路由路由地址的时候能够及时调用回调
     */
    Router.prototype.start = function() {
        var self = this;
        self.reload();
    }
    /**
     * 获取callback
     * @return false or callback
     */
    function getCb(addr, hashList) {
        for(var key in hashList) {
            if(key == addr) {
                return hashList[key]
            }
        }
        return false;
    }
})();
```

方法二代码：
```
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>前端路由实现</title>   
</head>
<body>
<ul>
    <li><a href="#/"></a></li>
    <li><a href="#/home">主页</a></li>
    <li><a href="#/about">详情页</a></li>
</ul>
<script type="text/javascript" src="router.js"></script>
<script type="text/javascript">
var content = document.querySelector('body');
Router.route('/', function() {
    console.log("这是主页");
});
Router.route('/home', function() {
    console.log("这是主页");
});
Router.route('/about', function() {
    console.log("这是详情页");
});
</script>
</body>
</html>



//构造函数
function Router() {
    this.routes = {};
    this.currentUrl = '';
}
//route 存储路由更新时的回调到回调数组routes中，回调函数将负责对页面的更新
Router.prototype.route = function(path, callback) {
    this.routes[path] = callback || function(){};//给不同的hash设置不同的回调函数
};
//refresh 执行当前url对应的回调函数，更新页面
Router.prototype.refresh = function() {
    console.log(location.hash.slice(1));//获取到相应的hash值
    this.currentUrl = location.hash.slice(1) || '/';//如果存在hash值则获取到，否则设置hash值为/
    // console.log(this.currentUrl);
    this.routes[this.currentUrl]();//根据当前的hash值来调用相对应的回调函数
};
//init 监听浏览器url hash更新事件
Router.prototype.init = function() {
    window.addEventListener('load', this.refresh.bind(this), false);
    window.addEventListener('hashchange', this.refresh.bind(this), false);
}
//给window对象挂载属性
window.Router = new Router();
window.Router.init();
```

**不刷新整个页面，但前进后退可以正常使用的方法**

window对象上提供了onpopstate事件，上面传递的state对象会成为event的子对象，这样就可以拿到存储的title和URL了。

```
//浏览器历史中添加记录
var state = {
    title: title,
    url: options.url,
    otherkey: othervalue
};
window.history.pushState(state, document.title, url);

//浏览器前进和后退的时候触发onpopstate事件，上面传递的state对象会成为event的子对象，这样就可以拿到存储的title和URL了。
window.addEventListener('popstate', function(e){
  if (history.state){
    var state = e.state;
    //do something(state.url, state.title);
  }
}, false);
```

#### 1.vue router简单路由

http://www.cnblogs.com/keepfool/p/5690366.html

传统的页面应用，是用一些超链接来实现页面切换和跳转的。
vue的路由则是路径的改变，也就是组件的改变。

简单的路由：

**html**

1.使用 router-link 组件来导航，通过传入 `to` 属性指定链接.默认被渲染成a标签
2.router-view是路由的出口，路由匹配到的组件渲染到这里

**js**

1.创建组件：创建组件构造器--vue.extend，但其实我们一般都是用template创建组件，一个组件可以抽象成一个文件然后import进来
```
const Foo = { template: '<div>foo</div>' }
const Bar = { template: '<div>bar</div>' }
```
2.定义路由，每个路由映射一个组件
```
const routes = [
  { path: '/foo', component: Foo },
  { path: '/bar', component: Bar }
]
```
3.创建router实例，传入routes配置
```
const router = new VueRouter({
  routes // （缩写）相当于 routes: routes
})
```
4.创建和挂载根实例
```
const app = new Vue({
  router
}).$mount('#app')
```

#### 2.vue router嵌套路由

1.在组件内部使用<router-view>标签
```
const User = {
  template: `
    <div class="user">
      <h2>User {{ $route.params.id }}</h2>
      <router-view></router-view>
    </div>
  `
}
```

2.在路由器对象中给组件定义子路由
```
const router = new VueRouter({
  routes: [
    { path: '/user/:id', component: User,
      children: [
        {
          // 当 /user/:id/profile 匹配成功，
          // UserProfile 会被渲染在 User 的 <router-view> 中
          path: 'profile',
          component: UserProfile
        },
        {
          // 当 /user/:id/posts 匹配成功
          // UserPosts 会被渲染在 User 的 <router-view> 中
          path: 'posts',
          component: UserPosts
        }
      ]
    }
  ]
})
```

#### 3.编程式导航

除了 <router-link> 创建 a 标签来定义导航链接，还可以借助router的实例方法

router.push(location)：这个方法会向 history 栈添加一个新的记录，所以，当用户点击浏览器后退按钮时，则回到之前的 URL。

router.replace(location)：跟 router.push 很像，唯一的不同就是，它不会向 history 添加新记录，而是跟它的方法名一样 —— 替换掉当前的 history 记录。

router.go(n)：这个方法的参数是一个整数，意思是在 history 记录中向前或者后退多少步，类似 window.history.go(n)。

你也许注意到 router.push、 router.replace 和 router.go 跟 window.history.pushState、 window.history.replaceState 和 window.history.go好像， 实际上它们确实是效仿 window.history API 的。

#### 4.命名视图

同级想要展示多个视图router-view，而不是嵌套展示，例如创建一个布局，有 sidebar（侧导航） 和 main（主内容） 两个视图，这个时候命名视图就派上用场了。不在单独只有一个router-view的出口了。

一个视图使用一个组件渲染，因此对于同个路由，多个视图就需要多个组件。

```
<router-view class="view one"></router-view>
<router-view class="view two" name="a"></router-view>
<router-view class="view three" name="b"></router-view>

const router = new VueRouter({
  routes: [
    {
      path: '/',
      components: {
        default: Foo,
        a: Bar,
        b: Baz
      }
    }
  ]
})
```

#### 5.导航钩子

正如其名，vue-router 提供的导航钩子主要用来拦截导航，让它完成跳转或取消。有多种方式可以在路由导航发生时执行钩子：全局的, 单个路由独享的, 或者组件级的。

**所有路由的全局钩子**

可以使用router.beforeEach注册一个全局的before钩子
```
const router = new VueRouter({ ... })

router.beforeEach((to, from, next) => {
  // ...
})
//项目中
// 路由加载进度条
router.beforeEach((to, from, next) => {
    iView.LoadingBar.start();
    next();
});

router.afterEach((to, from, next) => {
    iView.LoadingBar.finish();
});
```

**路由独享的钩子**

```
const router = new VueRouter({
  routes: [
    {
      path: '/foo',
      component: Foo,
      beforeEnter: (to, from, next) => {
        // ...
      }
    }
  ]
})
```

**组件内的钩子**

beforeRouteEnter
beforeRouteUpdate (2.2 新增)
beforeRouteLeave

```
const Foo = {
    template: `...`,
    beforeRouteEnter (to, from, next) {
        // 在渲染该组件的对应路由被 confirm 前调用
        // 不！能！获取组件实例 `this`
        // 因为当钩子执行前，组件实例还没被创建
    },
    beforeRouteUpdate (to, from, next) {
        // 在当前路由改变，但是该组件被复用时调用
        // 举例来说，对于一个带有动态参数的路径 /foo/:id，在 /foo/1 和 /foo/2 之间跳转的时候，
        // 由于会渲染同样的 Foo 组件，因此组件实例会被复用。而这个钩子就会在这个情况下被调用。
        // 可以访问组件实例 `this`
    },
    beforeRouteLeave (to, from, next) {
        // 导航离开该组件的对应路由时调用
        // 可以访问组件实例 `this`
    }
}
```

全局钩子函数有2个：
beforeEach：在路由切换开始时调用
afterEach：在每次路由切换成功进入激活阶段时被调用

组件的钩子函数一共6个：
data：可以设置组件的data
activate：激活组件
deactivate：禁用组件
canActivate：组件是否可以被激活
canDeactivate：组件是否可以被禁用
canReuse：组件是否可以被重用

上述钩子的执行顺序如何呢？
其实路由切换就是控制流水线的切换。
我们可以把路由的切换分为三个阶段：可重用阶段，验证阶段和激活阶段。
可重用阶段：canReuse
验证阶段：canActivate，canDeactivate
激活阶段：activate，deactivate

例子：跳转路径[from = /home/news], [to = /home/message]
执行router的全局函数:beforeEach
执行组件Home的钩子函数:canReuse
执行组件News的钩子函数:canDeactivate
执行组件Message的钩子函数:canActivate
执行组件News的钩子函数:deactivate
执行router的全局函数:afterEach
执行组件Home的钩子函数:data
执行组件Message的钩子函数:activate
执行组件Message的钩子函数:data

**v-link**

v-link 是一个用来让用户在 vue-router 应用的不同路径间跳转的指令。该指令接受一个 JavaScript 表达式，并会在用户点击元素时用该表达式的值去调用 router.go。
```
<!-- 字面量路径 -->
<a v-link="'home'">Home</a>

<!-- 效果同上 -->
<a v-link="{ path: 'home' }">Home</a>

<!-- 具名路径 -->
<a v-link="{ name: 'detail', params: {id: '01'} }">Home</a>
```

**切换对象**

每个切换钩子函数都会接受一个 transition 对象作为参数。这个切换对象包含以下函数和方法：
transition.to
表示将要切换到的路径的路由对象。
transition.from
代表当前路径的路由对象。
transition.next()
调用此函数处理切换过程的下一步。
transition.abort([reason])
调用此函数来终止或者拒绝此次切换。
transition.redirect(path)
取消当前切换并重定向到另一个路由。
