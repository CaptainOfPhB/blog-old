---
title: 'Java 学习笔记（二)'
date: 2019-06-17T10:56:14+08:00
hidden: false
draft: false
tags: ['Java']
keywords: ['Java']
description: 'Java 学习笔记（二)'
slug: 'java-note-2'
---

1. java 是一门强类型的静态语言，编译器（compile）提供了最佳的安全保障
2. java 的跨平台性能良好（Windows、Linux、macOS），JVM（Java Virtual Machine）打通了不同平台和 java 之间的桥梁，这种中间层语言为 bytecode （字节码），java -> bytecode -> 机器码，一处编译，处处运行
3. class 类是 java 中的最小单位，一般放在与类同名的 .java 文件中，文件名与类名不一致 IDEA 会报错
4. 类名其实是由包名决定的
5. 每个 class 类都有对应的包名，一般包名称需要遵守社区约定，与域名反序，例如 com.alibaba.fastjson，目录结构是 /src/main/java/com/alibaba/fastjson/
6. 放在 java 目录下的类称为默认类，一般不会有顶部的 package 声明
7. maven 的项目结构约定为 src/main/java、src/test/java
8. JVM 中，不存在简单的类名这种概念，所有的类名都会是复杂的带包名的类名（全限定类名，full qualified classname，FQCN），避免冲突。JVM 可以允许在不冲突的情况下使用简单的类名
9. 当一个 class 类放在 java.lang 包下时，其他类使用的时候可以不必在顶部 import
10. 局部变量的作用域是在当前的花括号内有效的，类似于 js 的块级作用域
11. 静态成员变量指存在于 class 中的常量，不和任何对象相绑定。成员变量也是 class 中的常量，是和 class 相绑定的
12. class 中任何静态的方法都不能访问 class 构造出的实例上的属性或者方法的
13. class 中没有声明 constructor 的时候，编译器会自动生成无参构造器
14. class 中可以存在多个构造器，构造器本质是特殊的方法
15. java 中有两种数据类型：原生类型以及引用类型。类似于 js，基础类型数据存在于栈内存中，引用类型数据存在于堆内存中，栈内存中存储的是堆内存地址
