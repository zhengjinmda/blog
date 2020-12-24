## Promise
### Promise 的基本结构
promise 的构造函数必须接收一个函数作为形参，我们称之为 handle， handle 又包含 resolve 和 reject 两个参数，它们也是两个函数。
```js
new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve('fulfilled')
    })
})
```
如何判断一个变量是否为函数？
```js
const isFunction = func => typeof func === 'function'
```
我们定义一个 MyPromise 的 class， 接受一个 handle 作为参数
```js
class MyPromise {
    constructor(handle) {
        if(!isFunction) {
            throw new Error('MyPromise must accept a function as a parameter');
        }
    }
}
```

### Promise 状态和值
promise 对象存在以下三种状态:
1. Pending (进行中)
2. Fulfilled(已成功)
3. Rejected(已失败)

状态只能从 Pending => Fulfilled or Pending => Rejected，且状态变化后不会再发生变化，会一直保持下去。<br>
Promise 的值是指状态改变时传递给回调函数的值。<br>
上文中的 handle 函数包含 resolve 和 reject 两个函数，他们可以改变 Promise 的状态和传入 Promise 的值。
```js
new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve('fulfilled')
    }, 1000)
})
```
这里 resolve 传入的 "FULFILLED" 就是 Promise 的值
1. resolve : 将Promise对象的状态从 Pending(进行中) 变为 Fulfilled(已成功)
2. reject : 将Promise对象的状态从 Pending(进行中) 变为 Rejected(已失败)
3. resolve 和 reject 都可以传入任意类型的值作为实参，表示 Promise 对象成功（Fulfilled）和失败（Rejected）的值

接下来为 MyPromise 添加状态属性和值
```js
// 定义Promise的三种状态常量
const PENDING = 'PENDING'
const FULFILLED = 'FULFILLED'
const REJECTED = 'REJECTED'
```
为 MyPromise 添加状态和值，并添加状态改变的执行逻辑。
```js
class MyPromise{
    constructor(handle) {
        if(!isFunction) {
            throw new Error('MyPromise must accept a function as a parameter')
        }
    }
    //添加状态
    this._status = PENDING
    //添加状态
    this._value = undefined
    //执行 handle
    try {
        handle(this._resolve.bind(this), this._reject.bind(this)) 
    } catch(err) {
        this._reject(err)
    }
    //添加 resolve 时执行的函数
    _resolve(val) {
        if(this._status !== PENDING) return
        this._status = FULFILLED
        this._value = val
    }
    // 添加 reject 时执行的函数
    _reject(err) {
        if(this._status !== PENDING) return
        this._status = REJECTED
        this._value = err
    }
}
```

### Promise 的 then 方法
Promise 对象的 then 接受两个参数： promise.then(onFulfilled, onReject)<br>
参数可选：<br>
onFulfilled 和 onRejected 都是可选参数。
* 如果 onFulfilled 或 onRejected 都不是函数，则它们要被忽略
  
onFulfilled 特性:<br>
如果 onFulfilled 是函数：<br>
1. 当promise 变成成功时必须被调用，其第一个参数为 promise 成功状态传入的值(resolve 执行时传入的值)
2. 在 promise 状态改变前不可被调用
3. 其调用次数不可超过1次
   
onRejected 特性<br>
如果 onRejected 是函数：<br>
1. 当 promise 状态变为失败时必须被调用，其第一个参数为 promise 失败状态传入的值(resolve 执行时传入的值)
2. 在 promise 状态改变前不可被调用
3. 其调用次数不可超过1次

多次调用<br>
then 方法可以被同一个 promise 调用多次：
1. 当 promise 成功状态时，所有 onFulfilled 需按照其注册顺序依次回调
2. 当 promise 失败状态时，所有 onRejected 需按照其注册顺序依次回调

返回<br>
then 方法必须返回一个新的 promise 对象