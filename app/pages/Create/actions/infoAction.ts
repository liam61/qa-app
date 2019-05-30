import { mAction } from '../../../mobx/action'
import { IRootAction, IRootStore } from '../../../typings'
import { IFile } from '../interface'
import { uploadFile } from '../../../utils'

@mAction
export default class InfoAction {
  uploadFile: (file: any, key: string) => Promise<any>

  constructor(
    public stores: IRootStore['Create'],
    public actions: IRootAction['Create']
  ) {
    this.uploadFile = uploadFile
  }

  updateInfo(title: string, content: string, files: IFile[]) {
    const { infoStore } = this.stores

    infoStore
      .setTitle(title)
      .setContent(content)
      .setFiles(files)
  }

  getInfo() {
    const { infoStore } = this.stores
    const { title, content, files } = infoStore

    return {
      title,
      content,
      files,
    }
  }
}
