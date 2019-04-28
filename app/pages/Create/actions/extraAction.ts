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
    time: string,
    receiver: object[],
    showAuthor: boolean,
    secret: boolean,
    anonymous: boolean,
  ) {
    const { extraStore } = this.stores
    extraStore.setType(type)
    extraStore.setTime(time)
    extraStore.setReceiver(receiver)
    extraStore.setShowAuthor(showAuthor)
    extraStore.setSecret(secret)
    extraStore.setAnonymous(anonymous)
  }

  getExtra() {
    const { extraStore } = this.stores
    const { type, time, receiver, showAuthor, secret, anonymous } = extraStore

    return {
      type,
      time,
      receiver,
      showAuthor,
      secret,
      anonymous,
    }
  }
}
