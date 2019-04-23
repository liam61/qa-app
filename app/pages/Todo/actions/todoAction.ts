import { mAction } from '../../../mobx/action'
import { IRootAction, IRootStore } from '../../../typings'

@mAction
export default class TodoAction {
  constructor(
    public stores: IRootStore['Todo'],
    public actions: IRootAction['Todo'],
  ) {}

}
