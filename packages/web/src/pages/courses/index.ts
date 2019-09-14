import { lazy } from 'app'

export default {
	routes: {
		'/': lazy(() => import('./CoursesRoute')),
		'/create': lazy(() => import('./CreateCourseRoute')),
		'/manage/:id': lazy(() => import('./ManageCourseRoute')),
		'/:id/:display/:page?': lazy(() => import('./ViewCourseRoute'))
	}
}

// /manage/siguria123/pages/info
