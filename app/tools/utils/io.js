const FS = require('fs')
const Path = require('path')

exports.listFiles = function listFiles(path, regex = /./) {
  const names = FS.readdirSync(path)
  const files = []
  const dirs = []
  for (const name of names) {
    const targetPath = Path.join(path, name)
    if (FS.statSync(targetPath).isFile()) {
      if (targetPath.match(regex)) {
        files.push(targetPath)
      }
    } else {
      dirs.push(targetPath)
    }
  }
  for (const dir of dirs) {
    files.push.apply(files, listFiles(dir, regex))
  }
  return files
}
