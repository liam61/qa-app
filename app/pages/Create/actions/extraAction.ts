import { mAction } from '../../../mobx/action'
import { IRootAction, IRootStore } from '../../../typings'
import { receiversType } from '../interface'
// import { IFriend } from '../../../pages/Message/stores/messageStore'
import { request } from '../../../utils'

@mAction
export default class ExtraAction {
  constructor(public stores: IRootStore['Create'], public actions: IRootAction['Create']) {}

  updateExtra(
    type: string,
    expire: string,
    receivers: receiversType,
    showAuthor: boolean,
    secret: boolean,
    anonymous: boolean,
  ) {
    const { extraStore } = this.stores
    extraStore
      .setType(type)
      .setExpire(expire)
      .setReceiver(receivers)
      .setShowAuthor(showAuthor)
      .setSecret(secret)
      .setAnonymous(anonymous)
  }

  async getFriends() {
    const { extraStore } = this.stores

    const { data } = await request.setPath('friends').get()

    extraStore.setFriends(data)
  }

  getExtra() {
    const { extraStore } = this.stores
    const { type, expire, receivers, showAuthor, secret, anonymous } = extraStore

    return {
      type,
      expire,
      receivers,
      showAuthor,
      secret,
      anonymous,
    }
  }
}
