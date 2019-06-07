import * as React from 'react'
import { inject, observer } from 'mobx-react'
import { getRandomImg } from 'utils'
import { IRootStore, IRootAction } from 'typings'

import './index.scss'

@inject(injector)
@observer
export default class ListViewItem extends React.Component<IProps, IState> {
  static defaultProps = {
    prefixCls: 'component-list-view-item',
  }

  coverByRandom = getRandomImg()

  render() {
    const {
      prefixCls,
      title,
      content,
      cover,
      author,
      avatar,
      date,
      type,
      expire,
      onClick,
      status,
    } = this.props

    return (
      <div
        className={prefixCls}
        onClick={() => onClick(cover || this.coverByRandom)}
      >
        <div className={`${prefixCls}-cover`}>
          <img src={cover || this.coverByRandom} alt="item-cover" />
        </div>
        <div className={`${prefixCls}-body`}>
          <div className="body-title">
            <span className={`title qa-text-ellipsis ${status}`}>{title}</span>
            <span className="type">{type}</span>
          </div>
          <div className="body-content">{content}</div>
          <div className="body-info">
            <img src={avatar} alt="author-avatar" />
            <span className="info-name qa-border-1px-right">{author}</span>
            <span className="info-date">{date}</span>
            {/* <span className="info-expire">期限：{expire}</span> */}
          </div>
        </div>
      </div>
    )
  }
}

type injectorReturnType = ReturnType<typeof injector>

interface IProps extends Partial<injectorReturnType> {
  prefixCls?: string
  title: string
  content: string
  cover: string
  author: string
  avatar: string
  date: string
  type: string
  expire?: string
  status: string
  onClick: (cover: string) => void
}

interface IState extends Partial<injectorReturnType> {}

function injector({
  rootStore,
  rootAction,
}: {
  rootStore: IRootStore
  rootAction: IRootAction,
}) {
  return {}
}
