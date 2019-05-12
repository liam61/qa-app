import * as React from 'react'
import { inject, observer } from 'mobx-react'
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

  handleValidateUser(user: string): InfoTypes {
    console.log('发送验证 ', user)
    return 'success'
  }

  handleValidateEmail(email: string): InfoTypes {
    console.log('发送验证 ', email)
    return 'success'
  }

  handleValidateAccount(account: string): InfoTypes {
    console.log('发送验证 ', account)
    return 'success'
  }

  render() {
    const { prefixCls } = this.props
    return (
      <div className={prefixCls}>
        user page
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
  rootAction: IRootAction
}) {
  return {}
}
