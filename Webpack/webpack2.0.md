### 1.webpack五大核心

1. **Entry：**入口，指 webpack 以哪个文件为入口起点开始打包，分析构建内部依赖图
2. **Output：**输出，指 webpack 打包后的资源 bundles 输出到那里去，以及如何命名
3. **Loader：**让 webpack 能够去处理那些非 JavaScript（例如：less、图片之类的文件） 文件（webpack自身自能理解JavaScript和json资源）
4. **Plugins：**插件，可以用于执行范围更广的任务。插件的范围包括，从打包优化和压缩，一直到重新定义环境中的变量等
5. **Mode：**模式，指 webpack 使用相应模式的配置

|    选项     |                             描述                             |            特点            |
| :---------: | :----------------------------------------------------------: | :------------------------: |
| development | 会将 process.env.NODE_EVN 的值设为 development。 启用 NamedChunksPlugin 和 NamedModulesPlugin | 能让代码本地调试运行的环境 |
| production  | 会将 process.env.NODE_EVN 的值设为 development。启用 FlagDependencyUsagePlugin，FlagIncludeChunksPlugin，ModuleConcatenationPlugin，NoEmitOnErrorsPlugin，OccurrenceOrderPlugin，SideEffectsFlagePlugin 和 UglifyJsPlugin | 能让代码优化上线运行的环境 |



### 2.运行指令

1. 开发环境：webpack ./src/index.js -o ./build/built.js --mode=development，webpack 会以 ./src/index.js 为入口文件开始打包，打包后输出到 ./build/built.js。 整体打包环境是开发环境。
2. 生产环境：webpack ./src/index.js -o ./build/built.js --mode=production，webpack 会以 ./src/index.js 为入口文件开始打包，打包后输出到 ./build/built.js。 整体打包环境是开发环境

**结论：**

1. <font color=red>webpack 可以处理 js/json 资源，不能处理 css/img 等其他资源</font>。
2. 生产环境和开发环境将 ES6 模块化编译成浏览器能识别的模块化。
3. 生产环境和开发环境多一个压缩 js 代码。



### 3.webpack.config.js

webpack 的配置文件。

loader：1.下载，2.使用（配置loader）

plugins：1.下载，2.引入，3.使用



- 开发环境运行指令：
  - wenpack：会将打包结果输出
  - npx webpack-dev-server 只会在内存中编译打包，没有输出

```js
// resolve 用来拼接绝对路径的方法
const {resolve} = require('path')
// 打包html资源，npm i html-webpack-plugin -D
const HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
    // 入口
    entry:'./src/index.js',
    // 输出
    output: {
        // 输出文件名
        filename: 'built.js',
        // 输出路径
        // __dirname 代表当前文件的目录路径
        path: resolve(__dirname,'build')
    }，
    // loader的配置
    module: {
        rules: [
            // 详细的loader配置
    		{
    			// 匹配哪些文件
    			test: /\.css$/,
    			// 使用哪些loader进行处理，use数组中的loader执行顺序：从右到左，从下到上依次执行
    			use: [
    				// 创建一个style标签，将js中的样式资源插入js，添加到head中生效
    				'style-loader',
    				// 将css文件变成commonjs模块加载js中，里面内容是样式字符串
    				'css-loader'，
    				/* css兼容性处理： postcss-loader postcss-preset-env
    				在 package.json 中 browserlist里面配置，通过配置加载指定的css兼容型样式
    				“browserlist”:{ github有更多配置
    					//开发化境下，兼容最新版本的浏览器
    					"development": [ 
    						"last 1 chrome version",
    						"last 1 firefox version",
    						"last 1 safari version"
    					],
    					"production":[	生产环境下：默认是生产环境
    						">0.2%",
    						"not dead",
    						"not op_mini all"
    					]
    				}
    				*/
    				{
    					loader: 'postcss-loader',
    					options: [
    						ident:'postcss',
    						plugins:() => {
                                // postcss的插件
                                require('postcss-preset-env')()
                            }
    					]
					}
    			]
			}，
            {
                test: /\.less$/,
                use: [
                    'style-loader',
                    'css-loader',
                    // 将less文件编译成css文件，npm install less-loader less -D
                    'less-loader'
                ]
            }，
            // 处理图片资源
            {
                test: /\.(jpg|png|gif)$/,
            	loader: 'url-loader',
                options: {
                    // 图片大小小于8kb，就会处理为base64，优点：减少请求数量（减轻服务器压力）；					// 缺点：图片体积会更大（文件请求速度更慢）
                    // 下载 url-loader file-loader
                    limit：8*1024,
                    // url-loader默认使用es6模块化进行解析，而html-loader引入图片是commonjs，
                    // 解析时会出现问题：[object Module],需要关闭url-loader的es6模块化，使用
                    // commonjs解析
                    esModule: false,
                    // 图片重命名,[hash:10]取图片的hash的前10位，[ext]取文件的原来扩展名
                    name：'[hash:10].[ext]'，
                    // 图片打包时输出到imgs文件下
                    outputPath: 'imgs'
                }
            }，
            // 处理html文件的img图片（负责引入img，从而能被url-loader进行处理）
            // npm i html-loader -D
            {
                test:/\.html$/,
                loader: 'html-loader'
            }，
            // 打包其他资源（除了html/js/css资源以外的资源）
            {
                exclude:/\.(css|js|html)$/,
                loader:'file-loader',
                options:[
                    name：'[hash:10].[ext]'，
                    // 其他资源打包输出到other文件夹下
                    outputPath: 'other'
                ]
            }
        ]
    }，
    // plugins的配置
    plugins: [
        // 详细plugins的配置
        // html-webpack-plugin默认会创建一个空的HTML，自动引入打包输出的所有资源(js/css)
        new HtmlWebpackPlugin({
            // 复制 './src/index.html'文件，并自动引入输出的所有资源（JS/CSS）
            template: './src/index.html'
        })
    ],
    // 模式
    mode: 'development',
    // 开发服务器 devServer：用来自动化(自动编译，自动打开浏览器，自动刷新浏览器等)
    // 特点：只会在内存中编译打包，不会有任何输出
    // 启动devServer指令为：npx webpack-dev-server （npm i webpack-dev-server -D）
    devServe: {
        // 运行项目的目录，构建后的目录
		contentBase: resolve(__dirname, 'build'),
        // 启动gzip压缩
        compress: true,
        // 端口号
        port: 3000,
        // 自动打开本地默认浏览器
        open: true
    }
}
```

