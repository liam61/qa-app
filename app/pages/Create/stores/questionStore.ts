import { action, observable, computed, comparer } from 'mobx'
// import { fromJS } from 'immutable'
import { IQuestion } from '../interface'
import { mStore } from '../../../mobx/store'

@mStore
export default class QuestionStore {
  @observable
  questions: IQuestion[] = []

  @observable
  finished = false // 是否为返回重新填写

  @observable
  cached = false

  @action
  setQst(qsts: IQuestion[]) {
    // TODO: 是否可使用 merge 改进 set 方法
    if (!comparer.structural(qsts, this.questions)) {
      this.questions = [...qsts]
    }

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

  @action
  initStore() {
    this.questions = []
    this.finished = false
    this.cached = false

    return this
  }
}
