### vue中的$属性和方法

```java
var vue = new Vue({
	el: '#app',
    data: {
        message: 'hello'
    },
    name: 'tom'
})
    
```

#### 1.常用实例属性

1. **vue.$el:**

   - 获取Vue实例关联的DOM元素,在这里是#app

2. **vue.$data:**

   - 获取Vue实例的data选项（对象），在这里就是对象{msg：”hello“}

3. **vue.$options:**

   - 获取自定义选项/属性/函数,(vue.$options.name)

4. ##### vm.$refs：

   - 获取通过ref属性注册的DOM对象

#### 2.常用实例方法

1. **vm.$set：**设置属性值
2. **vm.$delete：**删除属性值
3. **vm.$watch：**观测数据变化；

#### 3.生命周期

1. **vm.$mount：**手动挂载Vue实例
2. **vm.$destroy：**销毁Vue实例，清理数据绑定，移除事件监听
3. **vm.$nextTick：**将方法中的回调函数，延迟到DOM更新后；