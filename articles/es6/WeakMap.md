## WeakMap
### 介绍
### 1. WeakMap 只接受对象作为键名
```js
const map = new WeakMap()
map.set(1, 2) //Uncaught TypeError: Invalid value used as weak map key
map.set(null, 2) //Uncaught TypeError: Invalid value used as weak map key
```
### 2. WeakMap 的键名所引用的对象是弱引用
> **WeakMap保持了对键名所引用的对象的弱引用** <br>

弱引用:

> 在计算机程序设计中，弱引用和强引用相对，是指不能确保其引用的对象不会被垃圾回收期回收的引用。
> 一个对象若只被弱引用所引用，则被认为是不可访问的（或弱访问的），并因此可能在任何时刻被回收。

在 js 中，创建一个对象就是创建一个一个强引用：
```js
var obj = new Object()
```
只有当我们手动设置了 `obj=null`的时候，才能回收obj所引用的对象。<br>
而如果我们能创建一个弱引用的对象：
```js
var obj = new WeakObject()
```
此时就可以什么都不用做，等待垃圾回收机制执行，obj所引用的对象就会被回收。<br>
正常情况下 举个例子:
```js
const key = new Array(5 * 1024 * 1024)
const arr = [
    [key, 1]
]
```
使用这种方式，我们其实建立了 arr 对 key 所引用的对象(假设为 obj)的强引用。<br>
当设置 `key = null` 时，只去掉了 key 对 obj 的引用，并没有去除 arr 对 obj 的强引用， 所以obj还是不会被回收。map也是类似的。<br>
而当是 WeakMap时
```js
const wm = new WeakMap()
let key = new Array(5 * 1024 * 1024)
wm.set(key, 1)
key = null
```
此时，设置`wm.set(key, 1)` 其实建立了 wm 对 key 所引用的对象的弱引用，但是因为 `ley key = new Array(5 * 1024 * 1024)` 建立了 key 对所引用对象的强引用， 被引用的对象不会回收， 但是当设置 `key = null` 时， 就只有 wm 对所引用对象的弱引用了，下次垃圾回收机制执行的时候，这个引用对象就会被回收掉。

### 应用
#### 1. 在 DOM 对象上保存相关数据
```js
let wm = new WeakMap(), element = document.querySelector(".element")
wm.set(element, "data")

let value = wm.get(elemet)
console.log(value) // data

element.parentNode.removeChild(element)
element = null
```
#### 2. 数据缓存
当我们需要关联数据和对象，比如在不修改原有对象的情况下存储某些属性或者根据对象存储一些计算的值等，而又不想管理这些数据的死活时非常适合考虑使用WeakMap。数据缓存就是一个很好的例子:
```js
const cache = new WeakMap()
function countOwnKeys(obj) {
    if(cache.has(obj)) {
        //如果已经有这条数据 则返回数据内容
        console.log('Cache')
        return cache.get(obj)
    } else {
        // 如果没有数据，则插入这条数据
        console.log('Computed')
        const count = Object.keys(obj).length // 获取obj的长度 用来做键值
        cache.set(obj, count)
        return count
    }
}
```
#### 3. 私有属性
```js
const privateData = new WeakMap();

class Person {
    constructor(name, age) {
        privateData.set(this, { name: name, age: age });
    }

    getName() {
        return privateData.get(this).name;
    }

    getAge() {
        return privateData.get(this).age;
    }
}

export default Person;
```