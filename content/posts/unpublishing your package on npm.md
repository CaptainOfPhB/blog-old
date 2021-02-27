---
title: "Unpublishing your package on npm"
date: 2021-01-25T16:09:06+08:00
hidden: false
draft: false
tags: ['npm']
keywords: ['npm']
description: "Unpublishing your package on npm"
slug: "unpublishing-your-package-on-npm"
---

If your package is published on npm, for some reason, you want to unpublish a single version or the entire package, you can follow the steps below:

### Unpublishing a single version of a package

To unpublish a single version of a package, run the following command, replacing  with the name of your package, and  with your version number:

```sh
npm unpublish <package_name>@<specific_version_name>
```

### Unpublishing the entire package

To unpublish an entire package, run the following command, replacing  with the name of your package:

```sh
npm unpublish <package_name> -f
```

If you have two-factor authentication enabled for writes, you will need to add a one-time password to the unpublish command, --otp=123456 (where 123456 is the code from your authenticator app, [Google Authenticator](https://apps.apple.com/us/app/google-authenticator/id388497605) is for example).

> 1. Reference: [unpublishing-packages-from-the-registry](https://docs.npmjs.com/unpublishing-packages-from-the-registry)
> 2. use [Google Translate](https://translate.google.com/) to correct some of my english grammer error
