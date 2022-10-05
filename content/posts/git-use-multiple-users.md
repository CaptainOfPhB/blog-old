---
title: "Git Use Multiple Users"
date: 2022-10-05T14:38:45+08:00
hidden: false
draft: false
tags: ['git']
keywords: ['git']
description: "Use `[includeIf]` to auto toggle different user in git"
slug: "git-use-multiple-users"
summary: "Use `[includeIf]` to auto toggle different user in git ..."
---

In some cases, we work between our personal projects and work projects, so we need to use different user across multiple projects. As we all known, git provides a way to set up user individually in the `.git/config` file in the project root dir. But actually, I always forget to set up the user in the new project before I commit my changes. This annoyed me for a long time.

So I found a way to auto toggle the user in git. We can use the `[includeIf]` to include different config files in the `~/.gitconfig` file. This is a feature named "[conditional includes](https://git-scm.com/docs/git-config#_conditional_includes)" in git.

The following is my `~/.gitconfig` file:

```ini
[user]
[includeIf "gitdir:~/Work/"]
    path = ~/.gitconfig.work
[includeIf "gitdir:~/Personal/"]
    path = ~/.gitconfig.personal
```

And the following is my `~/.gitconfig.work` file:

```ini
[user]
    name = work
    email = work@company.com
```

And the following is my `~/.gitconfig.personal` file:

```ini
[user]
    name = personal
    email = personal@me.com
```

The `[includeIf]` will include the config file in the `path` if the `gitdir` matches the current project root dir. In the `~/Work` dir my commit user will be `work`, and in the `~/Personal` dir my commit user will be `personal`. So we can use different user in different projects. But remember remove the `[user]` section in the `.git/config` file in the project root dir, because it have higher priority.

It's very useful for me. Hope it can help you too.
