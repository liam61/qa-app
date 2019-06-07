import { mAction } from '../../../mobx/action'
import { IRootAction, IRootStore } from 'typings'

@mAction
export default class DetailAction {
  constructor(
    public stores: IRootStore['User'],
    public actions: IRootAction['User'],
  ) {}
}
