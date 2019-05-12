import { mAction } from '../../../mobx/action'
import { IRootAction, IRootStore } from '../../../typings'
import { InfoTypes } from '../../../components/InfoModal'
import request from '../../../utils/request'

export interface IResponse {
  status: InfoTypes
}

@mAction
export default class RegisterAction {
  constructor(
    public stores: IRootStore['Register'],
    public actions: IRootAction['Register']
  ) {
    request.setPath('register')
  }

  async validateUser(user: string, callback: (data: IResponse) => void) {
    callback(await request.get({ query: { username: user } }))
  }

  async validateEmail(email: string, callback: (data: IResponse) => void) {
    callback(await request.get({ query: { email } }))
  }

  async register(
    data: { user: string; email: string; password: string },
    callback: (data: IResponse) => void
  ) {
    callback(await request.post({ data }))
  }
}
