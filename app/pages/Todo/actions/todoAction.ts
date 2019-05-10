import { mAction } from '../../../mobx/action'
import request from '../../../utils/request'
import { IRootAction, IRootStore } from '../../../typings'

@mAction
export default class TodoAction {
  constructor(
    public stores: IRootStore['Todo'],
    public actions: IRootAction['Todo'],
  ) {}

  async getListData(index?: number, refresh = false) {
    const { todoStore } = this.stores

    if (refresh) {
      todoStore.setListData({ lists: [], total: 0 })
    }

    todoStore
      .setLoading(true)
      .setRefresh(refresh, true)
      .setListData(
        await request.setPath('todos').get({
          query: { page: index || todoStore.pageIndex },
        }),
      )
      .setRefresh(refresh, false)
      .setLoading(false)
    // if (!todoStore.totalPage) {
    //   const { dataList, pageSize } = todoStore
    //   const len = dataList.reduce((sum, list) => sum + list.data.length, 0)
    //   todoStore.setTotalPage(Math.ceil(len / pageSize))
    // }
  }

  async getNextListData(index: number) {
    const { todoStore } = this.stores

    todoStore
      .setLoading(true)
      .setPageIndex(++index)
      .addListData(await request.get({ query: { page: todoStore.pageIndex } }))
      .setLoading(false)
  }
}
