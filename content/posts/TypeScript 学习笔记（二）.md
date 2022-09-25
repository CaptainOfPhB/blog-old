---
title: "TypeScript 学习笔记（二）"
date: 2020-09-20T14:16:27+08:00
hidden: false
draft: false
tags: ['TypeScript']
keywords: ['TypeScript']
slug: 'typescript-note-2'
description: 'Learning TypeScript'
hideSummary: true
---

## Literal Types

1. 字面量（literal）：用于在代码中表示一个固定值（区别于变量，变量是可变化的）
2. ts 中，对应的也有字面量类型。分为  String Literal Type、Number Literal Type、Boolean Literal Type 等
3. 一般情况下，literal type 可以看做是对应的类型的子类型。比如 string literal type 可以认为是 string type 的 subtype。在这种前提下我们可以得知，literal type 是可以 assign 给对应父类型的，反之则不行（特殊情况可用 as）。以 string literal type 为例：

```typescript
type TypeScript = 'TypeScript';    
const ts: TypeScript = 'TypeScript';     

const sayHello = (name: string) => console.log(`Hello ${name}!`);   

// string literal type can be assigned to string type
sayHello(ts);  
```

4. 在 ts 中，如果一个字面量是以 const 关键字声明的，那么在使用 typeof 获取类型的时候，返回的是 literal type；而以 let、var 等关键字声明的字面量，typeof 返回的类型是 literal type 的父类型。这和 const 的本质禁止再次修改赋值是一一对应的，因此 ts 能更加精确的知道其类型。literal narrow，即字面量收窄（缩小范围）。

```typescript
const stringConNotChange = "Hello World";
let stringMaybeChange = "Hi World";

// So, TypeScript sets the type to be "Hello World" not string
type StringLiteralType = typeof stringConNotChange; // 'Hello World'

// On the other hand, a let can change, and so the compiler declares it a string
type StringType = typeof stringMaybeChange; // string
```

## Enum

1. 枚举可以方便地当做字典/map 使用，因为在编译为 js 之后，枚举转换为了一个同名的对象。
2. 若枚举值是数字，那么还可以用作 reflect，利用 value 来获取 key。比如：

```typescript
enum Animal {
  Dog = 1,
  Cat = 2,
}

console.log(Animal.Dog); // log: 1
console.log(Animal[1]); // log: 'Dog'

// enum Animal 在转换为 js 时，多做了一步 Animal[1] = 'Dog' 和 Animal[2] = 'Cat'
"use strict";
var Animal;
(function (Animal) {
    Animal[Animal["Dog"] = 1] = "Dog";
    Animal[Animal["Cat"] = 2] = "Cat";
})(Animal || (Animal = {}));
```

3. 利用与 enum 同名的 namespace 我们可以在枚举上绑定一些方法。例如：

```typescript
// enum.ts
export enum Animal {
  Dog = 1;
  Cat = 2;
}

export namepsace Animal {
  export function isCat(animalType: Animal) {
   return animalType === Animal.Cat;
  }
  
  export function isDog(animalType: Animal) {
   return animalType === Animal.Dog;
  }
}

// index.ts
const animal = {
 name: 'name',
  type: 1,
  // other property
}

// normal case if not use enum namespace
const isCat = animal.type === Animal.Cat;
const isDog = animal.type === Animal.Dog;

if(isCat) {
  // do something with cat
}
if(isDog) {
  // do something with dog
}

// when we use enum namspace
if(Animal.isCat(animal.type)) {
  // do something with cat
}
if(Animal.isDog(animal.type)) {
  // do something with dog
}
```

## Class Type

当我们声明一个 class 时，其实同时声明了两个类型：一个代表着实例的类型（class），一个代表着构造函数的类型（typeof class）。

```typescript
class Greeter {
  greeting: string;

  constructor(message: string) {
    this.greeting = message;
  }

  greet() {
    return "Hello, " + this.greeting;
  }
}

// 'Greeter' is the type of it's instance
const greeter1: Greeter = new Greeter('TypeScript');
gretter1.greet(); // log: Hello TypeScript

// 'typeof Greeter' is the type of Greeter(the type of Greeter itself), or the type of instance's contructor
const GreeterFactory: typeof Greeter = Greeter;
const greeter2 = new GreeterFactory('World');
greeter2.greet(); // log: Hello World
```

## keyof、typeof

1. 使用 typeof 可以获得其后所跟内容（非类型）的类型。typeof 不能直接跟类型，否则报错。

```typescript
const arr = [1, 'abc'];
type ArrType = typeof arr; // (string | number)[]

type tuple = [1, 'abc'];
type TupleType = typeof tuple; // Error: 'tuple' only refers to a type, but is being used as a value here.
```

2. 使用 keyof 可以获取到由 interface 中的 key 组成的联合类型

```typescript
interface Interface {
  a: number;
  b: string;
  c: boolean;
}

type UnionType = keyof Interface; // 'a' | 'b' | 'c'
```

3. 获取一个数组中元素的类型可以使用 typeof, 获取元组 tuple 类型中的每一项的类型可以用类似数组索引的方式。

```typescript
const array = [1, 'abc'];
type ArrayType = typeof arr; // (string | number)[]
type ElementTypeInArray = ArrayType[number]; // string | number

// tuple is different from array, tuple is a type is typescript, array is a data structure in javascript 
type tuple = [1, 'abc']; // every element in a tuple is a literal type, not a literal data
type ElementTypeInTuple = tuple[number]; // 1 | 'abc' 
```

## Question

1. ts 中的元组 tuple 限制了数组中具体对应位置的类型。你可以给类型为 tuple 的数组继续 push，但是却不能读取到刚刚 push 过的那个值：

```typescript
type SpecifiedArray = [number, string];

const arr: SpecifiedArray = [1, 'hello'];
arr.push(123);
arr.push('world');
arr.push(true); // Argument of type 'boolean' is not assignable to parameter of type 'string | number'

console.log(arr[3]); // Tuple type 'SpecifiedArray' of length '2' has no element at index '3'.
```

2. 当索引签名的 key 是 string 时，keyof interface 获取到的是联合类型 string | number，但是当 key 是 number 的时候，keyof interface 获取到的是 number type：

```typescript
interface InterfaceWithStringKey {
  [key: string]: any; 
}

interface InterfaceWithNumberKey {
  [key: number]: any; 
}

type UnionType = keyof InterfaceWithStringKey; // string | number;
type NumberType = keyof InterfaceWithNumberKey; // number;
```

完。
