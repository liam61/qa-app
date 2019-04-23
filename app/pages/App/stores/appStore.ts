import { action, observable, computed } from 'mobx'
import { mStore } from '../../../mobx/store'

// interface ISomething {

// }

@mStore
export default class AppStore {
  @observable
  curTab = 0

  @action
  setCurTab(index: number) {
    this.curTab = index
  }
}
