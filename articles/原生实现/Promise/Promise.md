## Promise
https://juejin.cn/post/6844903665686282253
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
then 方法必须返回一个新的 promise 对象<br>
```js
promise2 = promise1.then(onFulfilled, onRejected);
```
这里涉及到 Promise 的执行规则，包括 值得传递 和 错误捕捉 机制：<br>
1.如果 onFulfilled 或者 onRejected 返回一个值 x ，则运行下面的 Promise 解决过程：
* 若 x 不为 Promise， 则使 x 直接作为新返回的 Promise 对象的值，即新的 onFulfilled 或者 onRejected 函数的参数。
* 若 x 为 Promise，这时候一个回调函数，就会等待 Promise 对象（即x）的状态发生变化，才会被调用，并且新的 promise 状态和 x 的状态相同。
```js
//eg1 返回为非Promise:
var promise1 = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve('11111')
    }, 1000)
})
var promise2 = promise1.then(res => {
    return res //返回一个普通值
})

promise2.then(res => {
    console.log(res) // 1s 后打印'11111'
})

//eg2: 返回一个 Promise 对象
var promise1 = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve('111')
    }, 1000)
})
var promise2 = promise1.then(res => {
    console.log(res) // 1s 后打印 '111'
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve('222')
        }, 2000)
    })
})

promise2.then(res => {
    console.log(res) // 3s 后打印 '222'
})
```
2.如果 onFulfilled 或者 onRejected 抛出一个异常 e, 则 promise2 必须变为失败（rejected），并返回失败的值e
```js
// eg:
var promise1 = new Promise((resolve, reject) =>{
    setTimeout(() => {
        resolve('success')
    }, 1000)
})

var promise2 = promise1.then(res => {
    throw new Error('抛出一个异常e + ' + res)
})

promise2.then(res => {
    console.log(res) 
}).catch(e => {
    console.log(e) // 1s 后输出 "抛出一个异常e + success"
})
```
3.如果 onFulfilled 不是函数且 promise1 状态为成功（Fulfilled）， promise2 必须变为成功（Fulfilled），并返回 promise1 成功的值
```js
// eg:
var promise1 = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve('111')
    }, 1000)
})

var promise2 = promise1.then('这里的onFulfilled不是一个函数')
promise2.then(res => {
    console.log(res) // 1s 后 返回 '111'
})
```

