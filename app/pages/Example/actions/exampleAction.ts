import { mAction } from '../../../mobx/action'
import { IRootAction, IRootStore } from '../../../typings'

@mAction
export default class ExampleAction {
  constructor(
    public stores: IRootStore['Example'],
    public actions: IRootAction['Example']
  ) {}

  async loadGoods() {
    this.stores.exampleStore.setLoading(true)
    await this.stores.exampleStore.changeCurGoods()
    this.stores.exampleStore.setLoading(false)
  }
}
