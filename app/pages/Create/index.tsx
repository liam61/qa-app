import * as React from 'react'
import { inject, observer } from 'mobx-react'
import { withRouter } from 'react-router-dom'
import { Steps } from 'antd-mobile'
import QuestionPage from './Question'
import InfoPage from './Info'
import ExtraPage from './Extra'
import PageModal from '../../components/PageModal'
import InfoModal, { InfoTypes, IInfoProps } from '../../components/InfoModal'
import { IRootStore, IRootAction } from '../../typings'

import './index.scss'

@inject(injector)
@observer
class Create extends React.Component<IProps, IState> {
  static defaultProps = {
    prefixCls: 'page-create',
  }

  // TODO: modalProps 的工厂
  // modalPropsFactory = {
  //   info() {
  //     init: {
  //       type: 'warning', title: '', content: ''
  //     }
  //   }
  // }

  state = {
    infoPageModal: true,
    qstPageModal: false,
    extraPageModal: false,
    infoModal: false,
    infoProps: {
      type: 'warning' as InfoTypes,
      title: '',
      content: '',
      onClose: () => console.log('info'),
    },
  }

  componentWillUnmount() {
    // TODO: create 界面退出动画
    this.handleModalClose('infoPageModal')
    console.log('unmount create')
  }

  handleInfoModalShow = (infoProps: IInfoProps) => {
    this.setState({
      infoModal: true,
      infoProps,
    })
  }

  handlePageModalShow = type => {
    this.setState({ [type]: true }) // tslint:disable-line
  }

  handleModalClose = type => {
    this.setState({ [type]: false }) // tslint:disable-line
  }

  handleFinish = () => {
    const { action } = this.props

    action!.submitQuestions((type: InfoTypes) =>
      this.handleInfoModalShow({
        type,
        title: '创建成功',
        content: '可在个人中心中查看',
        onClose: () => {
          this.handleModalClose('infoModal')
          if (type === 'success') {
            this.props.history.push('/')
          }
        },
      }),
    )
  }

  render() {
    const { prefixCls } = this.props
    const {
      infoPageModal,
      qstPageModal,
      extraPageModal,
      infoModal,
      infoProps,
    } = this.state

    return (
      <div className={prefixCls}>
        <PageModal visible={infoPageModal}>
          <InfoPage
            onOK={() => this.handlePageModalShow('qstPageModal')}
            onCancel={() => this.handleModalClose('infoPageModal')}
          />
        </PageModal>
        <PageModal visible={qstPageModal}>
          <QuestionPage
            onOK={() => this.handlePageModalShow('extraPageModal')}
            onCancel={() => this.handleModalClose('qstPageModal')}
          />
        </PageModal>
        <PageModal visible={extraPageModal}>
          <ExtraPage
            onOK={this.handleFinish}
            onCancel={() => this.handleModalClose('extraPageModal')}
          />
        </PageModal>
        <InfoModal visible={infoModal} {...infoProps} />
      </div>
    )
  }
}

const { Step } = Steps

export const steps = [
  {
    title: '基本信息',
  },
  {
    title: '创建问题',
  },
  {
    title: '其他信息',
  },
].map((s, i) => <Step key={i} title={s.title} />)

export const renderSteps = (num: number) => (
  <Steps current={num} direction='horizontal'>
    {steps}
  </Steps>
)

type injectorReturnType = ReturnType<typeof injector>

interface IProps extends Partial<injectorReturnType> {
  prefixCls?: string
  [k: string]: any
}

interface IState extends Partial<injectorReturnType> {
  infoPageModal: boolean
  qstPageModal: boolean
  extraPageModal: boolean
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
    store: rootStore.Create.createStore,
    action: rootAction.Create.createAction,
  }
}

export default withRouter(Create)
