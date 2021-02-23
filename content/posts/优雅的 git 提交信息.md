---
title: '优雅的 Git 提交信息'
date: 2018-06-27T16:05:17+08:00
hidden: false
draft: false
tags: ['git']
keywords: ['git']
description: 'git commit message'
---

Commit change 是开发的日常操作，写好 log 不仅有助于他人 review, 还可以有效的输出 change log, 对项目的管理实际至关重要。如何写好每一个 commit message 呢？

> 这种东西，当然要借助工具了，才能够写得即规范，又格式化，还能够支持后续分析。
> 目前比较建议的是，使用终端工具 [commitizen/cz-cli](https://github.com/commitizen/cz-cli) + [commitizen/cz-conventional-changelog](https://github.com/commitizen/cz-conventional-changelog) + [conventional-changelog/standard-version](https://github.com/conventional-changelog/standard-version) 一步解决提交信息和版本发布。甚至，如果想更狠一点，在持续集成里面加入 [marionebl/commitlint](https://github.com/marionebl/commitlint) 检查 commit 信息是否符合规范，也不是不可以。

## Commit Message Format

目前规范使用较多的是 Angular 团队的规范，继而衍生了 [Conventional Commits specification](https://conventionalcommits.org/)。很多工具也是基于此规范, 下文摘自 [Angular 开发者文档](https://github.com/angular/angular.js/blob/master/DEVELOPERS.md#-git-commit-guidelines)。

> We have very precise rules over how our git commit messages can be formatted. This leads to more readable messages that are easy to follow when looking through the project history. But also, we use the git commit messages to generate the AngularJS change log.

我们对 commit message 格式有一个非常明确的约束，这样做将使得在浏览项目历史时 commit message 会非常易读，此外，我们也利用 commit message 来生成 AngularJS 的 change log。

> The commit message formatting can be added using a typical git workflow or through the use of a CLI wizard (Commitizen). To use the wizard, run yarn run commit in your terminal after staging your changes in git.

commit message 格式可以在经典的 git 工作流中使用，也可以配合一个客户端向导 (Commitizen) 来使用。

> Each commit message consists of a header, a body and a footer. The header has a special format that includes a type, a scope and a subject:

```txt
<type>(<scope>): <subject>
<BLANK LINE>
<body>
<BLANK LINE>
<footer>
```

每一个 commit message 包括头部、主题以及注脚，头部的格式比较特殊，其包含类型、范围以及主题分类。

> The header is mandatory and the scope of the header is optional.

header 部分是强制必须的，但是其范围可写可不写，是可选的。

> Any line of the commit message cannot be longer 100 characters! This allows the message to be easier to read on GitHub as well as in various git tools.

任意一行 commit message 不能超过 100 个字符，这样就使得 commit message 在 GitHub 或其他的 Git 工具上变得易读。

> If the commit reverts a previous commit, it should begin with revert:, followed by the header of the reverted commit. In the body it should say: This reverts commit <hash>., where the hash is the SHA of the commit being reverted. A commit with this format is automatically created by the git revert command.

如果某个 commit 恢复了之前的 commit，那么 commit message 应该以 `revert:` 开头，同时在 body 部分应该写明：恢复了 hash 为 xxx 的提交。
git 恢复命令会自动创建这个格式的 commit message。

> Type must be one of the following:
>
> - feat: A new feature
> - fix: A bug fix
> - docs: Documentation only changes
> - style: Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)
> - refactor: A code change that neither fixes a bug nor adds a feature
> - perf: A code change that improves performance
> - test: Adding missing or correcting existing tests
> - chore: Changes to the build process or auxiliary tools and libraries such as documentation generation

type 部分格式参考如下：

- feat: 新的特性
- fix: 修复了一个 bug
- docs: 更改了文档说明
- style: 代码风格修改，并没有影响代码的含义（空格、格式化、分号等）
- refactor: 代码更改，没有修复 bug 也没有添加新的特性
- perf: 代码更改，提升了整体表现（性能、或者运行时间更快等）
- test: 添加了测试或者修改了已有的测试
- chore: 修改了构建流程或者依赖等

> The scope could be anything specifying place of the commit change. For example $location, $browser, $compile, $rootScope, ngHref, ngClick, ngView, etc, You can use \* when the change affects more than a single scope.

scope 可以是指明 commit 更改范围的任何内容，例如 $location、$browser、$compile、$rootScope 等，你也可以使用 `*` 符号来表明改动影响的不仅仅是单个范围。

> The subject contains succinct description of the change:
>
> 1.  use the imperative, present tense: "change" not "changed" nor "changes"
> 2.  don't capitalize first letter
> 3.  no dot (.) at the end

subject 部分是针对改动的简要描述，需要注意的是：

1. 使用祈使句、现在时语态：使用 change 而不是 changed 或 changes
2. 首字母不要大写
3. 末尾不要加 `.` 符号

> Just as in the subject, use the imperative, present tense: "change" not "changed" nor "changes".
> The body should include the motivation for the change and contrast this with previous behavior.

参照 subject 的规范（使用祈使句、现在时语态：change 而不是 changed 或 changes），body 部分也应该以做了什么改动为核心，写明与改动前的差异。

> The footer should contain any information about Breaking Changes and is also the place to reference GitHub issues that this commit closes. Breaking Changes should start with the word BREAKING CHANGE: with a space or two newlines. The rest of the commit message is then used for this.

footer 部分应该包含重大的改动的信息，同时也可以表明这次的 commit 解决了 GitHub 上的什么问题（引用 issues 的链接）。重大的改动应该以 `BREAKING CHANGE:` 开头，
同时前面留一行或者两行，其他的 commit message 将会用到这些留行。

更加详细的解释可以参考 [AngularJS Git Commit Message Conventions](https://docs.google.com/document/d/1QrDFcIiPjSLDn3EL15IJygNPiHORgU1_OOAqWjiDU5Y/edit#)。

## Command Line Tool

### Use git commit template

如果在个人的项目中， 想尝试一下这样的规范格式, 那么你可以为 git 设置 commit template, 每次 git commit 的时候在命令行中提示，修改 `~/.gitconfig`, 添加:

```
[commit]
  template = ~/.gitmessage
```

之后新建 `.gitmessage` 文件，内容如下：

```
# head: <type>(<scope>): <subject>
# - type: feat, fix, docs, style, refactor, test, chore
# - scope: can be empty (eg. if the change is a global or difficult to assign to a single component)
# - subject: start with verb (such as 'change'), 50-character line
#
# body: 72-character wrapped. This should answer:
# * Why was this change necessary?
# * How does it address the problem?
# * Are there any side effects?
#
# footer:
# - Include a link to the ticket, if any.
# - BREAKING CHANGE
#
```

### Use Commitizen

除此之外，我们可以使用更加便捷的命令行工具：[commitizen/cz-cli](https://github.com/commitizen/cz-cli), 我们需要借助它提供的 `git cz` 命令替代我们的 `git commit` 命令, 帮助我们生成符合规范的 commit message。

除此之外, 我们还需要为 commitizen 指定一个 Adapter 比如: [cz-conventional-changelog](https://github.com/commitizen/cz-conventional-changelog)（一个符合 Angular 团队规范的 preset）使得 commitizen 按照我们指定的规范帮助我们生成 commit message。

#### Global installation

全局模式下, 需要 `~/.czrc` 配置文件, 为 commitizen 指定 Adapter，全局使用时运行 `git cz` 即可。

```sh
npm install -g commitizen
npm install -g cz-conventional-changelog
touch ~/.czrc
echo '{ "path": "cz-conventional-changelog" }' > ~/.czrc
```

#### Local installation

本地安装，使用时运行 `npm run commit` 即可。

```sh
npm install -g commitizen -D
npm install -g cz-conventional-changelog -D
```

在 `package.json` 中进行配置：

```json
"script": {
  "commit": "git-cz",
},
"config": {
  "commitizen": {
    "path": "node_modules/cz-conventional-changelog"
  }
}
```

#### Custom Adapter

也许 Angular 的那套规范我们不习惯, 那么可以通过指定 Adapter ([cz-customizable](https://github.com/leonardoanalista/cz-customizable)) 编写一套符合自己团队的规范。

```sh
# global installation
npm i -g cz-customizable
# loacl installation
npm i -D cz-customizable
```

根据安装方式不同在 `~` 目录下或者项目根目录下创建 `.cz-config.js` 文件，然后修改 `.czrc` 以及 `package.json` 即可：

```json
// ~/.czrc
{ "path": "cz-customizable" }
// package.json
"config": {
  "commitizen": {
    "path": "node_modules/cz-customizable"
  }
}
```

`.cz-config.js` 文件的修改可以参照 [leohxj/.cz-config.js](https://gist.github.com/leohxj/7bc928f60bfa46a3856ddf7c0f91ab98)或[官方文档](https://github.com/leonardoanalista/cz-customizable#options)。

### Validate Commit Message

[commitlint](https://github.com/marionebl/commitlint) 可以帮助我们校验 commit message, 如果我们提交的不符合规范, 直接拒绝提交。
同样的, 它也需要一份校验的配置, 这里推荐 [@commitlint/config-conventional](https://github.com/marionebl/commitlint/tree/master/@commitlint/config-conventional)（符合 Angular 团队规范）。

```sh
npm i -D @commitlint/config-conventional @commitlint/cli
```

同时需要在项目目录下创建配置文件 `.commitlintrc.js`, 写入:

```js
module.exports = {
  extends: [
    ''@commitlint/config-conventional''
  ],
  rules: {
  }
};
```

### Validate Custom Adapter

如果你使用的是自定义的 commitizen adapter, 那么你需要:

```sh
$ npm i -D commitlint-config-cz @commitlint/cli
```

同时在 `.commitlintrc.js` 中写入:

```js
module.exports = {
  extends: ['cz'],
  rules: {}
};
```

> 扩展:
>
> 1. 结合 [Husky](https://github.com/typicode/husky) 校验 commit message
> 2. 利用符合语义化的 commit message 生成 CHANGELOG，借助 [standard-version](https://github.com/conventional-changelog/standard-version)

> 参考：[优雅的提交你的 commit message](https://zhuanlan.zhihu.com/p/34223150)

完。
