import * as React from 'react'
import { inject, observer } from 'mobx-react'
import { Link, withRouter } from 'react-router-dom'
import { InputItem, Button, Toast, Picker } from 'antd-mobile'
import { debounce } from 'utils'
import lockIcon from 'assets/images/lock.svg'
// import lock2Icon from 'assets/images/lock2.svg'
import lock3Icon from 'assets/images/lock3.svg'
import { IRootStore, IRootAction } from 'typings'
import { noErrors } from '../Login'
import { IError } from '../Login/interface'

import './index.scss'

@inject(injector)
@observer
class Register extends React.Component<IProps, IState> {
  static defaultProps = {
    prefixCls: 'page-register',
  }

  nameInput: React.ReactNode

  emailInput: React.ReactNode

  passwordInput: React.ReactNode

  psdConfirmInput: React.ReactNode

  state = {
    user: '',
    email: '',
    password: '',
    psdConfirm: '',
    nameInfo: noErrors,
    emailInfo: noErrors,
    passwordInfo: noErrors,
    psdConfirmInfo: noErrors,
    loading: false,
    validate: '',
    department: '',
  }

  async componentDidMount() {
    const { action } = this.props

    await action!.getDepartments()
  }

  handleChange = (type: string, val: string) => {
    this.setState({ [type]: val })
  }

  handleUserChange = (val: string) => {
    const { action } = this.props

    action!.validateUser(val, (errors: IError, validate?: string) => {
      this.setState({ nameInfo: errors, validate })
    })
  }

  handleEmailChange = (val: string) => {
    const { action } = this.props

    action!.validateEmail(val, (errors: IError, validate?: string) => this.setState({ emailInfo: errors, validate }))
  }

  handlePasswordChange = (val: string) => {
    const { action } = this.props

    this.setState({ password: val })

    action!.validatePassword(val, (errors: IError) => this.setState({ passwordInfo: errors }))
  }

  handlePsdConfirmChange = (val: string) => {
    const { action } = this.props
    const { password } = this.state

    this.setState({ psdConfirm: val })

    action!.validatePsdConfirm(val, password, (errors: IError) => this.setState({ psdConfirmInfo: errors }))
  }

  handleErrorClick = (type: string) => {
    const { [type]: info } = this.state
    Toast.fail(info.error)
    this[`${type.slice(0, -4)}Input`].focus()
  }

  handleSubmit = () => {
    const { action, store, history } = this.props
    const { user, email, password, passwordInfo, validate, department } = this.state

    if (!user || !password || !passwordInfo || !department) {
      Toast.fail('请输入完整的注册信息！')

      return
    }

    const dptId = store!.departments.find(dpt => dpt.name === department)!._id

    this.setState({ loading: true })

    // console.log(this.props.messageAction)
    action!.signup({ name: user, email, password, validate, dptId }, (success: boolean) => {
      // TODO: 可以用 infoModal 来提示
      this.setState({ loading: false })

      if (success) {
        history.push('/login')
      }
    })
  }

  handleDptChange = (val: string[]) => {
    this.setState({ department: val[0] })
  }

  render() {
    const { prefixCls, store } = this.props
    const {
      user,
      email,
      password,
      psdConfirm,
      nameInfo,
      emailInfo,
      passwordInfo,
      psdConfirmInfo,
      loading,
      department,
    } = this.state

    const { loadingDpts, departments } = store!

    let dptData: any

    if (!loadingDpts) {
      dptData = departments.map(dpt => ({ label: dpt.name, value: dpt.name }))
    }

    const { hasError: usernameErr } = nameInfo
    const { hasError: emailErr } = emailInfo
    const { hasError: passwordErr } = passwordInfo
    const { hasError: psdConfirmErr } = psdConfirmInfo

    return (
      <div className={`${prefixCls} qa-login`}>
        <div className="qa-login-header">开启你的问答之旅！</div>
        <div className="qa-login-main">
          <InputItem
            className="qa-input-item"
            ref={(node: React.ReactNode) => (this.nameInput = node)}
            placeholder="请输入用户名"
            value={user}
            maxLength={12}
            error={usernameErr}
            onErrorClick={() => this.handleErrorClick('nameInfo')}
            onChange={debounce(this.handleUserChange, (val: string) => this.setState({ user: val }))}
          >
            <i className="fa fa-user-o fa-2x warning" aria-hidden="true" />
          </InputItem>

          <Picker
            className="qa-picker-popup"
            data={dptData}
            extra=" "
            onOk={this.handleDptChange}
            cols={1}
            disabled={loadingDpts}
          >
            <InputItem className="qa-input-item" placeholder="请选择部门" editable={false} value={department}>
              <i className="fa fa-building-o fa-2x blue" aria-hidden="true" />
            </InputItem>
          </Picker>

          <InputItem
            className="qa-input-item"
            ref={(node: React.ReactNode) => (this.passwordInput = node)}
            type="password"
            placeholder="请输入密码"
            value={password}
            maxLength={20}
            error={passwordErr}
            onErrorClick={() => this.handleErrorClick('passwordInfo')}
            onChange={this.handlePasswordChange}
          >
            <img src={lock3Icon} className="password-icon" alt="password-icon" />
          </InputItem>
          <InputItem
            className="qa-input-item"
            ref={(node: React.ReactNode) => (this.psdConfirmInput = node)}
            type="password"
            placeholder="请确认密码"
            value={psdConfirm}
            maxLength={20}
            error={psdConfirmErr}
            onErrorClick={() => this.handleErrorClick('psdConfirmInfo')}
            onChange={this.handlePsdConfirmChange}
          >
            <img src={lockIcon} className="psd-confirm-icon" alt="password-confirm-icon" />
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
          disabled={usernameErr || emailErr || passwordErr || psdConfirmErr || loading}
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
  history: any
}

interface IState extends Partial<injectorReturnType> {
  user: string
  email: string
  password: string
  psdConfirm: string
  nameInfo: IError
  emailInfo: IError
  passwordInfo: IError
  psdConfirmInfo: IError
  loading: boolean
  validate: string | undefined
  department: string
}

function injector({ rootStore, rootAction }: { rootStore: IRootStore; rootAction: IRootAction }) {
  return {
    store: rootStore.Register.registerStore,
    action: rootAction.Register.registerAction,
  }
}

export default withRouter(Register)
