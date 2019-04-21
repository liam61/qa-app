import { mAction } from '../../../mobx/action'
import { IRootAction, IRootStore } from '../../../typings'

@mAction
export default class HomeAction {
  constructor(
    public stores: IRootStore['Home'],
    public actions: IRootAction['Home'],
  ) {}

}
