import axios from 'axios'
import qs from 'qs'
import { Toast } from 'antd-mobile'
import { TOKEN, DELAY_TIME } from '../common/global'

// TODO: token 请求
const defaultOptions = {
  baseURL: 'https://mock.omyleon.com/mock/11/api',
  timeout: 6000,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json;charset=utf-8', // 跨域的时候会产生 options预检
    common: {
      Authorization: TOKEN,
    },
  },
}

interface IRequestOpts {
  uri: string
  query: object | null
  data: object
}

class Axios {
  [x: string]: any

  static instance: Axios

  axios: any

  methods = ['get', 'post', 'put', 'delete']

  path = ''

  constructor(options) {
    // this.options = options
    this.axios = axios.create(options)

    this.methods.forEach(method => {
      this[method] = (params: IRequestOpts) => this.request(method, params)
    })
  }

  static getInstance(options) {
    if (!this.instance) {
      this.instance = new Axios(options)
    }
    return this.instance
  }

  /**
   *
   *
   * @param {string} method
   * @param {string} [options={ uri: '', query: null, data: null }]
   * @param {string} [options.uri=''] 资源唯一标示，一般是 ID
   * @param {Object} [options.query=null] GET 参数
   * @param {Object} [options.data=null] POST/PUT/PATCH 数据
   * @returns {Promise<any>}
   */
  async request(
    method: string,
    options: IRequestOpts = { uri: '', query: null, data: {} },
  ): Promise<any> {
    const { uri, query, data } = options

    let url = this.path + (uri ? `/${uri}` : '')
    url += query ? `?${qs.stringify(query)}` : ''

    // return new Promise((resolve, reject) => {
    //   this.axios[method](url, data)
    //     .then((res: any) => resolve(res))
    //     .catch(err => {
    //       Toast.fail('网络错误！', DELAY_TIME)
    //       console.log(err)
    //       reject(err)
    //     })
    // })

    let result = {}

    try {
      const response = await this.axios[method](url, data)

      const { status, data: res } = response
      const { errcode, errmsg } = res

      if (status === 200 && !errcode) {
        result = res
      } else {
        throw new Error(`${errcode}: ${errmsg}`)
      }
    } catch (err) {
      Toast.fail(err.toString(), DELAY_TIME)
      console.error(err)
    }

    return result
  }

  setPath(...paths: string[]) {
    this.path += `/${paths.join('/')}`

    return this
  }

  /**
   * 替换链接
   *
   * @param {*} [options={}]
   * @memberof Axios
   */
  replace(options: object = {}) {
    Object.keys(options).forEach(key => {
      this.path = this.path.replace(new RegExp(`{${key}}`, 'img'), options[key])
    })

    return this
  }
}

export default Axios.getInstance(defaultOptions)
