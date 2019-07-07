import webpack from 'webpack'
import merge from 'webpack-merge'
import nodeExternals from 'webpack-node-externals'
import { ReactSSRServerPlugin } from 'react-server-renderer/server-plugin'

import { resolve } from './config'
import base, { babelLoader } from './base'

export default merge.smart(base, {
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
  module: {
    rules: [babelLoader(true)],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.REACT_ENV': '"server"',
      __SERVER__: true,
    }),
    new ReactSSRServerPlugin(),
  ],
})
