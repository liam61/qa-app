import * as React from 'react'
import { inject, observer } from 'mobx-react'
import { Modal } from 'antd-mobile'
import { IRootStore, IRootAction } from '../../typings'

import './index.scss'

export type InfoTypes = 'success' | 'fail' | 'warning'

@inject(injector)
@observer
export default class InfoModal extends React.Component<IProps, {}> {
  static defaultProps = {
    prefixCls: 'component-info-modal',
  }

  getIconByType = (type: InfoTypes) =>
    require(`../../assets/images/${type}.svg`)

  render() {
    const { prefixCls, visible, onClose, title, type, content } = this.props
    return (
      <div className={prefixCls}>
        <Modal
          visible={visible}
          className='qa-modal'
          transparent
          animationType='fade'
          maskTransitionName='am-fade'
          footer={[
            {
              text: '我知道了',
              onPress: onClose,
            },
          ]}
        >
          <div className='qa-modal-img'>
            <img src={this.getIconByType(type)} alt='modal-img' />
          </div>
          <div className='qa-modal-title'>{title}</div>
          <div className='qa-modal-content'>{content}</div>
        </Modal>
      </div>
    )
  }
}

type injectorReturnType = ReturnType<typeof injector>

interface IProps extends Partial<injectorReturnType> {
  prefixCls?: string
  type: InfoTypes
  visible: boolean
  title: React.ReactNode
  content: React.ReactNode
  onClose: () => void
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
