import * as React from 'react'
import { inject, observer } from 'mobx-react'
import { Modal } from 'antd-mobile'
import { IRootStore, IRootAction } from 'typings'
import { IFriend } from 'pages/Message/stores/messageStore'
import { getLocalDate } from 'utils'

import './index.scss'

const ApplyItem = ({ apply, onAgree, onRefuse }: IApplyItem) => {
  let { _id, applicant, createdAt, user1, user2 } = apply

  if (applicant === user1._id) {
    user2 = user1
  }

  const { name, avatar } = user2

  return (
    <div className="add-friend-item qa-border-1px-top">
      <div className="main">
        <div className="main-avatar">
          <img src={avatar} alt="apply-user-avatar" />
        </div>
        <div className="main-name">{name}</div>
        <div className="main-date">{getLocalDate(createdAt).slice(5)}</div>
      </div>
      <div className="footer">
        <div className="footer-btn refuse" onClick={() => onRefuse(_id)}>
          ❌
        </div>
        <div className="footer-btn agree" onClick={() => onAgree(_id)}>
          ✅
        </div>
      </div>
    </div>
  )
}

@inject(injector)
@observer
export default class AddFriendModal extends React.Component<IProps, IState> {
  static defaultProps = {
    prefixCls: 'component-add-friend-modal',
  }

  render() {
    const { prefixCls, visible, onCancel, title, applies, onAgree, onRefuse } = this.props

    return (
      <div className={prefixCls}>
        <Modal
          visible={visible}
          className="qa-modal apply-modal"
          transparent
          maskTransitionName="am-fade"
          maskClosable
          onClose={onCancel}
          transitionName="am-zoom"
        >
          <div className="qa-modal-title">{title}</div>
          <div className="qa-modal-content">
            {applies.length ? (
              applies.map(apply => <ApplyItem key={apply._id} apply={apply} onAgree={onAgree} onRefuse={onRefuse} />)
            ) : (
              <div className="qa-no-more">没有更多好友申请</div>
            )}
          </div>
        </Modal>
      </div>
    )
  }
}

interface IApplyItem {
  apply: IFriend
  onAgree: (id: string) => void
  onRefuse: (id: string) => void
}

type injectorReturnType = ReturnType<typeof injector>

interface IProps extends Partial<injectorReturnType> {
  prefixCls?: string
  visible: boolean
  title: string
  applies: IFriend[]
  onAgree: (id: string) => void
  onRefuse: (id: string) => void
  onCancel: () => void
}

interface IState extends Partial<injectorReturnType> {
  [key: string]: any
}

export interface IInputProps {
  title: React.ReactNode
  defaultValue?: string
  key?: string // TODO: key 有什么用
}

function injector({ rootStore, rootAction }: { rootStore: IRootStore; rootAction: IRootAction }) {
  return {}
}
