## Redux 源码解析
https://github.com/reduxjs/redux/blob/master/src/index.ts
https://github.com/shengKevin/redux-source-analyse
https://juejin.cn/post/6844903728298852366
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

### 源码解析2
#### index.js 文件
```js
import createStore from './createStore'
import combineReducers from './combineReducers'
import bindActionCreators from './bindActionCreators'
import applyMiddleware from './applyMiddleware'
import compose from './compose'
import warning from './utils/warning'
import __DO_NOT_USE__ActionTypes from './utils/actionTypes'

function isCrushed() {}
//  isCrushed.name !== 'isCrushed'用来判断是否压缩过
// 如果不是production环境且压缩了，给出warning
if (
  process.env.NODE_ENV !== 'production' &&
  typeof isCrushed.name === 'string' &&
  isCrushed.name !== 'isCrushed'
) {
  warning(
    'You are currently using minified code outside of NODE_ENV === "production". ' +
      'This means that you are running a slower development build of Redux. ' +
      'You can use loose-envify (https://github.com/zertosh/loose-envify) for browserify ' +
      'or setting mode to production in webpack (https://webpack.js.org/concepts/mode/) ' +
      'to ensure you have the correct code for your production build.'
  )
}
// 这就是我们的redux了， 看一下是不是很简单
// 好了，先看createStore ->去看createStore.js文件
// 看完createStore，已经对redux的大体实现有了一定的了解， 接下来我们看combineReducers -> 👀看文件
// 接着看bindActionCreators.js文件
// 看applyMiddleware.js文件
// 最后compose在applyMiddleware中用到的时候已经看过了， redux源码解析大功告成
export {
  createStore,  
  combineReducers,
  bindActionCreators,
  applyMiddleware,
  compose,
  __DO_NOT_USE__ActionTypes
}
```
#### 核心 createStore.js
```js
import $$observable from 'symbol-observable'

import ActionTypes from './utils/actionTypes'
import isPlainObject from './utils/isPlainObject'

// 先看这里， 就是我们调用的createStore function了
export default function createStore(reducer, preloadedState, enhancer) {
  // 如果 preloadedState 和 enhancer 都为function，不支持，throw new Error
  // 我们都知道[initState]为object， [enhancer]为function

  if (
    (typeof preloadedState === 'function' && typeof enhancer === 'function') ||
    (typeof enhancer === 'function' && typeof arguments[3] === 'function')
  ) {
    throw new Error(
      'It looks like you are passing several store enhancers to ' +
        'createStore(). This is not supported. Instead, compose them ' +
        'together to a single function'
    )
  }
  // preloadedState为function enhancer为undefined的时候说明initState没有初始化, 但是有middleware
  if (typeof preloadedState === 'function' && typeof enhancer === 'undefined') {
    enhancer = preloadedState // 把 preloadedState 赋值给 enhancer
    preloadedState = undefined // preloadedState赋值undeifined
  }

  // debugger
  // 如果参数enhancer存在
  if (typeof enhancer !== 'undefined') {
    // 如果enhancer存在，那他必须是个function, 否则throw Error哈
    if (typeof enhancer !== 'function') {
      throw new Error('Expected the enhancer to be a function.')
    }
    /**
     * 传入符合参数类型的参数，就可以执行 enhancer, 
     * 但是这个return深深的吸引了我, 因为说明有applyMiddleware的时候后面的都不用看了 ??? 当然不可能
     * 可是applyMiddleware其实是必用项，所以猜想一下applyMiddleware强化store之后会enhancer赋值undefined，再次调用createStore
     * 上下打个debugger看一下执行顺序(debugger位置以注释)，果然不出所料
     * 好了， 假设我们还不知道applyMiddleware()这个funcrion具体干了什么，
     * 只知道他做了一些处理然后重新调用了createStore并且enhancer参数为undefined
     * 先记下，后续在看applyMiddleware， 因为我们现在要看的是createStore
     * * */
    // debugger
    return enhancer(createStore)(reducer, preloadedState)
  }
  // debugger

  // reducer要为function
  if (typeof reducer !== 'function') {
    throw new Error('Expected the reducer to be a function.')
  }

  // 简单过一下定义的变量
  let currentReducer = reducer  // 临时reducer
  let currentState = preloadedState // 临时init state
  let currentListeners = []  // 看名字，是个数组，起名Listeners，想到了什么？ 我想到的是监听队列和观察者模式
  let nextListeners = currentListeners // 浅拷贝下这个队列
  let isDispatching = false // 我们很容易先假设isDispatching标志是否正在执行dispatch

  // 先看下各个函数的名字， 打眼一看getState，dispatch，subscribe都是比较熟悉的api
  // subscribe，observable再加上定义的数组，应该肯定是监听队列和观察者模式
  // 那我们先看看比较熟悉且暴露出来的api好了先看 -> getState

  // 其实这里是保存一份订阅快照
  function ensureCanMutateNextListeners() {
    //  不要忘了let nextListeners = currentListeners // 浅拷贝下这个队列
    // 判断nextListeners和当前的currentListeners是不是一个引用
    if (nextListeners === currentListeners) {
      // 如果是一个引用的话深拷贝出来一个currentListeners赋值给nextListener
      nextListeners = currentListeners.slice()
    }
  }

  // store.getState()获取当前的state
  function getState() {
    // dispatch中不可以getState, 为什么？
    // 因为dispatch是用来改变state的,为了确保state的正确性(获取最新的state)，所有要判断啦
    if (isDispatching) {
      throw new Error(
        'You may not call store.getState() while the reducer is executing. ' +
          'The reducer has already received the state as an argument. ' +
          'Pass it down from the top reducer instead of reading it from the store.'
      )
    }
    // 确定currentState是当前的state 看 -> subscribe
    return currentState
  }

  // store.subscribe方法设置监听函数，一旦触发disp atch，就自动执行这个函数
  // listener是一个callback function
  function subscribe(listener) {
    // 类型判断
    if (typeof listener !== 'function') {
      throw new Error('Expected the listener to be a function.')
    }

    // 同理不可以dispatch中
    if (isDispatching) {
      throw new Error(
        'You may not call store.subscribe() while the reducer is executing. ' +
          'If you would like to be notified after the store has been updated, subscribe from a ' +
          'component and invoke store.getState() in the callback to access the latest state. ' +
          'See https://redux.js.org/api-reference/store#subscribe(listener) for more details.'
      )
    }

    // 不确定这个变量，猜测是订阅标记，先往下看
    let isSubscribed = true
    // ensureCanMutateNextListeners干啥的,点击去看一下
    ensureCanMutateNextListeners()
    // push一个function，明显的观察者模式，添加一个订阅函数
    nextListeners.push(listener)
    // 返回取消的function（unsubscribe）
    return function unsubscribe() {
      // 还记得let isSubscribed = true吧， 用来标记是否有listerner的
      if (!isSubscribed) {
        // 没有直接return
        return
      }

      // 同理
      if (isDispatching) {
        throw new Error(
          'You may not unsubscribe from a store listener while the reducer is executing. ' +
            'See https://redux.js.org/api-reference/store#subscribe(listener) for more details.'
        )
      }

      // 这里解释了isSubscribed，
      isSubscribed = false

      // 保存订阅快照
      ensureCanMutateNextListeners()
      // 找到并删除当前的listener
      const index = nextListeners.indexOf(listener)
      nextListeners.splice(index, 1)
    }
  }

  // 发送一个action
  function dispatch(action) {
    // 看下util的isPlainObject
    // acticon必须是由Object构造的函数， 否则throw Error
    if (!isPlainObject(action)) {
      throw new Error(
        'Actions must be plain objects. ' +
          'Use custom middleware for async actions.'
      )
    }

    // 判断action, 不存在type throw Error
    if (typeof action.type === 'undefined') {
      throw new Error(
        'Actions may not have an undefined "type" property. ' +
          'Have you misspelled a constant?'
      )
    }

    // dispatch中不可以有进行的dispatch
    if (isDispatching) {
      throw new Error('Reducers may not dispatch actions.')
    }

    try {
      // 执行时标记为true
      isDispatching = true
      // 执行reducer， 来，回忆一下reducer，参数state， action 返回值newState
      // 这就是dispatch一个action可以改变全局state的原因
      currentState = currentReducer(currentState, action)
    } finally {
      // 最终执行， isDispatching标记为false， 即完成状态
      isDispatching = false
    }

    // 监听队列
    // 所有的的监听函数赋值给 listeners
    const listeners = (currentListeners = nextListeners)
    for (let i = 0; i < listeners.length; i++) {
      const listener = listeners[i]
      // 执行每一个监听函数
      listener()
    }
    // 返回传入的action
    return action
    // 到这里dispatch方法就结束了， 我们来思考总结一下， 为什么要用listeners
    // 当dispatch发送一个规范的action时，会更新state
    // 但是state改变了之后我们需要做一些事情， 比如更新ui既数据驱动视图
    // （当然一般我们使用react，react-redux的时候， 他们会帮我们完成这些事情）
    // 所以要提供一个监听模式，当然还要有一个监听函数subscribe, 保证dispatch和subscribe之间的一对多的模式
  }

  // 这是一个高级的api， 用于替换计算 state的reducer，不知道的同学面壁去
  // 哈哈开玩笑的确实很不常用， 官网也没怎么介绍
  // redux 热加载机制的时候用到了
  function replaceReducer(nextReducer) {
    // 既然是替换reducer， 类型要保持一直，不是function的滚远点
    if (typeof nextReducer !== 'function') {
      throw new Error('Expected the nextReducer to be a function.')
    }

    // 当前的currentReducer更新为参数nextReducer
    currentReducer = nextReducer
    // 和INIT的dispath相同，发送一个dispatch初始化state，表明一下是REPLACE
    // 自己👀看一下utils方法的ActionTypes， 随性的随机数
    dispatch({ type: ActionTypes.REPLACE })
  }

  // 不知道是干什么的， 先看看哪里用到了， 全局收索一下
  // 我TM！只有这一个地方有这个函数，而且没被使用（ [$$observable]: observable ）， 就问你气不气？
  // 当然不气， 作为不思进取的我觉得不用看这部分了， 算了，简单的过一下， 刚好也不知道$$observable这个私有属性的作用
  // 好了， 全局搜索一下$$observable， 尼玛，对于我这种码农来说， 貌似又是没用的
  // 好吧，我们看一下作者的注释和代码
  function observable() {
    const outerSubscribe = subscribe
    // 
    return {
      /**
       * The minimal observable subscription method.
       * @param {Object} observer Any object that can be used as an observer.
       * The observer object should have a `next` method.
       * @returns {subscription} An object with an `unsubscribe` method that can
       * be used to unsubscribe the observable from the store, and prevent further
       * emission of values from the observable.
       */
      // 参数明显是object
      subscribe(observer) {
        if (typeof observer !== 'object' || observer === null) {
          throw new TypeError('Expected the observer to be an object.')
        }
        //获取观察着的状态
        function observeState() {
          // 如果有next方法，吧回调state
          if (observer.next) {
            observer.next(getState())
          }
        }

        observeState()
        //返回取消订阅的方法
        const unsubscribe = outerSubscribe(observeState)
        return { unsubscribe }
      },

      [$$observable]() {
        return this // 猜测this应该是store
      }
      // observable方法简单过一下，不做过多解释，有了解的同学，欢迎不吝赐教
    }
  }

  // 有没有想过，在使用redux的时候， 初始化的state哪来的
  // 当然是自己先dispatch了一下
  //reducer 返回其初始状态 
  //初始化 store 里的 state tree
  dispatch({ type: ActionTypes.INIT })

  // 这个就是返回的store嘛
  return {
    dispatch,
    subscribe,
    getState,
    replaceReducer,
    [$$observable]: observable
  }
}
```