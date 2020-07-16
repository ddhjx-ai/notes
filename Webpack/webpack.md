## 1.export和import

 **ES6模块主要有两个功能：export和import** 

**export： 用于对外输出本模块（一个文件可以理解为一个模块）变量的接口 **

**import： 用于在一个模块中加载另一个含有export接口的模块 **

 也就是说使用export命令定义了模块的对外接口以后，其他JS文件就可以通过import命令加载这个模块（文件） 

```javascript
export xxx;	//可以导出任意需要导出的成员
export const a = 123;
export function (){};
export class Person(){};
...
export defalut xxx;	//导出默认的成员，较常用



import * as all from './xxx';	// 引入所有导出的成员
import {a,b,c,...} from './xxx'; 	// 引入指定的成员
import xxx from './xxx';		// 引入export defalut 的默认成员,较常用
import './xxx';			// 只引入代码，不引入内部成员，例如:images、css...


```

## 2.export与export default

1.  export与export default均可用于导出常量、函数、文件、模块等 
2.  你可以在其它文件或模块中通过import+(常量 | 函数 | 文件 | 模块)名的方式，将其导入，以便能够对其进行使用 
3.  在一个文件或模块中，export、import可以有多个，export default仅有一个 
4.  通过export方式导出，在导入时要加{ }，export default则不需要 
5.  使用export default命令，为模块指定默认输出，这样就不需要知道所要加载模块的变量名。 

## 3.vue-cli初始化vue项目里各文件的作用

