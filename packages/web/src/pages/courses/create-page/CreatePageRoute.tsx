import React from 'react'
import { View, view, viewInvariant } from 'app'
import { CenterContent } from 'components'
import { CreatePage } from './CreatePage'
import slugify from 'slugify'
import { useTranslation } from 'react-i18next'

export const CreatePageRoute: View = ({
  router,
  match,
  app
}) => {
  const { courseId, courseDisplay } = match.params
  const { t } = useTranslation()
  viewInvariant(courseId && typeof courseId === 'string', 404)
  return (
    <CenterContent width='medium'>
      <CreatePage
        courseId={courseId}
        onSuccess={({ title }) => {
          const pageId = slugify(title, { lower: true })
          router.push(`/courses/${courseId}/${courseDisplay}/${pageId}`)
          app.messages.success(t('course.message.pageCreated'))
        }}
      />
    </CenterContent>
  )
}

export default view(CreatePageRoute)
