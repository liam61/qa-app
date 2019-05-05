import { action, observable, computed } from 'mobx'
import { IQstToSubmit } from './../../Create/stores/questionStore';
import { mStore } from '../../../mobx/store'
import { IFile } from '../../Create/stores/infoStore';

interface IData {
  title: string
  content: string
  files: IFile[]
  questions: IQstToSubmit[]
  receiver: object[]
  secret: boolean
  showAuthor: boolean
  expire: string
  type: string
  anonymous: boolean
  date: string
}

@mStore
export default class AnswerStore {
  @observable
  data: IData

  @action
  setData(data: IData) {
    this.data = data
  }

  @action
  updateQstReply(patch: object) {
    const { reply, num } = patch

    const index = this.data.questions.findIndex(qst => qst.num === num)

    this.data.questions[index].reply = reply
  }
}
