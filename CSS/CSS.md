### 1. src和href的区别

##### href标识超文本引用，用在link和a等元素上，href是引用和页面关联，是在当前元素和引用资源之间建立联系

浏览器解析到这一句的时候会识别该文档为css文件，会下载并且不会停止对当前文档的处理，这也是为什么建议使用link方式来加载css而不是使用@import。

##### src表示引用资源，表示替换当前元素，用在img，script，iframe上，src是页面内容不可缺少的一部分。

当浏览器解析到这一句的时候会暂停其他资源的下载和处理，直至将该资源加载，编译，执行完毕，图片和框架等元素也是如此，类似于该元素所指向的资源嵌套如当前标签内，这也是为什么要把js放在底部而不是头部。

区别就是：**引入和引用**。

### 2.BFC

**BFC** 全称为块级格式化上下文 (Block Formatting Context) 。BFC是 W3C CSS 2.1 规范中的一个概念，它决定了元素如何对其内容进行定位以及与其他元素的关系和相互作用，当涉及到可视化布局的时候，Block Formatting Context提供了一个环境，HTML元素在这个环境中按照一定规则进行布局。一个环境中的元素不会影响到其它环境中的布局。比如浮动元素会形成BFC，浮动元素内部子元素的主要受该浮动元素影响，两个浮动元素之间是互不影响的。这里有点类似一个BFC就是一个独立的行政单位的意思。可以说BFC就是一个作用范围，把它理解成是一个独立的容器，并且这个容器里box的布局与这个容器外的box毫不相干。

#### 触发BFC的条件

- 根元素或其它包含它的元素

- 浮动元素 (元素的 `float` 不是 `none`)

- 绝对定位元素 (元素具有 `position` 为 `absolute` 或 `fixed`)

- 内联块 (元素具有 `display: inline-block`)

- 表格单元格 (元素具有 `display: table-cell`，HTML表格单元格默认属性)

- 表格标题 (元素具有 `display: table-caption`, HTML表格标题默认属性)

- 具有`overflow` 且值不是 `visible` 的块元素

- 弹性盒（```flex```或`inline-flex`）

- display: flow-root
- column-span: all

#### BFC的约束规则

- 内部的盒会在垂直方向一个接一个排列（可以看作BFC中有一个的常规流）

- 处于同一个BFC中的元素相互影响，可能会发生外边距重叠

- 每个元素的margin box的左边，与容器块border box的左边相接触(对于从左往右的格式化，否则相反)，即使存在浮动也是如此

- BFC就是页面上的一个隔离的独立容器，容器里面的子元素不会影响到外面的元素，反之亦然

- 计算BFC的高度时，考虑BFC所包含的所有元素，连浮动元素也参与计算

- 浮动盒区域不叠加到BFC上

#### BFC可以解决的问题

- 垂直外边距重叠问题
- 去除浮动
- 自适用两列布局（`float` + `overflow`）

### 3.CSS盒模型

1. **IE盒模型**

   ![IE盒模型](C:\Users\吴超\Desktop\笔记\图片\IE盒模型.png)

2. **标准盒模型**

![标准盒模型](C:\Users\吴超\Desktop\笔记\图片\标准盒模型.png)

**标准模式下，一个块的宽度 = width+padding(内边距)+border(边框)+margin(外边距)；**

**怪异模式下，一个块的宽度 = width+margin(外边距)  （即怪异模式下，width包含了border以及padding）;**

```css
box-sizing:content-box;	// 设置标准盒模型，默认值
box-sizing:border-box;	// 设置IE盒模型
```



#### fixed 定位超出内容无法看到的问题:给定位的盒子加上 
```css
overflow: auto;
 height: 100%;
```



### 4.table

#### 1.设置1px的边框

```css
table{
    border-collapse:collapse;
    border-spacing: 0px;
    background-color: rgba(42, 46, 51, 1);
    table-layout : fixed;	/* 设置每一列等宽，可以兼容IE */
}
th,td{
    border: 0.5px solid #aaa;
}
```

### 5. 表单

#### 1.IE下input框后面默认带有X和password的预览眼睛，去除方法

```css
input::-ms-clear, input::-ms-reveal{
        display: none;
  }
```

### 6.HTML5 拖放（Drag 和 Drop）

draggable 属性规定元素是否可拖动。

**提示：** 链接和图像默认是可拖动的。

```html
<element draggable="true|false|auto">
```

```shell
<script>
function allowDrop(ev)
{
    ev.preventDefault();
}
 
function drag(ev)
{
    ev.dataTransfer.setData("Text",ev.target.id);
}
 
function drop(ev)
{
    ev.preventDefault();
    var data=ev.dataTransfer.getData("Text");
    ev.target.appendChild(document.getElementById(data));
}
</script>
</head>
<body>
 
<p>拖动 RUNOOB.COM 图片到矩形框中:</p>
 
<div id="div1" ondrop="drop(event)" ondragover="allowDrop(event)"></div>
<br>
<img id="drag1" src="/images/logo.png" draggable="true" ondragstart="drag(event)" width="336" height="69">
```

**1.拖动什么 - ondragstart 和 setData()**

ondragstart 属性调用了一个函数，drag(event)，它规定了被拖动的数据。

dataTransfer.setData() 方法设置被拖数据的数据类型和值：

Text 是一个 DOMString 表示要添加到 drag object 的拖动数据的类型。值是可拖动元素的 id ("drag1")。

**2.放到何处 - ondragover**

ondragover 事件规定在何处放置被拖动的数据。

默认地，无法将数据/元素放置到其他元素中。如果需要设置允许放置，我们必须阻止对元素的默认处理方式。

这要通过调用 ondragover 事件的 event.preventDefault() 方法

**3.进行放置 - ondrop**

当放置被拖数据时，会发生 drop 事件。

在上面的例子中，ondrop 属性调用了一个函数，drop(event)：



### 7.@import

- @import，发送http请求的是同步的，link发送请求是异步的，项目中应该避免使用@import的使用



### 8.style

- style不会发送http请求，会和html同时渲染，比link请求css的方式更好，但是不能编译过多的css



### 9.文本移除隐藏

```css
// 单行为本溢出
white-space: nowrap;
overflow: hidden;
text-overflow: ellipsis;

// 多行文本溢出异常，但是不兼容IE11以下的浏览器
text-overflow: -o-ellipsis-lastline;
overflow: hidden;
text-overflow: ellipsis;
display: -webkit-box;
-webkit-line-clamp: 2;
-webkit-box-orient: vertical;
```



### 10.垂直居中

```css
/* leading-trim */
h1 { 
 text-edge: cap alphabetic;
 leading-trim: both;
}
```

