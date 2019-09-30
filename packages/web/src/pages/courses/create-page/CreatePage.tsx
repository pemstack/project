import { useQuery, useAction } from 'app'
import React, { FunctionComponent } from 'react'
import { CREATE_COURSE_PAGE } from '../courses.api'
import { Formik } from 'forms'
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
  return (
    <Formik
      validationSchema={createCoursePage.schema}
      initialValues={{
        courseId,
        title: '',
        content:'',
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
        } finally {
          actions.setSubmitting(false)
        }
      }}
    >
      <EditPageForm submitButtonKey='button.create' />
    </Formik>
  )
}
