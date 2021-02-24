# 沉梦昂志

This is my blog source repository, build with Hugo, which is an awesome static website generator.

## Preview

[daijiangtao.name](http://daijiangtao.name)

## Usage

### Add a new blog

```bash
hugo new posts/<blog_name>.md
```

### Preview locally

```bash
hugo server
```

### Deploy

Drafts do not get deployed, update the header of the post to `draft: false` before you deploy.

Remove `public` dir at first if it exist.

```bash
rm -rf ./public
hugo
```

## Reference

[hugo-theme-zozo](https://github.com/imzeuk/hugo-theme-zozo)
