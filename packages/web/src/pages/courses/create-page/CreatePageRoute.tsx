import React from 'react'
import { View, view, viewInvariant } from 'app'
import { CenterContent } from 'components'
import { CreatePage } from './CreatePage'

export const CreatePageRoute: View = ({ router, match }) => {
  const { courseId, courseDisplay } = match.params
  viewInvariant(courseId && typeof courseId === 'string', 404)
  return (
    <CenterContent width='medium'>
      <CreatePage
        courseId={courseId}
        onSuccess={() => router.replace(`/courses/manage/${courseId}/${courseDisplay}`)}
      />
    </CenterContent>
  )
}

export default view(CreatePageRoute)
