import { mAction } from '../../../mobx/action'
import { IRootAction, IRootStore } from '../../../typings'
import { IError } from '../../Login/interface'
import { InfoTypes } from '../../../components/InfoModal'
import { request, validator } from '../../../utils'

export interface IResponse {
  status: InfoTypes
}

@mAction
export default class RegisterAction {
  constructor(
    public stores: IRootStore['Register'],
    public actions: IRootAction['Register'],
  ) {}

  validateUser(user: string, callback: (error: IError) => void) {
    validator.username(user, callback)
  }

  validateEmail(email: string, callback: (error: IError) => void) {
    validator.email(email, callback)
  }

  validatePassword(password: string, callback: (error: IError) => void) {
    validator.password(password, callback)
  }

  validatePsdConfirm(
    psdConfirm: string,
    password: string,
    callback: (error: IError) => void,
  ) {
    validator.psdConfirm(psdConfirm, password, callback)
  }

  async register(
    data: { user: string; email: string; password: string },
    callback: (success: boolean) => void,
  ) {
    const { status } = await request.setPath('register').post({ data })
    callback(status === 'success')
  }
}
