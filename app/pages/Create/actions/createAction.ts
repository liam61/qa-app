import { IRootAction, IRootStore } from 'typings'
import { request } from 'utils'
import { InfoTypes } from 'components/InfoModal'
import { mAction } from '../../../mobx/action'

@mAction
export default class CreateAction {
  constructor(public stores: IRootStore['Create'], public actions: IRootAction['Create']) {}

  async submitQuestions(callback: (result: InfoTypes) => void) {
    const { infoAction, questionAction, extraAction } = this.actions

    const { type } = await request.setPath('questions').post({
      data: Object.assign(infoAction.getInfo(), questionAction.getQuestions(), extraAction.getExtra()),
    })

    callback(type)
  }
}
