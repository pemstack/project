import { lazy, RoutingTable } from 'app'
import userRoutes from 'pages/user'
import coursesRoutes from 'pages/courses'

const routes: RoutingTable = {
  '/': lazy(() => import('pages/home')),
  '/user': userRoutes,
  '/courses': coursesRoutes,
  '/invitations': lazy(() => import('pages/invitations'))
}

export default routes
