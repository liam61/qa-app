import { action, observable, computed } from 'mobx'
import { mStore } from '../../../mobx/store'

export interface IFile {
  id: string
  url: string
  name?: string
  size?: string
}

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
  }

  @action
  setContent(c: string) {
    this.content = c
  }

  @action
  setFiles(f: IFile[]) {
    this.files = f
  }

  @action
  addFile(f: IFile) {
    this.files.push(f)
  }
}
