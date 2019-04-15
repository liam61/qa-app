// https://www.jianshu.com/p/477ae5cac982
// https://mobilesite.github.io/2018/02/05/vm-mobile-layout/

function getPostcssConfig({ file, options, env }) { // eslint-disable-line
  return {
    parser: file.extname === '.sss' ? 'sugarss' : false, // Handles `.css` && '.sss' files dynamically
    exec: true, // css-in-js
    plugins: {
      // 'postcss-import': {}, // css-loader handles @import no need for this plugin in webpack
      'postcss-url': {},
      'postcss-cssnext': {},
      // 'autoprefixer': {},
      'postcss-aspect-ratio-mini': {},
      'postcss-viewport-units': {},
      'postcss-nested': {},
      'postcss-write-svg': {
        utf8: false
      },
      'precss': {},
      'postcss-px-to-viewport': {
        viewportWidth: 750,
        viewportHeight: 1334,
        unitPrecision: 3,
        viewportUnit: 'vw',
        selectorBlackList: ['.ignore'],
        minPixelValue: 1,
        mediaQuery: false
      },
      'cssnano':  env === 'production'  ? {} : false
    }
  }
}

module.exports = getPostcssConfig
