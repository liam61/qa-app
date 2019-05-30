import { mAction } from '../../../mobx/action'
import { IRootAction, IRootStore } from '../../../typings'
import { IReply } from '../../Create/interface'
import { request } from '../../../utils'
import { InfoTypes } from '../../../components/InfoModal'

@mAction
export default class QuestionAction {
  constructor(
    public stores: IRootStore['Answer'],
    public actions: IRootAction['Answer']
  ) {}

  async submitReply(
    id: string,
    replies: IReply[],
    callback: (type: InfoTypes) => void
  ) {
    const { type } = await request
      .setPath('questions/{id}/details')
      .replace(id)
      .patch({ data: replies })

    callback(type)
  }
}
