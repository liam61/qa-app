import * as React from 'react'
import { inject, observer } from 'mobx-react'
import { IRootStore, IRootAction } from 'typings'

import './index.scss'

@inject(injector)
@observer
export default class FriendItem extends React.Component<IProps, IState> {
  static defaultProps = {
    prefixCls: 'component-friend-item',
  }

  render() {
    const { prefixCls, name, avatar, content, date, onClick } = this.props

    return (
      <div className={`${prefixCls} qa-border-1px-bottom`} onClick={onClick}>
        <div className={`${prefixCls}-avatar`}>
          <img src={avatar} alt="user-avatar" />
        </div>
        <div className={`${prefixCls}-main`}>
          <div className="header">
            <span className="header-name">{name}</span>
            <span className="header-date">{date}</span>
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
  name: string
  avatar: string
  content: string
  date: string
  onClick: () => void
}

interface IState extends Partial<injectorReturnType> {
  [k: string]: any
}

function injector({ rootStore, rootAction }: { rootStore: IRootStore; rootAction: IRootAction }) {
  return {}
}
