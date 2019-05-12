import { IResponse } from '../../Register/actions/registerAction'
import { mAction } from '../../../mobx/action'
import { IRootAction, IRootStore } from '../../../typings'
import request from '../../../utils/request'

@mAction
export default class LoginAction {
  constructor(
    public stores: IRootStore['Login'],
    public actions: IRootAction['Login']
  ) {
    request.setPath('login')
  }

  async validateAccount(account: string, callback: (data: IResponse) => void) {
    callback(await request.get({ query: { account } }))
  }

  async login(
    data: { account: string; password: string },
    callback: (data: IResponse) => void
  ) {
    callback(await request.post({ data }))
  }
}
