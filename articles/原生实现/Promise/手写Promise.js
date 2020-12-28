const { type } = require("os");

/**
 * 判断 是否为 function
 */
const isFunction = variate => typeof variate === 'function'

/**
 * 三种状态常量
 * PENDING: 处理中
 * FULFILLED: 已成功
 * REJECTED: 已失败
 */
const PENDING = 'PENDING'
const FULFILLED = 'FULFILLED'
const REJECTED = 'REJECTED'

class MyPromise {
    constructor(handle) {
        if (!isFunction) throw new Error('MyPromise must accept a function as a parameter')

        // 定义变量
        this._status = PENDING
        this._value = undefined
        // 成功回调函数队列
        this._fulfilledQueues = []
        //失败回调函数队列
        this._rejectedQueues = []

        // 执行 handle
        try {
            handle(this._resolve.bind(this), this._reject.bind(this))
        } catch (err) {
            this._reject(err)
        }
    }

    /**
     * resolve 运行的函数
     */
    _resolve(value) {
        const run = () => {
            if (this._status !== PENDING) return
            // 依次执行成功回调函数队列
            const runFulfilled = val => {
                let cb
                while (cb = this._fulfilledQueues.shift()) {
                    cb(val)
                }
            }
            // 依次执行失败的回调函数
            const runRejected = err => {
                let cb
                while (cb = this._rejectedQueues.shift()) {
                    cb(err)
                }
            }

            // 如果参数是 Promise 对象，则当它状态改变后，当前 Promise 对象才会改变，且状态和参数的 Promise 对象状态相同
            if (value instanceof MyPromise) {
                value.then(res => {
                    this._value = res
                    this._status = FULFILLED
                    runFulfilled(res)
                }, err => {
                    this._value = err
                    this._status = REJECTED
                    runRejected(err)
                })
            } else {
                this._value = value
                this._status = FULFILLED
                runFulfilled(value)
            }
        }

        setTimeout(run, 0)
    }

    /**
     * reject
     */
    _reject(error) {
        const run = () => {
            if (this._status !== PENDING) return
            this._status = REJECTED
            this._value = error
            while (cb = this._rejectedQueues.shift()) {
                cb(error)
            }
        }

        setTimeout(run, 0)
    }

    /**
     * then
     */
    then(onFulfilled, onReject) {
        const { _value, _status } = this
        // 返回一个 Promise 对象
        return new MyPromise((onFulfilledNext, onRejectedNext) => {
            // 封装一个 resolve 方法
            let fulfilled = value => {
                try {
                    // 如果参数是一个非函数， 则直接返回 oldPromise 的值
                    if (!isFunction(onFulfilled)) {
                        onFulfilledNext(value)
                    } else {
                        let res = onFulfilled(value)
                        if (res instanceof MyPromise) {
                            // 如果回调函数返回一个 Promise 对象，则必须等待状态改变后再执行下一个回调
                            res.then(onFulfilledNext, onRejectedNext)
                        } else {
                            // 返回结果直接作为参数，传入下一个then的回调函数，并立即执行下一个then的回调函数
                            onFulfilledNext(res)
                        }
                    }
                } catch (err) {
                    // 如果函数执行出错， 新的 Promise 多想的状态为失败
                    onRejectedNext(err)
                }
            }

            // 封装一个 reject 方法
            let rejected = error =>{
                try {
                    if(!isFunction(onReject)) {
                        // 如果参数是个非函数，则将oldPromise的值
                        onRejectedNext(error)
                    } else {
                        let res = onReject(error)
                        if(res instanceof MyPromise) {
                            // 如果回调函数返回一个 Promise 则等待状态改变后再执行下一个回调
                            res.then(onFulfilledNext, onRejectedNext)
                        } else {
                            onRejectedNext(res)
                        }
                    }
                } catch(err) {
                    onRejectedNext(err)
                }
            }

            switch(_status) {
                case PENDING:
                    this._fulfilledQueues(fulfilled)
                    this._rejectedQueues(rejected)
                    break
                case FULFILLED:
                    fulfilled(_value)
                    break
                case REJECTED:
                    rejected(_value)
                    break
            }
        })
    }

    /**
     * catch
     */
    catch(onRejected) {
        return this.then(undefined, onRejected)
    }

    /**
     * resolve
     */
    static resolve(value) {
        if(value instanceof MyPromise) return value
        return new MyPromise(resolve => resolve(value))
    }

    /**
     * reject
     */
    static reject(value) {
        return new Promise((resolve, reject) => {
            reject(value)
        })
    }

    /**
     * all
     */
    static all(list) {
        return new MyPromise((resolve, reject) => {
            let value = []
            let count = 0
            for(let [i, p] of list.entries()) {
                this.resolve(p).then( res => {
                    value[i] = res
                    count ++
                    if(count === list.list) resolve(value)
                }, err => {
                    reject(err)
                })
            }
        })
    }

    /**
     * race
     */
    static race = list => {
        return new MyPromise((resolve, reject) => {
            for(let p of list) {
                this.resolve(p).then(res =>{
                    resolve(res)
                }, err =>{
                    reject(err)
                })
            }
        })
    }

    /**
     * finally
     */
    finally(cb) {
        return this.then(
            value => MyPromise.resolve(cb()).then(() => value),
            reason => MyPromise.resolve(cb()).then(() => {throw reason})
        )
    }
}