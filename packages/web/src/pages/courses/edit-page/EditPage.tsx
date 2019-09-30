import { useQuery, useAction } from 'app'
import React, { FunctionComponent } from 'react'
import { GET_COURSE_PAGE, UPDATE_COURSE_PAGE } from '../courses.api'
import { Formik } from 'forms'
import { EditPageForm } from './EditPageForm'

interface EditPageProps {
  courseId: string
  pageId: string
  onSuccess?: () => void
}

export const EditPage: FunctionComponent<EditPageProps> = ({
  courseId,
  pageId,
  onSuccess
}) => {
  const { title, content, access, files: existingFiles } = useQuery(GET_COURSE_PAGE, {
    courseId,
    pageId
  }).read()
  const updateCoursePage = useAction(UPDATE_COURSE_PAGE)
  return (
    <Formik
      validationSchema={updateCoursePage.schema}
      initialValues={{
        courseId,
        title,
        content,
        access,
        files: [],
        removedFiles: []
      }}
      onSubmit={async (values, actions) => {
        try {
          await updateCoursePage({
            courseId,
            pageId,
            ...values
          })

          actions.setFieldValue('files', [])
          actions.setFieldValue('removedFiles', [])

          if (typeof onSuccess === 'function') {
            onSuccess()
          }
        } finally {
          actions.setSubmitting(false)
        }
      }}
    >
      <EditPageForm existingFiles={existingFiles} submitButtonKey='button.update' />
    </Formik>
  )
}
