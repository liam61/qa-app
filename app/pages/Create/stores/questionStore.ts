import { action, observable, computed } from 'mobx'
import { IQuestion } from '../interface'
import { mStore } from '../../../mobx/store'
// import { fromJS } from 'immutable'

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

    return this
  }

  @action
  addQst(qst: IQuestion) {
    this.questions.push(qst)

    return this
  }

  @action
  removeQst(i: number) {
    this.questions.splice(i, 1)

    return this
  }

  @action
  clearQsts() {
    this.questions = []

    return this
  }

  @action
  changeCached() {
    this.cached = !this.cached

    return this
  }
}
