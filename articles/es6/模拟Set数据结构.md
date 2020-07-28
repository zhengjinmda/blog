## 模拟 Set 数据结构
### Set 介绍
#### 声明
```js
var set = new Set()
//Set 可以接受一个数组(或者具有 iterable 接口的其他数据结构)作为参数， 用来初始化
var set = new Set([1, 2, 3, 4, 5])
var set = new Set(document.querySelectorAll('div'))
var set = new Set(new Set([1, 2, 3, 4, 5]))
```
#### 操作方法
1. add(value): 添加某个值 返回 Set 结构本身。
2. delete(value): 删除某个值，返回一个布尔值，表示删除成功。
3. has(value): 返回一个布尔值，表示该值是否为 Set 的成员。
4. clear(): 清楚所有成员，无返回值。

#### 遍历方法
1. keys(): 返回键名的遍历器。
2. values(): 返回键值的遍历器。
3. entries(): 返回键值对的遍历器。
4. forEach(): 使用回调函数遍历每个成员， 无返回值。<br>
**注意 keys()、values()、entries() 返回的是遍历器**
#### 属性
1. Set.prototype.constructor: 构造函数 默认就是 Set 函数
2. Set.prototype.size: 返回 Set 实例的成员总数