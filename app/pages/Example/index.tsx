import * as React from 'react'
import { inject, observer } from 'mobx-react'
import { Button } from 'antd-mobile'
import ExampleCom from '../../components/ExampleCom/Loadable'
import { IRootStore, IRootAction } from '../../typings'

import './index.scss'

import addIcon from '../../assets/images/add.svg'

@inject(injector)
@observer
export default class Example extends React.Component<Props, {}> {
  static defaultProps = {
    prefixCls: 'page-example',
  }

  componentDidMount() {
    this.handleLoadGoods()
  }

  handleLoadGoods = () => {
    const { action } = this.props
    action!.exampleAction.loadGoods() // Object is possibly not defined
  }

  render() {
    const { prefixCls, store } = this.props
    const { curGoods, isloading } = store!.exampleStore

    return (
      <div className={prefixCls}>
        this is example page
        <ExampleCom name="lawler" />
        <img src={addIcon} alt="addIcon" />
        <h1>当前产品</h1>
        {isloading ? (
          <h1 className="loading">loading...</h1>
        ) : (
          <React.Fragment>
            <ul className='qa-border-1px'>
              <li>{curGoods!.name}</li>
              <li>{curGoods!.desc}</li>
            </ul>
            <Button type="primary" onClick={this.handleLoadGoods}>
              换一个
            </Button>
          </React.Fragment>
        )}
      </div>
    )
  }
}

type injectorReturnType = ReturnType<typeof injector>

interface Props extends Partial<injectorReturnType> {
  prefixCls?: string
  [k: string]: any
}

function injector({
  rootStore,
  rootAction,
}: {
  rootStore: IRootStore
  rootAction: IRootAction
}) {
  return {
    store: rootStore.Example,
    action: rootAction.Example,
  }
}
