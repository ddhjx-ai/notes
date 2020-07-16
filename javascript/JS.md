## 1. 原型链

#### 1.1 创建对象的集中方式

```javascript
// 1.字面量
var obj1 = {};
// 2.构造函数
var 0bj2 = new Object();
// 3.自定义构造函数
function Fn(){};
var obj3 = new Fn()
// 4.Object create()
//  Object.create()方法创建一个新对象，使用现有的对象来提供新创建的对象的__proto__。
var p = {name:'zs'}
var obj4 = Object.create(p)
```

#### 1.2原型链

<img src="C:\Users\吴超\Desktop\笔记\图片\原型链.png" alt="原型链" style="zoom: 50%;" />

#### 1.3 new 关键字

 `new`操作符做了这些事： 

- 像普通函数执行一样，形参一个私有的作用域
-  默认创建一个对象，让函数中的this执行这个对象，这个对象就是当前类的一个实例
- 代码执行
- 默认把创建的对象返回

```javascript
function _new(fn,...arg){
    var obj = {};
    obj.__proto__ = fn.prototype;
    fn.call(obj,...arg);
    return obj;
}
```

#### 1.4 类的继承

```javascript
/*
	1. call继承：借用构造函数实现继承
		将父类私有的属性和方法，克隆一份一模一样的作为子类私有的属性和方法；但是父类原型上的方法和属性无法被继承
*/
function Fa(){
    this.x = 100;
}
Fa.prototype.getX = function(){
    console.log(this.x)
}
function Son(){
    Fa.call(this)
}
var s = new Son();
console.log(s.x);	// 100
// s.getX(); // 报错
console.log(s.__proto__.constructor);	// Son

/*
	2.冒充对象继承:
		将父类私有的和公有的属性和方法克隆一份一模一样赋值给子类私有
*/
function F(){
    this.x = 123;
}
F.prototype.getX = function(){
    console.log(this.x);
}
function S(){
    var temp = new F;
    for(var key in temp){
        this[key] = temp[key]
    }
    temp = null;
}
var s = new S;
s.getX();

/*
	3.原型继承：
		子类B可以继承父类A中的所有的属性和方法(私有+公有)
*/
function A(){
    this.x = 123;
}
A.prototype.a = function(){}
function B(){
    this.y = 'abc';
}
// 子类B想要继承父类A中的所有的属性和方法(私有+公有)，只需要让B.prototype = new A即可
B.prototype = new A;
var b = new B();
console.log(b.x);	// 123
console.log(B.prototype.constructor);	// A
console.log(b.__proto__.constructor);	// A
B.prototype.constructor = B;	// 必须添加这句代码，将 B.prototype.constructor 重新指向 B
console.log(b.__proto__.constructor);	// B

/*
	4.混合模式继承：原型继承+call继承
		父类私有的属性和方法继承给子类私有；父类公有的属性和方法继承给子类公有(但是会多一个私有的属性和方法被重复继承了，而且 父构造函数被执行了两次)
*/
function F(){
    this.y = 101;
}
F.prototype.getY = function(){
    console.log(this.y);
}
function S(){
    F.call(this)
}
S.prototype = new F;
S.prototype.constructor = S;
var s = new S;
s.getY();		// 101

// 混合继承优化
function F(){
    this.y = 101;
}
F.prototype.getY = function(){
    console.log(this.y);
}
function S(){
    F.call(this)
}
// 父构造函数只需要执行一次，并且不会出现方法和属性被重复继承，
//S.prototype = F.prototype;
//S.prototype.constructor = S;
S.prototype = Object.create(F.prototype);
S.prototypr.constructor = S;
var s = new S;
```



## 2.js禁用浏览器后退功能

```javascript
//禁用浏览器后退功能
history.pushState(null, null, document.URL);
window.addEventListener('popstate', function () {
    history.pushState(null, null, document.URL);
});
// 直接屏蔽掉浏览器的后退事件。
// 这页面中引入这段JS后，一切后退事件都会失效，包括APP顶部自带的那个后退按钮，因此需要慎用
```

## 3.Navigator.appVersion

**appVersion 属性：可返回浏览器的平台和版本信息。该属性是一个只读的字符串，所有主要浏览器都支持 appVersion 属性**

## 4. window.devicePixelRatio

**返回当前显示设备的物理像素分辨率与 CSS 像素分辨率的比率**

