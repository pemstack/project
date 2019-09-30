import React from 'react'
import { View, useAction, authorize, view } from 'app'
import { CreateCourseForm } from './CreateCourseForm'
import { Formik } from 'forms'
import { CREATE_COURSE } from '../courses.api'
import slugify from 'slugify'
import { CenterContent } from 'components'

export const CreateCourseRoute: View = ({ app }) => {
  const createCourse = useAction(CREATE_COURSE)
  return (
    <CenterContent width='small'>
      <Formik
        initialValues={{
          title: '',
          access: 'private'
        }}
        onSubmit={async (values, actions) => {
          try {
            const { courseId, title } = await createCourse(values)
            app.messages.successKey('course.message.created')
            app.router.push(`/courses/manage/${courseId}/${slugify(title)}`)
          } finally {
            actions.setSubmitting(false)
          }
        }}
        validationSchema={createCourse.schema}
      >
        <CreateCourseForm />
      </Formik>
    </CenterContent>
  )
}

export default authorize({
  action: view(CreateCourseRoute)
})
