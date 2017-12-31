import webpack from 'webpack'
import merge from 'webpack-merge'
import nodeExternals from 'webpack-node-externals'
import { SSRServerPlugin } from 'ssr-webpack-plugin'

import { resolve } from './config'

import base from './base'

export default merge(base, {
  entry: resolve('src/entry-server.js'),
  resolve: {
    alias: {
      'create-api': './create-api-server.js',
    },
  },
  target: 'node',
  output: {
    path: resolve('dist'),
    filename: `[name].[chunkhash].js`,
    libraryTarget: 'commonjs2',
  },
  externals: nodeExternals({
    whitelist: /\.s?css$/,
  }),
  plugins: [
    new webpack.DefinePlugin({
      __SERVER__: true,
    }),
    new SSRServerPlugin(),
  ],
})
