import { IUser } from 'pages/User/stores/userStore'
import { Toast } from 'antd-mobile'
import { WS_URL, DELAY_TIME } from 'common'
import { IRootAction, IRootStore } from 'typings'
import WsRequest from 'websocket'
import { IMessage } from 'websocket/interface'
import { request, validator } from 'utils'
import { mAction } from '../../../mobx/action'
import { IFriend } from '../stores/messageStore'

@mAction
export default class MessageAction {
  constructor(public stores: IRootStore['Message'], public actions: IRootAction['Message']) {}

  initWebSocket() {
    const { messageStore, chatStore } = this.stores

    const id = localStorage.getItem('userId') || ''

    messageStore.setWsRequest(new WsRequest(WS_URL, id, (msg: IMessage) => chatStore.addMessage(msg)))
  }

  changeSearch(search: string | undefined) {
    const { messageStore } = this.stores

    messageStore.setSearch(search || '')
  }

  async getFriends(): Promise<IFriend[]> {
    const { messageStore } = this.stores

    messageStore.setLoadFriends(true)
    const { data = [] } = await request.setPath('friends').get()
    messageStore.setFriends(data).setLoadFriends(false)

    return data
  }

  // async applyRootUser() {
  //   const { hasError } = await validator.account(ROOT_USER)
  //   if (!hasError) {
  //     await request.setPath('friends').post({ data: { account: ROOT_USER } })
  //   }
  // }

  async getApplies() {
    const { messageStore } = this.stores

    messageStore.setLoadApplies(true)
    const { data = [] } = await request.setPath('friends/applies').get()
    messageStore.setApplies(data).setLoadApplies(false)
  }

  async applyByAccount(account: string, me: IUser, callback: () => void) {
    console.log(me)
    const { name, email, phone } = me

    if ([name, email, phone].includes(account)) {
      Toast.fail('不能添加自己为好友！', DELAY_TIME)
      return
    }

    const { hasError } = await validator.account(account)

    if (!hasError) {
      const { type } = await request.setPath('friends').post({ data: { account } })

      callback()

      if (type === 'success') {
        Toast.success('请求发送成功！', DELAY_TIME)
        return
      }

      Toast.fail('已为好友或已向该用户发送过请求！', DELAY_TIME)
      return
    }

    Toast.fail('用户名/邮箱/手机号不存在！', DELAY_TIME)
  }

  async applyAgreed(id: string) {
    const { chatAction } = this.actions

    const { data = {} } = await request.setPath('friends').patch({ uri: id })

    if (data) {
      Toast.success('添加成功！', DELAY_TIME)

      chatAction.changeContent('我们已经是好友了，开始聊天吧！')
      await chatAction.sendMessage(id, data.applicant)
      await this.getFriends()

      return
    }

    Toast.fail('添加失败！', DELAY_TIME)
  }

  async applyRefused(id: string) {
    await request.setPath('friends').delete({ uri: id })

    Toast.success('请求已忽略！', DELAY_TIME)
  }
}
