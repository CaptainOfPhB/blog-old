---
title: "GitHub Pages 如此愚蠢？"
date: 2021-06-02T13:56:28+08:00
hidden: false
draft: false
tags: ["GitHub"]
keywords: ["GitHub Pages"]
description: "GitHub Pages"
slug: "github-page"
---

今天调整了博客的一些样式之后，push 到 GitHub 和 Gitee 没有成功。原因是之前使用的 `git subtree` 模式，将 `master` 分支的 `public` 文件夹内容作为 deploy 分支。想了一下这种模式有些麻烦，而且办公室电脑和自己的电脑总是在 push 时会出问题，因此不打算用 `subtree` 的方式了。

看了下 GitHub Pages 提供了分支选项和部署文件夹选项（仅支持 `/docs` 文件夹），Gitee 也同样支持该功能，因此如果把 Hugo 的 `publishDir` 改为 `docs` 的话，这样选择 master 分支，部署 `docs` 目录，那么应该是可行的。

![github](https://pic3.zhimg.com/v2-d87504a226b7446762e2bd901e73b29a_b.png)

理论存在，实践开始。我删掉了之前的 `public` 目录，然后在 `config.toml` 中把 Hugo 的 `publishDir` 改为了 `docs`。一顿操作后等待部署完成，开心的打开了我的博客网址，我 tm 惊呆了，因为显示的不是首页而是仓库的 `README.md` 文件。

百思不得其解。按理说，`docs` 文件夹作为一个网站去部署完全没有问题，因为有 `index.html` 文件。思前想后，搜了一堆网上同样的提问，最后在一个犄角旮旯处看到了外国一个哥们写的评论：

![comment](https://pic3.zhimg.com/v2-a7d78856ffa0d8c2dd48723b2ae77a22_b.png)

抱着将信将疑的态度，我在仓库下面新建了一个 `.nojekyll` 文件然后提交，强刷了几次博客网站后恢复了正常，显示为我的博客首页。

凸(艹皿艹)

这算是 GitHub Pages 隐藏的彩蛋吗？Damn it！搜了下 "GitHub Pages nojekyll" 发现了下面这篇 GitHub blog：

[Bypassing Jekyll on GitHub Pages | The GitHub Blog](https://github.blog/2009-12-29-bypassing-jekyll-on-github-pages/)

你可以点击右边的链接访问我的博客：[daijiangtao.name](https://daijiangtao.name) 或 [daijiangtao.gitee.io](https://daijiangtao.gitee.io)（镜像）。

完。
