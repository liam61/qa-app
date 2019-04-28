import * as React from 'react'
import { inject, observer } from 'mobx-react'
import { Modal } from 'antd-mobile'
import { IRootStore, IRootAction } from '../../typings'

import './index.scss'
import '../PageModal/anim.less'

@inject(injector)
@observer
export default class ConfirmModal extends React.Component<IProps, {}> {
  static defaultProps = {
    prefixCls: 'component-confirm-modal',
  }

  render() {
    const { prefixCls, visible, onCancel, title, onOK } = this.props
    return (
      <div className={prefixCls}>
        <Modal
          visible={visible}
          className='qa-modal'
          transparent
          // animationType='fade'
          maskTransitionName='am-fade'
          transitionName='am-zoom'
          footer={[
            { text: '取消', onPress: onCancel },
            { text: '确定', onPress: onOK },
          ]}
        >
          <div className='qa-modal-title'>{title}</div>
        </Modal>
      </div>
    )
  }
}

type injectorReturnType = ReturnType<typeof injector>

interface IProps extends Partial<injectorReturnType> {
  prefixCls?: string
  visible: boolean
  title: React.ReactNode
  onCancel: () => void
  onOK: () => void
}

export interface IConfirmProps {
  title: React.ReactNode
  onOK: () => void
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
