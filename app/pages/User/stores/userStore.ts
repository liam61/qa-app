import { action, observable, toJS, comparer } from 'mobx'
import { mStore } from '../../../mobx/store'

export interface IUser {
  _id: string
  name: string
  profile: string
  avatar: string
  cover: string
  email: string
  phone: string
  birthday: string
  gender: string
  todos: any[]
  posts: any[]
  score: number
}

const initStore: IUser = {
  _id: '',
  name: '',
  profile: '',
  avatar: '',
  cover: '',
  email: '',
  phone: '',
  birthday: '',
  gender: '',
  todos: [],
  posts: [],
  score: 0,
}

@mStore
export default class UserStore {
  @observable
  data = initStore

  @observable
  dataPre: IUser

  @observable
  loading = true

  @observable
  updating = false

  @action
  setUserData(d: IUser) {
    this.data = d

    if (!comparer.structural(this.dataPre, this.data)) {
      this.dataPre = toJS(d)
    }

    return this
  }

  @action
  setLoading(flag: boolean) {
    this.loading = flag

    return this
  }

  @action
  setUpdating(flag: boolean) {
    this.updating = flag

    return this
  }

  @action
  updateDataByKey(key: string, value: string) {
    if (this.data && key) {
      this.data[key] = value
    }

    return this
  }

  @action
  rollbackData() {
    this.data = toJS(this.dataPre)

    return this
  }

  @action
  advanceBakData() {
    this.dataPre = toJS(this.data)

    return this
  }

  @action
  setCover(cover: string) {
    if (this.data) {
      this.data.cover = cover
    }
    return this
  }
}
