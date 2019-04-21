import { PREFIXCLS } from '../common/global'
import uid from 'uid'

export function formatDate(date: Date, fmt: string) {
  // 匹配以y开头的一个或多个字符串
  if (/(y+)/.test(fmt)) {
    // 拿到完整年份后，根据传入的y的个数进行截取，如传的是4，则从0截取，为2018，如传2个y则从2开始截取，为16
    fmt = fmt.replace(
      RegExp.$1,
      `${date.getFullYear()}`.substr(4 - RegExp.$1.length),
    )
  }
  const data = {
    'M+': date.getMonth() + 1, // 日期从0开始计算，要+1
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds(),
  }
  Object.keys(data).forEach(k => {
    if (new RegExp(`(${k})`).test(fmt)) {
      const str = `${data[k]}`
      // 对于月，日，时，分，秒 这种如果传的 M、d等个数是 1个的话，就显示一个，如果为 2，则要在数 < 10时添加 0
      fmt = fmt.replace(
        RegExp.$1,
        RegExp.$1.length === 1 ? str : padLeftZero(str),
      )
    }
  })
  return fmt
}

function padLeftZero(str: string) {
  return `00${str}`.substr(str.length)
}

export function getUid() {
  return PREFIXCLS + '-' + uid()
}
