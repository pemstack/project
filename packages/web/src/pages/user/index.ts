import { lazy, RoutingTable } from 'app'

const routes: RoutingTable = {
  '/login': lazy(() => import('./login')),
  '/logout': lazy(() => import('./logout')),
  '/confirm/:registerToken': lazy(() => import('./register')),
  '/register': lazy(() => import('./register')),
  '/register-success/:resendToken': lazy(() => import('./register'))
}

export default { routes }
