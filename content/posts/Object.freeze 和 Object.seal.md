---
title: 'Object.freeze 和 Object.seal'
date: 2018-07-16T17:32:12+08:00
hidden: false
draft: false
tags: ['JavaScript']
keywords: ['object freeze', 'object seal']
description: 'Object.freeze 和 Object.seal'
slug: 'object-freeze-and-object-seal'
summary: '本文主要介绍 Object.freeze 和 Object.seal 两个 api。'
---

Vue 的响应式是使用了 `Object.defineProperty` 来实现的，官方文档上注明如果想要响应式系统无法再追踪数据的变化，应该使用 `Object.freeze` 方法将数据“冻”起来。

> `Object.freeze()` 方法可以冻结一个对象，冻结指的是不能向这个对象添加新的属性，不能修改其已有属性的值，不能删除已有属性，以及不能修改该对象已有属性的可枚举性、可配置性、可写性。也就是说，这个对象永远是不可变的。该方法返回被冻结的对象。

## Parameter

`Obj`: 需要冻结的对象。

> 在 ES5 中，如果这个方法的参数不是一个对象（一个原始值），那么它会导致 `TypeError`。在 ES6 中，非对象参数将被视为要被冻结的普通对象，并被简单地返回。

## Return

被冻结的对象，而不是被冻结对象的副本（不是原对象的拷贝）。

## Example

```js
var obj = {
  prop: function() {},
  foo: 'bar'
};

// 新的属性会被添加, 已存在的属性可能
// 会被修改或移除
obj.foo = 'baz';
obj.lumpy = 'woof';
delete obj.prop;

// 作为参数传递的对象与返回的对象都被冻结
// 所以不必保存返回的对象（因为两个对象全等）
var o = Object.freeze(obj);

o === obj; // true
Object.isFrozen(obj); // === true

// 现在任何改变都会失效
obj.foo = 'quux'; // 静默地不做任何事
// 静默地不添加此属性
obj.quaxxor = 'the friendly duck';

// 在严格模式，如此行为将抛出 TypeErrors
function fail() {
  'use strict';
  obj.foo = 'sparky'; // throws a TypeError
  delete obj.quaxxor; // throws a TypeError
  obj.sparky = 'arf'; // throws a TypeError
}

fail();

// 试图通过 Object.defineProperty 更改属性
// 下面两个语句都会抛出 TypeError.
Object.defineProperty(obj, 'ohai', { value: 17 });
Object.defineProperty(obj, 'foo', { value: 'eit' });

// 也不可能设置属性
// 下面两个语句都会抛出 TypeError.
Object.setPrototypeOf(obj, { x: 20 });
obj.__proto__ = { x: 20 };
```

## Deep freeze

> 数据属性的值不可更改，访问器属性（有 getter 和 setter）也同样（但由于是函数调用，给人的错觉是还是可以修改这个属性）。`如果一个属性的值是个对象，则这个对象中的属性是可以修改的，除非它也是个冻结对象`。

类似于对象的拷贝以及 `const` 声明的对象能却被修改一样。`Object.freeze` 是一个浅冻结，如果需要将一个复杂对象下面的所有属性全部进行冻结，需要进行递归操作。编写一个 `deepFreeze` 方法对对象进行深度冻结：

```js
function deepFreeze(obj) {
  // 取出在 obj 上所有的属性
  var propNames = Object.getOwnPropertyNames(obj);

  // 如果某个属性的值是也是个对象，则进行递归冻结
  propNames.forEach(function(prop) {
    var val = obj[prop];

    // 如果 val 是个对象，冻结它
    // 值得注意的是 null 的数据类型是 object，这是 js 的一个 bug
    if (typeof val === 'object' && val !== null) deepFreeze(val);
  });

  // 冻结自身(no-op if already frozen)
  return Object.freeze(obj);
}

obj2 = {
  internal: {}
};

deepFreeze(obj2);
obj2.internal.a = 'anotherValue';
obj2.internal.a; // undefined
```

> 与冻结一个对象不同的是，`Object.seal` 是将一个对象进行密封操作，不可添加新的属性，不可删除已有的属性，但是可以修改现有的可修改（可写）的属性。

> Reference: [Object.freeze \| MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/freeze)

完。
