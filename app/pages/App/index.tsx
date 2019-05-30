import * as React from 'react'
import { inject, observer } from 'mobx-react'
import { Link } from 'react-router-dom'
import { Tabs, Badge } from 'antd-mobile'
import TodoPage from '../Todo'
import PostPage from '../Post'
import MessagePage from '../Message'
import UserPage from '../User'
import { IRootStore, IRootAction } from '../../typings'

import './index.scss'

const getHomeTabs = (todos: number, colls: number, msgs: number) => [
  {
    title: (
      <Badge text={`${todos === 0 ? '' : todos}`}>
        <i className='fa fa-hourglass-half fa-3x' aria-hidden='true' />
      </Badge>
    ),
  },
  {
    title: (
      <Badge text={`${colls === 0 ? '' : todos}`}>
        <i className='fa fa-map-o fa-3x' aria-hidden='true' />
      </Badge>
    ),
  },
  {
    path: '/create?steps=info',
    title: (
      <i
        className='fa fa-pencil-square-o fa-4x tab-create'
        aria-hidden='true'
      />
    ),
  },
  {
    title: (
      <Badge text={`${msgs === 0 ? '' : todos}`}>
        <i className='fa fa-comments-o fa-3x' aria-hidden='true' />
      </Badge>
    ),
  },
  {
    title: (
      <Badge dot>
        <i className='fa fa-user-o fa-3x' aria-hidden='true' />
      </Badge>
    ),
  },
]

@inject(injector)
@observer
export default class App extends React.Component<IProps, IState> {
  static defaultProps = {
    prefixCls: 'page-app',
  }

  state = {
    curTab: 0,
    todosNum: 0,
    collectionsNum: 0,
    messagesNum: 0,
  }

  componentDidMount() {
    // const { history } = this.props
    // history.listen((params, action) => {})
  }

  handleTabClick = (tab: any, index: number) => {
    // const { action } = this.props
    // if (!tab.path) { action!.appAction.changeTab(index) }

    if (!tab.path) {
      this.setState({ curTab: index })
    }
  }

  handleBadgeChange = (
    type: 'todosNum' | 'collectionsNum' | 'messagesNum',
    num: number,
  ) => {
    this.setState({ [type]: num })
  }

  render() {
    const { prefixCls } = this.props
    const { curTab, todosNum, collectionsNum, messagesNum } = this.state

    return (
      <div className={prefixCls}>
        <Tabs
          tabs={getHomeTabs(todosNum, collectionsNum, messagesNum)}
          initialPage={curTab}
          tabBarPosition='bottom'
          swipeable={false}
          renderTab={tab =>
            tab.path ? (
              // <Link to={{ pathname: tab.path, state: { curTab } }}>{tab.title}</Link>
              <Link className='tab-link' to={tab.path}>
                {tab.title}
              </Link>
            ) : (
              <React.Fragment>{tab.title}</React.Fragment>
            )
          }
          onTabClick={this.handleTabClick}
        >
          <TodoPage onBadgeChange={this.handleBadgeChange} />
          <PostPage onBadgeChange={this.handleBadgeChange} />
          <div />
          <MessagePage onBadgeChange={this.handleBadgeChange} />
          <UserPage />
        </Tabs>
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
  curTab: number
  todosNum: number
  collectionsNum: number
  messagesNum: number
}

function injector({
  rootStore,
  rootAction,
}: {
  rootStore: IRootStore
  rootAction: IRootAction,
}) {
  return {}
}
