// 完成问题组件
// Single | Multiple | Judge | Vote

import * as React from 'react'
import { inject, observer } from 'mobx-react'
import styled from 'styled-components'
import { QUESTION_TYPES } from 'common'
import { IRootStore, IRootAction } from 'typings'
import { IOption } from 'pages/Create/interface';

import './index.scss'

const getLabel = (index: number, checked: boolean, type: string) => {
  const Label = styled.div`
    &:before { content: '${String.fromCharCode(65 + index)}'; }
  `
  return (
    <Label
      className={`option-item-icon${
        checked ? ' checked' : ''
      } ${type.toLowerCase()}`}
    />
  )
}

@inject(injector)
@observer
export default class SingleQstTodo extends React.Component<IProps, IState> {
  static defaultProps = {
    prefixCls: 'component-single-qst-todo',
    reply: ['asdf'],
  }

  state = {
    checkedArr: [] as string[],
  }

  handleChange = (val: string) => {
    const { type, editable } = this.props
    const { checkedArr } = this.state

    if (!editable) {
      return
    }

    if (type === 'Multiple') {
      const index = checkedArr.indexOf(val)
      index !== -1 ? checkedArr.splice(index, 1) : checkedArr.push(val)
    } else {
      checkedArr[0] = val
    }

    this.setState({ checkedArr })
  }

  getReply = () => this.state.checkedArr

  render() {
    const {
      prefixCls,
      num,
      required,
      title,
      options,
      editable,
      reply,
      type,
    } = this.props
    const { checkedArr } = this.state

    return (
      <div className={`${prefixCls} qa-border-1px-bottom`}>
        <div className="qa-qst-todo-header">
          <span className="header-tag">
            {QUESTION_TYPES.find(t => t.key === type)!.value}
          </span>
          <span className={`header-title${required ? ' required' : ''} qa-text-ellipsis`}>
            {`${num}. ${title}`}
          </span>
          {editable ? null : (
            <span className="header-disabled">(不可编辑)</span>
          )}
        </div>
        <div className={`${prefixCls}-options`}>
          {options.map((option, index: number) => {
            const { id, value } = option

            return (
              <div
                key={id}
                className="option-item"
                onClick={() => this.handleChange(value)}
              >
                {getLabel(
                  index,
                  editable
                    ? checkedArr.includes(value)
                    : reply!.includes(value),
                  type,
                )}
                <div className="option-item-text">{value}</div>
              </div>
            )
          })}
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
  options: IOption[]
  type: string
  editable: boolean
  reply?: string[]
}

interface IState extends Partial<injectorReturnType> {
  checkedArr: string[]
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
