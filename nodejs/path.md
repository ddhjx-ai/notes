# path 路径操作模块

查看文档：https://nodejs.org/dist/latest-v10.x/docs/api/path.html

- path.basename
  - 获取一个路径的文件名(默认包含扩展名)
- path.name
  - 获取一个路径中的目录部分
- path.extname
  - 获取一个路径中的扩展名部分
- path.parse
  - 把一个路径转为对象
    - root根路径
    - dir 目录
    - base 包含后缀名的文件名
    - ext 后缀名
    - name 不包含后缀名的文件名
- path.join 
  - 当需要进行路径拼接的时候，推荐使用这个方法 
- path.isAbsolute
  - 判断一个路径是否是绝对路径

## 1.1.Node 中的其他成员

在每个模块中，除了`require`、`express`等模块相关的 API 之外，还有两个特殊的成员：

- `__dirname` **动态获取** 可以用来获取当前文件模块所属目录的绝对路径
- `__filename` **动态获取** 可以用来获取当前文件的绝对路径
- `__dirname`和`__filename`是不受执行 node 命令所属路径影响的

在文件操作中，使用相对路径是不可靠的，以为 node 中文件操作的路径被设计为相对执行 node 命令所处的路径。

所以为了解决这个问题，只需要把相对路径变为绝对路径就可以了

此时就需要用 `__dirname`或者`__filename`来帮助解决了；

在拼接的过程中，为了避免手动拼接到来的一些人为错误，所以推荐使用：`path.join()`来辅助拼接。

为了尽量避免路径出现的问题，以后在文件操作中使用的相对路径都统一转换为：**动态的绝对路径**

> 补充：模块中的路径标识和这里的路径没有关系，不受影响。





## 复习

- MongoDB 数据库
  + 灵活
  + 不用设计数据表
  + 业务的改动不需要关心数据表结构
  + DBA 架构师 级别的工程师都需要掌握这项技能
    * 设计
    * 维护
    * 分布式计算
- mongoose
  + mongodb 官方包也可以操作 MongoDB 数据库
  + 第三方包：WordPress 项目开发团队
  + 设计 Schema
  + 发布 Model（得到模型构造函数）
    * 查询
    * 增加
    * 修改
    * 删除
- Promise
  + http://es6.ruanyifeng.com/#docs/promise
  + callback hell 回调地狱
  + 回调函数中套了回调函数
  + Promise(EcmaScript 6 中新增了一个语法 API)
  + 容器
    * 异步任务（pending）
    * resolve
    * reject
  + then 方法获取容器的结果（成功的，失败的）
  + then 方法支持链式调用
  + 可以在 then 方法中返回一个 promise 对象，然后在后面的 then 方法中获取上一个 then 返回的 promise 对象的状态结果

## 上午总结

## 下午总结

## 总结

- path 模块
- __dirname 和 __filename
  + **动态的** 获取当前文件或者文件所处目录的绝对路径
  + 用来解决文件操作路劲的相对路径问题
  + 因为在文件操作中，相对路径相对于执行 `node` 命令所处的目录
  + 所以为了尽量避免这个问题，都建议文件操作的相对路劲都转为：**动态的绝对路径**
  + 方式：`path.join(__dirname, '文件名')`
- art-template 模板引擎(include、block、extend)
  + include
  + extend
  + block
- 表单同步提交和异步提交区别
  + 以前没有 ajax 都是这么干的，甚至有些直接就是渲染了提示信息出来了
  + 异步提交页面不会刷新，交互方式更灵活
- Express 中配置使用 express-session 插件
- 概述案例中注册-登陆-退出的前后端交互实现流程

## 目标
