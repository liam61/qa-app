import { action, observable, computed } from 'mobx'
import { mStore } from '../../../mobx/store'
// import { fromJS } from 'immutable'

export interface IQuestion {
  id: string
  Element: React.ReactNode
  type: string
  title?: string
  options?: object[]
  required?: boolean
}

export interface IQstToSubmit {
  num: number
  type: string
  title?: string
  options?: object[]
  required?: boolean
}

@mStore
export default class QuestionStore {
  @observable
  questions: IQuestion[] = [] // TODO: 用 immutable 包住，使用 merge 重写 setQst

  @observable
  finished = false // 是否为返回重新填写

  @observable
  cached = false

  @action
  setQst(qsts: IQuestion[]) {
    this.questions = qsts
  }

  @action
  addQst(qst: IQuestion) {
    this.questions.push(qst)
  }

  @action
  removeQst(i: number) {
    this.questions.splice(i, 1)
  }

  @action
  clearQsts() {
    this.questions = []
  }

  @action
  changeCached() {
    this.cached = !this.cached
  }
}
