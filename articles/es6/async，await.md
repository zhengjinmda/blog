## async
async 是 ES2017 引入的解决异步问题的函数。<br>
在异步处理上 async 就是 Generator 函数的语法糖
```js
async function fn() {
    try {
        const a1 = await readFile(file1)
        console.log(a1.toString())
        const a2 = await readFile(file2)
        console.log(a2.toString())
        const a3 = await readFile(file3)
        console.log(a3.toString())
    } catch (err) {
        console.log(err)
    }
}
```
`async` 的实现原理 就是将 `Generator` 函数和自动执行器保障在一个函数里。<br>
特点
1. await 只能存在于 async 函数中
2. 比起 Generator 语义化更强
3. await 后面可以是 Promise 对象， 也可以是 数字、字符串、布尔
4. async 函数返回一个 Promise
5. 只要 await 语句后的 Promise 状态变成 reject ， 整个 async 函数会中断执行(使用 try catch 解决)

### async 和 Promise
async 是一种语法， Promise 是内置对象，没有可比性，但是在一些场景，使用 async 会比 Promise 更优雅。

### async 地狱
async 地狱是指: 开发人员贪图语法简洁，让原本可以并行执行的代码变成了顺序执行。影响性能。
对于互相没有关联的，无需顺序执行的 可以使用 Promise.all 解决
```js
//将互相依赖的语句包裹在 async 函数中
async function handleList() {
  const listPromise = await getList();
  // ...
  await submit(listData);
}

async function handleAnotherList() {
  const anotherListPromise = await getAnotherList()
  // ...
  await submit(anotherListData)
}

(async () => {
  Promise.all([handleList(), handleAnotherList()]).then()
})()
```