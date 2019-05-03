import * as React from 'react'
import { inject, observer } from 'mobx-react'
import { withRouter } from 'react-router'
import { Button, WhiteSpace } from 'antd-mobile'
// import SingleQstTodo from '../../../components/SingleQstTodo'
import { IRootStore, IRootAction } from '../../../typings'

import './index.scss'

@inject(injector)
@observer
class Question extends React.Component<IProps, {}> {
  static defaultProps = {
    prefixCls: 'page-answer-question',
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
    const { action, questions } = this.props
    const replyArr = questions.reduce((arr, qst) => {
      const { num } = qst
      const res = this[`question${num}`].wrappedInstance.getReply()

      if (res.reply) {
        arr.push(res)
      }
      return arr
    }, [])

    action!.updateQstsWithReply(replyArr)
  }

  renderQuestions(questions: object[]) {
    return questions.map(question => {
      const { num, type } = question
      const Element = require(`../../../components/${type === 'Answer' ? type : 'Single'}QstTodo`).default

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
    const { prefixCls, questions } = this.props
    return (
      <div className={prefixCls}>
        <div className='question-wrapper'>
          {this.renderQuestions(questions)}
        </div>
        <Button
          type='primary'
          className='btn-bottom'
          onClick={this.handleFinishReply}
        >
          回答完成
        </Button>
      </div>
    )
  }
}

type injectorReturnType = ReturnType<typeof injector>

interface IProps extends Partial<injectorReturnType> {
  prefixCls?: string
  onCancel: () => void
  // questions: object[]
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
  }
}

export default withRouter(Question)
