# Reduce
https://www.processon.com/mindmap/5fe93759e0b34d2934ed99af
## 简介
```js
array.reduce((total, currentValue, currentIndex, arr) => {
    ...
}, initialValue)
// total 上一次回调的返回值 或者是初始值 initialValue
// currentValue 当前正在处理的数组元素
// currentIndex 当前正在处理的元素的下标
// arr 当前元素所属的数组对象
// initialValue 初始值
```

## 原生实现
```js
Array.prototype.myReduce = function(callback, initialValue) {
    if(!Array.isArray(this) || !this.length || typeof callback !== 'function') {
        // 判断调用函数的的变量是否为数组、数组是否为不为空、回调函数类型是否正确
        return
    }
    let hasInitialValue = initialValue !== undefined // 是否有初始值
    let total = hasInitialValue ? initialValue : this[0]
    for(let currentIndex = hasInitialValue ? 0 : 1; currentIndex <= this.length - 1; currentIndex++) {
        const currentValue = this[currentIndex]
        total = callback(total, currentValue, currentIndex, this)
    }
    
    return total
}
```