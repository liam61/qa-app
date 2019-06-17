import * as React from 'react'
import { inject, observer } from 'mobx-react'
import { Link, withRouter } from 'react-router-dom'
import { Tabs, Badge } from 'antd-mobile'
import { IRootStore, IRootAction } from 'typings'

import './index.scss'
import { request } from 'utils'

const getHomeTabs = (todos: number, posts: number, msgs: number) => [
  {
    path: '/todo',
    title: (
      <Badge text={`${todos === 0 ? '' : todos}`}>
        <i className="fa fa-hourglass-half fa-3x" aria-hidden="true" />
      </Badge>
    ),
  },
  {
    path: '/post',
    title: (
      <Badge text={`${posts === 0 ? '' : todos}`}>
        <i className="fa fa-map-o fa-3x" aria-hidden="true" />
      </Badge>
    ),
  },
  {
    path: '/create?step=info',
    title: <i className="fa fa-pencil-square-o fa-4x tab-create" aria-hidden="true" />,
  },
  {
    path: '/message',
    title: (
      <Badge text={`${msgs === 0 ? '' : todos}`}>
        <i className="fa fa-comments-o fa-3x" aria-hidden="true" />
      </Badge>
    ),
  },
  {
    path: '/user',
    title: (
      <Badge dot>
        <i className="fa fa-user-o fa-3x" aria-hidden="true" />
      </Badge>
    ),
  },
]

@inject(injector)
@observer
class App extends React.Component<IProps, IState> {
  static defaultProps = {
    prefixCls: 'page-app',
  }

  constructor(props: IProps) {
    super(props)

    request.history = props.history

    const {
      location: { pathname },
    } = props.history

    this.state = {
      curTab: ['/todo', '/post', '/create', '/message', '/user'].indexOf(pathname) || 0,
      todoNum: 0,
      postNum: 0,
      messageNum: 0,
    }
  }

  handleTabClick = (tab: any, index: number) => {
    // const { action } = this.props
    // if (!tab.path) { action!.appAction.changeTab(index) }
    if (!tab.path) {
      this.setState({ curTab: index })
    }
  }

  handleBadgeChange = (type: 'todoNum' | 'postNum' | 'messageNum', num: number) => {
    this.setState({ [type]: num })
  }

  render() {
    const { prefixCls, children } = this.props
    const { curTab, todoNum, postNum, messageNum } = this.state

    return (
      <div className={prefixCls}>
        {children}
        <Tabs
          tabs={getHomeTabs(todoNum, postNum, messageNum)}
          initialPage={curTab}
          tabBarPosition="bottom"
          swipeable={false}
          renderTab={tab => (
            <Link className="tab-link" to={tab.path}>
              {tab.title}
            </Link>
          )}
          onTabClick={this.handleTabClick}
        >
          <div />
          <div />
          <div />
          <div />
          <div />
        </Tabs>
      </div>
    )
  }
}

type injectorReturnType = ReturnType<typeof injector>

interface IProps extends Partial<injectorReturnType> {
  prefixCls?: string
  history: any
}

interface IState extends Partial<injectorReturnType> {
  curTab: number
  todoNum: number
  postNum: number
  messageNum: number
}

function injector({ rootStore, rootAction }: { rootStore: IRootStore; rootAction: IRootAction }) {
  return {}
}

export default withRouter(App)
