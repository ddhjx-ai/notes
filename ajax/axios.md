## 1. axios的实例和模块封装

```javascript
import axios from 'axios'
export function request(config,callback){
    // 创建实例
    const instance = axios.create({
        baseURL:'',
        timeout:10000,
        headers:{
            'Content-Type':'application/x-www-form-urlcoded'
        }
    })
    
    // 拦截器
    // 请求拦截器
    instance.interceptors.request.use(config => {
		// 在这里可以执行一些请求之前要执行的任务
        // 1.比如config中的一些信息不符合服务器的要求
        // 2.发送网络请求时，在获取数据之前，显示一个缓冲的图标
        // 3.必须携带某个特殊信息(比如：token)，否则跳转到某个页面
        
        return config
    },err => {

    })
    // 响应拦截器
    instance.interceptors.response.use(res => {
        // 对响应到的结果进行一些处理，并返回
		return res
    },err => {
        
    })
    
    // 执行请求的代码
    instance(config)
    .then(res => {
        callback(res)
    })
    .catch(err => {
        
    })
}

// 或者将以上代码封装为promise，返回
export function request(config){
    return new Promise((resolve,reject) => {
    	const instance = axios.create({
            baseURL:'',
            timeout:10000
        })
        instance(config)
        .then(res => {
            resolve(res)
        })
        .catch(err => {
			reject(err)
        })
    })
}

// axios 本身返回的就是一个 promise 实例，可以直接返回
export function request(config){
    const instance = axios.create({
        baseURL:'',
        timeout:10000
    })
    return instance(config)
}
```

## 2.axios 特点

1. 基于 promise 的异步 ajax 请求库
2. 浏览器端/node 端都可以使用
3. 支持请求 / 响应拦截器
4. 支持请求取消
5. 请求 / 响应数据转换
6. 批量发送多个请求

## 3. axios 常用语法

1. axios（config）：通过/最本质的发送任意类型请求的方式
2. axios（url[,config]）：可以只指定 url 发送 get 请求
3. axios.request（config）：等同于 axios（config）
4. axios.get（url[，config]）：发送 get 请求
5. axios.post（url[，data，config]）：发 post 请求
6. axios.put（url[，data，config]）：发 put 请求



7. axios.defaults.xxx：请求的默认全局配置
8. axios.interceptors.request.use()：添加请求拦截器
9. axios.interceptors.response.use()：添加响应拦截器



10. **axios.create（[config]）：创建一个新的 axios**



11. axios.Cancel()：用于创建取消请求的错误对象
12. axios.CancelToken()：用于创建取消请求的 token 对象
13. axios.isCancel()：是否是一个取消请求的错误
14. axios.all（promise）：用于批量执行多个异步请求
15. axios.spread（）：用来指定接收所有成功数据的回调函数的方法

## 4. axios.create(config)

1. 根据指定配置创建一个新的 axios，也就是每个新的 axios 都有自己的配置
2. 新 axios 只是没有取消请求和批量发请求的方法，其他所有语法都是一致的

## 5.axios运行的整体流程

1. request（config）：
   - 将 [请求拦截器  , dispatchRequest（），响应拦截器] ，通过 promise 链串联起来，返回 promise
2. dispatchRequest（config）：
   - 转换请求数据 -> 调用 xhrAdapter() 发送请求 -> 请求返回后转换响应数据，返回 promise
3. xhrAdapter（config）：
   - 创建 XHR 对象，根据 config 进行相应的设置，发送特定请求，并接受响应数据，返回 promise



## 6.axios以form-data形式传递参数

```javascript
import qs from 'qs';
axios.post(url,qs .stringify({jobNumber: '430525', password: '123'}), {headers: {'Content-Type':'application/x-www-form-urlencoded'}});
```

