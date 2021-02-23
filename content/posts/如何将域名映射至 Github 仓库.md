---
title: '如何将域名映射至 Github 仓库'
date: 2018-06-29T16:49:00+08:00
hidden: false
draft: false
tags: ['domain', 'github']
keywords: ['domain', 'github']
description: '如何将域名映射至 Github 仓库'
---

借助博客框架（Jekyll、Hexo、Hugo、Gatsby 等）构建并部署好自己的博客后，可以选择托管至 GitHub。进入博客所在仓库，在 `Settings -> GitHub Pages` 界面将 `Source` 设置为 `master branch` （或者其他分支）后，点击 `Save` 可生成博客的在线预览链接。

博客的预览地址一般为 `https://<your_user_name>.github.io/`形式（`<your_user_name>` 为你的 GitHub 用户名），链接中的 `github.io` 很是不美观，我们可以在域名服务商处购买一个自己喜欢的域名，然后将其映射至博客线上预览地址。

## 购买域名

域名交易网站很多，国内的有 [万网](https://wanwang.aliyun.com/)（已被阿里收购）、[新网](http://www.xinnet.com/) 等，
国外的有 [NameSilo](https://www.namesilo.com/)、[Godaddy](https://sg.godaddy.com/)、[DNSPod](https://www.dnspod.cn/)。一般来说，一级域名和顶级域名都不是很热门的话，第一年的价格是非常便宜的。在国内域名交易网站购买域名后，如果是作为盈利网站的主力域名、访问量较大的话，建议对网站进行实名认证以及工信部备案，若不进行备案，一旦被相关部门查出，网站可能会被屏蔽掉（通过国内 DNS 不再解析你的服务器的 IP 地址，取消域名与 IP 地址的关联）。

## 添加域名解析

购买完成之后，进入[阿里云](https://netcn.console.aliyun.com/core/domain/tclist) ，按照引导添加域名解析。

### 记录类型

- A 记录：将域名指向一个 IPv4 地址（例如：10.10.10.10）
- CNAME：将域名指向另一个域名（例如 www.aliyun.com）
- MX：将域名指向邮件服务器地址
- TXT：可任意填写，长度限制 255，通常做 SPF 记录（反垃圾邮件）
- NS：域名服务器记录，将子域名指定其他 DNS 服务器解析
- AAAA：将域名指向一个 IPv6 地址（例如：ff06:0:0:0:0:0:0:c3）
- SRV：记录提供特定服务的服务器（例如 example-server.tcp）
- 显性 URL：将域名指向一个 http(s)协议地址，访问域名则自动跳转至目标地址
- 隐性 URL：与显性 URL 类似，但隐性转发会隐藏真实的目标地址

### 主机记录（域名前缀）

- www：解析后的域名为 www.aliyun.com
- @：直接解析主域名 aliyun.com
- \*：泛解析，匹配其他所有域名 \*.aliyun.com
- mail：将域名解析为 mail.aliyun.com，通常用于解析邮箱服务器
- 二级域名：如：abc.aliyun.com，填写 abc
- 手机网站：如：m.aliyun.com，填写 m
- 显性 URL：不支持泛解析（泛解析：将所有子域名解析到同一地址）

其中需要我们填写的是 `记录类型`、`主机记录`、`记录值` 三项。

添加第一条解析：`记录类型` 选为 `CNAME`，`主机记录` 选为 `@`；`记录值` 填入博客域名，假如博客预览地址为 `https://<user_name>.github.io/`，则 `记录值` 填入 `<user_name>.github.io.`，注意 `io` 后面要加上 `.` 符号，其余选项默认不用选。这条解析可使我们购买的域名指向我们的博客域名。

添加第二条解析：`记录类型` 选为 `A`，`主机记录` 选为 `www`，`记录值` 选为博客的 `IP` 地址，同样，其余选项默认不用选。这条解析可使别人在浏览器键入我们的域名时，无论加不加 `www` 前缀都可以正常访问。

> Tips: 如何获取博客 IP 地址？打开终端，ping 博客地址 `ping https://{username}.github.io/`，ping 出来的就是你的博客 IP 地址

### 等待

完成以上步骤之后，需要在博客仓库的根目录下新建名为 `CNAME` 的文件，编辑 `CNAME` 文件，写入你购买的域名，若你购买的域名为 `mydomain.com`，
则将 `mydomain.com` 写入，注意不要加 `http://` 或者 `https://` 等，末尾不用加根目录 `/` 。

等半个小时左右（运营商更新域名缓存），在浏览器键入你的域名即可以访问到你的博客。

完。
