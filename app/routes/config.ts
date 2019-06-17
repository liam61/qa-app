import * as React from 'react'
import AppPage from 'pages/App'
import CreatePage from 'pages/Create/Loadable'
import ExamplePage from 'pages/Example/Loadable'
import LoginPage from 'pages/Login/Loadable'
import SignupPage from 'pages/Register/Loadable'
import TodoPage from 'pages/Todo/Loadable'
import PostPage from 'pages/Post/Loadable'
import MessagePage from 'pages/Message/Loadable'
import UserPage from 'pages/User/Loadable'
import NoMatchPage from 'pages/404'

export interface IRoute {
  key: string
  path?: string
  component?: React.ComponentClass | React.FunctionComponent
  props?: object
  exact?: boolean
  redirect?: string
  children?: IRoute[]
}

const config: IRoute[] = [
  { key: 'login', exact: true, path: '/login', component: LoginPage },
  { key: 'signup', path: '/signup', component: SignupPage },
  { key: 'create', path: '/create', component: CreatePage },
  { key: 'example', path: '/example', component: ExamplePage },
  {
    key: 'app',
    path: '/',
    component: AppPage,
    children: [
      { key: 'home', path: '/', exact: true, redirect: '/todo' },
      { key: 'todo', path: '/todo', component: TodoPage },
      { key: 'post', path: '/post', component: PostPage },
      { key: 'message', path: '/message', component: MessagePage },
      { key: 'user', path: '/user', component: UserPage },
      { key: '404', component: NoMatchPage },
    ],
  },
]

export default config
