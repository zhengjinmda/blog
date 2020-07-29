## Promise
### 1. 回调的坏处
1. 因为代码错误回调函数执行多次
2. 回调函数没有执行
3. 回调函数有时同步有时异步

#### 回调地狱
1. 难以复用: 回调顺序确定后，想对其中的有些环节进行复用很困难，想要复用需要对引用的外层也进行修改。
2. 堆栈信息被断开: 正常情况下，A函数调用了B函数，js回先将A压入栈中，然后将B压入栈中，B执行后出栈，A执行完后A出栈。这样我们如果终端代码，可以从堆栈中获取所有信息。但是有回调函数时，执行A函数是将回调函数加入任务队列，代码继续执行，直到主线程完成后，才会从任务队列中选择已完成的任务，将其加入栈中。
3. 借助外层变量: 

## Promise 解决回调地狱
### 1. 基本用法
```js
const promise = new Promise(function(resolve, reject) {
  // ... some code

  if (/* 异步操作成功 */){
    resolve(value);
  } else {
    reject(error);
  }
});
```
all()
```js
// 必须确保接收的 Promise 实例是正确的
var x1 = new Promise(resolve => {
    resolve('aaa')
})
var x2 = new Promise(resolve => {
    resolve('bbb')
})
var x3 = new Promise(resolve => {
    resolve('ccc')
})
Promise.all([x1, x2, x3]).then( res => {
    let [res1, res2, res3] = res
    console.log(res1, res2, res3)
})
//aaa bbb ccc
```
race() 作用和 all 类似 但是接受的 Promise 可以是错误的

### 红绿灯问题
题目：红灯三秒亮一次，绿灯一秒亮一次，黄灯2秒亮一次；如何让三个灯不断交替重复亮灯？（用 Promse 实现）
```js
function red(){
    console.log('red');
}
function green(){
    console.log('green');
}
function yellow(){
    console.log('yellow');
}

var light = function(timmer, cb){
    return new Promise(function(resolve, reject) {
        setTimeout(function() {
            cb();
            resolve();
        }, timmer);
    });
};

var step = function() {
    Promise.resolve().then(function(){
        return light(3000, red);
    }).then(function(){
        return light(2000, green);
    }).then(function(){
        return light(1000, yellow);
    }).then(function(){
        step();
    });
}

step();
```