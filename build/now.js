// generate minimized package.json for now.sh
const fs = require('fs')
const path = require('path')

const pkg = require('../package.json')

fs.writeFileSync(
  path.resolve(__dirname, '../sync/package.json'),
  JSON.stringify(
    {
      name: pkg.name,
      version: pkg.version,
      description: pkg.description,
      repository: pkg.repository,
      author: pkg.author,
      license: pkg.license,
      scripts: {
        start: pkg.scripts.start,
      },
      dependencies: pkg.dependencies,
    },
    null,
    2,
  ),
)

fs.writeFileSync(
  path.resolve(__dirname, '../sync/now.json'),
  JSON.stringify(
    {
      alias: 'react-hn',
      name: 'react-hackernews',
      version: 1,
    },
    null,
    2,
  ),
)
