#!/usr/bin/env bash

# build site
hugo

git add .

# support `./deploy.sh your_commit_msg` usage, default msg is 'build'
if [ "$1" == "" ]; then
  git commit -m ":rocket: build and deploy"
else
  git commit -m "$1"
fi

git push
