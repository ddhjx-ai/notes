# Node.js 第4天课堂笔记

## 知识点--Express

### 1.1.修改完代码自动重启 node命令

使用一个第三方命令行工具：nodemon 来解决修改代码重启服务器问题

`nodemon` 是一个基于 Node.js 开发的第三方命令行工具，使用时需要独立安装

```shell
# --global 安装的包，在任意目录都可以执行
npm install --global nodemon
```

安装完毕之后，命令行使用：

```shell
nodemon app.js
```

只要是通过 `nodemon app.js`启动服务器，会监视文件的变化，当文件发生变化时，会自动重启服务器

### 1.2.路由

get：

```javascript
// 当以 GET 方式请求 / 的时候，执行对应的处理函数
app.get('/',function(req,res){
    res.send('hello world')
})
```

post：

```javascript
// 当以 POST 方法请求 / 的时候，指定对应的处理函数
app.post('/',function(req,res){
    res.send('你好，世界')
})
```

#### 1.2.1 路由设计

| 请求方法 | 请求路径         | get参数 | post参数                       | 备注             |
| -------- | ---------------- | ------- | ------------------------------ | ---------------- |
| GET      | /student         |         |                                | 渲染首页         |
| GET      | /students/new    |         |                                | 渲染添加学生首页 |
| POST     | /students        |         | name、age、gender、hobbies     | 处理添加学生     |
| GET      | /students/edit   | id      |                                | 渲染编辑页面     |
| POST     | /students/edit   |         | id、name、age、gender、hobbies | 处理编辑请求     |
| GET      | /students/delete | id      |                                | 处理删除请求     |



### 1.3.静态服务

```javascript
app.use(express.static('public'))
app.use(express.static('files'))

// /public/xxx
app.use('/public',express.static('public'))

// /staitc/xxx
app.use('/static',express.static('public'))

app.use('/static',express.static(path.join(_dirname,'public')))
```

### 1.4.在 Express 中配置使用 art-template 模板引擎

安装：

```shell
npm install --save art-template 
npm install --save express-art-template
```

配置：

```javascript
app.engine('html',require('express-art-template')); 
```

使用：

```javascript
app.get('/',function(req,res){
    // express 默认回去项目中的 views 目录中查找 404.html 
    res.render('404.html',{
        title:'404'
    })
})
```

如果希望修改默认的 `views `视图渲染存储目录，可以：

```javascript
// 第一个参数 views 
app.set('views',目录路径)
```

### 1.5 在 Express 获取表单 POST 请求数据

在 Express 中没有内置获取表单 POST 请求体的 API ，需要使用一个第三方包：body-parser

安装：

```shell
npm install --save body-parser
```

配置：

```javascript
var express = require('express')
// 引包
var bodyParser = require('body-parser')

var app = express()

// 配置 body-parser
// 只要加入这个配置，则在 req 请求对象上会多出一个属性：body
// 也就是可以直接通过 req.body 来获取表单 POST 请求体数据
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

app.post('/post',function(req,res){
    // 1.获取表单请求体数据
    // 2.处理
    // 3.发送相应
    // req.query 只能拿到 get 请求数据
    var comment = req.body
    comment.dateTime = '2011-01-01'
    comments.unshift(comment)
    res.redirect('/')
})
```

### 1.6. 在 Express 中获取表单 GET 请求参数

Express 内置一个 API ，可以直接通过 `req.query` 来获取

```javascript
req.query
```



## 复习

- jQuery 的 each 和 原生的 JavaScript 方法 forEach
- 301 和 302 的区别
- 模块中导出单个成员和导出多个成员的方式
  + `module.exports = xxx`
  + 通过多次：`exports.xxx = xxx`
  + 导出多个也可以：`moudle.exports = {多个成员}`
- module.exports 和 exports 的区别
  + exports 只是 module.exports 的一个引用而已，目的只是为了简化写法
  + 每个模块最终 return 的是 module.exports
- require 方法加载规则
  + 优先从缓存加载
  + 核心模块
  + 路径形式的模块
    * `./xxx`
    * `../xxxx`
    * `/xxxx` / 在这里表示的是磁盘根路径
    * `c:/xxx`
  + 第三方模块
    * 第三方模块的标识就是第三方模块的名称（不可能有第三方模块和核心模块的名字一致）
    * npm
      - 开发人员可以把写好的框架、库发布到 npm 上
      - 使用者在使用的时候就可以很方便的通过 npm 来下载
    * 使用方式：`var 名字 = require('npm install 的那个包名')`
    * node_modules
    * node_modules/express
    * node_modules/express/package.json
    * node_modules/express/package.json main
    * 如果 package.json 或者 package.json main 不成立，则查找备选项：index.js
    * 如果以上条件都不成立，则继续进入上一级目录中的 node_modules 按照上面的规则继续查找
    * 如果直到当前文件模块所属磁盘根目录都找不到，最后报错：`can not find module xxx`
- package.json 包描述文件
  + 就是产品的说明书
  + `dependencies` 属性，用来保存项目的第三方包依赖项信息
  + 所以建议每个项目都要有且只有一个 package.json (存放在项目的根目录)
  + 我们可以通过 `npm init [--yes]` 来生成 package.json 文件
  + 同样的，为了保存依赖项信息，我们每次安装第三方包的时候都要加上：`--save` 选项。
- npm 常用命令
  + install
  + uninstall
- Express 基本使用
- 使用 Express 把之前的留言本案例自己动手改造一下

### 模块标识中的 `/` 和文件操作路径中的 `/`

## 上午总结

### 演讲

> 说服
> PPT
> 脑图
> markdown
> 结构思维

- 找痛点 why 为什么
- 解决方案 what 是什么
- 怎么去使用 how 怎么用
- where 在哪儿用
- when  什么时候用

- 文件路径中的 `/` 和模块标识中的 `/`
- nodemon
- Express
  + art-template 模板引擎的配置
  + body-parser 解析表单 POST 请求体
- 技术只是一种解决问题的手段、工具而已
  + 第三方的东西，不要纠结
  + 先以解决问题为主
- 详解了 express 静态服务 API
  + app.use('/public/', express.static('./public'))
- crud

## 下午总结

## 目标

- 文件路径中的 `/` 和模块标识中的 `/`
- Express 中配置使用 art-template 模板引擎
- Express 中配置使用 body-parser
- Express 中配置处理静态资源
- CRUD 案例中单独提取路由模块
