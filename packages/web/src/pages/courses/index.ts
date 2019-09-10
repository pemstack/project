import { lazy } from 'app'

export default {
	routes: {
		'/': lazy(() => import('./CoursesRoute')),
		'/create': lazy(() => import('./CourseCreateRoute')),
		'/manage/:id': lazy(() => import('./ManageCourseRoute')),
		'/:id/:display/:page?': lazy(() => import('./CourseViewRoute'))
	}
}

// /manage/siguria123/pages/info
