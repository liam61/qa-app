import { action, observable, computed } from 'mobx'
import { mStore } from '../../../mobx/store'

@mStore
export default class AboutStore {
  @observable
  resume = ''

  @action
  setResume(url: string) {
    this.resume = url
  }
}
