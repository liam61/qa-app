import * as React from 'react'
import { inject, observer } from 'mobx-react'
import { Modal, InputItem } from 'antd-mobile'
import { IRootStore, IRootAction } from '../../typings'

import './index.scss'

@inject(injector)
@observer
export default class InputModal extends React.Component<IProps, IState> {
  static defaultProps = {
    prefixCls: 'component-input-modal',
  }

  state = { value: this.props.defaultValue }

  input: any

  // constructor(props: IProps) {
  //   super(props)
  //   console.log(props.defaultValue)
  // }

  componentDidMount() {
    if (this.input) {
      this.input.focus()
    }
  }

  componentWillReceiveProps(nextProps: IProps) {
    const { defaultValue } = nextProps
    const { value } = this.state

    if (defaultValue && defaultValue !== value) {
      this.setState({ value: defaultValue })
    }
  }

  handleChange = (value: string) => {
    this.setState({ value })
  }

  render() {
    const { prefixCls, visible, onCancel, title, onOK } = this.props
    const { value } = this.state

    return (
      <div className={prefixCls}>
        <Modal
          visible={visible}
          className='qa-modal input-modal'
          transparent
          maskTransitionName='am-fade'
          transitionName='am-zoom'
          footer={[
            { text: '取消', onPress: onCancel },
            { text: '确定', onPress: () => onOK(value) },
          ]}
        >
          <div className='qa-modal-title'>{title}</div>
          <InputItem
            ref={(node: any) => (this.input = node)}
            className='qa-input-item'
            value={value}
            onChange={this.handleChange}
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
  defaultValue: string
  onOK: (val: string) => void
  onCancel: () => void
}

interface IState extends Partial<injectorReturnType> {
  value: string
}

export interface IInputProps {
  title: React.ReactNode
  defaultValue: string
  key?: string
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
