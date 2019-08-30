import { lazy } from 'app'
import userRoutes from 'pages/user'
import coursesRoutes from 'pages/courses'

export default {
  '/': lazy(() => import('pages/home')),
  '/user': userRoutes,
  '/courses': coursesRoutes
}
