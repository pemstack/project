import { lazy, RoutingTable } from 'app'

const routes: RoutingTable = {
  '/': lazy(() => import('./CoursesRoute')),
  '/create': lazy(() => import('./CreateCourseRoute')),
  '/manage/:courseId/:display': lazy(() => import('./ManageCourseRoute')),
  '/:courseId/:display/:pageId/edit': lazy(() => import('./EditPageRoute')),
  '/:courseId/:display/:pageId?': {
    onEnter: lazy(() => import('./ViewCourseRoute')),
    order: 1
  }
}

export default { routes }
