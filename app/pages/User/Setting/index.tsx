import * as React from 'react'
import { inject, observer } from 'mobx-react'
import { InputItem, Button, WhiteSpace, Toast } from 'antd-mobile'
import PageHeader from '../../../components/PageHeader'
import lockIcon from '../../../assets/images/lock.svg'
// import { DELAY_TIME } from '../../../common/global'
import InputModal, { IInputProps } from '../../../components/InputModal'
import { IError } from '../../Login/interface'
import { noErrors } from '../../Login'
import { IRootStore, IRootAction } from '../../../typings'

import './index.scss'

@inject(injector)
@observer
export default class Setting extends React.Component<IProps, IState> {
  static defaultProps = {
    prefixCls: 'page-user-setting',
  }

  state = {
    inputModal: false,
    inputProps: { title: '', defaultValue: '', key: '' },
    emailInfo: noErrors,
    phoneInfo: noErrors,
  }

  handleModalShow = (title: string, info: object) => {
    this.setState({
      inputProps: {
        title: `修改${title}`,
        defaultValue: Object.values(info)[0],
        key: Object.keys(info)[0],
      },
      inputModal: true,
    })
  }

  handleModalClose = (type: string) => {
    this.setState({ [type]: false })
  }

  handleErrorClick = (type: string) => {
    const { [type]: info } = this.state
    Toast.fail(info.error)
  }

  handleSettingChange = (val: string) => {
    const { action } = this.props
    const {
      inputProps: { key },
    } = this.state

    action!.updateUserDataByKey(key, val, (errors: IError) => this.setState({ [`${key}Info`]: errors }))

    this.setState({ inputModal: false })
  }

  render() {
    const { prefixCls, onCancel, onOK, store } = this.props
    const { inputModal, inputProps, emailInfo, phoneInfo } = this.state

    const {
      data: { email, phone },
      updating,
    } = store!

    const { hasError: emailErr } = emailInfo
    const { hasError: phoneErr } = phoneInfo

    return (
      <div className="page-user-detail">
        <PageHeader text="设置" onCancel={onCancel} />
        <WhiteSpace size="lg" />
        <div className="page-user-detail-main">
          <InputItem
            className="qa-input-item user-input text-right"
            value={email}
            editable={false}
            error={emailErr}
            onErrorClick={() => this.handleErrorClick('emailInfo')}
            onClick={() => this.handleModalShow('邮箱', { email })}
          >
            <i className="fa fa-envelope-o warning" aria-hidden="true" />
            <span>邮箱</span>
          </InputItem>
          <InputItem
            className="qa-input-item user-input text-right"
            value={phone}
            editable={false}
            error={phoneErr}
            onErrorClick={() => this.handleErrorClick('phoneInfo')}
            onClick={() => this.handleModalShow('手机号码', { phone })}
          >
            <i className="fa fa-mobile" aria-hidden="true" />
            <span>手机号码</span>
          </InputItem>
          <InputItem
            className="qa-input-item user-input text-right"
            editable={false}
            extra={<i className="fa fa-angle-right fa-3x" aria-hidden="true" />}
            onClick={() => console.log('click passwor')}
          >
            <img src={lockIcon} className="password-icon" alt="password-icon" />
            <span>修改密码</span>
          </InputItem>
          <WhiteSpace size="lg" />
          <Button className="main-btn-quit">退出登录</Button>
        </div>
        <Button
          className="qa-btn-bottom"
          type="primary"
          onClick={onOK}
          loading={updating}
          disabled={updating || emailErr || phoneErr}
        >
          提交
        </Button>
        <InputModal
          visible={inputModal}
          onOK={this.handleSettingChange}
          onCancel={() => this.handleModalClose('inputModal')}
          {...inputProps}
        />
      </div>
    )
  }
}

type injectorReturnType = ReturnType<typeof injector>

interface IProps extends Partial<injectorReturnType> {
  prefixCls?: string
  onCancel: () => void
  onOK: () => void
}

interface IState extends Partial<injectorReturnType> {
  inputModal: boolean
  inputProps: IInputProps
  emailInfo: IError
  phoneInfo: IError
}

function injector({ rootStore, rootAction }: { rootStore: IRootStore; rootAction: IRootAction }) {
  return {
    store: rootStore.User.userStore,
    action: rootAction.User.userAction,
  }
}
