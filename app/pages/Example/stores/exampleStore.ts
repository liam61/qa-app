import { action, observable, computed } from 'mobx'
import { mStore } from '../../../mobx/store'

interface IGoods {
  id: string
  name: string
  desc: string
}

@mStore
export default class ExampleStore {
  @observable
  curGoods: IGoods | null = null

  @observable
  isloading = true

  @action
  setCurGoods(goods: IGoods) {
    this.curGoods = goods

    return this
  }

  @action
  setLoading(flag: boolean) {
    this.isloading = flag

    return this
  }
}
