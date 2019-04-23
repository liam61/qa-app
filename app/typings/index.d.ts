import { IStoresToProps, IReactComponent, IWrappedComponent } from 'mobx-react'
import AppStore from '../pages/App/stores/appStore'
import CollectionStore from '../pages/Collection/stores/collectionStore'
import CreateStore from '../pages/Create/stores/createStore'
import ExampleStore from '../pages/Example/stores/exampleStore'
import MessageStore from '../pages/Message/stores/messageStore'
import TodoStore from '../pages/Todo/stores/todoStore'
import UserStore from '../pages/User/stores/userStore'
import AppAction from '../pages/App/actions/appAction'
import CollectionAction from '../pages/Collection/actions/collectionAction'
import CreateAction from '../pages/Create/actions/createAction'
import ExampleAction from '../pages/Example/actions/exampleAction'
import MessageAction from '../pages/Message/actions/messageAction'
import TodoAction from '../pages/Todo/actions/todoAction'
import UserAction from '../pages/User/actions/userAction'

export interface IRootStore {
  App: {
    appStore: AppStore
  }
  Collection: {
    collectionStore: CollectionStore
  }
  Create: {
    createStore: CreateStore
  }
  Example: {
    exampleStore: ExampleStore
  }
  Message: {
    messageStore: MessageStore
  }
  Todo: {
    todoStore: TodoStore
  }
  User: {
    userStore: UserStore
  }
}

export interface IRootAction {
  App: {
    appAction: AppAction
  }
  Collection: {
    collectionAction: CollectionAction
  }
  Create: {
    createAction: CreateAction
  }
  Example: {
    exampleAction: ExampleAction
  }
  Message: {
    messageAction: MessageAction
  }
  Todo: {
    todoAction: TodoAction
  }
  User: {
    userAction: UserAction
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
