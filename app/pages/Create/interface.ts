// import SingleQuestion from 'components/SingleQuestion'
// import AnswerQuestion from 'components/AnswerQuestion'

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

interface IQstToSubmit {
  readonly _id: string
  num: number
  type: string
  title?: string
  options?: IOption[]
  required?: boolean
  replies?: { [key: string]: string[] }
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

type receiversType = { [key in 'department' | 'account']?: string[] }

export { IQuestion, IQstToSubmit, IReply, IOption, IFile, receiversType }
