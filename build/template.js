const fs = require('fs')
const path = require('path')

const { minify } = require('html-minifier')
const pug = require('pug')

const result = minify(pug.renderFile('src/index.pug'), {
  collapseWhitespace: true,
  minifyCSS: true,
  minifyJS: true,
})

fs.writeFileSync(path.resolve(__dirname, '../dist/static/index.html'), result)
