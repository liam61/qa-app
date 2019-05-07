import { toJS } from 'mobx';
import { fromJS, is } from 'immutable'
import { mAction } from '../../../mobx/action'
import { IQuestion, IQstToSubmit } from '../interface'
import { IRootAction, IRootStore } from '../../../typings'
import { getUid } from '../../../utils'

@mAction
export default class QuestionAction {
  constructor(
    public stores: IRootStore['Create'],
    public actions: IRootAction['Create'],
  ) {}

  addQuestion(type: string, Element: React.ReactNode) {
    const { questionStore } = this.stores
    questionStore.addQst({
      id: getUid(),
      type: type.toLowerCase(),
      Element,
      title: 'test',
      options: [],
      required: true,
    })
  }

  removeQstByIdx(index: number) {
    const { questionStore } = this.stores
    questionStore.removeQst(index)
  }

  clearQuestions() {
    const { questionStore } = this.stores
    questionStore.clearQsts()
  }

  getQuestionCount() {
    const { questionStore } = this.stores
    return questionStore.questions.length
  }

  getQuestions(): IQstToSubmit[] {
    const { questionStore } = this.stores

    return questionStore.questions.map((qst, index) => {
      const { type, title, options, required } = qst

      return {
        num: index,
        type,
        title,
        options: toJS(options),
        required,
      }
    })
  }

  updateQuestions(questions: IQuestion[]) {
    const { questionStore } = this.stores
    const curQsts = questionStore.questions

    // NOTE: 根据 questions 是否改变来执行，但引入 immutable 相对较大
    if (!is(fromJS(curQsts), fromJS(questions))) {
      questionStore.setQst([...questions])
    }
  }

  cachedChange() {
    const { questionStore } = this.stores
    questionStore.changeCached()
  }
}
