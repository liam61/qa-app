import * as React from 'react'
import { inject, observer } from 'mobx-react'
import { IRootStore, IRootAction } from '../../typings'

import './index.scss'

@inject(injector)
@observer
export default class Login extends React.Component<IProps, IState> {
  static defaultProps = {
    prefixCls: 'component-login',
  }

  constructor(props: IProps) {
    super(props)
  }

  render() {
    const { prefixCls } = this.props
    return (
      <div className={prefixCls}>
        this is login
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
