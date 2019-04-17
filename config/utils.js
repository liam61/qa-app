const path = require('path')

const cwd = process.cwd()

function resolve(...filePath) {
  return path.join(cwd, ...filePath)
}

module.exports = {
  resolve,
}
