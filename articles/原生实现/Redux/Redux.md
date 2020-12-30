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
 // 获取该 Object 的 key 值
	const reducerKeys = Object.keys(reducers)
	// 过滤后的 reducers
	const finalReducers = {}
	// 获取每一个 key 对应的 value
	// 在开发环境下判断值是否为 undefined
	// 然后将值类型是函数的值放入 finalReducers
	for (let i = 0; i < reducerKeys.length; i++) {
		const key = reducerKeys[i]

		if (process.env.NODE_ENV !== 'production') {
			if (typeof reducers[key] === 'undefined') {
				warning(`No reducer provided for key "${key}"`)
			}
		}

		if (typeof reducers[key] === 'function') {
			finalReducers[key] = reducers[key]
		}
	}
	// 拿到过滤后的 reducers 的 key 值
	const finalReducerKeys = Object.keys(finalReducers)

	// 在开发环境下判断，保存不期望 key 的缓存用以下面做警告
	let unexpectedKeyCache
	if (process.env.NODE_ENV !== 'production') {
		unexpectedKeyCache = {}
	}

	let shapeAssertionError
	try {
	// 该函数解析在下面
		assertReducerShape(finalReducers)
	} catch (e) {
		shapeAssertionError = e
	}
// combineReducers 函数返回一个函数，也就是合并后的 reducer 函数
// 该函数返回总的 state
// 并且你也可以发现这里使用了闭包，函数里面使用到了外面的一些属性
	return function combination(state = {}, action) {
		if (shapeAssertionError) {
			throw shapeAssertionError
		}
		// 该函数解析在下面
		if (process.env.NODE_ENV !== 'production') {
			const warningMessage = getUnexpectedStateShapeWarningMessage(
				state,
				finalReducers,
				action,
				unexpectedKeyCache
			)
			if (warningMessage) {
				warning(warningMessage)
			}
		}
		// state 是否改变
		let hasChanged = false
		// 改变后的 state
		const nextState = {}
		for (let i = 0; i < finalReducerKeys.length; i++) {
		// 拿到相应的 key
			const key = finalReducerKeys[i]
			// 获得 key 对应的 reducer 函数
			const reducer = finalReducers[key]
			// state 树下的 key 是与 finalReducers 下的 key 相同的
			// 所以你在 combineReducers 中传入的参数的 key 即代表了 各个 reducer 也代表了各个 state
			const previousStateForKey = state[key]
			// 然后执行 reducer 函数获得该 key 值对应的 state
			const nextStateForKey = reducer(previousStateForKey, action)
			// 判断 state 的值，undefined 的话就报错
			if (typeof nextStateForKey === 'undefined') {
				const errorMessage = getUndefinedStateErrorMessage(key, action)
				throw new Error(errorMessage)
			}
			// 然后将 value 塞进去
			nextState[key] = nextStateForKey
			// 如果 state 改变
			hasChanged = hasChanged || nextStateForKey !== previousStateForKey
		}
		// state 只要改变过，就返回新的 state
		return hasChanged ? nextState : state
	}
}
```