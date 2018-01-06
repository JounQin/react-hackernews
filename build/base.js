import webpack from 'webpack'
import ExtractTextWebpackPlugin from 'extract-text-webpack-plugin'
import FriendlyErrorsWebpackPlugin from 'friendly-errors-webpack-plugin'
import UglifyjsWebpackPlugin from 'uglifyjs-webpack-plugin'

import { NODE_ENV, __DEV__, resolve } from './config'

const souceMap = __DEV__
const minimize = !souceMap

const cssLoaders = react =>
  ExtractTextWebpackPlugin.extract({
    fallback: {
      loader: 'react-style-loader',
      options: {
        react,
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
          minimize,
          souceMap,
        },
      },
      {
        loader: 'sass-loader',
        options: {
          minimize,
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
      'process.env.NODE_ENV': JSON.stringify(NODE_ENV),
      __DEV__,
    }),
    new ExtractTextWebpackPlugin({
      disable: true,
      filename: '[name].[contenthash].css',
    }),
    new FriendlyErrorsWebpackPlugin(),
    ...(__DEV__
      ? [new webpack.NamedModulesPlugin(), new webpack.NamedChunksPlugin()]
      : [
          new webpack.NoEmitOnErrorsPlugin(),
          new webpack.optimize.ModuleConcatenationPlugin(),
          new UglifyjsWebpackPlugin(),
        ]),
  ],
}
