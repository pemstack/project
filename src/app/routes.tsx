import { redirect, RoutingTable } from '@pema/router'
import { lazyView } from './Loading'

// tslint:disable: object-literal-sort-keys

const routes: RoutingTable = {
  '/': lazyView(() => import('../pages/Home')),
  '/home': redirect('/'),
  '/about': lazyView(() => import('../pages/About'))
}

export default routes
