# Node.js 第3天课堂笔记

## 知识点

### 1.1.1.	require方法加载规则

- 优先从缓存加载
- 判断模块表示符
  - 核心模块
  - 第三方模块
  - 自定义模块
- 模块查找机制
  - 优先从缓存中加载
  - 然后查找核心模块
  - 路径形式的文件模块
  - 第三方模块

### 2.1.   npm

- node package manager

#### 2.1.1npm网站

npm

#### 2.1.2.常用命令

- npm init
  - npm init -y 可以跳过向导，快速生成 package.json
- npm install
  - 一次性把 dependencies 选项中的依赖全部安装
  - npm i
- npm install 包名
  - 只下载指定的包
  - npm i 包名
- npm install --save 包名
  - 下载并保存依赖性(package.json文件中的 dependencies 选项)
  - npm i -S 包名
- npm unistall 包名
  - 只删除指定的包，依赖项会依然存在
  - npm un 包名
- npm uninstall --save 包名
  - 删除的同时也会把依赖信息删除
  - npm un -S 包名
- npm help
  - 查看使用帮助
- npm i bootstrap@3.3.7
  - 下载指定版本的文件
- npm config get prefix
  - npm包安装的位置
- npm install nvm -g
  - 全局安装nuvm
- nvm ls
  - 列出所有的node的版本号
- nvm use v12.0.0
  - 使用12.0版本的node
- node -v
  - 查看当前安装的版本

#### 2.1.3.npm命令行工具

可以通过在命令行中输入

```shell
npm --version
```

升级npm

```shell
npm install --global npm
```



#### 2.1.3.解决 npm 被墙问题

npm 存储包文件的服务器在国外，有时候会被墙，下载速度较慢，我们需要解决这个问题

http://npm.taobao.org/ 淘宝的开发团队把 npm 在国内做了一个备份

安装淘宝的  cnpm

```javascript
// 在任意目录下执行都可以
// --global 表示安装到全局，而非当前目录
npm install --global cnpm
```

接下来安装包的时候，把之前的 npm 替换为 cnpm

如果不想安装 cnpm 又想使用淘宝的服务器来下载:

```javascript
npm install jquery --registry=http://registry.npm.taobao.org
```

但是每次手动修改参数很复杂，可以把这个选项加入到配置文件中:

```shell
npm config set registry http://registry.npm.taobao.org
# 查看 npm 配置信息,上面是否配置成功
npm config list
```

只要经过了上面命令的配置，则以后所有的 `npm install ` 都会默认通过淘宝的服务器来下载

### 2.2.package.json

建议每一个项目都要有一个 `package.json` 文件(包描述文件，类似产品说明书)

这个文件可以通过 `npm init -y` 的方式来自动初始化出来

- 建议每个项目的根目录下都有一个`package.json` 文件
- 建议执行 `npm install` 包名的时候都加上`--save`这个选项，目的是用来保存依赖项信息

如果`node_moduless`被删除了，只需要`npm install`就会自动把`package.json` 中的`dependencies`中所有的依赖都下载回来

### 2.3.package.json 和 package-lock.json

npm 5 以前是不会有 `package-lock.json` 这个文件的

当安装包的时候，npm 都会生成或更新 `package-lock.json`这个文件

- npm 5 以后的版本安装包不需要加`--save`参数，它会自动保存依赖信息
- 当安装包的时候，会自动创建或更新 `package-lock.json`这个文件
- `package-lock.json`这个文件会保存`node-modules `中所有包的信息
  - 这样的话重新`npm install` 的时候速度就可以提升
- 从文件来看，`lock`称之为锁
  - `lock`是用来锁定版本
  - `package-lock.json`这个文件的另一个作用就是锁定版本号，防止自动升级新版本



### 复习

- 增删改查
- 登陆
- 注册
- 头像
  + 服务端图片
  + 水印
  + 图片水印
- 找回密码
- 密码修改

- 模块系统
  + 核心模块
  + 第三方模块
  + 自己写的模块
  + 加载规则以及加载机制
  + 循环加载
- npm
- package.json
- Express
  + 第三方 Web 开发框架
  + 高度封装了 http 模块
  + 更加专注于业务，而非底层细节
  + 知其所以然
