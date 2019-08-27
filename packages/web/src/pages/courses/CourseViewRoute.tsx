import React from 'react'
import { view, viewInvariant, View } from 'app'
import { CourseView } from './CourseView'

export const CourseViewRoute: View = ({
  match
}) => {
  const { id, page } = match.params
  viewInvariant(id && typeof id === 'string', 404)
  return (
    <div className='CourseViewRoute' >
      <CourseView id={id} defaultPage={page} />
    </div>
  )
}

export default view(CourseViewRoute)
