import { mAction } from '../../../mobx/action'
import { request } from 'utils'
import { IRootAction, IRootStore } from 'typings'

@mAction
export default class TodoAction {
  constructor(
    public stores: IRootStore['Todo'],
    public actions: IRootAction['Todo']
  ) {}

  async getListData(
    refresh = false,
    callback: (type: string, num: number) => void,
    index?: number
  ) {
    const { todoStore } = this.stores

    if (refresh) {
      todoStore.setListData({ lists: [], total: 0, newer: 0 })
    }

    todoStore.setLoading(true).setRefresh(refresh, true)

    const { data /* , type */ } = await request.setPath('questions').get({
      query: { page: index || todoStore.pageIndex },
    })

    todoStore
      .setListData(data)
      .setRefresh(refresh, false)
      .setLoading(false)
    // if (!todoStore.totalPage) {
    //   const { dataList, pageSize } = todoStore
    //   const len = dataList.reduce((sum, list) => sum + list.data.length, 0)
    //   todoStore.setTotalPage(Math.ceil(len / pageSize))
    // }
    callback('todosNum', todoStore.newer)
  }

  async getNextListData(index: number) {
    const { todoStore } = this.stores

    todoStore
      .setLoading(true)
      .setPageIndex(++index)
      .addListData(
        await request
          .setPath('questions')
          .get({ query: { page: todoStore.pageIndex } })
      )
      .setLoading(false)
  }
}
