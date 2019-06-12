import { action, observable, computed } from 'mobx'
import { mStore } from '../../../mobx/store'
import { IMessage } from 'websocket/interface'

@mStore
export default class ChatStore {
  @observable
  content = ''

  @observable
  sending = false

  @observable
  loading = true

  @observable
  messages: IMessage[] = []

  @action
  setContent(c: string) {
    this.content = c

    return this
  }

  @action
  setSending(flag: boolean) {
    this.sending = flag

    return this
  }

  @action
  setLoading(flag: boolean) {
    this.loading = flag

    return this
  }

  @action
  setMessages(msgs: IMessage[]) {
    this.messages = msgs

    return this
  }

  @action
  addMessage(m: IMessage) {
    console.log(m);
    this.messages.push(m)

    return this
  }
}
