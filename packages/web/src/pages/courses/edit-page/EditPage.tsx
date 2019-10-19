import { useQuery, useAction } from 'app'
import React, { FunctionComponent } from 'react'
import { GET_COURSE_PAGE, UPDATE_COURSE_PAGE, RcUploadedFile } from '../courses.api'
import { Formik } from 'forms'
import { EditPageForm } from './EditPageForm'

interface EditPageProps {
  courseId: string
  pageId: string
  onSuccess?: (pageTitle: string) => void
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
        pageId,
        title,
        content,
        access,
        files: [] as RcUploadedFile[],
        removedFiles: [] as string[]
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
            onSuccess(values.title || title)
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
