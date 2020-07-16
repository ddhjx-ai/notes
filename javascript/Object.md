#### 1.Object.defineProperty

```javascript
let vm = {
    name: 'tom',
    age: 33
}
let keys = Object.keys(vm)
keys.forEach(key => {
    let value = vm[key]
    Object.defineProperty(vm,key,{
        configurable: true,		// 属性可以被删除，默认不可被删除
        enumerable: true,		// 属性可以被枚举，默认不可枚举
        writable: true			// 属性值可以改写，默认不可以改写
        get(){
            return value
        },
        set(newVal){
            if(newVal !== value){
                value = newVal
            }
        }
    })
})
```

`get`：一个给属性提供`getter`的方法，如果没有`getter`则为`undefined`。该方法返回值被用作属性值。默认为`undefined`。
 `set`：一个给属性提供`setter`的方法，如果没有`setter`则为`undefined`。该方法将接受唯一参数，并将该参数的新值分配给该属性。默认值为`undefined`。

- `configurable`

  当且仅当该属性的 `configurable` 键值为 `true` 时，该属性的描述符才能够被改变，同时该属性也能从对应的对象上被删除。 **默认为** **`false`**。

- `enumerable`

  当且仅当该属性的 `enumerable` 键值为 `true` 时，该属性才会出现在对象的枚举属性中。 **默认为 `false`**。

数据描述符还具有以下可选键值：

- `value`

  该属性对应的值。可以是任何有效的 JavaScript 值（数值，对象，函数等）。 **默认为 `undefined`。

- `writable`

  当且仅当该属性的 `writable` 键值为 `true` 时，属性的值，也就是上面的 `value`，才能被`赋值运算符`改变。 **默认为 `false`。**
  
  

#### 2.Proxy 对象用于定义基本操作的自定义行为（如属性查找、赋值、枚举、函数调用等）

```javascript
let vm = {
    name: 'tom',
    age: 33
}
let newVm = new Proxy(vm, {
    get(target, key){
        return target[key]
    },
    set(target,key,newVal){
        if(target[key] !== newVal){
            target[key] = newVal
        }
    }
})
```



#### 3.Object.keys(obj)

> Object.keys返回一个数组，包括对象自身的（不含继承的）所有可枚举属性（不含 Symbol 属性）的键名。



#### 4.Object.getOwnPropertyNames(obj)

> Object.getOwnPropertyNames返回一个数组，包含对象自身的所有属性（不含 Symbol 属性，但是包括不可枚举属性）的键名。



#### 5.Object.getOwnPropertySymbols(obj)

> Object.getOwnPropertySymbols返回一个数组，包含对象自身的所有 Symbol 属性的键名。



#### 6.Reflect.ownKeys(obj)

> Reflect.ownKeys返回一个数组，包含对象自身的（不含继承的）所有键名，不管键名是 Symbol 或字符串，也不管是否可枚举。



#### 7.Object.create(null) 与 {} 区别

> 方法创建一个新对象，使用现有的对象来提供新创建的对象的__proto__

```javascript
var obj = Object.create({name: 'tom'})
console.log(obj.__proto__)		// {name: 'tom'}
```

> {} 相当于Object 的有个实例，所以会有 _ _ _proto_ _ _ 属性，原型链上还有 Object 原型上所有的方法；
>
> 而 Object.create(null) 返回一个空的 {}，里面不包含任何属性。