import { lazy, RoutingTable } from 'app'

const routes: RoutingTable = {
  '/': lazy(() => import('./CoursesRoute')),
  '/create': lazy(() => import('./create/CreateCourseRoute')),
  '/manage/:courseId/:courseDisplay/create-page': lazy(() => import('./create-page/CreatePageRoute')),
  '/manage/:courseId/:courseDisplay': lazy(() => import('./manage/ManageCourseRoute')),
  '/:courseId/:courseDisplay/:pageId/edit': lazy(() => import('./edit-page/EditPageRoute')),
  '/:courseId/:courseDisplay/:pageId?': lazy(() => import('./view/ViewCourseRoute'))
}

export default { routes }
