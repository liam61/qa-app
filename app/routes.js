import React from 'react'
import HomePage from './pages/Home'
import NoMatchPage from './pages/404'
import Hello from './components/Hello/loadable'
import MobxCom from './components/MobxCom'

// import addIcon from './assets/add.svg'

const routes = [
  {
    key: 'app',
    path: '/',
    component: () => <h1>this is route app</h1>,
    exact: true,
    // children: []
  },
  {
    key: 'home',
    path: '/home',
    component: HomePage,
  },
  {
    key: 'a',
    path: '/a',
    component: () => <Hello name="lawler" />,
    // component: Hello,
    // props: { name: 'lawler' },
  },
  {
    key: 'b',
    path: '/b',
    component: MobxCom,
  },
  {
    key: '404',
    component: NoMatchPage,
  },
]

export default routes
