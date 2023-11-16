import nodeExternals from 'webpack-node-externals'

import { babelLoader } from './base'
import { NODE_ENV, resolve } from './config'

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
