import { lazyController, lazyView, redirect, RoutingTable } from 'app/routing'

// tslint:disable: object-literal-sort-keys

const routes: RoutingTable = {
  '/': lazyView(() => import('pages/Home')),
  '/home': redirect('/'),
  '/about': lazyView(() => import('pages/About')),
  '/login': lazyView(() => import('pages/Login')),
  '/state-counter': lazyView(() => import('pages/StateCounter')),
  '/session-counter': lazyView(() => import('pages/SessionCounter')),
  '/controller-counter': lazyController(() => import('pages/ControllerCounter')),
  '/todos': lazyController(() => import('pages/Todos'))
}

export default routes
