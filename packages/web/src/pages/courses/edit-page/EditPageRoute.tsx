import React from 'react'
import { View, view, viewInvariant } from 'app'
import { CenterContent } from 'components'
import { EditPage } from './EditPage'

export const EditPageRoute: View = ({ router, match }) => {
  const { courseId, pageId, display } = match.params
  viewInvariant(courseId && typeof courseId === 'string', 404)
  viewInvariant(pageId && typeof pageId === 'string', 404)
  return (
    <CenterContent width='medium'>
      <EditPage
        courseId={courseId}
        pageId={pageId}
        onSuccess={() => router.replace(`/courses/manage/${courseId}/${display}`)}
      />
    </CenterContent>
  )
}

export default view(EditPageRoute)
