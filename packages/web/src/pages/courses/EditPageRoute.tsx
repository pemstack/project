import React from 'react'
import { View, view, viewInvariant } from 'app'
import { CenterContent } from 'components'
import { EditPage } from './EditPage'

export const EditPageRoute: View = ({ match }) => {
  const { courseId, pageId } = match.params
  viewInvariant(courseId && typeof courseId === 'string', 404)
  viewInvariant(pageId && typeof pageId === 'string', 404)
  return (
    <CenterContent width='medium'>
      <EditPage courseId={courseId} pageId={pageId} />
    </CenterContent>
  )
}

export default view(EditPageRoute)
