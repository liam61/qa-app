import * as React from 'react'
import { inject, observer } from 'mobx-react'
import { IRootStore, IRootAction } from 'typings'

import './index.scss'

@inject(injector)
@observer
export default class PageHeader extends React.Component<IProps, IState> {
  static defaultProps = {
    prefixCls: 'component-page-header',
  }

  render() {
    const { prefixCls, text, onCancel } = this.props

    return (
      <div className={prefixCls} onClick={onCancel}>
        <i className="fa fa-angle-left fa-3x" aria-hidden="true" />
        <span>{text}</span>
      </div>
    )
  }
}

type injectorReturnType = ReturnType<typeof injector>

interface IProps extends Partial<injectorReturnType> {
  prefixCls?: string
  text: React.ReactNode
  onCancel: () => void
}

interface IState extends Partial<injectorReturnType> {
  [k: string]: any
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
