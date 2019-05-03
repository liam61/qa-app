import { toJS } from 'mobx'
import { mAction } from '../../../mobx/action'
import { IRootAction, IRootStore } from '../../../typings'

@mAction
export default class InfoAction {
  constructor(
    public stores: IRootStore['Create'],
    public actions: IRootAction['Create'],
  ) {}

  updateInfo(title: string, content: string, files: object[]) {
    const { infoStore } = this.stores

    infoStore.setTitle(title)
    infoStore.setContent(content)
    infoStore.setFiles(files)
  }

  getInfo() {
    const { infoStore } = this.stores
    const { title, content, files } = infoStore

    return {
      title,
      content,
      files: toJS(files),
    }
  }
}
