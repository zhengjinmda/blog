## Symbol
### Symbol 特点
#### 1.Symbol 使用 `Symbol` 函数生成， `typeof`结果为 `"symbol"`
```js
const x = Symbol()
console.log(typeof s) //"Symbol"
```
#### 2.Symbol 不能使用 new， 因为生成的 Symbol 是一个原始类型 不是对象
```js
var s = new Symbol() // Uncaught TypeError: Symbol is not a constructor
```
#### 3. instanceof 结果为 false
```js
var s = new Symbol()
console.log(s instanceof Symbol) //false
```
#### 4.Symbol函数可以接受一个字符串作为参数，作为区分
```js
var s = Symbol('foo')
console,log(s) // Symbol(foo)
```
#### 5.如果 Symbol 的参数是一个对象 就会调用该对象的 toString 方法 将其转为字符串 然后才生成一个 Symbol 值
```js
var obj = {
    toString() {
        return 'abc'
    }
}

var s = Symbol(obj)
console.log(s) // Symbol(abc)
```
#### 6. Symbol 函数的参数只是对表示当前 Symbol 的描述 相同参数返回值是不相等的
```js
// 没有参数
var s1 = Symbol()
var s2 = Symbol()
console.log(s1 === s2) //false
var s1 = Symbol('abc')
var s2 = Symbol('abc')
console.log(s1 === s2) //false
```
#### 7. Symbol 值不能喝其他类型的值进行运算 会报错
```js
var sym = Symbol('foo')
console.log('your symbol is ' +sym) // Cannot convert a Symbol value to a string
```
#### 8. Symbol 可以显式转换成字符串
```js
var sym = Symbol('foo')
console.log(sym)
console.log(sym.toString())
console.log(String(sym))
```
#### 9.Symbol 值可以作为标识符， 用于对象的属性名，可以保证不会出现同名的属性
```js
var sym = Symbol()
//第一种写法
var a = {}
a[sym] = 'hello'
console.log(a[sym]) // hello

//第二种写法
a = {
    [sym]: 'hello'
}

//第三种写法
var a = {}
Object.defineProperty{a, sym, {value: 'hello!'}}
```
#### 10.Symbol 作为属性名，该属性不会出现在 for...in、for...of 循环中，也不会被 Object.keys()、Object.getOwnPropertyNames()、JSON.stringify() 返回。但是，它也不是私有属性，有一个 Object.getOwnPropertySymbols 方法，可以获取指定对象的所有 Symbol 属性名。
```js
var obj = {};
var a = Symbol('a');
var b = Symbol('b');

obj[a] = 'Hello';
obj[b] = 'World';

var objectSymbols = Object.getOwnPropertySymbols(obj);

console.log(objectSymbols);
// [Symbol(a), Symbol(b)]
```
#### 11.如果我们希望使用同一个 Symbol 值，可以使用 Symbol.for。它接受一个字符串作为参数，然后搜索有没有以该参数作为名称的 Symbol 值。如果有，就返回这个 Symbol 值，否则就新建并返回一个以该字符串为名称的 Symbol 值。
```js
var s1 = Symbol.for('foo')
var s2 = Symbol.for('foo')
console.log(s1 === s2)
console.log(Object.is(s1, s2))
```
#### 12.Symbol.keyFor 方法返回一个已登记的 Symbol 类型值的 key
```js
var s1 = Symbol.for("foo");
console.log(Symbol.keyFor(s1)); // "foo"

var s2 = Symbol("foo");
console.log(Symbol.keyFor(s2) ); // undefined
```
