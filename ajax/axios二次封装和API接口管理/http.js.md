## axios 封装API接口请求

```javascript
import axios from 'axios'
import qs from 'qs'

// 根据环境变量区分接口的默认地址
// process.env.NODE_ENV 在webpack中配置的环境变量
switch (process.env.NODE_ENV){
    case 'production':
        axios.defaults.baseURL = 'production_url';	// 生产环境下的默认地址
        break;
    case 'test':
        axios.defaults.baseURL = 'test_usl';		// 测试环境下的默认地址
        break;
    default:
        axios.defaults.baseURL = 'url';				// 开发环境下的默认地址
}

// 设置超时事件和跨域是否允许携带凭证
axios.defaults.timeOut = 10000
axios.defaults.withCredentials = true;	// 是否允许跨域过程中，资源凭证携带

// 设置post请求，告知服务器请求主题的数据格式（此格式根据服务器要求的格式）
axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded';
axios.defaults.transformRequest = data => qs.stringfy(data);	// qs是第三方库，可以将数据转换为 key1=value1&key2=value2... 的格式（此格式根据服务器要求的格式）

// 设置请求拦截器
axios.interceptors.request.use(config => {
    // 携带 token
    let token = localStorage.getItem('token')
    token && (config.headers.Authorization = token)
    return config
},errro => {
    return Promise.reject(error)
})

// 设置响应拦截器
axios.defaults.validateStatus = status => {
    // 自定义响应成功的HTTP状态码
    return /^(2|3)\d{2}$/.test(status);		// 如果状态码是 200~300 之间的数字，则表示获取到成功的响应信息
}
axios.interceptors.response.use(response => {
    return response.data
},error => {
    let {response} = error
    if(response){
        // 服务器返回的其它状态码
        switch(response.status){
            case 401:	// 当前请求需要用户验证(一般是未登陆)
                break;
            case 403:	// 一般是 token 过期
                localStorage.removeItem('token');
                // 同时跳转到登录页
                break;
            case 404:	// 请求失败，请求的资源在服务器上未被发现
                break;
        }
    }else{
    	// 服务器没有返回结果
    	if(!window.navigator.onLine){
            // 断网处理：可以跳转到断网页面
            return
        }
        return Promise.reject(error)
    }
})

export default axios;
```

