#!/usr/bin/env bash

# 1. build site
hugo

# 2. git push
git add .
git commit -m 'build'
git push

# 3. deploy 'public' dir to github 'deploy' branch
git subtree push --prefix public origin deploy

