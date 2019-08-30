import React from 'react'
import { View, useAction, authorize, view } from 'app'
import { CourseCreateForm } from './CourseCreateForm'
import { Formik } from 'forms'
import { CREATE_COURSE } from './courses.api'
import slugify from 'slugify'

export const CourseCreateRoute: View = ({ app }) => {
  const createCourse = useAction(CREATE_COURSE)
  return (
    <Formik
      initialValues={{
        title: '',
        access: 'private'
      }}
      onSubmit={async (values, actions) => {
        try {
          const { id, title } = await createCourse(values)
          app.messages.successKey('course.message.create')
          app.router.push(`/courses/${id}/${slugify(title)}`)
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
