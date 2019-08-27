import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { decorator, CenterContent } from 'app/mock'
import { Formik } from 'forms'
import { createCourseSchema } from './courses.api'
import { UserLayout } from 'app/layout/UserLayout'
import { CourseCreateForm } from './CourseCreateForm'

const initial = {
  title: '',
  access: 'private'
}

storiesOf('courses/CourseCreateForm', module)
  .addDecorator(decorator())
  .add('default', () => (
    <CenterContent>
      <Formik
        validationSchema={createCourseSchema}
        onSubmit={(props, actions) => {
          action('submit')()
          actions.setSubmitting(false)
        }}
        initialValues={initial}
      >
        <CourseCreateForm />
      </Formik>
    </CenterContent>
  ))
  .add('with user layout', () => (
    <UserLayout>
      <CenterContent>
        <Formik
          validationSchema={createCourseSchema}
          onSubmit={(props, actions) => {
            action('submit')()
            actions.setSubmitting(false)
          }}
          initialValues={initial}
        >
          <CourseCreateForm />
        </Formik>
      </CenterContent>
    </UserLayout>
  ))
