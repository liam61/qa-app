import { action, observable, computed } from 'mobx'
import { IFile } from '../../Create/interface'
import { mStore } from '../../../mobx/store'

export interface IData {
  readonly id: string
  title: string
  content: string
  files: IFile[]
  secret: boolean
  anonymous: boolean
  showAuthor: boolean
  expire: string
  type: string
  date: string
  author: string
  avatar: string
  read: number
  unread: number
}

export interface IList {
  section: string
  data: IData[]
}

@mStore
export default class TodoStore {
  @observable
  dataList: IList[] = []

  @observable
  loading = false

  @observable
  refreshing = false

  @observable
  pageIndex = 1

  @observable
  pageSize = 5

  @observable
  totalPage = 0

  @action
  setListData(data: { lists: IList[]; total: number }) {
    this.dataList = data.lists
    this.totalPage = Math.ceil(data.total / this.pageSize)

    return this
  }

  @action
  addListData(data: { lists: IList[] }) {
    this.dataList.push(...data.lists)

    return this
  }

  @action
  setLoading(flag: boolean) {
    this.loading = flag

    return this
  }

  @action
  setRefresh(isRefresh: boolean, flag: boolean) {
    if (isRefresh) {
      this.refreshing = flag
    }

    return this
  }

  @action
  setPageIndex(index: number) {
    this.pageIndex = index

    return this
  }

  @action
  setPageSize(size: number) {
    this.pageSize = size

    return this
  }

  @action
  setTotalPage(num: number) {
    this.totalPage = num

    return this
  }
}
