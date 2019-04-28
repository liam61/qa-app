import { action, observable, computed } from 'mobx'
import { mStore } from '../../../mobx/store'

// interface ISomething {

// }

@mStore
export default class ExtraStore {
  @observable
  type = ''

  @observable
  time = ''

  @observable
  receiver = []

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
  setTime(t: string) {
    this.time = t
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
