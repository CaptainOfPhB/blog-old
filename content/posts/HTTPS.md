---
title: 'HTTPS'
date: 2018-06-02T15:35:38+08:00
hidden: false
draft: false
tags: ['HTTPS']
keywords: ['HTTPS']
description: 'HTTPS'
slug: 'https'
---

HTTPS：HTTP（Hyper Text Tranfer Protocal）+ SSL（Secure Sockets Layer）/ TLS（Transport Layer Security）.

SSL 提高了互联网的连接安全，对两个系统之间发送的敏感数据提供了有效保护，它使用加密算法对传输的数据进行加密，防止第三方进行劫持和篡改。这两个系统可以是 server 与 client ，也可以是 server 与 server。

TLS 只是更新的、更安全的 SSL 版本，我们仍可以将我们的安全证书称为 SSL，因为它是一个更常用的术语。

SSL 证书安装在服务器端，但是在浏览器上有可视警告。如果该网站安装了 SSL 证书，浏览器的地址栏将显示 `https：//` 而不是 `http://`，根据证书颁发给企业的验证级别，地址栏前面通常会挂有绿锁来指示安全连接。

> Reference: [What is SSL TLS HTTPS?](https://www.websecurity.symantec.com/security-topics/what-is-ssl-tls-https)

## SSL/TLS 如何实现加密？

加密分为`对称加密`与`非对称加密（RSA)`。对称加密使用`同一个密钥`进行加密与解密，而非对称加密使用`公钥`或`私钥`进行加密与解密。

若使用对称加密，则对称密钥加密的内容可以使用对称密钥解开。而`使用非对称加密时，公钥加密的内容，只有私钥能解开，反之，私钥加密的内容，只有公钥能解开`。

## 对称加密 vs 非对称加密

如果 server 与 client 使用对称加密进行数据的传输，那么在 server 对单个 client 时貌似没有问题，但是当 server 对 多个 client 时呢？如果一旦第三方劫持到了 client 发送给 server 的数据并破解得到了密钥，那么也就意味着同时破解了其他 client 发送个 server 的数据，这样是极其不安全的。

如若将对称加密与非对称加密结合起来，取长补短，就能够有效的解决上述问题。由于非对称加密的特性，通常情况下：

- server 会保留`私钥`，公钥会发送给 client 。
- client 接收到公钥后，在`本地生成一对对称密钥`。
- client 通过`公钥将该对称密钥进行加密`，再发送给 server 。
- server 使用`私钥解密 client 通过公钥加密后的内容`，得到对称密钥。
- 之后 server 与 client `使用该对称密钥进行数据的传输`。

就算第三方劫持到 client 发送给 server 发送的数据（`通过公钥加密的对称密钥`）后，也无法进行破解（`需要私钥才能破解`）。

## 公钥如何保证？

但是如何保证 server 发送给 client 的公钥确实是未经第三方劫持篡改的公钥呢？

答案是使用`数字证书`。server 提供`网站信息（包含公钥）`去认证机构进行认证，认证机构根据提供的网站信息经加密（MD5）生成数字签名，利用`网站信息+数字签名`组成数字证书（`该数字证书经认证机构的私钥加密`）后，将该数字证书颁发给 server。

那么 server 在向 client 发送公钥时，将不再直接发送公钥，而是发送数字证书（包含公钥），向 client 证明自己的身份：

- client 本地具有认证机构的公钥（浏览器内置）。
- client 接收到 server 发送过来的数字证书后，使用认证机构的公钥进行解密，得到其中的`网站信息与数字签名`。
- client 对`网站信息`进行 MD5 计算得出`本地的数字签名（其实就是 MD5 值）`，再`与数字证书中的数字签名进行比对`。
- 若两者的 MD5 值相同，说明该`网站信息`是未经劫持与篡改的，其中的公钥是可信的。

## 总结

就这样，使用`对称加密+非对称加密+数字证书`三者结合的方式，保证了 server 与 client 之间数据传输的准确性，敏感、私有数据得到了有效的保护。

完。
