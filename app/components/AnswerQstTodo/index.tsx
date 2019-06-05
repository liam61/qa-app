// 完成问题组件
// Single | Multiple | Judge | Vote

import * as React from 'react'
import { inject, observer } from 'mobx-react'
import { TextareaItem } from 'antd-mobile'
import { QUESTION_TYPES } from '../../common/global'
import { IRootStore, IRootAction } from '../../typings'

import './index.scss'

@inject(injector)
@observer
export default class AnswerQstTodo extends React.Component<IProps, IState> {
  static defaultProps = {
    prefixCls: 'component-answer-qst-todo',
  }

  state = {
    value: '',
  }

  handleChange = val => {
    this.setState({ value: val })
  }

  getReply = () => {
    const { value } = this.state

    return value ? [value] : []
  }

  render() {
    const {
      prefixCls,
      num,
      required,
      title,
      editable,
      reply,
      type,
    } = this.props
    const { value } = this.state

    return (
      <div className={`${prefixCls} qa-border-1px-bottom`}>
        <div className="qa-qst-todo-header">
          <span className="header-tag">
            {QUESTION_TYPES.find(t => t.key === type)!.value}
          </span>
          <span
            className={`header-title${
              required ? ' required' : ''
            } text-ellipsis`}
          >
            {`${num}. ${title}`}
          </span>
          {editable ? null : (
            <span className="header-disabled">(不可编辑)</span>
          )}
        </div>
        <div className={`${prefixCls}-content`}>
          <TextareaItem
            placeholder={editable ? '请输入内容（不超过100字）' : ''}
            value={editable ? value : reply}
            autoHeight
            count={100}
            editable={editable}
            onChange={this.handleChange}
          />
        </div>
      </div>
    )
  }
}

type injectorReturnType = ReturnType<typeof injector>

interface IProps extends Partial<injectorReturnType> {
  prefixCls?: string
  num: number
  title: string
  required: boolean
  options: object[]
  type: string
  editable: boolean
  reply?: string
}

interface IState extends Partial<injectorReturnType> {
  value: string
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
