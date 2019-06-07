import * as React from 'react'
import { inject, observer } from 'mobx-react'
import { Modal, Accordion, List } from 'antd-mobile'
import { IRootStore, IRootAction } from 'typings'

import './index.scss'

const { Panel } = Accordion
const { Item: ListItem } = List

@inject(injector)
@observer
export default class ReceiversModal extends React.Component<IProps, IState> {
  static defaultProps = {
    prefixCls: 'component-receivers-modal',
  }

  render() {
    const { prefixCls, visible, onCancel, title, applies } = this.props

    return (
      <div className={prefixCls}>
        <Modal
          visible={visible}
          className="qa-modal apply-modal"
          transparent
          maskTransitionName="am-fade"
          maskClosable
          onClose={onCancel}
          transitionName="am-zoom"
        >
          <div className="qa-modal-title">{title}</div>
          <div className="qa-modal-content">
            <Accordion defaultActiveKey="0" className="my-accordion" onChange={this.onChange}>
              <Panel header="Title 1">
                <List className="my-list">
                  <ListItem>content 1</ListItem>
                  <ListItem>content 2</ListItem>
                  <ListItem>content 3</ListItem>
                </List>
              </Panel>
              <Panel header="Title 2" className="pad">
                this is panel content2 or other
              </Panel>
              <Panel header="Title 3" className="pad">
                text text text text text text text text text text text text text text text
              </Panel>
            </Accordion>
          </div>
        </Modal>
      </div>
    )
  }
}

type injectorReturnType = ReturnType<typeof injector>

interface IProps extends Partial<injectorReturnType> {
  prefixCls?: string
  visible: boolean
  title: string
  applies: IFriend[]
  onCancel: () => void
}

interface IState extends Partial<injectorReturnType> {
  [k: string]: any
}

function injector({ rootStore, rootAction }: { rootStore: IRootStore; rootAction: IRootAction }) {
  return {}
}
