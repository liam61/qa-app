import { action, observable, computed } from 'mobx'
import { mStore } from '../../../mobx/store'
import { getGoods } from '../../../mockData/apis';

interface IGoods {
  id: string
  name: string
  desc: string
}

@mStore
export default class ExampleStore {
  @observable
  curGoods: IGoods | null = null;

  @observable
  isloading = true

  async changeCurGoods() {
    const data = await getGoods()
    this.setCurGoods(data)
  }

  @action
  setCurGoods(goods: IGoods) {
    this.curGoods = goods
  }

  @action
  setLoading(flag: boolean) {
    this.isloading = flag
  }
}
