import React from 'react'
import { View, view, viewInvariant } from 'app'
import { CenterContent } from 'components'
import { EditPage } from './EditPage'

export const EditPageRoute: View = ({ match }) => {
  const { id, page } = match.params
  viewInvariant(id && typeof id === 'string', 404)
  viewInvariant(page && typeof page === 'string', 404)
  return (
    <CenterContent width='medium'>
      <EditPage courseId={id} pageId={page} />
    </CenterContent>
  )
}

export default view(EditPageRoute)
