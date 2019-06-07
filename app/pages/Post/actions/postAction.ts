import { mAction } from '../../../mobx/action'
import { request } from 'utils'
import { IRootAction, IRootStore } from 'typings'

@mAction
export default class PostAction {
  constructor(
    public stores: IRootStore['Post'],
    public actions: IRootAction['Post'],
  ) {}

  async getListData(
    refresh = false,
    callback: (type: string, num: number) => void,
    index?: number,
  ) {
    const { postStore } = this.stores

    if (refresh) {
      postStore.setListData({ lists: [], total: 0, newer: 0 })
    }

    postStore.setLoading(true).setRefresh(refresh, true)

    const id = localStorage.getItem('userId')
    const { data /* , type */ } = await request.setPath('questions').get({
      uri: id,
      query: { page: index || postStore.pageIndex },
    })

    postStore
      .setListData(data)
      .setRefresh(refresh, false)
      .setLoading(false)
    // if (!postStore.totalPage) {
    //   const { dataList, pageSize } = postStore
    //   const len = dataList.reduce((sum, list) => sum + list.data.length, 0)
    //   postStore.setTotalPage(Math.ceil(len / pageSize))
    // }
    callback('postsNum', postStore.newer)
  }

  async getNextListData(index: number) {
    const { postStore } = this.stores

    postStore
      .setLoading(true)
      .setPageIndex(++index)
      .addListData(
        await request
          .setPath('questions')
          .get({ query: { page: postStore.pageIndex } }),
      )
      .setLoading(false)
  }
}
