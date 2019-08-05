import { lazy, RoutingTable } from 'app/routing'
import userRoutes from 'pages/user'

// tslint:disable: object-literal-sort-keys

const routes: RoutingTable = {
  '/': lazy(() => import('pages/home')),
  '/user': userRoutes
}

export default routes
