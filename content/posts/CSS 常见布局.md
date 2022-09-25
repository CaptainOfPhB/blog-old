---
title: 'CSS 常见布局'
date: 2018-03-16T14:55:37+08:00
hidden: false
draft: false
tags: ['CSS', 'layout']
keywords: ['CSS', 'layout']
description: 'CSS 常见布局'
slug: 'css-layout'
summary: 'CSS 是一门艺术，学好 CSS 需要投入大量的时间去实践，今天我们主要聊一聊工作中常用到的 CSS 布局套路。'
---

前端工程师的一门必修课程就是 CSS ( Cascading Style Sheet, 层叠样式表)，CSS 是一门艺术，学好 CSS 需要投入大量的时间去实践。今天我们主要聊一聊工作中常用到的 CSS 布局套路。

> 文中内联元素指 display: inline，块级元素指 display: block，弹性布局指 display: flex。

## 一、水平居中

### 内联元素

```html
<style>
  .wrapper {
    text-align: center;
  }
</style>

<div class="wrapper">
  <span class="inline">内联元素水平居中</span>
</div>
```

说明：父元素下的子元素会继承 `text-align: center` 属性；当父元素宽度小于内联元素的宽度时无效。

### 块级元素

1、 父元素不定宽，子元素定宽(300px)

```html
<style>
  .block {
    width: 200px;
    margin-left: auto;
    margin-right: auto；;
  }
</style>

<div class="wrapper">
  <div class="block">块级元素水平居中</div>
</div>
```

2、父元素定宽（500px），子元素定宽(300px)

- 第一种：

```html
<style>
  .wrapper{
    padding-left：150px；
    padding-right：150px；
  }
  .block{
    width: 200px;
  }
</style>

<div class="wrapper">
  <div class="block">块级元素水平居中</div>
</div>
```

- 第二种：

```html
<style>
  .wrapper {
    width: 500px;
  }
  .block {
    width: 200px;
    margin-left: auto;
    margin-right: auto；;
  }
</style>

<div class="wrapper">
  <div class="block">块级元素水平居中</div>
</div>
```

说明：推荐使用第一种方法。

### 使用绝对定位

```html
<style>
  .wrapper{
    position: relative;
  }
  .inline{
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
  }
</style>

<div class="wrapper">
  <span class="inline">绝对定位水平居中</div>
</div>
```

说明：该方法会适用于内联元素与块级元素；`top、bottom、left、right` 等属性是参考父元素而定，而 `translate` 是参考自身而定；值得注意的是，**该方法会使内联元素计算出来的 display 属性为 block**。

### 使用弹性布局

```html
<style>
  .wrapper {
    display: flex;
    justify-content: center;
  }
</style>

<div class="wrapper">
  <span class="inline">内联元素 flex 水平居中</span>
</div>
```

说明：若浏览器支持 flex，则强烈推荐使用 flex 布局，父元素下块级元素与内联元素居中表现均为良好；注意在不改变 flex 的方向 `flex-deriction` 的时候（默认为水平方向），水平居中需设置 `justify-content: center`，当改变 flex 的方向时（`flex-deriction: column`），水平居中需设置 `align-items: center`；垂直居中同理。

## 二、垂直居中

### 内联元素

- 第一种：给父元素 `padding`

```html
<style>
  .wrapper {
    padding: 10px;
  }
  .inline {
    line-height: 30px;
  }
</style>

<div class="wrapper">
  <span class="inline">内联元素垂直居中</span>
</div>
```

- 第二种：给父元素 `height`

```html
<style>
  .wrapper {
    height: 50px;
  }
  .inline {
    line-height: 50px;
  }
</style>

<div class="wrapper">
  <span class="inline">内联元素垂直居中</span>
</div>
```

说明：推荐使用第一种；内联元素的真正占据的高度是由其中文字的 `line-height` 决定，当内联元素的 `line-height` 等于其父元素的 `height` 时，内联元素垂直居中，且其中的文字也是垂直居中的。

### 块级元素

```html
<style>
  .wrapper {
    display: table;
  }
  .block {
    display: table-cell;
    vertical-align: middle;
    height: 50px;
  }
</style>

<div class="wrapper">
  <span class="block">块级元素垂直居中</span>
</div>
```

说明：`table` 定位兼容性良好 (IE8+)；父元素的高度可以利用 `padding` 撑开。

### 使用绝对定位

```html
<style>
  .wrapper {
    position: relative；;
  }
  .inline {
    postion: absolute;
    top: 50%;
    transform: translateY(-50%);
  }
</style>

<div class="wrapper">
  <span class="inline">内联元素垂直居中</span>
</div>
```

说明：同水平居中，绝对定位适用于内联元素与块级元素；会使内联元素的 `display` 计算属性变为 `block`。

