import { IStoresToProps, IReactComponent, IWrappedComponent } from 'mobx-react'
import ExampleStore from '../pages/Example/stores/exampleStore'
import ExampleAction from '../pages/Example/actions/exampleAction'

export interface IRootStore {
  Example: {
    exampleStore: ExampleStore
  }
}

export interface IRootAction {
  Example: {
    exampleAction: ExampleAction
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

// declare module '*.svg'

// declare module "*.jpg" {
//   const value: any;
//   export default value;
// }

declare module '*.svg' {
  const value: any;
  export = value;
}
