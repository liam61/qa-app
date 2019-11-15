// 完成问题组件
// Single | Multiple | Judge | Vote

import * as React from 'react'
import { inject, observer } from 'mobx-react'
import { TextareaItem } from 'antd-mobile'
import { QUESTION_TYPES } from 'common'
import { IRootStore, IRootAction } from 'typings'

import './index.scss'
import { IReplyTodo } from 'pages/Create/interface'

@inject(injector)
@observer
export default class AnswerQstTodo extends React.Component<IProps, IState> {
  static defaultProps = {
    prefixCls: 'component-answer-qst-todo',
  }

  state = {
    value: '',
  }

  handleChange = (val: string | undefined) => {
    this.setState({ value: val || '' })
  }

  getReply = () => {
    const { value } = this.state

    return value ? [value] : []
  }

  render() {
    const { prefixCls, num, required, title, editable, replies, type, poster } = this.props

    const { value } = this.state

    return (
      <div className={`${prefixCls} qa-border-1px-bottom`}>
        <div className={`${prefixCls}-header`}>
          <span className="header-tag">{QUESTION_TYPES.find(t => t.key === type)!.value}</span>
          <span className={`header-title${required ? ' required' : ''}`}>{`${num + 1}. ${title}`}</span>
          {editable ? null : <span className="header-disabled">(只读)</span>}
        </div>
        <div className={`${prefixCls}-content`}>
          {poster ? (
            replies.map(r => {
              const {
                _id,
                user: { avatar, name },
                value: rs,
              } = r

              return (
                <div key={_id} className={`${prefixCls}-options-wrapper qa-border-1px-top`}>
                  <div className={`${prefixCls}-user`}>
                    <img src={avatar} alt="" />
                    <div className="name">{name}</div>
                  </div>
                  <div className={`${prefixCls}-text`}>{rs[0]}</div>
                </div>
              )
            })
          ) : (
            <TextareaItem
              placeholder={editable ? '请输入内容（不超过100字）' : ''}
              value={editable ? value : (replies[0] ? replies[0].value[0] : '')}
              autoHeight
              count={100}
              editable={editable}
              onChange={this.handleChange}
            />
          )}
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
  replies: IReplyTodo[]
  poster: boolean
}

interface IState extends Partial<injectorReturnType> {
  value: string
}

function injector({ rootStore, rootAction }: { rootStore: IRootStore; rootAction: IRootAction }) {
  return {}
}
