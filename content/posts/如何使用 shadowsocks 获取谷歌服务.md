---
title: '如何使用 Shadowsocks 获取谷歌服务'
date: 2018-06-29T17:00:57+08:00
hidden: false
draft: false
tags: ['tutorial']
keywords: ['shadowsocks']
description: '如何使用 Shadowsocks 获取谷歌服务'
slug: 'use-google-by-shadowsocks'
hideSummary: true
---

由于我国网络的特殊限制，很多墙外的优质资源不能够直接访问， GFW（Great FireWall，防火长城）就是互联网上那道巍峨的墙，深受程序员的痛恶。

## IP 黑名单

当你打开浏览器键入 URL 访问网络资源时，域名会被解析为 IP 地址（DNS 解析，一般由网络运营商提供，或者你也可以自己指定 DNS 服务器，例如谷歌的 DNS：8.8.8.8），然后与该 IP 地址的设备进行连接然后传输资源。然而在你访问墙外资源的时候，是要通过 GFW 这道关卡的。如果这个 IP 刚好在 GFW 的 IP 黑名单中，那么就会拒绝你的请求通过，当然也就访问不到相应的资源了。一般来说，网络运营商处的 IP 黑名单比 GFW 的多，除了 GFW 的 IP 黑名单外，运营商也有自己的 IP 黑名单。

## 如何跨越 GFW

为什么使用代理服务器就可以访问到墙外的资源了呢？由于 IP 地址数量庞大，GFW 不可能将所有的 IP 地址全都检查一遍，所以访问量（流量）比较大的 IP 地址 GFW 会额外关注，访问量比较小的可能会成为漏网之鱼，而使用代理服务器转发我们的请求就是利用了这一点。当我们买了一台墙外的 VPS（虚拟主机/服务器），而这个 VPS 没有在 GFW 的 IP 黑名单中（或者说还没有被 GFW 发现），那我们就可以访问到这台 VPS。通过这一步，我们已经跨过了 GFW 这座巍峨的墙，那么剩下的事情就简单多了。

## 在 VPS 上安装

我们通过在 VPS 上安装 shadowsocks，指定监听某个端口的访问（例如 port 1234），当有访问进来的时候，shadowsocks 进行转发，然后将资源返回给我们。

> 虚拟服务器供应商有好多，可自行上网搜索，推荐 [Vultr](https://www.vultr.com/)、[BandwagonHOST](https://bandwagonhost.com/)。如何在 VPS 上安装 shadowsocks 可参考[这篇文章](https://zoomyale.com/2016/vultr_and_ss/)（[备用地址](https://shorturl.at/dhvKT)，需翻墙），推荐搭配 [docker](https://www.docker.com/) 使用。

## 本地安装

主要介绍下 Windows、Linux 系统或者 Mac(Unix) 下本地 shadowsocks 的安装使用。

### Windows

下载 shadowsocks GUI 版本，解压后双击 `shadowsocks.exe` 文件打开客户端进行配置。配置选项中需要填写以下几项，填写完成后的配置信息保存在安装目录下的 `gui-config.json` 文件中：

- Server Addr：服务器 IP 地址（可在代理商处购买代理服务）
- Server Port：服务器上的代理端口（所有从这个端口进来的请求全部转发）
- Password：密码
- Encryption：加密方式（默认为 `aes-256-cfb`，不需要更改）
- Proxy Port：本地代理端口（默认为 `1080`，可自行修改为其他端口）

可参考 Windows 环境下的配置截图：

![Windows config](https://i.loli.net/2017/11/04/59fd9e1b2cc3d.png)

设置完成后，在任务栏小飞机右键选择`启用系统代理`即可。

> Shadowsocks v4.0.6 下载地址：[百度云盘](http://pan.baidu.com/s/1i5f8sa5)（密码 `7zns`）或 [Github](https://github.com/shadowsocks/shadowsocks-windows/releases/download/4.0.6/Shadowsocks-4.0.6.zip)

### Linux

该系统下推荐使用命令行版本，打开终端，键入以下命令：

```sh
sudo apt-get update
sudo apt-get install python-pip
sudo pip install shadowsocks
```

执行成功后，编辑 `/etc/shadowsocks/config.json` 文件，可参考 Linux 下的配置截图：

```bash
sudo vim /etc/shadowsocks/config.json
```

![Linux config](https://i.loli.net/2017/11/04/59fda605f346d.jpg)

配置完成后，键入以下命令可在后台运行 shadowsocks，运行成功截图：

```bash
sudo sslocal -c /etc/shadowsocks/config.json -d start
```

![Succeeded](https://i.loli.net/2017/11/04/59fdb0a5ca920.jpg)

命令太长不好记，可以在 `~/.bashrc` 或 `~/.zshrc` 中添加 alias：

```sh
# alias it in .zshrc for example
echo '\n#alias for running shaodowsocks in the background' >> ~/.zshrc
echo '\nalias runss="sudo sslocal -c /etc/shadowsocks/config.json -d start"' >> ~/.zshrc
source ~/.zshrc
```

`runss` 即为命令快捷键，可自行设置，执行 `runss` 即可后台开启代理服务。

### Mac

下载 [ShadowsocksX-2.6.3.dmg](https://jaist.dl.sourceforge.net/project/shadowsocksgui/dist/ShadowsocksX-2.6.3.dmg)，安装完成后进行配置，可参考上文的 Windows、Linux 系统下的方法进行。

## 代理管理设置

[SwitchyOmega](https://www.switchyomega.com/) 是 Chrome & Firefox 浏览器上的一个代理扩展程序，可以轻松快捷地管理和切换多个代理设置。以 Chrome 为例，下载完成后，在 Chrome 地址栏键入 `chrome://extensions` 进入扩展管理面板，将对应文件拖入进行安装。

安装完成后，需要对插件进行配置，可参考该配置截图：

![SwitchyOmega config](https://i.loli.net/2017/11/04/59fdcd8c2cd99.png)

配置完成后选择代理方式为 `auto switch` 即可，这样访问国内的网站时就不会通过代理去访问。

Firefox 浏览器安装配置同理，参考 Chrome 即可。之后访问墙外的资源时，将其添加进 proxy 名单即可访问。

完。
