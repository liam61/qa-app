import { IStoresToProps, IReactComponent, IWrappedComponent } from 'mobx-react'
import AnswerAnswerStore from '../pages/Answer/stores/answerStore'
import AnswerInfoStore from '../pages/Answer/stores/infoStore'
import AnswerQuestionStore from '../pages/Answer/stores/questionStore'
import AppAppStore from '../pages/App/stores/appStore'
import CreateCreateStore from '../pages/Create/stores/createStore'
import CreateExtraStore from '../pages/Create/stores/extraStore'
import CreateInfoStore from '../pages/Create/stores/infoStore'
import CreateQuestionStore from '../pages/Create/stores/questionStore'
import CreateReceiverStore from '../pages/Create/stores/receiverStore'
import ExampleExampleStore from '../pages/Example/stores/exampleStore'
import LoginLoginStore from '../pages/Login/stores/loginStore'
import MessageChatStore from '../pages/Message/stores/chatStore'
import MessageMessageStore from '../pages/Message/stores/messageStore'
import PostPostStore from '../pages/Post/stores/postStore'
import RegisterRegisterStore from '../pages/Register/stores/registerStore'
import TodoTodoStore from '../pages/Todo/stores/todoStore'
import UserDetailStore from '../pages/User/stores/detailStore'
import UserSettingStore from '../pages/User/stores/settingStore'
import UserUserStore from '../pages/User/stores/userStore'
import AnswerAnswerAction from '../pages/Answer/actions/answerAction'
import AnswerInfoAction from '../pages/Answer/actions/infoAction'
import AnswerQuestionAction from '../pages/Answer/actions/questionAction'
import AppAppAction from '../pages/App/actions/appAction'
import CreateCreateAction from '../pages/Create/actions/createAction'
import CreateExtraAction from '../pages/Create/actions/extraAction'
import CreateInfoAction from '../pages/Create/actions/infoAction'
import CreateQuestionAction from '../pages/Create/actions/questionAction'
import CreateReceiverAction from '../pages/Create/actions/receiverAction'
import ExampleExampleAction from '../pages/Example/actions/exampleAction'
import LoginLoginAction from '../pages/Login/actions/loginAction'
import MessageChatAction from '../pages/Message/actions/chatAction'
import MessageMessageAction from '../pages/Message/actions/messageAction'
import PostPostAction from '../pages/Post/actions/postAction'
import RegisterRegisterAction from '../pages/Register/actions/registerAction'
import TodoTodoAction from '../pages/Todo/actions/todoAction'
import UserDetailAction from '../pages/User/actions/detailAction'
import UserSettingAction from '../pages/User/actions/settingAction'
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
  Create: {
    createStore: CreateCreateStore
    extraStore: CreateExtraStore
    infoStore: CreateInfoStore
    questionStore: CreateQuestionStore
    receiverStore: CreateReceiverStore
  }
  Example: {
    exampleStore: ExampleExampleStore
  }
  Login: {
    loginStore: LoginLoginStore
  }
  Message: {
    chatStore: MessageChatStore
    messageStore: MessageMessageStore
  }
  Post: {
    postStore: PostPostStore
  }
  Register: {
    registerStore: RegisterRegisterStore
  }
  Todo: {
    todoStore: TodoTodoStore
  }
  User: {
    detailStore: UserDetailStore
    settingStore: UserSettingStore
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
  Create: {
    createAction: CreateCreateAction
    extraAction: CreateExtraAction
    infoAction: CreateInfoAction
    questionAction: CreateQuestionAction
    receiverAction: CreateReceiverAction
  }
  Example: {
    exampleAction: ExampleExampleAction
  }
  Login: {
    loginAction: LoginLoginAction
  }
  Message: {
    chatAction: MessageChatAction
    messageAction: MessageMessageAction
  }
  Post: {
    postAction: PostPostAction
  }
  Register: {
    registerAction: RegisterRegisterAction
  }
  Todo: {
    todoAction: TodoTodoAction
  }
  User: {
    detailAction: UserDetailAction
    settingAction: UserSettingAction
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
