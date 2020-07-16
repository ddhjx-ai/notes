#### Redux

1. **store**

   - 管理state，唯一的数据源：action
   - 管理reducer

2. **reducer**

   - 负责修改state状态值
   - 数据源需要action提供
   - 提供修改store中的state转台数据，修改的行为发生在reducer

3. **action**

   - 是store对象数据的唯一来源

   - 本质是一个对象,定义的时候需要定义成一个方法：{type：修改state的方式，data：参与修改state的数据}

   - 定义：函数，目的是动态给action设置data

     ```jsx
     export const incrementAction = (number) => {
       return {
         type: 'increment',
         data: number
       }
     }
     ```

4. **dispatch**

   - 作用：分发action
   - 传递action对象，简介导致store去reducer调用

5. **获取state**

   - this.props.store.getState()

6. **监听state的变化**

   - store.subscribe(() => {})

#### 使用redux

1. 创建store对象
2. 创建reducer
   1. 关注他的行为
   2. reducer：返回状态值给store对象
   3. 初始化给store对象状态值
   4. 分发action的时候，根据action的type类型以及action.data决定如何修改状态，并将修改后的值交给store对象
   5. 匹配action.type (switch(){case})
3. 设计action
   1. 本质是一个对象：{type：行为，data：数据}
   2. 定义：定义为一个函数，为了能够动态的设置data数据
4. 组件和redux交互
   1. 组件中一定要获取到store对象
   2. 获取redux中的状态，store.getState()
   3. 组件中分发action：store.dispatch(action对象)