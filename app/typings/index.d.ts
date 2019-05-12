import { IStoresToProps, IReactComponent, IWrappedComponent } from 'mobx-react'
import AnswerAnswerStore from '../pages/Answer/stores/answerStore'
import AnswerInfoStore from '../pages/Answer/stores/infoStore'
import AnswerQuestionStore from '../pages/Answer/stores/questionStore'
import AppAppStore from '../pages/App/stores/appStore'
import CollectionCollectionStore from '../pages/Collection/stores/collectionStore'
import CreateCreateStore from '../pages/Create/stores/createStore'
import CreateExtraStore from '../pages/Create/stores/extraStore'
import CreateInfoStore from '../pages/Create/stores/infoStore'
import CreateQuestionStore from '../pages/Create/stores/questionStore'
import ExampleExampleStore from '../pages/Example/stores/exampleStore'
import LoginLoginStore from '../pages/Login/stores/loginStore'
import MessageMessageStore from '../pages/Message/stores/messageStore'
import RegisterRegisterStore from '../pages/Register/stores/registerStore'
import TodoTodoStore from '../pages/Todo/stores/todoStore'
import UserUserStore from '../pages/User/stores/userStore'
import AnswerAnswerAction from '../pages/Answer/actions/answerAction'
import AnswerInfoAction from '../pages/Answer/actions/infoAction'
import AnswerQuestionAction from '../pages/Answer/actions/questionAction'
import AppAppAction from '../pages/App/actions/appAction'
import CollectionCollectionAction from '../pages/Collection/actions/collectionAction'
import CreateCreateAction from '../pages/Create/actions/createAction'
import CreateExtraAction from '../pages/Create/actions/extraAction'
import CreateInfoAction from '../pages/Create/actions/infoAction'
import CreateQuestionAction from '../pages/Create/actions/questionAction'
import ExampleExampleAction from '../pages/Example/actions/exampleAction'
import LoginLoginAction from '../pages/Login/actions/loginAction'
import MessageMessageAction from '../pages/Message/actions/messageAction'
import RegisterRegisterAction from '../pages/Register/actions/registerAction'
import TodoTodoAction from '../pages/Todo/actions/todoAction'
import UserUserAction from '../pages/User/actions/userAction'

export interface IRootStore {
  Answer: {
    answerStore: AnswerAnswerStore
    infoStore: AnswerInfoStore
    questionStore: AnswerQuestionStore
  }
  App: {
    appStore: AppAppStore
  }
  Collection: {
    collectionStore: CollectionCollectionStore
  }
  Create: {
    createStore: CreateCreateStore
    extraStore: CreateExtraStore
    infoStore: CreateInfoStore
    questionStore: CreateQuestionStore
  }
  Example: {
    exampleStore: ExampleExampleStore
  }
  Login: {
    loginStore: LoginLoginStore
  }
  Message: {
    messageStore: MessageMessageStore
  }
  Register: {
    registerStore: RegisterRegisterStore
  }
  Todo: {
    todoStore: TodoTodoStore
  }
  User: {
    userStore: UserUserStore
  }
}

export interface IRootAction {
  Answer: {
    answerAction: AnswerAnswerAction
    infoAction: AnswerInfoAction
    questionAction: AnswerQuestionAction
  }
  App: {
    appAction: AppAppAction
  }
  Collection: {
    collectionAction: CollectionCollectionAction
  }
  Create: {
    createAction: CreateCreateAction
    extraAction: CreateExtraAction
    infoAction: CreateInfoAction
    questionAction: CreateQuestionAction
  }
  Example: {
    exampleAction: ExampleExampleAction
  }
  Login: {
    loginAction: LoginLoginAction
  }
  Message: {
    messageAction: MessageMessageAction
  }
  Register: {
    registerAction: RegisterRegisterAction
  }
  Todo: {
    todoAction: TodoTodoAction
  }
  User: {
    userAction: UserUserAction
  }
}

export interface IInject {
  rootStore: IRootStore
  rootAction: IRootAction
}

declare module 'mobx-react' {
  export type IValueMapSelf = IStoresToProps<IInject>

  export function inject<S extends IInject, P, I, C>(
    fn: IStoresToProps<S, P, I, C>
  ): <T extends IReactComponent>(target: T) => T & IWrappedComponent<P>
}
