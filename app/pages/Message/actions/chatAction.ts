import { IRootAction, IRootStore } from 'typings'
import { request } from 'utils'
import { mAction } from '../../../mobx/action'

@mAction
export default class ChatAction {
  constructor(public stores: IRootStore['Message'], public actions: IRootAction['Message']) {}

  changeContent(content: string | undefined) {
    const { chatStore } = this.stores

    chatStore.setContent(content || '')
  }

  /**
   *
   *
   * @param {string} friendId 数据库中 friend model 的主键 _id
   * @param {string} receiverId
   * @memberof ChatAction
   */
  async sendMessage(friendId: string, receiverId: string) {
    const {
      messageStore: { wsRequest },
      chatStore,
    } = this.stores

    const { content, sending } = chatStore

    if (sending) {
      return
    }

    chatStore
      .setSending(true)
      .addMessage(await wsRequest.send(friendId, content, receiverId))
      .setContent('')
      .setSending(false)
  }

  async getMsgsByFriendId(friendId: string) {
    const { chatStore } = this.stores

    chatStore.setLoading(true)
    const { data } = await request.setPath('messages').get({ query: { friendId } })
    chatStore.setMessages(data).setLoading(false)

    return data[0] || {}
  }
}
