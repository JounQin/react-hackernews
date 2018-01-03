import webpack from 'webpack'
import merge from 'webpack-merge'
import { SSRClientPlugin } from 'ssr-webpack-plugin'
import SWPrecacheWebpackPlugin from 'sw-precache-webpack-plugin'

import { __DEV__, publicPath, resolve } from './config'

import base, { babelLoader } from './base'

const clientConfig = merge.smart(base, {
  entry: {
    app: [resolve('src/entry-client.js')],
    vendors: [
      'firebase',
      'history',
      'react',
      'react-dom',
      'react-redux',
      'react-router',
      'react-router-redux',
      'react-router-config',
      'react-router-dom',
      'redux',
      'redux-thunk',
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
  module: {
    rules: [babelLoader()],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.REACT_ENV': '"client"',
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

if (!__DEV__) {
  clientConfig.plugins.push(
    // auto generate service worker
    new SWPrecacheWebpackPlugin({
      cacheId: 'react-hn',
      filename: 'service-worker.js',
      minify: true,
      dontCacheBustUrlsMatching: /./,
      staticFileGlobsIgnorePatterns: [/\.map$/, /\.json$/],
      runtimeCaching: [
        {
          urlPattern: '/',
          handler: 'networkFirst',
        },
        {
          urlPattern: /\/(top|new|show|ask|jobs)/,
          handler: 'networkFirst',
        },
        {
          urlPattern: '/item/:id',
          handler: 'networkFirst',
        },
        {
          urlPattern: '/user/:id',
          handler: 'networkFirst',
        },
      ],
    }),
  )
}

export default clientConfig
