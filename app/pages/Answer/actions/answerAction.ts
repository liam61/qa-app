import { request } from 'utils'
import { IRootAction, IRootStore } from 'typings'
import { mAction } from '../../../mobx/action'

@mAction
export default class AnswerAction {
  constructor(public stores: IRootStore['Answer'], public actions: IRootAction['Answer']) {}

  async getQstDetail(detailId: string, poster: boolean) {
    const { answerStore } = this.stores

    const { data = {} } = await request
      .setPath('questions/{id}/details')
      .replace(detailId)
      .get({ query: { poster } })

    answerStore.setData(data)
  }
}
