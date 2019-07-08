import { action, observable, computed } from 'mobx'
import { IFile } from '../interface'
import { mStore } from '../../../mobx/store'

@mStore
export default class InfoStore {
  @observable
  title = ''

  @observable
  content = ''

  @observable
  files: IFile[] = []

  @action
  setTitle(t: string) {
    this.title = t

    return this
  }

  @action
  setContent(c: string) {
    this.content = c

    return this
  }

  @action
  setFiles(f: IFile[]) {
    this.files = f

    return this
  }

  @action
  addFile(f: IFile) {
    this.files.push(f)

    return this
  }

  @action
  initStore() {
    this.title = ''
    this.content = ''
    this.files = []

    return this
  }
}
