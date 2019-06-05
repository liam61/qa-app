import * as React from 'react'
import { inject, observer } from 'mobx-react'
import { InputItem } from 'antd-mobile'
import QuestionHeader from '../../components/QuestionHeader'
import { QUESTION_TYPES } from '../../common/global'
import { IRootStore, IRootAction } from '../../typings'

import './index.scss'

@inject(injector)
@observer
export default class AnswerQuestion extends React.Component<IProps, IState> {
  static defaultProps = {
    prefixCls: 'component-answer',
  }

  constructor(props: IProps) {
    super(props)

    const { required = false, title = '' } = props

    this.state = { required, title, hidden: false }
  }

  handleToggle = () => {
    const { hidden } = this.state
    this.setState({ hidden: !hidden })
  }

  handleRequiredChange = val => {
    this.setState({ required: val })
  }

  handleTitleChange = val => {
    this.setState({ title: val })
  }

  getQuestion = () => {
    const { title, required } = this.state

    return {
      title,
      required,
    }
  }

  render() {
    const { prefixCls, num, onRemove, type } = this.props
    const { required, title, hidden } = this.state

    return (
      <div className={`${prefixCls} qa-question`}>
        <QuestionHeader
          num={num}
          type={QUESTION_TYPES.find(t => t.key === type)!.value}
          hidden={hidden}
          onToggle={this.handleToggle}
          required={required}
          onRequiredChange={this.handleRequiredChange}
          onRemove={onRemove}
        />
        <div
          className={`${prefixCls}-content`}
          style={{ display: hidden ? 'none' : 'block' }}
        >
          <div className="content-title">
            <div className="content-text">题目</div>
            <InputItem
              className="qa-input-item"
              placeholder="请输入题目"
              value={title}
              maxLength={30}
              onChange={this.handleTitleChange}
            />
          </div>
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
  type: string
  cached?: boolean
  onRemove: () => void
}

interface IState extends Partial<injectorReturnType> {
  title: string
  required: boolean
  hidden: boolean
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
