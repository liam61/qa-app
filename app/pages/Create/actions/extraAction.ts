import { mAction } from '../../../mobx/action'
import { IRootAction, IRootStore } from '../../../typings'
import { receiversType } from '../interface';

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
