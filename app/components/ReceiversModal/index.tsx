import * as React from 'react'
import { inject, observer } from 'mobx-react'
import { IRootStore, IRootAction } from '../../typings'

import './index.scss'

@inject(injector)
@observer
export default class ReceiversModal extends React.Component<IProps, IState> {
  static defaultProps = {
    prefixCls: 'component-receivers-modal',
  }

  constructor(props: IProps) {
    super(props)
  }

  render() {
    const { prefixCls } = this.props

    return (
      <div className={prefixCls}>
        this is receivers-modal
      </div>
    )
  }
}

type injectorReturnType = ReturnType<typeof injector>

interface IProps extends Partial<injectorReturnType> {
  prefixCls?: string
  [k: string]: any
}

interface IState extends Partial<injectorReturnType> {
  [k: string]: any
}

function injector({
  rootStore,
  rootAction,
}: {
  rootStore: IRootStore,
  rootAction: IRootAction,
}) {
  return {}
}
