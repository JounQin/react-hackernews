import webpack from 'webpack'
import merge from 'webpack-merge'
import { ReactSSRClientPlugin } from 'react-server-renderer/client-plugin'
import SWPrecacheWebpackPlugin from 'sw-precache-webpack-plugin'

import { __DEV__, publicPath, hasType, resolve } from './config'
import base, { babelLoader } from './base'

const clientConfig = merge.smart(base, {
  entry: {
    app: [resolve('src/entry-client.js')],
  },
  resolve: {
    alias: {
      'create-api': './create-api-client.js',
    },
  },
  output: {
    publicPath,
    path: resolve('dist/static'),
    filename: `[name].[${hasType}].js`,
  },
  module: {
    rules: [babelLoader()],
  },
  optimization: {
    runtimeChunk: {
      name: 'manifest',
    },
    splitChunks: {
      cacheGroups: {
        vendors: {
          chunks: 'initial',
          name: 'vendors',
          test: /node_modules/,
        },
      },
    },
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.REACT_ENV': '"client"',
      __SERVER__: false,
    }),
    new ReactSSRClientPlugin({
      filename: '../react-ssr-client-manifest.json',
    }),
  ],
})

if (!__DEV__) {
  clientConfig.plugins.push(
    new SWPrecacheWebpackPlugin({
      cacheId: 'react-hn',
      filename: 'service-worker.js',
      minify: true,
      dontCacheBustUrlsMatching: /./,
      staticFileGlobsIgnorePatterns: [/index\.html$/, /\.map$/, /\.json$/],
      runtimeCaching: [
        {
          urlPattern: /^https?:\/\//,
          handler: 'networkFirst',
        },
      ],
    }),
  )
}

export default clientConfig
