## 1. Vuex 概述

### 1.1 组件之间共享数据的方式

父向子传值：v-bind 属性绑定

子向父传值：v-on 事件绑定

兄弟组件之间共享数据：EventBus

- $on 接收数据的那个组件
- $emit 发送数据的那个组件



### 1.2 Vuex

Vuex 是实现组件全局状态（数据）管理的一种机制。可以方便的实现组件之间数据的共享



### 1.3 使用Vuex统一管理状态的好处

① 能够在 vuex 中集中管理共享的数据，易于开发和后期维护

② 能够高效实现组件之间的数据的共享，提高开发效率

③ 存储在 vuex 中的数据都是响应式的，能够实现保持数据与页面 的同步

- 一般情况下，只有组件之间共享的数据，才有必要存储到 vuex 中，对于组件中的私有的数据，依旧存储在组件自身的 data 中

## 2. Vuex 的基本使用

**1.安装 vuex 依赖包**

```js
npm install vuex --save      
```

**2.导入 vuex 包**

```javascript
import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
```

**3.创建 store 对象**

```javascript
const store = new Vuex.Store({
	// state 中存放就是全局共享的数据
    state : { count : 0}
})
```

**4.将 store 对象挂载到 vue 实例中**

```javascript
new vue({
	el:'#app',
    render: c => c(app),
    router,
    store
})
```

## 3. Vuex 的核心概念

### 3.1 State

state 提供唯一的公共的数据源，所有共享的数据都要统一放到 Store 的 State 中进行存储

```javascript
// 创建store数据源，提供唯一公共数据
const store = new Vuex.Store({
    state:{count:0}
})
```

组件访问 state 中数据的<font color=red face="黑体">第一种方式</font>：

```javascript
this.$store.state.全局数据名称
```

组件访问 state 中数据的<font color=red face="黑体">第二种方式</font>

```javascript
// 1.从 vuex 中按需导入 mapState 函数
import {mapState} from 'vuex'
// 2.将全局数据映射到当前组件的计算属性
computed:{
    ...mapState(['count'])
}
```



### 3.2 mutations

Mutations 用于变更 Store 中的数据

1. **只能通过 mutation 变更 Store 数据，不可以直接操作 Store 中的数据**
2. 通过这种方式虽然操作起来较为繁琐，但是可以集中监控所有数据的变化

```javascript
// 定义 Mutation
const store = Vuex.Store({
    mutations: {
		add(state) {
            // 变更状态
            state.count++
        }
    }
})
// 触发 mutation
methods:{
    handle(){
        // commit 的作用就是调用某个 mutation 函数
        this.$store.commit('add')
    }
}
```

也可以在触发 mutations 时传递参数

参数被称为 mutations 的载荷(payload)

```javascript
// 传递参数
this.$store.commit('add',5)
// 接收参数
 mutations: {
		add(state，num) {
            state.count = state.count + num
        }
    }
```

**触发 mutations 的<font color=red>第一种方式的另一种风格</font>：**

```javascript
// 传递参数
this.$store.commit({
    type:"add",
    num:5
})
// 接收参数
 mutations: {
		add(state，payload) { // payload 是一个对象
            state.count = state.count + payload.num
        }
    }
```

**触发 mutations 的<font color=red>第二种方式</font>：**

```javascript
// 1. 从 vuex 中按需导入 mapMutations 函数
import { mapState,mapMutations } from 'vuex'
// 2. 将指定的 mutations 函数映射到当前组件的 methods 函数中
methods:{
    ...mapMutations({['add']})
    // 调用
    handlefn(){
        this.add()
    }
}
```

#### <font color=green>mutations 常量类型</font>

<font color=red>1. 新建一个文件，存储所有的常量</font>

```javascript
// 定义一个常量，存储对应 mutation 的方法名，并导出
export const Add = 'add'
```

<font color=red>2. 组件中导入常量，并调用</font>

```javascript
import {Add} from './store/常量文件'
addFn(){
    this.$store.commit(Add)
}
```

<font color=red>3. vuex 中定义mutation的方法</font>

```javascript
import {Add} from './store/常量文件'
new Vuex.Store({
    state:{
        count:0
    }
    mutations:{
		[Add](state){
    		state.count++
		}
    }
})
```



### 3.3 actions

**在如果通过异步操作变更数据，必须通过 actions ，而不能使用 mutations，但是在 actions 中还是要通过触发 mutations 的方式间接变更数据**

