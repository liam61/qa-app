import * as React from 'react'
import { inject, observer } from 'mobx-react'

import './index.scss'
import PageHeader from 'components/PageHeader'
// import { Button } from 'antd-mobile'
import { IDepartment } from 'pages/Register/stores/registerStore'
import { IUser } from 'pages/User/stores/userStore'
import { IRootStore, IRootAction } from '../../../typings'

const ReceiverItem = ({ user, checked, onToggle }: IReceiverItem) => {
  const { name, avatar, profile } = user

  return (
    <div className="receiver-item qa-border-1px-bottom" onClick={onToggle}>
      <div className="receiver-item-avatar">
        <img src={avatar} alt="user-avatar" />
      </div>
      <div className="receiver-item-main">
        <div className="header">
          <span className="header-name">{name}</span>
          <span className="header-info">{profile}</span>
          <div className={`item-img-check${checked ? ' checked' : ''}`} />
        </div>
      </div>
    </div>
  )
}

interface IReceiverItem {
  user: IUser
  checked: boolean
  onToggle: () => void
}

@inject(injector)
@observer
export default class Receiver extends React.Component<IProps, IState> {
  static defaultProps = {
    prefixCls: 'page-create-receiver',
  }

  renderDptItems = (departments: IDepartment[]) => {
    const { action, store } = this.props
    const { receivers } = store!

    return departments.map(dpt => {
      const { _id, name, staff = [] } = dpt

      return (
        <div key={_id} className="department-item">
          <div className="item-header" onClick={() => action!.toggleDepartment(_id)}>
            <span>{name}</span>
            <span className={`item-img-check${receivers[_id][_id] ? ' checked' : ''}`} />
          </div>
          <div className="item-body">
            {staff.map(st => {
              const { _id: staffId, user } = st

              return (
                <ReceiverItem
                  key={staffId}
                  user={user}
                  checked={receivers[_id][user._id]}
                  onToggle={() => action!.toggleReceiver(_id, user._id)}
                />
              )
            })}
          </div>
        </div>
      )
    })
  }

  render() {
    const { prefixCls, onCancel, store } = this.props

    const { departments } = store!

    return (
      <div className={prefixCls}>
        <PageHeader text="发送范围" onCancel={onCancel} />
        <div className={`${prefixCls}-main`}>{this.renderDptItems(departments)}</div>
        {/* <Button type="primary" className="qa-btn-bottom" disabled={false} onClick={this.handleReceiverOK}>
          <i className="fa fa-angle-left btn-bottom-icon" aria-hidden="true" />
          添加完成
        </Button> */}
      </div>
    )
  }
}

type injectorReturnType = ReturnType<typeof injector>

interface IProps extends Partial<injectorReturnType> {
  prefixCls?: string
  onCancel: () => void
}

interface IState extends Partial<injectorReturnType> {
  [k: string]: any
}

function injector({ rootStore, rootAction }: { rootStore: IRootStore; rootAction: IRootAction }) {
  return {
    store: rootStore.Create.extraStore,
    action: rootAction.Create.extraAction,
  }
}
