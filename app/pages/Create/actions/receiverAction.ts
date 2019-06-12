import { mAction } from '../../../mobx/action'
import { IRootAction, IRootStore } from '../../../typings'

@mAction
export default class ReceiverAction {
  constructor(
    public stores: IRootStore['Create'],
    public actions: IRootAction['Create']
  ) {}

}
