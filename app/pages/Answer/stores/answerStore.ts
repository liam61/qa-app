import { action, observable, computed } from 'mobx'
import { IQstToSubmit, IReply } from '../../Create/interface'
import { mStore } from '../../../mobx/store'

interface IData {
  questions: IQstToSubmit[]
  receiver: object
}

@mStore
export default class AnswerStore {
  @observable
  data: IData = { questions: [], receiver: {} }

  @action
  setData(data: IData) {
    this.data = data

    return this
  }

  @action
  updateQstReply(patch: IReply) {
    const { reply, num } = patch

    const index = this.data.questions.findIndex(qst => qst.num === num)

    this.data.questions[index].reply = { lawler: reply }

    return this
  }
}
