import fs from 'fs'
import { createRequire } from 'module'
import path from 'path'

import _debug from 'debug'
import Koa from 'koa'
import cash from 'koa-cash'
import compose from 'koa-compose'
import compress from 'koa-compress'
import logger from 'koa-logger'
import mount from 'koa-mount'
import serve from 'koa-static-cache'
import { LRUCache } from 'lru-cache'
import { createBundleRenderer } from 'react-server-renderer'

import {
  __DEV__,
  resolve,
  runtimeRequire,
  serverHost,
  serverPort,
} from '../build/config.js'

const require = createRequire(path.resolve('__test__.js'))

const debug = _debug('1stg:server')

const template = __DEV__
  ? require('pug').renderFile(resolve('server/template.pug'), {
      pretty: true,
    })
  : fs.readFileSync(resolve('dist/template.html'), 'utf8')

const app = new Koa()

/**
 * @type {Promise<void>}
 */
let ready
/**
 * @type {import('react-server-renderer').Renderer}
 */
let renderer

const MAX_AGE = 1000 * 3600 * 24 * 365 // one year

const STATUS_OK = 200
const STATUS_NOT_FOUND = 404

const cache = new LRUCache({
  max: 1000,
  ttl: 1000 * 60 * 15,
})

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
      !['*/*', 'text/html'].some(mimeType =>
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
        ctx.status = context.code || STATUS_OK
        ctx.set({
          'Content-Type': 'text/html',
        })
      })
      .on('error', async err => {
        console.dir(err)

        const { status, url, stack } = err

        if (url) {
          ctx.status = 302
          ctx.set({ Location: url })
          return res.end()
        }

        ctx.status = status || 500

        if (status === STATUS_NOT_FOUND) {
          return res.end('404 | Page Not Found')
        }
        res.end('500 | Internal Server Error')
        debug(`error during render : ${url}`)
        debug(stack)
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
  import('./dev.js')
    .then(({ default: dev }) => {
      let webpackMiddlewarePromise
      ;({ readyPromise: ready, webpackMiddlewarePromise } = dev(
        ({ bundle, clientManifest }) => {
          renderer = createRenderer(bundle, {
            clientManifest,
          })
        },
      ))
      return webpackMiddlewarePromise
    })
    // eslint-disable-next-line unicorn/prefer-top-level-await
    .then(webpackMiddleware => app.use(webpackMiddleware))
} else {
  renderer = createRenderer(
    runtimeRequire(resolve('dist/react-ssr-server-bundle.json')),
    {
      clientManifest: runtimeRequire(
        resolve('dist/react-ssr-client-manifest.json'),
      ),
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
    cash({
      get: key => cache.get(key),
      set: (key, value) => cache.set(key, value),
    }),
  )

  files['/service-worker.js'].maxAge = 0
}

app.use(compose(middlewares))

app.listen(serverPort, serverHost, () => {
  debug(`Server start listening at %s:%s`, serverHost, serverPort)
})
