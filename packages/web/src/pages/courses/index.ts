import { lazy, RoutingTable } from 'app'

const routes: RoutingTable = {
  '/': lazy(() => import('./CoursesRoute')),
  '/create': lazy(() => import('./CreateCourseRoute')),
  '/manage/:id/:display': lazy(() => import('./ManageCourseRoute')),
  '/:id/:display/:page?': {
    onEnter: lazy(() => import('./ViewCourseRoute')),
    order: 1
  },
  '/:id/:page/edit': lazy(() => import('./EditPageRoute'))
}

export default { routes }
