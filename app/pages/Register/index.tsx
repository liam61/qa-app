import * as React from 'react'
import { inject, observer } from 'mobx-react'
import { Link } from 'react-router-dom'
import { InputItem, Button, Toast } from 'antd-mobile'
import debounce from '../../utils/debounce'
import lockIcon from '../../assets/images/lock.svg'
// import lock2Icon from '../../assets/images/lock2.svg'
import lock3Icon from '../../assets/images/lock3.svg'
import { IResponse } from './actions/registerAction'
import { INoError } from '../Login/interface'
import { IRootStore, IRootAction } from '../../typings'

import './index.scss'

const userReg = /^(?=.{6,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/
const emailReg = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
const passwordReg = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/

@inject(injector)
@observer
export default class Register extends React.Component<IProps, IState> {
  static defaultProps = {
    prefixCls: 'page-register',
  }

  userInput: React.ReactNode

  emailInput: React.ReactNode

  passwordInput: React.ReactNode

  psdConfirmInput: React.ReactNode

  noErrors: INoError = { hasError: false, error: '' }

  state = {
    user: '',
    email: '',
    password: '',
    psdConfirm: '',
    userInfo: this.noErrors,
    emailInfo: this.noErrors,
    passwordInfo: this.noErrors,
    psdConfirmInfo: this.noErrors,
    loading: false,
  }

  handleChange = (type: string, val: string) => {
    this.setState({ [type]: val })
  }

  validateUser = (val: string) => {
    // handle by debounce
    const { action } = this.props
    const { user } = this.state

    if (val.length < 6) {
      this.setState({
        userInfo: { hasError: true, error: '用户名长度至少6位！' },
      })

      return
    }

    if (!userReg.test(val)) {
      this.setState({
        userInfo: {
          hasError: true,
          error: '只能包含 "字母 数组 . _" 4种符号，且特殊符号不能在首尾！',
        },
      })

      return
    }

    action!.validateUser(user, (data: IResponse) => {
      data.status === 'success'
        ? this.setState({ userInfo: this.noErrors })
        : this.setState({
            userInfo: { hasError: true, error: '该用户名已被注册！' },
          })
    })
  }

  validateEmail = (val: string) => {
    // handle by debounce
    const { action } = this.props
    const { email } = this.state

    if (!emailReg.test(val)) {
      // console.log('email')
      this.setState({
        emailInfo: { hasError: true, error: '请输入正确的邮箱！' },
      })
      return
    }

    action!.validateEmail(email, (data: IResponse) => {
      data.status === 'success'
        ? this.setState({ emailInfo: this.noErrors })
        : this.setState({
            emailInfo: { hasError: true, error: '该邮箱已被注册！' },
          })
    })
  }

  handlePasswordChange = (val: string) => {
    if (val.length < 6) {
      this.setState({
        passwordInfo: { hasError: true, error: '密码长度至少6位！' },
        password: val,
      })

      return
    }

    passwordReg.test(val) || val === ''
      ? this.setState({ passwordInfo: this.noErrors })
      : this.setState({
          passwordInfo: {
            hasError: true,
            error: '至少包含一个字母和一个数字！',
          },
        })

    this.setState({ password: val })
  }

  handlePsdConfirmChange = (val: string) => {
    const { password } = this.state

    val === password
      ? this.setState({ psdConfirmInfo: this.noErrors })
      : this.setState({
          psdConfirmInfo: { hasError: true, error: '两次填写的密码不一致！' },
        })

    this.setState({ psdConfirm: val })
  }

  handleErrorClick = (type: string) => {
    const { [type]: info } = this.state
    Toast.fail(info.error)
    this[`${type.slice(0, -4)}Input`].focus()
  }

  handleSubmit = () => {
    const { action } = this.props
    const { user, email, password, passwordInfo } = this.state

    if (!user || !email || !password || !passwordInfo) {
      Toast.fail('请输入注册信息！')
      return
    }

    this.setState({ loading: true })

    action!.register({ user, email, password }, (data: IResponse) => {
      console.log(data)

      this.setState({ loading: false })
    })
  }

  render() {
    const { prefixCls } = this.props
    const {
      user,
      email,
      password,
      psdConfirm,
      userInfo,
      emailInfo,
      passwordInfo,
      psdConfirmInfo,
      loading,
    } = this.state

    const { hasError: userErr } = userInfo
    const { hasError: emailErr } = emailInfo
    const { hasError: passwordErr } = passwordInfo
    const { hasError: psdConfirmErr } = psdConfirmInfo

    return (
      <div className={`${prefixCls} qa-login`}>
        <div className="qa-login-header">开启你的问答之旅！</div>
        <div className="qa-login-main">
          <InputItem
            ref={(node: React.ReactNode) => (this.userInput = node)}
            placeholder="请输入用户名"
            value={user}
            maxLength={20}
            error={userErr}
            onErrorClick={() => this.handleErrorClick('userInfo')}
            onChange={debounce(this.validateUser, (val: string) =>
              this.setState({ user: val })
            )}
          >
            <i className="fa fa-user-o fa-2x user-icon" aria-hidden="true" />
          </InputItem>
          <InputItem
            ref={(node: React.ReactNode) => (this.emailInput = node)}
            placeholder="请输入邮箱"
            value={email}
            error={emailErr}
            onErrorClick={() => this.handleErrorClick('emailInfo')}
            maxLength={30}
            onChange={debounce(this.validateEmail, (val: string) =>
              this.setState({ email: val })
            )}
          >
            <i
              className="fa fa-envelope-o fa-2x email-icon"
              aria-hidden="true"
            />
          </InputItem>
          <InputItem
            ref={(node: React.ReactNode) => (this.passwordInput = node)}
            type="password"
            placeholder="请输入密码"
            value={password}
            maxLength={20}
            error={passwordErr}
            onErrorClick={() => this.handleErrorClick('passwordInfo')}
            onChange={this.handlePasswordChange}
          >
            <img
              src={lock3Icon}
              className="password-icon"
              alt="password-icon"
            />
          </InputItem>
          <InputItem
            ref={(node: React.ReactNode) => (this.psdConfirmInput = node)}
            type="password"
            placeholder="请确认密码"
            value={psdConfirm}
            maxLength={20}
            error={psdConfirmErr}
            onErrorClick={() => this.handleErrorClick('psdConfirmInfo')}
            onChange={this.handlePsdConfirmChange}
          >
            <img
              src={lockIcon}
              className="psd-confirm-icon"
              alt="password-confirm-icon"
            />
          </InputItem>
          {/* TODO: 验证码 */}
        </div>
        <div className="qa-login-footer">
          <Link to="/login" className="btn-login">
            <i className="fa fa-angle-left icon" aria-hidden="true" />
            已拥有账号
          </Link>
        </div>
        <Button
          type="primary"
          className="qa-btn-bottom"
          disabled={
            userErr || emailErr || passwordErr || psdConfirmErr || loading
          }
          loading={loading}
          onClick={this.handleSubmit}
        >
          立即注册
        </Button>
      </div>
    )
  }
}

type injectorReturnType = ReturnType<typeof injector>

interface IProps extends Partial<injectorReturnType> {
  prefixCls?: string
}

interface IState extends Partial<injectorReturnType> {
  user: string
  email: string
  password: string
  psdConfirm: string
  userInfo: INoError
  emailInfo: INoError
  passwordInfo: INoError
  psdConfirmInfo: INoError
  loading: boolean
}

function injector({
  rootStore,
  rootAction,
}: {
  rootStore: IRootStore
  rootAction: IRootAction
}) {
  return {
    store: rootStore.Register.registerStore,
    action: rootAction.Register.registerAction,
  }
}
