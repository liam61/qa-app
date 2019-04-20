// / <reference path="../typings/node/node.d.ts"/>

const program = require('commander')
const FS = require('fs-extra')
const Path = require('path')
const ChildProcess = require('child_process')
const Chalk = require('chalk')

const packageJson = FS.readJSONSync(Path.join(process.cwd(), 'package.json'), {
  encoding: 'utf-8',
})
let { basePath } = packageJson

if (!basePath) {
  console.log(
    `you should set the key ${Chalk.red('basePath')} in your ${Chalk.green(
      'package.json'
    )} file. For example, ${Chalk.red('"basePath":"./src"')}`
  )
  return
}

program
  .version('0.0.1')
  .option('[<path>]  ', 'the path of page or component to remove')
  .option(
    '-c, --component',
    `will remove files from ${Chalk.greenBright(
      Path.join(basePath, 'components')
    )} directory`
  )

program.on('--help', () => {
  console.log(
    '  This is a quick tool to remove a page or component.  \n  It will remove index.tsx,index.scss file and stores and actions \n'
  )
  console.log('')

  console.log('  Examples:')

  console.log('')

  console.log(
    `    $ node tools/rm-page.js offerList        ${Chalk.grey(
      '// remove a page'
    )}`
  )

  console.log(
    `    $ node tools/rm-page.js offerList -c        ${Chalk.grey(
      '// remove a component for common'
    )}`
  )

  console.log(
    `    $ node tools/rm-page.js offerList/tableList        ${Chalk.grey(
      '// remove a component inner page offerList'
    )}`
  )

  console.log('')
})

program.parse(process.argv)

if (program.args.length < 1) throw new Error('missing param')

const pageOrComPath = program.args[0]

// 跨页面级通用组件独自一个目录
if (program.component) {
  basePath = Path.join(basePath, 'components')
} else {
  basePath = Path.join(basePath, 'pages')
}

const splitPath = pageOrComPath.split('/').filter(Boolean)
const rootPageName = splitPath[0] // 页面目录
const fileDirectoryName = splitPath[splitPath.length - 1] // 页面内最深层目录

const pagePath = Path.join(process.cwd(), basePath, pageOrComPath)
const rootPagePath = Path.join(process.cwd(), basePath, rootPageName)

const storeName = `${rootPagePath}/stores/${fisrtToLowercase(
  fileDirectoryName
)}Store.ts`
const actionName = `${rootPagePath}/actions/${fisrtToLowercase(
  fileDirectoryName
)}Action.ts`

removeFileOrDirectory(pagePath)
removeFileOrDirectory(storeName)
removeFileOrDirectory(actionName)

ChildProcess.execFile(
  'node',
  [Path.join(__dirname, './sync-mobx.js')],
  (error, stdout, stderr) => {
    if (error) {
      console.error('stderr', stderr)
      throw error
    }

    console.log(Chalk.cyan(stdout))
  }
)

/**
 * 创建文件
 * @param path {string}     路径
 * @defaultFileContent ?{string}    默认文件内容
 * @return {bollean}
 */
function removeFileOrDirectory(path) {
  if (FS.existsSync(path)) {
    FS.removeSync(path)
    console.log(Chalk.red('delete file or directory success: ') + path)
    return true
  }
}

function fisrtToLowercase(str) {
  return str.charAt(0).toLowerCase() + str.substr(1)
}
