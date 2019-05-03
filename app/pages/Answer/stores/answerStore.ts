import { action, observable, computed } from 'mobx'
import { mStore } from '../../../mobx/store'

@mStore
export default class AnswerStore {
  @observable
  data: object

  @action
  setData(data: object) {
    this.data = data
  }

  @action
  updateQstReply(patch: object) {
    const { reply, num } = patch

    const index = this.data.questions.findIndex(qst => qst.num === num)

    this.data.questions[index].reply = reply
  }
}
