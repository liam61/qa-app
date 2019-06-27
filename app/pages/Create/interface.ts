import { IUser } from 'pages/User/stores/userStore'

interface IQuestion {
  id: string
  Element: React.ReactNode
  // Element: SingleQuestion | AnswerQuestion
  type: string
  title?: string
  options?: IOption[]
  required?: boolean
}

interface IReply {
  id: string
  num?: number
  replies: string[]
}

interface IReplyTodo {
  _id: string
  user: IUser
  value: string[]
}

interface IQstToSubmit {
  _id?: string
  num: number
  type: string
  title?: string
  options?: IOption[]
  required?: boolean
  replies?: Array<{ userId: string; value: string[] }>
}

interface IOption {
  id: string
  value: string
}

interface IFile {
  id: string
  url: string
  name?: string
  size?: string
  cover?: boolean
}

type receiversType = Array<{ user: string }>

export { IQuestion, IQstToSubmit, IReply, IReplyTodo, IOption, IFile, receiversType }