- 增删改查
  + 使用文件来保存数据（锻炼异步编码）
- MongoDB
  + （所有方法都封装好了）

## 反馈

-  希望老师再推荐一些前端学习的书籍，谢谢！
  +  《JavaScript 高级编程》第3班
  +  学习，解决问题
  +  书本可以更好的系统的整理学过的内容，了解一些细节
  +  《JavaScript 语言精粹》
- seo的资料，嘿嘿
  + 网站运营 SEO
  + SEO 运营专员
  + 百度、Google、搜狗、
- 最后老师那个怎么做案例的步骤真的是很有用 觉得今天的反馈 大概又是夸老师的比较多 老师声音很有特点
- 老师讲的很仔细,虽然语速有点快但是会重复很多遍,即使第一遍没听会第二遍第三遍也懂了.很好.
-  使用markdown一次只能打开一个文件,不知道怎么建文件夹，是需要安插件吗?
-  老师，软件版本的升级是以什么作为理论支持的，为什么跳跃间隙可以这么大？还有，看上了老师的电子图书馆，瞬间好爱学习呀，真的！
  +  软件开发版本里面涉及到软件工程学： 
  +  x.x.x
    *  0.0.1
    *  0.0.2
    *  1.1.5
    *  1.9.2
    *  2（新增功能比较多，甚至可能去除了某些功能）.5(加入了新功能).0（修复bug，提升性能）
    *  大版本
    *  一般是这些客户端软件、技术框架开发者比较理解的多
    *  做网站很少涉及到版本的概念，网站的目的就是快
- art-template里面用的语法是jQuery吗， each什么的 我晕了 each,forEach, 遍历的全混了
  + art-template 和 jQuery 一毛钱关系都没有
  + each 是 art-template 的模板语法，专属的
  + {{each 数组}}
  + <li>{{ $value }}</li>
  + {{/each}} 这是 art-template 模板引擎支持的语法，只能在模板字符串中使用
  + $.each(数组, function)
  + $('div').each(function) 一般用于遍历 jQuery 选择器选择到的伪数组实例对象
  + forEach 是 EcmaScript 5 中的一个数组遍历函数，是 JavaScript 原生支持的遍历方法 可以遍历任何可以被遍历的成员
  + jQuery 的 each 方法和 forEach 几乎一致
  + 由于 forEach 是 EcmaScript 5 中的，所以低版本浏览器不支持
- 每一次的复习贼重要 老师很不错 我喜欢
- 在以后的工作中 用到node.js的地方多吗？ 在留言本的案例中 点击发表留言跳转页面的路径是url路径 和之前写的页面跳转写的文件路径还是有点分不清。
  + 技多不压身
  + Node 对于前端来讲是进阶高级前端开发工程师必备的技能
  + 屌丝最容易逆袭的职业
  + 见得东西多了你就不怕了
  + 为所欲为
-  老师讲的挺清晰的 可是第一节太困了 路径有点没转变过来
- 如果从a中调用b中的数据，又从b中调用a中的数据，执行a代码，为什么把b中的执行完后才会执行a，而不是在b调用a的时候a中的代码继续执行
  + a 加载了 b
    * 执行 b 中的代码
    * 同时得到 b 中导出的接口对象：exports
    * 执行 b 的过程中发现 b 也在 require a
    * b 就会反过来执行 a
    * a 中又加载 b
    * b 又反过来加载 a
    * 这就是循环加载
    * 如果你一旦出现了这种情况，说明你的思路有问题。
    * jQuery.js （可能不可能出现 jQuery 依赖了 main）
    * main.js 依赖了 jQuery
    * 这个问题是矛盾。
  + b 中也加载了 a
  + 
  + 网页中所有的路径其实都是 url 路径，不是文件路径
- 问题就是不知道问题是什么,写案例的时候似懂非懂
- 感觉思维有点跟不上,

## 复习

- 网站开发模型
  + 黑盒子、哑巴
  + 写代码让它变得更智能
  + 按照你设计好的套路供用户使用

