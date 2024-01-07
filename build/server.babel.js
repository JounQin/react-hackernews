import nodeExternals from 'webpack-node-externals'

import { babelLoader } from './base.js'
import { NODE_ENV, resolve } from './config.js'

export default {
  mode: NODE_ENV,
  entry: resolve('server/index.js'),
  output: {
    path: resolve('dist'),
    filename: 'server.js',
  },
  target: 'node',
  externals: nodeExternals(),
  module: {
    rules: [babelLoader(true)],
  },
}
