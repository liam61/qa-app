import * as React from 'react'
import HomePage from '../pages/Home'
import ExamplePage from '../pages/Example'
import NoMatchPage from '../pages/404'

export interface IRoute {
  key: string,
  path?: string,
  component: React.ComponentClass | React.FunctionComponent,
  props?: object,
  exact?: boolean,
  children?: IRoute[]
}

const routes = [
  {
    key: 'app',
    path: '/',
    component: HomePage,
    // component: () => <Hello name="lawler" />,
    // props: { name: 'lawler' },
    exact: true,
    // children: [],
  },
  {
    key: 'example',
    path: '/example',
    component: ExamplePage,
  },
  {
    key: '404',
    component: NoMatchPage,
  },
]

export default routes
