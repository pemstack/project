import { lazy, RoutingTable } from 'app/routing'
import userRoutes from 'pages/user'
import coursesRoutes from 'pages/courses'

// tslint:disable: object-literal-sort-keys

const routes: RoutingTable = {
  '/': lazy(() => import('pages/home')),
  '/user': userRoutes,
  '/courses': coursesRoutes
}

export default routes
