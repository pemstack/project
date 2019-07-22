import { lazy, redirect, RoutingTable, hardRedirect } from 'app/routing'

// tslint:disable: object-literal-sort-keys

const routes: RoutingTable = {
  '/': lazy(() => import('pages/home')),
  '/home': redirect('/'),
  '/about': lazy(() => import('pages/about')),
  '/login': lazy(() => import('pages/login')),
  '/counter': lazy(() => import('pages/counter')),
  '/todos': lazy(() => import('pages/todos')),
  '/todos-api': lazy(() => import('pages/todos-api'))
}

if (process.env.NODE_ENV === 'development') {
  routes['/graphql'] = hardRedirect('http://localhost:4000/graphql')
}

export default routes
