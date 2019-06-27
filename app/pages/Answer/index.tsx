import * as React from 'react'
import { inject, observer } from 'mobx-react'
import { withRouter } from 'react-router-dom'
// import { Button, Toast } from 'antd-mobile'
import PageModal from 'components/PageModal'
import { IRootStore, IRootAction } from 'typings'
import InfoPage from './Info'
import QuestionPage from './Question'
import { IData } from '../Todo/stores/todoStore'

import './index.scss'
import { emptyFn } from 'utils'

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
    const { action, id, poster } = this.props

    action!.getQstDetail(id, poster)
  }

  handleModalShow = (type: string) => {
    this.setState({ [type]: true })
  }

  handleModalClose = (type: string) => {
    this.setState({ [type]: false })
  }

  onEnterQstPage = () => {
    this.handleModalShow('qstPageModal')
  }

  onBack = (refresh: boolean) => {
    const { onCancel } = this.props

    if (refresh) {
      this.handleModalClose('qstPageModal')
    }

    onCancel()
  }

  render() {
    const { prefixCls, info, poster, onCancel } = this.props
    const { qstPageModal } = this.state
    const { _id: id, title, type, status } = info

    return (
      <div className={prefixCls}>
        <InfoPage onOK={this.onEnterQstPage} {...info} onCancel={onCancel} poster={poster} />
        <PageModal visible={qstPageModal}>
          <QuestionPage
            id={id}
            title={title}
            type={type}
            editable={!poster && status !== 'completed' && status !== 'expired'}
            poster={poster}
            onCancel={this.onBack}
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

function injector({ rootStore, rootAction }: { rootStore: IRootStore; rootAction: IRootAction }) {
  return {
    store: rootStore.Answer.answerStore,
    action: rootAction.Answer.answerAction,
    todoAction: rootAction.Todo.todoAction,
    postAction: rootAction.Post.postAction,
  }
}

export default withRouter(Answer)
