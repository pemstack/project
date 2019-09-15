import React from 'react'
import { view, viewInvariant, View } from 'app'
import { ViewCourse } from './ViewCourse'

export const ViewCourseRoute: View = ({ match }) => {
  const { courseId, pageId } = match.params
  viewInvariant(courseId && typeof courseId === 'string', 404)
  return (
    <div className='ViewCourseRoute'>
      <ViewCourse courseId={courseId} defaultPage={pageId} />
    </div>
  )
}

export default view(ViewCourseRoute)
