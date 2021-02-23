---
title: 'Vue 中 Computed、Watch 和 Methods 的区别'
date: 2018-07-17T17:38:47+08:00
hidden: false
draft: false
tags: ['vue']
keywords: ['vue']
description: 'Vue 中 Computed、Watch 和 Methods 的区别'
---

在 Vue 模板中使用表达式是十分便利的，但是这样设计的初衷是仅仅用于简单运算。在模板中使用大量的逻辑运算会使得模板变得难以维护。对于任何复杂的逻辑，都应该使用计算属性。

### Demo

一个最简单的翻转字符串的例子，可以将翻转之后的字符串放入一个计算属性中：

```html
<div id="app">
  <p>Original message: "{{ message }}"</p>
  <p>Computed reversed message: "{{ reversedMessage }}"</p>
</div>
```

```js
const app = new Vue({
  el: '#app',
  data: {
    message: 'Hello'
  },
  computed: {
    // 计算属性的 getter
    reversedMessage: function () {
      // this 指向 Vue 实例
      return this.message.split('').reverse().join('')
    }
  }
})
```

你可以像绑定普通属性一样在模板中绑定计算属性。`reversedMessage` 依赖于 `message`，当 `message` 发生改变时，所有依赖 `reversedMessage` 的绑定也会更新。以声明的方式创建这种依赖关系：计算属性的 getter 函数是没有`副作用 (side effect)` 的，这使它更易于测试和理解。

### computed VS methods

你也可以使用 `methods` 实现上述的目的：

```html
<div id="app">
  <p>Original message: "{{ message }}"</p>
  <p>Computed reversed message: "{{ reversedMessage() }}"</p>
</div>
```

```js
const app = new Vue({
  el: '#app',
  data: {
    message: 'Hello'
  },
  methods: {
    // 计算属性的 getter
    reversedMessage: function () {
      // this 指向 Vue 实例
      return this.message.split('').reverse().join('')
    }
  }
})
```

两种方式的最终结果是一样的，不同之处在于`计算属性是基于它的依赖进行更新的`，如果计算属性的依赖没有更新，那么计算属性就不会更新，从缓存中取值。而使用 `methods` 时`每次都要重新进行计算`，那么当你需要进行一个计算量比较大的操作的时候，使用 `methods` 将会增加性能开销。

### computed VS watch

侦听属性 `watch` 用来观察和响应数据的变动。当你有一些数据需要`随着其它数据变动而变动时`，你应该使用`计算属性`而不是命令式的 `watch` 回调，可参照[官网例子](https://cn.vuejs.org/v2/guide/computed.html#%E8%AE%A1%E7%AE%97%E5%B1%9E%E6%80%A7-vs-%E4%BE%A6%E5%90%AC%E5%B1%9E%E6%80%A7)。Vue 通过 `watch` 选项提供了一个更通用的方法，来响应数据的变化。当需要在数据变化时执行异步或开销较大的操作时，这个方式是最有用的。除了 `watch` 之外，还可以使用别名 `this.$watch`。

### computed setter

我们在给计算属性提供 getter 的同时，也可以同时提供一个 setter：

```js
computed: {
  fullName: {
    // getter
    get: function () {
      return this.firstName + ' ' + this.lastName
    },
    // setter
    set: function (newValue) {
      var names = newValue.split(' ')
      this.firstName = names[0]
      this.lastName = names[names.length - 1]
    }
  }
}
```

这样做，与下面提供 `watch` 是等效的。当 `fullName` 更新时，其 setter 会被调用：

```js
computed: {
  fullName() {
      return this.firstName + ' ' + this.lastName
    },
  watch: {
    fullName (newValue) {
      var names = newValue.split(' ')
      this.firstName = names[0]
      this.lastName = names[names.length - 1]
    }
  }
}
```

### 结论

如何正确的使用这三个 Vue 为我们提供的 API 呢？

- `computed`: 当某个数据需要随着（依赖于）另一个数据的变动而作出改变时，这时候你需要使用计算属性。
- `watch`: 当某个数据发生变化时，需要对这个数据的变化进行反应（进行一系列操作），这时候你需要使用侦听属性。
- `methods`: 与计算属性不同的是，每次读取数据时，都是计算一遍，除非你不需要缓存，否则这样做需要大量的性能开销。

以上需要结合官网例子进行理解，理论结合实践最佳。

完。
