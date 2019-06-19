import * as React from 'react'
import { inject, observer } from 'mobx-react'
import { withRouter } from 'react-router-dom'
import { SearchBar, Toast } from 'antd-mobile'
import PageModal from 'components/PageModal'
import ListView from 'components/QaListView'
import { IRootStore, IRootAction } from 'typings'
import AnswerPage from '../Answer'
import { IData } from './stores/todoStore'

import './index.scss'
import { DELAY_TIME } from 'common'
import { emptyFn } from 'utils'

@inject(injector)
@observer
class Todo extends React.Component<IProps, IState> {
  static defaultProps = {
    prefixCls: 'page-todo',
  }

  // constructor(props: IProps) {
  //   super(props)

  //   const { history } = props
  //   const id = localStorage.getItem('userId') || ''

  //   if (!id) {
  //     Toast.fail('认证过期，请登录后再操作！', DELAY_TIME)
  //     history.push('/login')
  //   }
  // }

  state = {
    search: '',
    answerPageModal: false,
    answerPageKey: '',
    answerPageInfo: {} as IData,
  }

  async componentDidMount() {
    const { action, onBadgeChange = emptyFn } = this.props

    await action!.getListData(false, onBadgeChange)
  }

  handleSearchChange = (val: string) => {
    this.setState({ search: val })
  }

  handleModalShow = (type: string) => {
    this.setState({ [type]: true })
  }

  handleModalClose = (type: string) => {
    this.setState({ [type]: false })
  }

  handleListItemClick = (id: string, info: IData, cover: string) => {
    const { history } = this.props

    history.push(`/todo?detail=${id}`)

    this.setState({
      answerPageKey: id,
      answerPageModal: true,
      answerPageInfo: Object.assign({ cover }, info),
    })
  }

  handleEndReached = (_event: any) => {
    // load new data
    console.log('reach end')

    const { store, action } = this.props
    const { pageIndex, totalPage } = store!

    if (pageIndex === totalPage) {
      return
    }

    action!.getNextListData(pageIndex)
  }

  handleRefresh = () => {
    const { action, onBadgeChange } = this.props

    action!.getListData(true, onBadgeChange, 1)
  }

  render() {
    const { prefixCls, store } = this.props
    const { search, answerPageModal, answerPageKey, answerPageInfo } = this.state

    const { dataList, loading, refreshing, pageSize } = store!

    return (
      <div className={prefixCls}>
        <SearchBar value={search} placeholder="搜索..." maxLength={20} onChange={this.handleSearchChange} />
        <ListView
          dataList={dataList}
          loading={loading}
          onEndReached={this.handleEndReached}
          refreshing={refreshing}
          onRefresh={this.handleRefresh}
          onClick={this.handleListItemClick}
          pageSize={pageSize}
        />
        <PageModal visible={answerPageModal}>
          <AnswerPage
            id={answerPageKey}
            info={answerPageInfo}
            poster={false}
            onCancel={() => this.handleModalClose('answerPageModal')}
          />
        </PageModal>
      </div>
    )
  }
}

type injectorReturnType = ReturnType<typeof injector>

interface IProps extends Partial<injectorReturnType> {
  prefixCls?: string
  onBadgeChange: (type: string, num: number) => void
  history: any
}

interface IState extends Partial<injectorReturnType> {
  search: string
  answerPageModal: boolean
  answerPageKey: string
  answerPageInfo: IData
}

function injector({ rootStore, rootAction }: { rootStore: IRootStore; rootAction: IRootAction }) {
  return {
    store: rootStore.Todo.todoStore,
    action: rootAction.Todo.todoAction,
  }
}

export default withRouter(Todo)
