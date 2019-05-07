const FS = require('fs-extra')
const Path = require('path')
const Chalk = require('chalk')
const listFile = require('./utils/io').listFiles

const packageJson = FS.readJSONSync(Path.join(process.cwd(), 'package.json'), {
  encoding: 'utf-8',
})
const { basePath } = packageJson
const storesPath = listFile(
  basePath,
  /(.+\/)*(stores|globalStores)\/(.+)\.(t|j)s$/g
)
// 所有 store 的 path 数组
const actionsPath = listFile(basePath, /(.+\/)*actions\/(.+)\.(t|j)s$/g)
// 所有 action 的 path 数组
const mobxDependencePath = Path.join(process.cwd(), basePath) // ./src
const mobxTypingsPath = Path.join(process.cwd(), basePath, 'typings') // ./src/typings

createDependenceFile()
createTypingsFile()

function createDependenceFile() {
  const content = createDependenceImportContent(mobxDependencePath)

  createFile(Path.join(mobxDependencePath, 'mobxDependence.ts'), content)
}

function createTypingsFile() {
  const importContent = createTypingsImportContent(mobxTypingsPath)
  const IRootStoreContent = generatorIRootStore()
  const IRootActionContent = generatorIRootAction()
  const IInjectContent =
    'export interface IInject {\n' +
    '  rootStore: IRootStore\n' +
    '  rootAction: IRootAction\n' +
    '}'

  const mobxReactModuleDeclare =
    'declare module \'mobx-react\' {' +
    '\n' +
    '  export type IValueMapSelf = IStoresToProps<IInject>' +
    '\n\n' +
    '  export function inject<S extends IInject, P, I, C>(' +
    '\n' +
    '    fn: IStoresToProps<S, P, I, C>' +
    '\n' +
    '  ): <T extends IReactComponent>(target: T) => T & IWrappedComponent<P>' +
    '\n' +
    '}'

  const content = `${importContent}\n${IRootStoreContent}\n\n${IRootActionContent}\n\n${IInjectContent}\n\n${mobxReactModuleDeclare}\n`

  createFile(Path.join(mobxTypingsPath, 'index.d.ts'), content)
}

function generatorIRootStore() {
  const pathMap = storesPath.reduce((ret, path) => {
    const pathArr = getFileNameFrom(path)
    ret[pathArr[0]] = ret[pathArr[0]] || []
    ret[pathArr[0]].push(pathArr[1])
    return ret
  }, {})
  // console.log(pathMap)
  let content = 'export interface IRootStore {\n'
  content += Object.keys(pathMap).reduce((ret, pageName) => {
    ret += `  ${pageName}: {\n`
    const storeArr = pathMap[pageName]
    // console.log(storeArr)
    storeArr.forEach(storeName => {
      ret += `    ${storeName}: ${pageName}${firstToUppercase(storeName)}\n`
    })
    ret += '  }\n'
    return ret
  }, '')

  content += '}'
  return content
}

function generatorIRootAction() {
  const pathMap = actionsPath.reduce((ret, path) => {
    const pathArr = getFileNameFrom(path)
    ret[pathArr[0]] = ret[pathArr[0]] || []
    ret[pathArr[0]].push(pathArr[1])
    return ret
  }, {})
  let content = 'export interface IRootAction {\n'
  content += Object.keys(pathMap).reduce((ret, pageName) => {
    ret += `  ${pageName}: {\n`
    const actionArr = pathMap[pageName]
    actionArr.forEach(actionName => {
      ret += `    ${actionName}: ${pageName}${firstToUppercase(actionName)}\n`
    })
    ret += '  }\n'
    return ret
  }, '')

  content += '}'
  return content
}

function createDependenceImportContent(base) {
  const content = storesPath.concat(actionsPath).reduce((content, path) => {
    const pathArr = getFileNameFrom(path)
    let relativePath = Path.relative(base, path)
    if (relativePath.indexOf('.') !== 0) {
      relativePath = `./${relativePath}`
    }
    relativePath = removeExt(relativePath)
    const importConent = `import '${relativePath}'`

    content += importConent
    content += '\n'
    return content
  }, '')
  return content
}

function createTypingsImportContent(base) {
  let content =
    'import { IStoresToProps, IReactComponent, IWrappedComponent } from \'mobx-react\'\n'
  content += storesPath.concat(actionsPath).reduce((content, path) => {
    const pathArr = getFileNameFrom(path)
    // console.log(path, pathArr)
    let relativePath = Path.relative(base, path)
    if (relativePath.indexOf('.') !== 0) {
      relativePath = `./${relativePath}`
    }
    relativePath = removeExt(relativePath)
    const importConent = `import ${pathArr[0]}${firstToUppercase(
      pathArr[1]
    )} from '${relativePath}'`

    content += importConent
    content += '\n'
    return content
  }, '')
  return content
}

function getFileNameFrom(path) {
  const reg = /([^\/]+)\/(?:actions|stores|globalStores)\/(.+)\.(?:t|j)sx?$/
  const matched = path.match(reg)
  let pageName = matched && matched[1]
  const fileName = matched && matched[2]
  if (path.indexOf('globalStores') > -1) pageName = 'globalStores'
  return [pageName, fileName]
}

function firstToUppercase(str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

function removeExt(path) {
  const reg = /(.+)\.[^\.]+$/
  return path.replace(reg, '$1')
}

/**
 * 创建文件
 * @param path {string}     路径
 * @defaultFileContent ?{string}    默认文件内容
 * @return {bollean}
 */

function createFile(path, defaultFileContent) {
  defaultFileContent = defaultFileContent || ''
  const existed = FS.existsSync(path)
  FS.outputFileSync(path, defaultFileContent)
  if (existed) {
    console.log(Chalk.blue(`updated "${path}".`))
  } else {
    console.log(Chalk.blue(`created "${path}".`))
  }
  return true
}
