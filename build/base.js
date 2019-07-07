import webpack from 'webpack'
import FriendlyErrorsWebpackPlugin from 'friendly-errors-webpack-plugin'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'

import { NODE_ENV, __DEV__, hasType, resolve } from './config'

const options = {
  sourceMap: __DEV__,
}

const cssLoaders = manualInject => [
  manualInject
    ? {
        loader: 'react-style-loader',
        options: {
          manualInject,
        },
      }
    : MiniCssExtractPlugin.loader,
  {
    loader: 'css-loader',
    options,
  },
  {
    loader: 'postcss-loader',
    options,
  },
  {
    loader: 'sass-loader',
    options,
  },
]

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
      // plugins: ['dynamic-import-node'],
    }),
  },
})

export default {
  mode: NODE_ENV,
  resolve: {
    alias: {
      lodash$: 'lodash-es',
    },
    extensions: ['.js', '.scss'],
    modules: [resolve('src'), 'node_modules'],
  },
  module: {
    rules: [
      {
        test: /\.pug$/,
        loader: 'pug-plain-loader',
        options: {
          pretty: __DEV__,
        },
      },
      {
        test: /\.scss$/,
        oneOf: [
          {
            test: /app.scss$/,
            use: cssLoaders(),
          },
          {
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
    new MiniCssExtractPlugin({
      filename: `[name].[${hasType}].css`,
    }),
    new FriendlyErrorsWebpackPlugin(),
  ],
}
