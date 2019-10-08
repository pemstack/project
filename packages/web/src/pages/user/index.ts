import { lazy, RoutingTable } from 'app'
import registerRoutes from './register'
import forgotPasswordRoutes from './reset-password'

const routes: RoutingTable = {
  '/login': lazy(() => import('./login')),
  '/logout': lazy(() => import('./logout')),
  '/register': registerRoutes,
  '/forgot-password': forgotPasswordRoutes
}

export default { routes }
