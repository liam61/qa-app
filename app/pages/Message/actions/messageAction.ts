import { IError } from 'app/pages/Login/interface'
import { WS_PATH } from '../../../common/global'
import { mAction } from '../../../mobx/action'
import { IRootAction, IRootStore } from '../../../typings'
import WsRequest from '../../../websocket'
import { IMessage } from '../../../websocket/interface'
import { request, validator } from '../../../utils'
import { IFriend } from '../stores/messageStore'

@mAction
export default class MessageAction {
  constructor(public stores: IRootStore['Message'], public actions: IRootAction['Message']) {}

  initWebSocket() {
    const { messageStore } = this.stores

    const id = localStorage.getItem('userId') || ''

    messageStore.setWsRequest(
      new WsRequest(WS_PATH, id, (msg: IMessage) => {
        console.log(msg)
      }),
    )
  }

  changeSearch(search: string | undefined) {
    const { messageStore } = this.stores

    messageStore.setSearch(search || '')
  }

  async getFriends(): Promise<IFriend[]> {
    const { messageStore } = this.stores
    // const { chatAction } = this.actions

    messageStore.setLoadFriends(true)

    const { data } = await request.setPath('friends').get()

    // data.forEach(async (friend: IFriend, i: number) => {
    //   console.log(friend._id)
    //   const { data: message } = await chatAction.getMsgsByFriendId(friend._id)
    //   friend.lastedMsg = message
    // })
    messageStore.setFriends(data).setLoadFriends(false)

    return data
  }

  async getApplies() {
    const { messageStore } = this.stores

    messageStore.setLoadApplies(true)

    const { data } = await request.setPath('friends/applies').get()

    messageStore.setApplies(data).setLoadApplies(false)
  }

  async searchUserByName(account: string) {
    const { hasError } = await validator.account(account)

    if (!hasError) {
      const { type } = await request.setPath('friends').post({ data: { name: account } })

      if (type === 'success') {
        console.log('发送成功！')
      }
    }
  }

  validateAccount(account: string, callback: (error: IError, validate?: string) => void) {
    // const { loginStore } = this.stores
    validator.account(account, callback)
  }

  async applyAgreed(id: string) {
    const { chatAction } = this.actions

    const { data }: any = await request.setPath('friends').patch({ uri: id })

    if (data) {
      chatAction.changeContent('我们已经是好友了，开始聊天吧！')
      chatAction.sendMessage(id, data.applicant)
    }
  }

  async applyRefused(id: string) {
    const { type } = await request.setPath('friends').delete({ url: id })
  }
}
