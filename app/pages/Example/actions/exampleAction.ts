import { mAction } from '../../../mobx/action'
import { IRootAction, IRootStore } from '../../../typings'
import { getGoods } from '../apis'

@mAction
export default class ExampleAction {
  constructor(
    public stores: IRootStore['Example'],
    public actions: IRootAction['Example'],
  ) {}

  async loadGoods() {
    const { exampleStore } = this.stores

    exampleStore
      .setLoading(true)
      .setCurGoods(await getGoods())
      .setLoading(false)
  }
}
