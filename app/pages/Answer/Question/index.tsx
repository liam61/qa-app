import * as React from 'react'
import { inject, observer } from 'mobx-react'
import { withRouter } from 'react-router'
import { Button, WhiteSpace, Toast } from 'antd-mobile'
import ConfirmModal from '../../../components/ConfirmModal'
import { IQstToSubmit } from '../../Create/stores/questionStore'
import { DELAY_TIME, TYPE_OPTIONS } from '../../../common/global'
import { IRootStore, IRootAction } from '../../../typings'

import './index.scss'

@inject(injector)
@observer
class Question extends React.Component<IProps, IState> {
  static defaultProps = {
    prefixCls: 'page-answer-question',
  }

  state = {
    confirmModal: false,
  }

  componentDidMount() {
    const { history, onCancel } = this.props

    history.listen((params: object, type: string) => {
      const { pathname, search } = params

      if (pathname === '/' && search === '' && type === 'POP') {
        onCancel()
      }
    })
  }

  handleFinishReply = () => {
    const { action, questions = [] } = this.props
    const replyArr: object[] = []

    this.handleModalClose('confirmModal')

    const flag = questions.every(qst => {
      const { num, required } = qst
      const reply = this[`question${num}`].wrappedInstance.getReply()

      if (required && !reply.length) {
        Toast.fail('有必填项未完成！', DELAY_TIME)
        return false
      }

      if (reply.length) {
        replyArr.push({ reply, num })
      }

      return true
    })

    if (flag) {
      // TODO: 提交答案
      action!.updateQstsWithReply(replyArr)
    }
  }

  handleModalShow = type => {
    this.setState({ [type]: true }) // tslint:disable-line
  }

  handleModalClose = type => {
    this.setState({ [type]: false }) // tslint:disable-line
  }

  renderQuestions(questions: IQstToSubmit[]) {
    return questions.map(question => {
      const { num, type } = question
      const Element = require(`../../../components/${
        type === 'Answer' ? type : 'Single'
      }QstTodo`).default

      return (
        <React.Fragment key={num}>
          <Element
            writable
            ref={node => (this[`question${num}`] = node)}
            {...question}
          />
          <WhiteSpace size='lg' />
        </React.Fragment>
      )
    })
  }

  render() {
    const { prefixCls, questions = [], title, type } = this.props
    const { confirmModal } = this.state
    return (
      <div className={prefixCls}>
        <div className='header-content'>
          <div className='title text-ellipsis'>{title}</div>
          <span className='type'>
            {TYPE_OPTIONS.find(t => t.key === type)!.value}
          </span>
        </div>
        <div className='question-wrapper'>
          {this.renderQuestions(questions)}
        </div>
        <Button
          type='primary'
          className='btn-bottom'
          onClick={() => this.handleModalShow('confirmModal')}
        >
          回答完成
        </Button>
        <ConfirmModal
          visible={confirmModal}
          onCancel={() => this.handleModalClose('confirmModal')}
          title='你确定完成问题填写吗？'
          onOK={this.handleFinishReply}
        />
      </div>
    )
  }
}

type injectorReturnType = ReturnType<typeof injector>

interface IProps extends Partial<injectorReturnType> {
  prefixCls?: string
  onCancel: () => void
}

interface IState extends Partial<injectorReturnType> {
  confirmModal: boolean
}

function injector({
  rootStore,
  rootAction,
}: {
  rootStore: IRootStore
  rootAction: IRootAction,
}) {
  return {
    store: rootStore.Answer.questionStore,
    action: rootAction.Answer.questionAction,
    questions: rootStore.Answer.answerStore.data.questions,
    title: rootStore.Answer.answerStore.data.title,
    type: rootStore.Answer.answerStore.data.type,
  }
}

export default withRouter(Question)
