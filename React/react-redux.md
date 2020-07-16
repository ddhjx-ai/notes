**- 在实际开发中建议优先使用`react-redux`来操作项目中的公共状态，而不使用`redux`。`react-redux`的基本使用方法和`redux`基本一致。**

#### redux处理异步任务

1. Redux本身不能处理异步任务

2. 需要使用中间件：redux-thunk

3. npm install redux-thunk 

4. 在创建store对象的时候声明使用中间件

   ```js
   import {createStore, applyMiddleware} from 'redux'
   import thunk from 'redux-thunk'
   import counterReducer from './reducers'
   // 1.创建 store 对象
   const store = createStore(counterReducer, applyMiddleware(thunk))
   export default store
   ```

   

#### 同步action和异步action定义方式

1. 同步action：直接定义方法返回对应的action对象

2. 异步action：核心思想：异步action返回值还是一个函数，redux会自动将dispatch注入

   ```js
   export const asyncAction = function(number){
     return dispatch => {
       // 处理异步行为：发送ajax请求，开启定时器
       setTimeout(() => {
         dispatch(incrementAction(number))
       }, 2000);
     }
   }
   ```

   