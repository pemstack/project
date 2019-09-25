import { lazy, RoutingTable } from 'app'

const routes: RoutingTable = {
  '/': lazy(() => import('./CoursesRoute')),
  '/create': lazy(() => import('./create/CreateCourseRoute')),
  '/manage/:courseId/:display': lazy(() => import('./manage/ManageCourseRoute')),
  '/:courseId/:display/:pageId/edit': lazy(() => import('./edit-page/EditPageRoute')),
  '/:courseId/:display/:pageId?': {
    onEnter: lazy(() => import('./view/ViewCourseRoute')),
    order: 1
  }
}

export default { routes }
