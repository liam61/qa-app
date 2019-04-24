import { mAction } from '../../../mobx/action'
import { IQuestion, IQstToSubmit } from '../stores/createStore'
import { IRootAction, IRootStore } from '../../../typings'
import { fromJS, is } from 'immutable'
import { getUid } from '../../../utils'

@mAction
export default class CreateAction {
  constructor(
    public stores: IRootStore['Create'],
    public actions: IRootAction['Create'],
  ) {}

  addQuestion(type: string, Element: React.ElementType) {
    const { createStore } = this.stores
    createStore.addQst({
      id: getUid(),
      type: type.toLowerCase(),
      Element,
      title: 'test',
      options: [],
      required: true,
    })
  }

  removeQstByIdx(index: number) {
    const { createStore } = this.stores
    createStore.removeQst(index)
  }

  clearQuestions() {
    const { createStore } = this.stores
    createStore.clearQsts()
  }

  getQuestionCount() {
    const { createStore } = this.stores
    return createStore.questions.length
  }

  submitQuestions(questions: IQuestion[]) {
    const { createStore } = this.stores
    console.log(questions)

    if (createStore.cached) {
      createStore.setQst(questions)
    }

    const qstsToSubmit: IQstToSubmit[] = questions.map((qst, index) => {
      const { type, title, options, required } = qst

      return {
        num: index,
        type,
        title,
        options,
        required,
      }
    })

    console.log(qstsToSubmit) // TODO: 上传 await
  }

  updateQuestions(questions: IQuestion[]) {
    const { createStore } = this.stores
    const curQsts = createStore.questions

    // NOTE: 根据 questions 是否改变来执行，但引入 immutable 相对较大
    if (!is(fromJS(curQsts), fromJS(questions))) {
      createStore.setQst([...questions])
    }
  }

  cachedChange() {
    const { createStore } = this.stores
    createStore.changeCached()
  }
}
