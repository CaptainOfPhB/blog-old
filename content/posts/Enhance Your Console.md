---
title: "Enhance Your Console"
date: 2022-02-22T21:48:52+08:00
hidden: false
draft: false
tags: ['share','babel']
keywords: ['share','babel']
description: "enhance your console"
slug: "/enhance-your-console"
---

babel 最开始叫 6to5，顾名思义是 es6 转 es5，后面改名为 babel。

## babel 的用途

1. 转义 es、ts 等到目标环境的 js。babel7 支持 preset-env，可以指定 targets，转换更加的精准，产物更小。
2. 一些特定用途的代码转换。利用 babel 暴露的 api parse 出 AST，taro 框架。
3. 代码的静态分析。如 linter、type checker 等。

## babel 的编译流程

babel 整体编译流程分为三步：

1. parse：通过 parser 把源码转成抽象语法树（AST）
3. transform：遍历 AST，调用各种 transform 插件对 AST 进行增删改
4. generate：把转换后的 AST 打印成目标代码，并生成 sourcemap

{{< img src="https://s2.loli.net/2022/02/22/vzGDNfSu2FgIOrR.png" alt="babel 编译流程" >}}

parse 阶段将源码字符串转换成 AST，这个过程分为词法分析、语法分析。比如 `let name = 'javascript';` 这样一段源码，我们要先把它细分为 token（词法分析），也就是 `let`、`name`、`=`、`'javascript'`。之后把 token 进行递归组装，生成 AST（语法分析）。

{{< img src="https://s2.loli.net/2022/02/22/yCVnztfNmqDr5Rg.png" alt="parse 阶段" >}}

transform 阶段是对 AST 的处理，对 AST 遍历的过程中遇到不同的节点会调用相应的 visitor 函数，visitor 函数里可以对节点进行增删改，返回新的 AST。这样遍历完 AST 之后就完成了对代码的修改。


