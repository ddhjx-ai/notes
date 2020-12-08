

##  属性

### selectedIndex 属性

selectedIndex 属性可设置或返回下拉列表中被选选项的索引号。

**注意：** 若允许多重选择，则仅会返回第一个被选选项的索引号。

所有主要浏览器都支持 selectedIndex 属性

**语法**

设置 selectedIndex 属性：

```javascript
  selectObject.selectedIndex=*integer* 
```

返回 selectedIndex 属性：

```javascript
  selectObject.selectedIndex  
```



### Document

```javascript
// 以字符串形式返回文档的地址栏链接（只读属性）
// 该属性的值和DOM Level 0中的document.location.href 属性的值是相等的.然而document.location.href 是可写的, document.URL 是只读的.
document.URL

// 获取文档标题，也可以设置
document.title

// 获取来源地址
document.referrer

// 获取域名
document.domain

// 返回一个HTMLAllCollection集合，包含页面上的所有元素（只读属性）
document.all

// 返回文档中所有锚点元素的列表。（只读属性）
document.anchors

// 返回当前文档的 <body> 或 <frameset> 节点
document.body
```

| 方法                     | 说明                   |
| ------------------------ | ---------------------- |
| document.documentElement | 文档节点即html标签节点 |
| document.body            | body标签节点           |
| document.head            | head标签节点           |
| document.links           | 超链接集合             |
| document.anchors         | 所有锚点集合           |
| document.forms           | form表单集合           |
| document.images          | 图片集合               |

| 节点属性        | 说明             |
| --------------- | ---------------- |
| childNodes      | 获取所有子节点   |
| parentNode      | 获取父节点       |
| firstChild      | 子节点中第一个   |
| lastChild       | 子节点中最后一个 |
| nextSibling     | 下一个兄弟节点   |
| previousSibling | 上一个兄弟节点   |

| 节点属性               | 说明             |
| ---------------------- | ---------------- |
| parentElement          | 获取父元素       |
| children               | 获取所有子元素   |
| childElementCount      | 子标签元素的数量 |
| firstElementChild      | 第一个子标签     |
| lastElementChild       | 最后一个子标签   |
| previousElementSibling | 上一个兄弟标签   |
| nextElementSibling     | 下一个兄弟标签   |



##  事件

#### transitionend 事件

 transitionend 事件在 CSS 完成过渡后触发。

**语法**

```javascript
object.addEventListener("transitionend", myScript);
```