设备物理像素和设备独立像素的比例，也就是 devicePixelRatio = 物理像素 / 独立像素。css中的px就可以看做是设备的独立像素，所以通过devicePixelRatio，我们可以知道该设备上一个css像素代表多少个物理像素。例如，在Retina屏的iphone上，devicePixelRatio的值为2，也就是说1个css像素相当于2个物理像素。但是要注意的是，devicePixelRatio在不同的浏览器中还存在些许的兼容性问题.

这在处理标准显示与 HiDPI 或 Retina 显示之间的差异时很有用，它使用更多屏幕像素绘制相同对象，从而产生更清晰的图像。

当此值发生变化时（例如，如果用户将 window 拖到具有不同像素密度的显示器上），则无法通知该值。由于没有可用于检测像素密度变化的回调或事件，因此唯一的方法是定期检查其 devicePixelRatio 值是否已更改。不要经常这样做，否则会影响性能。

## 5.onpageshow事件

**事件在用户浏览网页时触发；**

事件类似于 onload 事件，onload 事件在页面第一次加载时触发， onpageshow 事件在每次加载页面时触发，即 onload 事件在页面从浏览器缓存中读取时不触发。

为了查看页面是直接从服务器上载入还是从缓存中读取，你可以使用 PageTransitionEvent 对象的 **persisted** 属性来判断。 如果页面从浏览器的缓存中读取该属性返回 ture，否则返回 false

## 6.document.readyState

**属性返回当前文档的状态**

- uninitialized:还未开始载入;
- loading:载入中;
- interactive:已加载，文档与用户可以开始交互;
- complete:载入完成

## 7.DOMContentLoaded事件

**dom内容加载完毕触发**

- **DOMContentLoaded事件触发的确切时间：**

当文档中没有脚本时，浏览器解析完文档便能触发DOMContentLoaded 事件；如果文档中包含脚本，则脚本会阻塞文档的解析，而脚本需要等位于脚本前面的css加载完才能执行。在任何情况下，DOMContentLoaded 的触发不需要等待图片等其他资源加载完成。

- **HTML文档被加载和解析完成原理：**

浏览器下载文档 -> 浏览器解析文档（解析文档的步骤：1. HTML -> DOM, CSS -> CSSOM; 2. DOM + CSSOM => Render Tree(渲染树); 3. Layout(根据渲染树计算出节点在页面中的大小和位置); 4. Paint(将节点绘制到浏览器上)） -> 加载和执行javascript会阻塞浏览器解析文档

![浏览器解析文档流程](C:\Users\吴超\Desktop\笔记\图片\浏览器解析文档流程.jpg)

- **load事件**

页面上所有的资源（图片，音频，视频等）被加载以后才会触发load事件，简单来说，页面的load事件会在DOMContentLoaded被触发之后才触发

## 8.meta name="viewport" content="width=device-width,initial-scale=1.0"

**content属性值 :**

- width:可视区域的宽度，值可为数字或关键词device-width
- height:同width
- intial-scale:页面首次被显示是可视区域的缩放级别，取值1.0则页面按实际尺寸显示，无任何缩放
- maximum-scale=1.0, minimum-scale=1.0;可视区域的缩放级别，
- maximum-scale用户可将页面放大的程序，1.0将禁止用户放大到实际尺寸之上。
- user-scalable:是否可对页面进行缩放，no 禁止缩放

**viewport的概念:**

通俗的讲，移动设备上的viewport就是设备的屏幕上能用来显示我们的网页的那一块区域，在具体一点，就是浏览器上(也可能是一个app中的webview)用来显示网页的那部分区域，但viewport又不局限于浏览器可视区域的大小，它可能比浏览器的可视区域要大，也可能比浏览器的可视区域要小。在默认情况下，一般来讲，移动设备上的viewport都是要大于浏览器可视区域的，这是因为考虑到移动设备的分辨率相对于桌面电脑来说都比较小，所以为了能在移动设备上正常显示那些传统的为桌面浏览器设计的网站，移动设备上的浏览器都会把自己默认的viewport设为980px或1024px（也可能是其它值，这个是由设备自己决定的），但带来的后果就是浏览器会出现横向滚动条，因为浏览器可视区域的宽度是比这个默认的viewport的宽度要小的。下图列出了一些设备上浏览器的默认viewport的宽度。

![viewport](C:\Users\吴超\Desktop\笔记\图片\viewport.jpg)