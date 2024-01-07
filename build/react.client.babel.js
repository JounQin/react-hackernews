import { ReactSSRClientPlugin } from 'react-server-renderer/client-plugin'
import webpack from 'webpack'
import { merge } from 'webpack-merge'
import { GenerateSW } from 'workbox-webpack-plugin'

import { babelLoader, baseConfig } from './base.js'
import { __DEV__, publicPath, hasType, resolve } from './config.js'

/**
 * @type {import('webpack').Configuration}
 */
export const clientConfig = merge(baseConfig, {
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
    new GenerateSW({
      cacheId: 'react-hn',
      swDest: 'service-worker.js',
      dontCacheBustURLsMatching: /./,
      exclude: [/index\.html$/, /\.map$/, /\.json$/],
      runtimeCaching: [
        {
          urlPattern: /^https?:\/\//,
          handler: 'NetworkFirst',
        },
      ],
    }),
  )
}

export default clientConfig
