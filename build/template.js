import { writeFileSync } from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

import { minify } from 'html-minifier'
import { renderFile } from 'pug'

const result = minify(renderFile('server/template.pug'), {
  collapseWhitespace: true,
  minifyCSS: true,
  minifyJS: true,
})

writeFileSync(
  path.resolve(fileURLToPath(import.meta.url), '../../dist/template.html'),
  result,
)
