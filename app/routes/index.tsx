import * as React from 'react'
import { Route } from 'react-router-dom'
import routesAll, { IRoute } from './routes'

function getRoutes(routes: IRoute[]) {
  return routes.map(route => {
    // const { key, path, component, exact, children } = route
    // TODO: 递归渲染子路由
    // if (children) return this.getRoutes(children)

    // const { path, component, redirect = '/' } = route
    if (route.component) {
      // return path !== '/' ? <Route {...route} /> : <Redirect exact from={path} to={redirect} />
      return <Route {...route} />
    }
    return null
  })
}

export default getRoutes(routesAll)
