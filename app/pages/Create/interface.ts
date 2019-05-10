// import SingleQuestion from '../../components/SingleQuestion'
// import AnswerQuestion from '../../components/AnswerQuestion'

interface IQuestion {
  id: string
  Element: React.ReactNode
  // Element: SingleQuestion | AnswerQuestion
  type: string
  title?: string
  options?: object[]
  required?: boolean
}

interface IReply {
  userId?: string
  num: number
  reply: string[]
}

interface IQstToSubmit {
  num: number
  type: string
  title?: string
  options?: object[]
  required?: boolean
  reply?: { [key: string]: string[] }
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

export { IQuestion, IQstToSubmit, IReply, IOption, IFile }
