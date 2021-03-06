import { CREATE_COURSE_PAGE } from 'api/pages.api'
import { useAction, useMessages } from 'app'
import { Formik } from 'forms'
import React, { FunctionComponent } from 'react'
import { EditPageForm } from '../edit-page/EditPageForm'

interface PageValues {
  title: string
}

interface CreatePageProps {
  courseId: string
  onSuccess?: (values: PageValues) => void
}

export const CreatePage: FunctionComponent<CreatePageProps> = ({
  courseId,
  onSuccess
}) => {
  const createCoursePage = useAction(CREATE_COURSE_PAGE)
  const messages = useMessages()
  return (
    <Formik
      validationSchema={createCoursePage.schema}
      initialValues={{
        courseId,
        title: '',
        content: '',
        access: 'private',
        files: [],
        removedFiles: []
      }}
      onSubmit={async (values, actions) => {
        try {
          await createCoursePage({
            courseId,
            ...values
          })

          if (typeof onSuccess === 'function') {
            onSuccess(values)
          }
        } catch (e) {
          messages.error()
        } finally {
          actions.setSubmitting(false)
        }
      }}
    >
      <EditPageForm submitButtonKey='button.create' titleKey='CreatePage.title' />
    </Formik>
  )
}
