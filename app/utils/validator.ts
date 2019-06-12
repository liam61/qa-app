import { IError } from 'pages/Login/interface'
import { noErrors } from 'pages/Login/index'
import { USER_REG, EMAIL_REG, PASSWORD_REG, PHONE_REG } from 'common'
import request from './request'
import { emptyFn } from './index'

const MIN_USERNAME_LENGTH = 6
const MIN_PASSWORD_LENGTH = 6
const PHONE_LENGTH = 11

async function name(value: string, callback: (error: IError, validate?: string) => void): Promise<IError> {
  let res: IError

  if (value.length < MIN_USERNAME_LENGTH) {
    res = { hasError: true, error: '用户名长度至少6位！' }
    callback(res)

    return res
  }

  if (!USER_REG.test(value)) {
    res = { hasError: true, error: '只能包含 "字母 数组 . _" 4种符号，且特殊符号不能在首尾！' }
    callback(res)

    return res
  }

  const {
    data: { exist, validate },
  } = await request.setPath('users/validate').get({ uri: value })

  res = exist ? { hasError: true, error: '该用户名已被注册！' } : noErrors
  callback(res, validate)

  return res
}

async function email(
  value: string,
  callback: (error: IError, validate?: string) => void
): Promise<{ error: IError; validate?: string }> {
  let res: IError

  if (!EMAIL_REG.test(value)) {
    res = { hasError: true, error: '请输入正确的邮箱！' }
    callback(res)

    return { error: res }
  }

  const {
    data: { exist, validate },
  } = await request.setPath('users/validate').get({ uri: value })

  res = exist ? { hasError: true, error: '该邮箱已被注册！' } : noErrors

  callback(res, validate)

  return { error: res, validate }
}

async function phone(
  value: string,
  callback: (error: IError, validate?: string) => void
): Promise<{ error: IError; validate?: string }> {
  let res: IError

  if (value.length < PHONE_LENGTH) {
    res = { hasError: true, error: '请输入11位手记号码！' }

    callback(res)

    return { error: res }
  }

  if (!PHONE_REG.test(value)) {
    res = { hasError: true, error: '请输入正确的手机号码！' }

    callback(res)

    return { error: res }
  }

  const {
    data: { exist, validate },
  } = await request.setPath('users/validate').get({ uri: value })

  res = exist ? { hasError: true, error: '该手机号码已被注册！' } : noErrors

  callback(res, validate)

  return { error: res, validate }
}

function password(value: string, callback: (error: IError) => void): IError {
  let res: IError

  if (value.length < MIN_PASSWORD_LENGTH) {
    res = { hasError: true, error: '密码长度至少6位！' }

    callback(res)

    return res
  }

  res = PASSWORD_REG.test(value) || value === '' ? noErrors : { hasError: true, error: '至少包含一个字母和一个数字！' }

  callback(res)

  return res
}

function psdConfirm(value: string, psd: string, callback: (error: IError) => void): IError {
  const res = value === psd ? noErrors : { hasError: true, error: '两次填写的密码不一致！' }

  callback(res)

  return res
}

// 验证账户名，含用户名、邮箱、手机号
async function account(value: string, callback: (error: IError, validate?: string) => void = emptyFn): Promise<IError> {
  let res: IError

  if (value.length < MIN_USERNAME_LENGTH) {
    res = { hasError: true, error: '账户名长度至少6位！' }
    callback(res)

    return res
  }

  const {
    data: { exist, validate },
  } = await request.setPath('users/validate').get({ uri: value })

  res = !exist ? { hasError: true, error: '该账户名不存在！' } : noErrors

  callback(res, validate)

  return res
}

export default { name, email, phone, password, psdConfirm, account }
