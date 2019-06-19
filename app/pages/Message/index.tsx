import * as React from 'react'
import { inject, observer } from 'mobx-react'
import { SearchBar, Toast } from 'antd-mobile'
import PageModal from 'components/PageModal'
import FriendItem from 'components/FriendItem'
import InputModal from 'components/InputModal'
import AddFriendModal from 'components/AddFriendModal'
import { getLocalDate } from 'utils'
import { IRootStore, IRootAction } from 'typings'
import { IFriend } from './stores/messageStore'
import ChatPage from './Chat'

import './index.scss'
import { IUser } from 'pages/User/stores/userStore'
import { withRouter } from 'react-router'

let me: IUser

@inject(injector)
@observer
class Message extends React.Component<IProps, IState> {
  static defaultProps = {
    prefixCls: 'page-message',
  }

  state = {
    chatPageModal: false,
    friend4chat: {} as IFriend,
    inputModal: false,
    applyModal: false,
  }

  async componentDidMount() {
    const { action } = this.props

    action!.initWebSocket()

    await action!.getFriends()
    await action!.getApplies()
  }

  handleModalShow = (type: string) => {
    this.setState({ [type]: true })
  }

  handleModalClose = (type: string) => {
    this.setState({ [type]: false })
  }

  handleFriendChange = (friend: any) => {
    const { history } = this.props

    history.push(`/message?friend=${friend._id}`)

    this.setState({ friend4chat: friend, chatPageModal: true })
  }

  handleInputModalShow = () => {
    this.setState({ inputModal: true })
  }

  handleAddChange = (val: string) => {
    const { action } = this.props

    action!.applyByAccount(val, me, () => this.setState({ inputModal: false }))
  }

  // handleAccountChange = (val: string) => {
  //   const { action } = this.props
  //   action!.validateAccount(val, (errors: IError, validate?: string) => {
  //     console.log(errors)
  //   })
  // }

  handleApplyAgree = (id: string) => {
    const { action } = this.props

    action!.applyAgreed(id)

    this.setState({ applyModal: false })
  }

  handleApplyRefuse = (id: string) => {
    const { action } = this.props

    action!.applyRefused(id)

    this.setState({ applyModal: false })
  }

  handleAppliesShow = () => {
    this.setState({ applyModal: true })
  }

  handleChatPageModalClose = () => {
    const { action, history } = this.props

    action!.getFriends()

    history.goBack()
    this.setState({ chatPageModal: false })
  }

  renderFriends = (friends: IFriend[]) => {
    const userId = localStorage.getItem('userId')

    if (!friends.length) {
      return <div className="qa-no-more">没有更多好友</div>
    }

    return friends.map(friend => {
      let { _id, user1, user2, lastMessage } = friend // me friend

      if (userId === user2._id) {
        const temp = user1
        user1 = user2
        user2 = temp
      }

      if (!me) {
        me = user1
      }

      const { content, createdAt } = lastMessage

      return (
        <FriendItem
          key={_id}
          user={user2}
          content={`${content.slice(0, 16)}...`}
          date={getLocalDate(new Date(createdAt || 0)).slice(5)}
          onClick={() => this.handleFriendChange({ _id, user1, user2 })}
        />
      )
    })
  }

  render() {
    const { prefixCls, action, store } = this.props
    const { chatPageModal, friend4chat, inputModal, applyModal } = this.state

    const { friends, applies, loadingFriends } = store!

    if (!friends) {
      return <h1>Loading...</h1>
    }

    return (
      <div className={prefixCls}>
        <SearchBar value={store!.search} placeholder="搜索..." maxLength={20} onChange={action!.changeSearch} />
        <div className={`${prefixCls}-header qa-border-1px-bottom`}>
          <div className="applies" onClick={this.handleAppliesShow}>
            <span className="applies-info">好友请求</span>
            <span className="applies-count">{applies.length}</span>
          </div>
          <div className="add" onClick={this.handleInputModalShow} />
        </div>
        <div className={`${prefixCls}-lists`}>{loadingFriends ? <h1>Loading...</h1> : this.renderFriends(friends)}</div>
        <PageModal visible={chatPageModal}>
          {/* NOTE: modal 在 visible 为 false 时，会预加载内部组件，所以会预实例化 ChatPage，
          此时 _id 为空，所以在进入 Message 界面后，“实例化”的 ChatPage 也会发送一条请求为 localhost:4000/v1/messages
        */}
          <ChatPage friend={friend4chat} onCancel={this.handleChatPageModalClose} />
        </PageModal>
        <InputModal
          visible={inputModal}
          onOK={this.handleAddChange}
          onCancel={() => this.handleModalClose('inputModal')}
          title="添加好友"
          placeholder="请输入用户名/邮箱/手机号"
        />
        <AddFriendModal
          visible={applyModal}
          title="申请列表"
          applies={applies}
          onCancel={() => this.handleModalClose('applyModal')}
          onAgree={this.handleApplyAgree}
          onRefuse={this.handleApplyRefuse}
        />
      </div>
    )
  }
}

type injectorReturnType = ReturnType<typeof injector>

interface IProps extends Partial<injectorReturnType> {
  prefixCls?: string
  history: any
}

interface IState extends Partial<injectorReturnType> {
  chatPageModal: boolean
  friend4chat: IFriend
  inputModal: boolean
  applyModal: boolean
}

function injector({ rootStore, rootAction }: { rootStore: IRootStore; rootAction: IRootAction }) {
  return {
    store: rootStore.Message.messageStore,
    action: rootAction.Message.messageAction,
  }
}

export default withRouter(Message)
