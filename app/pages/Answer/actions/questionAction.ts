import { mAction } from '../../../mobx/action'
import { IRootAction, IRootStore } from '../../../typings'
import { IReply } from '../../Create/interface'
import { request } from '../../../utils'
import { InfoTypes } from '../../../components/InfoModal'

@mAction
export default class QuestionAction {
  constructor(
    public stores: IRootStore['Answer'],
    public actions: IRootAction['Answer'],
  ) {}

  async updateQstsWithReply(
    id: string,
    userId: string,
    replies: IReply[],
    callback: (type: InfoTypes) => void,
  ) {
    // const { answerStore } = this.stores
    // replyArr.forEach(reply => answerStore.updateQstReply(reply))
    // console.log(replies)

    const { id: resId } = await request
      .setPath('questions')
      .patch({ uri: id, data: { id: userId, replies } })

    callback(resId ? 'success' : 'fail')
  }
}
