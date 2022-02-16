---
title: 'React 学习笔记（一）'
date: 2019-04-16T17:05:16+08:00
hidden: false
draft: false
tags: ['React']
keywords: ['React']
description: 'React 学习笔记（一）'
slug: 'react-note-1'
---

1. React 可能会把多个 setState() 调用合并成一个调用。 因为 this.props 和 this.state 可能会异步更新，所以你不要依赖他们的值来更新下一个状态

```js
// this.state.count === 0
this.setState({ count: this.state.count + 1 });
this.setState({ count: this.state.count + 1 });
this.setState({ count: this.state.count + 1 });
console.log(this.state.count); // 1

// this.state.count === 0
this.setState(({ count }) => ({ count: count + 1 }));
this.setState(({ count }) => ({ count: count + 1 }));
this.setState(({ count }) => ({ count: count + 1 }));
console.log(this.state.count); // 3
```

2. 事件处理中，可以使用箭头函数，也可使用 bind，区别在于 bind 可以隐式的将事件对象等传递进去

```text
<button onClick={(e) => this.deleteRow(id, e)}>Delete Row</button>
<button onClick={this.deleteRow.bind(this, id)}>Delete Row</button>
```

3. 在这两种情况下，React 的事件对象 e 会被作为第二个参数传递。如果通过箭头函数的方式，事件对象必须显式的进行传递，而通过 bind 的方式，事件对象以及更多的参数将会被隐式的进行传递
4. 组件中 render 返回 null 则组件不会进行渲染，但是生命周期仍然会进行调用
5. map 生成元素集合的时候必须添加 key，key 在兄弟节点之间必须唯一，key 不会作为 props 传入到子组件内。[shortId.js](https://github.com/dylang/shortid)、[ID.js](https://gist.github.com/gordonbrander/2230317)
6. 受控组件 v.s. 非受控组件 [Formik.js](https://jaredpalmer.com/formik/)
7. Fragment & <></>、使用 ref 使元素聚焦 this.ref = React.createRef、ref.current.focus()
8. 组件的动态导入 React.lazy(() => import('./component'))、React.Suspense fallback、使用 lazy 动态导入的组件必须使用 Suspense 包裹，使得能有一个回退的 UI
9. ErrorBoundary 用来处理一些错误边界，常与 Suspense 配合使用，当 Suspense 出现异常时，友好的提示用户，提升体验，内部使用 componentDidCatch 以及 static getDerivedStateFromError 来进行错误处理
10. 基于路由的代码分割配合 React.lazy 或者 React Router 实现
11. React.lazy 只支持默认导出（export default），若想将命名导出不会被 treeshaking 掉，可使用中间模块，重新导出为默认模块

```js
// components.js
export const xxx = /* */
export const yyy = /* */

// component.js
export {xxx as dafault} from './components';

//App.js
import xxx = React.lazy(() => import('./component.js'))
```

完。
