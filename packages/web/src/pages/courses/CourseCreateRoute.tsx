import React from 'react'
import { View, useAction, authorize, view } from 'app'
import { CourseCreateForm } from './CourseCreateForm'
import { Formik } from 'forms'
import { CREATE_COURSE } from './courses.api'

export const CourseCreateRoute: View = () => {
  const createCourse = useAction(CREATE_COURSE)
  return (
    <Formik
      initialValues={{
        title: '',
        access: 'private'
      }}
      onSubmit={async (values, actions) => {
        try {
          await createCourse(values)
        } finally {
          actions.setSubmitting(false)
        }
      }}
      validationSchema={createCourse.schema}
    >
      <CourseCreateForm />
    </Formik>
  )
}

export default authorize({
  action: view(CourseCreateRoute)
})
