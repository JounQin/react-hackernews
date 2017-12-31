import webpack from 'webpack'
import merge from 'webpack-merge'
import { SSRClientPlugin } from 'ssr-webpack-plugin'

import { __DEV__, publicPath, resolve } from './config'

import base from './base'

export default merge.smart(base, {
  entry: {
    app: [resolve('src/entry-client.js')],
    vendors: [
      'react',
      'react-dom',
      'react-redux',
      'react-router',
      'react-router-redux',
      'react-router-config',
      'react-router-dom',
    ],
  },
  resolve: {
    alias: {
      'create-api': './create-api-client.js',
    },
  },
  output: {
    publicPath,
    path: resolve('dist/static'),
    filename: `[name].[${__DEV__ ? 'hash' : 'chunkhash'}].js`,
  },
  plugins: [
    new webpack.DefinePlugin({
      __SERVER__: false,
    }),
    new webpack.optimize.CommonsChunkPlugin({
      names: ['vendors', 'manifest'],
    }),
    new SSRClientPlugin({
      filename: '../ssr-client-manifest.json',
    }),
  ],
})
