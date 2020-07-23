# 基础
### 安装
> npm install --save styled-components
### 引入
> import styled from 'styled-components'
### 入门
```js
import React, { useState } from 'react'

import styled from 'styled-components'

// 创建一个 Title 组件,它将渲染一个附加了样式的 <h1> 标签
const Title = styled.h1`
    font-size: 1.5rem;
    text-align: center;
    color: palevioletred;
`

// 创建一个 Wrapper 组件,它将渲染一个附加了样式的 <section> 标签
const Wrapper = styled.section`
    padding: 4em;
    background: papayawhip;
`

const App = () => (
    <Wrapper>
        <Title>
            hello world!
        </Title>
    </Wrapper>
)

export default App
```
### 基于属性的适配
```js
import React, { useState } from 'react'

import styled from 'styled-components'

// 创建一个 Title 组件,它将渲染一个附加了样式的 <h1> 标签
const Title = styled.h1`
    font-size: 1.5rem;
    text-align: center;
    color: palevioletred;
`

// 创建一个 Wrapper 组件,它将渲染一个附加了样式的 <section> 标签
const Wrapper = styled.section`
    padding: 4em;
    background: papayawhip;
`

const App = () => (
    <Wrapper>
        <Title>
            hello world!
        </Title>
    </Wrapper>
)

export default App
```
### 样式与继承
```js
//继承
import React from 'react'
import styled from 'styled-components'

// 使用 props 以插值的方法传递给 styled components 调整组件样式

const Button = styled.button`
    color: palevioletred;
    font-size: 1rem;
    margin: 1rem;
    padding: 0.25rem 1rem;
    border: 2px solid palevioletred;
    border-radius: 3px;
`

const TomatoButton = styled(Button)`
    color: tomato;
    background: tomato;
`
const App = () => (
    <>
        <Button>Normal</Button>
        <TomatoButton>Tomato Button</TomatoButton>
    </>
)

export default App

// 多态 as
import React from 'react'
import styled from 'styled-components'
const Button = styled.button`
    color: palevioletred;
    font-size: 1rem;
    margin: 1rem;
    padding: 0.25rem 1rem;
    border: 2px solid palevioletred;
    border-radius: 3px;
`

const TomatoButton = styled(Button)`
    color: tomato;
    background: tomato;
`

const DemoButton = styled(Button)`
    color: red;
`

const App = () => (
    <>
        <h3>as 多态</h3>
        <Button>Normal Button</Button>
        <Button as='a' href='/'>Link with Button styles</Button>
        <TomatoButton as='a' href='/'>Link with Tomato Button styles</TomatoButton>
        <TomatoButton as={DemoButton} href='/'>Link with Tomato Button styles</TomatoButton>
    </>
)

export default App

// 给任何组件添加样式
import React, { useState, Children } from 'react'
import styled from 'styled-components'

const Link = ({className, children}) => (
    <a className={className}>
        {children}
    </a>
)

const StyledLink = styled(Link)`
    color: palevioletred;
    font-weight: bold;
`

const App = () => (
    <>
        <Link>unstyled, boring Link</Link>
        <br />
        <StyledLink>styled, exciting Link</StyledLink>
    </>
)

export default App
```
### 属性传值
```js
import React, { useState } from 'react'

import styled from 'styled-components'

// 创建一个 Title 组件,它将渲染一个附加了样式的 <h1> 标签
const Title = styled.h1`
    font-size: 1.5rem;
    text-align: center;
    color: palevioletred;
`

// 创建一个 Wrapper 组件,它将渲染一个附加了样式的 <section> 标签
const Wrapper = styled.section`
    padding: 4em;
    background: papayawhip;
`

const App = () => (
    <Wrapper>
        <Title>
            hello world!
        </Title>
    </Wrapper>
)

export default App
```

### coming from css
```js
import React, { useState } from 'react'
import styled from 'styled-components'

const StyledCounter = styled.div`
    background: greenyellow;
`

const Paragraph = styled.p`
    font-size: 2rem;
    color: red;
`

const Button = styled.button`
    color: papayawhip;
    background: #ccc;
`

const App = () => {
    const [count, setCount] = useState(0)

    const increment = () => {
        setCount(count + 1)
    }

    const decrement = () => {
        setCount(count - 1)
    }

    return (
        <StyledCounter>
            <Paragraph>{count}</Paragraph>
            <Button onClick={increment}>+</Button>
            <Button onClick={decrement}>-</Button>
        </StyledCounter>
    )
}

export default App
```
### 伪元素、伪类选择器和嵌套
```js
//伪元素 伪类选择器
import React, { useState } from 'react'
import styled from 'styled-components'

const Thing = styled.button`
    color: blue;
    ::before {
        content: '🚀';

    }
    :hover {
        color: red;
    }
`

const App = () => {
    return (
        <Thing>Hello world!</Thing>
    )
}

export default App
//嵌套
import React from 'react'
import styled from 'styled-components'

// 对于更复杂的选择器 可以使用 & 来指向主组件
const Thing = styled.div.attrs({ tabIndex: 0 })`
    color: blue;
    &:hover {
        color: red;
    }
    & ~ & {
    background: tomato; // <Thing> as a sibling of <Thing>, but maybe not directly next to it
  }

  & + & {
    background: lime; // <Thing> next to <Thing>
  }

  &.something {
    background: orange; // <Thing> tagged with an additional CSS class ".something"
  }

  .something-else & {
    border: 1px solid; // <Thing> inside another element labeled ".something-else"
  }

