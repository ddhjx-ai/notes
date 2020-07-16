#### 1.v-if 和 v-show 的区别

1. **手段：**v-if是通过控制dom节点的存在与否来控制元素的显隐；v-show是通过设置DOM元素的display样式，block为显示，none为隐藏；

2. **编译过程：**v-if切换有一个局部编译/卸载的过程，切换过程中合适地销毁和重建内部的事件监听和子组件；v-show只是简单的基于css切换；

3. **编译条件：**v-if是惰性的，如果初始条件为假，则什么也不做；只有在条件第一次变为真时才开始局部编译（编译被缓存？编译被缓存后，然后再切换的时候进行局部卸载); v-show是在任何条件下（首次条件是否为真）都被编译，然后被缓存，而且DOM元素保留；

4. **性能消耗：**v-if有更高的切换消耗；v-show有更高的初始渲染消耗；

**使用场景：**

​	基于以上区别，因此，如果需要非常频繁地切换，则使用 v-show 较好；如果在运行时条件很少改变，则使用 v-if 较好。

**总结：**

​	v-if判断是否加载，可以减轻服务器的压力，在需要时加载,但有更高的切换开销;v-show调整DOM元素的CSS的dispaly属性，可以使客户端操作更加流畅，但有更高的初始渲染开销。如果需要非常频繁地切换，则使用 v-show 较好；如果在运行时条件很少改变，则使用 v-if 较好

#### 2. watch 和 computed 的区别

**区别：**

watch中的函数是不需要调用的

computed内部的函数调用的时候不需要加()

 

watch 属性监听 监听属性的变化

computed:计算属性通过属性计算而得来的属性

 

watch需要在数据变化时执行异步或开销较大的操作时使用

对于任何复杂逻辑或一个数据属性在它所依赖的属性发生变化时，也要发生变化，这种情况下，我们最好使用计算属性computed。 

 

computed 属性的结果会被缓存，除非依赖的响应式属性变化才会重新计算。主要当作属性来使用；

computed中的函数必须用return返回最终的结果

当computed中的函数所依赖的属性如果没有发生改变的时候，那么调用当前函数的时候结果会从缓存中读取

watch 一个对象，键是需要观察的表达式，值是对应回调函数。主要用来监听某些特定数据的变化，从而进行某些具体的业务逻辑操作；

watch监听引用数据类型时，需要使用深度监听(deep:true)。拿不到 oldVal，因为引用类型赋值的时候是一个指针赋值，所以oldVal和val指向的是同一个地址值。

> deep: true 的意思就是深入观察，监听器会一层层的往下遍历，给对象的所有属性都加上这个监听器，但是这样性能开销就会非常大了，任何修改obj里面任何一个属性都会触发这个监听器里的 handler

```javascript
watch: {
    obj: {
        handler(oldVla,val){
            console.log(oldVal)
        },
        immedidate: true, // 组件调用时，先执行一次 handler 回调函数
        deep: true	//深度监听
    }
}
```

**使用场景：**

**computed** 　　　

​				当我们需要进行数值计算，并且依赖于其它数据时，应该使用 computed，因为可以利用 computed 的缓存特性，避免每次获取值时，都要重新计算；

　　　　当一个属性受多个属性影响的时候就需要用到computed

　　　　最典型的例子： 购物车商品结算的时候

***watch***

​				当我们需要在数据变化时执行异步或开销较大的操作时，应该使用 watch，使用watch选项允许我们执行异步操作 ( 访问一个 API )，限制我们执行该操作的频率，并在我们得到最终结果前，设置中间状态。这些都是计算属性无法做到的。

　　　　当一条数据影响多条数据的时候就需要用watch

　　　　搜索数据

#### 3. 组件的生命周期（父子组件）

#### 4. keep-alive

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



#### 5. vue-router的两种路由模式原理

**1、hash模式：原理是onhashchange事件，url都会被浏览器记录下来，只能改变#后面的url片段**

- hash模式的工作原理是hashchange事件，可以在window监听hash的变化。我们在url后面随便添加一个#xx触发这个事件
- \#后面 hash 值的变化，不会导致浏览器向服务器发出请求，浏览器不发出请求，就不会刷新页面
- 通过监听 **hashchange** 事件可以知道 hash 发生了哪些变化，然后根据 hash 变化来实现更新页面部分内容的操作。

