---
title: 'Git 学习笔记（一）'
date: 2019-05-08T17:01:07+08:00
hidden: false
draft: false
tags: ['git']
keywords: ['git']
description: 'Learn git'
slug: 'git-note-1'
hideSummary: true
---

- git 查看文件改动状态使用 git status
- git 查看改动的内容使用 git diff
- git 查看提交记录使用 git log 命令
- HEAD 指针表示的是当前版本，上一个版本为 HEAD^，再往上就是 HEAD^^，往上一百个版本可以写作 HEAD~100
- git 回退至上个版本使用 git reset --hard HEAD^，若回退至指定版本，先使用 git log 查看版本的 hash，然后使用 git reset --hard <hash_version>
- 如果回退版本后又想回到最新的版本，在不知道最新版本 hash 的情况下，使用 git reflog 查看所有 commit 的 hash，然后使用 git reset --hard <hash_version> 进行回退或者前进
- git VCS 分为工作区和版本库（暂存区与分支），git add 命令将改动添加进入暂存区，git commit 将改动添加到分支
- 工作区的文件发生了改动，想要撤销修改，可以使用 git checkout -- <file_name> 来撤销掉修改，注意必须要加 -- 符号（-- 与文件名之间有空格），否则 git 会认为是要切换分支
- 如果文件发生了改动并且已经添加到暂存区，想撤销掉暂存区的改动，使用 git reset HEAD <file_name> 命令，这样就把修改了的文件又放回工作区了，暂存区是干净的，放置到工作区后，再使用 git checkout -- <file_name> 将放置在工作区的文件改动撤销掉，这样两步操作就将文件的改动彻底还原了
- 查看工作区与版本库文件的差异可以使用 git diff HEAD -- <file_name>（同样，-- 与文件名之间有空格）
- 如果工作区的文件被误删除，想要恢复可以使用 git checkout -- <file_name>，git checkout 其实是用版本库里的版本替换工作区的版本操作，无论是工作区的修改还是删除，都可以用该命令一键还原
- 本地分支首次推向远程分支的时候可以使用 git push -u origin <branch_name>，其中 -u 参数是 --set-upstream 的简写
- 切换分支使用 git checkout <branch_name>，创建并切换新分支时需要加上 -b 参数，创建新分支使用 git branch <branch_name>，查看分支 git branch
- 合并分支使用 git merge <branch_name>，删除使用 git branch -d <branch_name>
- git merge 合并分支产生冲突时，先解决冲突，再添加至暂存区，然后提交。解决冲突时，<<<<< HEAD 到 ===== 部分是当前分支的内容，>>>>> 到 ===== 部分是需要并入的分支的内容，确定好要保留好的内容后保存并退出，然后提交。提交成功后，使用 git log --graph 可查看分支合并图
- 如果合并分支时产生冲突，想要还原回原来的状态，可以适用 git merge --abort 命令
- git 可以将工作区暂时的改动“存储”起来，当你不想将改动提交至暂存区时。使用 git stash 命令即可。当你想将“存储”的内容释放出来时，先使用 git stash list 查看，然后进行恢复。恢复命令有两条，使用 git stash apply <shash@{index}> （这个括号里面的内容是可选的，可以指定恢复第几个 stash 的内容，在多次 stash 时使用)，可以将存储的内容恢复至工作区，但是存储的内容并不会删除，需要删除可以使用 git stash drop <shash@{index}> 命令；另一种方式是使用 git stash pop <shash@{index}> 命令，该条命令会在恢复之后同时删除 stash 区域的内容
- 查看远程仓库的信息使用 git remote -v
- 本地分支与远程分支进行关联使用 git branch -u <branch_name> origin/<branch_name>
- 创建标签使用 git tag -a <tag_name> -m <tag_description> <commit_hash>，查看一个标签的内容可以使用 git show <tag_name>
- 推送标签可以使用 git push origin <tag_name>，一次性推送可以使用 git push origun --tags 命令，删除本地标签可以使用 git tag -d <tag_name>，删除远程标签使用 git push origin :refs/tags/<tag_name>

完。
