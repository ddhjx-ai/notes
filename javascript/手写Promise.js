// 声明构造函数
function Promise(executor) {
  // 添加属性
  this.PromiseState = 'pending';
  this.PromiseResult = null;
  this.callback = [];

  let self = this;
  // resolve 函数
  function resolve(value) {
    // 判断实例状态为pending状态时才改变状态
    if (self.PromiseState !== 'pending') return
    // 1.修改Promise实例对象的状态
    self.PromiseState = 'fulfilled';
    // 2.设置Promise实例对象的结果值
    self.PromiseResult = value;

    setTimeout(() => {
      self.callback.forEach(item => {
        item.onResolved(value);
      });
    });
  }

  // reject 函数
  function reject(reason) {
    if (self.PromiseState !== 'pending') return
    // 1.修改Promise实例对象的状态
    self.PromiseState = 'rejected';
    // 2.设置Promise实例对象的结果值
    self.PromiseResult = reason;

    setTimeout(() => {
      self.callback.forEach(item => {
        item.onRejected(reason);
      });
    });
  }

  // 当实例抛出异常时
  try {
    // 同步调用 执行器函数
    executor(resolve, reject);
  } catch (error) {
    // 修改实例状态为 失败
    reject(error)
  }

}

// 添加 then 方法
Promise.prototype.then = function (onResolved, onRejected) {
  let self = this;
  // 原生的 Promise 实例的 then 方法是可以不传参数的
  if(typeof onRejected !== 'function') {
    onRejected = reason => {
      throw reason;
    }
  }
  if(typeof onResolved !== 'function') {
    onResolved = value => value
  }
  // promise的then方法返回的也是一个promise实例
  return new Promise((resolve, reject) => {
    // 封装判断返回值的函数
    function callback(type) {
      // 如果 then 方法抛出异常，则进行 try{}catch(){} 处理
      try {
        let result = type(self.PromiseResult);
        // then 方法返回的 Promise 实例的结果是由 then 中回调函数的返回值决定的
        if (result instanceof Promise) {
          // 如果返回的是一个 Promise 实例
          result.then(v => {
            resolve(v);
          }, r => {
            reject(r);
          })
        } else {
          resolve(result)
        }
      } catch (error) {
        reject(error)
      }
    }
    // 判断 PromiseState 调用回调函数
    if (this.PromiseState === 'fulfilled') {
      setTimeout(() => {
        callback(onResolved);
      });
    }

    if (this.PromiseState === 'rejected') {
      setTimeout(() => {
        callback(onRejected);
      });
    }

    // 判断 pending 状态,当实例改变状态的行为在异步中执行时（即先执行then方法，后改变状态）
    if (this.PromiseState === 'pending') {
      // 保存回调函数
      this.callback.push({
        onResolved: function () {
          callback(onResolved)
        },
        onRejected: function () {
          callback(onRejected)
        }
      })
    }
  })
}

// 添加 catch 方法
Promise.prototype.catch = function(onRejected) {
  return this.then(undefined, onRejected)
}

// 添加 resolve 方法
Promise.resolve = function(value) {
  // 返回 promise 实例
  return new Promise((resolve, reject) => {
    if(value instanceof Promise) {
      value.then(v => {
        resolve(v);
      }, r => {
        reject(r);
      })
    }else {
      resolve(value);
    }
  })
}

// 添加 reject 方法
Promise.reject = function(value) {
  // 返回 promise 实例
  return new Promise((resolve, reject) => {
    reject(value);
  })
}

// 添加 all 方法，所有 promise 实例成功时才返回成功的结果，否则返回失败的结果
Promise.all = function(promise) {
  // 返回 promise 实例
  return new Promise((resolve, reject) => {
    // 声明变量
    let count = 0;
    let arr = [];
    // 遍历参数
    for(let i = 0; i < promise.length; i++) {
      promise[i].then(v => {
        // 对成功的 promise 进行计数
        count++;
        arr[i] = v;
        if(count === promise.length) {
          resolve(arr);
        }
      }, r => {
        reject(r);
      })
    }
  })
}

// 添加 race 方法，返回第一个 promise 实例的结果
Promise.race = function(promise) {
  // 返回 promise 实例
  return new Promise((resolve, reject) => {
    for(let i = 0; i < promise.length; i++) {
      promise[i].then(v => {
        resolve(v)
      }, r => {
        reject(r);
      })
    }
  })
}