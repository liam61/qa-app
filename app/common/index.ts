const PREFIXCLS = 'qa'
const HOST = process.env.NODE_ENV === 'development' ? 'localhost' : 'omyleon.com'
// const HOST = 'localhost'
const SERVER_PORT = 6260
const API_VERSION = 'v1'
const API_URL = `http://${HOST}:${SERVER_PORT}/${API_VERSION}`
// const API_URL = 'https://mock.omyleon.com/mock/11/api/v1'

const QUESTION_TYPES = [
  { key: 'Single', value: '单选题' },
  { key: 'Multiple', value: '多选题' },
  { key: 'Answer', value: '问答题' },
  { key: 'Judge', value: '判断题' },
  { key: 'Vote', value: '投票' },
]

const TYPE_OPTIONS = [
  { key: 'notice', value: '公告' },
  { key: 'exam', value: '测试' },
  { key: 'vote', value: '投票' },
  { key: 'collect', value: '资料收集' },
]

const TIME_OPTIONS = [
  { value: '永久', key: 'permanent' },
  { value: '一天', key: 'day' },
  { value: '一周', key: 'week' },
  { value: '一个月', key: 'month' },
]

const DELAY_TIME = 2.5

const USER_REG = /^(?=.{6,12}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/
const EMAIL_REG = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
const PASSWORD_REG = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/
const PHONE_REG = /^(?:\+?86)?1(?:3\d{3}|5[^4\D]\d{2}|8\d{3}|7(?:[35678]\d{2}|4(?:0\d|1[0-2]|9\d))|9[189]\d{2}|66\d{2})\d{6}$/

const ACCEPT_EXTS = ['image/png', 'image/jpg', 'image/jpeg', 'image/gif']

const WS_PATH = `ws://${HOST}:${SERVER_PORT}/ws`

const ROOT_USER = 'lawler'

export {
  PREFIXCLS,
  QUESTION_TYPES,
  TYPE_OPTIONS,
  TIME_OPTIONS,
  DELAY_TIME,
  USER_REG,
  EMAIL_REG,
  PASSWORD_REG,
  PHONE_REG,
  ACCEPT_EXTS,
  WS_PATH,
  ROOT_USER,
  API_URL,
}
