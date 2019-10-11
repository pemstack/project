import React from 'react'
import { View, view, viewInvariant } from 'app'
import { CenterContent } from 'components'
import { EditPage } from './EditPage'

export const EditPageRoute: View = ({ router, match, location }) => {
  const { redirect } = location.query
  const { courseId, pageId, courseDisplay } = match.params
  viewInvariant(courseId && typeof courseId === 'string', 404)
  viewInvariant(pageId && typeof pageId === 'string', 404)
  return (
    <CenterContent width='medium'>
      <EditPage
        courseId={courseId}
        pageId={pageId}
        onSuccess={() => {
          const to = redirect === 'manage'
            ? `/courses/manage/${courseId}/${courseDisplay}`
            : `/courses/${courseId}/${courseDisplay}/${pageId}`
          router.push(to)
        }}
      />
    </CenterContent>
  )
}

export default view(EditPageRoute)