- 在 Node 中使用 art-template 模板引擎
  + 安装
  + 加载
  + template.render()
- 客户端渲染和服务端渲染的区别
  + 最少两次请求，发起 ajax 在客户端使用模板引擎渲染
  + 客户端拿到的就是服务端已经渲染好的
- 处理留言本案例首页数据列表渲染展示
- 处理留言本案例发表留言功能
  + 路径
  + 设计好的请求路径
  + $GET 直接或查询字符串数据
  + Node 中需要咱们自己动手来解析
    * url.parse()
  + /pinglun?name=jack&message=hello
  + split('?')
  + name=jack&message=hello
  + split('&')
  + name=jack message=hello
  + forEach()
  + name=jack.split('=')
  + 0 key
  + 1 value
- 掌握如何解析请求路径中的查询字符串
  + url.parse()
- 如何在 Node 中实现服务器重定向
  + header('location')
    * 301 永久重定向 浏览器会记住
      - a.com b.com
      - a 浏览器不会请求 a 了
      - 直接去跳到 b 了
    * 302 临时重定向 浏览器不记忆
      - a.com b.com
      - a.com 还会请求 a
      - a 告诉浏览器你往 b
- Node 中的 Console（REPL）使用

## 上午总结

- jQuery 的 each 和 原生的 JavaScript 方法 forEach
  + EcmaScript 5 提供的
    * 不兼容 IE 8
  + jQuery 的 each 由 jQuery 这个第三方库提供
    * jQuery 2 以下的版本是兼容 IE 8 的
    * 它的 each 方法主要用来遍历 jQuery 实例对象（伪数组）
    * 同时它也可以作为低版本浏览器中 forEach 替代品
    * jQuery 的实例对象不能使用 forEach 方法，如果想要使用必须转为数组才可以使用
    * `[].slice.call(jQuery实例对象)`
- 模块中导出多个成员和导出单个成员
- 301 和 302 状态码区别
  + 301 永久重定向，浏览器会记住
  + 302 临时重定向
- exports 和 module.exports 的区别
  + 每个模块中都有一个 module 对象
  + module 对象中有一个 exports 对象
  + 我们可以把需要导出的成员都挂载到 module.exports 接口对象中
  + 也就是：`moudle.exports.xxx = xxx` 的方式
  + 但是每次都 `moudle.exports.xxx = xxx` 很麻烦，点儿的太多了
  + 所以 Node 为了你方便，同时在每一个模块中都提供了一个成员叫：`exports`
  + `exports === module.exports` 结果为  `true`s
  + 所以对于：`moudle.exports.xxx = xxx` 的方式 完全可以：`expots.xxx = xxx`
  + 当一个模块需要导出单个成员的时候，这个时候必须使用：`module.exports = xxx` 的方式
  + 不要使用 `exports = xxx` 不管用
  + 因为每个模块最终向外 `return` 的是 `module.exports`
  + 而 `exports` 只是 `module.exports` 的一个引用
  + 所以即便你为 `exports = xx` 重新赋值，也不会影响 `module.exports`
  + 但是有一种赋值方式比较特殊：`exports = module.exports` 这个用来重新建立引用关系的
  + 之所以让大家明白这个道理，是希望可以更灵活的去用它
- Node 是一个比肩 Java、PHP 的一个平台
  + JavaScript 既能写前端也能写服务端

```javascript
moudle.exports = {
  a: 123
}

// 重新建立 exports 和 module.exports 之间的引用关系
exports = module.exports

exports.foo = 'bar'
```

```javascript
Array.prototype.mySlice = function () {
  var start = 0
  var end = this.length
  if (arguments.length === 1) {
    start = arguments[0]
  } else if (arguments.length === 2) {
    start = arguments[0]
    end = arguments[1]
  }
  var tmp = []
  for (var i = start; i < end; i++) {
    // fakeArr[0]
    // fakeArr[1]
    // fakeArr[2]
    tmp.push(this[i])
  }
  return tmp
}

var fakeArr = {
  0: 'abc',
  1: 'efg',
  2: 'haha',
  length: 3
}

// 所以你就得到了真正的数组。 
[].mySlice.call(fakeArr)
```

