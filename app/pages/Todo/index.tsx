import * as React from 'react'
import { inject, observer } from 'mobx-react'
import { ListView } from 'antd-mobile'
import AnswerPage from '../Answer'
import { IRootStore, IRootAction } from '../../typings'

import './index.scss'

@inject(injector)
@observer
export default class Todo extends React.Component<IProps, {}> {
  static defaultProps = {
    prefixCls: 'page-todo',
  }

  constructor(props) {
    super(props)
  }

  // componentDidMount() {}

  render() {
    const { prefixCls } = this.props
    return (
      <div className={prefixCls}>
        <AnswerPage />
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
