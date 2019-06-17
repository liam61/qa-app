import * as React from 'react'
import { inject, observer } from 'mobx-react'
import { Modal } from 'antd-mobile'
import { IRootStore, IRootAction } from 'typings'

import './index.scss'
import './anim.less'

@inject(injector)
@observer
export default class PageModal extends React.Component<IProps, {}> {
  static defaultProps = {
    prefixCls: 'component-page-modal',
  }

  render() {
    const { prefixCls, visible, children, transitionName = 'qa-slide-left' } = this.props

    return (
      <div className={prefixCls}>
        <Modal
          visible={visible}
          className="page-modal"
          transitionName={transitionName}
          maskTransitionName={transitionName}
        >
          {children}
        </Modal>
      </div>
    )
  }
}

type injectorReturnType = ReturnType<typeof injector>

interface IProps extends Partial<injectorReturnType> {
  prefixCls?: string
  visible: boolean
  transitionName?: string
}

function injector({ rootStore, rootAction }: { rootStore: IRootStore; rootAction: IRootAction }) {
  return {}
}
