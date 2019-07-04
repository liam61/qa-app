import * as React from 'react'
import { inject, observer } from 'mobx-react'
import { TextareaItem } from 'antd-mobile'
import { IRootStore, IRootAction } from 'typings'
import PageHeader from 'components/PageHeader'
import MessageItem from 'components/MessageItem'
import { IMessage } from 'websocket/interface'
import { getLocalDate, getDaysOfYear, emptyFn } from 'utils'

import './index.scss'
import ReactDOM from 'react-dom'
import { ROOT_USER } from 'common'
import { IFriend } from '../stores/messageStore'

let preDay = 0
let preDate = new Date(0)

const ENTER_KEY = 13

function getDateParamsOfMsg(curDate: Date) {
  const curDay = getDaysOfYear(curDate)

  let dayFlag = false
  let dateFlag = false

  if (curDay > preDay) {
    dayFlag = true
    preDay = curDay
  }

  if (+curDate - +preDate > 5 * 60 * 1000) {
    dateFlag = true
    preDate = curDate
  }

  return { dayFlag, dateFlag }
}

@inject(injector)
@observer
export default class Chat extends React.Component<IProps, IState> {
  static defaultProps = {
    prefixCls: 'page-message-chat',
  }

  msgBody: any

  textarea: React.ReactNode

  async componentDidMount() {
    const {
      action,
      friend: { _id },
    } = this.props

    await action!.getMsgsByFriendId(_id)

    this.msgBody = ReactDOM.findDOMNode(this.msgBody)

    this.msgBody.scrollIntoView({ block: 'end' })
  }

  // componentDidUpdate() {}

  handleSendMsg = () => {
    const { action, friend, store } = this.props
    const { _id, user2 } = friend

    if (!store!.content) {
      return
    }

    action!.sendMessage(_id, user2._id, () => {
      this.textarea.focus()
      this.msgBody.scrollIntoView({ block: 'end' })
    })
  }

  handleCntChange = (val: string | undefined) => {
    const { action } = this.props

    if (val === '\n') {
      return
    }

    action!.changeContent(val || '')
  }

  handleKeyDown = (ev: any) => {
    if (ev.keyCode !== ENTER_KEY) {
      return
    }

    this.handleSendMsg()
  }

  onBack = () => {
    const { onCancel, action } = this.props

    action!.changeContent('')
    onCancel()
  }

  renderMessages = (messages: IMessage[]) => {
    const {
      friend: { user1, user2 },
    } = this.props // me friend，传进来时已做完判断

    preDay = 0
    preDate = new Date(0)

    return messages.map(msg => {
      const meId = localStorage.getItem('userId')

      const { _id, from, content, createdAt = '' } = msg
      const fromMe = from === meId
      const { /* dayFlag, 5: 9 */ dateFlag } = getDateParamsOfMsg(new Date(createdAt))

      const props = Object.assign({
        content,
        fromMe,
        date: dateFlag ? getLocalDate(preDate).slice(5) : 'hidden',
        user: fromMe ? user1 : user2,
      })

      return <MessageItem key={_id} {...props} />
    })
  }

  render() {
    const {
      prefixCls,
      store,
      friend: { user2 },
    } = this.props

    const { content, sending, messages, loading } = store!

    return (
      <div className={prefixCls}>
        <PageHeader
          text={`与 ${user2.name}${user2.name === ROOT_USER ? ' (管理员)' : ''} 的聊天`}
          onCancel={this.onBack}
        />
        <div className={`${prefixCls}-body`} ref={(node: React.ReactNode) => (this.msgBody = node)}>
          {loading ? <h1>Loading...</h1> : this.renderMessages(messages)}
        </div>
        <div className={`${prefixCls}-footer`}>
          <TextareaItem
            ref={(node: React.ReactNode) => (this.textarea = node)}
            className={`${sending ? 'sending' : ''}`}
            placeholder="请填写内容"
            value={content}
            autoHeight
            count={50}
            onChange={this.handleCntChange}
            error
            onErrorClick={this.handleSendMsg}
            onKeyDown={this.handleKeyDown}
          />
        </div>
      </div>
    )
  }
}

type injectorReturnType = ReturnType<typeof injector>

interface IProps extends Partial<injectorReturnType> {
  prefixCls?: string
  friend: IFriend
  onCancel: () => void
}

interface IState extends Partial<injectorReturnType> {
  [key: string]: any
}

function injector({ rootStore, rootAction }: { rootStore: IRootStore; rootAction: IRootAction }) {
  return {
    store: rootStore.Message.chatStore,
    action: rootAction.Message.chatAction,
  }
}
