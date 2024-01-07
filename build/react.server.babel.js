import { ReactSSRServerPlugin } from 'react-server-renderer/server-plugin'
import webpack from 'webpack'
import { merge } from 'webpack-merge'
import nodeExternals from 'webpack-node-externals'

import { babelLoader, baseConfig } from './base.js'
import { resolve } from './config.js'

/**
 * @type {import('webpack').Configuration}
 */
export const serverConfig = merge(baseConfig, {
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
    allowlist: /\.s?css$/,
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

export default serverConfig