### 使用弹性布局

```html
<style>
  .wrapper {
    display: flex;
    align-items: center;
  }
</style>

<div class="wrapper">
  <span class="inline">内联元素垂直居中</span>
</div>
```

说明：同水平居中，在浏览器支持的情况下，推荐使用 flex 布局。

## 三、水平垂直居中

### 使用绝对定位

- 第一种：

```html
<style>
  .wrapper {
    position: relative；;
  }
  .inline {
    postion: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
</style>

<div class="wrapper">
  <span class="inline">内联元素垂直居中</span>
</div>
```

- 第二种：

```html
<style>
  .wrapper {
    position: relative；;
  }
  .inline {
    position: absolute;
    margin: auto;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
  }
</style>

<div class="wrapper">
  <span class="inline">内联元素垂直居中</span>
</div>
```

说明：绝对居中的兼容性良好；第二种方法**需要设置子元素的宽高**，否则会占满父元素。

### 使用弹性布局

```html
<style>
  .wrapper {
    display: flex;
  }
  .inline {
    margin: auto;
  }
</style>

<div class="wrapper">
  <span class="inline">内联元素垂直居中</span>
</div>
```

说明：flex 布局简便快捷，需要注意的是浏览器兼容性。

## 四、两列布局

### 使用 float

1、 一列定宽，一列自适应 (以左列定宽 100px 为例)

```html
<style>
  .left {
    float: left;
    width: 100px;
  }
  .right {
    margin-left: 100px;
  }
</style>

<div class="wrapper">
  <div class="left">左列定宽</div>
  <div class="right">右列自适应</div>
</div>
```

说明：左列脱离标准文档流，右列仍处在标准文档流中，设置 `margin-left: 100px;` 使其举例左边 100px 以免被左列遮挡。

2、 一列不定宽，一列自适应 (以左列不定宽为例)

```html
<style>
  .left {
    float: left;
  }
  .right {
    overflw: hidden;
  }
</style>

<div class="wrapper">
  <div class="left">左列不定宽</div>
  <div class="right">右列自适应</div>
</div>
```

### 使用弹性布局

1、 一列定宽，一列自适应 (以左列定宽 100px 为例)

```html
<style>
  .wrapper {
    display: flex;
  }
  .left {
    width: 100px;
  }
  .right {
    flex-grow: 1;
  }
</style>

<div class="wrapper">
  <div class="left">左列定宽</div>
  <div class="right">右列自适应</div>
</div>
```

2、 一列不定宽，一列自适应 (以左列不定宽为例)

```html
<style>
  .wrapper {
    display: flex;
  }
  .right {
    flex-grow: 1;
  }
</style>

<div class="wrapper">
  <div class="left">左列不定宽</div>
  <div class="right">右列自适应</div>
</div>
```

## 五、三列布局

### 左中定宽，右侧自适应、右中定宽，左侧自适应

说明： 解决方法与两列布局类似

### 两侧定宽，中间自适应

- 双飞翼布局 (假设左侧 120px，右侧 130px)

```html
<style>
  .center-wrapper {
    float: left;
    width: 100%;
  }
  .center {
    margin-left: 120px; // left aside width
    margin-right: 130px; // right aside width
  }
  .left {
    float: left;
    width: 120px;
  }
  .right {
    float: left;
    width: 130px;
  }
</style>

<div class="wrapper">
  <div class="center-wrapper">
    <div class="center">中间列自适应</div>
  </div>
  <div class="left">左列定宽 120px</div>
  <div class="right">右列定宽 130px</div>
</div>
```

说明：需要给父元素及子元素高度。

- 圣杯布局 (假设左侧 120px，右侧 130px)

```html
<style>
  .wrapper {
    position: relative;
  }
  .center {
    margin-left: 120px; // left aside width
    margin-right: 130px; // right aside width
  }
  .left {
    position: absolute;
    top: 0;
    left: 0;
    width: 120px;
  }
  .right {
    position: absolute;
    top: 0;
    right: 0;
    width: 130px;
  }
</style>

<div class="wrapper">
  <div class="left">左列定宽 120px</div>
  <div class="center">中间列自适应</div>
  <div class="right">右列定宽 130px</div>
</div>
```

- 弹性布局

```html
<style>
  .wrapper {
    display: flex；;
  }
  .center {
    flex-grow: 1;
  }
  .left {
    width: 120px;
  }
  .right {
    width: 130px;
  }
</style>

<div class="wrapper">
  <div class="left">左列定宽 120px</div>
  <div class="center">中间列自适应</div>
  <div class="right">右列定宽 130px</div>
</div>
```

以上的各种布局方法基本上囊括了大多数布局场景，可根据实际情况应用。

完。
