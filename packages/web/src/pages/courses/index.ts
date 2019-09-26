import { lazy, RoutingTable } from 'app'

const routes: RoutingTable = {
  '/': lazy(() => import('./CoursesRoute')),
  '/create': lazy(() => import('./create/CreateCourseRoute')),
  '/manage/:courseId/:courseDisplay': lazy(() => import('./manage/ManageCourseRoute')),
  '/:courseId/:courseDisplay/:pageId/edit': lazy(() => import('./edit-page/EditPageRoute')),
  '/:courseId/:courseDisplay/:pageId?': {
    onEnter: lazy(() => import('./view/ViewCourseRoute')),
    order: 1
  }
}

export default { routes }
