import _debug from 'debug'
import Koa from 'koa'
import compose from 'koa-compose'
import logger from 'koa-logger'
import mount from 'koa-mount'
import serve from 'koa-static'
import pug from 'pug'
import { createBundleRenderer } from 'react-server-renderer'

import {
  __DEV__,
  resolve,
  runtimeRequire,
  serverHost,
  serverPort,
} from '../build/config'

const debug = _debug('1stg:server')

const template = pug.renderFile(resolve('src/index.pug'), {
  pretty: __DEV__,
})

const app = new Koa()

let ready, renderer

const middlewares = [
  logger(),
  mount('/public', serve(resolve('public'))),
  async (ctx, next) => {
    await ready

    const { method, url } = ctx

    if (
      method !== 'GET' ||
      url.lastIndexOf('.') > url.lastIndexOf('/') ||
      !['*/*', 'text/html'].find(mimeType =>
        ctx.get('Accept').includes(mimeType),
      )
    ) {
      return next()
    }

    const context = { ctx }

    ctx.respond = false

    const { res } = ctx

    const stream = renderer
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
          ctx.redirect(url)
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

    stream.pipe(res)
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
  middlewares.push(serve(resolve('dist/static')))
}

app.use(compose(middlewares))

app.listen(serverPort, serverHost, () => {
  debug(`Server start listening at %s:%s`, serverHost, serverPort)
})
