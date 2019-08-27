import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { decorator, CenterContent } from 'app/mock'
import { Formik } from 'forms'
import { LoginForm } from './LoginForm'
import * as yup from 'yup'
import { AnonymousLayout } from 'app/layout/AnonymousLayout';

const loginSchema = yup.object({
  username: yup.string().required(),
  password: yup.string().required(),
  persist: yup.boolean().notRequired()
})

storiesOf('user/login/LoginForm', module)
  .addDecorator(decorator())
  .add('default', () => (
    <Formik
      validationSchema={loginSchema}
      onSubmit={(props, actions) => {
        action('submit')()
        actions.setSubmitting(false)
      }}
      initialValues={{
        username: '',
        password: '',
        persist: false
      }}
    >
      <CenterContent maxWidth={360}>
        <LoginForm />
      </CenterContent>
    </Formik>
  ))
  .add('with anonymous layout', () => (
    <AnonymousLayout>
      <Formik
        validationSchema={loginSchema}
        onSubmit={(props, actions) => {
          action('submit')()
          actions.setSubmitting(false)
        }}
        initialValues={{
          username: '',
          password: '',
          persist: false
        }}
      >
        <CenterContent maxWidth={360}>
          <LoginForm />
        </CenterContent>
      </Formik>
    </AnonymousLayout>
  ))
