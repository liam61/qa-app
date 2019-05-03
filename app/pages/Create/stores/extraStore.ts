import { action, observable, computed } from 'mobx'
import { mStore } from '../../../mobx/store'

// interface ISomething {

// }

@mStore
export default class ExtraStore {
  @observable
  type = ''

  @observable
  expire = ''

  @observable
  receiver = [] as object[]

  @observable
  showAuthor = true

  @observable
  secret = false

  @observable
  anonymous = false

  @action
  setType(t: string) {
    this.type = t
  }

  @action
  setExpire(t: string) {
    this.expire = t
  }

  @action
  setReceiver(r: object[]) {
    this.receiver = r
  }

  @action
  setShowAuthor(s: boolean) {
    this.showAuthor = s
  }

  @action
  setSecret(s: boolean) {
    this.secret = s
  }

  @action
  setAnonymous(a: boolean) {
    this.secret = a
  }
}
