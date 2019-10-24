import { action } from '@storybook/addon-actions'
import { storiesOf } from '@storybook/react'
import { createCourseSchema } from 'api/courses.api'
import { UserLayout } from 'app/layout/UserLayout'
import { decorator } from 'app/mock'
import { CenterContent } from 'components'
import { Formik } from 'forms'
import React from 'react'
import { CreateCourseForm } from './CreateCourseForm'

const initial = {
  title: '',
  access: 'private'
}

storiesOf('courses/CreateCourseForm', module)
  .addDecorator(decorator())
  .add('default', () => (
    <CenterContent width='small'>
      <Formik
        validationSchema={createCourseSchema}
        onSubmit={(props, actions) => {
          action('submit')()
          actions.setSubmitting(false)
        }}
        initialValues={initial}
      >
        <CreateCourseForm />
      </Formik>
    </CenterContent>
  ))
  .add('with user layout', () => (
    <UserLayout>
      <CenterContent width='small'>
        <Formik
          validationSchema={createCourseSchema}
          onSubmit={(props, actions) => {
            action('submit')()
            actions.setSubmitting(false)
          }}
          initialValues={initial}
        >
          <CreateCourseForm />
        </Formik>
      </CenterContent>
    </UserLayout>
  ))
