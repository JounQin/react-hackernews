import nodeExternals from 'webpack-node-externals'

import { NODE_ENV, resolve } from './config'

import { babelLoader } from './base'

export default {
  mode: NODE_ENV,
  entry: resolve('server/index.js'),
  output: {
    path: resolve('dist'),
    filename: 'server.js',
  },
  target: 'node',
  resolve: {
    modules: [resolve('src'), 'node_modules'],
  },
  externals: nodeExternals(),
  module: {
    rules: [babelLoader(true)],
  },
}
