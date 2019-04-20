import * as React from 'react'
import { hot } from 'react-hot-loader'
import { configure } from 'mobx'
import { provider } from './mobx/provider'
import routes from './routes'
import './mobxDependence';

configure({ enforceActions: 'observed' }) // 不允许在动作外部修改状态

@provider
class App extends React.Component {
  render() {
    return <div>{routes}</div>
  }
}

export default hot(module)(() => <App />)
