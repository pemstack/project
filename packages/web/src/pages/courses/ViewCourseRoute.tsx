import React from 'react'
import { view, viewInvariant, View } from 'app'
import { ViewCourse } from './ViewCourse'

export const ViewCourseRoute: View = ({ match }) => {
  const { courseId, pageId, display } = match.params
  viewInvariant(courseId && typeof courseId === 'string', 404)
  return (
    <div className='ViewCourseRoute'>
      <ViewCourse courseId={courseId} page={pageId} display={display} />
    </div>
  )
}

export default view(ViewCourseRoute)
