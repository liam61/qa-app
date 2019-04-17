import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import { inject } from 'mobx-react' // eslint-disable-line

import routesAll from './routes'

import './index.less'

class App extends Component { // eslint-disable-line
  constructor() {
    super()

    this.state = {
      routes: this.getRoutes(routesAll),
    }
  }

  getRoutes = routes => {
    if (!Array.isArray(routes)) return

    return routes.map(route => {
      // const { key, path, component, exact, children } = route

      // if (children) return this.getRoutes(children)

      if (route.component) {
        return <Route {...route} />
      }
      return null
    })
  }

  render() {
    const { routes } = this.state
    return (
      <div>
        <div className="div">Hello! This is a div from App</div>
        <Switch>{routes}</Switch>
      </div>
    )
  }
}

export default App
