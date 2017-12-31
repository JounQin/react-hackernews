// generate minimized package.json for now.sh
const fs = require('fs')
const path = require('path')

const pkg = require('../package.json')

const result = {
  name: pkg.name,
  version: pkg.version,
  description: pkg.description,
  repository: pkg.repository,
  author: pkg.author,
  license: pkg.license,
  scripts: {
    start: pkg.scripts.start,
  },
  now: {
    alias: 'react-hn',
  },
  dependencies: pkg.dependencies,
}

fs.writeFileSync(
  path.resolve(__dirname, '../sync/package.json'),
  JSON.stringify(result, null, 2),
)
