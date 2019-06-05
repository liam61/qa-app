import { action, observable, computed } from 'mobx'
import { mStore } from '../../../mobx/store'
import WsRequest from '../../../websocket'
import { IMessage } from '../../../websocket/interface'
import { IUser } from '../../User/stores/userStore'

export interface IFriend {
  _id: string
  user1: IUser
  user2: IUser
  applicant: string
  receiver: string
  success: boolean
  // status: 'sent' | 'fulfill' | 'reject';
  lastedMsg: IMessage
  createdAt: string
}

@mStore
export default class MessageStore {
  @observable
  wsRequest: WsRequest

  @observable
  search = ''

  @observable
  friends: IFriend[] = []

  @observable
  applies: IFriend[] = []

  @observable
  loadingFriends = true

  @observable
  loadingApplies = true

  @action
  setWsRequest(wsr: WsRequest) {
    this.wsRequest = wsr

    return this
  }

  @action
  setSearch(s: string) {
    this.search = s

    return this
  }

  @action
  setFriends(fs: IFriend[]) {
    this.friends = fs

    return this
  }

  @action
  setApplies(aps: IFriend[]) {
    this.applies = aps

    return this
  }

  @action
  setLoadFriends(flag: boolean) {
    this.loadingFriends = flag

    return this
  }

  @action
  setLoadApplies(flag: boolean) {
    this.loadingApplies = flag

    return this
  }
}
