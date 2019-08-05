import { lazy, redirect, RoutingTable, hardRedirect } from 'app/routing'
import userRoutes from 'pages/user'

// tslint:disable: object-literal-sort-keys

const routes: RoutingTable = {
  '/': lazy(() => import('pages/home')),
  '/home': redirect('/'),
  '/about': lazy(() => import('pages/about')),
  '/user': userRoutes,
  '/counter': lazy(() => import('pages/counter')),
  '/todos': lazy(() => import('pages/todos')),
  '/todos-mobx': lazy(() => import('pages/todos-mobx'))
}

if (process.env.NODE_ENV === 'development') {
  routes['/graphql'] = hardRedirect('http://localhost:4000/graphql')
}

export default routes
