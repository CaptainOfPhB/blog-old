---
title: 'Object.defineProperty'
date: 2018-07-16T17:20:12+08:00
hidden: false
draft: false
tags: ['JavaScript']
keywords: ['JavaScript']
description: 'Object.defineProperty'
slug: 'object-defineProperty'
---

`Object.defineProperty()` 方法会直接在一个对象上定义一个新属性，或者修改一个对象的现有属性， 并返回这个对象。该方法允许精确添加或修改对象的属性。通过赋值来添加的普通属性会创建在属性枚举期间显示的属性（`for...in` 或 `Object.keys` 方法），这些值可以被改变，也可以被删除。这种方法允许这些额外的细节从默认值改变。默认情况下，使用 `Object.defineProperty()` 添加的属性值是不可变的。

## 语法

`Object.defineProperty(obj, prop, descriptor)`

## 参数

- `obj`: 需定义属性的对象
- `prop`: 要定义或修改的属性的名称
- `descriptor`: 将被定义或修改的`属性描述符`

这里主要介绍研究一下第三个参数 `descriptor`。

## 属性描述符

属性描述符分为两种：`数据描述符`和`存取描述符`。描述符必须是这两种形式之一，不能同时是两者。

`数据描述符`和`存取描述符`均具有以下可选属性：

- `configurable`: 默认为 `false`
- `enumerable`: 默认为 `false`

`数据描述符`单独具有的可选属性：

- `value`: 属性对应的值
- `writable`: 默认为 `false`

`存取描述符`单独具有的可选属性：

- `get`: 一个给属性提供 getter 的方法，默认为 `false`
- `set`: 一个给属性提供 setter 的方法，默认为 `false`

如果一个描述符不具有 value、writable、get 和 set 任意一个关键字，那么它将被认为是一个数据描述符。
如果一个描述符同时有(value 或 writable)和(get 或 set)关键字，将会产生一个异常（数据描述符和存取描述符不能同时存在）。

### configurable

`configurable` 特性指明对象的属性是否可以被删除，以及除 writable 特性外的其他特性是否可以被修改。

```js
var obj = {};
Object.defineProperty(obj, "a", {
  configurable : false,
  get : function(){
    return 1;
  },
});

// 以下几条语句全部抛出错误，因为除了 writable 之外的其他属性都是不可修改的
Object.defineProperty(obj, "a", {configurable: true});
Object.defineProperty(obj, "a", {enumerable: true});
Object.defineProperty(obj, "a", {set : function(){}});
Object.defineProperty(obj, "a", {get : function(){return 1;}});
Object.defineProperty(obj, "a", {value : 12});

console.log(obj.a); // 1
delete obj.a; // Nothing happens
console.log(obj.a); // 1
```

如果 `configurable` 为 `true`，那么在删除某个属性的时候，该属性下的 `configurable` 是最后被删除的。

### enumerable

`enumerable` 定义了对象的属性是否可以在 `for...in` 循环和 `Object.keys()` 中被枚举。

```js
var obj = {};
Object.defineProperty(obj, "a", { value : 1, enumerable:true });
Object.defineProperty(obj, "b", { value : 2, enumerable:false });
Object.defineProperty(obj, "c", { value : 3 }); // enumerable 配置默认为 false
obj.d = 4; // 使用直接赋值的方式创建对象的属性，则这个属性的 enumerable 为 true

for (var i in obj) {
  console.log(i); // 打印 'a' 和 'd'
}

Object.keys(obj); // ["a", "d"]

obj.propertyIsEnumerable('a'); // true
obj.propertyIsEnumerable('b'); // false
obj.propertyIsEnumerable('c'); // false
```

### writable

当 `writable` 属性设置为 `false` 时，该属性不可写，它不能被重新赋值。

```js
var obj = {};

Object.defineProperty(obj, 'a', {
  value: 37,
  writable: false,
});

console.log(obj.a); // 37
// 严格模式下会抛出错误，即使是赋的值与之前相等，如 obj.a = 37
obj.a = 25;
// the assignment didn't work
console.log(o.a); // 37

// strict mode
(function() {
  'use strict';

  var obj = {};
  Object.defineProperty(obj, 'b', {
    value: 2,
    writable: false,
  });
  obj.b = 3; // throws TypeError: "b" is read-only
  return obj.b; // returns 2
}());
```

### get

`get` 表示如何获取属性的值。配置了该选项后，属性的值不能通过外界的赋值操作来更改，属性的值是通过 `get` 来获取的。

```js
var obj = {};

Object.defineProperty(obj, 'a', {
  get() {
    return 'value of a'
  }
})

obj.a = 123
console.log(obj.a) // 'value of a'
```

### set

`set` 表示对该属性进行赋值操作时的回调。配置了该选项后，对属性进行赋值，将会调用该属性配置下的 `set` 方法。

```js
var obj = {};

Object.defineProperty(obj, 'a', {
  set() {
    console.log('set() has beend called')
  }
})

obj.a = 123; // log 'set() has beend called', and obj.a is undefined
```

## 默认行为

使用 `.` 运算符和 `Object.defineProperty()` 为对象的属性赋值时，数据描述符中的属性默认值是不同的，如下例所示:

```js
var obj = {};

obj.a = 1;
// 等同于:
Object.defineProperty(obj, "a", {
  value: 1,
  writable: true,
  configurable: true,
  enumerable: true
});


// 另一方面，
Object.defineProperty(obj, "a", { value : 1 });
// 等同于:
Object.defineProperty(obj, "a", {
  value: 1,
  writable: false,
  configurable: false,
  enumerable: false
});
```

`Object.defineProperty` 是 Vue 实现数据响应式的核心，还需要结合的是 `watcher`，有待研究。

> Reference: [Object.defineProperty \| MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty)

完。