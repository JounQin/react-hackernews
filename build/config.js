import path from 'path'

export const NODE_ENV = process.env.NODE_ENV || 'development'

export const __DEV__ = NODE_ENV === 'development'

export const serverHost = 'localhost'

export const serverPort = process.env.PORT || 4000

export const publicPath = __DEV__ ? `http://${serverHost}:${serverPort}/` : '/'

export const resolve = (...args) => path.resolve(process.cwd(), ...args)

export const runtimeRequire =
  typeof __non_webpack_require__ === 'undefined'
    ? require
    : // eslint-disable-next-line no-undef
      __non_webpack_require__
