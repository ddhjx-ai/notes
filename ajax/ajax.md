## 1.原生ajax

```javascript
//1.创建Ajax对象
    if(window.XMLHttpRequest){
       var oAjax=new XMLHttpRequest();
    }else{
       var oAjax=new ActiveXObject("Microsoft.XMLHTTP");
    }

    //2.连接服务器（打开和服务器的连接）
    oAjax.open('GET', url, true);

    //3.发送
    oAjax.send();

    //4.接收
    oAjax.onreadystatechange=function (){
       if(oAjax.readyState==4){
           if(oAjax.status==200){
              //alert('成功了：'+oAjax.responseText);
              fnSucc(oAjax.responseText);
           }else{
              //alert('失败了');
              if(fnFaild){
                  fnFaild();
              }
           }
        }
    };
```

## 2.fetch

- 更加简单的数据获取方式，功能强大、更加灵活，可以看做是xhr的升级版

- 基于 promise 实现的

**基本用法**

```javascript
fetch(url).then(data => {
    // text() 方法是 fetchAPI的一部分，它返回一个Promise实例对象，用于获取后台的数据
    console.log(data)	// 打印输出一个 Response{} 对象
    return data.text()
}).then(res => {
    // 注意：这里得到的才是最终的数据
    console.log(res)
})
```

### 2.1 fetch请求参数

- method(String):HTTP请求方法，默认是GET请求(GET、POST、PUT、DELETE)

- body(Stiring):HTTP请求参数
- headers(Object):HTTP请求头，默认为{}

#### 2.1.1 GET 请求的参数传递(两种方式)

```javascript
// 后台通过 res.query.key 方式获取参数
fetch(url?key=value).then(data => {
    return data.text()
}).then(res => {
    // 注意：这里得到的才是最终的数据
    console.log(res)
})

// 后台通过 res.params.key 方式获取参数
fetch(url/value).then(data => {
    return data.text()
}).then(res => {
    // 注意：这里得到的才是最终的数据
    console.log(res)
})
```

#### 2.1.2 DELETE 请求的传参方式

- delete 请求方式和 get 请求一样。参数传递方式也有两种，只是必须设置{method:'delete'}

```javascript
fetch(url?key=value,{
    method:'delete',
}).then(data => {
    return data.text()
}).then(res => {
    console.log(res)
})
```



#### 2.1.3 POST 请求

- post 请求传递参数需要设置 body: '' 和 headers:{''}（有参数时，headers必须设置）,和ajax的post请求有参数传递时的请求头时一样的
- post 和 put 请求都可以在 url 后面通过 ? 或者 / 拼接参数进行传递，后台获取的方式分别是：req.query.key 和 req.params.key

```javascript
// 方式一
fetch(url?key=value,{
    method:'post',
    body:'name=zs&age=12',
    headers:{
        'Content-Type':'application/x-www-from-urlencoded'
    }
}).then(data => {
    return data.text()
}).then(res => {
    console.log(res)
})

// 方式二，json格式是由中间件 body-parser 提供的
fetch('http://localhost:3000/post2/1',{
    method:'post',
    body:JSON.stringify({
        name:'ls',
        age:22
    }),
    headers:{
        'Content-Type':'application/json'
    }
}).then(data => {
    return data.text()
}).then(res => {
    console.log(res)
})
```

#### 2.1.4 PUT 请求，传递参数

- put 请求和 post 请求类似，同样支持两种方式传参，后台解析数据也是通过 res.body.key 获取

- 只是 method 值不同而已



### 2.2 fetch 响应结果

- text() : 将返回体处理成字符串类型
- json() ：返回结果和JSON.parse(responseText) 一样

```javascript
fetch(url).then(data => {
    // return data.text()
    return data.json()
}).then(res => {
    console.log(res)
})
```

## 3. axios 的基本特性

axios 是一个基于 promise 用于浏览器和 node.js 的 HTTP 客户端

- 支持浏览器和 node.js 
- 支持 promise
- 能拦截请求和响应
- 自动转换 JSON 数据

```javascript
axios.get(url).then(res => {
    // data 属性名是固定的，用于获取后台响应的数据
    console.log(res.data)
})
```

### 3.1 axios常用 API

- get ：查询数据
- post：添加数据
- put：修改数据
- delete：删除数据

#### 3.1.1 GET 传递参数

- 通过 url 传递参数  **?**  或者  **/** 传参
- 通过 params 传递参数   

```javascript
// url 后面拼接参数
axios.get(url?key=value).then(res => {
    console.log(res.data)
})
axios.get(url/11).then(res => {
    console.log(res.data)
})
// params 传递参数，后台通过 query 获取，而不是 params
axios.get('http://localhost:3000/ax4',{
    params:{
        name:'zs'
    }
}).then(res => {
    console.log(res.data)
})
```

#### 3.1.2 DELETE 传递参数

- 参数传递方式类似于 GET
- 都有 url 拼接和 params 的方式传参

#### 3.1.3 POST 传递参数

- 通过选项传递参数(默认传递的是json格式的数据)

```javascript
axios.post(url,{
    name:'ls',
    id:1
}).then(res => {
    console.log(res.data)
})
```

- 通过 URLSearchParams 传递参数 (application/x-www-form-urlencoded)

```javascript
let params = new URLSearchParams()
params.append('name','zs')
params.append('id',1)
axios.post(url,params).then(res => {
    console.log(res.data)
})
```

#### 3.1.4 PUT传递参数

- 参数传递方式和 POST 一样

### 3.2 axios 的响应结果

- data：实际响应回来的数据
- headers：响应头信息
- status：响应状态吗
- statusText：响应状态信息

### 3.3 axios 全局配置

- axios.defaults.timeout = 1000 	超时时间
- axios.defaults.baseURL = 'http://localhost:3000/app'       设置默认的地址
- axios.defaults.headers[ 'str' ] = 'str'        设置请求头,如果涉及到跨域，请求头需要在后台单独设置

### 3.4 axios 拦截器

- **通过拦截器可以控制所有的请求**

	#### 3.4.1 请求拦截器

![请求拦截器](C:\Users\吴超\Desktop\笔记\ajax\images\请求拦截器.png)

```javascript
// 添加一个请求拦截器
axios.interceptors.request.use(config => {
    // 在请求发出之前进行一些信息设置
    return config
}),err => {
    // 处理响应的错误信息
    console.log(err)
}
```

#### 3.4.2 响应拦截器

![响应拦截器](C:\Users\吴超\Desktop\笔记\ajax\images\响应拦截器.png)

- 在获取数据之前对数据做一些加工处理

```javascript
// 添加一个响应拦截器
axios.interceptors.response.use(res => {
    // 在这里对返回的数据进行处理
    return res
}),err => {
    // 处理响应的错误信息
    console.log(err)
}
```

## 4.async 和 await 用法

- async/await是ES7引入的新语法，可以更见方便的进行异步操作
- async 关键字用于函数上（**async函数的返回值是 Promise 实例对象**）
- await 关键字用于 async 函数中（await可以得到异步的结果）

```javascript
async function getdata(url){
    const res = await axios.get(url)
    //console.log(res.data)		// 这里可以直接获取 axios 请求返回的数据
    return res.data				// 如果将 await 的结果返回，得到的还是一个 promise对象
}
getdata().then(data => {
    console.log(data)
})
```

#### 4.1 async / await 处理多个异步请求

```javascript
async function getdata(){
    const info = await axios.get(url)
    const res = await axios.get(url?key=info)
    return res
}
getdata().then(res => {
    console.log(res.data)
})
```

