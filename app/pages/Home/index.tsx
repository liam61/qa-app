import * as React from 'react'
import { inject, observer } from 'mobx-react'
import { IRootStore, IRootAction } from '../../typings'

import './index.scss'

@inject(injector)
@observer
export default class Home extends React.Component<Props, {}> {
  static defaultProps = {
    prefixCls: 'page-home'
  }

  constructor(props) {
    super(props)
  }

  componentDidMount() {

  }

  render() {
    const { prefixCls } = this.props
    return (
      <div className={prefixCls}>

      </div>
    )
  }
}

type injectorReturnType = ReturnType<typeof injector>

interface Props extends Partial<injectorReturnType> {
  prefixCls?: string
  [k: string]: any
}

function injector({
  rootStore,
  rootAction,
}: {
  rootStore: IRootStore
  rootAction: IRootAction
}) {
  return {}
}
