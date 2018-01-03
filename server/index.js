import fs from 'fs'

import _debug from 'debug'
import Koa from 'koa'
import cash from 'koa-cash'
import compose from 'koa-compose'
import compress from 'koa-compress'
import convert from 'koa-convert'
import logger from 'koa-logger'
import mount from 'koa-mount'
import serve from 'koa-static-cache'
import LRU from 'lru-cache'
import { createBundleRenderer } from 'react-server-renderer'

import {
  __DEV__,
  resolve,
  runtimeRequire,
  serverHost,
  serverPort,
} from '../build/config'

const debug = _debug('1stg:server')

const template = __DEV__
  ? require('pug').renderFile(resolve('server/template.pug'), {
      pretty: true,
    })
  : fs.readFileSync(resolve('dist/template.html'), 'utf-8')

const app = new Koa()

let ready, renderer

const MAX_AGE = 1000 * 3600 * 24 * 365 // one year

const cache = LRU(1000)

const middlewares = [
  logger(),
  mount(
    '/public',
    serve(resolve('public'), {
      maxAge: MAX_AGE,
    }),
  ),
  async (ctx, next) => {
    if (__DEV__) {
      await ready
    } else if (await ctx.cashed()) {
      return
    }

    if (
      ctx.method !== 'GET' ||
      ctx.url.lastIndexOf('.') > ctx.url.lastIndexOf('/') ||
      !['*/*', 'text/html'].find(mimeType =>
        ctx.get('Accept').includes(mimeType),
      )
    ) {
      return next()
    }

    const context = { ctx, title: 'React Hackernews' }

    ctx.respond = false

    const { res } = ctx

    renderer
      .renderToStream(context)
      .on('afterRender', () => {
        ctx.status = context.code || 200
        ctx.set({
          'Content-Type': 'text/html',
        })
      })
      .on('error', e => {
        const { status, url } = e

        if (url) {
          ctx.status = 302
          ctx.set({ Location: url })
          return res.end()
        }

        ctx.status = status || 500

        switch (status) {
          case 404:
            return res.end('404 | Page Not Found')
          default:
            res.end('500 | Internal Server Error')
            debug(`error during render : ${url}`)
            debug(e.stack)
        }
      })
      .pipe(res)
  },
]

const createRenderer = (bundle, options) =>
  createBundleRenderer(bundle, {
    ...options,
    template,
    basedir: resolve('dist/static'),
    runInNewContext: false,
  })

if (__DEV__) {
  const { readyPromise, webpackMiddleware } = require('./dev').default(
    ({ bundle, clientManifest }) => {
      renderer = createRenderer(bundle, {
        clientManifest,
      })
    },
  )
  ready = readyPromise
  middlewares.push(webpackMiddleware)
} else {
  renderer = createRenderer(
    runtimeRequire(resolve('dist/ssr-server-bundle.json')),
    {
      clientManifest: runtimeRequire(resolve('dist/ssr-client-manifest.json')),
    },
  )

  const files = {}

  middlewares.splice(
    1,
    0,
    compress(),
    serve(
      resolve('dist/static'),
      {
        maxAge: MAX_AGE,
      },
      files,
    ),
    convert(
      cash({
        get: key => cache.get(key),
        set: (key, value) => cache.set(key, value),
      }),
    ),
  )

  files['/service-worker.js'].maxAge = 0
}

app.use(compose(middlewares))

app.listen(serverPort, serverHost, () => {
  debug(`Server start listening at %s:%s`, serverHost, serverPort)
})
