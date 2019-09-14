import { lazy, RoutingTable } from 'app'

const routes: RoutingTable = {
  '/login': lazy(() => import('./login')),
  '/logout': lazy(() => import('./logout')),
  '/register': lazy(() => import('./register'))
}

export default { routes }
