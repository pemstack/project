import { lazy } from 'app'

export default {
  routes: {
    '/': lazy(() => import('./CoursesRoute')),
    '/create': lazy(() => import('./CourseCreateRoute')),
    '/:id/:display/:page?': lazy(() => import('./CourseViewRoute'))
  }
}
