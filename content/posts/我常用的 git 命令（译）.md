---
title: '我常用的 Git 命令（译）'
date: 2018-07-24T18:04:02+08:00
hidden: false
draft: false
tags: ['git']
keywords: ['git']
description: '我常用的 Git 命令（译）'
---

本文是对 [Medium](https://medium.com) 上一篇国外开发者写的博客的翻译，原文地址请点击：[A Dev’s Thoughts: My Most Used Git Commands | Medium](https://medium.com/@steffen.pedersen/a-devs-thoughts-my-most-used-git-commands-6f7f9fe41f33?token=r-dMLF3Roe3B15H8)。

> This is not a full guide to which commands you should learn. I just find it inspiring to read about other developers’ habits and work routines.
> This I would like to contribute to and tell about my most used Git commands.

这不是一篇关于你应该学习的 Git 指令的完整指南。我觉得多了解其他开发者的习惯以及工作惯例是很赞 👍 的，这才是我想要分享关于我常用的 Git 指令的原因。

> I honestly don’t have a specific way on typing these commands. I sometimes write the full command. I sometimes replace git with `g`. And then I sometimes write the full alias. I think it depends on the goal with the command. It is worth mentioning that I am using ZSH with [oh-my-zsh](https://ohmyz.sh/).

很坦诚的说，我用这些命令的时候没有特定的方式，有时候我喜欢使用完整的命令，有时我又会使用这些命令的别名（alias），比如我会用 `g` 来代替 `git`，我觉得这取决于使用这些命令的目的。值得一提的是，我使用的是 [ZSH](https://ohmyz.sh/)（代替系统自带的 bash）。

## 主要命令

> These are the commands that I use every day - or almost every day.
>
> ```sh
> git add --all
> git commit -m “Add this commit”
> git push
> ```

> If you have heard about Git, then you will probably know these three classic commands. I use them pretty much all the time.
> It is here that it will be nice to use some aliases. gaa, gcmsg “Add this commit” and gp will come in handy!

这几个命令是我几乎每天都会用到的，如果你听说过 Git，那么你很可能知道上面的这三个经典命令，我几乎一直在使用它们。 如果你使用这些命令的别名那就很 nice 了，
那么这三个命令的别名就会派上用场：`gaa`、`gcmsg "Add this commit"`、`gp`（分别是上面三个经典命令的别名）。

> ```sh
>   git checkout develop
>   git checkout -b my-new-branch
> ```
>
> These will switch to an existing branch or a new branch. There is not much new going on here. I often use the full aliases here too - gcd and gcb “my-new-branch“.

这几个命令我经常用来切换到一个新的分支或者已经存在的分支，相信大家都很熟悉了。我经常使用的是这两个命令别名：`gcd` 以及 `gcb "my-new-branch"`：

> ```sh
> git pull --rebase
> ```
>
> I always use the option `--rebase` when I pull from a repository. This will keep my commits nice and clean on the top of the tree. You could use the alias `gup`. It was a senior developer who taught me the power of rebase.

当我从一个仓库拉取分支的时候我经常会加上 `--rebase` 参数， 这样将会使我的 commit 信息保持整洁，你也可以使用命令别名 `gup`，
是一个中级开发者教会了我关于 `rebase` 的用法。

> ```sh
>   git rebase <branch>
> ```
>
> This will lead us to rebase itself. Remember to rebase! This is especially important if you are doing feature branches. We do not want a half-dead branch, which is a billion commits behind its default branch with merge conflicts up to the throat. Ouch!

这条命令将会对当前分支进行 rebase。当你在开发一个 feature 分支时，一定要记得 rebase，这一点是非常重要的。我们不想开发一个半成品分支，
当这个分支节点落后于它的 base 分支节点时（落后了大量的 commit 信息），你试图对这个分支进行合并，结果发现在关键节点上有大量的代码冲突，
这是很令人抓狂的。

> ```sh
> git merge <branch>
> ```
>
> It is not that often that I need to merge directly from my terminal. In my team at work we use a branching strategy with feature branches. When a branch should be merged into the default branch (or another), then we use a pull request from GitHub — and the GUI at the website is just fine.

直接从终端中直接进行分支的合并，我不经常这样做。 我的团队工作时使用的是 feature 分支的方式。当一个分支开发完成，应该合并至 base 分支或者其他分支时，
我会在 GitHub 中发起一个 pull request，GitHub 的 GUI 界面很好用。

> ```sh
>   git stash
>   git stash pop
>   git stash apply stash@{1}
> ```
>
> Has your project manager given you a new task, which need to be done quickly? Just throw your current work to the side and focus on the new stuff. It is awesome! I actually don’t use the full alias for this. I am using `g` instead of `git`. Maybe it is because I want to be absolutely sure, that I am actually stashing 😀

你有没有这样的经历，你正在开发一个分支，但是你的项目经理有一个很紧急的任务要你做。你手头开发了一半的工作不能够作为一次完整的提交，
那么使用这几条命令，就可以把手头的工作扔在一边，集中精力去完成这个临时性的紧急任务。这是相当给力的，事实上我没有使用过这几条命令的别名，
可能是我想确保我已经把手头没有开发完的工作放入了 stash 中吧 😀。

> ```sh
> git status -s
> git log
> ```
>
> These are the commands that keeps me updated, and I use them about 500 times a day. I use gss, glg or sometimes glol.

这几条命令能够让我当前的工作目录树时刻保持最新状态，我每天大概要使用这些命令 500 次。我使用 `gss`、`glg` 或者 `glol` 命令别名。

## 其他命令

> These are the commands that I use occasionally.

这些命令是我偶尔使用的。

> ```sh
>   git push --force-with-lease
> ```
>
> This is one of my strange darlings. But why don’t I just use `--force`? First of all, it is an extremely dangerous command and a huge no-no when using shared branches. It is because it will overwrite the remote repository with whatever you have locally. This can be dangerous if other contributors of the repository have pushed in the meantime. I have mostly used `--force-with-lease` after a rebase. This is because it works like a safety belt. This article has a great example.

这条命令很奇怪，但是是我最喜欢用的（陌生的宠儿，不知道这句话什么意思，大概猜测）。但是我为什么不使用 `--force` 呢？首先，这条命令是非常危险的，
同时当你和他人一起开发同一个分支时，千万不要这样做（a huge no-no，巨大的禁忌）。因此这会使用你本地的修改将远程分支覆盖掉，
当其他开发者同时也在推送改动时，这是十分危险的操作。我经常是在 rebase 之后再使用 `--force-with-lease` 指令，因为这条指令的作用就像是一个安全带。
这篇文章有一个非常好的例子。

> ```sh
> git for-each-ref — sort=-committerdate refs/heads/
> ```
>
> This is actually a command, that I found a few days ago from David Walsh. The command will list the most recently worked on branches from top to bottom. It is so cool!

这也是一条指令，前几天我从 David Walsh 那儿发现的。这条命令会从上至下列出分支上的最近的工作记录，it's very cool!

> ```sh
>   git reset --hard
> ```
>
> And if everything goes like 💩, you can always reset the project. Thank you for your time! If you liked this, then please 👏 and follow.

如果事情已经发展的如同 💩 一样无法挽回，你通常可能会重置你的项目。

完。
