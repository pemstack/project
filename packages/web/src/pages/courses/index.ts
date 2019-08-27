import { lazy } from 'app'

export default {
  '/': lazy(() => import('./CoursesRoute')),
  // '/create': lazy(() => import('./CourseCreateRoute')),
  '/:id/:display/:page?': lazy(() => import('./CourseViewRoute')),
}