4.如果 onRejected 不是且 promise1 状态为失败（onRejected）， promise2 必须变为失败（onRejected）并返回 promise1 失败的值。
```js
// eg:
var promise1 = new Promise((reject, resolve) => {
    setTimeout(() => {
        reject('fail')
    }, 1000)
})

var promise2 = promise1.then(res => res, "这里的onRejected不是一个函数")
promise2.then(res => {
    console.log(res)
}, e => {
    console.log(e)
})
```
根据上面的规则，完善 MyPromise <br>
修改 constructor ： 增加执行队列<br>
由于 then 方法支持多次调用，我们可以维护两个数组，将每次 then 方法注册时的回调函数添加到数组中，等待执行
```js
constructor(handle) {
    if(!isFunction) {
        throw new Error('MyPromise must accept a function as a parameter');
    }
    // 添加状态
    this._status  = PENDING
    // 添加状态
    this._value = undefined
    //添加成功回调函数队列
    this._fulfilledQueues = []
    //添加失败回调函数队列
    this._rejectedQueues = []
    //执行 handle
    try {
        handle(this._resolve.bind(this), this._reject.bind(this))
    } catch (err) {
        this._reject(err)
    }
}
```
添加 then 方法<br>
首先，then 返回一个新的 Promise 对象，并且需要将回到函数加入到执行队列中
```js
// 添加 then 方法
then(onFulfilled, onRejected) {
    const {_value, _status} = this
    switch(_status) {
        // 当状态为 PENDING 时， 将then方法回调函数加入执行队列等待执行
        case PENDING:
            this._fulfilledQueues.push(onFulfilled)
            this._rejectedQueues.push(onRejected)
            break
        // 当状态为 FULFILLED 时， 立即执行对应的回调函数
        case FULFILLED:
            onFulfilled(_value)
            break
        // 当状态为 REJECTED 时， 立即执行对应的回调函数
        case REJECTED:
            onRejected(_value)
            break
    }

    // 返回一个新的 MyPromise 对象
    return new MyPromise((onFulfilled, onRejected) => {

    })
}
```
那返回的新的 Promise 对象什么时候能改变状态呢？改变为哪种状态？<br>
根据上文中的 then 方法的规则， 我们知道返回的新的 Promise 对象的状态依赖于当前 then 方法回调函数执行的情况以及返回值，例如 then 的参数是否为一个函数、回调函数执行是否出错、返回值是否为 Promise 对象。。。<br>
来进一步完善 then 方法：
```js
// 添加 then 方法
then(onFulfilled, onRejected) {
    const {_value, _status} = this
    // 返回一个新的 MyPromise 对象
    return new MyPromise((onFulfilledNext, onRejectedNext) => {
        //封装一个成功的函数
        let fulfilled = value => {
            try {
                if(!isFunction(onFulfilled)) {
                    // 如果 newPromise reject 是个非函数，直接返回 oldPromise 的值
                    onFulfilledNext(value)
                } else {
                    // 执行当前回调函数
                    let res = onFulfilled(value)
                    if(res instanceof MyPromise) {
                        // 如果当前回调函数返回 MyPromise 对象，必须等待其状态改变后再执行下一个回调
                        res.then(onFulfilledNext, onRejectedNext)
                    } else {
                        // 否则将返回结果直接作为参数，传入下一个 then 的回调函数，并立即执行下一个 then 函数
                        onFulfilledNext(res)
                    }
                }
            } catch(err) {
                // 如果函数出现错误， 新的 MyPromise 对象状态为失败
                onRejectedNext(err)
            }
        }
        // 封装一个失败的函数
        let projected = value => {
            try {
                if(!isFunction(onRejected)) {
                    // 如果 newPromise 是个非函数， 直接返回 oldPromise 的值
                    onRejectedNext(value)
                } else {
                    // 执行当前回调函数
                    let res = onRejected(value)
                    if(res instanceof MyPromise) {
                        // 如果当前回调函数返回的是一个 MyPromise 对象， 必须等待期状态改变后在执行下一个回调
                        res.then(onFulfilledNext, onRejectedNext)
                    } else {
                        // 如果返回的是一个非 MyPromise， 则将结果直接作为参数，传入下一个then的回调函数，并立即执行
                        onRejectedNext(res)
                    }
                }
            } catch(err) {
                // 如果函数出现错误，新的 MyPromise
                onRejectedNext(err)
            }
        }

        // 判断当前状态
        switch(_status) {
            // 当状态为 PENDING 是， 将 then 方法回调函数放入执行队列中等待执行
            case PENDING:
                this._fulfilledQueues.push(fulfilled)
                this._rejectedQueues.push(rejected)
            break
            // 当状态改变时，执行相应的回调函数
            case FULFILLED:
                fulfilled(_value)
            break
            case REJECTED:
                rejected(_value)
            break
        }
    }) 
}
```
接下来修改 _resolve 和 _reject ：依次执行队列中的函数<br>
当 resolve 或者 reject 方法执行时，我们依次提取成功或失败任务队列中的函数开始执行，并清空队列，从而实现 then 方法的多次调用，实现的代码如下：
```js
// 添加 resolve 时执行的函数
_resolve(val) {
    if(this._status !== PENDING) return
    // 依次执行成功队列中的函数，并清空队列
    const run = () => {
        this._status = FULFILLED
        this._value = val
        let cb
        while(cb = this.fulfilledQueues.shift()) {
            cb(val)
        }
    }

    // 为了支持同步的 Promise 这里采用异步的方式
    setTimeout(() => run(), 0)
}

_reject(err) {
    if(this.status !== PENDING) return
    // 依次执行失败队列中的函数，并清空队列
    const run = () => {
        this._status = REJECTED
        this._value = err
        let cb
        while(cb = this.rejectedQueues.shift()) {
            cb(err)
        }
    }

    // 为了支持同步的 Promise 这里采用异步的方式
    setTimeout(() => run(), 0)
}
```

这里还有一个特殊情况，就是当 resolve 方法传入的参数为一个 Promise 对象时， 则该 Promise 对象决定状态当前 Promise 对象的状态。
```js
const p1 = new Promise(function (resolve, reject) {
  setTimeout(() => {
    console.log(11111)
    resolve('111')
  }
, 2000)
});

const p2 = new Promise(function (resolve, reject) {
  setTimeout(() => {
    console.log(2222)
    resolve(p1)
  }
, 1000)
});
p2.then(res => {
    console.log(res)
})

// 执行结果
// 1s 后 打印 2222
// 2s 后 打印 1111
// 在1111 打印后 打印111
```
上面的代码中， p1 和 p2 都是 promise 的实例，但是 p2 的 resolve 方法将 p1 作为参数， 即一个异步操作的结果是返回另一个异步操作。<br>
注意：这个时候的 p1 的状态就会传递给 p2，也就是说， p1 的状态决定了 p2 的状态。如果 p1 的状态是 pending 的话，p2 的回调函数就会等待 p1 的状态改变， 如果 p1 的状态是 fulfilled 或者是 rejected ，那么 p2 的回调函数就会立即执行。<br>
修改 _resolve 来支持这样的特性
```js
// 添加 resolve 时执行的函数
_resolve(var) {
    const run = () => {
        if(this._status !== PENDING) return
        // 依次执行成功队列中的函数，并清空队列
        const runFulfilled = value =>{
            let cb
            while(cb = this._fulfilledQueues.shift()) {
                cb(value)
            }
        }
        // 依次执行失败队列中的函数，并清空队列
        const runRejected = err => {
            let cb
            while(cb = this._rejectedQueues.shift()) {
                cb(err)
            }
        }

        // 如果 resolve 的参数为 Promise 对象，则必须等待该 Promise 对象改变后，当前 Promise 对象的状态才会改变， 且状态取决于参数 Promise 对象的状态
        if(val instanceof MyPromise) {
            val.then(value => {
                this._value = value
                this._status = FULFILLED
                runFulfilled(value)
            }, err => {
                this._value = err
                this._status = REJECTED
                runRejected(err)
            })
        } else {
            this._value = val
            this._status = FULFILLED
            runFulfilled(val)
        }
    }
    // 为了支持同步的Promise，这里采用异步调用
    setTimeout(run, 0)
}
```

