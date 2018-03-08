import webpack from 'webpack'
import ExtractTextWebpackPlugin from 'extract-text-webpack-plugin'
import FriendlyErrorsWebpackPlugin from 'friendly-errors-webpack-plugin'

import { NODE_ENV, __DEV__, resolve } from './config'

const souceMap = __DEV__
const minimize = !souceMap

const cssLoaders = manualInject =>
  ExtractTextWebpackPlugin.extract({
    fallback: {
      loader: 'react-style-loader',
      options: {
        manualInject,
      },
    },
    use: [
      {
        loader: 'css-loader',
        options: {
          minimize,
          souceMap,
        },
      },
      {
        loader: 'postcss-loader',
        options: {
          souceMap,
        },
      },
      {
        loader: 'sass-loader',
        options: {
          souceMap,
        },
      },
    ],
  })

export const babelLoader = isServer => ({
  test: /\.js$/,
  loader: 'babel-loader',
  exclude: /node_modules/,
  options: {
    cacheDirectory: true,
    ...(isServer && {
      presets: [
        [
          '@babel/env',
          {
            modules: false,
            exclude: [
              'babel-plugin-transform-async-to-generator',
              'babel-plugin-transform-regenerator',
            ],
          },
        ],
      ],
    }),
  },
})

export default {
  mode: NODE_ENV,
  devtool: __DEV__ && 'cheap-module-source-map',
  resolve: {
    alias: {
      lodash: 'lodash-es',
    },
    extensions: ['.js', '.scss'],
    modules: [resolve('src'), 'node_modules'],
  },
  module: {
    rules: [
      {
        test: /\.pug$/,
        use: [
          'apply-loader',
          {
            loader: 'pug-loader',
            options: {
              pretty: __DEV__,
            },
          },
        ],
      },
      {
        test: /\.scss$/,
        oneOf: [
          {
            test: /app.scss/,
            use: cssLoaders(),
          },
          {
            test: /./,
            use: cssLoaders(true),
          },
        ],
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      __DEV__,
    }),
    new ExtractTextWebpackPlugin({
      disable: __DEV__,
      allChunks: true,
      filename: '[name].[contenthash].css',
    }),
    new FriendlyErrorsWebpackPlugin(),
  ],
}
