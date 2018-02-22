# react-hackernews

[![Greenkeeper badge](https://badges.greenkeeper.io/JounQin/react-hackernews.svg)](https://greenkeeper.io/)
[![Travis](https://img.shields.io/travis/JounQin/react-hackernews.svg)](https://travis-ci.org/JounQin/react-hackernews)
[![David](https://img.shields.io/david/JounQin/react-hackernews.svg)](https://david-dm.org/JounQin/react-hackernews)
[![David Dev](https://img.shields.io/david/dev/JounQin/react-hackernews.svg)](https://david-dm.org/JounQin/react-hackernews?type=dev)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://github.com/prettier/prettier)

HackerNews clone built with React, ReactRouter &amp; Redux, with full page server-side rendering

<p align="center">
  <a href="https://react-hn.now.sh" target="_blank" rel="noopener noreferrer">
    <img width="720" alt="react-hackernews" src="https://user-images.githubusercontent.com/8336744/34520639-7bc3334e-f0c4-11e7-94c6-e6ef3b007e7f.png">
    <br>
    Live Demo
  </a>
</p>

## Features

> Note: in practice, it is unnecessary to code-split for an app of this size (where each async chunk is only a few kilobytes), nor is it optimal to extract an extra CSS file (which is only 1kb) -- they are used simply because this is a demo app showcasing all the supported features. In real apps, you should always measure and optimize based on your actual app constraints.

* Server Side Rendering
  * react + react-router + redux working together
  * Server-side data pre-fetching
  * Client-side state & DOM hydration
  * Automatically inlines CSS used by rendered components only
  * Preload / prefetch resource hints
  * Route-level code splitting
  * custom dynamic title for SEO
* Progressive Web App
  * App manifest
  * Service worker
  * 100/100 Lighthouse score
* Experience
  * Hot-reload in development
  * CSS extraction for production

## Inspired by

[vue-hackernews-2.0](https://github.com/vuejs/vue-hackernews-2.0)

[vue-server-renderer](https://ssr.vuejs.org)

[react-async-component](https://github.com/ctrlplusb/react-async-component)

[react-async-bootstrapper](https://github.com/ctrlplusb/react-async-bootstrapper)

[react-server-renderer](https://github.com/JounQin/react-server-renderer)

[react-style-loader](https://github.com/JounQin/react-style-loader) / [vue-style-loader](https://github.com/vuejs/vue-style-loader)

## Architecture Overview

<img width="973" alt="screen shot 2016-08-11 at 6 06 57 pm" src="https://cloud.githubusercontent.com/assets/499550/17607895/786a415a-5fee-11e6-9c11-45a2cfdf085c.png">

## Build Setup

**Requires Node.js 7+**

```bash
# install dependencies
npm install # or yarn

# serve in dev mode, with hot reload at localhost:4000
yarn dev

# build for production
yarn build

# If you care about node_modules size
yarn run prune

# serve in production mode
yarn start
```

## License

MIT
