import * as React from 'react'
import { inject, observer } from 'mobx-react'
import { Link, withRouter } from 'react-router-dom'
import { Tabs, Badge } from 'antd-mobile'
import { IRootStore, IRootAction } from 'typings'
import { request } from 'utils'

import './index.scss'

const getHomeTabs = (todos: number, colls: number, msgs: number) => [
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
      <Badge text={`${colls === 0 ? '' : todos}`}>
        <i className="fa fa-map-o fa-3x" aria-hidden="true" />
      </Badge>
    ),
  },
  {
    path: '/create?steps=info',
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

  state = {
    curTab: 0,
    todosNum: 0,
    collectionsNum: 0,
    messagesNum: 0,
  }

  constructor(props: IProps) {
    super(props)

    request.history = props.history
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

  handleBadgeChange = (type: 'todosNum' | 'collectionsNum' | 'messagesNum', num: number) => {
    this.setState({ [type]: num })
  }

  render() {
    const { prefixCls, children } = this.props
    const { curTab, todosNum, collectionsNum, messagesNum } = this.state

    return (
      <div className={prefixCls}>
        {children}
        <Tabs
          tabs={getHomeTabs(todosNum, collectionsNum, messagesNum)}
          initialPage={curTab}
          tabBarPosition="bottom"
          swipeable={false}
          renderTab={tab =>
            tab.path ? (
              <Link className="tab-link" to={tab.path}>
                {tab.title}
              </Link>
            ) : (
              <React.Fragment>{tab.title}</React.Fragment>
            )
          }
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
}

interface IState extends Partial<injectorReturnType> {
  curTab: number
  todosNum: number
  collectionsNum: number
  messagesNum: number
}

function injector({ rootStore, rootAction }: { rootStore: IRootStore; rootAction: IRootAction }) {
  return {}
}

export default withRouter(App)
