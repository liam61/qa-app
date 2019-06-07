import { mAction } from '../../../mobx/action'
import { IRootAction, IRootStore } from 'typings'
import { IError } from '../../Login/interface'
import { request, validator } from 'utils'

@mAction
export default class RegisterAction {
  constructor(public stores: IRootStore['Register'], public actions: IRootAction['Register']) {}

  validateUser(user: string, callback: (error: IError, validate?: string) => void) {
    validator.name(user, callback)
  }

  validateEmail(email: string, callback: (error: IError, validate?: string) => void) {
    validator.email(email, callback)
  }

  validatePhone(phone: string, callback: (error: IError, validate?: string) => void) {
    validator.phone(phone, callback)
  }

  validatePassword(password: string, callback: (error: IError) => void) {
    validator.password(password, callback)
  }

  validatePsdConfirm(psdConfirm: string, password: string, callback: (error: IError) => void) {
    validator.psdConfirm(psdConfirm, password, callback)
  }

  async signup(data: any, callback: (success: boolean) => void) {
    // const { type } = await request.setPath('register').post({ data })
    // const { name, password, validate } = data
    const { type } = await request.setPath('users/signup').post({ data })

    callback(type === 'success')
  }

  async getDepartments() {
    const { registerStore } = this.stores

    registerStore.setLoading(true)

    const { data } = await request.setPath('departments').get()

    registerStore.setDepartments(data).setLoading(false)
  }
}
