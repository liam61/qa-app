import { request, getUid } from 'utils'
import { IMessage, msgType } from './interface'

export default class WsRequest {
  ws: WebSocket

  receiverId = ''

  constructor(url: string, private userId: string, private onMsgCallback: (msg: IMessage) => void) {
    this.ws = new WebSocket(`${url}/${this.userId}`)

    this.initListeners()
  }

  initListeners() {
    this.ws.onopen = _event => {
      console.log('client connect')
      // this.ws.send('this is from client')
    }

    this.ws.onmessage = event => {
      // console.log(event.data)
      const message = JSON.parse(event.data)

      this.onMsgCallback(message)
    }

    this.ws.onclose = _event => {
      console.log('client disconnect')
    }

    this.ws.onerror = event => {
      console.log('client error', event)
    }
  }

  async send(
    friendId: string,
    content: string,
    receiverId: string = this.receiverId,
    type: msgType = 'text'
  ): Promise<IMessage> {
    const message: IMessage = { from: this.userId, to: receiverId, content, type }

    console.log('friendId', friendId)
    // const { _id } = await request.setPath('messages').post({ data: { friend: friendId, ...message } })
    await this.ws.send(JSON.stringify({ friend: friendId, ...message }))

    return { _id: getUid(), ...message }
  }

  close() {
    this.ws.close()
  }

  setReceiver(receiverId: string) {
    this.receiverId = receiverId
  }
}
