import * as React from 'react'
import { inject, observer } from 'mobx-react'
import { Switch, WhiteSpace } from 'antd-mobile'
import { IRootStore, IRootAction } from 'typings'

import './index.scss'

@inject(injector)
@observer
export default class QuestionHeader extends React.Component<IProps, {}> {
  static defaultProps = {
    prefixCls: 'component-question-header',
  }

  render() {
    const {
      hidden,
      num,
      onToggle,
      type,
      required,
      onRequiredChange,
      onRemove,
    } = this.props
    return (
      <React.Fragment>
        {/* <WhiteSpace size='lg' /> */}
        <div className="qa-question-header qa-border-1px-bottom">
          <div className="header-title">
            <i
              className={`fa fa-caret-${
                hidden ? 'down' : 'right'
              } fa-3x header-title-toggle`}
              aria-hidden="true"
              onClick={onToggle}
            />
            <span className="header-title-text">
第
              {num}
题
            </span>
            <span className="header-title-type">
              {' '}
(
              {type}
)
            </span>
          </div>
          <Switch checked={required} onChange={onRequiredChange} />
          <span className="header-required">必答</span>
          <i
            className="fa fa-trash-o fa-3x header-remove"
            aria-hidden="true"
            onClick={onRemove}
          />
        </div>
      </React.Fragment>
    )
  }
}

type injectorReturnType = ReturnType<typeof injector>

interface IProps extends Partial<injectorReturnType> {
  prefixCls?: string
  hidden: boolean
  num: number
  type: string
  required: boolean
  onToggle: () => void
  onRequiredChange: (val: boolean) => void
  onRemove: () => void
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
