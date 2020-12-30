## Redux 源码解析
https://github.com/reduxjs/redux/blob/master/src/index.ts
https://github.com/shengKevin/redux-source-analyse
### 什么是redux？
（1）Web 应用是一个状态机，视图与状态是一一对应的。
（2）所有的状态，保存在一个对象里面。
 *   整个应用的state存储在store中，有且只存在一个store。
 *   store里面的state是只读的，唯一改变state的方法就是派发(dispatch)一个动作(action)。
 *   纯函数(reducer)修改state，每次返回一个新的state，不能直接修改原对象。

### 如何使用
```js
// 首先把多个 reducer 通过 combineReducers 组合在一起
const appReducer = combineReducers({
  user: UserReducer,
  goods: GoodsReducer,
  order: OrdersReducer,
  chat: ChatReducer
});
// 然后将 appReducer 传入 createStore，并且通过 applyMiddleware 使用了中间件 thunkMiddleware
// replaceReducer 实现热更新替换
// 然后在需要的地方发起 dispatch(action) 引起 state 改变
export default function configureStore() {
  const store = createStore(
    rootReducer,
    compose(
      applyMiddleware(thunkMiddleware),
      window.devToolsExtension ? window.devToolsExtension() : f => f
    )
  );

  if (module.hot) {
    module.hot.accept("../reducers", () => {
      const nextRootReducer = require("../reducers/index");
      store.replaceReducer(nextRootReducer);
    });
  }

  return store;
}
```

### 源码解析
#### 1. combineReducers
```js
// 传入一个 object
export default function combineReducers(reducers) {
    // 获取该 object 的 key 值
    const reducerKeys = Object.keys(reducers)
    // 过滤后的 reducer
    const finalReducers = {}
    // 获取每一个 key 对应的 value
    // 在开发环境下判断值是否为 undefined
    // 然后将值类型是函数的值放入 finalReducers
    for(let i = 0; i < reducerKeys.length; i++) {
        const key = reducerKeys[i]

        if(process.env.NODE_ENV !== 'production') {
            if(typeof reducers[key] === 'undefined') {
                warning(`No reducer provided for key "${key}"`)
            } 
        }

        if(typeof reducers[key] === 'function') {
            finalReducers[key] = reducer[key]
        }
    }

    // 拿到过滤后的 reducers 的 key 值
    const finalReducerKeys = Object.keys(finalReducers)

    // 在开发环境下判断，保存不期望 key 的缓存用以下面做警告
    let unexpectedKeyCache
    if(process.env.NODE_ENV !== 'production') {
        unexpectedKeyCache = {}
    }

    let shapeAssertionError
    
}
```