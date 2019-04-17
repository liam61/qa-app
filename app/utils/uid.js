import { PREFIX } from '../common/global'

const now = +new Date()
let index = 0

export default function uid() {
  return `${PREFIX}-${now}-${++index}` // eslint-disable-line
}
