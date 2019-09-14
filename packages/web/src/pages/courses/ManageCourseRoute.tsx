import React from 'react'
import { view, viewInvariant, View } from 'app'
import { CenterContent } from 'components'
import { ManageCourse } from './ManageCourse'

export const ManageCourseRoute: View = ({ match }) => {
  const { id } = match.params
  viewInvariant(id && typeof id === 'string', 404)
  return (
    <CenterContent width='medium'>
      <ManageCourse id={id} />
    </CenterContent>
  )
}

export default view(ManageCourseRoute)
