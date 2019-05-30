import { mAction } from '../../../mobx/action'
import { IRootAction, IRootStore } from '../../../typings'
import { request, validator, emptyFn } from '../../../utils'
import { IError } from '../interface'

@mAction
export default class LoginAction {
  constructor(
    public stores: IRootStore['Login'],
    public actions: IRootAction['Login'],
  ) {}

  validateAccount(
    account: string,
    callback: (error: IError, validate?: string) => void,
  ) {
    // const { loginStore } = this.stores
    validator.account(account, callback)
  }

  validatePassword(password: string, callback: (error: IError) => void) {
    validator.password(password, callback)
  }

  async login(
    data: { account: string; password: string; validate: string },
    callback: (success: boolean) => void,
  ) {
    const { loginStore } = this.stores

    const {
      data: { token, id },
    } = await request.setPath('users/login').post({ data })

    localStorage.setItem('token', token)
    localStorage.setItem('userId', id)

    callback(!!token)
  }
}
