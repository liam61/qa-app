import * as React from 'react'
import { inject, observer } from 'mobx-react'
import { Link } from 'react-router-dom'
import { InputItem, Button, Toast } from 'antd-mobile'
import { debounce } from '../../utils'
import lockIcon from '../../assets/images/lock.svg'
// import lock2Icon from '../../assets/images/lock2.svg'
import lock3Icon from '../../assets/images/lock3.svg'
import { noErrors } from '../Login'
import { IError } from '../Login/interface'
import { IRootStore, IRootAction } from '../../typings'

import './index.scss'

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

  state = {
    user: '',
    email: '',
    password: '',
    psdConfirm: '',
    usernameInfo: noErrors,
    emailInfo: noErrors,
    passwordInfo: noErrors,
    psdConfirmInfo: noErrors,
    loading: false,
  }

  handleChange = (type: string, val: string) => {
    this.setState({ [type]: val })
  }

  handleUserChange = (val: string) => {
    const { action } = this.props

    action!.validateUser(val, (errors: IError) =>
      this.setState({ usernameInfo: errors }),
    )
  }

  // validateUser = (val: string) => {
  //   // handle by debounce
  //   const { action } = this.props
  //   const { user } = this.state

  //   if (val.length < 6) {
  //     this.setState({
  //       usernameInfo: { hasError: true, error: '用户名长度至少6位！' },
  //     })

  //     return
  //   }

  //   if (!USER_REG.test(val)) {
  //     this.setState({
  //       usernameInfo: {
  //         hasError: true,
  //         error: '只能包含 "字母 数组 . _" 4种符号，且特殊符号不能在首尾！',
  //       },
  //     })

  //     return
  //   }

  //   action!.validateUser(user, (success: boolean) => {
  //     success
  //       ? this.setState({ usernameInfo: noErrors })
  //       : this.setState({
  //           usernameInfo: { hasError: true, error: '该用户名已被注册！' },
  //         })
  //   })
  // }

  handleEmailChange = (val: string) => {
    const { action } = this.props

    action!.validateEmail(val, (errors: IError) =>
      this.setState({ emailInfo: errors }),
    )
  }

  // validateEmail = (val: string) => {
  //   // handle by debounce
  //   const { action } = this.props
  //   const { email } = this.state

  //   if (!EMAIL_REG.test(val)) {
  //     // console.log('email')
  //     this.setState({
  //       emailInfo: { hasError: true, error: '请输入正确的邮箱！' },
  //     })
  //     return
  //   }

  //   action!.validateEmail(email, (success: boolean) => {
  //     success
  //       ? this.setState({ emailInfo: noErrors })
  //       : this.setState({
  //           emailInfo: { hasError: true, error: '该邮箱已被注册！' },
  //         })
  //   })
  // }

  handlePasswordChange = (val: string) => {
    const { action } = this.props

    this.setState({ password: val })

    action!.validatePassword(val, (errors: IError) =>
      this.setState({ passwordInfo: errors }),
    )
  }

  handlePsdConfirmChange = (val: string) => {
    const { action } = this.props
    const { password } = this.state

    this.setState({ psdConfirm: val })

    action!.validatePsdConfirm(val, password, (errors: IError) =>
      this.setState({ psdConfirmInfo: errors }),
    )
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

    action!.register({ user, email, password }, (success: boolean) => {
      console.log(success)
      // TODO: 可以用 infoModal 来提示

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
      usernameInfo,
      emailInfo,
      passwordInfo,
      psdConfirmInfo,
      loading,
    } = this.state

    const { hasError: usernameErr } = usernameInfo
    const { hasError: emailErr } = emailInfo
    const { hasError: passwordErr } = passwordInfo
    const { hasError: psdConfirmErr } = psdConfirmInfo

    return (
      <div className={`${prefixCls} qa-login`}>
        <div className='qa-login-header'>开启你的问答之旅！</div>
        <div className='qa-login-main'>
          <InputItem
            className='qa-input-item'
            ref={(node: React.ReactNode) => (this.userInput = node)}
            placeholder='请输入用户名'
            value={user}
            maxLength={20}
            error={usernameErr}
            onErrorClick={() => this.handleErrorClick('usernameInfo')}
            onChange={debounce(this.handleUserChange, (val: string) =>
              this.setState({ user: val }),
            )}
          >
            <i className='fa fa-user-o fa-2x warning' aria-hidden='true' />
          </InputItem>
          <InputItem
            className='qa-input-item'
            ref={(node: React.ReactNode) => (this.emailInput = node)}
            placeholder='请输入邮箱'
            value={email}
            error={emailErr}
            onErrorClick={() => this.handleErrorClick('emailInfo')}
            maxLength={30}
            onChange={debounce(this.handleEmailChange, (val: string) =>
              this.setState({ email: val }),
            )}
          >
            <i className='fa fa-envelope-o fa-2x blue' aria-hidden='true' />
          </InputItem>
          <InputItem
            className='qa-input-item'
            ref={(node: React.ReactNode) => (this.passwordInput = node)}
            type='password'
            placeholder='请输入密码'
            value={password}
            maxLength={20}
            error={passwordErr}
            onErrorClick={() => this.handleErrorClick('passwordInfo')}
            onChange={this.handlePasswordChange}
          >
            <img
              src={lock3Icon}
              className='password-icon'
              alt='password-icon'
            />
          </InputItem>
          <InputItem
            className='qa-input-item'
            ref={(node: React.ReactNode) => (this.psdConfirmInput = node)}
            type='password'
            placeholder='请确认密码'
            value={psdConfirm}
            maxLength={20}
            error={psdConfirmErr}
            onErrorClick={() => this.handleErrorClick('psdConfirmInfo')}
            onChange={this.handlePsdConfirmChange}
          >
            <img
              src={lockIcon}
              className='psd-confirm-icon'
              alt='password-confirm-icon'
            />
          </InputItem>
          {/* TODO: 验证码 */}
        </div>
        <div className='qa-login-footer'>
          <Link to='/login' className='btn-login'>
            <i className='fa fa-angle-left icon' aria-hidden='true' />
            已拥有账号
          </Link>
        </div>
        <Button
          type='primary'
          className='qa-btn-bottom'
          disabled={
            usernameErr || emailErr || passwordErr || psdConfirmErr || loading
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
  usernameInfo: IError
  emailInfo: IError
  passwordInfo: IError
  psdConfirmInfo: IError
  loading: boolean
}

function injector({
  rootStore,
  rootAction,
}: {
  rootStore: IRootStore
  rootAction: IRootAction,
}) {
  return {
    store: rootStore.Register.registerStore,
    action: rootAction.Register.registerAction,
  }
}
