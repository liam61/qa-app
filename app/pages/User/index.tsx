import * as React from 'react'
import { inject, observer } from 'mobx-react'
import Register from '../../components/Register'
import { InfoTypes } from '../../components/InfoModal'
import { IRootStore, IRootAction } from '../../typings'

import './index.scss'

@inject(injector)
@observer
export default class User extends React.Component<IProps, {}> {
  static defaultProps = {
    prefixCls: 'page-user',
  }

  constructor(props: IProps) {
    super(props)
  }

  // componentDidMount() {}

  handleValidateUser(callback: (status: InfoTypes) => void) {
    console.log('发送验证 user')

    callback('success')
  }

  handleValidateEmail(callback: (status: InfoTypes) => void) {
    console.log('发送验证 email')

    callback('success')
  }

  render() {
    const { prefixCls } = this.props
    return (
      <div className={prefixCls}>
        <Register
          onOK={() => console.log('发送注册请求')}
          onValidateUser={this.handleValidateUser}
          onValidateEmail={this.handleValidateEmail}
        />
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
  rootStore: IRootStore
  rootAction: IRootAction,
}) {
  return {}
}
