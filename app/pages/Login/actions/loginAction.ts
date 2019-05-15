import { mAction } from '../../../mobx/action'
import { IRootAction, IRootStore } from '../../../typings'
import { request, validator } from '../../../utils'
import { IError } from '../interface'

@mAction
export default class LoginAction {
  constructor(
    public stores: IRootStore['Login'],
    public actions: IRootAction['Login'],
  ) {}

  validateAccount(account: string, callback: (error: IError) => void) {
    validator.account(account, callback)
  }

  async login(
    data: { account: string; password: string },
    callback: (success: boolean) => void,
  ) {
    const { status } = await request.setPath('login').post({ data })
    callback(status === 'success')
  }
}
