---
title: 'Java 学习笔记（三)'
date: 2019-06-25T11:03:15+08:00
hidden: false
draft: false
tags: ['java']
keywords: ['java']
description: 'java 学习笔记（三）'
slug: 'java-note-3'
---

### 数据类型

- Java 中一个 int 数据类型数据占 4 个字节（byte） 大小，32 位（bit）。最高位是符号位，剩下的 31 位存放数据
- char 类型和 short 类型数据占用 2 个 byte，任何数据类型在内存中都是以二进制形式存储的
- 使用 man ascii 查看码表
- java 中以 0 开头的数字表示 8 进制，以 0x 开头的数字表示 16 进制，0b 开头的数字表示 2 进制
- java 中的数据分为**原生类型**和**引用类型。**只要能在 java 语言包中找到对应的 class 的就是引用类型，否则就是原生类型
- java 中的基本类型有：

|     数据类型     | byte | int | long | double | float | char |  boolean   | void |
| :--------------: | :--: | :-: | :--: | :----: | :---: | :--: | :--------: | :--: |
| 所占空间（字节） |  1   |  4  |  8   |   8    |   4   |  2   | true/false |      |

- 每个类型数据都有最大值最小值，如果超过最大最小范围， 则会发生溢出，数据会变为最初始的数值，例如:

```java
int a = 127;
System.out.println((byte)(a + 1)); // -128, int 类型数据最大 127，最小 -128
```

- int 类型数据最大值大概是 21 亿，强制类型转换的时候会丢失精度
- 每个数据类型原始的类称为装箱类型
- java 中，可以使用 **\_** 作为数字的分割符，例如 int a = 1_0_0_0 和 int a = 1000 是等价的
- float 和 double 是计算中对于小数的近似表示，因为浮点数无法精确的存储十进制的小数。浮点数只能比较大小，不能比较相等，如果两个浮点数相等，仅仅只是巧合
- 浮点数如何实现相等比较呢？使用 Math.abs() 方法，例如：

```java
double a = 0.00002;
if(Math.abs(a - 0.00002) < 0.0000000001) {
    // 小于一个足够小的数字，说明两者是相等的
    return true;
}
```

- 如何声明不同数据类型的数据？

```java
byte e = (byte)(126); // 使用类型转换的例子
int d = 1000000;
int g = 0x12377; // 16 进制
int h = 0b1010011; // 2 进制
long a = 1000000000000L; // 末尾使用大写的 L
float b = 0.1f;
double c = 1e-7d; // e 代表 10 次方
```

### 类型转换

- 整数除法是地板除。除法结果向下取整，导致得到的结果和预期不符
- 解决类型原因带来的异常，需要把所有的数据类型提升到最高精度级别

```java
int a = 3;
int b = 2;

System.out.println(a / b); // 1.0，向下取整
System.out.println((double) a / b); // 1.5
```

- 丢失精度时需要进行强制类型转换
- char 参与计算的时候使用的是 ascii 码，char i = '1' 与 char i = 49 是等价的

### 装箱类型

- 原生（基本）数据类型的包装类称为装箱类型。java 在一些情况下会自动做装箱拆箱处理。类似 js 中：

```java
// js
const obj1 = {};
const obj2 = new Object();
const num1 = 1;
const num2 = new Number(1);
// java
int i = 1;
Integer i = new Integer(1);
```

- 容器类不接受原生数据类型，必须是装箱类型，例如：

```java
// 错误的使用原生类型
List<int> arr = new ArrayList<>();
// 正确的使用装箱类型
List<Integer> arr = new ArrayList<>();
```

- 可以赋值为 null，例如：

```java
boolean flag = true;
flag = false;
flag = null; // error, 原生数据类型不允许赋值为 null

Boolean flag = null;
flag = true;
flag = false;
```

但是对装箱类型赋值 null 的时候，存在一个隐患：当我们将一个装箱的数据赋值给一个原生类型的数据时，java 会进行拆箱操作，拆箱可能会出现**空指针异常**报错（NullPointerException），比如：

```java
Integer i = null;
int j = i; // NullPointerException，java 拆箱的时候发生错误
```

- 可以使用装箱类型提供的一些方法，类似于 js 中的 Object.prototype.toString 等操作。比如 Integer.parseInt() 可将字符串转换为 int 类型数据

### 相等比较

- equals 用来比较两个值是否相等，而 '==' 用来比较两个值是否具有同一性
- 当 java 中的数据为基础类型时，使用 '==' 能够得到正确的结果。当数据为引用类型的时候，使用 '==' 比较的是引用类型的栈内存（stack）内容，**通常**得不到正确的结果，因为真正的数据存放于堆（heap）内存中

```java
int a = 1000;
int b = 1000;
System.out.println(a == b); // true

Integer i = new Integer(1000);
Integer j = new Integer(1000);

System.out.println(i == j); // false
System.out.println(i.equals(j)); // true, 使用 equals 得到正确的结果
```

- 当 Integer 包装类声明的引用对象赋值 -128 ~127 范围内的数值时，使用 == 进行两个值得比较会神奇的得到比较结果为 true：

```java
Integer i = new Integer(1);
Integer j = new Integer(1);

System.out.println(i == j); // true
```

其原因是：Integer 创建的引用类型数据占用的空间大小远远比 int 占用的 4 byte 要大，因此 java 为了优化节省内存，将 -128 ~ 127 范围内的 Integer 数据进行了**缓存**，因此 i 和 j 指向的都是同一处堆内存，导致了使用 == 进行比较的时候得到的结果为 true，可以在 JDK 的代码中查看查看注释