这样一个 Promise 基本实现了， 现在来加一些其他的方法<br>

catch 方法<br>
相当于调用 then 方法， 只是传入的是 reject 状态的回调函数
```js
// 添加 catch 方法
catch(onReject) {
    return this.then(undefined, onReject)
}
```
静态 resolve 方法<br>
静态 resolve 方法 就是 将非 Promise 对象转化为 Promise 对象
```js
// 添加静态 resolve 方法
static resolve (value) {
  // 如果参数是MyPromise实例，直接返回这个实例
  if (value instanceof MyPromise) return value
  return new MyPromise(resolve => resolve(value))
}
```
静态 reject 方法<br>
返回一个新的 Promise 的实例，该实例的状态为 rejected
```js
// 添加静态reject方法
static reject (value) {
  return new MyPromise((resolve ,reject) => reject(value))
}
```
静态 all 方法<br>
将多个 Promise 对象 包装成一个 Promise 实例
```js
static all(list) {
return new MyPromise((resolve, reject) => {
    // 返回值的集合
    let values = []
    let count = 0
    for(let [i, p] of list.entries()) {
        // 数组参数不是 MyPromise 实例。先调用 MyPromise.resolve
        this.resolve(p).then(res => {
            values[i] = res
            count++
            // 所有状态都变成 fulfilled 时，返回的 MyPromise 状态就变成 fulfilled
            if(count === list.length) resolve(values)
        }, err => {
            // 有一个被 rejected 时， 返回的 MyPromise 状态就会变成 rejected
            reject(err)
        })
    }
}
```
静态 rece 方法<br>
Promise.race()方法同样是将多个 Promise 实例，包装成一个新的 Promise 实例。
```js
// 添加静态race方法
static race (list) {
  return new MyPromise((resolve, reject) => {
    for (let p of list) {
      // 只要有一个实例率先改变状态，新的MyPromise的状态就跟着改变
      this.resolve(p).then(res => {
        resolve(res)
      }, err => {
        reject(err)
      })
    }
  })
}
```
finally 方法<br>
finally 方法用于指定不管 Promise 对象最后状态如何，都会执行的操作
```js
finally (cb) {
  return this.then(
    value  => MyPromise.resolve(cb()).then(() => value),
    reason => MyPromise.resolve(cb()).then(() => { throw reason })
  );
};
```


