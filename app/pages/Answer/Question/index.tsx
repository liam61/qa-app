import * as React from 'react'
import { inject, observer } from 'mobx-react'
import { withRouter } from 'react-router-dom'
import { Button, WhiteSpace, Toast } from 'antd-mobile'
import qs from 'qs'
import ConfirmModal from 'components/ConfirmModal'
import InfoModal, { InfoTypes, IInfoProps } from 'components/InfoModal'
import PageHeader from 'components/PageHeader';
import { IQstToSubmit, IReply } from '../../Create/interface'
import { DELAY_TIME, TYPE_OPTIONS } from 'common'
import { emptyFn } from 'utils'
import { IRootStore, IRootAction } from 'typings'

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
    const { action, data, history, store } = this.props
    const replyArr: IReply[] = []

    const { qstItems, _id: detailId } = data!

    this.handleModalClose('confirmModal')

    const flag = qstItems.every(qst => {
      const { _id: id, num, required } = qst
      const replies = this[`question${num}`].wrappedInstance.getReply()

      if (required && !replies.length) {
        Toast.fail('有必填项未完成！', DELAY_TIME)
        return false
      }

      if (replies.length) {
        replyArr.push({ replies, id })
      }

      return true
    })

    if (flag) {
      action!.submitReply(detailId, replyArr, (type: InfoTypes) =>
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

  renderQuestions(qstItems: IQstToSubmit[], editable: boolean) {
    return qstItems.map(question => {
      const { num, type } = question
      const Element = require(`components/${
        type === 'Answer' ? type : 'Single'
      }QstTodo`).default

      return (
        <React.Fragment key={num}>
          <Element
            editable={editable}
            ref={(node: React.ReactNode) => (this[`question${num}`] = node)}
            {...question}
          />
          <WhiteSpace size="lg" />
        </React.Fragment>
      )
    })
  }

  render() {
    const { prefixCls, data, title, type, editable, onCancel } = this.props
    const { confirmModal, infoModal, infoProps } = this.state

    const { qstItems } = data!

    if (!qstItems.length) {
      return <div className={`${prefixCls} loading`}>加载中，请稍等...</div>
    }

    return (
      <div className={prefixCls}>
        <PageHeader text="问答问题" onCancel={onCancel} />
        <div className="header-content">
          <div className="title qa-text-ellipsis">{title}</div>
          <span className="type">
            {TYPE_OPTIONS.find(t => t.key === type)!.value}
          </span>
        </div>
        <div className="question-wrapper">
          {this.renderQuestions(qstItems, editable)}
        </div>
        <Button
          type="primary"
          className={`qa-btn-bottom${editable ? '' : ' qa-hidden'}`}
          onClick={() => this.handleModalShow('confirmModal')}
        >
          回答完成
        </Button>
        <ConfirmModal
          visible={confirmModal}
          onCancel={() => this.handleModalClose('confirmModal')}
          title="你确定完成问题填写吗？"
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
  id: string // questionId
  title: string
  type: string
  editable: boolean
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
    data: rootStore.Answer.answerStore.data,
  }
}

export default withRouter(Question)
