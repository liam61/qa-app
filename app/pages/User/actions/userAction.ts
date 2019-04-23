import { mAction } from '../../../mobx/action'
import { IRootAction, IRootStore } from '../../../typings'

@mAction
export default class UserAction {
  constructor(
    public stores: IRootStore['User'],
    public actions: IRootAction['User'],
  ) {}

}
