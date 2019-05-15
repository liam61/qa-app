import request from './request'
import { IError } from '../pages/Login/interface'
import { noErrors } from '../pages/Login/index'
import { USER_REG, EMAIL_REG, PASSWORD_REG, PHONE_REG } from '../common/global'

const MIN_USERNAME_LENGTH = 6
const MIN_PASSWORD_LENGTH = 6
const PHONE_LENGTH = 11

async function username(value: string, callback: (error: IError) => void) {
  if (value.length < MIN_USERNAME_LENGTH) {
    callback({ hasError: true, error: '用户名长度至少6位！' })

    return
  }

  if (!USER_REG.test(value)) {
    callback({
      hasError: true,
      error: '只能包含 "字母 数组 . _" 4种符号，且特殊符号不能在首尾！',
    })

    return
  }

  const { status } = await request
    .setPath('register')
    .get({ query: { username: value } })

  callback(
    status === 'success'
      ? noErrors
      : { hasError: true, error: '该用户名已被注册！' },
  )
}

async function email(value: string, callback: (error: IError) => void) {
  if (!EMAIL_REG.test(value)) {
    callback({ hasError: true, error: '请输入正确的邮箱！' })

    return
  }

  const { status } = await request
    .setPath('register')
    .get({ query: { email: value } })

  callback(
    status === 'success'
      ? noErrors
      : { hasError: true, error: '该邮箱已被注册！' },
  )
}

async function phone(value: string, callback: (error: IError) => void) {
  if (value.length < PHONE_LENGTH) {
    callback({ hasError: true, error: '请输入11位手记号码！' })

    return
  }

  if (!PHONE_REG.test(value)) {
    callback({ hasError: true, error: '请输入正确的手机号码！' })

    return
  }

  const { status } = await request
    .setPath('register')
    .get({ query: { phone: value } })

  callback(
    status === 'success'
      ? noErrors
      : { hasError: true, error: '该手机号码已被注册！' },
  )
}

function password(value: string, callback: (error: IError) => void) {
  if (value.length < MIN_PASSWORD_LENGTH) {
    callback({ hasError: true, error: '密码长度至少6位！' })

    return
  }

  callback(
    PASSWORD_REG.test(value) || value === ''
      ? noErrors
      : {
          hasError: true,
          error: '至少包含一个字母和一个数字！',
        },
  )
}

function psdConfirm(
  value: string,
  psd: string,
  callback: (error: IError) => void,
) {
  callback(
    value === psd
      ? noErrors
      : { hasError: true, error: '两次填写的密码不一致！' },
  )
}

// 登录时验证用户名或邮箱
async function account(value: string, callback: (error: IError) => void) {
  if (value.length < MIN_USERNAME_LENGTH) {
    callback({ hasError: true, error: '账户名长度至少6位！' })

    return
  }

  const { status } = await request
    .setPath('login')
    .get({ query: { account: value } })

  callback(
    status === 'success'
      ? noErrors
      : { hasError: true, error: '该账户名不存在！' },
  )
}

export default { username, email, phone, password, psdConfirm, account }
