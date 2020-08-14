## 如何让 js 代码变得优雅

### 1. 优先使用 const
相比较优先使用 let ，优先使用 const 有以下两点好处：
1. 使用 const 命名让其指向的内存地址不变。
2. 使用 let 命名， 在阅读代码的时候可能要翻越上下文，因为他随时可能变化， 使用 const 可以保证其不会变化。 

### 2. 使用函数表达式优先于函数声明
结合 const 和箭头函数 使用函数表达式创建一个函数 优于 函数声明。他有以下优点：
1. 因为使用 const， 所以可以语义化的指明函数是不可变的。
2. 函数表达式可以当成是复制语句，更加简单易懂，且无法被覆盖。
3. 函数声明会在解析时提升，存在先试用后声明的情况，使用函数表达式可以约束这个现象。
4. 搭配箭头函数可以减少对 `this` 的思维依赖。
```js
// bad
function addCount(value) {
    return value + 1
}

// good
const addCount = value => {
    return value + 1
}
```

### 使用 return 减少缩进
在 function  if else 等代码块优先使用 return 返回，可以有效的减少缩进。
```js
// bad
const render = () => {
    if(isServer) {
        // server code
    } else {
        // client code
    }
}

//good
const render = () => {
    if(isServer) return //server code
    //client code
}
```

### 不需要的过度优化
```js
//eg1: 不需要减少的内存空间
//bad
let fullname
user.forEach(item => {
    fullname = item.firstName + item.lastName
    register(fullname)
})

//good
user.forEach(item => {
    const fullname = item.firstName + item.lastName
    register(fullname)
})

//eg2: 不需要的运算优化
//bad
let length = user.length
for(let i = 0; i < length; i++) {
    // code
}

//good
user.forEach(item => {
    // code
})
```
### 减少魔术字符串
魔术字符串 => 代码中意义不明的字符，难以从上下文推断其来源和作用。<br>
通常，我们会把所有的字符和数字同意声明在一个常量文件，如 `host ` `defaultsSetting` `port` 等等， 这样有利于维护。
```js
//bad
const url = `#{host}/2/user2`

//good
const apiVersion = 2
const apis = {
  users: 'users',
  projects: 'projects',
  // ...
}

const url = `${host}/${apiVersion}/${apis.users}`
```

### 函数不应该有过多参数
当函数参数过多， 不仅要记住每个参数的顺序，还要对空缺的参数进行补位（如传入`null` `undefined`)，在函数个数增长时可以考虑将其中的一部分合成为一个对象参数，或是将一部分功能拆离，作为一个新的函数。
```js
// bad
const createUser = (id, name, createdAt, telephone, email, address) => {}

// good
const createUser = (id, userOptions) => {}
```

### 保持函数的专注
一个函数应该只做一件事， 且最好保证这件事是和函数的名称相关的。对于逻辑复杂的函数，可以进行函数拆分 合理的命名、组合。
```js
// bad
const getUser = id => {
  const headers = // ...
  const options = // ...
  options.headers = headers
  const host = // ...
  const url = // ...
  if (id.length > 1) // ...
  return fetch(url, options)
}

// good
const makeOptions = () => {}
const makeUrl = id => {}

const getuser = id => {
  const options = makeOptions()
  const url = makeUrl(id)
  return fetch(url, options)
}
```

### 使用语义化的命名代替长条件
过长的条件判断常常会在一段时间后变的匪夷所思，很难理解其中的逻辑，将其使用语义化的常量代替则可向阅读者提示意义，更省略了不必要的注释。
```js
// bad

// the code for teen-ager
if (user.age < 19 && user.age > 13) {
  // ...
}

// good
const isTeenAgerMember = user.age < 19 && user.age > 13
if (isTeenAgerMember) // ...

```

### 减少函数的副作用
减少函数的副作用并非总是需要以纯函数来解决所有问题，不必慌张，我们知道副作用会使状态的变化难以琢磨，在编程中应当以较少的副作用函数为目标，使函数的预期与实际保持一致的同时不至于造成过多的影响，这或许会使在构思和声明时花费一些时间，但对上下文的代码块来说，是一件好事。

你可能发现有些时候会不可避免的改变了某些外部状态，比如缓存某些值，为此你陷入了重构的苦思，事实是不必过于担忧，你想做的就必然有道理。这就是 编程中的取舍 。学会在编程、架构、工程上有所取舍 (不是随心所欲) 后构建出的产品自然会嵌上独具一格的风采，这就是你的编程。
```js
// bad
let user = getUser()
const upload = () => {
  user.name = `${user.name}-upload`
  // fetch user ...
}

// good
const user = getUser()
const upload = user => {
  const body = Object.assign({}, user, { name: `${user.name}-upload` })
  // fetch body ...
}
upload(user)
```
纯函数： 如果函数调用的参数相同 则他永远返回相同的结果。它不依赖于程序执行期间函数外部任何状态或数据的变化，必须只依赖于其输入参数。<br>
该函数不会产生任何可观察的副作用，例如网络请求，输入和输出设备或数据突变（mutation）。<br>
副作用：一个可以被观察的副作用是在函数内部与其外部的任意交互。这可能是在函数内修改外部的变量，或者在函数里调用另外一个函数等。<br>
注: 如果纯函数调用纯函数，则不产生副作用依旧是纯函数。<br>
副作用来自，但不限于：
1. 进行一个 HTTP 请求
2. Mutating data
3. 输出数据到屏幕或者控制台
4. DOM 查询/操作
5. Math.random()
6. 获取的当前时间

### 命名准确
```js
//eg1:命名只需命名又不要的单词，如无必要 无需堆砌
// bad
const theBook = {}
const _b = {}
const bookObj = {}
const newBook = {}

// good
const book = {}


//eg2:可读条件判断
// bad
if(username && username.includes('prefix-')) {}
const prefix = username && username.includes('prefix-')
const availableName = username && username.includes('prefix-')

//good
const hasPrefixName = username && username.includes('prefix-')

//eg3: 可读函数
// 当我们要从网络上获取用户信息时，getUser 就不是一个准确的表达，get 过于宽泛，从数据库或网络、以用户名或 ID 都有区别，现在我们可以先从命名上思考它们的区别：
// bad
const getUser = name => {}
// good
const fetchUsersByName = name => {}
// good
const findOneUserByID = id => {}
// good (any environment, any params)
const getUsers = (...params) => {}

// eg4: 准确的表达
// 属性可以避免不必要的描述 言简意赅
// bad
const book = {
  bookName: '',
  length: ''
}
// good
const book = {
  title: '',
  pages: ''
}
func(book.title)
//注意单复数
// bad
const book = findBooks()

// good
const books = findBooks()

//eg5: 不必要的约定
//通常在示例或无意义的遍历中，我们会把每一个回调函数的参数写作 item / value / v 等等，这在一些场景的确可以让阅读者忽略掉不必要的描述，专注于逻辑本身，但并非总是合适的，特别是我们需要表达状态时：
// bad
const titles = books.map(item => item.title).filter(item => item.length > 0)

// good
const titles = books.map(book => book.title).filter(title => title.length > 0)
```