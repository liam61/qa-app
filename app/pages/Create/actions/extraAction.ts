import { IRootAction, IRootStore } from 'typings'
import { request } from 'utils'
import { mAction } from '../../../mobx/action'
// import { IFriend } from 'pages/Message/stores/messageStore'

@mAction
export default class ExtraAction {
  constructor(public stores: IRootStore['Create'], public actions: IRootAction['Create']) {}

  updateExtra(type: string, expire: string, showAuthor: boolean, secret: boolean, anonymous: boolean) {
    const { extraStore } = this.stores

    extraStore
      .setType(type)
      .setExpire(expire)
      .setShowAuthor(showAuthor)
      .setSecret(secret)
      .setAnonymous(anonymous)
  }

  toggleReceiver(dptId: string, userId: string) {
    const { extraStore } = this.stores

    const checked = extraStore.receivers[dptId][userId]

    extraStore.toggleReceiver(dptId, userId, !checked)
  }

  toggleDepartment(dptId: string) {
    const { extraStore } = this.stores

    const checked = extraStore.receivers[dptId][dptId]

    extraStore.toggleDepartment(dptId, !checked)
  }

  async getDepsAndUsers() {
    const { extraStore } = this.stores

    const { data = [] } = await request.setPath('departments').get()

    extraStore.setDptsWithUsers(data)

    extraStore.departments.forEach(dpt => {
      const { _id: dptId } = dpt

      extraStore.receivers[dptId] = { [dptId]: false, count: 0 }
      dpt!.staff!.forEach(s => (extraStore.receivers[dptId][s.user._id] = false))
    })
  }

  getExtra() {
    const { extraStore } = this.stores
    const { type, expire, receivers, showAuthor, secret, anonymous } = extraStore

    const receiversToSend = Object.keys(receivers).reduce(
      (arr, dptId) => {
        const dpt = receivers[dptId]
        const users = Object.keys(dpt).filter(key => key !== dptId && key !== 'count' && dpt[key])

        arr.push(...users)
        return arr
      },
      [] as string[]
    )

    return {
      type,
      expire,
      receivers: receiversToSend,
      showAuthor,
      secret,
      anonymous,
    }
  }
}
