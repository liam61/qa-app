import { action, observable, computed } from 'mobx'
import { IError } from '../../Login/interface'
import { mStore } from '../../../mobx/store'

const noError: IError = { hasError: false, error: '' }

@mStore
export default class RegisterStore {
  @observable
  user = ''

  @observable
  email = ''

  @observable
  password = ''

  @observable
  psdConfirm = ''

  @observable
  userInfo = noError

  @observable
  emailInfo = noError

  @observable
  passwordInfo = noError

  @observable
  psdConfirmInfo = noError

  @observable
  loading = false

  @action
  setUser(u: string) {
    this.user = u
  }

  @action
  setEmail(e: string) {
    this.email = e
  }

  @action
  setPassword(p: string) {
    this.password = p
  }

  @action
  setPsdConfirm(p: string) {
    this.psdConfirm = p
  }

  @action
  setUserInfo(ui: IError) {
    this.userInfo = ui
  }

  @action
  setEmailInfo(ei: IError) {
    this.emailInfo = ei
  }

  @action
  setPasswordInfo(pi: IError) {
    this.passwordInfo = pi
  }

  @action
  setPsdConfirmInfo(pi: IError) {
    this.psdConfirmInfo = pi
  }

  @action
  setLoading(flag: boolean) {
    this.loading = flag
  }
}
