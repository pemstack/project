import { useQuery } from 'app'
import React, { FunctionComponent } from 'react'
import { GET_COURSE_PAGE } from './courses.api'
import { Formik } from 'forms'
import { EditPageForm } from './EditPageForm'

interface EditPageProps {
  courseId: string
  pageId: string
}

export const EditPage: FunctionComponent<EditPageProps> = ({
  courseId,
  pageId
}) => {
  const { title, content, access } = useQuery(GET_COURSE_PAGE, {
    courseId,
    pageId
  }).read()
  console.log({ title, content, access })
  return (
    <Formik
      initialValues={{
        title,
        content,
        access
      }}
      onSubmit={(values, actions) => actions.setSubmitting(false)} // todo
    >
      <EditPageForm />
    </Formik>
  )
}
