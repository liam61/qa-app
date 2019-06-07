import * as React from 'react'
import AppPage from 'pages/App'
import CreatePage from 'pages/Create/Loadable'
import ExamplePage from 'pages/Example'
import NoMatchPage from 'pages/404'
import LoginPage from 'pages/Login'
import SignupPage from 'pages/Register'

export interface IRoute {
  key: string
  path?: string
  component?: React.ComponentClass | React.FunctionComponent
  props?: object
  exact?: boolean
  redirect?: string
  children?: IRoute[]
}

const routes: IRoute[] = [
  {
    key: 'app',
    path: '/',
    component: AppPage,
    // component: () => <Hello name="lawler" />,
    // props: { name: 'lawler' },
    exact: true,
    // redirect: '/todos',
    // children: [],
  },
  {
    key: 'create',
    path: '/create',
    component: CreatePage,
  },
  {
    key: 'login',
    path: '/login',
    component: LoginPage,
  },
  {
    key: 'signup',
    path: '/signup',
    component: SignupPage,
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
