import * as React from 'react'
import { inject, observer } from 'mobx-react'
import { withRouter } from 'react-router'
import { Button, Toast } from 'antd-mobile'
import InfoPage from './Info'
import QuestionPage from './Question'
import PageModal from '../../components/PageModal'
import { IRootStore, IRootAction } from '../../typings'

import './index.scss'

@inject(injector)
@observer
class Answer extends React.Component<IProps, IState> {
  static defaultProps = {
    prefixCls: 'page-answer',
  }

  state = {
    qstPageModal: false,
  }

  componentDidMount() {
    const { action } = this.props

    action!.getQuestions()
  }

  handleModalShow = type => {
    this.setState({ [type]: true }) // tslint:disable-line
  }

  handleModalClose = type => {
    this.setState({ [type]: false }) // tslint:disable-line
  }

  onEnterQstPage = () => {
    const { history } = this.props
    history.push('/?steps=todo')
    this.handleModalShow('qstPageModal')
  }

  render() {
    const { prefixCls, store } = this.props
    const { qstPageModal } = this.state
    const { data } = store!

    if (!data) {
      return <h1>Loading</h1>
    }

    const { questions, ...rest } = data

    return (
      <div className={prefixCls}>
        <InfoPage {...rest} />
        <Button className='finish-question' onClick={this.onEnterQstPage}>
          <i className='fa fa-paint-brush' aria-hidden='true' />
          <span>完成问题</span>
        </Button>
        <PageModal visible={qstPageModal}>
          <QuestionPage
            // onOK={this.handleFinish}
            // questions={questions}
            onCancel={() => this.handleModalClose('qstPageModal')}
          />
        </PageModal>
      </div>
    )
  }
}

type injectorReturnType = ReturnType<typeof injector>

interface IProps extends Partial<injectorReturnType> {
  prefixCls?: string
  [k: string]: any
}

interface IState extends Partial<injectorReturnType> {
  qstPageModal: boolean
}

function injector({
  rootStore,
  rootAction,
}: {
  rootStore: IRootStore
  rootAction: IRootAction,
}) {
  return {
    store: rootStore.Answer.answerStore,
    action: rootAction.Answer.answerAction,
  }
}

export default withRouter(Answer)
