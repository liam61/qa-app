import * as React from 'react'
import { inject, observer } from 'mobx-react'
import { withRouter } from 'react-router-dom'
// import { Button, Toast } from 'antd-mobile'
import qs from 'qs'
import InfoPage from './Info'
import QuestionPage from './Question'
import PageModal from '../../components/PageModal'
import { IRootStore, IRootAction } from '../../typings'
import { IData } from '../Todo/stores/todoStore'

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
    const { action, id, history, onCancel, poster } = this.props

    action!.getQstDetail(id, poster)

    history.listen((params: object, type: string) => {
      const { pathname, search } = params

      if (pathname === '/' && search === '' && type === 'POP') {
        onCancel()
      }
    })
  }

  handleModalShow = (type: string) => {
    this.setState({ [type]: true }) // tslint:disable-line
  }

  handleModalClose = (type: string) => {
    this.setState({ [type]: false }) // tslint:disable-line
  }

  onEnterQstPage = () => {
    const { history, id } = this.props
    history.push(`/?steps=questions&id=${id}`)
    this.handleModalShow('qstPageModal')
  }

  render() {
    const { prefixCls, info, poster } = this.props
    const { qstPageModal } = this.state
    const { _id: id, title, type } = info

    return (
      <div className={prefixCls}>
        <InfoPage onOK={this.onEnterQstPage} {...info} />
        <PageModal visible={qstPageModal}>
          <QuestionPage
            id={id}
            title={title}
            type={type}
            editable={!poster}
            onCancel={() => this.handleModalClose('qstPageModal')}
          />
        </PageModal>
      </div>
    )
  }
}

type injectorReturnType = ReturnType<typeof injector>

// interface IInfo extends IData { cover: string }

interface IProps extends Partial<injectorReturnType> {
  prefixCls?: string
  id: string
  info: IData & { cover: string }
  poster: boolean // 是否为本人查看 （post 界面传来的）
  onCancel: () => void
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
