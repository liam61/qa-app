import { mAction } from '../../../mobx/action'
import { request, validator } from '../../../utils'
import { IError } from '../../Login/interface'
import { IRootAction, IRootStore } from '../../../typings'

@mAction
export default class UserAction {
  constructor(
    public stores: IRootStore['User'],
    public actions: IRootAction['User'],
  ) {}

  changeCover(cover: string) {
    const { userStore } = this.stores

    userStore.setCover(cover)
  }

  async getData(id: string) {
    const { userStore } = this.stores

    userStore
      .setLoading(true)
      .setData(await request.setPath('users').get({ uri: id }))
      .setLoading(false)
  }

  uploadFile(file: any, key: string) {
    const data = new FormData()
    data.append('file', file)
    data.append('key', key)

    request.upload(data, (process: any) => console.log(process))
  }

  updateUserDataByKey(
    key: string,
    value: string,
    callback: (error: IError) => void,
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

    // TODO: 获取用户id
    const { status } = await request
      .setPath('users')
      .setPath('users')
      .put({
        uri: 'lawler',
        data: userStore.data,
      })

    const success = status === 'success'

    success ? userStore.advanceBakData() : userStore.rollbackData()
    callback(success)

    userStore.setUpdating(false)
  }
}
