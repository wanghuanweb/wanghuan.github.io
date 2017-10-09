#### 1.后端渲染

django是直接把html页面嵌套在视图函数中返回给浏览器
```
def share_live(request, room_id=0, **kwargs):

return get_html_response(request,"template/neihan_reflow_new/page/reflow-living-page/reflow-living-page.html", data)
```

http://www.cnblogs.com/rubylouvre/p/4128500.html

#### 1.使用SSR（同构）
#### 2.按需加载
顾名思义，就是讲代码分成块，按需加载．这样，如果首屏不需要的块，就不用加载了．
对于大型项目可能更有用，因为在我的这个项目中首页需要的文件和其他页面需要的基本一样，所以代码分块对我这个项目而言，就没必要了．
当前流行的UI框架如iview,muse-ui,Element UI都支持按需加载,只需稍微改动一下代码.
修改前：
```
import MuseUI from 'muse-ui'
import 'muse-ui/dist/muse-ui.css'
import 'muse-ui/dist/theme-light.css'
Vue.use(MuseUI)
```
修改后：
```
import appBar from 'muse-ui/src/appBar'
import toast from 'muse-ui/src/toast'
import drawer from 'muse-ui/src/drawer'
import popup from 'muse-ui/src/popup'

Vue.component(appBar.name, appBar);
Vue.component(toast.name, toast);
Vue.component(drawer.name, drawer);
Vue.component(popup.name, popup);
```
#### 3.异步组件

在大型应用中，我们可能需要将应用拆分为多个小模块，按需从服务器下载。为了让事情更简单， Vue.js 允许将组件定义为一个工厂函数，动态地解析组件的定义。Vue.js 只在组件需要渲染时触发工厂函数，并且把结果缓存起来，用于后面的再次渲染。
https://cn.vuejs.org/v2/guide/components.html#%E5%BC%82%E6%AD%A5%E7%BB%84%E4%BB%B6

```

修改router
before：
import search from './search.vue'
{
            path: '/search',
            name: 'search',
            component: search
}
after：
const search = resolve => require(['./search.vue'], resolve);
{
            path: '/search',
            name: 'search',
            component: search
}
```

#### 4.代码压缩

如果你用的是nginx服务器，请修改配置文件(其他web server 类似)：
sudo nano /etc/nginx/nginx.conf
在Gzip Settings里加入：
```
gzip on;
gzip_min_length 1k;
gzip_buffers 4 16k;
gzip_comp_level 5;
gzip_types text/plain application/x-javascript text/css application/xml text/javascript application/x-httpd-php;
```
gzip
开启或者关闭 gzip 模块，这里使用 on 表示启动
gzip_min_length
设置允许压缩的页面最小字节数．默认值是0，不管页面多大都压缩．
gzip_buffers
设置系统获取几个单位的缓存用于存储gzip的压缩结果数据流．4 16k 代表以 16k 为单位，按照原始数据大小以 16k 为单位的4倍申请内存
gzip_comp_level
压缩比，压缩比１最小处理速度最快，压缩比9最大但处理最慢（传输快但比较消耗cpu）
gzip_types
匹配MIME类型进行压缩，（无论是否指定）"text/html" 类型总是会被压缩

#### 5.路由组件懒加载

当打包构建应用时，Javascript 包会变得非常大，影响页面加载。如果我们能把不同路由对应的组件分割成不同的代码块，然后当路由被访问的时候才加载对应组件，这样就更加高效了
结合 Vue 的 异步组件 和 Webpack 的 code splitting feature,可以轻松实现路由组件的懒加载．
我们要做的就是把路由对应的组件定义成异步组件：

```
const Foo = resolve => {
  /* require.ensure 是 Webpack 的特殊语法，用来设置 code-split point （代码分块）*/
  require.ensure(['./Foo.vue'], () => {
    resolve(require('./Foo.vue'))
  })
}
/* 另一种写法 */
const Foo = resolve => require(['./Foo.vue'], resolve);
不需要改变任何路由配置，跟之前一样使用 Foo：
const router = new VueRouter({
  routes: [
    { path: '/foo', component: Foo }
  ]
})
```
