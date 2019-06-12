import { action, observable, computed } from 'mobx'
import { IUser } from 'pages/User/stores/userStore'
import { IError } from '../../Login/interface'
import { mStore } from '../../../mobx/store'

const noError: IError = { hasError: false, error: '' }

export interface IDepartment {
  _id: string
  name: string
  description: string
  staff?: Array<{ _id: string; user: IUser }>
}

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
  loadingDpts = true

  @observable
  departments: IDepartment[] = []

  @action
  setUser(u: string) {
    this.user = u

    return this
  }

  @action
  setEmail(e: string) {
    this.email = e

    return this
  }

  @action
  setPassword(p: string) {
    this.password = p

    return this
  }

  @action
  setPsdConfirm(p: string) {
    this.psdConfirm = p

    return this
  }

  @action
  setUserInfo(ui: IError) {
    this.userInfo = ui

    return this
  }

  @action
  setEmailInfo(ei: IError) {
    this.emailInfo = ei

    return this
  }

  @action
  setPasswordInfo(pi: IError) {
    this.passwordInfo = pi

    return this
  }

  @action
  setPsdConfirmInfo(pi: IError) {
    this.psdConfirmInfo = pi

    return this
  }

  @action
  setLoading(flag: boolean) {
    this.loadingDpts = flag

    return this
  }

  @action
  setDepartments(dpts: IDepartment[]) {
    this.departments = dpts

    return this
  }
}
