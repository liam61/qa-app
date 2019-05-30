import { mAction } from '../../../mobx/action'
import { request, validator, uploadFile } from '../../../utils'
import { IError } from '../../Login/interface'
import { IRootAction, IRootStore } from '../../../typings'

@mAction
export default class UserAction {
  // uploadFile: (file: any, key: string) => Promise<any>

  constructor(
    public stores: IRootStore['User'],
    public actions: IRootAction['User']
  ) {
    // this.uploadFile = uploadFile
  }

  changeCover(cover: string) {
    const { userStore } = this.stores

    userStore.setCover(cover)
  }

  async getUserData() {
    const { userStore } = this.stores

    userStore.setLoading(true)

    const id = localStorage.getItem('userId')
    const { data } = await request
      .setPath('users')
      .get({ uri: id, data: { cancelToken: true } })

    userStore.setUserData(data).setLoading(false)
  }

  async uploadFile(
    file: any,
    key: string,
    callback: (success: boolean) => void
  ) {
    const { userStore } = this.stores

    const formData = new FormData()
    formData.append('file', file)
    formData.append('key', key)

    const {
      data: { url },
    } = await request.upload(formData, (process: any) => console.log(process))

    userStore.updateDataByKey(key, url)

    const { type } = await request.setPath('users').put({
      uri: userStore.data._id,
      data: { [key]: url },
    })

    const success = type === 'success'

    success ? userStore.advanceBakData() : userStore.rollbackData()
    callback(success)
  }

  updateUserDataByKey(
    key: string,
    value: string,
    callback: (error: IError) => void
  ) {
    const { userStore } = this.stores

    userStore.updateDataByKey(key, value)

    if (validator[key]) {
      validator[key](value, callback)
    }
  }

  async submitUserData(callback: (success: boolean) => void) {
    const { userStore } = this.stores

    userStore.setUpdating(true)

    const { type } = await request.setPath('users').put({
      uri: localStorage.getItem('userId'),
      data: userStore.data,
    })

    const success = type === 'success'

    success ? userStore.advanceBakData() : userStore.rollbackData()
    callback(success)

    userStore.setUpdating(false)
  }

  cancel() {
    request.cancel('用户手动取消请求！')
  }
}
