import { mAction } from '../../../mobx/action'
import { IRootAction, IRootStore } from '../../../typings'
import { InfoTypes } from '../../../components/InfoModal'

@mAction
export default class CreateAction {
  constructor(
    public stores: IRootStore['Create'],
    public actions: IRootAction['Create'],
  ) {}

  submitQuestions(callback: (result: InfoTypes) => void) {
    const { infoAction, questionAction, extraAction } = this.actions

    console.log(
      Object.assign(
        {},
        infoAction.getInfo(),
        { questions: questionAction.getQuestions() },
        extraAction.getExtra(),
      ),
    )
    // TODO: 上传 await
    callback('success')
  }
}
