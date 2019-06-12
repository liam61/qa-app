import * as React from 'react'
import { inject, observer } from 'mobx-react'
import { IRootStore, IRootAction } from 'typings'

import './index.scss'
import { IUser } from 'pages/User/stores/userStore'
import { ROOT_USER } from 'common'

@inject(injector)
@observer
export default class FriendItem extends React.Component<IProps, IState> {
  static defaultProps = {
    prefixCls: 'component-friend-item',
  }

  render() {
    const {
      prefixCls,
      user: { name, avatar },
      content,
      date,
      onClick,
    } = this.props

    return (
      <div className={`${prefixCls} qa-border-1px-bottom`} onClick={onClick}>
        <div className={`${prefixCls}-avatar`}>
          <img src={avatar} alt="user-avatar" />
        </div>
        <div className={`${prefixCls}-main`}>
          <div className="header">
            <span className="header-name">{`${name}${name === ROOT_USER ? ' (管理员)' : ''}`}</span>
            <span className="header-info">{date}</span>
          </div>
          <div className="content">
            <span className="content-text">{content}</span>
            <span className="content-unread" />
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
  content?: string
  date?: string
  onClick?: () => void
}

interface IState extends Partial<injectorReturnType> {
  [k: string]: any
}

function injector({ rootStore, rootAction }: { rootStore: IRootStore; rootAction: IRootAction }) {
  return {}
}
