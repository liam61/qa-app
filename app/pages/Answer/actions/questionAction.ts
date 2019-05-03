import { mAction } from '../../../mobx/action'
import { IRootAction, IRootStore } from '../../../typings'

@mAction
export default class QuestionAction {
  constructor(
    public stores: IRootStore['Answer'],
    public actions: IRootAction['Answer'],
  ) {}

  updateQstsWithReply(replyArr: object[]) {
    const { answerStore } = this.stores
    console.log(replyArr)

    replyArr.forEach(reply => answerStore.updateQstReply(reply))
  }
}
