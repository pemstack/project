import { lazyController, lazyView, redirect, RoutingTable } from './routing'

// tslint:disable: object-literal-sort-keys

const routes: RoutingTable = {
  '/': lazyView(() => import('pages/Home')),
  '/home': redirect('/'),
  '/about': lazyView(() => import('pages/About')),
  '/contact': lazyController(() => import('pages/Contact'))
}

export default routes
