#### 1. [vue实现登录后跳转到之前的页面](https://www.cnblogs.com/caideyipi/p/8227966.html)

1. **router.currentRoute:**当前的路由信息对象，我们可以通过router.currentRoute.fullPath获得解析后的 URL，包含查询参数和 hash 的完整路径，如果要访问的页面的路由有命名（name）的话，可以通过router.currentRoute.name获得当前路由的名称。

2. **router.replace：**作用和router.push相同，不过它不会向history添加新纪录，而是替换当前的history记录

用户点开链接后，跳转到的目标的路由页面，然后触发401拦截器，返回登录页面：

```javascript
if (status == 401) {
      //判断当前的路由是否是目标路由
      if(router.currentRoute.name == "target"){
        //跳转回login路由，并把目标路由的url路径保存在login的query中
        router.replace({
          name:"login",
          query: {redirect: router.currentRoute.fullPath}
        })
      }else{
        /* 普通401拦截直接返回到登录页面 */
        router.push('/login');
      }
    }
```

点击登录后使用url上保存的query直接跳转回目标页面

```javascript
router.push({path:decodeURIComponent(url)});
```

