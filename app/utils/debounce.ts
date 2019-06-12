import { emptyFn } from './index'

let timerId: any

function debounce(fn: (...rest: any) => void, always: (...rest: any) => void = emptyFn, delay = 500) {
  return (...rest: any) => {
    if (timerId) {
      clearTimeout(timerId)
    }

    always(...rest)

    timerId = setTimeout(() => fn(...rest), delay)
  }
}

export default debounce