**2、history模式：根据history api中的pushState,replaceState两个方法。**

HTML5新增的API：

1. history.pushState(data, title [, url])：往历史记录堆栈顶部添加一条记录； data会在onpopstate事件触发时作为参数传递过去；title为页面标题，当前所有浏览器都会 忽略此参数；url为页面地址，可选，缺省为当前页地址。
2. history.replaceState(data, title [, url]) ：更改当前的历史记录，参数同上。
3. history.state：用于存储以上方法的data数据，不同浏览器的读写权限不一样。
4. window.onpopstate：响应pushState或replaceState的调用；有了这几个新的API，针对支持的浏览器。

**区别**

- url 展示上，hash 模式有“#”，history 模式没有
- 刷新页面时，hash 模式可以正常加载到 hash 值对应的页面，而 history 没有处理的话，会返回 404，一般需要后端将所有页面都配置重定向到首页路由
- 兼容性，hash 可以支持低版本浏览器和 IE



#### 6. diff 算法

- 只比较同一层级，不跨级比较
- tag 不同，则直接删掉重建，不再深度比较
- tag 和 key，两者都相同，则认为是相同节点，不再深度比较

**vdom存在的价值更加重要：数据驱动视图，控制DOM操作**



#### 7. vue 生命周期钩子

1. **<font color=red>beforeCreate</font>**： 在实例初始化之后，数据观测 (data observer) 和 event/watcher 事件配置之前被调用，是new Vue()之后触发的第一个钩子，在当前阶段data、methods、computed以及watch上的数据和方法都不能被访问。

2. **<font color=red>created</font>**： 在实例创建完成后被立即调用，数据观测 (data observer)，属性和方法的运算，watch/event 事件回调。然而，挂载阶段还没开始，`$el` 属性目前尚不可用。在这里更改数据不会触发updated函数。可以做一些初始数据的获取，在当前阶段无法与Dom进行交互，如果非要想，可以通过vm.$nextTick来访问Dom。

3. **<font color=red>beforeMount</font>**： 在挂载开始之前被调用：相关的 `render` 函数首次被调用。在这之前template模板已导入渲染函数编译。而当前阶段虚拟Dom已经创建完成，真实DOM即将开始渲染。在此时也可以对数据进行更改，不会触发updated。

   **该钩子在服务器端渲染期间不被调用。**

4. **<font color=red>mounted</font>**： 实例被挂载后调用，这时 `el` 被新创建的 `vm.$el` 替换了。如果根实例挂载到了一个文档内的元素上，当 `mounted` 被调用时 `vm.$el` 也在文档内。

   注意 `mounted` **不会**保证所有的子组件也都一起被挂载。如果你希望等到整个视图都渲染完毕，可以在 `mounted` 内部使用 vm.$nextTick。

   **该钩子在服务器端渲染期间不被调用。**

5. **<font color=red>beforeUpdate</font>**： 数据更新时调用，发生在虚拟 DOM 打补丁之前。这里适合在更新之前访问现有的 DOM，比如手动移除已添加的事件监听器。

   **该钩子在服务器端渲染期间不被调用，因为只有初次渲染会在服务端进行。**

