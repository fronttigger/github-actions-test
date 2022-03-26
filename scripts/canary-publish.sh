#!/usr/bin/env bash
pkg_version=`node -e "console.log(require('./package.json').version.split('-')[0])"`
git_commit_sha=`git rev-parse --short HEAD`

# npx npm@7 version $pkg_version-$git_commit_sha --workspaces
npm run version --workspaces $pkg_version-$git_commit_sha
# npx npm@7 run build:all
npm run build:all
# npx npm@7 run deploy --workspaces -- --tag canary
npm run deploy --workspaces -- --tag canary
