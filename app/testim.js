// import { fromJS, is } from 'immutable'
const { fromJS, is } = require('immutable')

const a = [
  {
    title: 'aa',
    options: [
      {
        id: '2',
        value: 'bb',
      },
    ],
  },
]

const b = [
  {
    title: 'aa',
    options: [
      {
        id: '2',
        value: 'bb',
      },
    ],
  },
]

console.log(is(fromJS(a), fromJS(b)))