**注意：** 如果过渡在完成前移除，例如 CSS [transition-property](https://www.runoob.com/cssref/css3-pr-transition-property.html)  属性被移除，过渡事件将不被触发。

**注意：** Internet Explorer 8 及更早 IE 版本不支持 [addEventListener()](https://www.runoob.com/jsref/met-element-addeventlistener.html) 方法。

### 1. DOM 事件

#### 1.1 事件级别

1. DOM0 ``element.onclick = function(){}``
2. DOM2 element.addEventListener('click',function(){},false);  false:默认值，事件是在冒泡阶段触发，true：事件是在捕获阶段触发
3. DOM3 element.addEventListener('keyup',function(){},false)

#### 2.2 事件模型

- 事件捕获和事件冒泡

#### 2.3 事件流

- 捕获阶段 -> 目标阶段 -> 冒泡阶段
- 捕获阶段的具体流程：window -> document -> html -> body -> .....（冒泡阶段与之相反）

#### 2.4 Event 事件对象

1. event.preventDefault()	阻止默认行为
2. event.stopPropagation() 阻止冒泡的行为
3. event.stopImmediatePropagation()  事件响应优先级
4. event.currentTarget()  表示当前所绑定的事件
5. event.target()  表示事件执行的目标元素

#### 2.5 自定义事件

```javascript
var eve = new Event('custome');
ev.addEventListener('custome',function(){
    console.log('custome')
})
ev.dispatchEvent(eve)
```

### DOM属性

#### 1.dom.getBoundingClientRect()

通过dom.getBoundingClientRect() 动态获取基于窗口的坐标；返回 边框的只读属性——left、top、right和bottom，单位为像素。除了 width 和 height 外的属性都是相对于视口的左上角位置而言的。 



## 盒子尺寸

| 方法                          | 说明                                                         | 备注                           |
| ----------------------------- | ------------------------------------------------------------ | ------------------------------ |
| element.getBoundingClientRect | 返回元素在视口坐标及元素大小，不包括外边距，width/height与offsetWidth/offsetHeight匹配 | 窗口坐标                       |
| element.getClientRects        | 行级元素每行尺寸位置组成的数组                               |                                |
| element.offsetParent          | 拥有定位属性的父级，或body/td/th/table                       | 对于隐藏元素/body/html值为null |
| element.offsetWidth           | 元素宽度尺寸，包括内边距与边框和滚动条                       |                                |
| element.offsetHeight          | 元素高度尺寸，包括内边距与边框和滚动条                       |                                |
| element.offsetLeft            | 相对于祖先元素的X轴坐标                                      |                                |
| element.offsetTop             | 相对于祖先元素的Y轴坐标                                      |                                |
| element.clientWidth           | 元素宽度，不包含边框，只包含内容和内边距，行元素尺寸为0      |                                |
| element.clientHeight          | 元素高度，不包含边框，只包含内容和内边距，行元素尺寸为0      |                                |
| element.clientLeft            | 内容距离外部的距离，滚动条在左侧时包括滚动条尺寸             |                                |
| element.clientTop             | 内容距离顶部的距离，滚动条在顶部时包括滚动条尺寸             |                                |
| element.scrollWidth           | 元素宽度，内容+内边距+内容溢出的尺寸                         |                                |
| element.scrollHeight          | 元素高度，内容+内边距+内容溢出的尺寸                         |                                |
| element.scrollLeft            | 水平滚动条左侧已经滚动的宽度                                 |                                |
| element.scrollTop             | 垂直滚动条顶部已经滚动的高度                                 |                                |

**为什么不要使用getComputedStyle**

- 尺寸设置auto时获取结果不可用
- 由于滚动条的存在，不同浏览器返回结果不同
- 元素没有设置尺寸获取不到



### 坐标判断

JS提供了方法获取指定坐标上的元素，如果指定坐标点在视口外，返回值为NULL

- 坐标都是从左上角计算，这与CSS中的right/bottom等不同
- 窗口坐标类似于position:fixed
- 文档坐标类似于position:absolute

| 方法                              | 说明                         |
| --------------------------------- | ---------------------------- |
| document.elementsFromPoint（x,y） | 返回指定坐标点所在的元素集合 |
| document.elementFromPoint(x, y)   | 返回指定坐标点最顶级的元素   |



### 滚动控制

| 方法                                   | 说明                           | 参数说明                                                     |
| -------------------------------------- | ------------------------------ | ------------------------------------------------------------ |
| window.pageXOffset                     | 文档相对窗口水平滚动的像素距离 |                                                              |
| window.pageYOffset                     | 文档相对窗口垂直滚动的像素距离 |                                                              |
| element.scrollLeft()                   | 元素X轴滚动位置                |                                                              |
| element.scrollTop()                    | 元素Y轴滚动位置                |                                                              |
| element.scrollBy()                     | 按偏移量进行滚动内容           | 参数为对象，{top:垂直偏移量,left:水平偏移量,behavior:'滚动方式'} |
| element.scroll() 或 element.scrollTo() | 滚动到指定的具体位置           | 参数为对象，{top:X轴文档位置,left:Y轴文档位置,behavior:'滚动方式'} |
| element.scrollLeft                     | 获取和设置元素X轴滚动位置      | 这是属性，设置X轴文档位置                                    |
| element.scrollTop                      | 获取和设置元素Y轴滚动位置      | 这是属性，设置Y轴文档位置                                    |
| element.scrollIntoView(bool)           | 定位到顶部或底部               | 参数为true元素定位到顶部，为false定位到窗口底部              |