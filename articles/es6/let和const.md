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
#### 临时死区(Temporal Dead Zone TDZ)
`let`h和`const`声明的变量不会被提升到作用域顶部 在声明前访问会报错<br>
这是因为`JavaScript`引擎在扫描代码发现变量声明时，要么将其提升到作用域顶部(`var`声明的)<br>
要么将其放在TDZ中(遇到`let`和`count`声明的)，只有执行声明语句后，才从TDZ中移出，然后才能访问。
```js
var value = "global";

// 例子1
(function() {
    console.log(value);

    let value = 'local';
}());

// 例子2
{
    console.log(value);

    const value = 'local';
};
```
两个例子中，结果并不会打印 "global"，而是报错 Uncaught ReferenceError: value is not defined，就是因为 TDZ 的缘故。
#### 循环中的块级作用域
在for循环中， 在圆括号之内会建立一个隐藏的作用域
```js
var funcs = [];
for (let i = 0; i < 3; i++) {
    funcs[i] = function () {
        console.log(i);
    }
}
//相当于
(let i = 0) {
    funcs[0] = function () {
        console.log(i);
    }
}
(let i = 1) {
    funcs[1] = function() {
        console.log(i)
    };
}
(let i = 2) {
    funcs[2] = function() {
        console.log(i)
    };
}
```
当执行函数的时候，根据词法作用域就可以找到正确的值（参考闭包的方法）
```js
//闭包
var funcs = [];
for (let i = 0; i < 3; i++) {
    funcs[i] = function () {
        console.log(i);
    };
}
funcs[0](); // 0
```
#### 循环中的`let`和`count`
在 for() 循环中使用 count 报错， 因为每次都创建了一个新的变量，却在迭代中尝试修改<br>
但是在for in 中使用 const 不会报错， 因为在循环中，迭代不会修改已有的绑定，而是创建一个新的绑定
### Babel
