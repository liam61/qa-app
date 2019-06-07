import axios, {
  AxiosRequestConfig,
  AxiosInstance,
  AxiosResponse,
  Canceler,
} from 'axios'
import qs from 'qs'
import { Toast } from 'antd-mobile'
import { DELAY_TIME } from 'common'
import { IReqOptions, IResponse } from '../interface'

// examples:
// const result = await request.setPath('user').get({ uri: 'Dolor' })
// const result = await request.setPath('user').delete({ uri: 'Dolor' })
// const result = await request.setPath('user').post({
//   data: { name: 'lawler', email: 'admin@omyleon.com' },
// })
// const result = await request.put({
//   uri: 'Dolor',
//   data: { name: 'Bolor' },
// })

const defaultOptions: AxiosRequestConfig = {
  // baseURL: 'https://mock.omyleon.com/mock/11/api/v1',
  baseURL:
    process.env.NODE_ENV === 'development'
      ? 'http://localhost:4000/v1'
      : 'https://mock.omyleon.com/mock/11/api/v1',
  timeout: 6000,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json;charset=utf-8', // 跨域的时候会产生 options预检
  },
}

const { CancelToken } = axios

class Request {
  [x: string]: any

  static instance: Request

  request: AxiosInstance

  cancel: Canceler

  methods = ['get', 'post', 'put', 'patch', 'delete']

  path = ''

  curPath = ''

  constructor(options: AxiosRequestConfig) {
    this.request = axios.create(options)

    this.methods.forEach(method => {
      this[method] = (params: IReqOptions) => this.getRequest(method, params)
    })

    this.upload = (data: object, callback: (process: any) => void) =>
      this.getUploader(data, callback)

    this.initInterceptors()
  }

  static getInstance(options: AxiosRequestConfig) {
    if (!this.instance) {
      this.instance = new Request(options)
    }
    return this.instance
  }

  initInterceptors() {
    this.request.interceptors.request.use((config: AxiosRequestConfig) => {
      const token = localStorage.getItem('token')

      if (token) {
        config.headers.Authorization = `Bearer ${token}`
      }

      return config
    })

    this.request.interceptors.response.use(
      (res: AxiosResponse<any>) => {
        if (res.status === 401) {
          Toast.fail('认证失败，请登录后再操作', DELAY_TIME)
          console.log('跳转到 /login')
        }

        return res
      },
      err => {
        throw err
      }
    )
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
  async getRequest(
    method: string,
    options: IReqOptions = { uri: '', query: null, data: {} }
  ): Promise<any> {
    const { uri, query, data } = options

    let url = this.curPath + (uri ? `/${uri}` : '')
    url += query ? `?${qs.stringify(query)}` : ''

    let result: any = {}

    if (data && data.cancelToken) {
      // An executor function receives a cancel function as a parameter
      data.cancelToken = new CancelToken(c => (this.cancel = c))
    }

    try {
      const { data: response } = await this.request[method](url, data)
      // console.log(response)
      const { errcode, errmsg } = response

      if (!errcode) {
        result = response
      } else {
        throw new Error(`${errcode}: ${errmsg}`)
      }
    } catch (err) {
      Toast.fail(err.message, DELAY_TIME)
      console.error(err)
    }

    return result
  }

  async getUploader(
    data: any = {},
    callback: (process: any) => void
  ): Promise<any> {
    let result: any = {}

    if (data && data.cancelToken) {
      // An executor function receives a cancel function as a parameter
      data.cancelToken = new CancelToken(c => (this.cancel = c))
    }

    try {
      const response: IResponse = await this.request.put('/upload', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: (progressEvent: any) => {
          const { loaded, total } = progressEvent

          // callback(((loaded * 100) / total).toFixed(2))
          callback(`${Math.round((loaded * 10000) / total) / 100}%`)
        },
      })

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
    this.curPath = `${this.path}/${paths.join('/')}`

    return this
  }

  /**
   * 替换链接参数
   *
   * @param {...string[]} params
   */
  replace(...params: string[]) {
    let count = 0
    // questions/{id}/details/{ab}/c
    this.curPath = this.curPath.replace(/\{.*?\}/g, match => params[count++])

    return this
  }
}

export default Request.getInstance(defaultOptions)
