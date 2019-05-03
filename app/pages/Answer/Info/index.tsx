import * as React from 'react'
import { inject, observer } from 'mobx-react'
import { Button, Toast, WhiteSpace, Modal } from 'antd-mobile'
import { IRootStore, IRootAction } from '../../../typings'

import './index.scss'

@inject(injector)
@observer
export default class Info extends React.Component<IProps, {}> {
  static defaultProps = {
    prefixCls: 'page-answer-info',
  }

  constructor(props) {
    super(props)
  }

  increaseCount = (key: string, toCount: number, during = 500, delay = 20) => {
    const that = this
    const step =
      (toCount * delay) / during <= 1
        ? 1
        : Math.floor((toCount * delay) / during)
    return (function increase() {
      const { [key]: count } = that.state
      if (count < toCount) {
        that.setState(
          { [key]: count + step >= toCount ? toCount : count + step },
          () => setTimeout(() => increase(), (during * step) / toCount),
        )
      }
    })()
  }

  render() {
    const { prefixCls, title, type, date, content, files, expire } = this.props

    return (
      <div className={prefixCls}>
        <div className={`${prefixCls}-header qa-border-1px-bottom`}>
          <div className='header-content'>
            <div className='title'>{title}</div>
            <span className='type'>{type}</span>
          </div>
          <div className='header-info'>
            <img
              src='https://zos.alipayobjects.com/rmsportal/PZUUCKTRIHWiZSY.jpeg'
              alt='user-avatar'
            />
            <span className='info-name qa-border-1px-right'>lawler</span>
            <span className='info-date qa-border-1px-right'>{date}</span>
            <span className='info-expire'>{expire}</span>
          </div>
        </div>
        <div className={`${prefixCls}-read`}>
          <div className='read-wrapper qa-border-1px-right'>
            <span className='count-title'>已读</span>
            <span className='count-number read'>16</span>
          </div>
          <div className='read-wrapper'>
            <span className='count-title'>未读</span>
            <span className='count-number unread'>8</span>
          </div>
        </div>
        <div className={`${prefixCls}-content`}>
          <img src={files[0].url} alt='content-img' />
          <p>{content}</p>
        </div>
        <WhiteSpace size='lg' />
      </div>
    )
  }
}

type injectorReturnType = ReturnType<typeof injector>

interface IProps extends Partial<injectorReturnType> {
  prefixCls?: string
  title: string
  type: string
  date: string
  content: string
  files: object[]
  expire: string
}

function injector({
  rootStore,
  rootAction,
}: {
  rootStore: IRootStore
  rootAction: IRootAction,
}) {
  return {}
}
