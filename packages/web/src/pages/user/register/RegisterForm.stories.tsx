import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { decorator } from 'app/mock'
import { Formik } from 'forms'
import { RegisterForm } from './RegisterForm'
import { registerSchema, RegisterParams } from './register.api'
import { AnonymousLayout } from 'app/layout/AnonymousLayout'
import { CenterContent } from 'components'

const initial: RegisterParams = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  confirmPassword: ''
}

storiesOf('user/register/RegisterForm', module)
  .addDecorator(decorator())
  .add('default', () => (
    <Formik
      validationSchema={registerSchema}
      onSubmit={(props, actions) => {
        action('submit')()
        actions.setSubmitting(false)
      }}
      initialValues={initial}
    >
      <CenterContent>
        <RegisterForm />
      </CenterContent>
    </Formik>
  ))
  .add('with anonymous layout', () => (
    <AnonymousLayout>
      <Formik
        validationSchema={registerSchema}
        onSubmit={(props, actions) => {
          action('submit')()
          actions.setSubmitting(false)
        }}
        initialValues={initial}
      >
        <CenterContent>
          <RegisterForm />
        </CenterContent>
      </Formik>
    </AnonymousLayout>
  ))
