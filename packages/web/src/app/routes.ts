import { lazy, redirect, RoutingTable } from 'app/routing'

// tslint:disable: object-literal-sort-keys

const routes: RoutingTable = {
  '/': lazy(() => import('pages/home')),
  '/home': redirect('/'),
  '/about': lazy(() => import('pages/about')),
  '/login': lazy(() => import('pages/login')),
  '/counter': lazy(() => import('pages/counter')),
  '/todos': lazy(() => import('pages/todos'))
}

export default routes
