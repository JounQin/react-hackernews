import webpack from 'webpack'
import FriendlyErrorsWebpackPlugin from 'friendly-errors-webpack-plugin'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'

import { NODE_ENV, __DEV__, hasType, resolve } from './config'

const souceMap = __DEV__
const minimize = !souceMap

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
    }),
  },
})

export default {
  mode: NODE_ENV,
  devtool: __DEV__ && 'cheap-module-source-map',
  resolve: {
    alias: {
      react: 'anujs',
      'react-dom': 'anujs',
      'prop-types': 'anujs/lib/ReactPropTypes',
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
