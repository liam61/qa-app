import * as React from 'react'
import { inject, observer } from 'mobx-react'
import { TextareaItem, InputItem } from 'antd-mobile'
import QuestionHeader from '../../components/QuestionHeader'
import { QUESTION_TYPES } from '../../common/global'
import { getUid } from '../../utils'
import { IRootStore, IRootAction } from '../../typings'

import './index.scss'

@inject(injector)
@observer
export default class JudgeQuestion extends React.Component<IProps, IState> {
  static defaultProps = {
    prefixCls: 'component-judge',
  }

  constructor(props) {
    super(props)

    const defaultOpts = [
      {
        id: getUid(),
        value: '',
      },
      {
        id: getUid(),
        value: '',
      },
    ]

    const { required = false, title = '', options = defaultOpts } = props

    this.state = { required, title, hidden: false, options }
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

  handleContentChange = (val, index) => {
    const { options } = this.state
    options[index].value = val
    this.setState({ options })
  }

  getQuestion = () => {
    const { title, required, options } = this.state

    return {
      title,
      required,
      options,
    }
  }

  renderOptions = options =>
    options.map((option, index) => {
      const { id, value } = option
      return (
        <div className='option-wrapper' key={id}>
          <i
            className='fa fa-question-circle-o fa-3x option-warn'
            aria-hidden='true'
          />
          <TextareaItem
            placeholder='输入选项内容'
            value={value}
            autoHeight
            count={50}
            onChange={val => this.handleContentChange(val, index)}
          />
        </div>
      )
    })

  render() {
    const { num, onRemove, type } = this.props
    const { required, title, hidden, options } = this.state

    return (
      <div className='qa-question'>
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
          className='qa-question-content'
          style={{ display: hidden ? 'none' : 'block' }}
        >
          <div className='content-title'>
            <div className='content-text'>题目</div>
            <InputItem
              placeholder='请输入题目'
              value={title}
              maxLength={30}
              onChange={this.handleTitleChange}
            />
          </div>
          <div className='content-options'>
            <div className='content-text'>选项</div>
            {this.renderOptions(options)}
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
  options: Array<{ id: string; value: '' }>
  onRemove: () => void
}

interface IState extends Partial<injectorReturnType> {
  title: string
  required: boolean
  hidden: boolean
  options: Array<{ id: string; value: '' }>
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
