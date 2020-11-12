## 1.win10中使用32位IE浏览器

win10中微软把32位IE版跟64位IE合并了，所以无论从Program Files还是 Program Files (x86) 打开的IE，都是一致的，要么都是32位，要么都是64位。无论哪种，主进程都是64位IE，所以资源管理器中永远都是定位到64位的目录：

除非用ProcessExplorer等高级工具查看才可以查看到子进程的32位IE信息：

设置win10打开32位IE还是64位IE：

1. 打开注册表：Window + R，打开运行命令框，键入命令：regedit，就进入注册表编辑器
2. 定位到 **HKEY_CURRENT_USER\Software\Microsoft\Internet Explorer\Main**，在右侧列表中找到 **TabProcGrowth**  设置值为非0 (1即可)，如果这一项不存在，右键点击新建 **DWORD**，输入 **TabProcGrowth**  ，值设置为 1
3. 退出 IE 重新打开即可



## 2.vue2.0 ie 报错Invalid Host/Origin header

报错原因：同时启动了两个项目，只有一个报错，一个是localhost:8080的另外一个是localhost:8081的结果81的就一直报错，止不住的报，后来发现好像是本地代理的问题，

**解决方案：**

1. Internet选项->安全->本地Internet->站点，把所有勾选取消
2. Internet选项->安全->本地Internet->站点->高级->添加 ws://localhost:81/
3. 网上还有说在webpack.dev.conf.js文件里配置disableHostCheck:true,这个属性

![Invalid Host_Origin header](C:\Users\吴超\Desktop\笔记\项目问题\images\Invalid Host_Origin header.png)



## 3.IE浏览器不支持Promise对象

1. npm install --save-dev babel-polyfill
2. 在main.js中引入： import “babel-polyfill”  （**要在引入vue，vuex，elementui 之前引入**）



## 4.关闭vue项目中的ESlint（代码风格报错提示）

1. 最好的办法就是创建项目的时候不要ESlint
2. 关闭软件webstorm 的ESlint
   - 关闭软件webstorm 的ESlint
3. 注释掉项目内的ESlint
   1. 项目目录下build.js->webpack.base.conf.js文件里面有段代码 注释掉！！！

![eslint](C:\Users\吴超\Desktop\笔记\项目问题\images\eslint.png)



## 5.Vue 项目在 IE11 中数据更改后页面数据无变化

**问题原因：**

- 在 IE11 中，如果 GET 请求相同的 URL ，浏览器默认会使用之前的缓存数据，而不是重新请求接口

**解决方案：**

- 针对 IE 浏览器，在每个请求末尾都添加一个时间戳，保证每个请求都是独立的即可
- 因为其他浏览器不存在此问题，所以添加时对浏览器进行判断，只为 IE 添加

```javascript
if (window.ActiveXObject || 'ActiveXObject' in window) {
  options.url = `${options.url}?${new Date().getTime()}`
}
```

