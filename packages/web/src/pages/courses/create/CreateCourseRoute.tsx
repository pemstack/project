import { CREATE_COURSE } from 'api/courses.api'
import { authorize, useAction, View, view } from 'app'
import { CenterContent } from 'components'
import { Formik } from 'forms'
import React from 'react'
import slugify from 'slugify'
import { CreateCourseForm } from './CreateCourseForm'

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
            app.router.push(`/courses/manage/${courseId}/${slugify(title, { lower: true })}`)
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