6. **<font color=red>updated</font>**：由于数据更改导致的虚拟 DOM 重新渲染和打补丁，在这之后会调用该钩子。

   当这个钩子被调用时，组件 DOM 已经更新，所以你现在可以执行依赖于 DOM 的操作。然而在大多数情况下，你应该避免在此期间更改状态。如果要相应状态改变，通常最好使用[计算属性](https://cn.vuejs.org/v2/api/#computed)或 [watcher](https://cn.vuejs.org/v2/api/#watch) 取而代之。

   注意 `updated` **不会**保证所有的子组件也都一起被重绘。如果你希望等到整个视图都重绘完毕，可以在 `updated` 里使用 [vm.$nextTick](https://cn.vuejs.org/v2/api/#vm-nextTick)：

   要注意的是避免在此期间更改数据，因为这可能会导致无限循环的更新。

   **该钩子在服务器端渲染期间不被调用。**

7. **<font color=red>activated</font>**：被 keep-alive 缓存的组件激活时调用。

   **该钩子在服务器端渲染期间不被调用。**

8. **<font color=red>deactivated</font>**：被 keep-alive 缓存的组件停用时调用。

   **该钩子在服务器端渲染期间不被调用。**

9. **<font color=red>beforeDestroy</font>**：实例销毁之前调用。在这一步，实例仍然完全可用。

   **该钩子在服务器端渲染期间不被调用。**

10. **<font color=red>destroyed</font>**：实例销毁后调用。该钩子被调用后，对应 Vue 实例的所有指令都被解绑，所有的事件监听器被移除，所有的子实例也都被销毁。

    **该钩子在服务器端渲染期间不被调用。**



**<font color=green>接口请求一般放在哪个生命周期中</font>**

- 可以在钩子函数 created、beforeMount、mounted 中进行调用，因为在这三个钩子函数中，data 已经创建，可以将服务端端返回的数据进行赋值。
- 但是推荐在 created 钩子函数中调用异步请求，因为在 created 钩子函数中调用异步请求有以下优点：
  - 能更快获取到服务端数据，减少页面loading 时间；
  - ssr不支持 beforeMount 、mounted 钩子函数，所以放在 created 中有助于一致性；

**<font color=green>注意点：</font>**

1. 除了beforeCreate和created钩子之外，其他钩子均在服务端渲染期间不被调用
2. 在 updated 的时候不要去修改 data 里面赋值的数据，否则会导致死循环
3. Vue 的所有生命周期函数都是自动绑定到 this 的上下文上，所以，生命周期函数上不要使用箭头函数



#### 8. v-for 中 key 的作用

1. diff 算法中通过 tag 和 key 来判断是否是同一个 node
2. 减少渲染次数，提升渲染性能



#### 9.Vue的性能优化

- 编码阶段
  - 尽量减少data中的数据，data中的数据都会增加getter和setter，会收集对应的watcher
  - v-if和v-for不能连用
  - 如果需要使用v-for给每项元素绑定事件时使用事件代理
  - SPA 页面采用keep-alive缓存组件
  - 在更多的情况下，使用v-if替代v-show
  - key保证唯一
  - 使用路由懒加载、异步组件
  - 防抖、节流
  - 第三方模块按需导入
  - 长列表滚动到可视区域动态加载
  - 图片懒加载

- SEO优化
  - 预渲染
  - 服务端渲染SSR

- 打包优化
  - 压缩代码
  - Tree Shaking/Scope Hoisting
  - 使用cdn加载第三方模块
  - 多线程打包happypack
  - splitChunks抽离公共文件
  - sourceMap优化
- 用户体验
  - 骨架屏
  - PWA
  - 还可以使用缓存(客户端缓存、服务端缓存)优化、服务端开启gzip压缩等。



#### 10. SPA 单页面的理解和它的优缺点

- SPA（ single-page application ）仅在 Web 页面初始化时加载相应的 HTML、JavaScript 和 CSS。一旦页面加载完成，SPA 不会因为用户的操作而进行页面的重新加载或跳转；取而代之的是利用路由机制实现 HTML 内容的变换，UI 与用户的交互，避免页面的重新加载。

- 优点：
  - 用户体验好、快，内容的改变不需要重新加载整个页面，避免了不必要的跳转和重复渲染；
  - 基于上面一点，SPA 相对对服务器压力小；
  - 前后端职责分离，架构清晰，前端进行交互逻辑，后端负责数据处理；

- 缺点：
  - 初次加载耗时多：为实现单页 Web 应用功能及显示效果，需要在加载页面的时候将 JavaScript、CSS 统一加载，部分页面按需加载；
  - 前进后退路由管理：由于单页应用在一个页面中显示所有的内容，所以不能使用浏览器的前进后退功能，所有的页面切换需要自己建立堆栈管理；
  - SEO 难度较大：由于所有的内容都在一个页面中动态替换显示，所以在 SEO 上其有着天然的弱势。

  

#### 11.**Vue事件绑定原理**

原生事件绑定是通过`addEventListener`绑定给真实元素的，组件事件绑定是通过Vue自定义的`$on`实现的。