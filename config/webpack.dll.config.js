const webpack = require('webpack') // eslint-disable-line
const { resolve } = require('./utils')
const { moduleToDll, outputDir } = require('./options')

function getDllConfig(dll, output) {
  return {
    entry: dll,
    output: {
      filename: '[name].dll.js', // 输出动态连接库的文件名称
      path: resolve(output),
      libraryTarget: 'var', // 输出方式 默认 'var' 形式赋给变量
      library: '_dll_[name]_[hash]' // 全局变量名称
    },
    mode: 'production',
    plugins: [
      new webpack.DllPlugin({
        name: '_dll_[name]_[hash]', // 和 library 中一致，输出的 manifest.json 中的 name 值
        path: resolve(output, '[name].manifest.json')
      })
    ]
  }
}

module.exports = getDllConfig(moduleToDll, outputDir)
