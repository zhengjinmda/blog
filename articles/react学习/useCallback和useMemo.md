## useCallback 和 useMemo
### useCallback
useCallback 返回一个函数，只有在依赖项发生变化时才会更新（返回一个新的函数）。
#### 应用
```js
// App.jsx
import React, { useState, useCallback } from 'react';
import Button from './Button';

export default function App() {
  const [count1, setCount1] = useState(0);
  const [count2, setCount2] = useState(0);
  const [count3, setCount3] = useState(0);

  const handleClickButton1 = () => {
    setCount1(count1 + 1);
  };

  const handleClickButton2 = useCallback(() => {
    setCount2(count2 + 1);
  }, [count2]);

  return (
    <div>
      <div>
        <Button onClickButton={handleClickButton1}>Button1</Button>
      </div>
      <div>
        <Button onClickButton={handleClickButton2}>Button2</Button>
      </div>
      <div>
        <Button
          onClickButton={() => {
            setCount3(count3 + 1);
          }}
        >
          Button3
        </Button>
      </div>
    </div>
  );
}

// Button.jsx
import React from 'react';

const Button = ({ onClickButton, children }) => {
  return (
    <>
      <button onClick={onClickButton}>{children}</button>
      <span>{Math.random()}</span>
    </>
  );
};

export default React.memo(Button);
```
在案例中可以分别点击 Demo 中几个按钮查看效果：
1. 点击 Button1 的时候只会更新 button1 和 button3 后面的内容；
2. 点击 button2 三个 按键都会更新
3. 点击 button3 只会更新 button1 和 button2 的内容。

通过上述例子，可以发现，只有使用 useCallback 优化后的 Button2 只有点击自身才会变更，其他两个都是只要父组件更新后就会改变。
---
tips: <br>
React.memo方法，此方法内会对 props 做一个浅层比较 如果 prop 没有发生改变，则不会重新渲染此组件(浅层：只匹配第一层，超过第一层，如对象，就算没有改变也会重新渲染)
---
```js
const a = () => {}
const b = () => {}
a === b // false
//因为 变量a 和 b 的值都是指向函数内存地址的指针，所以就算是都是空函数，他们内存地址的值也是不相等的。
```
在 Button 组件中都接收一个 onClickButton 的 props，尽管组件内部有使用React.memo来优化，但是 onClickButton 是直接定义了一个方案，这也就导致了只要是父组件重新渲染（状态或者 props更新）都会导致声明出一个新的方法，新方法和旧方法尽管长得一样，但是依旧是不相同的两个对象，React.memo发现两个对象不同，就会重新渲染。<br>
如果使用 useCallback 包装了一层，还传入一个[count]变量做对象，当 count 发生变化时， 才返回一个新的函数，函数 内部作用域也随之更新。<br>
由于我们的这个方法只依赖了 count2 这个变量，而且 count2 只在点击 Button2 后才会更新 handleClickButton2，所以就导致了我们点击 Button1 不重新渲染 Button2 的内容。

```js
import React, { useState, useCallback } from 'react';
import Button from './Button';

export default function App() {
  const [count2, setCount2] = useState(0);

  const handleClickButton2 = useCallback(() => {
    setCount2(count2 + 1);
  }, []);

  return (
    <Button 
      count={count2}
      onClickButton={handleClickButton2}
    >Button2</Button>
  );
}
```

如果将useCallback的count参数变成一个空数组，这就意味着这个方法没有依赖值，不会被更新，因为js静态作用域的原因，此函数内的count永远都是0。多次点击button，button后的值也只会改变一次，因为上述的 count 永远都是0，所以每次都是 0 + 1， button所接受的 count props 也只会0 变成 1， 也一直都是1， 而且 handleClickButton2 也因没有依赖项不会返回新的方法，就导致 Button 组件只会因 count 改变而更新一次。
---
上面是不更新的情况，接下来看一个频繁更新所带来的问题。
```js
const [text, setText] = useState('');

const handleSubmit = useCallback(() => {
  // ...
}, [text]);

return (
  <form>
    <input value={text} onChange={(e) => setText(e.target.value)} />
    <OhterForm onSubmit={handleSubmit} />
  </form>
);
```
这时候可以使用 useRef 解决，使用 useRef 可以生成一个变量让其在组件每个生命周期内都能访问到，且 handleSubmit 并不会因为 text 的更新而更新。
---
#### 是不是所有的方法都使用useCallback包一层？
```js
const [count1, setCount1] = useState(0);
const [count2, setCount2] = useState(0);

const handleClickButton1 = () => {
  setCount1(count1 + 1)
};
const handleClickButton2 = useCallback(() => {
  setCount2(count2 + 1)
}, [count2]);

return (
  <>
    <button onClick={handleClickButton1}>button1</button>
    <button onClick={handleClickButton2}>button2</button>
  </>
)
```
上面这种写法在当前组件重新渲染时 handleClickButton1 函数会重新渲染，handleClickButton2 useCallback 里面的函数也会重新渲染。反而加了 useCallback ，在执行的时候还多了 useCallback 中对 count2 的一个比较逻辑。
<br>
因为 useCallback 中的函数是在当前组件内定义的 inline 函数，组件重新渲染，它自然也会重新渲染，useCallback 的作用只是比较 inputs 发生改变去决定是否要返回新的函数。如果没变化，返回的就是之前缓存的函数，外面使用的还是之前的函数方便做一个优化。useCallback 最好是配合 shouldComponentUpdate  React.memo 或者是 State 进行使用。

### useMemo
useMemo 简单来说是传递一个创建函数的依赖项，创建函数会需要返回一个值，只有再依赖项发生改变时，才会重新调用此函数，返回一个新的值。

#### useMemo 的应用
useMemo 与 useCallback 很像，根据上述 useCallback 已经可以想到 useMemo 也能针对传入子组件的值进行缓存优化。
```js
const [count, setCount] = useState(0);

const userInfo = useMemo(() => {
  return {
    // ...
    name: "Jace",
    age: count
  };
}, [count]);

return <UserCard userInfo={userInfo}>
```
可以把一些昂贵的计算逻辑放在 useMemo 中，只有当依赖值发生变化时才去更新。
```js
const num = useMemo(() => {
  let num = 0;
  // 这里使用 count 针对 num 做一些很复杂的计算，当 count 没改变的时候，组件重新渲染就会直接返回之前缓存的值。
  return num;
}, [count]);

return <div>{num}</div>
```

事实上在使用中 useMemo 的场景远比 useCallback 要广泛的很多，我们可以将 useMemo 的返回值定义为返回一个函数这样就可以变通的实现了 useCallback。在开发中当我们有部分变量改变时会影响到多个地方的更新那我们就可以返回一个对象或者数组，通过解构赋值的方式来实现同时对多个数据的缓存。

### 总结
简单理解呢 useCallback 与 useMemo 一个缓存的是函数，一个缓存的是函数的返回结果。useCallback 是来优化子组件的，防止子组件的重复渲染。useMemo 可以优化当前组件也可以优化子组件，优化当前组件主要是通过 memoize 来将一些复杂的计算逻辑进行缓存。
