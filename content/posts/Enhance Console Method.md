---
title: "Enhance Console Method"
date: 2022-02-22T21:48:52+08:00
hidden: false
draft: false
tags: ['share','babel']
keywords: ['share','babel']
description: "enhance your console"
slug: "/enhance-console-method"
summary: "babel 最开始叫 6to5，顾名思义是 es6 转 es5，后面改名为 babel ..."
---

babel 最开始叫 6to5，顾名思义是 es6 转 es5，后面改名为 babel。

## babel 的用途

1. 转义 es、ts 等到目标环境的 js。babel7 支持 preset-env，可以指定 targets，转换更加的精准，产物更小。
2. 一些特定用途的代码转换。利用 babel 暴露的 api parse 出 AST，taro 框架。
3. 代码的静态分析。如 linter、type checker 等。

## babel 的编译流程

babel 整体编译流程分为三步：

1. parse：通过 parser 把源码转成抽象语法树（AST）（`@babel/parser`）
2. transform：遍历 AST，调用各种 transform 插件对 AST 进行增删改（`@babel/traverse`、`@babel/types`、`@babel/template`）
3. generate：把转换后的 AST 打印成目标代码，并生成 sourcemap（`@babel/generate`）

{{< img src="https://s2.loli.net/2022/02/22/vzGDNfSu2FgIOrR.png" alt="babel 编译流程" >}}

parse 阶段将源码字符串转换成 AST，这个过程分为词法分析、语法分析。比如 `let name = 'guang';` 这样一段源码，我们要先把它细分为 token（词法分析），也就是 `let`、`name`、`=`、`'guang'`。之后把 token 进行递归组装，生成 AST（语法分析）。

{{< img src="https://s2.loli.net/2022/02/22/yCVnztfNmqDr5Rg.png" >}}

transform 阶段是对 AST 的处理，对 AST 遍历的过程中遇到不同的节点会调用相应的 visitor 函数，visitor 函数里可以对节点进行增删改，返回新的 AST。这样遍历完 AST 之后就完成了对代码的修改。

{{< img src="https://s2.loli.net/2022/02/23/zy7mCAnBFxKGPWV.png" >}}

generate 阶段将 AST 打印成目标代码字符串，并且会生成 sourcemap。不同的 AST 对应的不同结构的字符串。比如 `IfStatement` 节点可以生成 `if(){}` 格式的代码。

## babel 的 AST

JS parser 的 AST 大多遵循了 [estree][estree] 标准。常见的 AST 节点有：

Literal 字面量节点。

{{< img src="https://s2.loli.net/2022/02/23/ZKLUTbRuGlsiY2n.png" >}}

Identifier 标识符。变量名、属性名、参数名等各种声明和引用的名字。

{{< img src="https://s2.loli.net/2022/02/23/F3mfIApGVJiEZCR.png" >}}

Statement 语句（可独立执行的单元）。

{{< img src="https://s2.loli.net/2022/02/23/NSDrlW5I4nkaOsd.png" >}}

Declaration 声明变量。

{{< img src="https://s2.loli.net/2022/02/23/Smq4ORxuQvfY28H.png" >}}

Expression 表达式，执行完以后有返回值。

{{< img src="https://s2.loli.net/2022/02/23/JBlKtkMiZzW4aqC.png" >}}

## `@babel/parser`

babel parser 叫 babylon，基于 acorn 实现的，扩展了很多语法，可以支持 es next、jsx、flow、typescript 等语法的解析，其中 jsx、flow、typescript 这些非标准的语法的解析需要指定语法插件。

```ts
function parse(input: string, options?: ParserOptions): File
function parseExpression(input: string, options?: ParserOptions): Expression

require("@babel/parser").parse("code", {
  sourceType: "module",
  plugins: [
    "jsx",
    "typescript"
  ]
});
```

## `@babel/traverse`

parse 出的 AST 由 `@babel/traverse` 来遍历和修改，babel traverse 包提供了 traverse 方法：

```ts
function traverse(parent, opts)
```

parent 指定要遍历的 AST 节点，opts 指定 visitor 函数。babel 会在遍历 parent 对应的 AST 时调用相应的 visitor 函数。visitor 函数会接收两个参数 path 和 state。

```ts
visitor: {
    Identifier (path, state) {},
    StringLiteral: {
        enter (path, state) {},
        exit (path, state) {}
    }
}
```

{{< img src="https://s2.loli.net/2022/09/25/4QixGvN7B2sjZlR.png" >}}

path 是遍历过程中的路径，会保留上下文信息，有很多属性和方法，比如:

{{< img src="https://s2.loli.net/2022/03/02/sW3bGgeOM4mEfdp.png" >}}

## `@babel/types`

遍历 AST 的过程中需要创建一些 AST 和判断 AST 的类型。

```ts
// create IfStatement node
t.ifStatement(test, consequent, alternate);
// assert IfStatement node
t.isIfStatement(node, opts);
t.assertIfStatement(node, opts);
```

## `@babel/template`

使用 `@babel/template` 包来批量创建 AST 节点。

```ts
const ast = template(code, [opts])(args);
const ast = template.ast(code, [opts]);
const ast = template.program(code, [opts]);
```

如果模版中有占位符，那么就用 template 的 api，在模版中写一些占位的参数，调用时传入这些占位符参数对应的 AST 节点。

```ts
const fn1 = template(`console.log(NAME)`);
const fn2 = template(`console.log(%%NAME%%)`);

const ast = fn1({
  NAME: t.stringLiteral("CaptainOfPhB"),
});
const ast = fn2({
  NAME: t.stringLiteral("CaptainOfPhB"),
});
```

接下来进入实战，使用上面的一些知识，让我们在写 `console` 的时候自动打印出 `console` 所在的行信息。

[GitHub demo][github]

[estree]: https://github.com/estree/estree
[github]: https://github.com/CaptainOfPhB/enhance-console-method

完。
