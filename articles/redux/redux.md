## redux
redux 是用来进行状态管理工具。<br>
1. 当用户触发事件时，会根据事件的数据生成一个 action， action 包括对数据处理的方式（type）和state。
2. reducer 是一个函数，根据 action 生成一个新的 state。 newState = reducer(oldState, action)
3. state 由 react-redux 链接每个react组件，当state发生改变，就重新渲染页面。

