import { DELAY_TIME } from 'common'
import { Toast } from 'antd-mobile'
import { IRootAction, IRootStore } from 'typings'
import { request, validator, emptyFn } from 'utils'
import { mAction } from '../../../mobx/action'
import { IError } from '../interface'

@mAction
export default class LoginAction {
  constructor(public stores: IRootStore['Login'], public actions: IRootAction['Login']) {}

  validateAccount(account: string, callback: (error: IError, validate?: string) => void) {
    // const { loginStore } = this.stores
    validator.account(account, callback)
  }

  validatePassword(password: string, callback: (error: IError) => void) {
    validator.password(password, callback)
  }

  async login(data: { account: string; password: string; validate: string }, callback: (success: boolean) => void) {
    const { loginStore } = this.stores

    const { data: res = {}, type } = await request.setPath('users/login').post({ data })

    if (type === 'success') {
      const { token, id } = res

      localStorage.setItem('token', token)
      localStorage.setItem('userId', id)
    }

    callback(type === 'success')
  }
}
