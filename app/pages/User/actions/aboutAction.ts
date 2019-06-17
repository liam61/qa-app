import { request } from 'utils'
import { mAction } from '../../../mobx/action'
import { IRootAction, IRootStore } from '../../../typings'

@mAction
export default class AboutAction {
  constructor(public stores: IRootStore['User'], public actions: IRootAction['User']) {}

  async getResume() {
    // await request.setPath('/')
  }
}
