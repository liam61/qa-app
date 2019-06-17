import * as React from 'react'
import { hot } from 'react-hot-loader'
import { HashRouter as Router } from 'react-router-dom'
import { configure } from 'mobx'
import routes from 'routes'
import { provider } from './mobx/provider'
import './mobxDependence'

import 'assets/css/global.scss'
import 'assets/css/font-awesome.min.css'

configure({ enforceActions: 'observed' }) // 不允许在动作外部修改状态

@provider
class App extends React.Component {
  render() {
    return <Router>{routes}</Router>
  }
}

export default hot(module)(() => <App />)
