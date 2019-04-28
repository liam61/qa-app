import { action, observable, computed } from 'mobx'
import { mStore } from '../../../mobx/store'

@mStore
export default class InfoStore {
  @observable
  title = ''

  @observable
  content = ''

  @observable
  files = [] as object[]

  @action
  setTitle(t: string) {
    this.title = t
  }

  @action
  setContent(c: string) {
    this.content = c
  }

  @action
  setFiles(f: object[]) {
    this.files = f
  }

  @action
  addFile(f: object) {
    this.files.push(f)
  }
}
