import { IStoresToProps, IReactComponent, IWrappedComponent } from 'mobx-react'
import ExampleStore from '../pages/Example/stores/exampleStore'
import HomeStore from '../pages/Home/stores/homeStore'
import ExampleAction from '../pages/Example/actions/exampleAction'
import HomeAction from '../pages/Home/actions/homeAction'

export interface IRootStore {
  Example: {
    exampleStore: ExampleStore
  }
  Home: {
    homeStore: HomeStore
  }
}

export interface IRootAction {
  Example: {
    exampleAction: ExampleAction
  }
  Home: {
    homeAction: HomeAction
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
