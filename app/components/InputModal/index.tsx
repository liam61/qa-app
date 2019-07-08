import * as React from 'react'
import { inject, observer } from 'mobx-react'
import { Modal, InputItem } from 'antd-mobile'
import { IRootStore, IRootAction } from 'typings'
import { emptyFn } from 'utils'

import './index.scss'

@inject(injector)
@observer
export default class InputModal extends React.Component<IProps, IState> {
  static defaultProps = {
    prefixCls: 'component-input-modal',
  }

  state = { value: this.props.defaultValue || '' }

  input: any

  componentWillReceiveProps(nextProps: IProps) {
    const { defaultValue } = nextProps
    const { value } = this.state

    if (defaultValue && defaultValue !== value) {
      this.setState({ value: defaultValue })
    }
  }

  handleChange = (value: string) => {
    const { onChange = emptyFn } = this.props
    this.setState({ value })

    onChange(value)
  }

  render() {
    const { prefixCls, visible, onCancel, title, onOK, placeholder = '' } = this.props
    const { value } = this.state

    return (
      <div className={prefixCls}>
        <Modal
          visible={visible}
          className="qa-modal input-modal"
          transparent
          maskTransitionName="am-fade"
          transitionName="am-zoom"
          footer={[{ text: '取消', onPress: onCancel }, { text: '确定', onPress: () => onOK(value) }]}
        >
          <div className="qa-modal-title">{title}</div>
          <InputItem
            className="qa-input-item"
            value={value}
            onChange={this.handleChange}
            placeholder={placeholder}
            autoFocus
          />
        </Modal>
      </div>
    )
  }
}

type injectorReturnType = ReturnType<typeof injector>

interface IProps extends Partial<injectorReturnType> {
  prefixCls?: string
  visible: boolean
  title: React.ReactNode
  placeholder?: string
  defaultValue?: string
  onOK: (val: string) => void
  onChange?: (val: string) => void
  onCancel: () => void
}

interface IState extends Partial<injectorReturnType> {
  value: string
}

export interface IInputProps {
  title: React.ReactNode
  defaultValue?: string
  key?: string // TODO: key 有什么用
}

function injector({ rootStore, rootAction }: { rootStore: IRootStore; rootAction: IRootAction }) {
  return {}
}
