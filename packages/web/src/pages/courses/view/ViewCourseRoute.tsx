import { asInt, view, View, viewInvariant } from 'app'
import React from 'react'
import { ViewCourse } from './ViewCourse'

export const ViewCourseRoute: View = ({ match, location }) => {
  const { courseId, pageId, courseDisplay } = match.params
  const { page: pageNumber } = location.query
  viewInvariant(courseId && typeof courseId === 'string', 404)
  return (
    <div className='ViewCourseRoute'>
      <ViewCourse
        courseId={courseId}
        page={pageId}
        pageNumber={asInt(pageNumber, 1)}
        courseDisplay={courseDisplay}
      />
    </div>
  )
}

export default view(ViewCourseRoute)
