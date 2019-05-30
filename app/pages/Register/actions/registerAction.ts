import { mAction } from '../../../mobx/action'
import { IRootAction, IRootStore } from '../../../typings'
import { IError } from '../../Login/interface'
import { request, validator } from '../../../utils'

@mAction
export default class RegisterAction {
  constructor(
    public stores: IRootStore['Register'],
    public actions: IRootAction['Register']
  ) {}

  validateUser(
    user: string,
    callback: (error: IError, validate?: string) => void
  ) {
    validator.name(user, callback)
  }

  validateEmail(
    email: string,
    callback: (error: IError, validate?: string) => void
  ) {
    validator.email(email, callback)
  }

  validatePhone(
    phone: string,
    callback: (error: IError, validate?: string) => void
  ) {
    validator.phone(phone, callback)
  }

  validatePassword(password: string, callback: (error: IError) => void) {
    validator.password(password, callback)
  }

  validatePsdConfirm(
    psdConfirm: string,
    password: string,
    callback: (error: IError) => void
  ) {
    validator.psdConfirm(psdConfirm, password, callback)
  }

  async signup(
    data: { name: string; email: string; password: string; validate: string },
    callback: (success: boolean) => void
  ) {
    // const { type } = await request.setPath('register').post({ data })
    const { name, password, validate } = data
    const { type } = await request
      .setPath('users/signup')
      .post({ data: { name, password, validate } })
    callback(type === 'success')
  }
}
