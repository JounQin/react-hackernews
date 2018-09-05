const config = {
  plugins: {
    autoprefixer: null,
  },
}

if (process.env.NODE_ENV === 'production') {
  config.plugins.cssnano = null
}

module.exports = config
