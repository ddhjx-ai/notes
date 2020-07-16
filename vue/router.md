### 1. 路由的默认值修改为history模式

默认情况下，路由的跳转时，路径会带有hash的'#'，例如：`http://192.168.3.33:8080/#/home`

只需要修改如下代码：

```javascript
export default new VueRouter({
  routes:[
    {
      path:'/',
      component:helloworld
    },
    {
      path:'/home',
      component:home
    }
  ],
  // 设置mode为history即可
  mode: 'history'
})
```

则显示的路由就不会带有hash：`http://192.168.3.33:8080/home`

### 2.router-link

####  2.1 replace

**preplace不会留下history记录, 所以指定replace的情况下, 后退键返回不能返回到上一个页面中**

```html
// replace 取消路由跳转的历史记录
<router-link to='/home' tag='button' replace>首页</router-link>
```

#### 2.2 active-class

- 可以在标签中自定义路由被选中的类名

```heml
<router-link to='/home' tag='button' replace active-class='active'>首页</router-link>
```

- 也可以在 VueRouter 中全局配置

```javascript
export default new VueRouter({
  routes:[],
  mode: 'history',
  linkActiveClass: 'active'
})
```

### 3.路由懒加载

```javascript
import Home from '../components/home'
const routes = [
    {
        path:'/home',
        component:Home
    }
]

// 路由懒加载
const routes = [
    {
        path:'/home',
        // 当路由跳转到当前路径时，才会加载该组件
        component:() => import('../components/home')
    }
]
```

### 4. keep-alive

- keep-alive 是 Vue 内置的组件，可以使被包含的组件保留状态，或避免重新渲染

  keep-alive 两个重要的属性

  - include 字符串或正则表达式，只有匹配的组件会被缓存

  - exclude 字符串或正则表达式，任何匹配的组件都不会被缓存

  ```html
  <!-- home 对应的是 home组件的 name值 -->
  <keep-alive exclude='home,user'>
      <router-view></router-view>
  </keep-alive>
  ```

- router-view 是 VueRouter 一个组件，如果直接被包在 keep-alive 里面，所有路径匹配到的视图组件都会被缓存

```html
<keep-alive>
    <!-- 所有路径匹配到的 视图组件都会被缓存 -->
    <router-view></router-view>
</keep-alive>
```

- 当组件在keep-alive内被切换时组件的**activated、deactivated**这两个生命周期钩子函数会被执行



### 5. vue的两种路由模式原理

**1、hash模式：原理是onhashchange事件，url都会被浏览器记录下来，只能改变#后面的url片段**

- hash模式的工作原理是hashchange事件，可以在window监听hash的变化。我们在url后面随便添加一个#xx触发这个事件

**2、history模式：根据history api中的pushState,replaceState两个方法。**

HTML5新增的API：

1. history.pushState(data, title [, url])：往历史记录堆栈顶部添加一条记录； data会在onpopstate事件触发时作为参数传递过去；title为页面标题，当前所有浏览器都会 忽略此参数；url为页面地址，可选，缺省为当前页地址。
2. history.replaceState(data, title [, url]) ：更改当前的历史记录，参数同上。
3. history.state：用于存储以上方法的data数据，不同浏览器的读写权限不一样。
4. window.onpopstate：响应pushState或replaceState的调用；有了这几个新的API，针对支持的浏览器。