`

// 如果只写选择器而不带 & 则指向组件的子节点

const Thing1 = styled.div`
    color: red;
    .something{
        border: 1px solid;
        display: block;
    }
`

const App = () => (
    <React.Fragment>
        <Thing>Hello world!</Thing>
        <Thing>How ya doing?</Thing>
        <Thing className="something">The sun is shining...</Thing>
        <div>Pretty nice day today.</div>
        <Thing>Don't you think?</Thing>
        <div className="something-else">
            <Thing>Splendid.</Thing>
        </div>
        <br />
        <Thing1>
            <label htmlFor="foo-button" className="something">Mystery button</label>
            <button id='foo-button'>what do i do?</button>
        </Thing1>
    </React.Fragment>
)

export default App
```
# 高级
### 主题
styled-components 提供 `<ThemeProvider>` 包装组件以支持主题 `<ThemeProvider>` 通过 context API 为其后代组件提供主题 在其渲染树种的所有组件都能访问主题
```js
import React from 'react'
import styled, { ThemeProvider } from 'styled-components'

const Button = styled.button`
    font-size: 1em;
    margin: 1em;
    padding: .25em 1em;
    border-radius: 3px;

    color: ${props => props.theme.main};
    border: 2px solid ${props => props.theme.main}
`

Button.defaultProps = {
    theme: {
        main: "palevioletred"
    }
}

const theme = {
    main: "mediumseagreen"
}

const App = () => {
    return (
        <div>
            <Button>Normal</Button>
            <ThemeProvider theme={theme}>
                <Button>Themed</Button>
            </ThemeProvider>
        </div>
    )
}

export default App
```
### 函数主题
```js
// theme prop 也可以传递一个函数 该函数接收渲染树上级 <ThemeProvider> 所传递的主题。
// 通过这种方式使 themes 形成上下文
import React from 'react'
import styled, { ThemeProvider } from 'styled-components'

// Define our button, but with the use of props.theme this time
const Button  = styled.button`
    color: ${props => props.theme.fg};
    border: 2px solid ${props => props.theme.fg};
    background: ${props => props.theme.bg};

    font-size: 1em;
    margin: 1em;
    padding: .25em 1em;
    border-radius: 3px;
`

// Define our `fg` and `bg` on the theme
const theme = {
    fg: "palevioletred",
    bg: "white"
}

// This theme swaps `fg` and `bg`
const invertTheme = ({fg, bg}) => ({
    fg: bg,
    bg: fg
})


const App = () => (
    <ThemeProvider theme={theme} >
        <div>
            <Button>Default Theme</Button>
            <ThemeProvider theme={invertTheme}>
                <Button>Inverted Theme</Button>
            </ThemeProvider>
        </div>
    </ThemeProvider>
)

export default App
```
### 在 `styled-components`外使用主题
```js
// 如果需要在 styled-components 外使用主题 可以使用高阶组件 withTheme
import { withTheme } from 'styled-components'

class MyComponent extends React.Component {
  render() {
    console.log('Current theme: ', this.props.theme)
    // ...
  }
}

export default withTheme(MyComponent)
```
### theme props
```js
//主题可以通过 theme prop 传递给组件 通过 theme prop 可以绕过或重写 ThemeProvider 所提供的主题
import React from 'react'
import styled, { ThemeProvider } from 'styled-components'

const Button = styled.button`
    font-size: 1em;
    margin: 1em;
    padding: .25em 1em;
    border-radius: 3px;

    color: ${props => props.theme.main};
    border: 2px solid ${props => props.theme.main};
`

const theme = {
    main: 'mediumseagreen'
}

const App = () => (
    <>
        <Button theme={{ main: "royalblue" }}>Ad hoc theme</Button>
        <ThemeProvider theme={theme}>
            <div>
                <Button>Themed</Button>
                <Button theme={{ main: "darkorange" }}>Overidden</Button>
            </div>
        </ThemeProvider>
    </>
)

export default App
```
### Refs
```js
//通过传递 ref prop 给 style component 将获得
// 1 底层 DOM 节点
// 2 React 组件实例
import React from 'react'
import styled from 'styled-components'

const Input = styled.input`
    padding: .5em;
    margin: .5em;
    color: palevioletred;
    background: papayawhip;
    border: 0;
    border-radius: 3px;
`

const App = () => {
    const inputRef = React.createRef()
    console.log(inputRef)
    return (
        <Input
            value='hehe'
            ref={inputRef}
            placeholder="Hover to focus!"
            onMouseEnter={ () => {
                inputRef.current.focus()
                console.log('1111')
            }}
            onChange={console.log(inputRef)}
        />
    )
}

export default App
```
### 安全性
因为 `styled-components` 允许使用任意的输入作为插值，必须谨慎处理输入使其无害.使用用户输入作为样式可能导致用户浏览器中的`CSS`文件被攻击者替换。

### Existing CSS