import { action, observable, computed } from 'mobx'
import { IQstToSubmit, IReply, receiversType } from '../../Create/interface'
import { mStore } from '../../../mobx/store'

interface IData {
  _id: string
  qstItems: IQstToSubmit[]
  receivers: receiversType
}

@mStore
export default class AnswerStore {
  @observable
  data: IData = { _id: '', qstItems: [], receivers: {} }

  @action
  setData(data: IData) {
    this.data = data

    return this
  }

  @action
  updateQstReply(patch: IReply) {
    const { replies, num } = patch

    const index = this.data.qstItems.findIndex(qst => qst.num === num)

    this.data.qstItems[index].replies = { lawler: replies }

    return this
  }
}
