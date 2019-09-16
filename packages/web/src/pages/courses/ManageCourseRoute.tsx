import React from 'react'
import { view, viewInvariant, View, useQuery } from 'app'
import { CenterContent } from 'components'
import { ManageCourse } from './ManageCourse'
import { GET_COURSE_PERMISSION } from './courses.api'

export const ManageCourseRoute: View = ({ match }) => {
  const { courseId, display } = match.params
  viewInvariant(courseId && typeof courseId === 'string', 404)
  const { permission } = useQuery(GET_COURSE_PERMISSION, { courseId }).read()
  viewInvariant(permission === 'write', 403)

  return (
    <CenterContent width='large'>
      <ManageCourse courseId={courseId} display={display} />
    </CenterContent>
  )
}

export default view(ManageCourseRoute)
