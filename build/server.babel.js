import webpack from 'webpack'
import nodeExternals from 'webpack-node-externals'

import { resolve } from './config'

export default {
  entry: ['regenerator-runtime/runtime', resolve('server/index.js')],
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
    rules: [
      {
        test: /\.js/,
        loader: 'babel-loader',
        options: {
          cacheDirectory: true,
          presets: [
            [
              '@babel/env',
              {
                modules: false,
              },
            ],
          ],
        },
      },
    ],
  },
  plugins: [new webpack.optimize.UglifyJsPlugin()],
}
