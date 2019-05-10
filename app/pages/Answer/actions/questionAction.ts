import { mAction } from '../../../mobx/action'
import { IRootAction, IRootStore } from '../../../typings'
import { IReply } from '../../Create/interface'
import request from '../../../utils/request'
import { InfoTypes } from '../../../components/InfoModal';

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
    callback: (status: InfoTypes) => void,
  ) {
    // const { answerStore } = this.stores
    // replyArr.forEach(reply => answerStore.updateQstReply(reply))
    // console.log(replies)

    const res = await request
      .setPath('questions')
      .post({ uri: id, data: { id: userId, replies } })

    res.id ? callback('success') : callback('fail')
  }
}
