import * as React from 'react'
import { inject, observer } from 'mobx-react'
import { Modal } from 'antd-mobile'
import { IRootStore, IRootAction } from '../../typings'

import './index.scss'

@inject(injector)
@observer
export default class SelectModal extends React.Component<IProps, IState> {
  static defaultProps = {
    prefixCls: 'component-select-modal',
  }

  state = {
    selected: '',
  }

  handleChange = val => {
    this.setState({ selected: val })
  }

  render() {
    const { prefixCls, visible, onCancel, onOK, data } = this.props
    const { selected } = this.state

    return (
      <Modal
        popup
        visible={visible}
        animationType='slide-up'
        className={prefixCls}
      >
        <div className='btn-wrapper qa-border-1px-bottom'>
          <a role='button' className='cancel' onClick={onCancel}>
            取消
          </a>
          <a role='button' className='ok' onClick={() => onOK(selected)}>
            确定
          </a>
        </div>
        <div>
          {data.map((opt, index) => {
            const { key, value } = opt
            return (
              <div
                key={index}
                className={`select-item ${
                  index !== data.length - 1 ? 'qa-border-1px-bottom' : ''
                }`}
              >
                <div className='select-item-text'>{value}</div>
                <input
                  name='selectInput'
                  id={`selectInput${index}`}
                  type='radio'
                  value={key}
                  checked={key === selected}
                  onChange={this.handleChange}
                />
                <label htmlFor={`selectInput${index}`} />
              </div>
            )
          })}
        </div>
      </Modal>
    )
  }
}

type injectorReturnType = ReturnType<typeof injector>

interface IProps extends Partial<injectorReturnType> {
  prefixCls?: string
  visible: boolean
  onCancel: () => void
  onOK: (select: string) => void
  data: Array<{ key: string; value: string }>
}

interface IState extends Partial<injectorReturnType> {
  selected: string
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
