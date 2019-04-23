import * as React from 'react'
import { inject, observer } from 'mobx-react'
import { IRootStore, IRootAction } from '../../typings'

import './index.scss'

@inject(injector)
@observer
export default class Message extends React.Component<IProps, {}> {
  static defaultProps = {
    prefixCls: 'page-message',
  }

  constructor(props) {
    super(props)
  }

  // componentDidMount() {}

  render() {
    const { prefixCls } = this.props
    return (
      <div className={prefixCls}>
        messages
      </div>
    )
  }
}

type injectorReturnType = ReturnType<typeof injector>

interface IProps extends Partial<injectorReturnType> {
  prefixCls?: string
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
