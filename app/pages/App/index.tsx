import * as React from 'react'
import { inject, observer } from 'mobx-react'
import { Link, withRouter } from 'react-router-dom'
import { Tabs, Badge } from 'antd-mobile'
import TodoPage from '../Todo'
import CollectionPage from '../Collection'
import MessagePage from '../Message'
import UserPage from '../User'
import { IRootStore, IRootAction } from '../../typings'

import './index.scss'

const homeTabs = [
  {
    title: (
      <Badge text='3'>
        <i className='fa fa-hourglass-half fa-3x' aria-hidden='true' />
      </Badge>
    ),
  },
  {
    title: (
      <Badge>
        <i className='fa fa-map-o fa-3x' aria-hidden='true' />
      </Badge>
    ),
  },
  {
    path: '/create',
    title: (
      <i
        className='fa fa-pencil-square-o fa-4x tab-create'
        aria-hidden='true'
      />
    ),
  },
  {
    title: (
      <Badge text='65'>
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
export default class App extends React.Component<IProps, {}> {
  static defaultProps = {
    prefixCls: 'page-app',
  }

  componentDidMount() {
    // const { history } = this.props
    // history.listen((params, action) => {})
  }

  handleTabClick = (tab, index) => {
    const { action } = this.props

    if (!tab.path) {
      action!.appAction.changeTab(index)
    }
  }

  render() {
    const { prefixCls, store } = this.props
    const { curTab } = store!.appStore
    return (
      <div className={prefixCls}>
        <Tabs
          tabs={homeTabs}
          initialPage={curTab}
          tabBarPosition='bottom'
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
          <TodoPage />
          <CollectionPage />
          <div />
          <MessagePage />
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

function injector({
  rootStore,
  rootAction,
}: {
  rootStore: IRootStore
  rootAction: IRootAction,
}) {
  return {
    store: rootStore.App,
    action: rootAction.App,
  }
}
