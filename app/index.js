import React from 'react'
import { render } from 'react-dom'
import { HashRouter } from 'react-router-dom'
import { Provider } from 'mobx-react'
import { configure } from 'mobx'
import AppHot from './App.hot'

// import userStore from './stores/userStore'

// const stores = { userStore }
// window.___APP_STATE___ = stores; // For easier debugging

configure({ enforceActions: 'observed' }) // 不允许在动作外部修改状态

const root = document.getElementById('root')

function renderAppToContainer() {
  render(
    <Provider>
      <HashRouter>
        <AppHot />
      </HashRouter>
    </Provider>
  , root)
}

renderAppToContainer()
