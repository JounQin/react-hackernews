import webpack from 'webpack'
import merge from 'webpack-merge'
import { SSRClientPlugin } from 'ssr-webpack-plugin'
import SWPrecacheWebpackPlugin from 'sw-precache-webpack-plugin'

import { __DEV__, publicPath, resolve } from './config'

import base, { babelLoader } from './base'

const clientConfig = merge.smart(base, {
  entry: {
    app: resolve('src/entry-client.js'),
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
    // extract vendor chunks for better caching
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendors',
      minChunks: ({ context, request }) =>
        // it's inside node_modules
        /node_modules/.test(context) &&
        // and not a CSS file (due to extract-text-webpack-plugin limitation)
        !/\.css$/.test(request),
    }),
    // extract webpack runtime & manifest to avoid vendor chunk hash changing
    // on every build.
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest',
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
