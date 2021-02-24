---
title: 'TypeScript 学习笔记（一）'
date: 2019-05-09T16:38:15+08:00
hidden: false
draft: false
tags: ['TypeScript']
keywords: ['TypeScript']
description: 'TypeScript 学习笔记（一）'
slug: 'typescript-note-1'
---

- ts 中的基础类型有：boolean、number、string、array、enum、元组 Tuple、any、null、undefined、never、object（除了 js 中的基础五大类型 string、number、boolean、symbol、null、undefined 之外可以用 object 类型表示）
- 定义数组有两种方式：\<type>[] 或者使用泛型 Array\<type>
- 元组类型表示已知数量和类型的数组，例如：let x = [number, string]。当访问越界元素时，会使用联合类型替代，例如：

```typescript
let x: [string, number];
x = ['hello', 123]; // ok
x = [123, 'hello']; // error
// 越界元素将是 (number | string) 类型
x[3] = 'world';
```

- 枚举 enum 默认情况下，从 0 开始为元素编号，也可手动指定成员的值。也可以根据枚举的值得到 key 的名字，例如：enum Color = { Red, Green }，则 Color[1] 的值为 Green
- void 表示没有任何类型，只能给 void 类型数据赋值 null 或者 undefined
- null 和 undefined 类型是任何类型的子类型，可以赋值给任意类型的数据。在 tsconfig 中建议开启 stricNullChecks 选项，使 null 或 undefined 只能赋值给对应的 null 或 undefined
- 类型断言好比类型转换，当你比 ts 更了解某个值更确切的类型时。类型断言有两种，使用尖括号或者使用 as 语法，在 tsx 中只能使用 as。例如：

```typescript
let someValue: any = 'this is a string'
let strLength: number = (someValue as string).length
```

完。
