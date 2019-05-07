import { toJS } from 'mobx'
import { mAction } from '../../../mobx/action'
import { IRootAction, IRootStore } from '../../../typings'

@mAction
export default class ExtraAction {
  constructor(
    public stores: IRootStore['Create'],
    public actions: IRootAction['Create'],
  ) {}

  // updateType(type: string) {
  //   const { extraStore } = this.stores
  //   extraStore.setType(type)
  // }

  // updateTime(time: string) {
  //   const { extraStore } = this.stores
  //   extraStore.setTime(time)
  // }

  updateExtra(
    type: string,
    expire: string,
    receiver: object[],
    showAuthor: boolean,
    secret: boolean,
    anonymous: boolean,
  ) {
    const { extraStore } = this.stores
    extraStore
      .setType(type)
      .setExpire(expire)
      .setReceiver(receiver)
      .setShowAuthor(showAuthor)
      .setSecret(secret)
      .setAnonymous(anonymous)
  }

  getExtra() {
    const { extraStore } = this.stores
    const { type, expire, receiver, showAuthor, secret, anonymous } = extraStore

    return {
      type,
      expire,
      receiver: toJS(receiver),
      showAuthor,
      secret,
      anonymous,
      date: Date.now().toString(),
    }
  }
}
