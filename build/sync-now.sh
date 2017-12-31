#!/usr/bin/env bash

set -e

rm -rf sync

mkdir -p sync/src
yarn build
cp -rf dist sync/dist
cp -rf public sync/public
cp src/index.pug sync/src/index.pug
touch sync/package.json
node build/now.js

echo 'prepared successfully'

cd sync
now --public
now --alias