### 完整代码
```js
// 判断变量是否为 function
const isFunction = variable => typeof variable === 'function'

// 定义 Promise 的三种状态常量
const PENDING = 'PENDING'
const FULFILLED = 'FULFILLED'
const REJECTED = 'REJECTED'

class MyPromise {
    // 构造函数
    constructor(handle) {
        if(!isFunction(handle)) {
            throw new Error('MyPromise must accept a function as a parameter')
        }
        // 添加状态
        this._status = PENDING
        this._value = undefined
        // 成功回调函数队列
        this._fulfilledQueues = []
        // 失败回调函数队列
        this._rejectedQueues = []

        // 执行 handle
        try {
            handle(this._resolve.bind(this), this._reject.bind(this))
        } catch (err) {
            this._reject(err)
        }
    }

    /**
     * resolve
     */
    _resolve(val) {
        const run = () => {
            if(this._status !== PENDING) return
            // 方法： 依次执行成功队列中的函数，并清空队列
            const runFulfilled = value => {
                let cb
                while(cb = this._fulfilledQueues.shift()) {
                    cb(value)
                }
            }
            // 方法：依次执行失败队列中的函数，并清空队列
            const rejectedQueues = value => {
                let cb
                while(cb = this._rejectedQueues.shift()) {
                    cb(value)
                }
            }

            // 如果 传入的参数是 Promise 对象，则等待其状态改变后，当前Promise状态才会改变，且状态取决于参数 Promise 对象的状态
            if( val instanceof MyPromise ) {
                val.then(value => {
                    this._value = value
                    this._status = FULFILLED
                    runFulfilled(value)
                }, err => {
                    this._value = err
                    this._status = REJECTED
                    runRejected(err)
                })
            } else {
                this._value = val
                this._status = Fulfilled
                runFulfilled(val)
            }
        }
        // 为了支持同步的Promise 这次使用异步调用
       setTimeout(run, 0)
    }

    /**
     * reject
     */
    _reject(err) {
        if(this._status !== PENDING) return
        // 一次执行失败队列中的函数，并清空队列
        const run = () => {
            this._status = REJECTED
            this._value = err
            let cb
            while( cb = this._rejectedQueues.shift()) {
                cb(err)
            }
        }

        setTimeout(run, 0)
    }

    /**
     * 添加 then 方法
     */
    then(onFulfilled, onRejected) {
        const {_value, _status} = this
        // 返回一个 Promise 对象
        return new MyPromise((onFulfilledNext, onRejectedNext) => {
            // 封装一个成功时执行的函数
            let fulfilled = value => {
                try {
                    // 如果是非函数，则直接返回 oldPromise 的值
                    if(!isFunction) {
                        nonFulfilledNext(value)
                    } else {
                        let res = onFulfilled(value)
                        if(res instanceof MyPromise) {
                            // 如果当前回调函数返回的是 promise 对象，则等待其状态改变后再执行下一个回调
                            res.then(onFulfilledNext, onRejectedNext)
                        } else {
                            // 如果当前回调函数是普通函数，则将返回结果直接作为参数，传入下一个then的回调函数中，并立即执行
                            onFulfilledNext(res)
                        }
                    }
                } catch(err) {
                    // 如果函数执行出错，新的Promise对象状态为失败
                    onRejectedNext(err)
                }
            }

            // 封装一个失败时执行的函数
            let rejected = error => {
                try {
                    if(!isFunction) {
                        // 如果是非回调函数，则直接返回 oldPromise 的值
                        onRejectedNext(error)
                    } else {
                        let res = onRejected(error)
                        if(res instanceof MyPromise) {
                            // 如果回调函数是 Promise 对象，则等待其状态改变后再执行下一个回调
                            res.then(onFulfilledNext, onRejectedNext)
                        } else {
                            // 如果当前回调函数是普通函数，则返回结果直接作为参数，传入下一个then的回到函数中，并立即执行
                            onRejectedNext(res)
                        }
                    }
                } catch(err) {
                    // 如果函数执行出错，新的Promise对象的状态为失败
                    onRejectedNext(err)
                }
            }

            switch(_status) {
                case PENDING:
                    // 状态为pending时，将回调函数加入执行队列中等待执行。
                    this._fulfilledQueues.push(fulfilled)
                    this._rejectedQueues.push(rejected)
                    break
                case FULFILLED:
                    // 状态改变时，执行对应的回调函数
                    fulfilled(_value)
                    break
                case REJECTED:
                    rejected(_value)
                    break
            }
        })
    }

    /**
     * catch 方法
     */
    catch(onReject) {
        return this.then(undefined, onReject)
    }

    /**
     * resolve 方法
     * 如果参数是 Promise 实例，则直接返回这个实例
     * 否则将其转为成 Promise
     */
    static resolve(value) {
        if(value instanceof MyPromise) return value
        return new MyPromise(resolve => resolve(value))
    }

    /**
     * reject
     */
    static reject(value) {
        return new MyPromise((resolve, reject) => reject(value))
    }

    /**
     * all
     */
    static all (list) {
        return new MyPromise((resolve,reject) => {
            let values = []
            let count = 0
            for(let [i, p] of list.entries()) {
                // 如果不是 Promise 实例，则先调用 MyPromise.resolve
                this.resolve(p).then(res => {
                    value[i] = res
                    count++
                    // 所有状态都变成 fulfilled 是返回
                    if(count === list.length) resolve(values)
                }, err => {
                    // 有一个 rejected 时 返回的 MyPromise 状态就变成 rejected
                    reject(err)
                })
            } 
        })
    }

    /**
     * race
     */
    static race(list) {
        return new Promise((resolve, reject) => {
            for(let p of list) {
                // 只要有一个实例改变状态，新的 MyPromise 的状态就跟着改变
                this.resolve(p).then(res => {
                    resolve(res)
                }, err => {
                    reject(err)
                })
            }
        })
    }

    /**
     *  finally 一定会执行
     */
    finally(cb) {
        return this.then(
            value => MyPromise.resolve(cb()).then(() => value),
            reason => MyPromise.resolve(cb()).then(() => { throw reason })
        )
    }
}
```