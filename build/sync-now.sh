#!/usr/bin/env bash

set -e

rm -rf sync

mkdir sync
yarn build
cp -rf dist sync/dist
cp -rf public sync/public
touch sync/package.json
node build/now.js

echo 'prepared successfully'

cd sync
now --public
now alias --public
