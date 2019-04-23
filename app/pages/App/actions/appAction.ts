import { mAction } from '../../../mobx/action'
import { IRootAction, IRootStore } from '../../../typings'

@mAction
export default class AppAction {
  constructor(
    public stores: IRootStore['App'],
    public actions: IRootAction['App'],
  ) {}

  changeTab(index: number) {
    const { appStore } = this.stores
    appStore.setCurTab(index)
  }
}
