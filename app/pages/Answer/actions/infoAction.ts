import { mAction } from '../../../mobx/action'
import { IRootAction, IRootStore } from 'typings'

@mAction
export default class InfoAction {
  constructor(
    public stores: IRootStore['Answer'],
    public actions: IRootAction['Answer'],
  ) {}

}
