import { mAction } from '../../../mobx/action'
import { IRootAction, IRootStore } from '../../../typings'

@mAction
export default class CollectionAction {
  constructor(
    public stores: IRootStore['Collection'],
    public actions: IRootAction['Collection'],
  ) {}

}
