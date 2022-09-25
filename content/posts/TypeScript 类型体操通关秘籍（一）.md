---
title: "TypeScript 类型体操通关秘籍（一)"
date: 2022-02-18T21:45:07+08:00
hidden: false
draft: false
tags: ['TypeScript']
keywords: ['TypeScript']
description: "TypeScript 类型体操通关秘籍（一)"
slug: "juejin-book-7047524421182947366-1"
summary: 'TS 中的一些小技巧。'
---

TypeScript 类型系统中的一些类型运算。

### 条件运算 `extends ? :`

ts 为<u>图灵类型完备</u>的类型系统，具有类型计算功能。`extends` 相当于 js 中的三元运算符。

```typescript
type isTwo<T> = T extends 2 ? true: false;

type res = isTwo<1>; // false
type res2 = isTwo<2>; // true
```

### 推导 `infer`

`infer` 后面的泛型表示待推导的类型。

```typescript
type First<Tuple extends unknown[]> = Tuple extends [infer T,...infer R] ? T : never;

type res = First<[1,2,3]>; // 1
```

### 交叉 `&`

对两种类型取交集，没有交集则为 `never`。

```typescript
type ObjType = {a: number } & {c: boolean}; // { a: number; c: boolean }

type res = 'aaa' & 222; // never
```

### 类型映射

```typescript
type MapType<T> = {
  [Key in keyof T]?: T[Key]
}
```

`keyof T` 是查询索引类型中所有的索引，叫做<u>索引查询</u>。`T[Key]` 是取索引类型某个索引的值，叫做<u>索引访问</u>。

一个集合映射到另一个集合，叫做<u>类型映射</u>。使用 `as` 运算符，可以做到<u>重映射</u>。

```typescript
type MapType<T> = {
    [Key in keyof T as `${Key & string}${Key & string}${Key & string}`]: [T[Key], T[Key], T[Key]]
}
```

`Key` 默认可能是 `string`、`number`、`symbol` 这三种，所以要和 `string` 取交叉部分。

完。
