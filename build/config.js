import { createRequire } from 'module'
import path from 'path'

export const NODE_ENV = process.env.NODE_ENV || 'development'

export const __DEV__ = NODE_ENV === 'development'

export const hasType = __DEV__ ? 'hash' : 'contenthash'

export const serverHost = '0.0.0.0'

const DEFAULT_PORT = 4000

export const serverPort = process.env.PORT || DEFAULT_PORT

export const publicPath = '/'

export const { resolve } = path

export const runtimeRequire =
  // eslint-disable-next-line camelcase
  typeof __non_webpack_require__ === 'undefined'
    ? typeof require === 'undefined'
      ? createRequire(path.resolve('__test__.js'))
      : // eslint-disable-next-line no-undef
        require
    : // eslint-disable-next-line camelcase
      __non_webpack_require__
