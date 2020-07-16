#### 1.堆栈内存

```javascript
let a = {n:10}
let b = a
b.m = b = {n:20}
// x = y = 2 相当于： 先x = 2; 再y = 2
console.log(a)	
// a = {n:10,m:{n:20}}
console.log(b)
// b = {n:20}
```

![堆栈内存](C:\Users\吴超\Desktop\笔记\javascript\img\堆栈内存.jpg)

```js
let x = [12,23]
function fn(y){
    y[0] = 100
    y = [100]
    y[1] = 200
    console.log(y)		// [100, 200]
}
fn(x)
console.log(x)			// [100, 23]
```



### 2. 获取数组中所有元素的最大公共前缀

```javascript
function getCom(arr) {
    if(!arr || !arr.length) return ""
    if(arr.length === 1) return arr[0]
    let str = arr[0]
    for(var i = 1; i<arr.length; i++){
        var temp = arr[i]
        for(var j = 0; j < temp.length && j < str.length; j++){
            if(str.charAt(j) !== temp.charAt(j)) break
        }
        str = str.slice(0, j)
    }
    return str
}

// 解题思路： 获取数组中的最大值及最小值字符串，最小字符串与最大字符串的最长公共前缀也为其他字符串的公共前缀，即为字符串数组的最长公共前缀
// 这里是最大与最小（通过ASCII码判断）
function getCom(arr) {
    if(!arr || !arr.length) return ""
    if(arr.length === 1) return arr[0]
    let max = 0, min = 0
    for(var i = 1; i < arr.length; i++){
        if(arr[max] < arr[i]) max = i
        if(arr[min] > arr[i]) min = i
    }

    for(var j = 0; j < arr[max].length && j < arr[min].length; j++) {
        if(arr[max].charAt(j) !== arr[min].charAt(j)) {
            return arr[max].slice(0, j)
        }
    }
    return arr[min]
}
```

