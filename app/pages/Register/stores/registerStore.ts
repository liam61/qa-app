import { action, observable, computed } from 'mobx'
import { INoError } from '../../Login/interface'
import { mStore } from '../../../mobx/store'

const noError: INoError = { hasError: false, error: '' }

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
  setUserInfo(ui: INoError) {
    this.userInfo = ui
  }

  @action
  setEmailInfo(ei: INoError) {
    this.emailInfo = ei
  }

  @action
  setPasswordInfo(pi: INoError) {
    this.passwordInfo = pi
  }

  @action
  setPsdConfirmInfo(pi: INoError) {
    this.psdConfirmInfo = pi
  }

  @action
  setLoading(flag: boolean) {
    this.loading = flag
  }
}