1.  README.md ：这是一个项目说明文件； 
2.  package.json : 这是一个依赖包，也就是第三方模块依赖存放处； 
3.  package-lock.json : 这是package的锁文件，确定安装的第三方包版本，为了统一团队的编码； 
4.  LICRENSE ：开源协议的说明； 
5.  index.html : 项目默认的首页模版文件； 
6.  postcssrc.js : postcssrc的配置项； 
7.  gitignore : 使用git希望把代码放到线上，但是一些特殊的文件并不想或者不需要传到线上，就可以把它配置到gitgnore文件里，当提交到git仓库文件时，这里的文件就不会被提交到git线上仓库； 
8.  eslintrc.js : 代码的规范，看代码是否标准； 
9.  eslintignore : 在根目录下的/bulid/ /congig/ /dist/ /*js/ 是不会受eslintignore文件的代码规范影响的； 
10.  editorconfig : 配置编辑器里的语法，里面可以自定义内容，可统一编辑器自动格式化代码 
11.  babelrc : 语法解析器，因为项目是vue单文件组件的写法，需要babellrc解析器做一些语法转换，解析成浏览器能够编译识别的代码； 
12.  static : 这里放的是静态资源（静态图片，后续模拟的json数据）； 
13.  node_module : 项目依赖的第三方node包，这个里面内容可以不用管，只要知道是放的依赖包就行了； 
14.  src ： 放的是整个项目的源代码 
    1.  main.js ：是整个项目的入口文件； 
    2.  APP.vue : 项目的最原始的根组件； 
    3.  router ： 项目的所有路由都放在router下的index.js 文件夹里； 
    4.  componens : 放的是项目里要用到的小组件； 
    5.  assets ：放的是项目里要用到的图片资源； 
    6.  config ：放的是项目里的配置文件，基础的配置文件放在index.js 里，开发的环境配置信息放到dev.env.js; 
    7.  bulid.js : 这个是项目打包的webpack配置内容，webpack.base.conf.js/webpack.dev.conf.js/webpack.prod.conf.js/这三个文件分别依次按照顺序配置了基础配置/线上环境开发配置/生产环境开发配置； 



## webpack的基本使用

### 1.在项目中安装和配置webpack

1. 运行 `npm i webpack webpack-cli -D`，安装 webpack 相关包
2. 在项目根目录中，创建`webpack.config.js`的 webpack 配置文件
3. 在 webpack 的配置文件中，初始化一下配置：

```javascript
modules.exports = {
    mode:'development'  // 指定构建模式，开发模式  prodution：生产模式
}
```

4. 在 package.json 文件中的 scripts 节点下，新增 dev 脚本：

```javascript
"scripts":{
    "dev":"webpack"		// 可以通过 npm run dev 执行
}
```

5. 在终端运行 `npm run dev` 命令，启动 webpack 进行项目打包

### 2.配置打包的入口和出口

webpack 的 4.x 版本中默认约定：

- 打包的`入口文件`为：src --> index.js
- 打包的`输出文件`为：dist --> main.js

如果要修改打包的入口和出口，可以在 webpack.config.js 中新增一下配置信息

```javascript
const path = require('path')		// 导入 node.js 中操作路径的模块
module.exports = {
    entery:path.join(__dirname,'./src/index.js')	// 打包入口文件
    output:{
		path:path.join(__dirname,"./dist")		// 输出文件的存放路径
        filename:'bundle.js'					// 输出文件的名称
	}
}
```

### 3.配置 webpack 的自动打包功能

- `npm i webpack-dev-server -D`

- 修改 package.json 中 scripts 的 dev 命令

  ```javascript
  "scripts":{
  	"dev":"webpack-dev-server"
  }
  ```

- 将 index.html 中的 script 的引用路径修改为 '/bundle.js'
- 运行 npm run dev ，就可以实现自动打包了
- 在浏览器中访问 http://locahost:808  地址，可以查看打包效果

**注意：**

- webpack-dev-server 会启动一个实时的 http 服务器
- webpack-dev-server 打包生成的输出文件，默认放到项目的根目录下，而且是虚拟的、看不见的

### 4. 配置 html-webpack-plugin 生成预览页面

- 运行 `npm i html-webpack-plugin -D` 安装生成预览页面的插件
- 修改webpack.config.js 文件头部区域，添加以下配置：

```javascript
// 导入生成预览页面的插件，得到一个构造函数
let HtmlWebpackPlugin = require('html-webpack-plugin')
let htmlwebpack = new HtmlWebpackPlugin({
    template:'./src/index.html',// 指定要用到的模板文件
    filename:'index.html'		// 指定生成的文件的名称，改文件存在于内存中，在目录中不显示
})
```

- 修改 webpack.config.js 文件中向外暴露的配置对象，新增以下配置：

```javascript
module.exports={
    plugins:[
        htmlwebpack		//	plugins 数组是 webpack打包期间会用的一些插件列表
    ]
}
```

### 5. 配置自动打包相关的参数

```javascript
// 在 package.json 文件中配置
"scripts":{
    "dev":"webpack-dev-server --open --host --port 3000"
}
// --open 打包完成之后自动打开浏览器页面
// --host 配置 ip 地址,默认为 127.0.0.1
// --port 配置端口号
```

### 6. webpack 中的加载器 loader

#### 1. 通过 loader 打包非 js 模快

在实际开发中，webpack  默认只能打包处理以 js 为后缀名的文件，其他非 js 文件，webpack 默认是处理不了的，需要调用 loader 加载器才能正常打包，否则会报错

**loader 加载器可以协助 webpack 打包处理特定的文件模块**

- less-loader  可以打包处理 less 相关的文件
- sass-loader 可以打包处理 scss 相关的文件
- url-loader 可以打包处理 css 中 url 路径相关的文件

#### 2. loader 的调用过程

<img src="C:\Users\吴超\Desktop\笔记\图片\webpack中的loader.png" alt="webpack中的loader" style="zoom: 67%;" />

#### 3.打包处理 css 文件

- `npm i style-loader css-loader -D` 安装 css 文件的 loader
- 在  webpack.config.js 的 module.exports -> module对象 -> rules数组 中，添加 loader 规则 

```javascript
// 所有第三方文件模块的匹配规则
module:{
	rules:[
        {test:/\.css$/,use:['style-loader','css-loader']}
    ]
}
```

其中 test 表示匹配的文件类型， use 表示对应要调用的 loader

**注意：**

- use 数组中指定的 loader 顺序是固定的
- 多个 loader 的调用顺序是：从后往前调用的

#### 4.打包处理 less 文件

- `npm i less-loader less -D`
- 在  webpack.config.js 的 module.exports -> module对象 -> rules数组 中，添加 loader 规则 

```javascript
rules:[
    {test:/\.less$/,use:['style-loader','css-loader','less-loader']}
]
```

#### 5.打包处理 scss 文件

- `npm i sass-loader node-sass -D `
- 在  webpack.config.js 的 module.exports -> module对象 -> rules数组 中，添加 loader 规则 

```javascript
rules:[
    {test:/\.scss$/,use:['style-loader','css-loader','sass-loader']}
]
```

#### 6.配置 postCSS 自动添加 css 的兼容前缀

- `npm i post-loader autoprefixer -D`
- 在项目的根目录中创建 postcss 的配置文件  postcss.config.js，并初始化以下配置

```javascript
let autoprefixer = require('autoprefixer')		// 导入自动添加前缀的插件
module.exports = {
    plugins:[ autoprefixer ] 			// 挂载插件
}
```

- 在 webpack.config.js 的 module.exports -> module对象 -> rules数组 中，添加 loader 规则

```javascript
rules:[
    {test:/\.css$/,use:['style-loader','css-loader','postcss-loader']}
]
```

#### 7.打包 css 样式表中的图片和字体文件

- `npm i url-loader file-loader -D`
- 在 webpack.config.js 的 module.exports -> module对象 -> rules数组 中，添加 loader 规则

```javascript
rules:[
    {
        test:/\.(jpg|png|gif|bmp|eot|svg|woff|woff2)$/,
        use:'ulr-loader?limit=8848'
    }
]
```

其中 ？ 之后的是 loader  的参数项

limit 用来指定图片的大小，单位是字节（byte），只有小于 limit 的图片，才会被转换为 base64 的图片

#### 8.打包处理 js 文件中的高级语法

- 安装babel转换器相关的包：`npm i babel-loader @babel/core @babel/runtime -D`
- 安装babel语法插件相关的包：`npm i @babel/prest-env  @babel/plugin-transform-runtime  @babel/plugin-proposal-class-properties -D`
- 在项目的根目录中，创建 babel 配置文件 babel.config.js  并初始化基本配置

```javascript
module.exports = {
    presets:['@babel/preset-env'],
    plugins:['@babel/plugin-transform-runtime','@babel/plugin-proposal-class-properties']
}
```

- 在 webpack.config.js 的 module.exports -> module对象 -> rules数组 中，添加 loader 规则

```javascript
// exclude 为排除项，表示 babel-loader 不需要处理 node_modules 中的 js 文件
{test:/\.js$/,use:'babel-loader',exclude:/node_modules/}
```

## 4.webpack常见问题解决

### 1.  3.0脚手架开发过程中，经常出现语法检测问题

解决：在项目中新建 `vue.config.js` 文件，在该文件下执行以下代码：

```javascript
module.exports = {
    lintOnSave:false
}
```

### 2.vue 项目中的" 和 ；和 （） 提示报错的问题

1. 在项目根目录中创建一个文件 `.prettierrc`

```javascript
{
	"semi":false,		// 格式化代码时，不会默认在代码结尾加 ;
    "singleQuote":true	// 格式化代码时，字符串默认被单引号包裹
}
```

2. vue项目中 函数名后面的 () 默认前后都要添加空格，否则飘红，解决方法

```javascript
// .eslintrc.js 文件下 rules 对象中添加命令
"space-before-function-paren":0
```

### 3.vue项目中路径起别名

<font color=blue>webpack.base.conf.js文件下的 resolve 属性中 'alias' 为图片或者文件路径起别名</font>

**vue-cli 2.x 的用法**

```javascript
resolve: {
    // 导入这些文件时，可以省略后缀
    extensions: ['.js', '.vue', '.json'],
    // 给路径起别名
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': resolve('src'),
      'assets': resolve('src/assets')
    }
  }

// 组件中使用
<img src="~assets/logo.png">
```

**vue-cli 3.x 的用法**

```javascript
// 1.新建一个js文件 vue.config.js
module.exports = {
    configureWebpack: {
		resolve:{
            alias:{
                '@':'src',	// 默认的路径别名
                'assets':'@/assets'
            }
        }
    }
}
```

### 4. vue-cli 2.x 关闭Eslint代码风格检测

```shell
config/index.js 文件中的 useEslint:false, 即可
```

### 5.创建vue-cli 2.x项目时，runtime-compiler和runtime-only 的区别