**Action 函数接受一个与 store 实例具有相同方法和属性的 context 对象，因此你可以调用 `context.commit` 提交一个 mutation，或者通过 `context.state` 和 `context.getters` 来获取 state 和 getters。当我们在之后介绍到 [Modules](https://vuex.vuejs.org/zh/guide/modules.html)时，你就知道 context 对象为什么不是 store 实例本身了。**

```javascript
// 定义 actions
const store = new Vuex.Store({
    state:{
		count:0
    },
    mutations:{
        add(state，step){
            state.count += step
        }
    },
    actions:{
        addAsync(context,step){	// context 是一个对象，里面有dispatch、 commit 、 state 和 getters，也就是说一个异步方法可以访问actions中的另一个异步方法
            setTimeout(()=>{
                // actions 中不能直接修改 state 中的数据，必须通过context.commit() 触发 mutation 
                context.commit('add'，step)
            },1000)
        }
    }
})
```

```javascript
// 触发 action
methods:{
	fn(){
		// dispatch 函数专门用来触发 actions 中的异步函数
        this.$store.dispatch('addAsync'，5)
    }
}
```

触发 actions 异步任务时携带参数的方式和 mutation 携带参数的方式是一样的,还是相当于最终将传递过来的参数赋予了 mutation 中的对应函数

**触发 actions  的<font color=red>第二种方式：</font>**

```javascript
// 1.从 vuex 中按需导入 mapActions 函数
import {mapActions} from 'vuex'
// 2.将指定的 actions 函数映射到当前组件的 methods 函数中
methods:{
	...mapActions(['addAsync'])
}
```

### 3.4 getters

getters 用于对 store 中的数据进行加工处理形成新的数据

- **getters 可以对 store 中已有的数据加功处理之后形成的数据，类似 vue 中的计算属性**
- **store 中数据发生变化，getters 中的数据也会跟着变化**
- **getters 不会修改 store 中的元数据，它只是起到包装数据的作用**

```javascript
// 定义 getter 函数
const store = new Vuex.Store({
    state:{
		count:[1,2,3,4,5,6]
    },
    getters:{
        showNum(state,getters){		// 第二个参数 getters 就是当前的 getter 函数
			return state.count.filter(item => {
                return item > 3
            })
        },
        getLength(state,getters){
            return getters.showNum.length
        }
    }
})
```

**触发 getters 的<font color=red>第一种方式</font>：**

```javascript
this.$store.getters.名称
```

**触发 getters 的<font color=red>第二种方式</font>：**

```javascript
import {mapGetters} from 'vuex'
computed:{
    ...mapGetters(['showNum'])
}
```

**如果想向 getter 中传递参数，可以执行如下操作：**

```javascript
// 定义 getter 函数
const store = new Vuex.Store({
    state:{
		count:[2,5,7,11,55]
    },
    getters:{
        showNum(state,getters){
			return function(arg){
                return state.count.filter(item => {
                    return item > arg
                })
            }
        }
    }
})

// 组件中调用 getter 时传递参数
this.$store.getter.showNum(5)
```



### 3.5 modules 

Vuex 中的模块

```javascript
const moduleA = {
    state: {
        name:'zs'
    },
    mutations: {...},
    actions: {...},
    getters: {...}
}
              
const moduleB = {
	state: {
    	name: 'ls'          
    },
    mutations: {...},
    actions: {...},
    getters: {...}             
}
              
const store = new Vuex.Store({
	modules:{
    	a: moduleA,
        b: moduleB
    }              
})
                
this.$store.state.a.name // 调用模块 moduleA 中的状态
this.$store.state.b.name // 调用模块 moduleB 中的状态
```

- **mutations 和 getters 接收的第一个参数是局部状态对象**
- **vuex 模块内部的 mutations 和 getters 在调用的时候，依然直接通过  this.$store 来调用**

```javascript
// Vuex 模块的mutations 和 getters 的调用方式 
const moduleA = {
    state: {
        count: 0
    },
    mutations: {
        add(state) {
            state.count++
        }
    },
    getters: {
        doubleCount(state){
            return state.count * 2
        }
    }
}
const store = new Vuex.Store({
    state: {
		count: 1
    }
	modules:{
    	a: moduleA
    }              
})
export default store

// 组件中调用模块中的状态
computed: {
	count() {
        return this.$store.getters.doubleCount
    }
},
methods: {
	add() {
        this.$store.commit('add')
    }
}
```

**Vuex 模块中 Actions 的用法**

- <font color=blue>局部状态通过 context.state 暴露出来，根节点状态通过 context.rootState 获取</font>

```javascript
const moduleA = {
    actions: {
        // context 是一个对象，{state,commit,rootState} 解构赋值获取到需要的变量
		asncySum({state,commit,rootState}){
            setTimeout(()=>{
				commit('add')
            },1000)
        }
    }
}
```

- <font color=blue>如果 getters 中也需要使用全局的状态，可以接收更多的参数</font>

```javascript
const moduleA = {
    getters: {
        // rootState 表示根 Vuex
		getSum(state,getters,rootState){
            return state.count + rootState.count
        }
    }
}
```





## 4. vuex 常见问题

###  4.1 给 state 中的某个对象添加或删除一个属性时，无法响应式实现

Vuex 的 store 是响应式的，当 state 中的数据发生变化时， Vue 组件会自动更新，前提是满足 Vuex 对应的规则：

- **提前在 store 中初始化好所有需要的属性**

**<font color=blue>一、当给state 中的对象添加新属性时</font>**

```javascript
const store = new Vuex.Store({
    state:{
		obj:{
            name:'tom',
            age:22
        }
    },
    mutation:{
        setObj(state){	// 添加属性
            // state.obj.address = 'wuhan' // 使用这种方法会出现新增的属性无法响应式实现，如果想要新增的属性响应式实现，应该使用下面方法
            Vue.set(state.obj,'address','wuhan')
        }
    }
})
```

**<font color=blue>一、当给state 中的对象删除一个属性时</font>**

```java
const store = new Vuex.Store({
    state:{
		obj:{
            name:'tom',
            age:22
        }
    },
    mutation:{
        delObj(state){	// 添加属性
            // delete state.obj.name// 使用这种方法删除属性无法响应式实现
            Vue.delete(state.obj,'name')
        }
    }
})
```

