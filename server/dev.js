import _debug from 'debug'
import koaWebpack from 'koa-webpack'
import MFS from 'memory-fs'
import webpack from 'webpack'

import { resolve } from '../build/config'

import clientConfig from '../build/react.client.babel'
import serverConfig from '../build/react.server.babel'

const debug = _debug('1stg:server:dev')

clientConfig.entry.app.unshift(
  'webpack-hot-middleware/client',
  'react-hot-loader/patch',
)

clientConfig.plugins.unshift(new webpack.HotModuleReplacementPlugin())

export default cb => {
  let _resolve, clientManifest, bundle, fs

  const readyPromise = new Promise(resolve => {
    _resolve = resolve
  })

  const ready = (...args) => {
    _resolve()
    cb(...args)
  }

  const clientCompiler = webpack(clientConfig)

  const webpackMiddleware = koaWebpack({
    compiler: clientCompiler,
    dev: {
      stats: {
        colors: true,
      },
    },
  })

  clientCompiler.plugin('done', stats => {
    stats = stats.toJson()
    stats.errors.forEach(debug)
    stats.warnings.forEach(debug)
    if (stats.errors.length) return

    fs = webpackMiddleware.dev.fileSystem
    clientManifest = JSON.parse(
      fs.readFileSync(resolve('dist/ssr-client-manifest.json')),
    )

    if (bundle) {
      ready({ bundle, clientManifest, fs })
    }
  })

  const mfs = new MFS()
  const serverCompiler = webpack(serverConfig)
  serverCompiler.outputFileSystem = mfs

  serverCompiler.watch({}, (err, stats) => {
    if (err) throw err
    stats = stats.toJson()
    if (stats.errors.length) return

    bundle = JSON.parse(
      mfs.readFileSync(resolve('dist/ssr-server-bundle.json')),
    )

    if (clientManifest) {
      ready({ bundle, clientManifest, fs })
    }
  })

  return { readyPromise, webpackMiddleware }
}
