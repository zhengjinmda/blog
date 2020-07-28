## 迭代器(Iterator) 与 for of
### 迭代器
迭代器就是一个具有`next()`方法的对象，每次调用`next()`都会返回一个结果对象，该结果对象有连个属性， `value` 表示当前的值， `done` 表示遍历是否结束。
```js
//使用es5实现迭代器
function createIterator(items) {
    var i = 0
    return {
        next: function() {
            var done = i >= items.length
            var value = !done ? items[i++] : undefined
            return {
                done: done,
                value: value
            }
        }
    }
}

// iterator 就是一个迭代器
var iterator = createIterator([1, 2, 3, 4])
console.log(iterator.next()) //{ done: false, value: 1 }
console.log(iterator.next()) //{ done: false, value: 2 }
console.log(iterator.next()) //{ done: false, value: 3 }
console.log(iterator.next()) //{ done: false, value: 4 }
console.log(iterator.next()) //{ done: true, value: undefined }
```

### for of 循环器
for of 是一个可以遍历迭代器对象的方式，ES6 提供了 for of 语句， 我们直接用 for of 遍历一下迭代器
```js
var iterator = createIterator([1, 2, 3])

for(let value of iterator) {
    console.log(value) //iterator is not iterable
}
```
所以 iterator 是一个不可遍历的对象。<br>
其实一种数据结构只要部署了 Iterator 接口，那这种数据结构就是可遍历的。<br>
ES6规定 默认的 Iterator 接口部署在数据结构的 Symbol.iterator 属性 或者说，一个数据结构只要具有Symbol.iterator属性，那它就是可遍历的。
```js
// 普通对象
const obj = {
    value: 1
}

for(value of obj) {
    console.log(value) //Uncaught TypeError: obj1 is not iterable
}
```
遍历一个普通对象，因为他没有 Symbol.iterator 属性 会报错。但是当我们给他添加这个属性：
```js
const obj = {
    value: 1
};

obj[Symbol.iterator] = function() {
    return createIterator([1, 2, 3]);
};

for (value of obj) {
    console.log(value);
}
// 1
// 2
// 3
```
所以 for of 遍历的起始是对象的 Symbol.iterator 属性。
### 默认可遍历的对象
```js
const colors = ['red', 'green', 'blue']
for(color of colors) {
    console.log(color)
}
```
这里我们没有添加 `Symbol.iterator` 属性， 但是数组还是可以遍历， 这是因为ES6默认部署了 `Symbol.iterator` 属性(也可以进行手动修改)
```js
// 手动修改
var colors = ['red', 'green', 'blue']
colors[Symbol.iterator] = function() {
    return createIterator([1, 2, 3])
}
```
for...of 可循环使用的范围包括:<br>
1. 数组 <br>
2. Set <br>
3. Map <br>
4. 类数组对象， 如 arguments 对象、 DOM NodeList 对象 <br>
5. Generator 对象 <br>
6. 字符串 <br>
### 模拟实现 for of
```js
function forof(obj, cb) {
    let iterable, result
    if(typeof obj[Symbol.iterator] !== 'function')
        throw new TypeError(result + ' is not iterable')
    if(typeof cb !== 'function')
        throw new TypeError('cb must be callable')
    iterable = obj[Symbol.iterator]()
    while(!result.done) {
        cb(result.value)
        result = iterable.next()
    }
}
```
### 内建迭代器
为了方便访问值和索引，es6为数组、Map、Set集合内建了以下三种迭代:<br>
1. `entries()` 返回一个遍历器对象，用来遍历[键名, 键值]组成的数组。 对于数组，键名就是索引值。
2. `keys()` 返回一个遍历器对象，用来遍历所有的键名。
3. `values()` 返回一个遍历器对象， 用来遍历所有的键值。
```js
var colors = ['red', 'green', 'blue']
// entries()
for(let index of colors.entries()) {
    console.log(index)
}
//[0, "red"]
//[1, "green"]
//[2, "blue"]

// values()
for(let index of colors.values()) {
    console.log(index)
}
// red
// green
// blue

//keys()
for(let index of colors.keys()) {
    console.log(index)
}
// 0
// 1
// 2
```
Map 与数组类似 但是 Set 需要注意 
```js
var colors = new Set(['red', 'green', 'blue'])
for(let index of colors.keys()) {
    console.log(index)
}
// red
// green
// blue
for(let index of colors.values()) {
    console.log(index)
}
// red
// green
// blue
```
Set 类型的 keys 和 values 是相同的迭代器， 其实就是 Set 这个数据结构的键值对相同。<br>
每个集合类型都有一个默认的迭代器，在 for of 中没有显示指定则使用默认的迭代器，数组和 Set 集合默认的迭代器都是 values() 方法， Map 集合的默认迭代器的 entries() 方法。<br>
所以，遍历map方法也可以用解构赋值。
```js
const valuess = new Map([['key', 'value1'], ['key2', 'value2']])
for(let [key, value] of valuess) {
    console.log(key, value)
}
```