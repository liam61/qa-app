import * as React from 'react'
import { inject, observer } from 'mobx-react'
import { Button, WhiteSpace, Toast } from 'antd-mobile'
import ConfirmModal from 'components/ConfirmModal'
import InfoModal, { InfoTypes, IInfoProps } from 'components/InfoModal'
import PageHeader from 'components/PageHeader'
import { DELAY_TIME, TYPE_OPTIONS } from 'common'
import { emptyFn } from 'utils'
import { IRootStore, IRootAction } from 'typings'
import { IQstToSubmit, IReply } from '../../Create/interface'

import './index.scss'

const infoModalFactory = {
  warning: (callback = emptyFn): IInfoProps => ({
    type: 'warning',
    title: '暂无消息',
    content: '',
    onClose: callback,
  }),
  success: (callback = emptyFn): IInfoProps => ({
    type: 'success',
    title: '提交成功',
    content: '可在「todo」界面中查看！',
    onClose: callback,
  }),
  fail: (callback = emptyFn): IInfoProps => ({
    type: 'fail',
    title: '提交失败',
    content: '请检查填写的内容！',
    onClose: callback,
  }),
}

@inject(injector)
@observer
export default class Question extends React.Component<IProps, IState> {
  static defaultProps = {
    prefixCls: 'page-answer-question',
  }

  state = {
    confirmModal: false,
    infoModal: false,
    infoProps: infoModalFactory.warning(),
  }

  handleFinishReply = () => {
    const { action, data, onCancel } = this.props
    const replyArr: IReply[] = []

    const { qstItems, _id: detailId } = data!

    this.handleModalClose('confirmModal')

    const flag = qstItems.every(qst => {
      const { _id: id, num, required } = qst
      const replies = this[`qstItem${num}`].wrappedInstance.getReply()

      if (required && !replies.length) {
        Toast.fail('有必填项未完成！', DELAY_TIME)
        return false
      }

      if (replies.length) {
        replyArr.push({ replies, id: id || '' })
      }

      return true
    })

    if (flag) {
      action!.submitReply(detailId, replyArr, (type: InfoTypes) =>
        this.handleInfoModalShow(
          infoModalFactory[type](() => {
            this.handleModalClose('infoModal')

            if (type === 'success') {
              onCancel(true)
            }
          })
        )
      )
    }
  }

  handleModalShow = (type: string) => {
    this.setState({ [type]: true })
  }

  handleModalClose = (type: string) => {
    this.setState({ [type]: false })
  }

  handleInfoModalShow = (infoProps: IInfoProps) => {
    this.setState({ infoModal: true, infoProps })
  }

  renderQuestions = (qstItems: IQstToSubmit[], editable: boolean, poster: boolean) =>
    qstItems.map(question => {
      const { num, type, replies = [] } = question
      const Element = require(`components/${type === 'Answer' ? type : 'Single'}QstTodo`).default

      return (
        <React.Fragment key={num}>
          <Element
            ref={(node: React.ReactNode) => (this[`qstItem${num}`] = node)}
            editable={editable}
            {...question}
            replies={replies}
            poster={poster}
          />
          <WhiteSpace size="lg" />
        </React.Fragment>
      )
    })

  render() {
    const { prefixCls, data, title, type, editable, poster, onCancel } = this.props
    const { confirmModal, infoModal, infoProps } = this.state

    const { qstItems } = data!

    if (!qstItems.length) {
      return <div className={`${prefixCls} loading`}>加载中，请稍等...</div>
    }

    return (
      <div className={prefixCls}>
        <PageHeader text="问答问题" onCancel={() => onCancel(false)} />
        <div className="header-content">
          <div className="title qa-text-ellipsis">{title}</div>
          <span className="type">{TYPE_OPTIONS.find(t => t.key === type)!.value}</span>
        </div>
        <div className="question-wrapper">{this.renderQuestions(qstItems, editable, poster)}</div>
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
  poster: boolean
  onCancel: (refresh: boolean) => void
}

interface IState extends Partial<injectorReturnType> {
  confirmModal: boolean
  infoModal: boolean
  infoProps: IInfoProps
}

function injector({ rootStore, rootAction }: { rootStore: IRootStore; rootAction: IRootAction }) {
  return {
    store: rootStore.Answer.questionStore,
    action: rootAction.Answer.questionAction,
    data: rootStore.Answer.answerStore.data,
  }
}
