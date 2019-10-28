import { error, lazy, RoutingTable } from 'app'
import coursesRoutes from 'pages/courses'
import userRoutes from 'pages/user'

const routes: RoutingTable = {
  '/': error(501), // lazy(() => import('pages/home')),
  '/user': userRoutes,
  '/courses': coursesRoutes,
  '/invitations': lazy(() => import('pages/invitations'))
}

export default routes
