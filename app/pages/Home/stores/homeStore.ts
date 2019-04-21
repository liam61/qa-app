import { action, observable, computed } from 'mobx'
import { mStore } from '../../../mobx/store'

interface ISomething {
  prop: string
}

@mStore
export default class HomeStore {

}
