---
title: "TypeScript 类型体操通关秘籍（二)"
date: 2022-02-18T23:04:33+08:00
hidden: false
draft: false
tags: ['TypeScript']
keywords: ['TypeScript']
description: "TypeScript 类型体操通关秘籍（二)"
slug: "juejin-book-7047524421182947366-2"
---

## Capitalize

利用 ts 自带的 `Uppercase` 工具类型。

```typescript
type Capitalize<S extends string> =
  S extends `${infer First}${infer Rest}`
    ? `${Uppercase<First>}${Rest}`
    : S;

type result = Capitalize<'captainOfPhB'>; // CaptainOfPhB
```

### FilterByValueType

`never` 的索引会在生成新的索引类型时被去掉。

```typescript
type FilterByValueType<Obj extends Record<string, any>, ValueType> = {
  [Key in keyof Obj as ValueType extends Obj[Key] ? Key : never] : Obj[Key]
}

interface Person {
  name: string;
  age: number;
  hobby: string[];
}

type result = FilterByValueType<Person, string | number>; // { name: string; age: number }
```

### isEqual

```typescript
type IsEqual<A, B> = (A extends B ? 1 : 2) extends (B extends A ? 1 : 2) ? true : false;
```

### BuildArray

```typescript
type BuildArray<Length extends number, Ele = unknown, Arr extends unknown[] = []> =
  Arr['length'] extends Length
    ? Arr 
    : BuildArray<Length, Ele, [...Arr, Ele]>;

type result = BuildArray<3>; // [unknown, unknown, unknown]
```
