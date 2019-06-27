import * as React from 'react'
import { inject, observer } from 'mobx-react'
import { withRouter } from 'react-router-dom'
import { Steps, Toast } from 'antd-mobile'
import PageModal from 'components/PageModal'
import InfoModal, { InfoTypes, IInfoProps } from 'components/InfoModal'
import { emptyFn } from 'utils'
import { IRootStore, IRootAction } from 'typings'
import ExtraPage from './Extra'
import InfoPage from './Info'
import QuestionPage from './Question'
import ReceiverPage from './Receiver'

import './index.scss'
import { DELAY_TIME } from 'common'

// TODO: modalProps 的工厂
const infoModalFactory = {
  warning: (callback = emptyFn): IInfoProps => ({
    type: 'warning',
    title: '暂无消息',
    content: '',
    onClose: callback,
  }),
  success: (callback = emptyFn): IInfoProps => ({
    type: 'success',
    title: '创建成功',
    content: '可在「post」界面中查看！',
    onClose: callback,
  }),
  fail: (callback = emptyFn): IInfoProps => ({
    type: 'fail',
    title: '创建失败',
    content: '请检查填写的内容！',
    onClose: callback,
  }),
}

@inject(injector)
@observer
class Create extends React.Component<IProps, IState> {
  static defaultProps = {
    prefixCls: 'page-create',
  }

  constructor(props: IProps) {
    super(props)

    const { history } = props

    const id = localStorage.getItem('userId') || ''

    if (!id) {
      Toast.fail('认证过期，请登录后再操作！', DELAY_TIME)

      history.push('/login')
    } else {
      history.replace('/create?step=info')
    }

    this.state = {
      // infoPageModal: true,
      questionPageModal: false,
      extraPageModal: false,
      infoModal: false,
      infoProps: infoModalFactory.warning(),
      receiverPageModal: false,
    }
  }

  componentWillUnmount() {
    // TODO: create 界面退出动画
  }

  handleInfoModalShow = (infoProps: IInfoProps) => {
    this.setState({ infoModal: true, infoProps })
  }

  handleModalShow = (type: string) => {
    this.setState({ [type]: true })
  }

  handleModalClose = (type: string) => {
    this.setState({ [type]: false })
  }

  handleFinish = () => {
    const { action, history } = this.props

    action!.submitQuestions((type: InfoTypes) =>
      this.handleInfoModalShow(
        infoModalFactory[type](() => {
          this.handleModalClose('infoModal')

          if (type === 'success') {
            history.push('/post')
          }
        })
      )
    )
  }

  onEnter = (page: string) => {
    const { history } = this.props

    history.push(`/create?step=${page}`)
    this.handleModalShow(`${page}PageModal`)
  }

  onBack = (page: string) => {
    const { history } = this.props

    history.goBack()

    this.handleModalClose(`${page}PageModal`)
  }

  onBackToApp = () => {
    const { history } = this.props

    history.goBack()
  }

  render() {
    const { prefixCls } = this.props
    const { questionPageModal, extraPageModal, infoModal, infoProps, receiverPageModal } = this.state

    return (
      <div className={prefixCls}>
        <InfoPage onOK={() => this.onEnter('question')} onCancel={this.onBackToApp} />
        <PageModal visible={questionPageModal}>
          <QuestionPage onOK={() => this.onEnter('extra')} onCancel={() => this.onBack('question')} />
        </PageModal>
        <PageModal visible={extraPageModal}>
          <ExtraPage
            onOK={this.handleFinish}
            onReceiver={() => this.onEnter('receiver')}
            onCancel={() => this.onBack('extra')}
          />
        </PageModal>
        <PageModal visible={receiverPageModal}>
          <ReceiverPage onCancel={() => this.onBack('receiver')} />
        </PageModal>
        <InfoModal visible={infoModal} {...infoProps} />
      </div>
    )
  }
}

const { Step } = Steps

export const steps = [{ title: '基本信息' }, { title: '创建问题' }, { title: '其他信息' }].map((s, i) => (
  <Step key={i} title={s.title} />
))

export const renderSteps = (num: number) => (
  <Steps current={num} direction="horizontal" className="qa-steps">
    {steps}
  </Steps>
)

type injectorReturnType = ReturnType<typeof injector>

interface IProps extends Partial<injectorReturnType> {
  prefixCls?: string
  history: any
}

interface IState extends Partial<injectorReturnType> {
  // infoPageModal: boolean
  questionPageModal: boolean
  extraPageModal: boolean
  infoModal: boolean
  infoProps: IInfoProps
  receiverPageModal: boolean
}

function injector({ rootStore, rootAction }: { rootStore: IRootStore; rootAction: IRootAction }) {
  return {
    store: rootStore.Create.createStore,
    action: rootAction.Create.createAction,
  }
}

export default withRouter(Create)
