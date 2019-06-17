import * as React from 'react'
import { inject, observer } from 'mobx-react'

import './index.scss'
import PageHeader from 'components/PageHeader'
import { IRootStore, IRootAction } from '../../../typings'

@inject(injector)
@observer
export default class About extends React.Component<IProps, IState> {
  static defaultProps = {
    prefixCls: 'page-user-about',
  }

  async componentDidMount() {
    const { action } = this.props

    await action!.getResume()
  }

  render() {
    const { prefixCls, onCancel, store } = this.props

    return (
      <div className={prefixCls}>
        <PageHeader text="关于我" onCancel={onCancel} />
        <div className={`${prefixCls}-body`}>
          <div className="body-list resume">
            <div className="body-list-header qa-border-1px-bottom">简历</div>
            <ul className="body-list-main">
              <li>
                <a href="http://localhost:6260/v1/uploads/Resume.pdf" download>
                  个人简历
                </a>
              </li>
            </ul>
          </div>
          <div className="body-list info">
            <div className="body-list-header qa-border-1px-bottom">基本信息</div>
            <ul className="body-list-main">
              <li>姓名：刘李</li>
              <li>英文名：lawler</li>
              <li>坐标：成都</li>
              <li>教育经历：西南石油大学，本科，软件工程专业（2015 ~ 2019）</li>
              <li>座右铭：做自己觉得快乐并且有意义的事！</li>
              <li>兴趣爱好：运动，跳舞，看书</li>
            </ul>
          </div>
          <div className="body-list community">
            <div className="body-list-header qa-border-1px-bottom">社交圈</div>
            <ul className="body-list-main">
              <li>
                <a href="https://github.com/lawler61">Github</a>
              </li>
              <li>
                <a href="https://omyleon.com">个人站点</a>
              </li>
              <li>
                <a href="https://juejin.im/user/585001e12f301e00573d9d0c">掘金</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

type injectorReturnType = ReturnType<typeof injector>

interface IProps extends Partial<injectorReturnType> {
  prefixCls?: string
  onCancel: () => void
}

interface IState extends Partial<injectorReturnType> {
  [k: string]: any
}

function injector({ rootStore, rootAction }: { rootStore: IRootStore; rootAction: IRootAction }) {
  return {
    store: rootStore.User.aboutStore,
    action: rootAction.User.aboutAction,
  }
}
