import { GET_COURSE_PERMISSION } from 'api/courses.api'
import { useQuery, view, View, viewInvariant } from 'app'
import { CenterContent } from 'components'
import React from 'react'
import { ManageCourse } from './ManageCourse'

export const ManageCourseRoute: View = ({ match }) => {
  const { courseId, courseDisplay } = match.params
  viewInvariant(courseId && typeof courseId === 'string', 404)
  const { permission } = useQuery(GET_COURSE_PERMISSION, { courseId }).read()
  viewInvariant(permission === 'write', 403)

  return (
    <CenterContent>
      <ManageCourse courseId={courseId} courseDisplay={courseDisplay} />
    </CenterContent>
  )
}

export default view(ManageCourseRoute)
