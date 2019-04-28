// 单选 | 多选 | 投票

import * as React from 'react'
import { inject, observer } from 'mobx-react'
import { TextareaItem, InputItem, Toast } from 'antd-mobile'
import QuestionHeader from '../../components/QuestionHeader'
import { IRootStore, IRootAction } from '../../typings'
import { DELAY_TIME, QUESTION_TYPES } from '../../common/global'
import { getUid } from '../../utils'

import './index.scss'

@inject(injector)
@observer
export default class SingleQuestion extends React.Component<IProps, IState> {
  static defaultProps = {
    prefixCls: 'component-single',
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

    this.state = { required, title, options, hidden: false }
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

  handleRemoveOption = index => {
    const { options } = this.state
    options.splice(index, 1)
    this.setState({ options })
  }

  handleAddOption = () => {
    const { options } = this.state
    if (options.length === 6) {
      Toast.fail('选项过多不能添加！', DELAY_TIME)
      return
    }
    options.push({
      id: getUid(),
      value: '',
    })
    this.setState({ options })
  }

  handleToggle = () => {
    const { hidden } = this.state
    this.setState({ hidden: !hidden })
  }

  getQuestion = () => {
    const { title, required, options } = this.state

    return {
      title,
      required,
      options: options.filter(option => !!option.value),
    }
  }

  renderOptions = options =>
    options.map((option, index) => {
      const { id, value } = option
      return (
        <div className='option-wrapper qa-border-1px-top' key={id}>
          <i
            className='fa fa-minus-circle fa-3x option-remove'
            aria-hidden='true'
            onClick={() => this.handleRemoveOption(index)}
          />
          <TextareaItem
            placeholder='请输入选项内容（不超过30字）'
            value={value}
            autoHeight
            count={30}
            onChange={val => this.handleContentChange(val, index)}
          />
        </div>
      )
    })

  render() {
    const { num, onRemove, type } = this.props
    const { required, title, options, hidden } = this.state

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
          // TODO: toggle 动画
          style={{ display: hidden ? 'none' : 'block' }}
        >
          <div className='content-title'>
            <div className='content-text'>题目</div>
            <InputItem
              placeholder='请输入题目'
              value={title}
              maxLength={20}
              onChange={this.handleTitleChange}
            />
          </div>
          <div className='content-options'>
            <div className='content-text'>选项</div>
            {this.renderOptions(options)}
            <div className='option-wrapper add qa-border-1px-top' onClick={this.handleAddOption}>
              <i
                className='fa fa-plus-circle fa-3x option-add'
                aria-hidden='true'
              />
              <TextareaItem value='添加选项' editable={false} />
            </div>
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
  options: Array<{ id: string; value: '' }>
  type: string
  cached?: boolean // ?
  onRemove: () => void
}

interface IState extends Partial<injectorReturnType> {
  title: string
  required: boolean
  options: Array<{ id: string; value: '' }>
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
