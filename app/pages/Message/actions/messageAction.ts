import { mAction } from '../../../mobx/action'
import { IRootAction, IRootStore } from '../../../typings'

@mAction
export default class MessageAction {
  constructor(
    public stores: IRootStore['Message'],
    public actions: IRootAction['Message'],
  ) {}

}
