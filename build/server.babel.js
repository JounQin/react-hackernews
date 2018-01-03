import nodeExternals from 'webpack-node-externals'
import UglifyjsWebpackPlugin from 'uglifyjs-webpack-plugin'

import { resolve } from './config'

import { babelLoader } from './base'

export default {
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
  plugins: [new UglifyjsWebpackPlugin()],
}
