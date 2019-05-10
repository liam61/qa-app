import { mAction } from '../../../mobx/action'
import request from '../../../utils/request'
import { IRootAction, IRootStore } from '../../../typings'

@mAction
export default class AnswerAction {
  constructor(
    public stores: IRootStore['Answer'],
    public actions: IRootAction['Answer'],
  ) {}

  async getQuestions(id: string) {
    const { answerStore } = this.stores

    // setTimeout(async () => {
      answerStore.setData(await request.setPath('questions').get({ uri: id }))
    // }, 100000);
    // questionStore.setQsts(data.questions)
    // const result = await request.setPath('user').delete({ uri: 'Dolor' })
    // const result = await request.setPath('user').post({
    //   data: {
    //     name: 'lawler',
    //     email: 'admin@omyleon.com',
    //   },
    // })
    // const result = await request.put({
    //   uri: 'Dolor',
    //   data: {
    //     name: 'Bolor',
    //   },
    // })
  }
}
