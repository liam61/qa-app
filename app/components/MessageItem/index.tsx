import * as React from 'react'
import { inject, observer } from 'mobx-react'
import { IRootStore, IRootAction } from 'typings'

import './index.scss'
import { IUser } from 'pages/User/stores/userStore'

@inject(injector)
@observer
export default class MessageItem extends React.Component<IProps, IState> {
  static defaultProps = {
    prefixCls: 'component-message-item',
  }

  constructor(props: IProps) {
    super(props)
  }

  render() {
    const {
      prefixCls,
      user: { avatar, name },
      content,
      fromMe,
      date,
    } = this.props

    return (
      <div className={prefixCls}>
        <div className={`${prefixCls}-date${date === 'hidden' ? ' hidden' : ''}`}>{date}</div>
        <div className={`${prefixCls}-body ${fromMe ? 'me' : 'friend'}`}>
          <div className="body-avatar">
            <img src={avatar} alt="user-avatar" />
          </div>
          <div className="body-main">
            <div className="body-main-name">{`${name}:`}</div>
            <div className="body-main-content">{content}</div>
          </div>
        </div>
      </div>
    )
  }
}

type injectorReturnType = ReturnType<typeof injector>

interface IProps extends Partial<injectorReturnType> {
  prefixCls?: string
  user: IUser
  content: string
  fromMe: boolean // 是否为自己发的信息
  date: string
}

interface IState extends Partial<injectorReturnType> {
  [k: string]: any
}

function injector({ rootStore, rootAction }: { rootStore: IRootStore; rootAction: IRootAction }) {
  return {}
}
