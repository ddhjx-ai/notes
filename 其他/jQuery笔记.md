#### 1.width().height().innerWidth().innerHeight().outerWidth().outerHeight()

- width()	设置或返回元素的宽度（不包括内边距、边框、和外边距）
- height()	设置或返回元素的高度（不包括内边距、边框、和外边距）
  - 传入参数就是设置当前元素的宽高，不传入从参数就是获取当前元素的宽高。
  - 参数还可以是一个函数，返回要设置的数值。函数接受两个参数，第一个参数是元素在原先集合中的索引位置，第二个参数为原先的宽度。

```javascript
//以 10 像素的幅度增加 p 元素的宽度
$("button").click(function(){
    $("p").width(function(n,c){
        return c+10;
    });
});
```

- innerWidth()	方法返回元素的宽度（包括内边距、不包括边框）
- innerHeight()   方法返回元素的高度（包括内边距、不包括边框）
  - 此方法对可见和隐藏元素均有效。
- outerWidth()   方法返回元素的宽度（包括内边距和边框）
- outerHeight() 方法返回元素的高度（包括内边距和边框）
  - 此方法对可见和隐藏元素均有效。
  - 设置为 true 时，会将外边距在内。

