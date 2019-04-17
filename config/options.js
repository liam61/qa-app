const { main, name, author } = require('../package.json')

const entryDir = main.split('/')[0]

const outputDir = 'dist'

// 必要参数
const baseOptions = {
  entryFile: main,
  templateFile: `${entryDir}/index.tmpl.html`,
  templateTitle: name,
  author,
  cssPath: 'styles',
  purifycssFile: [`${entryDir}/*.html`, `${entryDir}/**/*.js`],
  assetsPath: 'assets',
  moduleToDll: {
    react: ['react', 'react-dom', 'react-router-dom'],
  },
  dllFiles: ['react.dll.js', 'react.manifest.json'],
}

// 可选参数
const extraOptions = {
  // 是否抽离出 css
  // 选择 true 在开发模式中 react-hot-loader 不能热加载抽离出去的 css [https://github.com/gaearon/react-hot-loader]
  // 选择 false purifycss-webpack 不能去除无用的 css [https://github.com/FullHuman/purgecss-webpack-plugin]
  useCssExtract: false,
  copyConfig: {
    // 是否有不需要处理，直接拷贝的文件
    needsCopy: false,
    fromPath: `${entryDir}/docs`,
    toPath: `${outputDir}/docs`,
  },
}

module.exports = Object.assign(
  baseOptions,
  { entryDir, outputDir },
  extraOptions
)
