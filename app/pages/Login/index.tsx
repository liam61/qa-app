import * as React from 'react'
import { inject, observer } from 'mobx-react'
import { Link, withRouter } from 'react-router-dom'
import { InputItem, Button, Toast } from 'antd-mobile'
import { debounce } from 'utils'
import lockIcon from 'assets/images/lock.svg'
import { IRootStore, IRootAction } from 'typings'

import './index.scss'
import { DELAY_TIME } from 'common'
import { IError } from './interface'

export const noErrors: IError = { hasError: false, error: '' }

const ENTER_KEY = 13

@inject(injector)
@observer
class Login extends React.Component<IProps, IState> {
  static defaultProps = {
    prefixCls: 'page-login',
  }

  accountInput: any

  passwordInput: any

  state = {
    account: '',
    password: '',
    accountInfo: noErrors,
    loading: false,
    validate: '',
  }

  componentDidMount() {
    this.accountInput.focus()
  }

  handleKeyDown = (ev: any) => {
    if (ev.keyCode !== ENTER_KEY) {
      return
    }

    this.handleSubmit()
  }

  handleChange = (type: string, val: string) => {
    this.setState({ [type]: val })
  }

  handleAccountChange = (val: string) => {
    const { action } = this.props

    action!.validateAccount(val, (errors: IError, validate?: string) =>
      this.setState({ accountInfo: errors, validate })
    )
  }

  handlePasswordChange = (val: string) => {
    this.setState({ password: val })
  }

  handleErrorClick = (type: string) => {
    const { [type]: info } = this.state
    Toast.fail(info.error)
    this[`${type.slice(0, -4)}Input`].focus()
  }

  handleSubmit = () => {
    const { action, history } = this.props
    const { account, password, validate, accountInfo } = this.state

    if (!account || !password || accountInfo.hasError) {
      Toast.fail('请填写正确的登录信息！')

      return
    }

    this.setState({ loading: true })

    action!.login({ account, password, validate }, (success: boolean) => {
      this.setState({ loading: false })

      if (!success) {
        Toast.fail('认证失败，请重新登录！', DELAY_TIME, () => {
          this.setState({ password: '' })
          this.passwordInput.focus()
        })
      } else {
        history.push('/')
      }
    })
  }

  render() {
    const { prefixCls } = this.props
    const { account, password, accountInfo, loading } = this.state

    const { hasError: accountErr } = accountInfo

    return (
      <div className={`${prefixCls} qa-login`}>
        <div className="qa-login-header">欢迎使用！</div>
        <div className="qa-login-main">
          <InputItem
            className="qa-input-item"
            ref={(node: React.ReactNode) => (this.accountInput = node)}
            placeholder="请输入用户名或邮箱"
            value={account}
            maxLength={20}
            error={accountErr}
            onErrorClick={() => this.handleErrorClick('accountInfo')}
            onChange={debounce(this.handleAccountChange, (val: string) => this.setState({ account: val }))}
            onKeyDown={this.handleKeyDown}
          >
            <i className="fa fa-user-o fa-2x warning" aria-hidden="true" />
          </InputItem>
          <InputItem
            className="qa-input-item"
            ref={(node: React.ReactNode) => (this.passwordInput = node)}
            type="password"
            placeholder="请输入密码"
            value={password}
            maxLength={20}
            onChange={this.handlePasswordChange}
            onKeyDown={this.handleKeyDown}
          >
            <img src={lockIcon} className="password-icon" alt="password-icon" />
          </InputItem>
        </div>
        <div className="qa-login-footer">
          <Link to="/signup" className="btn-login">
            注册
            <i className="fa fa-angle-right icon" aria-hidden="true" />
          </Link>
          {/* <Link >忘记密码</Link> */}
          <Button className="btn-login" activeClassName="btn-login-active">
            忘记密码
          </Button>
        </div>
        <Button
          type="primary"
          className="qa-btn-bottom"
          disabled={accountErr || loading}
          loading={loading}
          onClick={this.handleSubmit}
        >
          登录
        </Button>
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
  account: string
  password: string
  accountInfo: IError
  loading: boolean
  validate: string | undefined
}

function injector({ rootStore, rootAction }: { rootStore: IRootStore; rootAction: IRootAction }) {
  return {
    store: rootStore.Login.loginStore,
    action: rootAction.Login.loginAction,
  }
}

export default withRouter(Login)
