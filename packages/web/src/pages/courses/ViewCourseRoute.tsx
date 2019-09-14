import React from 'react'
import { view, viewInvariant, View } from 'app'
import { ViewCourse } from './ViewCourse'

export const ViewCourseRoute: View = ({ match }) => {
	const { id, page } = match.params
	viewInvariant(id && typeof id === 'string', 404)
	return (
		<div className='ViewCourseRoute'>
			<ViewCourse id={id} defaultPage={page} />
		</div>
	)
}

export default view(ViewCourseRoute)
