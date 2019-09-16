import { lazy, RoutingTable } from 'app'
import registerRoutes from './register'

const routes: RoutingTable = {
  '/login': lazy(() => import('./login')),
  '/logout': lazy(() => import('./logout')),
  '/register': registerRoutes
}

export default { routes }
