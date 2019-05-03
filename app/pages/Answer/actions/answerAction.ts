import { mAction } from '../../../mobx/action'
import axios from '../../../utils/axios'
import { IRootAction, IRootStore } from '../../../typings'

@mAction
export default class AnswerAction {
  constructor(
    public stores: IRootStore['Answer'],
    public actions: IRootAction['Answer'],
  ) {
    axios.setPath('questions')
  }

  async getQuestions() {
    const { answerStore } = this.stores
    answerStore.setData(await axios.get())
    // questionStore.setQsts(data.questions)
    // const result = await axios.setPath('user').delete({ uri: 'Dolor' })
    // const result = await axios.setPath('user').post({
    //   data: {
    //     name: 'lawler',
    //     email: 'admin@omyleon.com',
    //   },
    // })
    // const result = await axios.put({
    //   uri: 'Dolor',
    //   data: {
    //     name: 'Bolor',
    //   },
    // })
  }
}
