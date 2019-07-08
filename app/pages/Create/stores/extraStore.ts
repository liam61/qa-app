import { action, observable, computed } from 'mobx'
import { IDepartment } from '../../Register/stores/registerStore'
import { mStore } from '../../../mobx/store'

@mStore
export default class ExtraStore {
  @observable
  type = ''

  @observable
  expire = ''

  @observable
  departments: IDepartment[] = []

  @observable
  receivers: { [key: string]: { [key: string]: any } } = {}
  // receivers: { [key: string]: boolean } = {}

  @observable
  showAuthor = true

  @observable
  secret = false

  @observable
  anonymous = false

  @action
  setType(t: string) {
    this.type = t

    return this
  }

  @action
  setExpire(t: string) {
    this.expire = t

    return this
  }

  @action
  toggleReceiver(dptId: string, userId: string, checked: boolean) {
    this.receivers[dptId][userId] = checked

    const temp = this.receivers[dptId]

    // 如为 user 确定勾选，则当前 dpt 全部人员 check 为 true 才为 true
    // 如为 user 取消勾选，则当前 dpt 为 false
    const dptChecked = checked
      ? Object.keys(temp).every(key => (key === dptId || key === 'count' ? true : temp[key] === checked))
      : false

    this.receivers[dptId][dptId] = dptChecked
    this.receivers[dptId].count += checked ? 1 : -1

    return this
  }

  @action
  toggleDepartment(dptId: string, checked: boolean) {
    const dpt = this.receivers[dptId]
    const keys = Object.keys(dpt)

    keys.forEach(key => (dpt[key] = checked))
    this.receivers[dptId].count = checked ? keys.length - 2 : 0 // 除去 dptId 和 count

    return this
  }

  @action
  setShowAuthor(s: boolean) {
    this.showAuthor = s

    return this
  }

  @action
  setSecret(s: boolean) {
    this.secret = s

    return this
  }

  @action
  setAnonymous(a: boolean) {
    this.secret = a

    return this
  }

  @action
  setDptsWithUsers(dpts: IDepartment[]) {
    this.departments = dpts

    return this
  }

  @action
  initStore() {
    this.type = ''
    this.expire = ''
    this.departments = []
    this.receivers = {}
    this.showAuthor = true
    this.anonymous = false
    this.secret = false

    return this
  }
}
