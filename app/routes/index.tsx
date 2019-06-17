import * as React from 'react'
import { Route, Redirect, Switch } from 'react-router-dom'
import routesConfig from './config'

function getRoutes(routes = routesConfig) {
  return routes.map(route => {
    const { key, redirect, children, path, component: Cmp } = route

    if (children) {
      return (
        <Cmp key={key}>
          <Switch>{getRoutes(children)}</Switch>
        </Cmp>
        // <Route
        //   path={path}
        //   render={() => (
        //     <Cmp>
        //       <Switch>{getRoutes(children)}</Switch>
        //     </Cmp>
        //   )}
        // />
      )
    }

    return redirect ? <Redirect key={key} to={redirect} {...route} /> : <Route key={key} {...route} />
  })
}

export default <Switch>{getRoutes()}</Switch>
