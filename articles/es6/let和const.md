## let 和 const
块级声明用于声明在指定的作用于之外无法访问的变量 <br />
`let` 和 `count` 都是块级声明的一种
### `let` 和 `const` 的特点
#### 1.不会被提升
```js
if (false) {
    let value = 1
}
console.log(value) // Uncaught ReferenceError: value is not defined
```
#### 2.重复声明会报错
```js
var value = 1
let value = 1  // Uncaught SyntaxError: Identifier 'value' has already been declared
```
#### 3.不绑定全局作用域
挡在全局作用域使用 `var` 声明的时候 会创建一个新的全局变量作为全局对象的属性<br>
但是 `let` 和 `const` 不会
```js
    var value = 1
    console.log(window.value) //1
    let value =1 
    console.log(window.value) // undefined
```
#### `let` 和 `count` 的区别
`const`声明不允许被修改绑定， 但是允许被修改值，所以`const`在声明对象时
```js
    const data = {
        value: 1
    }
    data.value = 2 //允许
    data.num = 3
    data = {} //报错
```
`const`声明的对象的指针不允许改变 即指向的地址不可以改变 但是对象里的值可以被改变