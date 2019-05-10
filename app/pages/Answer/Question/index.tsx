import * as React from 'react'
import { inject, observer } from 'mobx-react'
import { withRouter } from 'react-router-dom'
import { Button, WhiteSpace, Toast } from 'antd-mobile'
import qs from 'qs'
import ConfirmModal from '../../../components/ConfirmModal'
import InfoModal, { InfoTypes, IInfoProps } from '../../../components/InfoModal'
import { IQstToSubmit, IReply } from '../../Create/interface'
import { DELAY_TIME, TYPE_OPTIONS } from '../../../common/global'
import { emptyFn } from '../../../utils'
import { IRootStore, IRootAction } from '../../../typings'

import './index.scss'

const infoModalFactory = {
  warning: (callback: () => void = emptyFn): IInfoProps => ({
    type: 'warning',
    title: '暂无消息',
    content: '',
    onClose: callback,
  }),
  success: (callback: () => void = emptyFn): IInfoProps => ({
    type: 'success',
    title: '提交成功',
    content: '可在「待完成」界面中查看！',
    onClose: callback,
  }),
  fail: (callback: () => void = emptyFn): IInfoProps => ({
    type: 'fail',
    title: '提交失败',
    content: '请检查填写的内容！',
    onClose: callback,
  }),
}

@inject(injector)
@observer
class Question extends React.Component<IProps, IState> {
  static defaultProps = {
    prefixCls: 'page-answer-question',
  }

  state = {
    confirmModal: false,
    infoModal: false,
    infoProps: infoModalFactory.warning(),
  }

  componentDidMount() {
    const { history, onCancel } = this.props

    history.listen((params: object, type: string) => {
      const { pathname, search } = params
      console.log(search)
      if (
        pathname === '/' &&
        qs.parse(search.slice(1)).steps === 'todo' &&
        type === 'POP'
      ) {
        onCancel()
      }
    })
  }

  handleFinishReply = () => {
    const { id, action, questions = [], history } = this.props
    const replyArr: IReply[] = []

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
      // TODO: 获取用户 id
      action!.updateQstsWithReply(id, 'lawler', replyArr, (type: InfoTypes) =>
        this.handleInfoModalShow(
          infoModalFactory[type](() => {
            this.handleModalClose('infoModal')
            if (type === 'success') {
              // TODO: 路由跳转
              // history.go(-2)
            }
          }),
        ),
      )
    }
  }

  handleModalShow = (type: string) => {
    this.setState({ [type]: true }) // tslint:disable-line
  }

  handleModalClose = (type: string) => {
    this.setState({ [type]: false }) // tslint:disable-line
  }

  handleInfoModalShow = (infoProps: IInfoProps) => {
    this.setState({
      infoModal: true,
      infoProps,
    })
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
            ref={(node: React.ReactNode) => (this[`question${num}`] = node)}
            {...question}
          />
          <WhiteSpace size='lg' />
        </React.Fragment>
      )
    })
  }

  render() {
    const { prefixCls, questions = [], title, type } = this.props
    const { confirmModal, infoModal, infoProps } = this.state

    if (!questions.length) {
      return <div className={`${prefixCls} loading`}>加载中，请稍等...</div>
    }

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
          className='qa-btn-bottom'
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
        <InfoModal visible={infoModal} {...infoProps} />
      </div>
    )
  }
}

type injectorReturnType = ReturnType<typeof injector>

interface IProps extends Partial<injectorReturnType> {
  prefixCls?: string
  id: string
  title: string
  type: string
  onCancel: () => void
}

interface IState extends Partial<injectorReturnType> {
  confirmModal: boolean
  infoModal: boolean
  infoProps: IInfoProps
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
