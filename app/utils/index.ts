import uid from 'uid'
import { PREFIXCLS } from 'common'
import formatDate from './format'
import debounce from './debounce'
import request from './request'
import validator from './validator'

function getUid(len = 10) {
  return `${PREFIXCLS}-${uid(len)}`
}

// tslint:disable-next-line: no-empty
function emptyFn() {}

function getRandomImg(size = 19) {
  // tslint:disable-next-line: no-var-requires
  return require(`assets/images/random/material-${Math.ceil(Math.random() * size)}.png`)
}

/**
 * 数字递增加载动画
 * TODO: 使用 raf 来完成
 *
 * @param {number} toCount 目标值
 * @param {(count: number, next: () => void) => void} callback 针对于 setState 抽离的回调函数
 * @param {number} [initValue=0] 初始值
 * @param {number} [during=700] 动画总时间
 * @param {number} [delay=20] 每次变化间隔时间
 * @returns
 */
function increaseCount(
  toCount: number,
  callback: (count: number, next: () => void) => void,
  initValue = 0,
  during = 700,
  delay = 20
) {
  const step = (toCount * delay) / during <= 1 ? 1 : Math.floor((toCount * delay) / during)

  let curCount = initValue

  function increase(count: number) {
    if (count < toCount) {
      curCount = count + step >= toCount ? toCount : count + step
      callback(curCount, () => setTimeout(() => increase(curCount), (during * step) / toCount))
    }
  }

  return increase(curCount)
}

// this.increaseCount('readNum', read, 700)
// 未抽离版
// increaseCount = (key: string, toCount: number, during = 500, delay = 20) => {
//   const that = this
//   const step =
//     (toCount * delay) / during <= 1
//       ? 1
//       : Math.floor((toCount * delay) / during)
//   return (function increase() {
//     const { [key]: count } = that.state
//     if (count < toCount) {
//       that.setState(
//         { [key]: count + step >= toCount ? toCount : count + step },
//         () => setTimeout(() => increase(), (during * step) / toCount)
//       )
//     }
//   })()
// }

async function uploadFile(file: any, key: string) {
  const data = new FormData()
  data.append('file', file)
  data.append('key', key)

  return await request.upload(data, (process: any) => console.log(process))
}

function getLocalDate(date: Date) {
  return date.toLocaleString('zh', { hour12: false }).replace(/\//g, '-')
  // return date.toLocaleString().replace(/\//g, '-')
}

function getDaysOfYear(date: Date) {
  const firstDayOfYear = new Date(date.getFullYear(), 0, 1)
  const dateDiff = +date - +firstDayOfYear
  const msPerDay = 1000 * 60 * 60 * 24
  return Math.ceil(dateDiff / msPerDay)
}

export {
  getUid,
  emptyFn,
  formatDate,
  debounce,
  request,
  getRandomImg,
  increaseCount,
  validator,
  uploadFile,
  getLocalDate,
  getDaysOfYear,
}
