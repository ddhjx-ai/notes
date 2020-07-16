## 1.MVVM

 **vue.js中有两个核心功能：响应式数据绑定，组件系统。主流的mvc框架都实现了单向数据绑定，而双向绑定无非是在单向绑定基础上给可输入元素添加了change事件，从而动态地修改model和view。** 

- View层：在Vue中是绑定dom对象的HTML
- ViewModel层：在Vue中是实例的vm对象
- Model层：在Vue中是data、computed、methods等中的数据

 在 Model 层的数据变化时，View层会在ViewModel的作用下，实现自动更新 



## 2. **Vue的响应式原理** 

 Vue响应式底层实现方法是 Object.defineProperty() 方法，该方法中存在一个getter和setter的可选项，可以对属性值的获取和设置造成影响 

Vue中编写了一个wather来处理数据

在使用getter方法时，总会通知wather实例对view层渲染页面
同样的，在使用setter方法时，总会在变更值的同时，通知wather实例对view层进行更新

## 3.移除严格模式

1. npm install babel-plugin-transform-remove-strict-mode
2. .babelrc文件下修改配置{"plugins": ["transform-remove-strict-mode"]}
3. import mui from "mui.js"
4. 如果出现样式冲突，则需要改变mui默认的类名，自定义一个类名；将源码中的样式复制出来，将原来的类名覆盖即可

## 4.路由传参 vue this.$router.push()

1.  params 传参 

   1.  注意⚠️：params传参 ，路径不能使用path 只能使用name,不然获取不到传的数据 

   2.  `this.$router.push({name: 'login', params: { id : 1 }}) `

   3.  取数据：this.$route.params.id 

   4.  通过 params 传参必须在 路有规则中设置 name 属性

      ```javascript
      routes:[
          {path:'/login',component:login,name:'login'}
      ]
      ```

2.  query传参 

   1.  `this.$router.push({path: 'register', query: { id : 2 }}) `
   2.  取数据：this.$route.query.id 
   3.  query 传参，参数会在 url 后面拼接，而 params 传参则不会拼接

#### this.$router.push() 

 描述：跳转到不同的url，但这个方法会向history栈添加一个记录，点击后退会返回到上一个页面 

####  this.$router.replace() 

 描述：同样是跳转到指定的url，但是这个方法不会向history里面添加新的记录，点击返回，会跳转到上上一个页面。上一个记录是不存在的。 

####  this.$router.go(n) 

 相对于当前页面向前或向后跳转多少个页面,类似 `window.history.go(n)`。n可为正数可为负数。正数返回上一个页面 

## 5.v-model

```javascript
// v-moel是个语法糖
<input v-model="something">
// 应为
<input v-bind:value="something" v-on:input="something = $event.target.value">
```

### 实现双向数据绑定



## 6.vue常用指令

#### 1. v-pre:预编译

​	会将 vue 认识的语句直接渲染成字符串



## 7.vue事件修饰符

#### 1. native 原生事件

指定当前事件只调用原生的事件，一般在组件中使用，用于取消组件中封装的事件，改用vue指定的事件

#### 2. keycode 按键编码

@click.enter="show()"	按enter键也可以触发点击事件



## 8.computed 计算属性

1. 和methods属性类似
2. computed可以缓存，只有数据改变时才会被重新调用，提高性能
3. 定义的时候可以是一个函数，也可以是一个对象，调用的时候是以 **属性** 形式调用
4. computed中的属性是**可读和可写**的，通过get()和set() 方法

```javascript
compouted:{
    handleData:{
        get(){			// 读取数据
            retrun .....
        },
        set(value){		// 写入新数据
			....
        }
    }
}
```

## 9.router路由

### 9.1. router-link 路由跳转 to和:to

```javascript
<router-link to='/login/123'>跳转</router-link>	// 路径跳转
<router-link :to='{name:"login",params:{id:1111}}'>跳转</router-link>	// name 跳转，和params传参

<router-view/>
    
let router = new VueRouter({
    routes:[
        {
            path:'/login/:id',
            component:{template:"<div>登陆:{{$route.params.id}}</div>"},
            name:'login'
        }
    ]
})
```

**注意：**

- 获取路由信息：**$route**;		this.$route.id

- JS 控制路由跳转：**$router**;	
  - this.$router.push(string/object); 加入历史纪录栈
  - this.$router.replace(string/object); 替换最后一个历史记录(也就是当前)
  - this.$router.go(number);

#### 监听路由

1. watch--不推荐；

   1. 操作简单，但是只能读取不能操作

   ```javascript
   wathc:{
       $route(old_val,new_val){
           console.log(old_val)	// 获取一个route对象
       }
   }
   ```

2. 组件内部守卫

   ```javascript
   const Foo = {
     template: `...`,
     beforeRouteEnter (to, from, next) {
       // 在渲染该组件的对应路由被 confirm 前调用
       // 不！能！获取组件实例 `this`
       // 因为当守卫执行前，组件实例还没被创建
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
       // 这个离开守卫通常用来禁止用户在还未保存修改前突然离开。该导航可以通过 next(false) 来取消
     	if (window.confirm('确认跳转？')) {
           next()
         } else {
           next(false)
         }
     }
   }
   ```

   

### 9.2.this.$router 和 this.$route

- **this.$router：**是Vue-Router的实例，需要导航到不同路由则用this.$router.push方法

  1. $router是一个全局路由对象，是VueRouter的实例，我们可以在任何地方使用它。

  2. ```js
     this.$router.push('/user')  // 跳转路由
     this.$router.replace('/user')   // 跳转路由，但是不会有记录，不入栈。
     ```

```javascript
// 1、使用params的路由跳转
this.$router.push({name:'user',params:{id:1}})
this.$route.params.id
// 2、query路由跳转
this.$router.push({path: '/user',query:{userId:2}}) 
this.$route.query
// 3、在path中进行配置（与params类似）
this.$router.push(`/user/${userId}`)
// 这时路由需要进行特殊配置
{
    path: '/user/:userId',
    name: 'user',
    component: components['user']
}
//  对应取参
this.$route.params.id
```

- **this.$route：**为当前路由的跳转对象，包含当前路由的name、path、query、params等属性。

  1. $route是一个局部对象，表示当前正在跳转的路由对象。

  2. 可以调用其name、path、query、params等属性；

  3. 这个属性是只读的，里面的属性是 immutable (不可变) 的，不过你可以 watch (监测变化) 它

     

### 9.3.params与query使用区别

- **url上**
  - params方式，在url中不会将传递的参数进行显示，类似于post，相对安全。
  - query方式，在url中会将传递的参数进行展示，类似于get，不安全。
- **用法**
  - params需要用name引入，query需要path引入。